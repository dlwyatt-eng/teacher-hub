import { readFile, writeFile } from "node:fs/promises";
const canonical = new URL("../content/truth-learning-2026.json", import.meta.url);
const content = await readFile(canonical, "utf8");
const check = process.argv.includes("--check");
for (const repo of ["equity-hub", "learn"]) {
  const target = new URL(`../../${repo}/content/truth-learning-2026.json`, canonical);
  if (check) {
    if (await readFile(target, "utf8") !== content) throw new Error(`${repo}: truth-learning sources or dates differ`);
  } else await writeFile(target, content);
}
console.log(check ? "Three-site Truth learning sources and dates match." : "Synced Truth learning sources and dates to sibling repositories.");
