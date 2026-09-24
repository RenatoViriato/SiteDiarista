"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGoBooking: () => void;
  onGoServices: () => void;
}

/** Abertura da página: azul-marinho profundo, detalhes dourados e prova social. */
export function Hero({ onGoBooking, onGoServices }: HeroProps) {
  return (
    <section
      id="inicio"
      aria-label="Apresentação da R&R Casa em Ordem"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-[#060d20]"
    >
      {/* Malha de pontos + brilhos dourados (decoração) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:22px_22px] opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full bg-gold-400/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-brand-400/25 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-white/5 px-3.5 py-1.5 text-xs font-bold tracking-wide text-gold-200 backdrop-blur">
            <Sparkles className="size-3.5" />
            Limpeza profissional com agendamento em minutos
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Sua casa limpa,{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="gold-gradient-text">seu tempo livre</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 240 12"
                className="absolute -bottom-2 left-0 w-full text-gold-400/80"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9c56-6 130-6 234-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-brand-100/85 sm:text-lg">
            Diaristas e equipes de limpeza profissionais para a sua casa,
            apartamento ou escritório. Você escolhe o serviço, o dia e o horário
            — a gente deixa tudo em ordem.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onGoBooking}
              size="lg"
              className="h-13 rounded-xl border-0 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 px-7 text-base font-extrabold text-brand-900 shadow-xl shadow-gold-500/25 transition-transform hover:-translate-y-0.5 hover:from-gold-200 hover:to-gold-400"
            >
              Agendar uma limpeza
              <ArrowRight className="size-4.5" />
            </Button>
            <Button
              onClick={onGoServices}
              variant="outline"
              size="lg"
              className="h-13 rounded-xl border-white/25 bg-white/5 px-7 text-base font-bold text-white backdrop-blur transition-colors hover:bg-white/12 hover:text-white"
            >
              Ver serviços e preços
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-brand-100/85">
            <li className="flex items-center gap-1.5">
              <Star className="size-4 fill-gold-400 text-gold-400" />
              4,9 de avaliação
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-gold-300" />
              +2.500 atendimentos
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-gold-300" />
              Profissionais verificadas
            </li>
          </ul>
        </motion.div>

        {/* Cartão ilustrativo de agendamento */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
          aria-hidden="true"
        >
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between gap-4 bg-brand-800 px-6 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
                  Próximo agendamento
                </p>
                <p className="mt-0.5 text-lg font-bold text-white">
                  Diária residencial
                </p>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/40">
                <CalendarCheck className="size-5" />
              </span>
            </div>

            <div className="p-6">
              <p className="text-sm font-medium text-muted-foreground">
                Sexta-feira, chegada às 08:00
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-50 p-4">
                <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-base font-extrabold text-gold-200">
                  MS
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-sm font-extrabold text-brand-900">
                    Maria Silva
                    <BadgeCheck className="size-4 shrink-0 text-gold-500" />
                  </p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Profissional verificada • ★ 4,9 (312 avaliações)
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Duração", value: "6 horas" },
                  { label: "Local", value: "Seu lar" },
                  { label: "Status", value: "Confirmado" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-brand-100 bg-white px-2 py-2.5"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs font-extrabold text-brand-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="absolute -bottom-5 -left-3 rounded-2xl bg-gradient-to-r from-gold-300 to-gold-500 px-4 py-3 shadow-xl shadow-black/25 sm:-left-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-900/70">
              Casas em ordem este mês
            </p>
            <p className="text-lg font-extrabold text-brand-900">+380</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Filete dourado separando o hero do conteúdo claro */}
      <div
        aria-hidden="true"
        className="relative h-px w-full bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      />
    </section>
  );
}
