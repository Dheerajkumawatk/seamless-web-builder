import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), ".data");

async function filePath(name: string) {
  await mkdir(dataDir, { recursive: true });
  return path.join(dataDir, `${name}.json`);
}

export async function readLocalRows<T extends { id: string }>(name: string): Promise<T[]> {
  try {
    const file = await filePath(name);
    const content = await readFile(file, "utf8");
    return JSON.parse(content) as T[];
  } catch {
    return [];
  }
}

export async function writeLocalRows<T extends { id: string }>(name: string, rows: T[]) {
  const file = await filePath(name);
  await writeFile(file, JSON.stringify(rows, null, 2), "utf8");
}

export async function insertLocalRow<T extends { id: string; createdAt: string }>(
  name: string,
  input: Omit<T, "id" | "createdAt">,
): Promise<T> {
  const rows = await readLocalRows<T>(name);
  const row = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  } as T;
  await writeLocalRows(name, [row, ...rows]);
  return row;
}

export async function updateLocalRow<T extends { id: string }>(
  name: string,
  id: string,
  input: Record<string, unknown>,
): Promise<T> {
  const rows = await readLocalRows<T>(name);
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) {
    throw new Error(`Local ${name} row not found`);
  }
  const updated = { ...rows[index], ...input } as T;
  rows[index] = updated;
  await writeLocalRows(name, rows);
  return updated;
}

export function mergeRows<T extends { id: string }>(primary: T[], fallback: T[]) {
  const seen = new Set(primary.map((row) => row.id));
  return [...primary, ...fallback.filter((row) => !seen.has(row.id))];
}
