"use client";

import { CalendarX2, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const slots = TIME_SLOTS.map((slot) => {
    const available = isSlotAvailable(dateISO, slot.id);
    const past = isSlotInPast(dateISO, slot.id);
    return {
      ...slot,
      disabled: !available || past,
      reason: past ? "Horário já passou" : "Horário indisponível",
    };
  });

  const hasFreeSlot = slots.some((slot) => !slot.disabled);

  return (
    <div>
      <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-brand-900 sm:text-2xl">
        <Clock className="size-5 text-gold-600" />
        Escolha o horário
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Agenda de {formatDateShort(dateISO)}. Os horários de chegada vão das 8h
        às 17h e os já ocupados aparecem desabilitados.
      </p>

      {!hasFreeSlot && (
        <div
          role="status"
          className="mt-6 rounded-2xl border border-gold-300 bg-gold-50 p-5 text-sm text-gold-900"
        >
          <p className="font-extrabold">
            Não há horários livres nesta data.
          </p>
          <p className="mt-1 leading-relaxed">
            {isSlotInPast(dateISO, "08:00")
              ? "Os horários de hoje já passaram. Escolha outro dia para continuar."
              : "A agenda deste dia está cheia. Escolha outro dia para continuar."}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="mt-4 h-10 rounded-xl border-gold-300 bg-white px-4 font-bold text-gold-800 hover:bg-gold-100 hover:text-gold-900"
          >
            <CalendarDays className="size-4" />
            Escolher outra data
          </Button>
        </div>
      )}

      <div
        role="radiogroup"
        aria-label="Horários disponíveis"
        className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5"
      >
        {slots.map((slot) => {
          const selected = slot.id === selectedSlotId;

          return (
            <button
              key={slot.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={slot.disabled}
              onClick={() => onSelect(slot.id)}
              className={cn(
                "grid h-12 place-items-center rounded-xl border text-sm font-bold transition-all",
                slot.disabled
                  ? "cursor-not-allowed border-brand-100 bg-brand-50/60 text-brand-200 line-through"
                  : selected
                    ? "border-brand-700 bg-brand-700 text-white shadow-md shadow-brand-900/25"
                    : "border-brand-100 bg-white text-brand-800 hover:border-gold-400 hover:bg-gold-50"
              )}
              title={slot.disabled ? slot.reason : undefined}
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
