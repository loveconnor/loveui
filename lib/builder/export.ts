import JSZip from "jszip"

import {
  getRegistryPayload,
  registryDependencyToName,
  type BuilderRegistryItemPayload,
} from "@/lib/builder/registry"
import type {
  BuilderDocument,
  BuilderDocumentItem,
  BuilderFramework,
} from "@/lib/builder/types"

type ExportFile = {
  path: string
  content: string
}

type ComponentImport = {
  key: string
  componentName: string
  importName: string
  importPath: string
  isDefault: boolean
}

const baseDependencies = {
  "@vitejs/plugin-react": "^latest",
  "typescript": "^latest",
  "vite": "^latest",
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "tailwindcss": "^4.3.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.6.0",
  "love-ui": "latest",
}

export async function createBuilderProjectZip({
  document,
  framework,
  projectName,
}: {
  document: BuilderDocument
  framework: BuilderFramework
  projectName: string
}) {
  const files = await createProjectFiles({ document, framework, projectName })
  const zip = new JSZip()

  for (const file of files) {
    zip.file(file.path, file.content)
  }

  return zip.generateAsync({ type: "uint8array" })
}

export async function createProjectFiles({
  document,
  framework,
  projectName,
}: {
  document: BuilderDocument
  framework: BuilderFramework
  projectName: string
}) {
  const registryItems = await resolveDocumentRegistryItems(document)
  const dependencies = new Set<string>()
  const sourceFiles = new Map<string, string>()

  for (const item of registryItems.values()) {
    for (const dependency of item.dependencies ?? []) {
      dependencies.add(dependency)
    }

    for (const file of item.files ?? []) {
      if (!file.content || file.type === "registry:page") continue

      const target = normalizeTargetPath(
        file.target ?? fallbackTargetPath(item, file.path),
        framework
      )

      if (!target || sourceFiles.has(target)) continue

      sourceFiles.set(target, transformRegistrySource(file.content))
    }
  }

  const imports = createComponentImports({
    document,
    framework,
    registryItems,
  })
  const files: ExportFile[] = [
    ...createTemplateFiles({ framework, projectName, dependencies }),
    ...Array.from(sourceFiles.entries()).map(([filePath, content]) => ({
      path: filePath,
      content,
    })),
    createUtilsFile(framework),
    createEntryFile({ document, framework, imports }),
  ]

  return files.sort((a, b) => a.path.localeCompare(b.path))
}

async function resolveDocumentRegistryItems(document: BuilderDocument) {
  const names = Array.from(
    new Set(
      document.items
        .filter((item) => item.registryType !== "asset:icon")
        .map((item) => item.registryName)
        .filter(Boolean)
    )
  )
  const resolved = new Map<string, BuilderRegistryItemPayload>()
  const queue = [...names]

  while (queue.length > 0) {
    const name = queue.shift()
    if (!name || resolved.has(name)) continue

    const payload = await getRegistryPayload(name)
    if (!payload) continue

    resolved.set(name, payload)

    for (const dependency of payload.registryDependencies ?? []) {
      const dependencyName = registryDependencyToName(dependency)

      if (dependencyName && !resolved.has(dependencyName)) {
        queue.push(dependencyName)
      }
    }
  }

  return resolved
}

function createComponentImports({
  document,
  framework,
  registryItems,
}: {
  document: BuilderDocument
  framework: BuilderFramework
  registryItems: Map<string, BuilderRegistryItemPayload>
}) {
  const imports: ComponentImport[] = []
  const usedNames = new Set<string>()

  for (const item of document.items) {
    const componentName = uniqueIdentifier(
      toPascalCase(item.overrides?.label || item.title || item.registryName),
      usedNames
    )

    if (item.registryType === "asset:icon") {
      imports.push({
        key: item.id,
        componentName,
        importName: toPascalCase(item.registryName),
        importPath: "love-ui/icons",
        isDefault: false,
      })
      continue
    }

    const registryItem = registryItems.get(item.registryName)
    const primaryFile = registryItem?.files?.find(
      (file) => file.content && file.type !== "registry:page"
    )

    if (!registryItem || !primaryFile?.content) continue

    const target = normalizeTargetPath(
      primaryFile.target ?? fallbackTargetPath(registryItem, primaryFile.path),
      framework
    )
    const exportInfo = getComponentExport(primaryFile.content, registryItem.name)

    if (!target || !exportInfo) continue

    imports.push({
      key: item.id,
      componentName,
      importName: exportInfo.name,
      importPath: toImportPath(target, framework),
      isDefault: exportInfo.isDefault,
    })
  }

  return imports
}

