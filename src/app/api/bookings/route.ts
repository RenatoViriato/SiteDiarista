import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  calculateTotal,
  getDurationById,
  getServiceById,
  isSlotInPast,
  TIME_SLOTS,
} from "@/lib/agency-data";

export const runtime = "nodejs";

const bookingSchema = z.object({
  serviceId: z.string().trim().min(1),
  durationId: z.string().trim().min(1),
  dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlotId: z.string().trim().min(1),
  customer: z.object({
    name: z.string().trim().min(3).max(100),
    phone: z.string().trim().min(10).max(20),
    address: z.string().trim().min(4).max(200),
    number: z.string().trim().min(1).max(20),
    neighborhood: z.string().trim().min(2).max(100),
    notes: z.string().trim().max(1000).optional().default(""),
  }),
});

function parseISODate(dateISO: string): Date | null {
  const [year, month, day] = dateISO.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = bookingSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const service = getServiceById(data.serviceId);
    const duration = getDurationById(service, data.durationId);
    const date = parseISODate(data.dateISO);

    if (!service || !duration) {
      return NextResponse.json({ error: "Serviço ou duração inválida." }, { status: 400 });
    }

    if (!date || date.getDay() === 0) {
      return NextResponse.json({ error: "Selecione uma data válida de atendimento." }, { status: 400 });
    }

    if (!TIME_SLOTS.some((slot) => slot.id === data.timeSlotId)) {
      return NextResponse.json({ error: "Horário inválido." }, { status: 400 });
    }

    if (isSlotInPast(data.dateISO, data.timeSlotId)) {
      return NextResponse.json({ error: "Este horário já passou." }, { status: 400 });
    }

    const existing = await db.booking.findUnique({
      where: { dateISO_timeSlotId: { dateISO: data.dateISO, timeSlotId: data.timeSlotId } },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ error: "Este horário acaba de ser reservado. Escolha outro." }, { status: 409 });
    }

    const protocol = `RS-${data.dateISO.replace(/-/g, "")}-${randomBytes(3).toString("hex").toUpperCase()}`;

    const booking = await db.booking.create({
      data: {
        protocol,
        serviceId: data.serviceId,
        durationId: data.durationId,
        dateISO: data.dateISO,
        timeSlotId: data.timeSlotId,
        estimatedTotal: calculateTotal(data.serviceId, data.durationId) ?? duration.price,
        customerName: data.customer.name,
        customerPhone: data.customer.phone.replace(/\D/g, ""),
        address: data.customer.address,
        addressNumber: data.customer.number,
        neighborhood: data.customer.neighborhood,
        notes: data.customer.notes,
      },
      select: { protocol: true, estimatedTotal: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Este horário acaba de ser reservado. Escolha outro." }, { status: 409 });
    }

    console.error("Falha ao criar agendamento", error);
    return NextResponse.json({ error: "Não foi possível registrar o agendamento." }, { status: 500 });
  }
}
