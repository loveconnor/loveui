import JSZip from "jszip"

import {
  getRegistryPayload,
  registryDependencyToName,
  type BuilderRegistryItemPayload,
} from "@/lib/builder/registry"
import type {
  BuilderDocument,
  BuilderDocumentItem,
  BuilderDocumentPage,
  BuilderElementOverride,
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

type PageRoute = {
  page: BuilderDocumentPage
  path: string
  componentName: string
  routeSegment: string | null
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
  includeProRegistry = false,
}: {
  document: BuilderDocument
  framework: BuilderFramework
  projectName: string
  includeProRegistry?: boolean
}) {
  const files = await createProjectFiles({
    document,
    framework,
    projectName,
    includeProRegistry,
  })
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
  includeProRegistry = false,
}: {
  document: BuilderDocument
  framework: BuilderFramework
  projectName: string
  includeProRegistry?: boolean
}) {
  const registryItems = await resolveDocumentRegistryItems(document, {
    includeProRegistry,
  })
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
    createRuntimeOverridesFile(framework),
    ...createEntryFiles({ document, framework, imports }),
  ]

  return files.sort((a, b) => a.path.localeCompare(b.path))
}

async function resolveDocumentRegistryItems(
  document: BuilderDocument,
  {
    includeProRegistry = false,
  }: {
    includeProRegistry?: boolean
  } = {}
) {
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

    const payload = await getRegistryPayload(name, {
      includePro: includeProRegistry,
    })
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

function createEntryFiles({
  document,
  framework,
  imports,
}: {
  document: BuilderDocument
  framework: BuilderFramework
  imports: ComponentImport[]
}): ExportFile[] {
  const importLines = imports.map((item) => {
    if (item.isDefault) {
      return `import ${item.componentName} from "${item.importPath}"`
    }

    return `import { ${item.importName} as ${item.componentName} } from "${item.importPath}"`
  })
  const importByKey = new Map(imports.map((item) => [item.key, item]))
  const pages =
    document.pages.length > 0
      ? document.pages
      : [{ id: "page-home", name: "Home", x: 0, y: 0, w: 1280, h: 800 }]
  const pageRoutes = createPageRoutes(pages)
  const routeByPageId = new Map(
    pageRoutes.map((route) => [route.page.id, route.path])
  )
  const sortedItems = [...document.items].sort((a, b) => a.zIndex - b.zIndex)
  const itemsByPage = new Map<string, BuilderDocumentItem[]>()

  for (const item of sortedItems) {
    const page = findContainingPage(item, pages) ?? pages[0]
    const bucket = itemsByPage.get(page.id)

    if (bucket) {
      bucket.push(item)
    } else {
      itemsByPage.set(page.id, [item])
    }
  }

  const pageComponentImports = `${importLines.join("\n")}
import { BuilderElementOverrides } from "@/components/loveui-builder-overrides"`
  const pageComponents = pageRoutes
    .map((route) => {
      const itemMarkup = (itemsByPage.get(route.page.id) ?? [])
        .map((item) =>
          renderDocumentItem(
            item,
            importByKey.get(item.id),
            route.page,
            routeByPageId
          )
        )
        .join("\n")

      return `export function ${route.componentName}() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      {/* ${escapeComment(route.page.name)} */}
      <section
        aria-label="${escapeAttribute(route.page.name)}"
        className="relative mx-auto overflow-hidden rounded-lg border bg-background"
        style={{ width: ${Math.round(route.page.w)}, minHeight: ${Math.round(route.page.h)} }}
      >
${itemMarkup || "        <div className=\"p-8 text-sm text-muted-foreground\">Add LoveUI items in Builder, then export again.</div>"}
      </section>
    </main>
  )
}`
    })
    .join("\n\n")
  const generatedPagesPath =
    framework === "next"
      ? "components/builder-generated-pages.tsx"
      : "src/components/builder-generated-pages.tsx"
  const files: ExportFile[] = [
    {
      path: generatedPagesPath,
      content: `${pageComponentImports}

${pageComponents}
`,
    },
  ]

  if (framework === "next") {
    for (const route of pageRoutes) {
      files.push({
        path: route.routeSegment
          ? `app/${route.routeSegment}/page.tsx`
          : "app/page.tsx",
        content: `import { ${route.componentName} } from "@/components/builder-generated-pages"

export default function Page() {
  return <${route.componentName} />
}
`,
      })
    }

    return files
  }

  const routeEntries = pageRoutes
    .map(
      (route) =>
        `  { path: "${route.path}", Component: ${route.componentName} },`
    )
    .join("\n")

  files.push({
    path: "src/App.tsx",
    content: `import { ${pageRoutes.map((route) => route.componentName).join(", ")} } from "@/components/builder-generated-pages"

const routes = [
${routeEntries}
]

export default function App() {
  const pathname =
    typeof window === "undefined"
      ? "/"
      : window.location.pathname.replace(/\\/$/, "") || "/"
  const route = routes.find((entry) => entry.path === pathname) ?? routes[0]
  const Component = route.Component

  return <Component />
}
`,
  })

  return files
}

function findContainingPage(
  item: BuilderDocumentItem,
  pages: BuilderDocumentPage[]
) {
  const centerX = item.x + item.w / 2
  const centerY = item.y + item.h / 2

  return pages.find(
    (page) =>
      centerX >= page.x &&
      centerX <= page.x + page.w &&
      centerY >= page.y &&
      centerY <= page.y + page.h
  )
}

function renderDocumentItem(
  item: BuilderDocumentItem,
  importInfo: ComponentImport | undefined,
  page: BuilderDocumentPage,
  routeByPageId: Map<string, string>
) {
  const className = item.overrides?.className?.trim()
  const label = item.overrides?.label?.trim()
  const notes = item.overrides?.notes?.trim()
  const left = Math.round(item.x - page.x)
  const top = Math.round(item.y - page.y)
  const rotation = item.rotation
    ? `, transform: "rotate(${item.rotation}rad)"`
    : ""
  const style = `left: ${left}, top: ${top}, width: ${Math.round(item.w)}, minHeight: ${Math.round(item.h)}${rotation}, zIndex: ${item.zIndex}`
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
          ${renderWithRuntimeOverrides(
            `<${importInfo.componentName} />`,
            item,
            routeByPageId
          )}
        </section>`
}

function createPageRoutes(pages: BuilderDocumentPage[]): PageRoute[] {
  const usedSegments = new Set<string>()
  const usedComponents = new Set<string>()

  return pages.map((page, index) => {
    const baseSegment = slugify(page.name) || `page-${index + 1}`
    let routeSegment = index === 0 ? null : baseSegment
    let suffix = 2

    while (routeSegment && usedSegments.has(routeSegment)) {
      routeSegment = `${baseSegment}-${suffix}`
      suffix += 1
    }

    if (routeSegment) usedSegments.add(routeSegment)

    return {
      page,
      path: routeSegment ? `/${routeSegment}` : "/",
      componentName: uniqueIdentifier(`${page.name} page`, usedComponents),
      routeSegment,
    }
  })
}

function renderWithRuntimeOverrides(
  componentMarkup: string,
  item: BuilderDocumentItem,
  routeByPageId: Map<string, string>
) {
  const textOverrides = item.overrides?.text
  const textStyles = item.overrides?.textStyles
  const elementOverrides = createRuntimeElementOverrides(item, routeByPageId)
  const props: string[] = []

  if (textOverrides && Object.keys(textOverrides).length > 0) {
    props.push(`textOverrides={${JSON.stringify(textOverrides)}}`)
  }

  if (textStyles && Object.keys(textStyles).length > 0) {
    props.push(`textStyles={${JSON.stringify(textStyles)}}`)
  }

  if (elementOverrides && Object.keys(elementOverrides).length > 0) {
    props.push(`elementOverrides={${JSON.stringify(elementOverrides)}}`)
  }

  if (props.length === 0) return componentMarkup

  return `<BuilderElementOverrides ${props.join(" ")}>
            ${componentMarkup}
          </BuilderElementOverrides>`
}

function createRuntimeElementOverrides(
  item: BuilderDocumentItem,
  routeByPageId: Map<string, string>
) {
  const elements = item.overrides?.elements

  if (!elements) return undefined

  const result: Record<
    string,
    BuilderElementOverride & { linkHref?: string }
  > = {}

  for (const [id, override] of Object.entries(elements)) {
    const linkHref =
      override.link?.kind === "frame"
        ? routeByPageId.get(override.link.pageId)
        : undefined
    const next = { ...override, linkHref }

    delete next.link

    if (
      next.dx ||
      next.dy ||
      next.w !== undefined ||
      next.h !== undefined ||
      next.styles ||
      next.hidden ||
      next.linkHref
    ) {
      result[id] = next
    }
  }

  return Object.keys(result).length > 0 ? result : undefined
}

function createRuntimeOverridesFile(framework: BuilderFramework): ExportFile {
  return {
    path:
      framework === "next"
        ? "components/loveui-builder-overrides.tsx"
        : "src/components/loveui-builder-overrides.tsx",
    content: `"use client"

import * as React from "react"

type BuilderRuntimeElementOverride = {
  dx?: number
  dy?: number
  w?: number
  h?: number
  styles?: Record<string, string>
  hidden?: boolean
  linkHref?: string
}

export function BuilderElementOverrides({
  children,
  textOverrides = {},
  textStyles = {},
  elementOverrides = {},
}: {
  children: React.ReactNode
  textOverrides?: Record<string, string>
  textStyles?: Record<string, { fontSize?: number }>
  elementOverrides?: Record<string, BuilderRuntimeElementOverride>
}) {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const root = rootRef.current

    if (!root) return

    prepareEditableText(root)
    prepareElements(root)
    applyTextOverrides(root, textOverrides, textStyles)
    applyElementOverrides(root, elementOverrides)
  }, [textOverrides, textStyles, elementOverrides])

  React.useEffect(() => {
    const root = rootRef.current

    if (!root) return

    function activate(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false

      const linked = target.closest<HTMLElement>("[data-builder-link-href]")

      if (!linked || !root.contains(linked)) return false

      const href = linked.dataset.builderLinkHref

      if (!href) return false

      window.location.href = href

      return true
    }

    function handleClick(event: MouseEvent) {
      if (activate(event.target)) event.preventDefault()
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Enter" && event.key !== " ") return
      if (activate(event.target)) event.preventDefault()
    }

    root.addEventListener("click", handleClick)
    root.addEventListener("keydown", handleKeyDown)

    return () => {
      root.removeEventListener("click", handleClick)
      root.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return <div ref={rootRef}>{children}</div>
}

function applyElementOverrides(
  root: HTMLElement,
  overrides: Record<string, BuilderRuntimeElementOverride>
) {
  for (const [id, override] of Object.entries(overrides)) {
    const element = root.querySelector<HTMLElement>(
      \`[data-builder-el="\${CSS.escape(id)}"]\`
    )

    if (!element) continue

    if (override.hidden) {
      element.style.display = "none"
      element.removeAttribute("data-builder-link-href")
      continue
    }

    if (override.dx || override.dy) {
      element.style.transform = \`translate(\${override.dx ?? 0}px, \${override.dy ?? 0}px)\`
    }

    if (override.w !== undefined) element.style.width = \`\${override.w}px\`
    if (override.h !== undefined) element.style.height = \`\${override.h}px\`

    for (const [key, value] of Object.entries(override.styles ?? {})) {
      ;(element.style as unknown as Record<string, string>)[key] = value
    }

    if (override.linkHref) {
      if (element instanceof HTMLAnchorElement) {
        element.href = override.linkHref
      } else {
        element.dataset.builderLinkHref = override.linkHref
        element.setAttribute("role", "link")
        element.tabIndex = element.tabIndex >= 0 ? element.tabIndex : 0
        if (!element.style.cursor) element.style.cursor = "pointer"
      }
    }
  }
}

function prepareElements(root: HTMLElement) {
  if (root.dataset.builderElPrepared === "true") return

  root.dataset.builderElPrepared = "true"

  let index = 0

  root.querySelectorAll<HTMLElement>("*").forEach((element) => {
    if (element.closest("svg") && element.tagName.toLowerCase() !== "svg") return

    element.dataset.builderEl = String(index++)
  })
}

function prepareEditableText(root: HTMLElement) {
  if (root.dataset.builderTextPrepared === "true") return

  root.dataset.builderTextPrepared = "true"

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent
      const parent = node.parentElement

      if (!text?.trim() || !parent) return NodeFilter.FILTER_REJECT
      if (parent.closest("[data-builder-text-id]")) return NodeFilter.FILTER_REJECT
      if (parent.closest("script, style, svg, textarea, input, select")) {
        return NodeFilter.FILTER_REJECT
      }

      return NodeFilter.FILTER_ACCEPT
    },
  })

  const textNodes: Text[] = []
  let current = walker.nextNode()

  while (current) {
    textNodes.push(current as Text)
    current = walker.nextNode()
  }

  textNodes.forEach((node, index) => {
    const span = document.createElement("span")

    span.dataset.builderTextId = String(index)
    span.dataset.builderOriginalText = node.textContent ?? ""
    span.textContent = node.textContent

    node.replaceWith(span)
  })
}

function applyTextOverrides(
  root: HTMLElement,
  textOverrides: Record<string, string>,
  textStyles: Record<string, { fontSize?: number }>
) {
  root.querySelectorAll<HTMLElement>("[data-builder-text-id]").forEach((span) => {
    const id = span.dataset.builderTextId
    const original = span.dataset.builderOriginalText

    if (!id || original === undefined) return

    const nextText = textOverrides[id] ?? original

    if (span.textContent !== nextText) span.textContent = nextText

    const fontSize = textStyles[id]?.fontSize

    span.style.fontSize = fontSize ? \`\${fontSize}px\` : ""
  })
}
`,
  }
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
    .replace(/@\/components\/ui\/recharts-chart/g, "@/components/ui/chart")
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
