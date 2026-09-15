import { cp, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const standalone = path.join(dist, "standalone");

async function copyIfExists(from, to) {
  if (existsSync(from)) {
    await mkdir(path.dirname(to), { recursive: true });
    await cp(from, to, { recursive: true, force: true });
  }
}

if (!existsSync(standalone)) {
  throw new Error("dist/standalone not found. Run next build first.");
}

await copyIfExists(path.join(dist, "static"), path.join(standalone, "dist", "static"));
await copyIfExists(path.join(root, "public"), path.join(standalone, "public"));

await copyIfExists(path.join(root, "src/assets/fonts"), path.join(standalone, "src/assets/fonts"));
await copyIfExists(
  path.join(root, "src/assets/vikas-mitra-id-card.png"),
  path.join(standalone, "src/assets/vikas-mitra-id-card.png"),
);

await writeFile(
  path.join(dist, "package.json"),
  `${JSON.stringify(
    {
      private: true,
      scripts: {
        start: "node standalone/server.js",
      },
    },
    null,
    2,
  )}\n`,
);

await writeFile(
  path.join(dist, "README.txt"),
  [
    "Bharat Pehchan production build",
    "",
    "Upload this whole dist folder to a Node.js server.",
    "",
    "Start command from inside dist:",
    "npm start",
    "",
    "Alternative:",
    "node standalone/server.js",
    "",
    "Optional env:",
    "PORT=3000",
    "HOSTNAME=0.0.0.0",
    "",
  ].join("\n"),
);

console.log("dist is ready for Node.js hosting.");
