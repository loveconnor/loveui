import { chmod, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
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

const askpass = path.join(tmpdir(), "loveui-pro-git-askpass.sh");

await writeFile(
  askpass,
  [
    "#!/bin/sh",
    'case "$1" in',
    '  *Username*) echo "x-access-token" ;;',
    '  *) echo "$LOVEUI_PRO_GITHUB_TOKEN" ;;',
    "esac",
    "",
  ].join("\n"),
);
await chmod(askpass, 0o700);

const result = spawnSync(
  "git",
  ["clone", "--depth=1", repo, target],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      GIT_ASKPASS: askpass,
      GIT_TERMINAL_PROMPT: "0",
      LOVEUI_PRO_GITHUB_TOKEN: token,
    },
  },
);

await rm(askpass, { force: true });

if (result.status !== 0) {
  console.error("Failed to clone private loveui-pro repository.");
  process.exit(result.status ?? 1);
}
