import "./globals.css";

import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Footer } from "@/components/shared/global/footer";
import { Header } from "@/components/shared/global/header";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`${nunito.variable} ${baloo.variable} min-h-screen`}>
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
        <Toaster />
      </body>
    </html>
  );
}
