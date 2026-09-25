"use client";

import { useState } from "react";
import { ClipboardList, MapPin, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepNav } from "@/components/agency/booking/StepNav";
import {
  maskPhone,
  validateCustomer,
  type CustomerData,
} from "@/lib/agency-data";
import { cn } from "@/lib/utils";

interface DetailsStepProps {
  customer: CustomerData;
  onChange: (customer: CustomerData) => void;
  onBack: () => void;
  onNext: () => void;
}

type FieldErrors = Partial<Record<keyof CustomerData, string>>;

/** Etapa 5: dados do cliente e endereço do atendimento. */
export function DetailsStep({
  customer,
  onChange,
  onBack,
  onNext,
}: DetailsStepProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  const update = (field: keyof CustomerData, value: string) => {
    onChange({ ...customer, [field]: value });
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleNext = () => {
    const found = validateCustomer(customer);
    setErrors(found);
    if (Object.keys(found).length === 0) onNext();
  };

  const inputClass = (field: keyof CustomerData) =>
    cn("h-11 rounded-xl bg-white", errors[field] && "border-destructive");

  return (
    <div>
      <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-brand-900 sm:text-2xl">
        <User className="size-5 text-gold-600" />
        Seus dados
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Usamos essas informações para confirmar o agendamento pelo WhatsApp.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="customer-name" className="font-bold">
            Nome completo <span className="text-destructive">*</span>
          </Label>
          <Input
            id="customer-name"
            value={customer.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Ex.: Ana Souza"
            autoComplete="name"
            className={inputClass("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs font-semibold text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="customer-phone" className="font-bold">
            Telefone / WhatsApp <span className="text-destructive">*</span>
          </Label>
          <Input
            id="customer-phone"
            value={customer.phone}
            onChange={(e) => update("phone", maskPhone(e.target.value))}
            placeholder="(21) 98888-7777"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone ? (
            <p className="text-xs font-semibold text-destructive">
              {errors.phone}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              É por aqui que confirmamos seu agendamento.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-brand-800">
          <MapPin className="size-4 text-gold-600" />
          Endereço do atendimento
        </h3>

        <div className="mt-3 grid gap-4 sm:grid-cols-5">
          <div className="space-y-1.5 sm:col-span-3">
            <Label htmlFor="customer-address" className="font-bold">
              Endereço <span className="text-destructive">*</span>
            </Label>
            <Input
              id="customer-address"
              value={customer.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Rua, avenida..."
              autoComplete="street-address"
              className={inputClass("address")}
              aria-invalid={!!errors.address}
            />
            {errors.address && (
              <p className="text-xs font-semibold text-destructive">
                {errors.address}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="customer-number" className="font-bold">
              Número <span className="text-destructive">*</span>
            </Label>
            <Input
              id="customer-number"
              value={customer.number}
              onChange={(e) => update("number", e.target.value)}
              placeholder="123"
              inputMode="numeric"
              className={inputClass("number")}
              aria-invalid={!!errors.number}
            />
            {errors.number && (
              <p className="text-xs font-semibold text-destructive">
                {errors.number}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="customer-neighborhood" className="font-bold">
              Bairro <span className="text-destructive">*</span>
            </Label>
            <Input
              id="customer-neighborhood"
              value={customer.neighborhood}
              onChange={(e) => update("neighborhood", e.target.value)}
              placeholder="Centro"
              autoComplete="address-level3"
              className={inputClass("neighborhood")}
              aria-invalid={!!errors.neighborhood}
            />
            {errors.neighborhood && (
              <p className="text-xs font-semibold text-destructive">
                {errors.neighborhood}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-1.5">
        <Label
          htmlFor="customer-notes"
          className="flex items-center gap-2 font-bold"
        >
          <ClipboardList className="size-4 text-gold-600" />
          Observações <span className="text-xs font-medium text-muted-foreground">(opcional)</span>
        </Label>
        <Textarea
          id="customer-notes"
          value={customer.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Ex.: moro com pets, focar na cozinha, portão azul, tem escada..."
          rows={3}
          className="rounded-xl bg-white"
        />
        <p className="text-xs text-muted-foreground">
          Conte detalhes que ajudem a diarista a se preparar melhor.
        </p>
      </div>

      <StepNav
        onBack={onBack}
        onNext={handleNext}
        nextLabel="Ver resumo"
      />
    </div>
  );
}
