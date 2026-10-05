import React from 'react';
import { SERVICE_ITEMS } from '../data/serviceData';
import { Check, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesPricingProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ onSelectService }) => {
  const supportedBrands = [
    { name: 'Roto', desc: 'NT / NX kování' },
    { name: 'MACO', desc: 'Multi-Matic / Multi-Trend' },
    { name: 'Siegenia', desc: 'AUBI / Titan AF' },
    { name: 'Winkhaus', desc: 'activPilot / autoPilot' },
    { name: 'G-U', desc: 'Gretsch-Unitas Uni-Jet' },
    { name: 'Schüco', desc: 'VarioTec / Corona' },
  ];

  return (
    <section id="cenik" className="py-14 sm:py-22 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">
            <span>Férové ceny bez skrytých poplatků</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ceník servisu oken pro celou Moravu
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Vstupní kontrola a zjištění stavu je vždy <strong className="text-slate-900">zdarma</strong>. Technik vám před zahájením jakékoli opravy předloží položkový rozpočet.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_ITEMS.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all border ${
                service.popular
                  ? 'bg-white border-cyan-600 shadow-xl shadow-cyan-600/10 ring-1 ring-cyan-600/25'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    {service.title}
                  </h3>
                  {service.popular && (
                    <span className="text-[11px] font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded shrink-0">
                      Garantováno
                    </span>
                  )}
                </div>

                {/* Price Tag */}
                <div className="mb-4">
                  <span className={`text-2xl font-black font-mono tracking-tight ${
                    service.id === 'kontrola-zdarma' ? 'text-emerald-700' : 'text-cyan-700'
                  }`}>
                    {service.priceTag}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2.5 text-xs text-slate-700 mb-6 border-t border-slate-100 pt-4">
                  {service.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectService(service.id)}
                className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  service.popular
                    ? 'bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                }`}
              >
                <span>Objednat tento úkon</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Comparison: Service vs Replacement */}
        <div className="mt-14 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
              Ekonomické srovnání
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Proč se vyplatí servis namísto nákupu nových oken?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Více než 90 % oken, která profukují nebo drhnou, není nutné měnit – stačí odborné seřízení geometrie a nové těsnění.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Box A: Regular Service */}
            <div className="p-5 bg-white rounded-xl border border-cyan-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-cyan-800 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                <span>Odborný servis Reno okna</span>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Cena za byt 3+1: obvykle <strong>1 800 – 3 500 Kč</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Doba realizace: <strong>1 až 2 hodiny</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Bez prachu, bourání</strong> a zednických oprav</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Prodloužení funkčnosti oken o dalších <strong>10–15 let</strong></span>
                </li>
              </ul>
            </div>

            {/* Box B: New Windows */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 opacity-90 shadow-xs">
              <div className="flex items-center gap-2 text-slate-600 font-bold text-base">
                <ShieldAlert className="w-5 h-5 text-slate-400" />
                <span>Výměna oken za nová</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Cena za byt 3+1: <strong>90 000 – 160 000 Kč</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Dodací lhůta 6 až 10 týdnů</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Hluk, prach, bourání ostění a vymalování</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Návratnost investice v úspoře tepla až 25 let</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Supported Manufacturers */}
        <div className="mt-12 pt-6 border-t border-slate-200">
          <div className="text-center mb-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Podporované profilové systémy a originální kování
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {supportedBrands.map((b) => (
              <div
                key={b.name}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center shadow-2xs"
              >
                <div className="text-sm font-black text-slate-800">{b.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
