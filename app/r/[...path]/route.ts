import path from "node:path";

import { registryFileResponse } from "@/lib/registry-file-response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FREE_REGISTRY_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "packages/loveui/public/r"
);

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { path: routePath = [] } = await context.params;

  return registryFileResponse({
    root: FREE_REGISTRY_ROOT,
    name: routePath.join("/"),
    cacheControl: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
  });
}
