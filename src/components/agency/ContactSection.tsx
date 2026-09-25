"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { SectionEyebrow } from "@/components/agency/SectionEyebrow";
import { WHATSAPP_DISPLAY, whatsAppContactLink } from "@/lib/agency-data";

const CONTACT_ITEMS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    hint: "Resposta rápida em horário comercial",
    href: whatsAppContactLink(),
    destaque: true,
  },
  {
    icon: Clock,
    title: "Horário de atendimento",
    value: "8h às 18h (seg. a sáb.)",
    hint: "Agendamento online 24h; a profissional chega entre 8h e 17h",
  },
  {
    icon: MapPin,
    title: "Área de atendimento",
    value: "Rio de Janeiro e região",
    hint: "Consulte a taxa de deslocamento",
  },
];

/** Seção de contato com os canais da agência. */
export function ContactSection() {
  return (
    <section
      id="contato"
      aria-label="Contato da agência"
      className="scroll-mt-20 border-y border-brand-100 bg-brand-50/60 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Contato</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Fale com a R&amp;R Casa em Ordem
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Dúvidas sobre serviços, preços ou disponibilidade? Nossa equipe
            responde rapidinho por qualquer um dos canais abaixo.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACT_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <>
                <span
                  className={`grid size-11 place-items-center rounded-xl transition-colors ${
                    item.destaque
                      ? "bg-gradient-to-br from-gold-300 to-gold-500 text-brand-900"
                      : "bg-brand-50 text-brand-600 ring-1 ring-brand-100 group-hover:bg-brand-800 group-hover:text-gold-300"
                  }`}
                >
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-base font-extrabold text-brand-900">
                  {item.value}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.hint}
                </p>
              </>
            );

            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
                className={`group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/5 ${
                  item.destaque
                    ? "border-gold-200 ring-1 ring-gold-200"
                    : "border-brand-100 hover:border-gold-300"
                }`}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                    aria-label={`Abrir ${item.title}: ${item.value}`}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
