"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, MessageCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatBRL,
  formatDateShort,
  getServiceById,
  getDurationById,
  WHATSAPP_DISPLAY,
  type BookingData,
  type BookingConfirmation,
} from "@/lib/agency-data";

interface SuccessStepProps {
  booking: BookingData;
  confirmation: BookingConfirmation;
  /** Link wa.me com a mensagem do agendamento já preenchida */
  whatsAppHref: string;
  onGoHome: () => void;
  onNewBooking: () => void;
}

/**
 * Tela final: o site monta a solicitação e abre o WhatsApp da agência com
 * todos os dados. O envio acontece quando o cliente toca em enviar na conversa.
 */
export function SuccessStep({
  booking,
  confirmation,
  whatsAppHref,
  onGoHome,
  onNewBooking,
}: SuccessStepProps) {
  const service = getServiceById(booking.serviceId);
  const duration = getDurationById(service, booking.durationId);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-lg text-center"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-brand-700 to-brand-900 ring-8 ring-gold-100"
      >
        <MessageCircle className="size-10 text-gold-300" strokeWidth={1.8} />
      </motion.div>

      <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-brand-900 sm:text-3xl">
        Falta só enviar no WhatsApp
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Abrimos o WhatsApp com todos os dados do seu agendamento já
        preenchidos. Toque em <strong className="text-brand-800">enviar</strong>{" "}
        na conversa para a R&amp;R receber sua solicitação.
      </p>

      <a
        href={whatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-[#0e6e63] px-7 text-base font-extrabold text-white shadow-xl shadow-[#0e6e63]/25 transition-transform hover:-translate-y-0.5 hover:bg-[#0b5b52] sm:w-auto"
      >
        <MessageCircle className="size-5" />
        Abrir o WhatsApp e enviar
        <ArrowRight className="size-4.5" />
      </a>

      <p className="mt-3 text-xs text-muted-foreground">
        Precisa de ajuda? Chame direto no <strong>{WHATSAPP_DISPLAY}</strong>.
      </p>

      <div className="mt-7 rounded-2xl border border-brand-100 bg-white p-5 text-left shadow-lg shadow-brand-900/5">
        <div className="flex items-center justify-between gap-3 border-b border-brand-100 pb-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            Protocolo
          </p>
          <p className="rounded-full border border-gold-200 bg-gold-50 px-3 py-1 text-sm font-extrabold text-gold-800">
            {confirmation.protocol}
          </p>
        </div>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-muted-foreground">Serviço</dt>
            <dd className="text-right font-extrabold text-brand-900">
              {service?.name} · {duration?.label}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-muted-foreground">Data</dt>
            <dd className="text-right font-extrabold text-brand-900">
              {formatDateShort(booking.dateISO)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-muted-foreground">Horário</dt>
            <dd className="text-right font-extrabold text-brand-900">
              {booking.timeSlotId}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-brand-100 pt-2">
            <dt className="font-semibold text-muted-foreground">
              Valor estimado
            </dt>
            <dd className="text-right text-base font-extrabold text-gold-700">
              {formatBRL(confirmation.estimatedTotal)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          onClick={onNewBooking}
          variant="outline"
          className="h-12 rounded-xl border-brand-200 px-6 font-bold text-brand-700 hover:border-gold-300 hover:bg-gold-50 hover:text-brand-900"
        >
          <RotateCcw className="size-4" />
          Fazer novo agendamento
        </Button>
        <Button
          onClick={onGoHome}
          variant="outline"
          className="h-12 rounded-xl border-brand-200 px-6 font-bold text-brand-700 hover:border-gold-300 hover:bg-gold-50 hover:text-brand-900"
        >
          <Home className="size-4" />
          Voltar ao início
        </Button>
      </div>
    </motion.div>
  );
}
