"use client";

import { CalendarX2, Clock } from "lucide-react";
import { StepNav } from "@/components/agency/booking/StepNav";
import {
  formatDateShort,
  isSlotAvailable,
  isSlotInPast,
  TIME_SLOTS,
} from "@/lib/agency-data";
import { cn } from "@/lib/utils";

interface TimeStepProps {
  dateISO: string;
  selectedSlotId: string | null;
  onSelect: (slotId: string) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Etapa 4: seleção do horário disponível na data escolhida. */
export function TimeStep({
  dateISO,
  selectedSlotId,
  onSelect,
  onBack,
  onNext,
}: TimeStepProps) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        <Clock className="size-5 text-brand-600" />
        Escolha o horário
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Agenda de {formatDateShort(dateISO)}. Horários já ocupados aparecem
        desabilitados.
      </p>

      <div
        role="radiogroup"
        aria-label="Horários disponíveis"
        className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5"
      >
        {TIME_SLOTS.map((slot) => {
          const available = isSlotAvailable(dateISO, slot.id);
          const past = isSlotInPast(dateISO, slot.id);
          const disabled = !available || past;
          const selected = slot.id === selectedSlotId;

          return (
            <button
              key={slot.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onSelect(slot.id)}
              className={cn(
                "grid h-12 place-items-center rounded-xl border text-sm font-bold transition-all",
                disabled
                  ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through"
                  : selected
                    ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/25"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50"
              )}
              title={past ? "Horário já passou" : "Indisponível"}
            >
              {slot.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarX2 className="size-3.5 shrink-0" />
        A diarista chega no horário escolhido. Se precisar remarcar, é só falar
        com a gente.
      </p>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Continuar"
        nextDisabled={!selectedSlotId}
      />
    </div>
  );
}
