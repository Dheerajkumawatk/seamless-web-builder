import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, ".data", "mysql-table-audit");
const sourceDirs = ["src", "scripts"];
const sourceFiles = ["package.json", "supabase-schema.sql", "README.md"];

const explicitProtectedTables = new Set([
  "contact_leads",
  "demo_requests",
  "election_results",
  "vikas_mitra_profiles",
]);

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] ??= value;
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function quoteIdent(identifier) {
  return `\`${String(identifier).replaceAll("`", "``")}\``;
}

function sqlLiteral(value) {
  if (value === null || value === undefined) return "NULL";
  if (value instanceof Date) return mysql.escape(value);
  if (Buffer.isBuffer(value)) return `X'${value.toString("hex")}'`;
  return mysql.escape(value);
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(fullPath);
    return fullPath;
  });
}

function readCodeCorpus() {
  const files = [
    ...sourceDirs.flatMap((dir) => walkFiles(path.join(projectRoot, dir))),
    ...sourceFiles.map((file) => path.join(projectRoot, file)).filter((file) => fs.existsSync(file)),
  ].filter((file) => !file.includes(`${path.sep}node_modules${path.sep}`));

  return files
    .map((file) => {
      try {
        return {
          file,
          text: fs.readFileSync(file, "utf8"),
        };
      } catch {
        return undefined;
      }
    })
    .filter(Boolean);
}

