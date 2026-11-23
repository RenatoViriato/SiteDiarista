"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGoBooking: () => void;
  onGoServices: () => void;
}

/** Seção de abertura: promessa da marca, chamada principal e prova social. */
export function Hero({ onGoBooking, onGoServices }: HeroProps) {
  return (
    <section
      id="inicio"
      aria-label="Apresentação da agência"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white"
    >
      {/* Manchas decorativas suaves */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-brand-100/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 size-80 rounded-full bg-brand-gold-soft/50 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-sm">
            <CalendarCheck className="size-3.5" />
            Agendamento online em minutos
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl">
            Sua casa limpa,{" "}
            <span className="relative whitespace-nowrap text-brand-600">
              seu tempo
              <svg
                aria-hidden="true"
                viewBox="0 0 220 12"
                className="absolute -bottom-1.5 left-0 w-full text-brand-200"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9c50-6 120-6 214-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            livre.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Agende diaristas profissionais e verificadas para a limpeza da sua
            casa, apartamento ou escritório. Simples, seguro e sem complicação
            — você escolhe o dia, a hora e o serviço.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onGoBooking}
              size="lg"
              className="h-12 rounded-xl px-7 text-base font-bold shadow-lg shadow-brand-600/25 transition-transform hover:-translate-y-0.5"
            >
              Agendar uma diarista
              <ArrowRight className="size-4.5" />
            </Button>
            <Button
              onClick={onGoServices}
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-brand-200 px-7 text-base font-bold text-brand-700 hover:bg-brand-50 hover:text-brand-700"
            >
              Ver serviços
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
            <li className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              4,9 de avaliação
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-brand-600" />
              +2.500 atendimentos
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-brand-600" />
              Profissionais verificadas
            </li>
          </ul>
        </motion.div>

        {/* Composição visual: cartão de agendamento + profissional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
          aria-hidden="true"
        >
          <div className="rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-xl shadow-brand-900/5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Próximo agendamento
                </p>
                <p className="mt-1 text-lg font-extrabold text-slate-900">
                  Diária residencial
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Sexta-feira, a partir das 08:00
                </p>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <CheckCircle2 className="size-6" />
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-50/80 p-4">
              <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-base font-extrabold text-white">
                MS
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-extrabold text-slate-800">
                  Maria Silva
                  <BadgeCheck className="size-4 shrink-0 text-brand-600" />
                </p>
                <p className="text-xs font-semibold text-muted-foreground">
                  Diarista verificada • ★ 4,9 (312 avaliações)
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Duração", value: "6 horas" },
                { label: "Endereço", value: "Seu lar" },
                { label: "Status", value: "Confirmado" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-brand-100 bg-white px-2 py-2.5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs font-extrabold text-slate-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="absolute -bottom-5 -left-3 rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-lg shadow-brand-900/5 sm:-left-8"
          >
            <p className="text-xs font-semibold text-muted-foreground">
              Casas limpas este mês
            </p>
            <p className="text-lg font-extrabold text-brand-700">+380 ✓</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
