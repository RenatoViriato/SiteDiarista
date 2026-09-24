"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBRL, type Service } from "@/lib/agency-data";

interface ServiceCardProps {
  service: Service;
  index: number;
  onSelect: (serviceId: string) => void;
}

/** Card de serviço: nome, descrição, preço inicial e botão "Selecionar". */
export function ServiceCard({ service, index, onSelect }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="group relative flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl hover:shadow-brand-900/5 focus-within:border-gold-400"
      aria-label={`Serviço: ${service.name}`}
    >
      {service.popular && (
        <span className="absolute -top-3 right-5 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-brand-900 shadow-md shadow-gold-500/30">
          Mais pedido
        </span>
      )}

      <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-800 group-hover:text-gold-300 group-hover:ring-brand-700">
        <Icon className="size-6" strokeWidth={1.9} />
      </span>

      <h3 className="mt-4 text-lg font-extrabold text-brand-900">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-brand-50 pt-4">
        <p>
          <span className="block text-[11px] font-bold uppercase tracking-wide text-gold-700">
            A partir de
          </span>
          <span className="text-xl font-extrabold text-brand-900">
            {formatBRL(service.startingPrice)}
          </span>
        </p>
      </div>

      <Button
        onClick={() => onSelect(service.id)}
        className="mt-4 h-11 w-full rounded-xl font-bold shadow-sm shadow-brand-900/15 transition-all group-hover:shadow-md"
        aria-label={`Selecionar serviço ${service.name}`}
      >
        Selecionar
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </motion.article>
  );
}
