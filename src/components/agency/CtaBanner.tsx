"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  onGoBooking: () => void;
}

/** Faixa de chamada para ação entre as seções. */
export function CtaBanner({ onGoBooking }: CtaBannerProps) {
  return (
    <section aria-label="Chamada para agendar" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 px-6 py-12 text-center shadow-xl shadow-brand-600/20 sm:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-14 size-56 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-8 size-56 rounded-full bg-brand-gold-soft/30 blur-2xl"
        />

        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
          <Sparkles className="size-3.5" />
          Sem compromisso — a confirmação é gratuita
        </span>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Pronto para deixar a limpeza com a gente?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-50 sm:text-base">
          Faça sua solicitação agora e receba a confirmação da diarista no seu
          WhatsApp. Simples assim.
        </p>
        <Button
          onClick={onGoBooking}
          size="lg"
          className="mt-7 h-12 rounded-xl bg-white px-8 text-base font-extrabold text-brand-700 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-white"
        >
          Agendar uma diarista
          <ArrowRight className="size-4.5" />
        </Button>
      </motion.div>
    </section>
  );
}
