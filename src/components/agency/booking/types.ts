import type { CustomerData } from "@/lib/agency-data";

/** Estado completo do agendamento enquanto o cliente avança no fluxo. */
export interface BookingState {
  serviceId: string | null;
  durationId: string | null;
  /** ISO "yyyy-MM-dd" */
  dateISO: string | null;
  timeSlotId: string | null;
  customer: CustomerData;
}

/** Definição das etapas do fluxo (usada pelo indicador de progresso). */
export const BOOKING_STEPS: { id: string; label: string }[] = [
  { id: "servico", label: "Serviço" },
  { id: "duracao", label: "Duração" },
  { id: "data", label: "Data" },
  { id: "horario", label: "Horário" },
  { id: "dados", label: "Dados" },
  { id: "resumo", label: "Resumo" },
];

export const INITIAL_BOOKING_STATE: BookingState = {
  serviceId: null,
  durationId: null,
  dateISO: null,
  timeSlotId: null,
  customer: {
    name: "",
    phone: "",
    address: "",
    number: "",
    neighborhood: "",
    notes: "",
  },
};
