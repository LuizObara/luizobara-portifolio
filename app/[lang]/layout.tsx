import ComboLanguage from "@/components/combo-language";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NavigationBar } from "@/components/navigation-bar";

import { getDictionary } from "@/lib/get-dictionary";

import { Toaster } from "@/components/ui/sonner";

import { Locale } from "@/i18n-config";

import Link from 'next/link';

export default async function Layout({
    children,
    params: { lang },
    }: {
    children: React.ReactNode;
    params: { lang: Locale };
    }) {
    const dictionary = await getDictionary(lang);
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen max-h-screen flex flex-col items-center w-full"> 
            <div className="flex-1 w-full flex flex-col items-center overflow-y-auto overflow-x-hidden"> 
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={`/${lang}`}>
                      <h3 className="text-2xl uppercase">
                        Luiz <span className="text-red-600 cursor-pointer">Obara</span>
                      </h3>
                    </Link>
                  </div>
                  <NavigationBar dictionary={dictionary["navigation"]}/>
                </div>
              </nav>
              <div className="flex flex-col w-full min-h-full max-w-7xl">
                <div className="block">
                  <div className="flex justify-end mt-3">
                      <ComboLanguage dictionary={dictionary.switcher}/>
                  </div>
                </div>
                {children}
              </div>
              <Toaster />
            </div>
            <footer className="w-full flex items-center justify-end border-t py-2 px-[100px] left-0 bg-background">
              <ThemeSwitcher />
            </footer>
          </main>

          </ThemeProvider>
    );
}