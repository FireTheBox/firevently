import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baloo",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "FireTheBox",
  description:
    "FireTheBox é uma plataforma para criação e gestão de programas de inovação.",
  icons: {
    icon: "/assets/images/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} ${baloo.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
