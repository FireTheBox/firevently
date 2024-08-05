import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Footer } from "@/components/shared/global/footer";
import { Header } from "@/components/shared/global/header";
import { Toaster } from "@/components/ui/toaster";

import { nunito } from "./fonts";

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
      <body className={`${nunito.className} min-h-screen`}>
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
