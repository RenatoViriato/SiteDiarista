"use client";

import { useCallback, useState } from "react";
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

  const goSection = useCallback(
    (sectionId: SectionId) => {
      const scrollToSection = () => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      };
      if (view !== "home") {
        setView("home");
        // Aguarda a home montar antes de rolar até a seção
        window.setTimeout(scrollToSection, 80);
      } else {
        scrollToSection();
      }
    },
    [view]
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
