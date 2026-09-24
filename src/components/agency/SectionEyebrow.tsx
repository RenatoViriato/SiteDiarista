import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: ReactNode;
  /** "center" nas seções centralizadas, "left" nos blocos alinhados à esquerda */
  align?: "center" | "left";
  /** "light" para usar sobre o azul-marinho escuro */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Rótulo pequeno acima dos títulos de seção, com o filete dourado da marca.
 * Padroniza o "olho" de todas as seções do site.
 */
export function SectionEyebrow({
  children,
  align = "center",
  tone = "dark",
  className,
}: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex flex-col gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.2em]",
        align === "center" ? "items-center" : "items-start",
        tone === "dark" ? "text-gold-700" : "text-gold-300",
        className
      )}
    >
      {children}
      <span aria-hidden="true" className="gold-rule h-0.5 w-14 rounded-full" />
    </span>
  );
}
