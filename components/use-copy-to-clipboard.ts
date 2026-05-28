"use client"

import * as React from "react"

export function useCopyToClipboard(timeout = 1500) {
  const [isCopied, setIsCopied] = React.useState(false)
  const timerRef = React.useRef<number | null>(null)

  const copyToClipboard = React.useCallback(
    async (value: string) => {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)

      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }

      timerRef.current = window.setTimeout(() => {
        setIsCopied(false)
        timerRef.current = null
      }, timeout)
    },
    [timeout]
  )

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  return { isCopied, copyToClipboard }
}
