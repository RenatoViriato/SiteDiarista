"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/agency/booking/StepIndicator";
import { ServiceStep } from "@/components/agency/booking/steps/ServiceStep";
import { DurationStep } from "@/components/agency/booking/steps/DurationStep";
import { DateStep } from "@/components/agency/booking/steps/DateStep";
import { TimeStep } from "@/components/agency/booking/steps/TimeStep";
import { DetailsStep } from "@/components/agency/booking/steps/DetailsStep";
import { SummaryStep } from "@/components/agency/booking/steps/SummaryStep";
import { SuccessStep } from "@/components/agency/booking/SuccessStep";
import {
  INITIAL_BOOKING_STATE,
  type BookingState,
} from "@/components/agency/booking/types";
import {
  buildProtocol,
  buildWhatsAppMessage,
  calculateTotal,
  formatBRL,
  formatDateShort,
  getServiceById,
  getDurationById,
  submitBooking,
  whatsAppLink,
  type BookingConfirmation,
  type BookingData,
  type CustomerData,
} from "@/lib/agency-data";

interface BookingFlowProps {
  /** Serviço previamente selecionado em um card da home */
  initialServiceId?: string | null;
  onGoHome: () => void;
  /** Reinicia o fluxo do zero (novo agendamento) */
  onRestart: () => void;
}

const STEP_SERVICE = 0;
const STEP_DURATION = 1;
const STEP_DATE = 2;
const STEP_TIME = 3;
const STEP_DETAILS = 4;
const STEP_SUMMARY = 5;

/**
 * Fluxo completo de agendamento:
 * serviço → duração → data → horário → dados → resumo → confirmação.
 * O envio é simulado no front-end e pode ser trocado por uma API real.
 */
