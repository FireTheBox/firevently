import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/shared/global/header";
import { Footer } from "@/components/shared/global/footer";
import { AuthProvider } from "@/components/providers/auth-provider";

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
          <AuthProvider>{children}</AuthProvider>
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
