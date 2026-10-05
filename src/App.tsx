import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { WindowDiagnosisTool } from './components/WindowDiagnosisTool';
import { ServicesPricing } from './components/ServicesPricing';
import { MoravaCoverage } from './components/MoravaCoverage';
import { BookingWizard } from './components/BookingWizard';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingSubmission } from './types';

export default function App() {
  const [targetCity, setTargetCity] = useState<string>('Brno');
  const [targetIssue, setTargetIssue] = useState<string>('kontrola-zdarma');
  const [submittedBooking, setSubmittedBooking] = useState<BookingSubmission | null>(null);

  const scrollToBooking = (city?: string, issue?: string) => {
    if (city) setTargetCity(city);
    if (issue) setTargetIssue(issue);

    const bookingEl = document.getElementById('kontrola');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (booking: BookingSubmission) => {
    setSubmittedBooking(booking);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500 selection:text-white">
      {/* Pristine Glass Floating Navbar */}
      <Navbar onOpenBooking={() => scrollToBooking()} />

      <main className="flex-1">
        {/* 1. Hero with Interactive Availability & Issue Estimator */}
        <Hero onQuickBook={(city, issue) => scrollToBooking(city, issue)} />

        {/* 2. How the Free Check Works in 3 Clean Steps */}
        <HowItWorks onStartBooking={() => scrollToBooking()} />

        {/* 3. Unified Interactive Studio: Thermal Camera Simulator + Window Anatomy & Savings */}
        <WindowDiagnosisTool
          onSelectProblemForBooking={(issueId) => scrollToBooking(undefined, issueId)}
        />

        {/* 4. Transparent Services & Original Parts Pricing Matrix */}
        <ServicesPricing
          onSelectService={(serviceId) => scrollToBooking(undefined, serviceId)}
        />

        {/* 5. Moravian Territorial Coverage with Fast District Search */}
        <MoravaCoverage
          onSelectCity={(city) => scrollToBooking(city, 'kontrola-zdarma')}
        />

        {/* 6. Lead Capture Multi-step Booking Wizard */}
        <BookingWizard
          key={`${targetCity}-${targetIssue}`}
          initialCity={targetCity}
          initialIssue={targetIssue}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 7. Verified Moravian Testimonials */}
        <Testimonials />

        {/* 8. FAQ with Schema.org JSON-LD Structured Data */}
        <FaqSection />
      </main>

      {/* Footer with Contact, Hours & Legal Notice */}
      <Footer onOpenBooking={() => scrollToBooking()} />

      {/* Mobile Sticky Bar for Instant Actions */}
      <MobileStickyBar onOpenBooking={() => scrollToBooking()} />

      {/* Success Modal upon Reservation */}
      <BookingSuccessModal
        booking={submittedBooking}
        onClose={() => setSubmittedBooking(null)}
      />
    </div>
  );
}