export function BookingFlow({
  initialServiceId,
  onGoHome,
  onRestart,
}: BookingFlowProps) {
  // Se o serviço pré-selecionado não existir, começa na escolha de serviço
  // (evita abrir a etapa de duração sem serviço e travar a tela vazia).
  const hasInitialService = Boolean(getServiceById(initialServiceId ?? null));
  const [step, setStep] = useState(
    hasInitialService ? STEP_DURATION : STEP_SERVICE
  );
  const [state, setState] = useState<BookingState>(() => ({
    ...INITIAL_BOOKING_STATE,
    serviceId: initialServiceId ?? null,
  }));
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null
  );

  const service = getServiceById(state.serviceId);
  const duration = getDurationById(service, state.durationId);
  const estimatedTotal = calculateTotal(state.serviceId, state.durationId);

  const selectedSummary = useMemo(
    () =>
      [
        state.serviceId ? service?.name : null,
        state.durationId ? duration?.label : null,
        state.dateISO ? formatDateShort(state.dateISO) : null,
        state.timeSlotId,
      ].filter(Boolean) as string[],
    [state, service, duration]
  );

  const patchState = (patch: Partial<BookingState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const handleGoBackHome = () => {
    onGoHome();
  };

  /**
   * Confirma o agendamento: gera o protocolo, abre o WhatsApp da agência com
   * todos os dados já preenchidos e mostra a tela de sucesso.
   *
   * O `window.open` é chamado direto no clique — sem `await` antes — porque o
   * navegador só permite abrir a janela dentro do gesto do usuário.
   */
  const handleConfirm = () => {
    if (!state.serviceId || !state.durationId || !state.dateISO || !state.timeSlotId)
      return;

    const payload: BookingData = {
      serviceId: state.serviceId,
      durationId: state.durationId,
      dateISO: state.dateISO,
      timeSlotId: state.timeSlotId,
      customer: state.customer,
    };

    const protocol = buildProtocol(payload);
    setConfirmation({
      protocol,
      estimatedTotal: calculateTotal(state.serviceId, state.durationId) ?? 0,
    });

    window.open(
      whatsAppLink(buildWhatsAppMessage(payload, protocol)),
      "_blank",
      "noopener,noreferrer"
    );
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Ponto de integração com o backend futuro (não bloqueia a tela).
    void submitBooking(payload).catch(() => {});
  };

  const handleCustomerChange = (customer: CustomerData) =>
    patchState({ customer });

  /* ──────────────── Tela final de sucesso ──────────────── */
  if (confirmation && state.serviceId && state.durationId && state.dateISO && state.timeSlotId) {
    const payload: BookingData = {
      serviceId: state.serviceId,
      durationId: state.durationId,
      dateISO: state.dateISO,
      timeSlotId: state.timeSlotId,
      customer: state.customer,
    };

    return (
      <section aria-label="Agendamento confirmado" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <SuccessStep
          booking={payload}
          confirmation={confirmation}
          whatsAppHref={whatsAppLink(
            buildWhatsAppMessage(payload, confirmation.protocol)
          )}
          onGoHome={handleGoBackHome}
          onNewBooking={onRestart}
        />
      </section>
    );
  }

  /* ──────────────── Etapas do fluxo ──────────────── */
  return (
    <section aria-label="Fluxo de agendamento" className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={handleGoBackHome}
          className="-ml-2 h-9 rounded-lg px-2 font-bold text-brand-700 hover:bg-brand-50 hover:text-brand-900"
        >
          <ArrowLeft className="size-4" />
          Início
        </Button>
        {estimatedTotal !== undefined && (
          <p className="rounded-full border border-gold-200 bg-gold-50 px-4 py-1.5 text-sm font-extrabold text-gold-800">
            Valor estimado: {formatBRL(estimatedTotal)}
          </p>
        )}
      </div>

      <div className="mt-5">
        <StepIndicator current={step} onStepClick={setStep} />
      </div>

      {selectedSummary.length > 0 && (
        <ul aria-label="Seleções atuais" className="mt-5 flex flex-wrap gap-2">
          {selectedSummary.map((item) => (
            <li
              key={item}
              className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-700"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 rounded-3xl border border-brand-100 bg-white p-5 shadow-lg shadow-brand-900/5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {step === STEP_SERVICE && (
              <ServiceStep
                selectedId={state.serviceId}
                onSelect={(serviceId) => patchState({ serviceId, durationId: null })}
                onNext={() => setStep(STEP_DURATION)}
              />
            )}

            {step === STEP_DURATION && service && (
              <DurationStep
                service={service}
                selectedId={state.durationId}
                onSelect={(durationId) => patchState({ durationId })}
                onBack={() => setStep(STEP_SERVICE)}
                onNext={() => setStep(STEP_DATE)}
              />
            )}

            {step === STEP_DATE && (
              <DateStep
                selectedDateISO={state.dateISO}
                onSelect={(dateISO) =>
                  patchState({ dateISO, timeSlotId: null })
                }
                onBack={() => setStep(STEP_DURATION)}
                onNext={() => setStep(STEP_TIME)}
              />
            )}

            {step === STEP_TIME && state.dateISO && (
              <TimeStep
                dateISO={state.dateISO}
                selectedSlotId={state.timeSlotId}
                onSelect={(timeSlotId) => patchState({ timeSlotId })}
                onBack={() => setStep(STEP_DATE)}
                onNext={() => setStep(STEP_DETAILS)}
              />
            )}

            {step === STEP_DETAILS && (
              <DetailsStep
                customer={state.customer}
                onChange={handleCustomerChange}
                onBack={() => setStep(STEP_TIME)}
                onNext={() => setStep(STEP_SUMMARY)}
              />
            )}

            {step === STEP_SUMMARY &&
              state.serviceId &&
              state.durationId &&
              state.dateISO &&
              state.timeSlotId && (
                <SummaryStep
                  booking={
                    {
                      serviceId: state.serviceId,
                      durationId: state.durationId,
                      dateISO: state.dateISO,
                      timeSlotId: state.timeSlotId,
                      customer: state.customer,
                    } satisfies BookingData
                  }
                  onBack={() => setStep(STEP_DETAILS)}
                  onConfirm={handleConfirm}
                />
              )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
