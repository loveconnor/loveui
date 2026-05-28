import { constants } from "node:fs";
import { access, cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageRoot, "..", "..");
const sourceRegistryRoot = path.join(repoRoot, "registry");
const targetRegistryRoot = path.join(packageRoot, "registry");

await access(sourceRegistryRoot, constants.R_OK);
await rm(targetRegistryRoot, { recursive: true, force: true });
await mkdir(path.dirname(targetRegistryRoot), { recursive: true });
await cp(sourceRegistryRoot, targetRegistryRoot, {
  recursive: true,
  force: true
});

const sourceFiles = await collectFiles(sourceRegistryRoot);
const targetFiles = await collectFiles(targetRegistryRoot);

if (sourceFiles.length !== targetFiles.length) {
  throw new Error(
    `Registry copy mismatch: expected ${sourceFiles.length} files, copied ${targetFiles.length}`
  );
}

console.log(`Copied ${sourceFiles.length} registry files into ${path.relative(repoRoot, targetRegistryRoot)}`);

async function collectFiles(root) {
  const files = [];
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await collectFiles(fullPath);
      files.push(...nestedFiles);
      continue;
    }

    if (entry.isFile()) {
      files.push(path.relative(root, fullPath));
    }
  }

  return files;
}
