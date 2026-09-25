import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

/** Corpo do site: sans geométrica, ótima em telas pequenas. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** Títulos: serifada de alto contraste, combina com o dourado da marca. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "R&R Casa em Ordem — Limpeza profissional | Sua casa limpa, seu tempo livre",
  description:
    "Limpeza profissional residencial e comercial no Rio de Janeiro e região: diária, limpeza pesada, pós-obra, apartamento, escritório e passadoria. Agende online em minutos, sem complicação.",
  keywords: [
    "diarista",
    "limpeza profissional",
    "casa em ordem",
    "limpeza residencial",
    "limpeza pesada",
    "limpeza pós-obra",
    "passadoria",
    "agendamento de limpeza",
    "diarista Rio de Janeiro",
    "limpeza Rio de Janeiro",
  ],
  authors: [{ name: "R&R Casa em Ordem" }],
  icons: {
    icon: "/icon-512.png",
    apple: "/icon-512.png",
  },
  openGraph: {
    title: "R&R Casa em Ordem — Limpeza profissional",
    description:
      "Sua casa limpa, seu tempo livre. Agende uma limpeza profissional em minutos.",
    siteName: "R&R Casa em Ordem",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1b4c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // As variáveis de fonte ficam no <html>: o tema do Tailwind aplica
  // `--default-font-family: var(--font-inter)` na própria tag <html>, e uma
  // var() sem valor definido invalida a declaração de font-family inteira.
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
