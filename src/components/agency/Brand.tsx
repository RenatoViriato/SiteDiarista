import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandProps {
  /** Tamanho do logotipo */
  size?: "sm" | "md";
  className?: string;
}

/** Logotipo da agência: marca (casa com bolhas) + nome. Reutilizado no header e no footer. */
export function Brand({ size = "md", className }: BrandProps) {
  const logoSize = size === "md" ? 44 : 38;
  const title = size === "md" ? "text-xl" : "text-lg";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo-renata.png"
        alt="Logo R&R Casa em Ordem: estrela dourada com casinha azul-marinho"
        width={logoSize}
        height={logoSize}
        priority
        className={cn("object-contain", size === "md" ? "size-11" : "size-9")}
      />
      <span className="leading-tight">
        <span className={cn("block font-extrabold tracking-tight whitespace-nowrap", title)}>
          R<span className="text-brand-500">&amp;</span>R
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Casa em Ordem
        </span>
      </span>
    </span>
  );
}
