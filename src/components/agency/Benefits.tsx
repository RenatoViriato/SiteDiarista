"use client";

import { BadgeCheck, CalendarCheck2, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionEyebrow } from "@/components/agency/SectionEyebrow";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Cor do destaque do ícone */
  tone: "brand" | "gold" | "deep" | "soft";
}

const TONES: Record<Benefit["tone"], string> = {
  brand: "bg-brand-50 text-brand-600 ring-1 ring-brand-100",
  gold: "bg-gold-100 text-gold-700 ring-1 ring-gold-200",
  deep: "bg-brand-800 text-gold-300 ring-1 ring-brand-700",
  soft: "bg-brand-100 text-brand-700 ring-1 ring-brand-200",
};

const BENEFITS: Benefit[] = [
  {
    icon: BadgeCheck,
    title: "Profissionais de confiança",
    description:
      "Equipe selecionada, treinada e com histórico verificado. Todas as profissionais passam por avaliação constante das clientes.",
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
    tone: "deep",
  },
  {
    icon: CalendarCheck2,
    title: "Agendamento fácil",
    description:
      "Escolha serviço, data e horário em um fluxo simples e transparente. Remarcar também é rápido e sem custo.",
    tone: "soft",
  },
];

/** Benefícios apresentados na tela inicial. */
export function Benefits() {
  return (
    <section
      aria-label="Benefícios"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Por que a R&amp;R</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
          Casa em ordem, sem você precisar cuidar disso
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Cuidamos da sua casa com o mesmo capricho que você teria — e ainda
          devolvemos o seu tempo livre.
        </p>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <li
              key={benefit.title}
              className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-brand-900/5"
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold-300 to-gold-500 transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span
                className={`grid size-11 place-items-center rounded-xl ${TONES[benefit.tone]} transition-transform group-hover:scale-110`}
              >
                <Icon className="size-5.5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-base font-extrabold text-brand-900">
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
