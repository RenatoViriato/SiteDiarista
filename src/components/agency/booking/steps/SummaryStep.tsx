"use client";

import { motion } from "framer-motion";
import {
  BadgeInfo,
  CalendarDays,
  Clock,
  Home,
  MapPin,
  Pencil,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StepNav } from "@/components/agency/booking/StepNav";
import {
  formatBRL,
  formatDateLong,
  formatDateShort,
  getServiceById,
  getDurationById,
  type BookingData,
} from "@/lib/agency-data";

interface SummaryStepProps {
  booking: BookingData;
  onBack: () => void;
  onConfirm: () => void;
  loading: boolean;
}

/** Etapa 6: resumo da solicitação antes da confirmação final. */
export function SummaryStep({
  booking,
  onBack,
  onConfirm,
  loading,
}: SummaryStepProps) {
  const service = getServiceById(booking.serviceId);
  const duration = getDurationById(service, booking.durationId);
  const { customer } = booking;

  const rows: { icon: typeof User; label: string; value: string }[] = [
    {
      icon: Home,
      label: "Serviço escolhido",
      value: service ? `${service.name} — ${duration?.label ?? ""}` : "—",
    },
    {
      icon: CalendarDays,
      label: "Data",
      value: formatDateLong(booking.dateISO),
    },
    {
      icon: Clock,
      label: "Horário",
      value: `Chegada às ${booking.timeSlotId} · ${formatDateShort(booking.dateISO)}`,
    },
    {
      icon: User,
      label: "Cliente",
      value: customer.name,
    },
    {
      icon: Phone,
      label: "Contato",
      value: customer.phone,
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: `${customer.address}, ${customer.number} — ${customer.neighborhood}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h2 className="text-xl font-extrabold tracking-tight text-brand-900 sm:text-2xl">
        Confira seu agendamento
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Revise as informações antes de enviar a solicitação.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-lg shadow-brand-900/5">
        <div className="bg-gradient-to-r from-brand-800 to-brand-700 px-5 py-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-gold-200">
            Resumo da solicitação
          </p>
        </div>

        <ul className="px-5 py-2">
          {rows.map((row, index) => {
            const Icon = row.icon;
            return (
              <li key={row.label}>
                <div className="flex items-start gap-3.5 py-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
                      {row.label}
                    </p>
                    <p className="mt-0.5 break-words text-sm font-bold text-brand-900">
                      {row.value}
                    </p>
                  </div>
                </div>
                {index < rows.length - 1 && <Separator className="bg-brand-100" />}
              </li>
            );
          })}

          {customer.notes.trim() && (
            <li>
              <Separator className="bg-brand-100" />
              <div className="flex items-start gap-3.5 py-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <BadgeInfo className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
                    Observações
                  </p>
                  <p className="mt-0.5 break-words text-sm font-bold text-brand-900">
                    {customer.notes}
                  </p>
                </div>
              </div>
            </li>
          )}
        </ul>

        <div className="flex items-center justify-between gap-4 border-t border-gold-200 bg-gold-50 px-5 py-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-gold-700">
              Valor estimado
            </p>
            <p className="text-2xl font-extrabold text-brand-900">
              {formatBRL(duration?.price ?? 0)}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onBack}
            className="h-10 shrink-0 rounded-xl border-brand-200 font-bold text-brand-700 hover:border-gold-300 hover:bg-gold-50 hover:text-brand-900"
          >
            <Pencil className="size-3.5" />
            Editar dados
          </Button>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Valor de referência, sem compromisso: a confirmação final acontece pelo
        WhatsApp após a análise da agenda, com possibilidade de ajustes se o
        ambiente precisar de mais tempo.
      </p>

      <StepNav
        onBack={onBack}
        onNext={onConfirm}
        nextLabel="Confirmar agendamento"
        loading={loading}
      />
    </motion.div>
  );
}
