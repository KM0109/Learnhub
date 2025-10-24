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
        "relative inline-flex h-9 w-16 items-center rounded-full transition-colors duration-300",
        isDark ? "bg-slate-700" : "bg-orange-400"
      )}
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "absolute inset-y-1 left-1 right-1 flex items-center justify-between px-2 pointer-events-none"
        )}
      >
        <Moon className={cn("h-4 w-4 text-white", isDark ? "opacity-100" : "opacity-60")} />
        <Sun className={cn("h-4 w-4 text-white", isDark ? "opacity-60" : "opacity-100")} />
      </span>
      <span
        className={cn(
          "inline-block h-7 w-7 transform rounded-full bg-white shadow-lg transition-transform duration-300",
          isDark ? "translate-x-1" : "translate-x-8"
        )}
      />
    </button>
  );
}
