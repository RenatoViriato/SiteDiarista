"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatBRL, type Service } from "@/lib/agency-data";

interface ServiceCardProps {
  service: Service;
  index: number;
  onSelect: (serviceId: string) => void;
}

/** Card de serviço: nome, descrição, preço inicial e botão "Selecionar".
 *  Serviços com foto (service.image) exibem a imagem no topo, full-bleed. */
export function ServiceCard({ service, index, onSelect }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5 focus-within:border-brand-300"
      aria-label={`Serviço: ${service.name}`}
    >
      {service.popular && (
        <span className="absolute -top-3 right-5 z-10 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-sm">
          Mais pedido
        </span>
      )}

      {service.image ? (
        <div className="relative -mx-6 -mt-6 mb-5">
          <Image
            src={service.image}
            alt={service.imageAlt ?? service.name}
            width={1000}
            height={563}
            className="aspect-video w-full object-cover"
          />
          <span className="absolute bottom-3 left-6 grid size-10 place-items-center rounded-xl bg-white/95 text-brand-600 shadow-sm backdrop-blur">
            <Icon className="size-5" strokeWidth={1.9} />
          </span>
        </div>
      ) : (
        <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
          <Icon className="size-6" strokeWidth={1.9} />
        </span>
      )}

      <h3
        className={cn(
          "text-lg font-extrabold text-slate-900",
          !service.image && "mt-4"
        )}
      >
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-brand-50 pt-4">
        <p>
          <span className="block text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            A partir de
          </span>
          <span className="text-xl font-extrabold text-slate-900">
            {formatBRL(service.startingPrice)}
          </span>
        </p>
      </div>

      <Button
        onClick={() => onSelect(service.id)}
        className="mt-4 h-11 w-full rounded-xl font-bold shadow-sm shadow-brand-600/20 transition-all group-hover:shadow-md group-hover:shadow-brand-600/25"
        aria-label={`Selecionar serviço ${service.name}`}
      >
        Selecionar
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </motion.article>
  );
}
