"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  onGoBooking: () => void;
}

/** Faixa de chamada para ação: azul-marinho profundo com brilho dourado. */
export function CtaBanner({ onGoBooking }: CtaBannerProps) {
  return (
    <section
      aria-label="Chamada para agendar"
      className="mx-auto max-w-6xl px-4 pb-16 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-6 py-14 text-center shadow-2xl shadow-brand-900/25 sm:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-gold-400/25 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-brand-400/30 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
        />

        <span className="relative inline-flex items-center gap-2 rounded-full border border-gold-400/35 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-gold-200 backdrop-blur">
          <Sparkles className="size-3.5" />
          Sem compromisso — a confirmação é gratuita
        </span>

        <h2 className="relative mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Pronto para deixar a limpeza com a gente?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brand-100/85 sm:text-base">
          Faça sua solicitação agora e receba a confirmação da profissional no
          seu WhatsApp. Simples assim.
        </p>

        <Button
          onClick={onGoBooking}
          size="lg"
          className="relative mt-8 h-13 rounded-xl border-0 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 px-8 text-base font-extrabold text-brand-900 shadow-xl shadow-black/25 transition-transform hover:-translate-y-0.5 hover:from-gold-200 hover:to-gold-400"
        >
          Agendar uma limpeza
          <ArrowRight className="size-4.5" />
        </Button>
      </motion.div>
    </section>
  );
}