function findCodeReferences(tableName, corpus) {
  const escaped = tableName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(?<![A-Za-z0-9_])${escaped}(?![A-Za-z0-9_])`, "g");
  const refs = [];

  for (const { file, text } of corpus) {
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        refs.push(`${path.relative(projectRoot, file)}:${index + 1}`);
      }
      pattern.lastIndex = 0;
    });
  }

  return refs;
}

async function getBaseTables(connection, database) {
  const [rows] = await connection.execute(
    `select table_name
       from information_schema.tables
      where table_schema = ?
        and table_type = 'BASE TABLE'
      order by table_name`,
    [database],
  );
  return rows.map((row) => row.TABLE_NAME ?? row.table_name);
}

async function getCreateTable(connection, tableName) {
  const [rows] = await connection.query(`SHOW CREATE TABLE ${quoteIdent(tableName)}`);
  return rows[0]["Create Table"] ?? rows[0]["Create Table "];
}

async function getExactCount(connection, tableName) {
  const [rows] = await connection.query(`SELECT COUNT(*) AS row_count FROM ${quoteIdent(tableName)}`);
  return Number(rows[0].row_count);
}

async function getTableRows(connection, tableName) {
  const [rows] = await connection.query(`SELECT * FROM ${quoteIdent(tableName)}`);
  return rows;
}

async function getDependencies(connection, database, tableName) {
  const like = `%${tableName}%`;
  const deps = [];

  const [foreignKeys] = await connection.execute(
    `select constraint_name, table_name, referenced_table_name
       from information_schema.key_column_usage
      where table_schema = ?
        and (table_name = ? or referenced_table_name = ?)
        and referenced_table_name is not null`,
    [database, tableName, tableName],
  );
  deps.push(
    ...foreignKeys.map(
      (row) =>
        `foreign key ${row.CONSTRAINT_NAME ?? row.constraint_name} on ${
          row.TABLE_NAME ?? row.table_name
        } references ${row.REFERENCED_TABLE_NAME ?? row.referenced_table_name}`,
    ),
  );

  const [views] = await connection.execute(
    `select table_name
       from information_schema.views
      where table_schema = ?
        and view_definition like ?`,
    [database, like],
  );
  deps.push(...views.map((row) => `view ${row.TABLE_NAME ?? row.table_name}`));

  const [triggers] = await connection.execute(
    `select trigger_name, event_object_table
       from information_schema.triggers
      where trigger_schema = ?
        and (event_object_table = ? or action_statement like ?)`,
    [database, tableName, like],
  );
  deps.push(
    ...triggers.map(
      (row) =>
        `trigger ${row.TRIGGER_NAME ?? row.trigger_name} on ${
          row.EVENT_OBJECT_TABLE ?? row.event_object_table
        }`,
    ),
  );

  const [routines] = await connection.execute(
    `select routine_type, routine_name
       from information_schema.routines
      where routine_schema = ?
        and routine_definition like ?`,
    [database, like],
  );
  deps.push(
    ...routines.map(
      (row) => `${String(row.ROUTINE_TYPE ?? row.routine_type).toLowerCase()} ${
        row.ROUTINE_NAME ?? row.routine_name
      }`,
    ),
  );

  const [events] = await connection.execute(
    `select event_name
       from information_schema.events
      where event_schema = ?
        and event_definition like ?`,
    [database, like],
  );
  deps.push(...events.map((row) => `event ${row.EVENT_NAME ?? row.event_name}`));

  return [...new Set(deps)];
}

async function writeBackup(connection, database, tables, startedAt) {
  fs.mkdirSync(outputDir, { recursive: true });
  const backupPath = path.join(outputDir, `backup-${database}-${startedAt}.sql`);
  const stream = fs.createWriteStream(backupPath, { encoding: "utf8" });

  stream.write(`-- Backup generated by scripts/audit-empty-mysql-tables.mjs\n`);
  stream.write(`-- Database: ${database}\n`);
  stream.write(`-- Generated at: ${new Date().toISOString()}\n\n`);
  stream.write(`CREATE DATABASE IF NOT EXISTS ${quoteIdent(database)};\n`);
  stream.write(`USE ${quoteIdent(database)};\n\n`);

  for (const tableName of tables) {
    const createSql = await getCreateTable(connection, tableName);
    stream.write(`--\n-- Table structure for ${quoteIdent(tableName)}\n--\n`);
    stream.write(`${createSql};\n\n`);

    const rows = await getTableRows(connection, tableName);
    if (rows.length === 0) {
      stream.write(`-- No data for ${quoteIdent(tableName)}\n\n`);
      continue;
    }

    const columns = Object.keys(rows[0]);
    stream.write(`--\n-- Data for ${quoteIdent(tableName)} (${rows.length} rows)\n--\n`);
    for (const row of rows) {
      const values = columns.map((column) => sqlLiteral(row[column])).join(", ");
      stream.write(
        `INSERT INTO ${quoteIdent(tableName)} (${columns.map(quoteIdent).join(", ")}) VALUES (${values});\n`,
      );
    }
    stream.write("\n");
  }

  await new Promise((resolve, reject) => {
    stream.end(resolve);
    stream.on("error", reject);
  });

  return backupPath;
}

async function writeReviewScript(database, candidates, startedAt) {
  const reviewPath = path.join(outputDir, `review-drop-empty-tables-${database}-${startedAt}.sql`);
  const lines = [
    "-- Review-only SQL generated by scripts/audit-empty-mysql-tables.mjs",
    "-- Do not run blindly. Recheck the SELECT COUNT(*) results immediately before uncommenting DROP TABLE.",
    "-- No DELETE, TRUNCATE, DROP DATABASE, or FOREIGN_KEY_CHECKS changes are used.",
    `USE ${quoteIdent(database)};`,
    "",
  ];

  if (candidates.length === 0) {
    lines.push("-- No eligible empty unused tables found.");
  }

  for (const table of candidates) {
    lines.push(`-- Candidate: ${quoteIdent(table.name)}`);
    lines.push(`-- Reason: ${table.reason}`);
    lines.push(`LOCK TABLES ${quoteIdent(table.name)} WRITE;`);
    lines.push(`SELECT COUNT(*) AS row_count FROM ${quoteIdent(table.name)};`);
    lines.push(`-- If row_count is 0 and you have confirmed no new writes are expected, uncomment:`);
    lines.push(`-- DROP TABLE ${quoteIdent(table.name)};`);
    lines.push("UNLOCK TABLES;");
    lines.push("");
  }

  fs.writeFileSync(reviewPath, `${lines.join("\n")}\n`, "utf8");
  return reviewPath;
}

async function main() {
  loadEnvFile(path.join(projectRoot, ".env.local"));
  loadEnvFile(path.join(projectRoot, ".env"));

  const database = requireEnv("DB_NAME");
  const startedAt = new Date().toISOString().replace(/[:.]/g, "-");
  const connection = await mysql.createConnection({
    host: requireEnv("DB_HOST"),
    port: Number(process.env.DB_PORT ?? 3306),
    user: requireEnv("DB_USER"),
    password: process.env.DB_PASSWORD ?? "",
    database,
    multipleStatements: false,
  });

  try {
    const tables = await getBaseTables(connection, database);
    const corpus = readCodeCorpus();
    const backupPath = await writeBackup(connection, database, tables, startedAt);
    const report = [];

    for (const tableName of tables) {
      const rowCount = await getExactCount(connection, tableName);
      const dependencies = await getDependencies(connection, database, tableName);
      const codeReferences = findCodeReferences(tableName, corpus);
      const protectedByCode =
        explicitProtectedTables.has(tableName) || codeReferences.length > 0;
      const reasons = [];

      if (rowCount !== 0) reasons.push(`has ${rowCount} row(s)`);
      if (protectedByCode) {
        reasons.push(
          explicitProtectedTables.has(tableName)
            ? "used by current project code/model/API"
            : "referenced in source files",
        );
      }
      if (dependencies.length > 0) reasons.push(`has dependencies: ${dependencies.join("; ")}`);

      report.push({
        name: tableName,
        rowCount,
        codeReferences,
        dependencies,
        candidate: rowCount === 0 && !protectedByCode && dependencies.length === 0,
        reason:
          rowCount === 0 && !protectedByCode && dependencies.length === 0
            ? "exact COUNT(*) is 0, no code references found, no FK/view/trigger/routine/event dependencies found"
            : reasons.join(", "),
      });
    }

    const candidates = report.filter((table) => table.candidate);
    const reviewPath = await writeReviewScript(database, candidates, startedAt);
    const reportPath = path.join(outputDir, `candidate-report-${database}-${startedAt}.json`);
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          database,
          generatedAt: new Date().toISOString(),
          backupPath,
          reviewPath,
          tables: report,
        },
        null,
        2,
      ),
      "utf8",
    );

    console.log(`Backup: ${backupPath}`);
    console.log(`Report: ${reportPath}`);
    console.log(`Review SQL: ${reviewPath}`);
    console.log("");
    console.log("Candidate tables:");
    if (candidates.length === 0) {
      console.log("(none)");
    } else {
      for (const table of candidates) {
        console.log(`- ${table.name}: ${table.reason}`);
      }
    }
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
