import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

import { getDictionary } from "@/lib/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

function isValidLocale(lang: string): lang is Locale {
  return i18n.locales.includes(lang as Locale);
}

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const safeLang: Locale = isValidLocale(lang) ? lang : i18n.defaultLocale;
  const { meta } = await getDictionary(safeLang);

  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: "Luiz Obara", url: "https://github.com/LuizObara" }],
    openGraph: {
      title: meta.title,
      description: meta.description,
      emails: ["luizobara@gmail.com"],
      images: [{ url: "https://github.com/LuizObara.png" }],
      countryName: "Brasil",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang: Locale = isValidLocale(lang) ? lang : i18n.defaultLocale;
  const dictionary = await getDictionary(safeLang);

  return (
    <html
      lang={safeLang}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader lang={safeLang} dictionary={dictionary} />
          <main id="top">{children}</main>
          <SiteFooter lang={safeLang} dictionary={dictionary} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
