"use client";

import { Check } from "lucide-react";
import { StepNav } from "@/components/agency/booking/StepNav";
import { SERVICES, formatBRL } from "@/lib/agency-data";
import { cn } from "@/lib/utils";

interface ServiceStepProps {
  selectedId: string | null;
  onSelect: (serviceId: string) => void;
  onNext: () => void;
}

/** Etapa 1: escolha do tipo de serviço. */
export function ServiceStep({ selectedId, onSelect, onNext }: ServiceStepProps) {
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-brand-900 sm:text-2xl">
        Qual serviço você precisa?
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Selecione o tipo de limpeza ideal para o seu momento.
      </p>

      <div
        role="radiogroup"
        aria-label="Tipos de serviço"
        className="mt-6 grid gap-3 sm:grid-cols-2"
      >
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const selected = service.id === selectedId;

          return (
            <button
              key={service.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(service.id)}
              className={cn(
                "group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all sm:p-5",
                selected
                  ? "border-brand-600 bg-brand-50/70 ring-2 ring-gold-200"
                  : "border-brand-100 bg-white hover:border-gold-300 hover:bg-gold-50/40"
              )}
            >
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-xl transition-colors",
                  selected
                    ? "bg-brand-700 text-gold-200"
                    : "bg-brand-50 text-brand-600 group-hover:bg-gold-100 group-hover:text-gold-700"
                )}
              >
                <Icon className="size-5" strokeWidth={1.9} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-brand-900 sm:text-base">
                    {service.name}
                  </span>
                  {selected && (
                    <Check className="size-5 shrink-0 text-gold-500" />
                  )}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {service.description}
                </span>
                <span className="mt-2 block text-xs font-bold text-brand-700">
                  {formatBRL(service.startingPrice)} · a partir de
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <StepNav
        onNext={onNext}
        nextLabel="Continuar"
        nextDisabled={!selectedId}
      />
    </div>
  );
}
