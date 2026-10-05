import React from 'react';
import { TESTIMONIALS } from '../data/serviceData';
import { Star, ShieldCheck, MapPin, Building2, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-14 sm:py-22 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">
            <span>Ověřené reference z moravských měst</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Co říkají naši zákazníci po kontrole oken?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Reálné zkušenosti majitelů bytů, rodinných domů i předsedů SVJ z Brna, Ostravy, Olomouce a Zlína.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm"
            >
              <div>
                {/* Header with stars and location metadata */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-500 gap-0.5" aria-label={`Hodnocení ${t.rating} z 5 hvězdiček`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{t.location}</span>
                  </div>
                </div>

                {/* Property Type kicker */}
                <div className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.propertyType}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  „{t.text}“
                </p>
              </div>

              {/* Author and Measurable Outcome */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    ✓ Ověřená kontrola Reno okna
                  </span>
                </div>

                <div className="text-xs text-slate-600 font-semibold text-right">
                  {t.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
