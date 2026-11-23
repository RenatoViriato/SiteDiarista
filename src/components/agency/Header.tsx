"use client";

import { useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/agency/Brand";
import type { SectionId } from "@/components/agency/types";

interface HeaderProps {
  /** "home" mostra a navegação completa; "booking" mostra botão de voltar */
  view: "home" | "booking";
  onGoHome: () => void;
  onGoSection: (id: SectionId) => void;
  onGoBooking: () => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "contato", label: "Contato" },
];

/** Cabeçalho fixo com navegação simples e intuitiva (desktop + mobile). */
export function Header({
  view,
  onGoHome,
  onGoSection,
  onGoBooking,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionClick = (id: SectionId) => {
    setMenuOpen(false);
    onGoSection(id);
  };

  const handleBookingClick = () => {
    setMenuOpen(false);
    onGoBooking();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onGoHome}
          className="rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label="Ir para a página inicial"
        >
          <Brand />
        </button>

        {/* Navegação desktop */}
        {view === "home" ? (
          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSectionClick(item.id)}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <p className="hidden text-sm font-semibold text-muted-foreground md:block">
            Agendamento de serviço
          </p>
        )}

        <div className="hidden md:block">
          {view === "home" ? (
            <Button
              onClick={handleBookingClick}
              className="h-10 rounded-xl px-5 shadow-sm shadow-brand-600/25"
            >
              <CalendarCheck className="size-4" />
              Agendar
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onGoHome}
              className="h-10 rounded-xl border-brand-200 px-5 hover:bg-brand-50 hover:text-brand-700"
            >
              Voltar ao início
            </Button>
          )}
        </div>

        {/* Botão do menu mobile */}
        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl text-slate-700 transition-colors hover:bg-brand-50 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav
          aria-label="Menu móvel"
          className="border-t border-brand-100 bg-white px-4 pb-5 pt-2 shadow-lg md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {view === "home" &&
              NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSectionClick(item.id)}
                    className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            <li className="mt-2">
              {view === "home" ? (
                <Button
                  onClick={handleBookingClick}
                  className="h-11 w-full rounded-xl"
                >
                  <CalendarCheck className="size-4" />
                  Agendar uma diarista
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setMenuOpen(false);
                    onGoHome();
                  }}
                  className="h-11 w-full rounded-xl border-brand-200"
                >
                  Voltar ao início
                </Button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
