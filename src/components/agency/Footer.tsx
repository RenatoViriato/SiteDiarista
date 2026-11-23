"use client";

import { Clock, Mail, MapPin, MessageCircle, Users } from "lucide-react";
import { Brand } from "@/components/agency/Brand";
import type { SectionId } from "@/components/agency/types";
import { SERVICES } from "@/lib/agency-data";

interface FooterProps {
  onGoSection: (id: SectionId) => void;
  onGoBookingWithService: (serviceId: string) => void;
}

/** Rodapé com links rápidos, serviços e contato. */
export function Footer({ onGoSection, onGoBookingWithService }: FooterProps) {
  const year = new Date().getFullYear();

  const navLinks: { id: SectionId; label: string }[] = [
    { id: "inicio", label: "Início" },
    { id: "servicos", label: "Serviços" },
    { id: "como-funciona", label: "Como funciona" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <footer className="mt-auto border-t border-brand-100 bg-brand-50/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Sua casa limpa, seu tempo livre. Conectamos você a diaristas
            verificadas e experientes com agendamento simples e transparente.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => onGoSection(link.id)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-700"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Serviços no rodapé">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
            Serviços
          </h3>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => onGoBookingWithService(service.id)}
                  className="text-left text-sm font-medium text-muted-foreground transition-colors hover:text-brand-700"
                >
                  {service.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <a
                href="https://wa.me/5521971896013"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-700"
              >
                (21) 97189-6013 — WhatsApp
                <span className="block text-xs">Dúvidas e agendamentos</span>
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Users className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <a
                href="https://wa.me/5521995649813"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-700"
              >
                (21) 99564-9813 — WhatsApp
                <span className="block text-xs">Faça parte da equipe</span>
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>contato@rrcasaemordem.com.br</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>Seg. a sáb., das 8h às 18h</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>Rio de Janeiro e região metropolitana</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-left">
          <p>© {year} R&amp;R Casa em Ordem — Limpeza Profissional. Todos os direitos reservados.</p>
          <p>Profissionais verificadas • Agendamento sem compromisso</p>
        </div>
      </div>
    </footer>
  );
}
