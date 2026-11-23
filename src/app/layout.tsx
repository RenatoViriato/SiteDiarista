import type { Metadata, Viewport } from "next";
import { Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R&R Casa em Ordem — Limpeza Profissional | Sua casa limpa, seu tempo livre",
  description:
    "Agende diaristas profissionais e verificadas: limpeza residencial, pesada, pós-obra, apartamento, escritório e passadoria. Agendamento online rápido e sem complicação.",
  keywords: [
    "diarista",
    "limpeza",
    "agendamento",
    "limpeza residencial",
    "limpeza pós-obra",
    "passadoria",
    "agência de diaristas",
  ],
  authors: [{ name: "R&R Casa em Ordem — Limpeza Profissional" }],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "R&R Casa em Ordem — Limpeza Profissional",
    description:
      "Sua casa limpa, seu tempo livre. Agende uma diarista profissional em minutos.",
    siteName: "R&R Casa em Ordem",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d2c52",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
