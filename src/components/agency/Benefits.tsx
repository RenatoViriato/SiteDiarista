"use client";

import { BadgeCheck, CalendarCheck2, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Cor do destaque do ícone */
  tone: "brand" | "navy" | "gold" | "deep";
}

const TONES: Record<Benefit["tone"], string> = {
  brand: "bg-brand-50 text-brand-600",
  navy: "bg-brand-600 text-white",
  gold: "bg-brand-gold-soft/40 text-brand-gold",
  deep: "bg-brand-100 text-brand-700",
};

const BENEFITS: Benefit[] = [
  {
    icon: BadgeCheck,
    title: "Profissionais de confiança",
    description:
      "Equipe selecionada, treinada e com histórico verificado. Todas as diaristas passam por avaliação constante das clientes.",
    tone: "brand",
  },
  {
    icon: Zap,
    title: "Praticidade total",
    description:
      "Agende em poucos minutos direto do celular, sem ligações nem burocracia. Tudo online, claro e sem compromisso.",
    tone: "gold",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e garantia",
    description:
      "Profissionais identificadas, suporte presente durante o atendimento e reposição caso algo não saia como esperado.",
    tone: "navy",
  },
  {
    icon: CalendarCheck2,
    title: "Agendamento fácil",
    description:
      "Escolha serviço, data e horário em um fluxo simples e transparente. Remarcar também é rápido e sem custo.",
    tone: "deep",
  },
];

/** Benefícios apresentados na tela inicial. */
export function Benefits() {
  return (
    <section aria-label="Benefícios" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Por que agendar com a R&amp;R Casa em Ordem?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Cuidamos da sua casa com o mesmo capricho que você teria — e ainda
          devolvemos seu tempo livre.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <li
              key={benefit.title}
              className="group rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-brand-900/5"
            >
              <span
                className={`grid size-11 place-items-center rounded-xl ${TONES[benefit.tone]} transition-transform group-hover:scale-110`}
              >
                <Icon className="size-5.5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-base font-extrabold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
