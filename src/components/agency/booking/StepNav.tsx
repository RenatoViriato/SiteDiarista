"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepNavProps {
  onBack?: () => void;
  backLabel?: string;
  nextLabel: string;
  onNext: () => void;
  nextDisabled?: boolean;
  /** Mostra spinner no botão principal (ex.: confirmando agendamento) */
  loading?: boolean;
}

/** Navegação padrão entre etapas: Voltar + Continuar. */
export function StepNav({
  onBack,
  backLabel = "Voltar",
  nextLabel,
  onNext,
  nextDisabled = false,
  loading = false,
}: StepNavProps) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={loading}
          className="h-11 rounded-xl px-4 font-bold text-brand-700 hover:bg-brand-50 hover:text-brand-900"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </Button>
      ) : (
        <span className="hidden sm:block" />
      )}

      <Button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || loading}
        className="h-11 rounded-xl px-8 font-bold shadow-md shadow-brand-600/20"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            {nextLabel}
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </div>
  );
}
