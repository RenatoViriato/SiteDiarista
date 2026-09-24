"use client";

import { ServiceCard } from "@/components/agency/ServiceCard";
import { SectionEyebrow } from "@/components/agency/SectionEyebrow";
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
      className="scroll-mt-20 border-y border-brand-100 bg-brand-50/60 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Nossos serviços</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Escolha o que sua casa ou empresa precisa
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Seis tipos de atendimento, preços transparentes e profissionais
            prontas para agir. Toque em selecionar para começar o agendamento.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
