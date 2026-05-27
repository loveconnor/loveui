"use client"

import * as React from "react"
import { ThemeSwitcher } from "../../../theme-switcher"
import { useTheme } from "next-themes"

export function ModeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = React.useMemo<
    "light" | "dark" | "system" | undefined
  >(() => {
    if (!mounted) return undefined
    if (theme === "system") return "system"
    if (theme === "light" || theme === "dark") return theme
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      return resolvedTheme
    }
    return undefined
  }, [mounted, theme, resolvedTheme])

  const handleThemeChange = React.useCallback(
    (value: "light" | "dark" | "system") => {
      setTheme(value)
    },
    [setTheme]
  )

  return (
    <ThemeSwitcher
      value={currentTheme}
      onChange={handleThemeChange}
      defaultValue="system"
      className="h-8"
    />
  )
}
