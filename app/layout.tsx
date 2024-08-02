import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";

import { Footer } from "@/components/shared/global/footer";
import { Header } from "@/components/shared/global/header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

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
  openGraph: {
    title: "Garagem de Startups 2024",
    description:
      "A Garagem de Startups é um bootcamp gratuito de dois meses que busca preparar jovens universitários de São Paulo para dar os primeiros passos no ecossistema de empreendedorismo, através de palestras e mentorias com profissionais de diferentes áreas, workshops, visitas a hubs de inovação e desafios semanais.",
    url: "https://app.firethebox.com/events/66aaa9252fb8f38e03a04fb9",
    siteName: "FireTheBox",
    images: [
      {
        width: 430,
        height: 530,
        url: "https://utfs.io/f/b5b4c058-aebe-49dd-ac12-2d431528a176-1xd2ep.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garagem de Startups 2024",
    description:
      "A Garagem de Startups é um bootcamp gratuito de dois meses que busca preparar jovens universitários de São Paulo para dar os primeiros passos no ecossistema de empreendedorismo, através de palestras e mentorias com profissionais de diferentes áreas, workshops, visitas a hubs de inovação e desafios semanais.",
    images: [
      {
        width: 430,
        height: 530,
        url: "https://utfs.io/f/b5b4c058-aebe-49dd-ac12-2d431528a176-1xd2ep.png",
      },
    ],
    site: "https://app.firethebox.com/events/66aaa9252fb8f38e03a04fb9",
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
