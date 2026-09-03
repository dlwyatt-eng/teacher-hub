import { access, readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const compilerOptions = {
  module: ts.ModuleKind.ES2022,
  target: ts.ScriptTarget.ES2022,
};

async function existingModulePath(basePath) {
  const candidates = path.extname(basePath)
    ? [basePath]
    : [`${basePath}.ts`, `${basePath}.tsx`, `${basePath}.mjs`, `${basePath}.js`, path.join(basePath, "index.ts")];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next supported local-module shape.
    }
  }
  throw new Error(`Could not resolve isolated test dependency: ${basePath}`);
}

/**
 * Compile a TypeScript module and its runtime-only local imports into data URLs.
 * This keeps tests isolated while allowing production data to be split into
 * maintainable subject modules. Type-only imports disappear before resolution.
 */
export async function importIsolatedTsFile(root, relativePath) {
  const cache = new Map();

  const compileToUrl = async (absolutePath) => {
    if (cache.has(absolutePath)) return cache.get(absolutePath);
    const work = (async () => {
      const source = await readFile(absolutePath, "utf8");
      let compiled = ts.transpileModule(source, {
        compilerOptions,
        fileName: path.relative(root, absolutePath),
      }).outputText;
      const specifiers = [...compiled.matchAll(/from\s+["'](\.[^"']+)["']/g)].map((match) => match[1]);
      for (const specifier of new Set(specifiers)) {
        const dependencyPath = await existingModulePath(path.resolve(path.dirname(absolutePath), specifier));
        const dependencyUrl = await compileToUrl(dependencyPath);
        compiled = compiled
          .replaceAll(`from "${specifier}"`, `from "${dependencyUrl}"`)
          .replaceAll(`from '${specifier}'`, `from "${dependencyUrl}"`);
      }
      return `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
    })();
    cache.set(absolutePath, work);
    return work;
  };

  const entryPath = await existingModulePath(path.resolve(root, relativePath));
  return import(await compileToUrl(entryPath));
}
