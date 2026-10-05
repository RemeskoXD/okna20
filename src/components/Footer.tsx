import React from 'react';
import { RenoLogo } from './RenoLogo';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-100/90 text-slate-600 border-t border-slate-200/80 pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-200">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <RenoLogo size="md" variant="light" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              Specializovaný servis, seřízení a revize oken pro celou Moravu. Zajišťujeme bezplatné vstupní diagnostiky, výměnu těsnění a servis celoobvodového kování s důrazem na kvalitu a úsporu tepla.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Garantovaná nezávazná kontrola po celé Moravě zdarma</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Služby a informace
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#jak-funguje" className="hover:text-cyan-700 transition-colors">
                  Jak probíhá kontrola zdarma
                </a>
              </li>
              <li>
                <a href="#diagnostika" className="hover:text-cyan-700 transition-colors">
                  Interaktivní termovize oken
                </a>
              </li>
              <li>
                <a href="#cenik" className="hover:text-cyan-700 transition-colors">
                  Ceník servisu a výměny těsnění
                </a>
              </li>
              <li>
                <a href="#morava" className="hover:text-cyan-700 transition-colors">
                  Působnost a města na Moravě
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-700 transition-colors">
                  Časté dotazy k servisu
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Direct Dispatch */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Centrální dispečink pro Moravu
            </span>

            <div className="space-y-2.5 text-xs text-slate-700">
              <a
                href="tel:+420770456890"
                className="flex items-center gap-2.5 text-slate-900 hover:text-cyan-700 transition-colors font-bold text-sm"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>+420 770 456 890</span>
              </a>

              <a
                href="mailto:servis@reno-okna.cz"
                className="flex items-center gap-2.5 hover:text-cyan-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-600" />
                <span>servis@reno-okna.cz</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-600">
                <Clock className="w-4 h-4 text-cyan-600" />
                <span>Dispečink: Po – Ne 08:00 – 20:00 hod.</span>
              </div>

              <div className="flex items-start gap-2.5 text-slate-600">
                <MapPin className="w-4 h-4 text-cyan-600 mt-0.5" />
                <span>Servisní střediska: Brno, Ostrava, Olomouc, Zlín</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 rounded-xl transition-all shadow-xs cursor-pointer text-center"
              >
                Rezervovat bezplatnou kontrolu (0 Kč)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Reno okna. Všechna práva vyhrazena. Servis a seřízení oken po celé Moravě.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-700 cursor-pointer">Ochrana osobních údajů</span>
            <span>·</span>
            <span className="hover:text-slate-700 cursor-pointer">Servisní podmínky</span>
            <span>·</span>
            <span className="hover:text-slate-700 cursor-pointer">Certifikace kování Roto & MACO</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
