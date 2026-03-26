import { Montserrat } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

const montserrat = Montserrat({
  weight: ['100', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Luiz Obara",
  description: "Portfólio Desenvolvedor Full-Stack",
  authors: [
    {
      name: "Luiz Obara",
      url: "https://github.com/luizobara",
    },
  ],
  openGraph: {
    title: "Luiz Obara Portfólio",
    description: "A Web portfólio",
    emails: ["luizobara@gmail.com"],
    images: [
      {
        url: "https://github.com/luizobara.png",
      },
    ],
    countryName: "Brasil",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}