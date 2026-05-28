import { constants } from "node:fs";
import { access, cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageRoot, "..", "..");
const sourceRegistryRoot = path.join(repoRoot, "registry");
const targetRegistryRoot = path.join(packageRoot, "registry");
const sourceSkillsRoot = path.join(repoRoot, "public", "loveui-skills");
const targetSkillsRoot = path.join(packageRoot, "skills", "loveui-skills");

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

await access(sourceSkillsRoot, constants.R_OK);
await rm(targetSkillsRoot, { recursive: true, force: true });
await mkdir(path.dirname(targetSkillsRoot), { recursive: true });
await cp(sourceSkillsRoot, targetSkillsRoot, {
  recursive: true,
  force: true,
  filter(source) {
    const name = path.basename(source);
    return name !== ".git" && name !== ".DS_Store";
  }
});

const sourceSkillFiles = await collectFiles(sourceSkillsRoot, { ignoredNames: new Set([".git", ".DS_Store"]) });
const targetSkillFiles = await collectFiles(targetSkillsRoot);

if (sourceSkillFiles.length !== targetSkillFiles.length) {
  throw new Error(
    `Skills copy mismatch: expected ${sourceSkillFiles.length} files, copied ${targetSkillFiles.length}`
  );
}

console.log(`Copied ${sourceSkillFiles.length} skill files into ${path.relative(repoRoot, targetSkillsRoot)}`);

async function collectFiles(root, options = {}) {
  const files = [];
  const entries = await readdir(root, { withFileTypes: true });
  const ignoredNames = options.ignoredNames ?? new Set();

  for (const entry of entries) {
    if (ignoredNames.has(entry.name)) continue;

    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await collectFiles(fullPath, options);
      files.push(...nestedFiles);
      continue;
    }

    if (entry.isFile()) {
      files.push(path.relative(root, fullPath));
    }
  }

  return files;
}
