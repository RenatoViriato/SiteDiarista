"use client";

import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Brand } from "@/components/agency/Brand";
import type { SectionId } from "@/components/agency/types";
import { SERVICES } from "@/lib/agency-data";

interface FooterProps {
  onGoSection: (id: SectionId) => void;
  onGoBookingWithService: (serviceId: string) => void;
}

/** Rodapé em azul-marinho com o selo da marca e detalhes dourados. */
export function Footer({ onGoSection, onGoBookingWithService }: FooterProps) {
  const year = new Date().getFullYear();

  const navLinks: { id: SectionId; label: string }[] = [
    { id: "inicio", label: "Início" },
    { id: "servicos", label: "Serviços" },
    { id: "como-funciona", label: "Como funciona" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <footer className="mt-auto bg-brand-900 text-brand-100">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Brand size="lg" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-100/75">
            Sua casa limpa, seu tempo livre. Limpeza profissional com
            profissionais verificadas, agendamento simples e preço transparente.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-300">
            Navegação
          </h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => onGoSection(link.id)}
                  className="text-sm font-medium text-brand-100/75 transition-colors hover:text-gold-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Serviços no rodapé">
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-300">
            Serviços
          </h3>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => onGoBookingWithService(service.id)}
                  className="text-left text-sm font-medium text-brand-100/75 transition-colors hover:text-gold-200"
                >
                  {service.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-300">
            Contato
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-brand-100/75">
            <li className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>(11) 98765-4321 — WhatsApp</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>contato@renatasantos.com.br</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>Atendimento: seg. a sáb., das 8h às 18h</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>São Paulo e região metropolitana</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-brand-100/60 sm:flex-row sm:px-6 sm:text-left">
          <p>© {year} R&amp;R Casa em Ordem. Todos os direitos reservados.</p>
          <p>Profissionais verificadas • Agendamento sem compromisso</p>
        </div>
      </div>
    </footer>
  );
}
