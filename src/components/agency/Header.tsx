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

/** Cabeçalho fixo: selo da marca + navegação com filete dourado no hover. */
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
    <header className="sticky top-0 z-40 border-b border-brand-100/90 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          aria-label="R&R Casa em Ordem — ir para o início"
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
                    className="relative rounded-lg px-3 py-2 text-sm font-semibold text-brand-900/70 transition-colors after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gold-400 after:transition-transform after:duration-200 hover:text-brand-900 hover:after:scale-x-100"
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
              className="h-11 rounded-xl px-5 font-bold shadow-md shadow-brand-900/15"
            >
              <CalendarCheck className="size-4" />
              Agendar
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onGoHome}
              className="h-11 rounded-xl border-brand-200 px-5 font-bold text-brand-700 hover:bg-brand-50 hover:text-brand-800"
            >
              Voltar ao início
            </Button>
          )}
        </div>

        {/* Botão do menu mobile */}
        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl text-brand-800 transition-colors hover:bg-brand-50 md:hidden"
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
                    className="w-full rounded-xl border-l-2 border-transparent px-3 py-3 text-left text-sm font-semibold text-brand-900/80 transition-colors hover:border-gold-400 hover:bg-brand-50 hover:text-brand-900"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            <li className="mt-2">
              {view === "home" ? (
                <Button
                  onClick={handleBookingClick}
                  className="h-12 w-full rounded-xl font-bold"
                >
                  <CalendarCheck className="size-4" />
                  Agendar uma limpeza
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setMenuOpen(false);
                    onGoHome();
                  }}
                  className="h-12 w-full rounded-xl border-brand-200 font-bold"
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
