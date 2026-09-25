import Link from "next/link";
import { Home as HomeIcon, SearchX } from "lucide-react";
import { Brand } from "@/components/agency/Brand";
import { WHATSAPP_DISPLAY, whatsAppContactLink } from "@/lib/agency-data";

export const metadata = {
  title: "Página não encontrada | R&R Casa em Ordem",
};

/** Página 404 (exportada como 404.html), no azul-marinho da marca. */
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-[#060d20] px-4 py-16 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-gold-400/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-brand-400/25 blur-[110px]"
      />

      <div className="relative flex flex-col items-center">
        <Brand size="lg" />

        <span className="mt-8 inline-flex flex-col items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-300">
          <SearchX className="size-5" />
          Erro 404
          <span aria-hidden="true" className="gold-rule h-0.5 w-14 rounded-full" />
        </span>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Não encontramos esta página
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-brand-100/80">
          O endereço pode ter mudado ou não existe mais. Você pode voltar ao
          início e agendar sua limpeza em poucos minutos.
        </p>

        <Link
          href="/"
          className="mt-9 inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 px-7 text-base font-extrabold text-brand-900 shadow-xl shadow-black/25 transition-transform hover:-translate-y-0.5"
        >
          <HomeIcon className="size-4" />
          Voltar ao início
        </Link>

        <p className="mt-7 text-sm text-brand-100/70">
          Precisa de ajuda?{" "}
          <a
            href={whatsAppContactLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gold-300 underline underline-offset-4 transition-colors hover:text-gold-200"
          >
            Fale no WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </p>
      </div>
    </main>
  );
}
