import React from 'react';
import { CalendarCheck, Search, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onStartBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartBooking }) => {
  const steps = [
    {
      step: '01',
      title: 'Rezervace online za 1 minutu',
      subtitle: 'Vyberete si město a vyhovující den',
      desc: 'Ve formuláři níže si zvolíte preferovaný čas návštěvy a popíšete, co vás na oknech trápí. Dispečer termín obratem potvrdí formou SMS.',
      badge: 'Rychlé & online',
      icon: CalendarCheck,
    },
    {
      step: '02',
      title: 'Bezplatný příjezd & kontrola',
      subtitle: 'Výjezd i kompletní diagnostika za 0 Kč',
      desc: 'Náš certifikovaný technik dorazí přímo k vám domů. Prověří přítlak křídel, stav těsnění a opotřebení kování. Vše vidíte na vlastní oči.',
      badge: 'Garantováno 0 Kč',
      icon: Search,
    },
    {
      step: '03',
      title: 'Přesná kalkulace nebo servis na místě',
      subtitle: 'Žádné skryté poplatky, plná kontrola',
      desc: 'Dozvíte se přesnou cenu předem. Většinu běžných seřízení a výměn těsnění provádíme ihned na místě z originálních dílů se zárukou 24 měsíců.',
      badge: 'Záruka 24 měsíců',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="jak-funguje" className="py-16 sm:py-24 bg-white border-y border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-800 bg-cyan-50 border border-cyan-200/80 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Férový a jednoduchý proces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight [text-wrap:balance]">
            Jak probíhá bezplatná kontrola oken?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Žádné skryté podmínky ani nucení do koupě nových oken. Zjistíme skutečný stav a navrhneme ekonomické řešení.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-cyan-500/40 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-3xl font-black text-slate-300 group-hover:text-cyan-600 transition-colors">
                      {item.step}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      idx === 1
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-cyan-600 text-slate-800 group-hover:text-white flex items-center justify-center border border-slate-200 group-hover:border-cyan-600 transition-all shadow-xs mb-5">
                    <IconComp className="w-6 h-6 transition-colors" />
                  </div>

                  {/* Texts */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-900 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-700 mt-1 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Nezávazné & bez rizika</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold">
              Chcete mít jistotu, že vaše okna nepropouští zimu?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Přijedeme kamkoliv na Moravě a provedeme bezplatné měření těsnosti.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartBooking}
            className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 active:scale-98 rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Rezervovat bezplatnou kontrolu</span>
            <ArrowRight className="w-4 h-4 text-cyan-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
