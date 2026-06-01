import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const target = path.join(process.cwd(), "packages", "loveui-pro");
const repo = process.env.LOVEUI_PRO_REPO ?? "https://github.com/loveconnor/loveui-pro.git";
const token = process.env.LOVEUI_PRO_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;

if (existsSync(target)) {
  process.exit(0);
}

if (!token) {
  const message =
    "packages/loveui-pro is missing. Set LOVEUI_PRO_GITHUB_TOKEN to a read-only GitHub token so the private pro repo can be cloned during install.";

  if (process.env.VERCEL || process.env.CI) {
    console.error(message);
    process.exit(1);
  }

  console.warn(`${message} Skipping private clone for local install.`);
  process.exit(0);
}

await mkdir(path.dirname(target), { recursive: true });

const result = spawnSync(
  "git",
  [
    "-c",
    `http.extraheader=AUTHORIZATION: bearer ${token}`,
    "clone",
    "--depth=1",
    repo,
    target,
  ],
  {
    stdio: "inherit",
  },
);

if (result.status !== 0) {
  console.error("Failed to clone private loveui-pro repository.");
  process.exit(result.status ?? 1);
}
