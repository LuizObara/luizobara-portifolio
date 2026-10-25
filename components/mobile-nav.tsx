"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowRight, Download, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SocialLinks } from "@/components/social-links";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds, site, type SectionKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = Object.keys(sectionIds) as SectionKey[];

export function MobileNav({ lang, dictionary }: { lang: string; dictionary: Dictionary }) {
  const { nav, hero } = dictionary;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pendingHref = useRef<string | null>(null);

  // O Sheet trava a rolagem enquanto está aberto; por isso a navegação até a
  // âncora só acontece depois que ele fecha e devolve o foco
  const navigateAfterClose = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    pendingHref.current = href;
    setOpen(false);
  };

  const handleCloseAutoFocus = (event: Event) => {
    if (!pendingHref.current) return;
    event.preventDefault();
    router.push(pendingHref.current);
    pendingHref.current = null;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-11 md:hidden" aria-label={nav.openMenu}>
          <Menu strokeWidth={1.75} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showClose={false}
        onCloseAutoFocus={handleCloseAutoFocus}
        className="flex w-[330px] max-w-[88vw] flex-col gap-0 border-foreground/[0.08] bg-card px-5 pb-7 pt-2 duration-300 data-[state=open]:duration-300"
      >
        <div className="flex h-[52px] items-center justify-between">
          <SheetTitle className="font-mono text-xs font-normal text-muted-foreground">
            {nav.menu}
          </SheetTitle>
          <SheetDescription className="sr-only">{nav.main}</SheetDescription>
          <SheetClose asChild>
            <Button variant="outline" size="icon" className="size-11" aria-label={nav.closeMenu}>
              <X strokeWidth={1.75} />
            </Button>
          </SheetClose>
        </div>

        <nav aria-label={nav.main} className="mt-4 flex flex-col">
          {links.map((key, index) => {
            const isContact = key === "contact";
            const href = `/${lang}#${sectionIds[key]}`;
            return (
              <Link
                key={key}
                href={href}
                onClick={navigateAfterClose(href)}
                className={cn(
                    "flex h-14 items-center justify-between border-b border-border px-1 text-xl font-medium tracking-[-0.01em] transition-colors",
                  isContact ? "text-brand" : "text-foreground hover:text-brand"
                )}
              >
                <span>{nav[key]}</span>
                <span className={cn("font-mono text-xs", isContact ? "text-brand" : "text-muted-foreground")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <div className="flex items-center justify-between">
            <LanguageSwitcher label={nav.language} size="lg" />
            <ThemeSwitcher label={nav.toggleTheme} className="size-11" />
          </div>
          <Button asChild className="h-12 w-full">
            <Link
              href={`/${lang}#${sectionIds.contact}`}
              onClick={navigateAfterClose(`/${lang}#${sectionIds.contact}`)}
            >
              {hero.contactCta}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="secondary" className="h-12 w-full">
            <a href={site.resumePath} download={site.resumeFileName}>
              {hero.resumeCta}
              <Download />
            </a>
          </Button>
          <SocialLinks className="justify-center pt-1" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
