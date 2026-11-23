"use client";

import { CalendarDays, Info } from "lucide-react";
import { StepNav } from "@/components/agency/booking/StepNav";
import { generateBookingDays } from "@/lib/agency-data";
import { cn } from "@/lib/utils";

interface DateStepProps {
  selectedDateISO: string | null;
  onSelect: (dateISO: string) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Etapa 3: seleção da data (próximos 14 dias; domingos fechados). */
export function DateStep({
  selectedDateISO,
  onSelect,
  onBack,
  onNext,
}: DateStepProps) {
  const days = generateBookingDays(14);

  return (
    <div>
      <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        <CalendarDays className="size-5 text-brand-600" />
        Que dia você quer o serviço?
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Escolha uma data nos próximos 14 dias. Atendemos de segunda a sábado.
      </p>

      <div
        role="radiogroup"
        aria-label="Datas disponíveis"
        className="no-scrollbar -mx-1 mt-6 flex snap-x gap-2 overflow-x-auto px-1 pb-2 sm:grid sm:grid-cols-7 sm:overflow-visible md:grid-cols-10"
      >
        {days.map((day) => {
          const selected = day.iso === selectedDateISO;
          const disabled = day.isSunday;

          return (
            <button
              key={day.iso}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onSelect(day.iso)}
              className={cn(
                "flex w-16 shrink-0 snap-start flex-col items-center rounded-2xl border px-2 py-3 transition-all sm:w-auto",
                disabled
                  ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                  : selected
                    ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/25"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50"
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-extrabold uppercase tracking-wider",
                  disabled
                    ? "text-slate-300"
                    : selected
                      ? "text-brand-100"
                      : "text-slate-400"
                )}
              >
                {day.isToday ? "Hoje" : day.weekday}
              </span>
              <span className="mt-1 text-lg font-extrabold leading-none">
                {day.dayNumber}
              </span>
              <span
                className={cn(
                  "mt-1 text-[10px] font-bold uppercase",
                  disabled
                    ? "text-slate-300"
                    : selected
                      ? "text-brand-100"
                      : "text-slate-400"
                )}
              >
                {disabled ? "Fechado" : day.month}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Info className="size-3.5 shrink-0" />
        Não atendemos aos domingos. Se precisar, sugerimos sexta ou sábado.
      </p>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Continuar"
        nextDisabled={!selectedDateISO}
      />
    </div>
  );
}
