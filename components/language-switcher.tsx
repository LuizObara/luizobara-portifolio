"use client";

import { usePathname, useRouter } from "next/navigation";

import { localeNames, type Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";

const order: Locale[] = ["pt", "en", "es"];

export function LanguageSwitcher({
  label,
  size = "default",
  className,
}: {
  label: string;
  size?: "default" | "lg";
  className?: string;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const current = pathName?.split("/")[1];

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return `/${locale}`;
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  // Mantém a âncora atual (#projetos etc.) ao trocar de idioma: com âncora o Next
  // rola até a seção (o tamanho dos textos muda entre idiomas); sem âncora, fica onde está
  const switchTo = (locale: Locale) => {
    if (locale === current) return;
    const hash = window.location.hash;
    router.push(redirectedPathName(locale) + hash, { scroll: Boolean(hash) });
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex rounded-lg border border-border bg-secondary p-[3px] dark:bg-background", className)}
    >
      {order.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            title={localeNames[locale]}
            aria-pressed={active}
            onClick={() => switchTo(locale)}
            className={cn(
              "rounded-md px-2.5 font-mono text-xs uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              size === "lg" ? "h-[38px] px-3" : "h-[30px]",
              active
                ? "bg-card text-foreground shadow-[0_1px_2px_rgba(16,16,20,.08)] dark:bg-accent dark:shadow-none"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
