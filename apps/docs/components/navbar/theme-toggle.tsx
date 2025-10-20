"use client";

import { ThemeSwitcher } from "@repo/theme-switcher";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const resolvedTheme =
    typeof theme === "string" && (theme === "light" || theme === "dark")
      ? theme
      : "system";

  return (
    <ThemeSwitcher
      className={className}
      defaultValue="system"
      onChange={setTheme}
      value={resolvedTheme}
    />
  );
};
