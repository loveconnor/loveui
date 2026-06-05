import { registryFileResponse } from "@/lib/registry-file-response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FREE_REGISTRY_ROOT = "packages/loveui/public/r";
const CACHE_CONTROL =
  "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

const STYLES_INDEX = [
  { name: "base-nova", label: "Nova" },
  { name: "base-vega", label: "Vega" },
  { name: "base-maia", label: "Maia" },
  { name: "base-lyra", label: "Lyra" },
  { name: "base-mira", label: "Mira" },
  { name: "base-luma", label: "Luma" },
  { name: "base-sera", label: "Sera" },
  { name: "base-rhea", label: "Rhea" },
];

const BASE_INDEX_ITEM = {
  $schema: "https://www.loveui.dev/schema/registry-item.json",
  name: "index",
  type: "registry:style",
  dependencies: ["class-variance-authority", "love-ui"],
  registryDependencies: ["utils"],
};

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { path: routePath = [] } = await context.params;
  const registryPath = routePath.join("/");

  if (registryPath === "styles/index.json") {
    return Response.json(STYLES_INDEX, {
      headers: {
        "cache-control": CACHE_CONTROL,
      },
    });
  }

  if (registryPath === "index.json") {
    return Response.json(BASE_INDEX_ITEM, {
      headers: {
        "cache-control": CACHE_CONTROL,
      },
    });
  }

  if (routePath[0] === "styles" && routePath.length === 3) {
    return registryFileResponse({
      root: FREE_REGISTRY_ROOT,
      name: routePath[2],
      cacheControl: CACHE_CONTROL,
    });
  }

  if (routePath[0] === "colors" && routePath.length === 2) {
    return registryFileResponse({
      root: FREE_REGISTRY_ROOT,
      name: "colors-zinc.json",
      cacheControl: CACHE_CONTROL,
    });
  }

  return registryFileResponse({
    root: FREE_REGISTRY_ROOT,
    name: registryPath,
    cacheControl: CACHE_CONTROL,
  });
}
