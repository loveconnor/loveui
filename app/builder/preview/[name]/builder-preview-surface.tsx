"use client"

import * as React from "react"

type TextStyleOverrides = Record<string, { fontSize?: number }>

type PreviewMessage =
  | {
      type: "builder-preview:apply-overrides"
      shapeId: string
      textOverrides?: Record<string, string>
      textStyles?: TextStyleOverrides
    }
  | {
      type: "builder-preview:text-overrides"
      shapeId: string
      textOverrides: Record<string, string>
      textStyles: TextStyleOverrides
    }

export function BuilderPreviewSurface({
  shapeId,
  children,
}: {
  shapeId: string
  children: React.ReactNode
}) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const overridesRef = React.useRef<Record<string, string>>({})
  const stylesRef = React.useRef<TextStyleOverrides>({})
  const [activeTextId, setActiveTextId] = React.useState<string | null>(null)

  const postOverrides = React.useCallback(() => {
    window.parent.postMessage(
      {
        type: "builder-preview:text-overrides",
        shapeId,
        textOverrides: overridesRef.current,
        textStyles: stylesRef.current,
      } satisfies PreviewMessage,
      window.location.origin
    )
  }, [shapeId])

  const applyOverrides = React.useCallback(() => {
    const root = rootRef.current
    if (!root) return

    const spans = root.querySelectorAll<HTMLElement>("[data-builder-text-id]")

    spans.forEach((span) => {
      const id = span.dataset.builderTextId
      const original = span.dataset.builderOriginalText

      if (!id || original === undefined) return

      const nextText = overridesRef.current[id] ?? original

      if (span.textContent !== nextText) {
        span.textContent = nextText
      }

      const fontSize = stylesRef.current[id]?.fontSize
      span.style.fontSize = fontSize ? `${fontSize}px` : ""
    })
  }, [])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    prepareEditableText(root)
    applyOverrides()

    function handleInput(event: Event) {
      const target = getTextTarget(event.target)
      if (!target) return

      updateTextOverride(target, overridesRef.current)
      postOverrides()
    }

    function handleFocusIn(event: FocusEvent) {
      const target = getTextTarget(event.target)
      setActiveTextId(target?.dataset.builderTextId ?? null)
    }

    function handleFocusOut(event: FocusEvent) {
      const target = getTextTarget(event.target)
      if (!target) return

      updateTextOverride(target, overridesRef.current)
      postOverrides()
    }

    function handleKeyDown(event: KeyboardEvent) {
      const target = getTextTarget(event.target)
      if (!target) return

      if (event.key === "Enter") {
        event.preventDefault()
        target.blur()
      }
    }

    root.addEventListener("input", handleInput)
    root.addEventListener("focusin", handleFocusIn)
    root.addEventListener("focusout", handleFocusOut)
    root.addEventListener("keydown", handleKeyDown)

    return () => {
      root.removeEventListener("input", handleInput)
      root.removeEventListener("focusin", handleFocusIn)
      root.removeEventListener("focusout", handleFocusOut)
      root.removeEventListener("keydown", handleKeyDown)
    }
  }, [applyOverrides, postOverrides])

  React.useEffect(() => {
    function handleMessage(event: MessageEvent<PreviewMessage>) {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== "builder-preview:apply-overrides") return
      if (event.data.shapeId !== shapeId) return

      overridesRef.current = event.data.textOverrides ?? {}
      stylesRef.current = event.data.textStyles ?? {}
      applyOverrides()
    }

    window.addEventListener("message", handleMessage)
    window.parent.postMessage(
      { type: "builder-preview:ready", shapeId },
      window.location.origin
    )

    return () => window.removeEventListener("message", handleMessage)
  }, [applyOverrides, shapeId])

  function changeActiveFontSize(delta: number) {
    const root = rootRef.current
    if (!root || !activeTextId) return

    const target = root.querySelector<HTMLElement>(
      `[data-builder-text-id="${CSS.escape(activeTextId)}"]`
    )

    if (!target) return

    const current =
      stylesRef.current[activeTextId]?.fontSize ??
      Number.parseFloat(window.getComputedStyle(target).fontSize) ??
      16
    const next = Math.max(8, Math.min(96, Math.round(current + delta)))

    stylesRef.current = {
      ...stylesRef.current,
      [activeTextId]: { fontSize: next },
    }
    target.style.fontSize = `${next}px`
    postOverrides()
  }

  function resetActiveFontSize() {
    const root = rootRef.current
    if (!root || !activeTextId) return

    const nextStyles = { ...stylesRef.current }
    delete nextStyles[activeTextId]
    stylesRef.current = nextStyles

    const target = root.querySelector<HTMLElement>(
      `[data-builder-text-id="${CSS.escape(activeTextId)}"]`
    )
    if (target) target.style.fontSize = ""

    postOverrides()
  }

  return (
    <>
      <div ref={rootRef}>{children}</div>
      {activeTextId ? (
        <div className="fixed right-3 top-3 z-[2147483647] flex items-center gap-1 rounded-md border bg-background/95 p-1 text-foreground shadow-lg backdrop-blur">
          <button
            type="button"
            className="h-7 rounded px-2 text-xs font-semibold hover:bg-muted"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => changeActiveFontSize(-2)}
          >
            A-
          </button>
          <button
            type="button"
            className="h-7 rounded px-2 text-xs font-semibold hover:bg-muted"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => changeActiveFontSize(2)}
          >
            A+
          </button>
          <button
            type="button"
            className="h-7 rounded px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            onMouseDown={(event) => event.preventDefault()}
            onClick={resetActiveFontSize}
          >
            Reset
          </button>
        </div>
      ) : null}
    </>
  )
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
    span.contentEditable = "true"
    span.spellcheck = false
    span.className =
      "rounded-sm outline-none transition-shadow hover:ring-1 hover:ring-blue-400 focus:ring-2 focus:ring-blue-500"
    span.textContent = node.textContent

    node.replaceWith(span)
  })
}

function getTextTarget(target: EventTarget | null) {
  return target instanceof HTMLElement
    ? target.closest<HTMLElement>("[data-builder-text-id]")
    : null
}

function updateTextOverride(
  target: HTMLElement,
  overrides: Record<string, string>
) {
  const id = target.dataset.builderTextId
  const original = target.dataset.builderOriginalText

  if (!id || original === undefined) return

  const value = target.textContent ?? ""

  if (value === original) {
    delete overrides[id]
  } else {
    overrides[id] = value
  }
}
