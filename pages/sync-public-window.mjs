import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "content", "current-learning-window-v2.json");
const outputPath = path.join(root, "public", "generated", "public-window-v2.json");

const source = JSON.parse(await readFile(sourcePath, "utf8"));
const existing = JSON.parse(await readFile(outputPath, "utf8"));

const next = {
  ...existing,
  schemaVersion: source.schemaVersion,
  contentVersion: source.contentVersion,
  sourceUpdatedAt: source.sourceUpdatedAt,
  window: source.window,
  windows: [source.window, ...source.phaseOverrides],
};

delete next.checksum;
const body = `${JSON.stringify(next, null, 2)}\n`;
next.checksum = `sha256:${createHash("sha256").update(body).digest("hex")}`;
await writeFile(outputPath, `${JSON.stringify(next, null, 2)}\n`);

console.log(`Synced ${path.relative(root, outputPath)} from ${path.relative(root, sourcePath)}.`);
