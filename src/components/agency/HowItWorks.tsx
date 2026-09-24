"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  MousePointerClick,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionEyebrow } from "@/components/agency/SectionEyebrow";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: MousePointerClick,
    title: "Escolha o serviço",
    description:
      "Da limpeza residencial à pós-obra: selecione o tipo de atendimento e a duração ideal para o seu momento.",
  },
  {
    icon: CalendarClock,
    title: "Selecione data e horário",
    description:
      "Veja os horários disponíveis na agenda e escolha o melhor dia para receber a profissional.",
  },
  {
    icon: ClipboardList,
    title: "Informe seus dados",
    description:
      "Preencha nome, WhatsApp e o endereço do atendimento. Suas informações ficam salvas para futuras visitas.",
  },
  {
    icon: CheckCircle2,
    title: "Confirme e pronto",
    description:
      "Nossa equipe confirma tudo pelo WhatsApp e a profissional chega no dia e hora combinados.",
  },
];

/** Seção "Como funciona": passo a passo do agendamento. */
export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-label="Como funciona o agendamento"
      className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Como funciona</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
          Agendar leva menos de 3 minutos
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Sem cadastro complicado e sem compromisso: você pede a solicitação e
          nós confirmamos a disponibilidade.
        </p>
      </div>

      <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              className="relative"
            >
              {/* Linha conectora (desktop) */}
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+2.4rem)] top-7 hidden w-[calc(100%-4.8rem)] border-t-2 border-dashed border-gold-300 lg:block"
                />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <span className="grid size-14 place-items-center rounded-2xl border border-brand-100 bg-white text-brand-700 shadow-sm">
                    <Icon className="size-6" strokeWidth={1.9} />
                  </span>
                  <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-[11px] font-extrabold text-brand-900 shadow-md shadow-gold-500/30">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-extrabold text-brand-900">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
