"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sol no claro, lua no escuro; os dois ícones trocam pela classe .dark,
// então não há flash antes de hidratar
export const ThemeSwitcher = ({ label, className }: { label: string; className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={label}
      title={label}
      className={cn("relative", className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun
        strokeWidth={1.75}
        className="rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        strokeWidth={1.75}
        className="absolute rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
};
