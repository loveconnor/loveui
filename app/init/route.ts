import { NextRequest, NextResponse } from "next/server";

const PRESET_STYLES = new Set([
  "default",
  "crisp",
  "mono",
  "editorial",
]);

const BASE_COLORS = new Set([
  "neutral",
  "zinc",
  "stone",
  "mauve",
  "olive",
  "mist",
  "taupe",
]);

const MENU_ACCENTS = new Set(["subtle", "bold"]);
const MENU_COLORS = new Set([
  "default",
  "inverted",
  "default-translucent",
  "inverted-translucent",
]);

const RADIUS_VALUES = new Set(["none", "small", "default", "large"]);
const ICON_LIBRARY = "love-ui/icons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const style = readValue(params, "style", PRESET_STYLES, "default");
  const baseColor = readValue(params, "baseColor", BASE_COLORS, "neutral");
  const menuAccent = readValue(params, "menuAccent", MENU_ACCENTS, "subtle");
  const menuColor = readValue(params, "menuColor", MENU_COLORS, "default");
  const radius = readValue(params, "radius", RADIUS_VALUES, "default");
  const rtl = params.get("rtl") === "true";

  if (!style || !baseColor || !menuAccent || !menuColor || !radius) {
    return NextResponse.json(
      { error: "Invalid Love UI init preset." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    $schema: "https://www.loveui.dev/schema/registry-item.json",
    name: `init-base-${style}`,
    type: "registry:base",
    config: {
      style: `base-${style}`,
      tailwind: {
        baseColor,
        cssVariables: true,
      },
      iconLibrary: ICON_LIBRARY,
      rtl,
      menuAccent,
      menuColor,
    },
    meta: {
      radius,
      font: params.get("font") || "geist",
      fontHeading: params.get("fontHeading") || "inherit",
      theme: params.get("theme") || baseColor,
      chartColor: params.get("chartColor") || params.get("theme") || baseColor,
      preset: params.get("preset") || undefined,
      pointer: params.get("pointer") === "true",
      template: params.get("template") || undefined,
    },
  });
}

function readValue(
  params: URLSearchParams,
  key: string,
  allowedValues: Set<string>,
  fallback: string,
) {
  const value = params.get(key) || fallback;
  return allowedValues.has(value) ? value : null;
}
