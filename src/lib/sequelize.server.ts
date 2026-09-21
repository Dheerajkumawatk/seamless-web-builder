import { QueryTypes, Sequelize } from "sequelize";

declare global {
  var __sequelize: Sequelize | undefined;
}

function clean(value: string | undefined) {
  return value?.trim() || undefined;
}

function createSequelize() {
  const host = clean(process.env["DB_HOST"]);
  const user = clean(process.env["DB_USER"]);
  const database = clean(process.env["DB_NAME"]);
  const password = clean(process.env["DB_PASSWORD"]) ?? "";

  if (!host || !user || !database) {
    throw new Error(
      "MySQL env vars missing: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (.env.local mein set karein)",
    );
  }

  const sequelize = new Sequelize(database, user, password, {
    host,
    port: Number(process.env["DB_PORT"] ?? 3306),
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4" },
    define: { charset: "utf8mb4", collate: "utf8mb4_unicode_ci" },
    logging: false,
    pool: { max: 10, min: 0, idle: 10_000 },
  });

  sequelize.addHook("afterConnect", async (connection: unknown) => {
    const mysqlConnection = connection as {
      query?: (sql: string, callback: (error?: Error | null) => void) => void;
    };

    await new Promise<void>((resolve, reject) => {
      mysqlConnection.query?.("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci", (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  });

  return sequelize;
}

export function getSequelize(): Sequelize {
  if (!globalThis.__sequelize) {
    globalThis.__sequelize = createSequelize();
  }
  return globalThis.__sequelize;
}

const charsetSyncPromises = new Map<string, Promise<void>>();

function quoteIdentifier(identifier: string) {
  return `\`${identifier.replaceAll("`", "``")}\``;
}

export async function ensureMysqlUtf8mb4Table(tableName: string): Promise<void> {
  const sequelize = getSequelize();

  if (sequelize.getDialect() !== "mysql") {
    return;
  }

  if (!charsetSyncPromises.has(tableName)) {
    charsetSyncPromises.set(
      tableName,
      (async () => {
        const [status] = await sequelize.query<{ Collation: string | null }>(
          "SHOW TABLE STATUS WHERE Name = ?",
          {
            replacements: [tableName],
            type: QueryTypes.SELECT,
          },
        );

        if (status?.Collation?.startsWith("utf8mb4")) {
          return;
        }

        await sequelize.query(
          `ALTER TABLE ${quoteIdentifier(tableName)} CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
        );
      })().catch((error) => {
        charsetSyncPromises.delete(tableName);
        throw error;
      }),
    );
  }

  await charsetSyncPromises.get(tableName);
}
