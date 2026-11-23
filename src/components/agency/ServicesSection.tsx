"use client";

import { ServiceCard } from "@/components/agency/ServiceCard";
import { SERVICES } from "@/lib/agency-data";

interface ServicesSectionProps {
  onSelect: (serviceId: string) => void;
}

/** Grade com todos os serviços oferecidos pela agência. */
export function ServicesSection({ onSelect }: ServicesSectionProps) {
  return (
    <section
      id="servicos"
      aria-label="Serviços oferecidos"
      className="scroll-mt-20 bg-brand-50/50 py-14 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-600">
            Nossos serviços
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Escolha o que sua casa ou empresa precisa
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Seis tipos de atendimento, preços transparentes e diaristas prontas
            para agir. Clique em selecionar para começar o agendamento.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
