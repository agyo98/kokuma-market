"use client";

import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  const toggleTheme = () => {
    const currentTheme = resolvedTheme ?? systemTheme ?? "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    toggleTheme,
  };
}

