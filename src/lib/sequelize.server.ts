import { Sequelize } from "sequelize";

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

  return new Sequelize(database, user, password, {
    host,
    port: Number(process.env["DB_PORT"] ?? 3306),
    dialect: "mysql",
    logging: false,
    pool: { max: 10, min: 0, idle: 10_000 },
  });
}

export function getSequelize(): Sequelize {
  if (!globalThis.__sequelize) {
    globalThis.__sequelize = createSequelize();
  }
  return globalThis.__sequelize;
}
