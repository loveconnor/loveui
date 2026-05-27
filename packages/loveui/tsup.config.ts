import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/mcp-server.ts"],
  outDir: "dist",
  sourcemap: false,
  clean: true,
  minify: true,
  dts: true,
  format: ["esm"]
});
