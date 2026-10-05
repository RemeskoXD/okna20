import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Phone,
  Wrench,
  Flame,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Wind,
  Check
} from 'lucide-react';

interface HeroProps {
  onQuickBook: (city?: string, issue?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickBook }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Brno');
  const [selectedIssue, setSelectedIssue] = useState<string>('profukovani');

  const popularCities = ['Brno', 'Ostrava', 'Olomouc', 'Zlín', 'Břeclav', 'Jihlava'];

  const issuesList = [
    { id: 'profukovani', label: 'Profukování a zima', icon: Wind, desc: 'Únik tepla kolem rámu' },
    { id: 'drhnuti', label: 'Křídlo drhne o rám', icon: Wrench, desc: 'Prověšené panty' },
    { id: 'klika', label: 'Zaseknutá / volná klika', icon: ShieldCheck, desc: 'Závada v převodovce' },
    { id: 'kontrola-zdarma', label: 'Kompletní revize oken', icon: Sparkles, desc: 'Vstupní diagnostika 0 Kč' },
  ];

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-100/90 via-slate-50 to-white">
      {/* Delicate, airy architectural illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-r from-cyan-100/50 via-teal-100/30 to-blue-100/40 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Elegant Status Chip */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-cyan-900 bg-cyan-50/90 border border-cyan-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Servis oken pro celou Moravu</span>
              <span className="text-cyan-300" aria-hidden="true">·</span>
              <span className="text-slate-600 font-medium">Výjezd i kontrola oken 0 Kč</span>
            </div>

            {/* Main Headline - Typographic perfection */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-slate-900 leading-[1.12] [text-wrap:balance]">
              Profesionální servis oken.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-cyan-600 to-teal-600 mt-1">
                Bezplatná kontrola
              </span>
              <span className="block text-slate-700 font-bold text-2xl sm:text-3xl lg:text-4xl mt-2 tracking-tight">
                přímo u vás doma kdekoli na Moravě
              </span>
            </h1>

            {/* Clear, reassuring subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Táhne vám z oken, drhne křídlo nebo netěsní rám? Náš certifikovaný technik přijede, bezplatně změří těsnost a seřídí kování. Ušetříte až <strong className="text-slate-900 font-bold">25 % nákladů na vytápění</strong>.
            </p>

            {/* 3 Core Trust Badges with clean icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 border border-slate-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">0 Kč kontrola</div>
                  <div className="text-[11px] text-slate-500">I dojezd po Moravě</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 border border-slate-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Originální díly</div>
                  <div className="text-[11px] text-slate-500">Roto, MACO, Siegenia</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 border border-slate-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Dojezd do 48h</div>
                  <div className="text-[11px] text-slate-500">Záruka 24 měsíců</div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => onQuickBook(selectedCity, selectedIssue)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 active:scale-98 rounded-2xl transition-all shadow-lg shadow-cyan-600/25 hover:shadow-xl hover:shadow-cyan-600/35 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-cyan-100" />
                <span>Rezervovat bezplatnou kontrolu (0 Kč)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+420770456890"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>Zavolat dispečink</span>
              </a>
            </div>

            {/* Customer Rating Metric */}
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-slate-800">4.9 / 5</span>
              <span className="text-amber-500">★★★★★</span>
              <span>· Přes 1 850 spokojených rodin a BD po celé Moravě</span>
            </div>

          </div>

          {/* Right Column: OMG-Effect Interactive Quick-Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] relative space-y-5">
              
              {/* Card Header with Live Dispatch Beacon */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-700 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Rychlé ověření dostupnosti</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Kdy může technik přijet k vám?
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-600 font-mono">0 Kč</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">bez závazku</span>
                </div>
              </div>

              {/* Step A: Select City */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>1. Vyberte vaši lokalitu na Moravě:</span>
                  <span className="text-[11px] font-normal text-cyan-700">Doprava zdarma</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {popularCities.map((city) => (
                    <button
                      type="button"
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedCity === city
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step B: Select Issue in 1 Tap */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  2. Co potřebujete na oknech vyřešit?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {issuesList.map((issue) => {
                    const isSelected = selectedIssue === issue.id;
                    const IconComp = issue.icon;
                    return (
                      <button
                        type="button"
                        key={issue.id}
                        onClick={() => setSelectedIssue(issue.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-50/80 border-cyan-600 ring-1 ring-cyan-600/30 shadow-xs'
                            : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <IconComp className={`w-4 h-4 ${isSelected ? 'text-cyan-700' : 'text-slate-500'}`} />
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-700" />}
                        </div>
                        <div className="mt-1.5">
                          <div className="text-xs font-bold text-slate-900 leading-tight">{issue.label}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{issue.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Availability Output */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-50/80 to-cyan-50/80 rounded-2xl border border-emerald-200/70 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Lokalita: {selectedCity} a okolí</span>
                  </span>
                  <span className="text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[11px]">
                    Volné termíny
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5 border-t border-slate-200/50">
                  <span>Nejbližší volný výjezd:</span>
                  <strong className="text-slate-900 font-semibold">Zítra nebo pozítří</strong>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Cena vstupní kontroly:</span>
                  <strong className="text-emerald-700 font-bold font-mono">0 Kč (ZDARMA)</strong>
                </div>
              </div>

              {/* Direct Booking Trigger */}
              <button
                type="button"
                onClick={() => onQuickBook(selectedCity, selectedIssue)}
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 active:scale-98 rounded-2xl shadow-md shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-cyan-100" />
                <span>Rezervovat termín v {selectedCity} (0 Kč)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-500">
                  Potřebujete poradit hned? Volejte dispečink:{' '}
                  <a href="tel:+420770456890" className="text-cyan-700 font-bold hover:underline">
                    770 456 890
                  </a>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

