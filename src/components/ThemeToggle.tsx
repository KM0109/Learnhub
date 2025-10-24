import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300",
        isDark ? "bg-slate-700" : "bg-orange-400"
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
