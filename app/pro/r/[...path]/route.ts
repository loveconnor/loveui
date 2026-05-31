import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

import { isProRegistryRequestAuthorized } from "@/lib/pro-registry-auth";
import { registryFileResponse } from "@/lib/registry-file-response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRO_REGISTRY_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "packages/loveui-pro/public/r"
);

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  if (!(await isProRegistryRequestAuthorized(request))) {
    return NextResponse.json(
      { error: "A valid LoveUI Pro API key or access token is required." },
      {
        status: 401,
        headers: {
          "cache-control": "no-store",
          "www-authenticate": 'Bearer realm="LoveUI Pro Registry"',
        },
      }
    );
  }

  const { path: routePath = [] } = await context.params;

  return registryFileResponse({
    root: PRO_REGISTRY_ROOT,
    name: routePath.join("/"),
    cacheControl: "private, no-store",
  });
}
