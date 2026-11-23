"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, MessageCircle, Users } from "lucide-react";

const CONTACT_ITEMS = [
  {
    icon: MessageCircle,
    title: "Dúvidas e agendamentos",
    value: "(21) 97189-6013",
    hint: "WhatsApp — serviços, preços e disponibilidade",
    href: "https://wa.me/5521971896013",
  },
  {
    icon: Users,
    title: "Faça parte da equipe",
    value: "(21) 99564-9813",
    hint: "WhatsApp — envie sua mensagem e junte-se ao time",
    href: "https://wa.me/5521995649813",
  },
  {
    icon: Clock,
    title: "Horário de atendimento",
    value: "8h às 18h",
    hint: "Agendamentos online 24h por dia",
  },
  {
    icon: MapPin,
    title: "Área de atendimento",
    value: "Rio de Janeiro e região",
    hint: "Consulte a taxa de deslocamento",
  },
];

/** Seção de contato com canais da agência. */
export function ContactSection() {
  return (
    <section
      id="contato"
      aria-label="Contato da agência"
      className="scroll-mt-20 bg-brand-50/50 py-14 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-600">
            Contato
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Fale com a R&amp;R Casa em Ordem
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Dúvidas sobre serviços, preços ou disponibilidade? Nossa equipe
            responde rapidinho por qualquer um dos canais abaixo. Quer fazer
            parte do nosso time? Temos um WhatsApp só para quem quer entrar na
            equipe.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <>
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-base font-extrabold text-slate-900">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
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
                className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
