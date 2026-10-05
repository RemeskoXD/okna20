import React, { useState } from 'react';
import { MORAVA_REGIONS } from '../data/serviceData';
import { MapPin, Search, CheckCircle2, ShieldCheck, Car, Calendar } from 'lucide-react';

interface MoravaCoverageProps {
  onSelectCity: (city: string) => void;
}

export const MoravaCoverage: React.FC<MoravaCoverageProps> = ({ onSelectCity }) => {
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentRegion = MORAVA_REGIONS[selectedRegionIndex];

  // Search logic across all cities on Morava
  const searchResults = searchQuery.trim()
    ? MORAVA_REGIONS.flatMap((region) =>
        region.cities
          .filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((city) => ({ city, region: region.name, leadCity: region.leadCity }))
      )
    : [];

  return (
    <section id="morava" className="py-14 sm:py-22 bg-slate-100/50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4 text-cyan-600" />
            <span>Lokální servis pro celou Moravu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kde na Moravě servisujeme vaše okna?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Díky síti mobilních servisních dílen dojíždíme do všech měst a přilehlých obcí po celé Moravě. Neplatíte žádné cestovné ani v odlehlých oblastech.
          </p>
        </div>

        {/* Live City Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ověřte své město nebo obec (např. Brno, Olomouc, Kroměříž, Vyškov...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-sm bg-white border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 shadow-sm placeholder:text-slate-400"
            />
          </div>

          {/* Search Result Feedback */}
          {searchQuery.trim() !== '' && (
            <div className="mt-3 p-4 bg-white border border-slate-200 rounded-xl shadow-md">
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Ano! V této lokalitě máme servisní pokrytí:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {searchResults.map((res) => (
                      <button
                        key={res.city}
                        type="button"
                        onClick={() => onSelectCity(res.city)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-cyan-600 rounded-lg text-xs text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3 h-3 text-cyan-600" />
                        <span><strong>{res.city}</strong> ({res.region})</span>
                        <span className="text-cyan-700 font-semibold ml-1">→ Rezervovat 0 Kč</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-600">
                  Město „{searchQuery}“ nebylo nalezeno v přímém seznamu, ale obsluhujeme i všechny okolní obce!{' '}
                  <button
                    type="button"
                    onClick={() => onSelectCity(searchQuery)}
                    className="text-cyan-700 font-bold hover:underline ml-1"
                  >
                    Objednat kontrolu pro {searchQuery}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Region Tabs - Clean Functional Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {MORAVA_REGIONS.map((region, idx) => (
            <button
              key={region.code}
              type="button"
              onClick={() => setSelectedRegionIndex(idx)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                selectedRegionIndex === idx
                  ? 'bg-cyan-600 border-cyan-600 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{region.name}</span>
            </button>
          ))}
        </div>

        {/* Region Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                  Regionální centrum: {currentRegion.leadCity}
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {currentRegion.statusText}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {currentRegion.name}
              </h3>

              <div className="text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Plánované výjezdy: <strong>{currentRegion.daysInArea}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Mobilní posádky v regionu: <strong>{currentRegion.activeTechCount} servisní technici</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dopravné pro všechna města a obce: <strong>0 Kč (ZDARMA)</strong></span>
                </div>
              </div>

              {/* Covered Cities List */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  Pravidelně obsluhovaná města v tomto kraji:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentRegion.cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => onSelectCity(city)}
                      className="px-2.5 py-1 text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-cyan-700 border border-slate-200 rounded-md transition-colors"
                      title={`Objednat servis pro město ${city}`}
                    >
                      {city}
                    </button>
                  ))}
                  <span className="px-2.5 py-1 text-xs text-slate-400">
                    + všechny přilehlé obce
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card Action Box */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 text-center space-y-3">
              <div className="text-xs text-slate-600">
                Bydlíte v regionu <strong className="text-slate-900">{currentRegion.leadCity} a okolí</strong>?
              </div>
              <div className="text-sm font-bold text-slate-900">
                Máme pro vás volné termíny na kontrolu oken tento týden
              </div>
              <button
                type="button"
                onClick={() => onSelectCity(currentRegion.leadCity)}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Rezervovat termín v {currentRegion.leadCity}
              </button>
              <div className="text-[11px] text-slate-500">
                100% nezávazná kontrola přímo u vás
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
