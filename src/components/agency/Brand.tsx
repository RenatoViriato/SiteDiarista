import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandProps {
  /** "md" no cabeçalho, "lg" no rodapé */
  size?: "md" | "lg";
  className?: string;
}

/**
 * Logo oficial da R&R Casa em Ordem.
 *
 * Usa o arquivo com cantos transparentes (`icon-512.png`), então o selo fica
 * redondo tanto sobre o branco do cabeçalho quanto sobre o azul do rodapé.
 * O próprio selo já traz o nome da marca, por isso não repetimos o nome em texto.
 */
export function Brand({ size = "md", className }: BrandProps) {
  return (
    <Image
      src="/icon-512.png"
      alt="R&R Casa em Ordem — limpeza profissional"
      width={512}
      height={512}
      priority
      className={cn(
        "shrink-0 object-contain",
        size === "lg" ? "size-24" : "size-14 sm:size-16",
        className
      )}
    />
  );
}
