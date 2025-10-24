import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = theme === "system"
    ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="h-6 w-12 rounded-full bg-slate-700" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300",
        isDark ? "bg-slate-700" : "bg-accent"
      )}
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "absolute inset-y-0.5 left-0.5 right-0.5 flex items-center justify-between px-1.5 pointer-events-none"
        )}
      >
        <Moon className={cn("h-3 w-3 text-white", isDark ? "opacity-100" : "opacity-60")} />
        <Sun className={cn("h-3 w-3 text-white", isDark ? "opacity-60" : "opacity-100")} />
      </span>
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300",
          isDark ? "translate-x-0.5" : "translate-x-6"
        )}
      />
    </button>
  );
}
