/**
 * Camada de dados e regras de negócio da Agência de Diaristas.
 *
 * ── NOTA PARA O FUTURO BACKEND ────────────────────────────────────────────
 * Todos os dados aqui são SIMULADOS (front-end only). Quando o backend
 * existir, basta substituir os consumo destas funções por chamadas de API:
 *   - SERVICES / getServiceById   → GET /api/services
 *   - getAvailableSlots           → GET /api/availability?date=...
 *   - submitBooking               → POST /api/bookings
 * Os tipos abaixo servem de contrato entre front e back.
 * ──────────────────────────────────────────────────────────────────────────
 */

import type { LucideIcon } from "lucide-react";
import {
  Home,
  SprayCan,
  HardHat,
  Building2,
  Briefcase,
  Shirt,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/* ────────────────────────────── Tipos ────────────────────────────── */

export interface DurationOption {
  id: string;
  /** Ex.: "4 horas", "Diária completa (8h)" */
  label: string;
  description: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Menor preço disponível — "A partir de R$ XX" */
  startingPrice: number;
  popular?: boolean;
  durations: DurationOption[];
}

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
  number: string;
  neighborhood: string;
  notes: string;
}

export interface BookingData {
  serviceId: string;
  durationId: string;
  /** ISO "yyyy-MM-dd" */
  dateISO: string;
  timeSlotId: string;
  customer: CustomerData;
}

export interface BookingConfirmation {
  protocol: string;
  estimatedTotal: number;
}

export interface BookingDay {
  date: Date;
  iso: string;
  weekday: string;
  dayNumber: string;
  month: string;
  isSunday: boolean;
  isToday: boolean;
}

export interface TimeSlot {
  id: string;
  label: string;
}

/* ──────────────────────────── Serviços ───────────────────────────── */

export const SERVICES: Service[] = [
  {
    id: "diaria-residencial",
    name: "Diária residencial",
    description:
      "Limpeza completa da casa: quartos, cozinha, banheiros e áreas comuns.",
    icon: Home,
    startingPrice: 150,
    popular: true,
    durations: [
      {
        id: "res-4h",
        label: "4 horas",
        description: "Ideal para a manutenção do dia a dia",
        price: 150,
      },
      {
        id: "res-6h",
        label: "6 horas",
        description: "Limpeza mais completa de todos os cômodos",
        price: 190,
      },
      {
        id: "res-8h",
        label: "Diária completa (8h)",
        description: "Casa inteira impecável, com calma e capricho",
        price: 240,
      },
    ],
  },
  {
    id: "limpeza-pesada",
    name: "Limpeza pesada",
    description:
      "Higienização profunda contra gordura, mofo e acúmulo em cantos difíceis.",
    icon: SprayCan,
    startingPrice: 240,
    durations: [
      {
        id: "pes-6h",
        label: "6 horas",
        description: "Cozinha e banheiros com atenção redobrada",
        price: 240,
      },
      {
        id: "pes-8h",
        label: "Diária completa (8h)",
        description: "Limpeza profunda em toda a casa",
        price: 290,
      },
      {
        id: "pes-12h",
        label: "Diária dupla (12h)",
        description: "Para limpeza pesada em ambientes grandes",
        price: 380,
      },
    ],
  },
  {
    id: "limpeza-pos-obra",
    name: "Limpeza pós-obra",
    description:
      "Remoção de poeira fina, resíduos e detritos após reformas e obras.",
    icon: HardHat,
    startingPrice: 380,
    durations: [
      {
        id: "obra-6h",
        label: "6 horas",
        description: "Ambientes compactos recém-reformados",
        price: 380,
      },
      {
        id: "obra-8h",
        label: "Diária completa (8h)",
        description: "Casa ou apartamento inteiro após a obra",
        price: 450,
      },
      {
        id: "obra-12h",
        label: "Diária dupla (12h)",
        description: "Reformas grandes com muito resíduo",
        price: 560,
      },
    ],
  },
  {
    id: "limpeza-apartamento",
    name: "Limpeza de apartamento",
    description:
      "Rotina de limpeza ideal para apartamentos, compacta e eficiente.",
    icon: Building2,
    startingPrice: 130,
    durations: [
      {
        id: "apt-3h",
        label: "3 horas",
        description: "Kitnet ou studio",
        price: 130,
      },
      {
        id: "apt-4h",
        label: "4 horas",
        description: "Apartamento de 1 a 2 quartos",
        price: 160,
      },
      {
        id: "apt-6h",
        label: "6 horas",
        description: "Apartamento de 3 quartos ou mais",
        price: 200,
      },
    ],
  },
  {
    id: "limpeza-escritorio",
    name: "Limpeza de escritório",
    description:
      "Ambientes de trabalho limpos e organizados para equipe e clientes.",
    icon: Briefcase,
    startingPrice: 190,
    durations: [
      {
        id: "esc-4h",
        label: "4 horas",
        description: "Escritórios pequenos e salas comerciais",
        price: 190,
      },
      {
        id: "esc-6h",
        label: "6 horas",
        description: "Escritórios médios com estações de trabalho",
        price: 230,
      },
      {
        id: "esc-8h",
        label: "Diária completa (8h)",
        description: "Escritórios grandes e salas compartilhadas",
        price: 280,
      },
    ],
  },
  {
    id: "passadoria-roupas",
    name: "Passadoria de roupas",
    description:
      "Roupas passadas com cuidado, do uso diário às peças especiais.",
    icon: Shirt,
    startingPrice: 90,
    durations: [
      {
        id: "pas-2h",
        label: "2 horas",
        description: "Uma cesta de roupas do dia a dia",
        price: 90,
      },
      {
        id: "pas-3h",
        label: "3 horas",
        description: "Roupas do dia a dia e cama/mesa/banho",
        price: 120,
      },
      {
        id: "pas-4h",
        label: "4 horas",
        description: "Volume grande, incluindo peças especiais",
        price: 150,
      },
    ],
  },
];

