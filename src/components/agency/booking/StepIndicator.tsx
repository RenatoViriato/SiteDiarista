"use client";

import { Check } from "lucide-react";
import { BOOKING_STEPS } from "@/components/agency/booking/types";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  current: number;
  /** Permite voltar para etapas já concluídas */
  onStepClick?: (stepIndex: number) => void;
}

/** Indicador de progresso do fluxo: numeração completa no desktop e barra compacta no mobile. */
export function StepIndicator({ current, onStepClick }: StepIndicatorProps) {
  return (
    <div aria-label="Progresso do agendamento">
      {/* Mobile: barra compacta */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-extrabold text-slate-900">
            Etapa {current + 1} de {BOOKING_STEPS.length}
          </p>
          <p className="text-sm font-bold text-brand-700">
            {BOOKING_STEPS[current]?.label}
          </p>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={BOOKING_STEPS.length}
          aria-valuenow={current + 1}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-300"
            style={{
              width: `${((current + 1) / BOOKING_STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Desktop: trilha completa */}
      <ol className="hidden items-center md:flex">
        {BOOKING_STEPS.map((step, index) => {
          const isDone = index < current;
          const isCurrent = index === current;
          const clickable = isDone && onStepClick;

          return (
            <li key={step.id} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick(index)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-2 py-1.5",
                  clickable
                    ? "cursor-pointer hover:bg-brand-50"
                    : "cursor-default"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border text-sm font-extrabold transition-colors",
                    isDone &&
                      "border-brand-600 bg-brand-600 text-white",
                    isCurrent &&
                      "border-brand-600 bg-white text-brand-700 ring-4 ring-brand-100",
                    !isDone &&
                      !isCurrent &&
                      "border-slate-200 bg-white text-slate-400"
                  )}
                >
                  {isDone ? <Check className="size-4" /> : index + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-bold whitespace-nowrap lg:block",
                    isDone || isCurrent
                      ? "text-slate-800"
                      : "text-slate-400"
                  )}
                >
                  {step.label}
                </span>
              </button>
              {index < BOOKING_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-1 h-0.5 flex-1 rounded-full",
                    index < current ? "bg-brand-600" : "bg-brand-100"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
