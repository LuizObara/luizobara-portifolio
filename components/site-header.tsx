"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/wordmark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MobileNav } from "@/components/mobile-nav";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds, type SectionKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const desktopLinks: SectionKey[] = ["about", "experience", "projects", "contact"];

export function SiteHeader({ lang, dictionary }: { lang: string; dictionary: Dictionary }) {
  const { nav } = dictionary;
  const pathName = usePathname();
  const isHome = pathName === `/${lang}`;

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: destaca a seção que está no meio da tela
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }

    const sections = Object.values(sectionIds)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-foreground/[0.07] bg-background/70 shadow-[0_10px_30px_-18px_rgba(0,0,0,.6)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="page-container flex h-[60px] items-center justify-between gap-6 md:h-16">
        <Wordmark href={`/${lang}`} />

        <nav aria-label={nav.main} className="hidden items-center gap-1 md:flex">
          {desktopLinks.map((key) => {
            const id = sectionIds[key];
            const isActive = active === id;
            return (
              <Link
                key={key}
                href={`/${lang}#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand after:transition-opacity",
                  isActive ? "text-foreground after:opacity-100" : "text-muted-foreground after:opacity-0"
                )}
              >
                {nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher label={nav.language} />
          <ThemeSwitcher label={nav.toggleTheme} />
        </div>

        <MobileNav lang={lang} dictionary={dictionary} />
      </div>
    </header>
  );
}
