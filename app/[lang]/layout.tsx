import ComboLanguage from "@/components/combo-language";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NavigationBar } from "@/components/navigation-bar";
import ButtonOffcanvas from "@/components/offcanvas-button";

import { getDictionary } from "@/lib/get-dictionary";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

const validLangs = ["pt", "en", "es"] as const;
type Locale = (typeof validLangs)[number];

function isValidLocale(lang: string): lang is Locale {
  return validLangs.includes(lang as Locale);
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // 🔥 validação segura
  const safeLang: Locale = isValidLocale(lang) ? lang : "pt";

  const dictionary = await getDictionary(safeLang);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen max-h-screen flex flex-col items-center w-full">
        
        {/* HEADER */}
        <header className="w-full sticky z-40 bg-background top-0 flex justify-center border-b border-b-foreground/10 h-16">
          <nav className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
            
            <div className="flex gap-5 items-center font-semibold">
              <Link href={`/${safeLang}`}>
                <h3 className="text-2xl uppercase">
                  Luiz{" "}
                  <span className="text-red-600 cursor-pointer">
                    Obara
                  </span>
                </h3>
              </Link>
            </div>

            <div className="hidden lg:block">
              <NavigationBar dictionary={dictionary["navigation"]} />
            </div>

            <div className="block lg:hidden">
              <ButtonOffcanvas
                dictionary={dictionary["navigation"]}
                switcher={dictionary["switcher"]}
              />
            </div>

          </nav>
        </header>

        {/* CONTENT */}
        <div className="flex-1 w-full flex flex-col items-center overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col w-full min-h-full max-w-7xl">
            
            <div className="hidden justify-end mt-3 mx-3 xl:flex">
              <ComboLanguage dictionary={dictionary.switcher} />
            </div>

            {children}
          </div>

          <Toaster />
        </div>

        {/* FOOTER */}
        <footer className="w-full lg:flex items-center justify-around border-t py-2 px-[100px] bg-background hidden">
          <ThemeSwitcher />
        </footer>

      </main>
    </ThemeProvider>
  );
}