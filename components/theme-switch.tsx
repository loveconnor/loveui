"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Theme = "light" | "dark" | "system";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  document.documentElement.style.colorScheme = resolvedTheme;
}

export function ThemeSwitch({ className, ...props }: ComponentProps<"div"> & { mode?: "light-dark" | "light-dark-system" }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const initialTheme: Theme =
      storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
        ? storedTheme
        : "system";

    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    window.localStorage.setItem("theme", nextTheme);
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const items = useMemo(
    () => [
      { key: "light" as const, label: "Light theme", icon: Sun },
      { key: "dark" as const, label: "Dark theme", icon: Moon },
      { key: "system" as const, label: "System theme", icon: Monitor },
    ],
    [],
  );

  if (!mounted) {
    return <div className={cn("inline-flex h-8 w-[5.75rem]", className)} {...props} />;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-full border p-1 *:rounded-full",
        className,
      )}
      data-theme-toggle=""
      {...props}
    >
      {items.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          aria-label={label}
          onClick={() => setTheme(key)}
          className={cn(
            "grid size-6.5 place-items-center p-1.5 text-fd-muted-foreground transition-colors",
            theme === key && "bg-fd-accent text-fd-accent-foreground",
          )}
        >
          <Icon className="size-full" fill="currentColor" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
