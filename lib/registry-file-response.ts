import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const REGISTRY_NAME_PATTERN = /^[a-z0-9][a-z0-9._-]*$/i;

type RegistryFileResponseOptions = {
  root: string;
  name: string;
  cacheControl: string;
};

export function normalizeRegistryFileName(name: string): string | null {
  const normalized = name.trim().replace(/\.json$/i, "");

  if (!REGISTRY_NAME_PATTERN.test(normalized)) {
    return null;
  }

  return `${normalized}.json`;
}

export async function registryFileResponse({
  root,
  name,
  cacheControl,
}: RegistryFileResponseOptions) {
  const fileName = normalizeRegistryFileName(name);

  if (!fileName) {
    return NextResponse.json({ error: "Invalid registry item name." }, { status: 400 });
  }

  try {
    const content = await readFile(
      path.join(/* turbopackIgnore: true */ root, fileName),
      "utf8"
    );

    return new NextResponse(content, {
      headers: {
        "cache-control": cacheControl,
        "content-type": "application/json; charset=utf-8",
      },
    });
  } catch {
    return NextResponse.json({ error: "Registry item not found." }, { status: 404 });
  }
}