function createEntryFile({
  document,
  framework,
  imports,
}: {
  document: BuilderDocument
  framework: BuilderFramework
  imports: ComponentImport[]
}) {
  const importLines = imports.map((item) => {
    if (item.isDefault) {
      return `import ${item.componentName} from "${item.importPath}"`
    }

    return `import { ${item.importName} as ${item.componentName} } from "${item.importPath}"`
  })
  const importByKey = new Map(imports.map((item) => [item.key, item]))
  const page = document.pages[0] ?? {
    id: "page-home",
    name: "Home",
    x: 0,
    y: 0,
    w: 1200,
    h: 900,
  }
  const itemMarkup = [...document.items]
    .sort((a, b) => a.zIndex - b.zIndex)
    .map((item) => renderDocumentItem(item, importByKey.get(item.id)))
    .join("\n")
  const content = `${importLines.join("\n")}

export default function ${framework === "next" ? "Page" : "App"}() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div
        className="relative mx-auto overflow-hidden rounded-lg border bg-background"
        style={{ width: ${page.w}, minHeight: ${page.h} }}
      >
${itemMarkup || "        <div className=\"p-8 text-sm text-muted-foreground\">Add LoveUI items in Builder, then export again.</div>"}
      </div>
    </main>
  )
}
`

  return {
    path: framework === "next" ? "app/page.tsx" : "src/App.tsx",
    content,
  }
}

function renderDocumentItem(item: BuilderDocumentItem, importInfo?: ComponentImport) {
  const className = item.overrides?.className?.trim()
  const label = item.overrides?.label?.trim()
  const notes = item.overrides?.notes?.trim()
  const style = `left: ${item.x}px, top: ${item.y}px, width: ${item.w}px, minHeight: ${item.h}px, transform: "rotate(${item.rotation}rad)", zIndex: ${item.zIndex}`
  const wrapperClass = className
    ? `absolute ${escapeAttribute(className)}`
    : "absolute"

  if (!importInfo) {
    return `        <section className="${wrapperClass}" style={{ ${style} }}>
          <div className="flex h-full min-h-24 items-center justify-center rounded-md border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
            ${escapeJsxText(label || item.title)}
          </div>
        </section>`
  }

  if (item.registryType === "asset:icon") {
    return `        <section className="${wrapperClass}" style={{ ${style} }} aria-label="${escapeAttribute(label || item.title)}">
          <${importInfo.componentName} className="h-full w-full" />
        </section>`
  }

  return `        <section className="${wrapperClass}" style={{ ${style} }}>
          ${notes ? `{/* ${escapeComment(notes)} */}` : ""}
          <${importInfo.componentName} />
        </section>`
}

