import * as React from "react"
import { Bun, NPM, PNPM, Yarn } from "@react-symbols/icons"

import { cn } from "@/lib/cn"
import {
  CodeBlock as PrimitiveCodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
} from "@/components/ui/code-block/src/components/code-block/code-block"
import { CodeblockShiki as ShikiCodeBlock } from "@/components/ui/code-block/src/components/code-block/client/shiki"
import { CopyButton } from "@/components/ui/code-block/src/components/code-block/copy-button"
import type { Languages as ShikiLanguage } from "@/components/ui/code-block/src/utils/shiki/highlight"

export type Languages =
  | "html"
  | "js"
  | "ts"
  | "tsx"
  | "css"
  | "bash"
  | "json"
  | "mdx"
  | "python"
  | "java"
  | "cpp"
  | "go"
  | string

function toShikiLanguage(language?: string): ShikiLanguage {
  switch (language) {
    case "html":
    case "js":
    case "ts":
    case "tsx":
    case "css":
    case "bash":
    case "json":
    case "mdx":
      return language
    case "javascript":
    case "jsx":
      return "js"
    case "typescript":
      return "ts"
    case "shell":
    case "sh":
    case "zsh":
      return "bash"
    default:
      return "tsx"
  }
}

function getPackageManagerMeta(code: string) {
  const command = code.trim()

  if (!command.includes("\n")) {
    if (/^(?:npx|npm)\b/.test(command)) return { icon: NPM, label: "npm" }
    if (/^pnpm\b/.test(command)) return { icon: PNPM, label: "pnpm" }
    if (/^yarn\b/.test(command)) return { icon: Yarn, label: "yarn" }
    if (/^bunx?\b/.test(command)) return { icon: Bun, label: "bun" }
  }

  return null
}

export function CodeBlock({
  code,
  language,
  title,
  copyButton = true,
  showLineNumbers = true,
  className,
  children,
}: React.ComponentProps<"figure"> & {
  code?: string
  language?: string
  title?: string
  copyButton?: boolean
  showLineNumbers?: boolean
}) {
  const packageManager = typeof code === "string" ? getPackageManagerMeta(code) : null
  const PackageManagerIcon = packageManager?.icon
  const isSingleLine = typeof code === "string" && !code.trim().includes("\n")

  if (typeof code !== "string") {
    return (
      <PrimitiveCodeBlock
        className={cn(
          "not-fumadocs-codeblock my-5",
          className
        )}
      >
        {children}
      </PrimitiveCodeBlock>
    )
  }

  return (
    <PrimitiveCodeBlock
      className={cn("not-fumadocs-codeblock relative my-5", className)}
    >
      {title && (
        <CodeBlockHeader data-language={language}>
          <CodeBlockGroup>
            <CodeBlockIcon language={language ?? "tsx"} />
            {title}
          </CodeBlockGroup>
          {copyButton && <CopyButton content={code} />}
        </CodeBlockHeader>
      )}
      {!title && PackageManagerIcon && (
        <CodeBlockHeader data-language={language}>
          <CodeBlockGroup className="font-medium">
            <PackageManagerIcon className="size-4" />
            <span>{packageManager.label}</span>
          </CodeBlockGroup>
          {copyButton && <CopyButton content={code} />}
        </CodeBlockHeader>
      )}
      {!title && !PackageManagerIcon && copyButton && (
        <CopyButton
          content={code}
          className={cn(
            "absolute right-3 z-10 inline-flex size-7 items-center justify-center rounded-md opacity-72 hover:bg-neutral-200/70 hover:opacity-100 dark:hover:bg-neutral-800",
            isSingleLine ? "top-1/2 -translate-y-1/2" : "top-3"
          )}
        />
      )}
      <CodeBlockContent>
        <ShikiCodeBlock
          code={code}
          language={toShikiLanguage(language)}
          lineNumbers={showLineNumbers}
          className={cn(
            "text-[.8125rem] [&>pre]:m-0 [&>pre]:!bg-transparent",
            !title && !PackageManagerIcon && copyButton && "[&_.line]:pr-12"
          )}
        />
      </CodeBlockContent>
    </PrimitiveCodeBlock>
  )
}

export function CodeblockShiki({
  code,
  language,
  className,
}: {
  code: string
  language: Languages
  className?: string
}) {
  return (
    <ShikiCodeBlock
      code={code}
      language={toShikiLanguage(language)}
      className={cn("text-sm [&>pre]:m-0 [&>pre]:!bg-transparent", className)}
    />
  )
}

export {
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
  CopyButton,
}
