"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatBRL,
  formatDateShort,
  getServiceById,
  getDurationById,
  type BookingData,
  type BookingConfirmation,
} from "@/lib/agency-data";

interface SuccessStepProps {
  booking: BookingData;
  confirmation: BookingConfirmation;
  onGoHome: () => void;
  onNewBooking: () => void;
}

/** Tela final: solicitação enviada com protocolo e resumo. */
export function SuccessStep({
  booking,
  confirmation,
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
        className="mx-auto grid size-20 place-items-center rounded-full bg-brand-50 ring-8 ring-brand-50/60"
      >
        <CheckCircle2 className="size-11 text-brand-600" strokeWidth={1.8} />
      </motion.div>

      <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        Solicitação de agendamento enviada!
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Em breve entraremos em contato para confirmar seu atendimento.
      </p>

      <div className="mt-7 rounded-2xl border border-brand-100 bg-white p-5 text-left shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-brand-50 pb-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            Protocolo
          </p>
          <p className="text-sm font-extrabold text-brand-700">
            {confirmation.protocol}
          </p>
        </div>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-muted-foreground">Serviço</dt>
            <dd className="text-right font-extrabold text-slate-800">
              {service?.name} · {duration?.label}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-muted-foreground">Data</dt>
            <dd className="text-right font-extrabold text-slate-800">
              {formatDateShort(booking.dateISO)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-muted-foreground">Horário</dt>
            <dd className="text-right font-extrabold text-slate-800">
              {booking.timeSlotId}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-brand-50 pt-2">
            <dt className="font-semibold text-muted-foreground">
              Valor estimado
            </dt>
            <dd className="text-right text-base font-extrabold text-brand-700">
              {formatBRL(confirmation.estimatedTotal)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          onClick={onNewBooking}
          className="h-11 rounded-xl px-6 font-bold shadow-md shadow-brand-600/20"
        >
          <RotateCcw className="size-4" />
          Fazer novo agendamento
        </Button>
        <Button
          onClick={onGoHome}
          variant="outline"
          className="h-11 rounded-xl border-brand-200 px-6 font-bold text-brand-700 hover:bg-brand-50 hover:text-brand-700"
        >
          <Home className="size-4" />
          Voltar ao início
        </Button>
      </div>
    </motion.div>
  );
}