export function getServiceById(id: string | null): Service | undefined {
  if (!id) return undefined;
  return SERVICES.find((s) => s.id === id);
}

export function getDurationById(
  service: Service | undefined,
  id: string | null
): DurationOption | undefined {
  if (!service || !id) return undefined;
  return service.durations.find((d) => d.id === id);
}

export function calculateTotal(
  serviceId: string | null,
  durationId: string | null
): number | undefined {
  const service = getServiceById(serviceId);
  const duration = getDurationById(service, durationId);
  return duration?.price;
}

/* ──────────────────────────── Horários ───────────────────────────── */

export const TIME_SLOTS: TimeSlot[] = [
  { id: "08:00", label: "08:00" },
  { id: "09:00", label: "09:00" },
  { id: "10:00", label: "10:00" },
  { id: "11:00", label: "11:00" },
  { id: "12:00", label: "12:00" },
  { id: "13:00", label: "13:00" },
  { id: "14:00", label: "14:00" },
  { id: "15:00", label: "15:00" },
  { id: "16:00", label: "16:00" },
  { id: "17:00", label: "17:00" },
];

/**
 * Hash determinístico — garante que a mesma data sempre retorne os mesmos
 * horários "ocupados" (simulação estável de uma agenda real).
 */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** Simula a agenda do dia: ~75% dos horários livres. */
export function isSlotAvailable(dateISO: string, slotId: string): boolean {
  return hashString(`${dateISO}::${slotId}`) % 4 !== 0;
}

/** No dia de hoje, bloqueia horários que já passaram. */
export function isSlotInPast(dateISO: string, slotId: string, now = new Date()): boolean {
  const todayISO = format(now, "yyyy-MM-dd");
  if (dateISO !== todayISO) return false;
  const [hour] = slotId.split(":").map(Number);
  return hour <= now.getHours();
}

/* ───────────────────────────── Datas ─────────────────────────────── */

/** Gera os próximos `days` dias (incluindo hoje) para o seletor de data. */
export function generateBookingDays(days = 14, now = new Date()): BookingDay[] {
  const result: BookingDay[] = [];
  const todayISO = format(now, "yyyy-MM-dd");
  for (let i = 0; i < days; i++) {
    // Meia-noite local: evita pular/duplicar dia em mudanças de horário de verão.
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const iso = format(date, "yyyy-MM-dd");
    result.push({
      date,
      iso,
      weekday: format(date, "EEE", { locale: ptBR })
        .replace(".", "")
        .toUpperCase(),
      dayNumber: format(date, "dd"),
      month: format(date, "MMM", { locale: ptBR })
        .replace(".", "")
        .toUpperCase(),
      isSunday: date.getDay() === 0,
      isToday: iso === todayISO,
    });
  }
  return result;
}

/** "segunda-feira, 28 de setembro de 2026" */
export function formatDateLong(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const long = format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  return long.charAt(0).toUpperCase() + long.slice(1);
}

/** "seg, 28 set" */
export function formatDateShort(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return format(date, "EEE, d MMM", { locale: ptBR });
}

/* ──────────────────────── Utilitários de contato ─────────────────── */

/** Máscara (11) 98765-4321 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export const EMPTY_CUSTOMER: CustomerData = {
  name: "",
  phone: "",
  address: "",
  number: "",
  neighborhood: "",
  notes: "",
};

/** Retorna erros por campo; objeto vazio = dados válidos. */
export function validateCustomer(customer: CustomerData): Partial<
  Record<keyof CustomerData, string>
> {
  const errors: Partial<Record<keyof CustomerData, string>> = {};
  if (customer.name.trim().length < 3) {
    errors.name = "Informe seu nome completo.";
  }
  if (customer.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Informe um telefone/WhatsApp válido com DDD.";
  }
  if (customer.address.trim().length < 4) {
    errors.address = "Informe o endereço do atendimento.";
  }
  if (!customer.number.trim()) {
    errors.number = "Obrigatório.";
  }
  if (!customer.neighborhood.trim()) {
    errors.neighborhood = "Informe o bairro.";
  }
  return errors;
}

/* ──────────────────────── Formatação de moeda ────────────────────── */

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/* ──────────────────── Envio (simulado) do agendamento ────────────── */

/**
 * Simula o envio da solicitação de agendamento.
 * TODO(backend): trocar por `fetch("/api/bookings", { method: "POST", body })`.
 */
export async function submitBooking(
  data: BookingData
): Promise<BookingConfirmation> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const total = calculateTotal(data.serviceId, data.durationId) ?? 0;
  const protocol = `RS-${format(new Date(), "yyyyMMdd")}-${String(
    hashString(JSON.stringify(data)) % 10000
  ).padStart(4, "0")}`;
  return { protocol, estimatedTotal: total };
}
