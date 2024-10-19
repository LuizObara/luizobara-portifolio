import { Montserrat } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: "Luiz Obara",
  description: "Portifólio Desenvolvedor Full-stack",
  authors: {name: "Luiz Obara", url: "https://github.com/GustavoObara"},
  openGraph: {
    title: 'Luiz Obara Portifólio',
    emails: 'luizobara@gmail.com',
    description: 'A Web portifólio ',
    images: [{url: 'https://github.com/gustavoobara.png'}],
    countryName: 'Brasil'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}