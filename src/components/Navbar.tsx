import React, { useState, useEffect } from 'react';
import { RenoLogo } from './RenoLogo';
import { Phone, Calendar, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3-4 clean, essential links - maximum clarity, zero clutter, perfectly spaced
  const navLinks = [
    { label: 'Jak to funguje', href: '#jak-funguje' },
    { label: 'Diagnostika & Termovize', href: '#diagnostika' },
    { label: 'Ceník služeb', href: '#cenik' },
    { label: 'Pokrytí na Moravě', href: '#morava' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] py-3'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/50 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Zone 1: Brand wordmark / logo */}
            <a
              href="#"
              className="flex items-center shrink-0 group transition-transform active:scale-95"
              aria-label="Reno okna – Servis oken Morava"
            >
              <RenoLogo size="md" variant="light" />
            </a>

            {/* Zone 2: Pure simplicity - clean, airy navigation */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-cyan-700 transition-colors relative py-1 text-[13px] tracking-tight hover:font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-600 hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Polished conversion actions */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              
              {/* Phone dispatch with active status pulse */}
              <a
                href="tel:+420770456890"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-cyan-700 hover:bg-slate-100 transition-all"
                title="Zavolat na dispečink servisních techniků"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <Phone className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-mono">770 456 890</span>
              </a>

              {/* Primary Jewel CTA Button */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 active:scale-98 rounded-full shadow-md shadow-cyan-600/20 hover:shadow-lg hover:shadow-cyan-600/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Kontrola zdarma</span>
                <span className="hidden sm:inline bg-cyan-800/40 text-cyan-100 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-extrabold">0 Kč</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-cyan-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Otevřít hlavní menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Silky Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-900/30 backdrop-blur-xs pt-20 px-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <RenoLogo size="sm" variant="light" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"
                aria-label="Zavřít menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 text-base font-bold text-slate-800 hover:text-cyan-700 hover:bg-cyan-50/60 rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <a
                href="tel:+420770456890"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>Zavolat: 770 456 890</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 rounded-xl shadow-md shadow-cyan-600/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Objednat kontrolu zdarma (0 Kč)</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

