"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/agency/Header";
import { Footer } from "@/components/agency/Footer";
import { Hero } from "@/components/agency/Hero";
import { Benefits } from "@/components/agency/Benefits";
import { ServicesSection } from "@/components/agency/ServicesSection";
import { HowItWorks } from "@/components/agency/HowItWorks";
import { CtaBanner } from "@/components/agency/CtaBanner";
import { ContactSection } from "@/components/agency/ContactSection";
import { BookingFlow } from "@/components/agency/booking/BookingFlow";
import type { AppView, SectionId } from "@/components/agency/types";

/**
 * Aplicativo de página única da Agência de Diaristas.
 *
 * Views:
 *  - "home": seções institucionais (início, serviços, como funciona, contato)
 *  - "booking": fluxo de agendamento em etapas
 *
 * Dados simulados via `src/lib/agency-data.ts` — pronto para plugar backend.
 */
export default function Home() {
  const [view, setView] = useState<AppView>("home");
  const [preselectedServiceId, setPreselectedServiceId] = useState<
    string | null
  >(null);
  /** Incrementa a cada novo agendamento para reiniciar o fluxo do zero. */
  const [bookingSession, setBookingSession] = useState(0);
  /** Seção a rolar assim que a home voltar a montar (ex.: sair do agendamento). */
  const [pendingSection, setPendingSection] = useState<SectionId | null>(null);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const goHome = useCallback(() => {
    setView("home");
    scrollToTop();
  }, [scrollToTop]);

  const goBooking = useCallback(
    (serviceId?: string) => {
      setPreselectedServiceId(serviceId ?? null);
      setBookingSession((session) => session + 1);
      setView("booking");
      scrollToTop();
    },
    [scrollToTop]
  );

  const scrollToSection = useCallback((sectionId: SectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Rola até a seção somente depois que a home realmente está no DOM
  // (antes era um setTimeout fixo de 80ms, que falhava em telas lentas).
  useEffect(() => {
    if (view !== "home" || !pendingSection) return;
    const frame = window.requestAnimationFrame(() => {
      scrollToSection(pendingSection);
      setPendingSection(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [view, pendingSection, scrollToSection]);

  const goSection = useCallback(
    (sectionId: SectionId) => {
      if (view !== "home") {
        setView("home");
        setPendingSection(sectionId);
        return;
      }
      scrollToSection(sectionId);
    },
    [view, scrollToSection]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        view={view}
        onGoHome={goHome}
        onGoSection={goSection}
        onGoBooking={() => goBooking()}
      />

      <main className="flex-1">
        {view === "home" ? (
          <>
            <Hero
              onGoBooking={() => goBooking()}
              onGoServices={() => goSection("servicos")}
            />
            <Benefits />
            <ServicesSection onSelect={(serviceId) => goBooking(serviceId)} />
            <HowItWorks />
            <CtaBanner onGoBooking={() => goBooking()} />
            <ContactSection />
          </>
        ) : (
          <BookingFlow
            key={bookingSession}
            initialServiceId={preselectedServiceId}
            onGoHome={goHome}
            onRestart={() => goBooking()}
          />
        )}
      </main>

      <Footer
        onGoSection={goSection}
        onGoBookingWithService={(serviceId) => goBooking(serviceId)}
      />
    </div>
  );
}
