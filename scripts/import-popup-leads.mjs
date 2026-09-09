import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const defaultExcelPath = path.join(projectRoot, "website_popup_leads.xls");

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

function getArgValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function normalizeHeader(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function cleanText(value) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  const text = String(value).trim();
  return /^(not provided|n\/a|na|null|undefined)$/i.test(text) ? "" : text;
}

function firstValue(row, aliases) {
  for (const alias of aliases) {
    const value = row[alias];
    const text = cleanText(value);
    if (text) return text;
  }
  return "";
}

function parseDate(value) {
  if (!value) return undefined;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  const text = cleanText(value);
  if (!text) return undefined;

  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const match = text.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})(?:\s+(.+))?$/);
  if (!match) return undefined;

  const [, day, month, year, time = "00:00:00"] = match;
  const fullYear = Number(year.length === 2 ? `20${year}` : year);
  const date = new Date(`${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${time}`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

async function loadXlsx() {
  try {
    const xlsxModule = await import("xlsx");
    return xlsxModule.default ?? xlsxModule;
  } catch {
    throw new Error(
      "Missing dependency: xlsx. Pehle `npm install xlsx` chalayein, phir import script run karein.",
    );
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing env var: ${name}. Isse .env.local mein set karein.`);
  }
  return value;
}

function toLead(row) {
  const name = firstValue(row, ["name", "fullname", "yourname", "naam"]);
  const phone = firstValue(row, [
    "phone",
    "mobile",
    "mobilenumber",
    "phonenumber",
    "contact",
    "contactnumber",
    "whatsapp",
    "whatsappnumber",
    "number",
    "phone1value",
    "mobile1value",
  ]);
  const email = firstValue(row, ["email", "emailaddress", "mail"]);
  const city = firstValue(row, ["city", "location", "district", "town"]);
  const state = firstValue(row, ["state", "province", "region"]) || city;
  const post = firstValue(row, ["post", "subject", "form", "leadtype"]) || "Website Popup Lead";
  const sourceRaw = firstValue(row, ["source", "leadsource", "from"]);
  const source =
    sourceRaw && sourceRaw.toLowerCase() !== "website popup lead" ? sourceRaw : "Popup Form";
  const message =
    firstValue(row, ["message", "msg", "comment", "comments", "note", "notes", "enquiry"]) ||
    (city ? `City: ${city}` : "City: Not provided");
  const createdAt = parseDate(
    firstValue(row, ["createdat", "created", "date", "submittedat", "timestamp", "time"]),
  );

  return {
    name,
    phone,
    email: email || null,
    post,
    source,
    state: state || null,
    city: city || null,
    message,
    createdAt,
  };
}

function normalizeRows(rows) {
  return rows.map((row) =>
    Object.fromEntries(Object.entries(row).map(([key, value]) => [normalizeHeader(key), value])),
  );
}

async function main() {
  loadEnvFile(path.join(projectRoot, ".env.local"));
  loadEnvFile(path.join(projectRoot, ".env"));

  const excelPath = path.resolve(projectRoot, getArgValue("--file") ?? defaultExcelPath);
  const dryRun = process.argv.includes("--dry-run");
  const skipDuplicates = process.argv.includes("--skip-duplicates");

  if (!fs.existsSync(excelPath)) {
    throw new Error(`Excel file nahi mili: ${excelPath}`);
  }

  const XLSX = await loadXlsx();
  const workbook = XLSX.readFile(excelPath, { cellDates: true });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error("Excel workbook mein koi sheet nahi mili.");
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = normalizeRows(XLSX.utils.sheet_to_json(sheet, { defval: "" }));
  const leads = rows.map(toLead);
  const validLeads = leads.filter((lead) => lead.name && lead.phone);
  const skippedRows = leads.length - validLeads.length;

  console.log(`File: ${excelPath}`);
  console.log(`Sheet: ${sheetName}`);
  console.log(`Rows found: ${leads.length}`);
  console.log(`Valid rows: ${validLeads.length}`);
  if (skippedRows) console.log(`Skipped rows without name/phone: ${skippedRows}`);

  if (dryRun) {
    console.table(validLeads.slice(0, 10));
    console.log("Dry run complete. DB mein kuch insert nahi hua.");
    return;
  }

  const connection = await mysql.createConnection({
    host: requireEnv("DB_HOST"),
    port: Number(process.env.DB_PORT ?? 3306),
    user: requireEnv("DB_USER"),
    password: process.env.DB_PASSWORD ?? "",
    database: requireEnv("DB_NAME"),
  });

  let inserted = 0;
  let duplicates = 0;

  try {
    for (const lead of validLeads) {
      if (skipDuplicates) {
        const [existing] = await connection.execute(
          "select id from contact_leads where phone = ? and post = ? and source = ? limit 1",
          [lead.phone, lead.post, lead.source],
        );
        if (existing.length > 0) {
          duplicates += 1;
          continue;
        }
      }

      await connection.execute(
        `insert into contact_leads
          (id, name, phone, email, post, source, state, city, message, created_at)
         values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          randomUUID(),
          lead.name,
          lead.phone,
          lead.email,
          lead.post,
          lead.source,
          lead.state,
          lead.city,
          lead.message,
          lead.createdAt ?? new Date(),
        ],
      );
      inserted += 1;
    }
  } finally {
    await connection.end();
  }

  console.log(`Inserted: ${inserted}`);
  if (skipDuplicates) console.log(`Duplicate rows skipped: ${duplicates}`);
  console.log("Import complete.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
