import { constants } from "node:fs";
import { access, cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const sourcePackagesRoot = path.resolve(packageRoot, "..");
const targetPackagesRoot = path.join(packageRoot, "packages");
const sourceRegistryRoot = path.resolve(packageRoot, "..", "..", "apps", "ui", "public", "r");
const targetRegistryRoot = path.join(packageRoot, "public", "r");

const EXCLUDED_DIRS = new Set([
  "loveui",
  "node_modules",
  "dist",
  ".turbo",
  ".next",
  "build",
  ".cache"
]);

await rm(targetPackagesRoot, { recursive: true, force: true });
await mkdir(targetPackagesRoot, { recursive: true });

const entries = await readdir(sourcePackagesRoot, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  if (EXCLUDED_DIRS.has(entry.name)) continue;

  const sourceDir = path.join(sourcePackagesRoot, entry.name);
  const targetName = entry.name === "ui" ? "love-ui" : entry.name;
  const destinationDir = path.join(targetPackagesRoot, targetName);

  await cp(sourceDir, destinationDir, {
    recursive: true,
    force: true,
    filter: (src) => {
      const base = path.basename(src);
      if (EXCLUDED_DIRS.has(base)) return false;
      return true;
    }
  });
}

const aggregatorPath = path.join(targetPackagesRoot, "love-ui", "index.ts");
await mkdir(path.dirname(aggregatorPath), { recursive: true });

const aggregatorContents = `export { run as runLoveUI } from "../../dist/index.js";
export { run as runLoveUi } from "../../dist/index.js";
export { run } from "../../dist/index.js";
`;

await writeFile(aggregatorPath, aggregatorContents);

await access(sourceRegistryRoot, constants.R_OK);
await rm(targetRegistryRoot, { recursive: true, force: true });
await mkdir(path.dirname(targetRegistryRoot), { recursive: true });
await cp(sourceRegistryRoot, targetRegistryRoot, {
  recursive: true,
  force: true
});
