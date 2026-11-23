"use client";

import { ArrowLeft, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepNav } from "@/components/agency/booking/StepNav";
import { formatBRL, type Service } from "@/lib/agency-data";
import { cn } from "@/lib/utils";

interface DurationStepProps {
  service: Service;
  selectedId: string | null;
  onSelect: (durationId: string) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Etapa 2: quantidade de horas ou tipo de diária. */
export function DurationStep({
  service,
  selectedId,
  onSelect,
  onBack,
  onNext,
}: DurationStepProps) {
  return (
    <div>
      <Button
        variant="ghost"
        onClick={onBack}
        className="-ml-2 mb-3 h-9 rounded-lg px-2 font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-800"
      >
        <ArrowLeft className="size-4" />
        Trocar serviço
      </Button>

      <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        Por quanto tempo você precisa{" "}
        <span className="text-brand-600">da {service.name.toLowerCase()}</span>?
      </h2>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Clock className="size-4" />
        Escolha a quantidade de horas ou o tipo de diária.
      </p>

      <div
        role="radiogroup"
        aria-label="Duração do serviço"
        className="mt-6 grid gap-3 sm:grid-cols-3"
      >
        {service.durations.map((duration) => {
          const selected = duration.id === selectedId;

          return (
            <button
              key={duration.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(duration.id)}
              className={cn(
                "relative flex flex-col rounded-2xl border p-5 text-left transition-all",
                selected
                  ? "border-brand-500 bg-brand-50/60 ring-2 ring-brand-100"
                  : "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/40"
              )}
            >
              {selected && (
                <Check className="absolute right-3.5 top-3.5 size-5 text-brand-600" />
              )}
              <span className="text-base font-extrabold text-slate-900">
                {duration.label}
              </span>
              <span className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
                {duration.description}
              </span>
              <span className="mt-3 text-lg font-extrabold text-brand-700">
                {formatBRL(duration.price)}
              </span>
            </button>
          );
        })}
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Continuar"
        nextDisabled={!selectedId}
      />
    </div>
  );
}