function createTemplateFiles({
  framework,
  projectName,
  dependencies,
}: {
  framework: BuilderFramework
  projectName: string
  dependencies: Set<string>
}) {
  const packageDependencies: Record<string, string> = {
    ...baseDependencies,
  }

  for (const dependency of dependencies) {
    const name = dependency.split("@")[0] ? dependency : dependency

    if (name && !name.startsWith("@/")) {
      packageDependencies[name] = "latest"
    }
  }

  if (framework === "next") {
    packageDependencies.next = "^16.2.6"
  }

  const packageJson = {
    name: slugify(projectName),
    private: true,
    version: "0.0.0",
    type: "module",
    scripts:
      framework === "next"
        ? { dev: "next dev", build: "next build", start: "next start" }
        : { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: packageDependencies,
    devDependencies: {},
  }

  const files: ExportFile[] = [
    {
      path: "package.json",
      content: `${JSON.stringify(packageJson, null, 2)}\n`,
    },
    {
      path: "tsconfig.json",
      content: JSON.stringify(createTsConfig(framework), null, 2) + "\n",
    },
  ]

  if (framework === "next") {
    files.push(
      {
        path: "app/layout.tsx",
        content: `import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`,
      },
      {
        path: "app/globals.css",
        content: createGlobalCss(),
      },
      {
        path: "next.config.mjs",
        content: `const config = {}\n\nexport default config\n`,
      }
    )
  } else {
    files.push(
      {
        path: "index.html",
        content: `<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n`,
      },
      {
        path: "src/main.tsx",
        content: `import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`,
      },
      {
        path: "src/index.css",
        content: createGlobalCss(),
      },
      {
        path: "vite.config.ts",
        content: `import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
`,
      }
    )
  }

  return files
}

function createUtilsFile(framework: BuilderFramework): ExportFile {
  return {
    path: framework === "next" ? "lib/utils.ts" : "src/lib/utils.ts",
    content: `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
  }
}

function createTsConfig(framework: BuilderFramework) {
  const base = {
    compilerOptions: {
      target: "ES2022",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "react-jsx",
      baseUrl: ".",
      paths: framework === "next" ? { "@/*": ["./*"] } : { "@/*": ["./src/*"] },
    },
    include:
      framework === "next"
        ? ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
        : ["src/**/*.ts", "src/**/*.tsx", "vite.config.ts"],
  }

  return base
}

function createGlobalCss() {
  return `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --border: #e4e4e7;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
`
}

function transformRegistrySource(source: string) {
  return source
    .replace(/@\/registry\/default\/ui\//g, "@/components/ui/")
    .replace(/@\/registry\/default\/blocks\//g, "@/components/blocks/")
}

function normalizeTargetPath(target: string | undefined, framework: BuilderFramework) {
  if (!target) return null
  if (target.startsWith("app/")) return framework === "next" ? target : null
  if (framework === "next") return target
  if (target.startsWith("src/")) return target

  return `src/${target}`
}

function fallbackTargetPath(item: BuilderRegistryItemPayload, sourcePath?: string) {
  if (item.type === "registry:example") {
    return `components/loveui/${item.name}.tsx`
  }

  if (sourcePath?.includes("/ui/")) {
    return `components/ui/${item.name}.tsx`
  }

  const fileName = sourcePath?.split("/").pop() ?? `${item.name}.tsx`

  return `components/loveui/${item.name}/${fileName}`
}

function getComponentExport(source: string, fallbackName: string) {
  const defaultFunction = source.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/)
  if (defaultFunction?.[1]) {
    return { name: defaultFunction[1], isDefault: true }
  }

  if (/export\s+default\s+/.test(source)) {
    return { name: toPascalCase(fallbackName), isDefault: true }
  }

  const named =
    source.match(/export\s+function\s+([A-Za-z0-9_]+)/) ??
    source.match(/export\s+const\s+([A-Za-z0-9_]+)/) ??
    source.match(/export\s+class\s+([A-Za-z0-9_]+)/)

  if (named?.[1]) {
    return { name: named[1], isDefault: false }
  }

  return null
}

function toImportPath(filePath: string, framework: BuilderFramework) {
  const withoutExtension = filePath.replace(/\.(tsx|ts|jsx|js)$/, "")

  if (framework === "next") {
    return `@/${withoutExtension}`
  }

  return `@/${withoutExtension.replace(/^src\//, "")}`
}

function uniqueIdentifier(value: string, used: Set<string>) {
  const base = toPascalCase(value) || "LoveUIItem"
  let candidate = base
  let index = 2

  while (used.has(candidate)) {
    candidate = `${base}${index}`
    index += 1
  }

  used.add(candidate)

  return candidate
}

function toPascalCase(value: string) {
  const normalized = value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("")

  return normalized.match(/^[0-9]/) ? `Item${normalized}` : normalized
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "loveui-builder-export"
  )
}

function escapeAttribute(value: string) {
  return value.replace(/"/g, "&quot;")
}

function escapeComment(value: string) {
  return value.replace(/\*\//g, "* /")
}

function escapeJsxText(value: string) {
  return value.replace(/[{}<>]/g, "")
}
