import React, { useState } from 'react';
import { DIAGNOSTIC_HOTSPOTS } from '../data/serviceData';
import { DiagnosticHotspot } from '../types';
import { ThermalInspectionSimulator } from './ThermalInspectionSimulator';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Eye,
  Flame,
  ShieldCheck
} from 'lucide-react';

interface WindowDiagnosisToolProps {
  onSelectProblemForBooking: (issueId: string) => void;
}

export const WindowDiagnosisTool: React.FC<WindowDiagnosisToolProps> = ({
  onSelectProblemForBooking,
}) => {
  // Mode: 'thermal' | 'anatomy' | 'savings'
  const [activeTab, setActiveTab] = useState<'thermal' | 'anatomy' | 'savings'>('thermal');
  const [activeHotspot, setActiveHotspot] = useState<DiagnosticHotspot>(DIAGNOSTIC_HOTSPOTS[0]);
  
  // Anatomy view thermal overlay state & slider
  const [anatomyThermalMode, setAnatomyThermalMode] = useState<boolean>(true);
  const [anatomySlider, setAnatomySlider] = useState<number>(65); // 0 = warm/po servisu, 100 = cold/před servisem
  const [isAnatomyAnimating, setIsAnatomyAnimating] = useState<boolean>(false);

  // Savings calculator state
  const [windowCount, setWindowCount] = useState<number>(8);
  const [heatingType, setHeatingType] = useState<'plyn' | 'elektrina' | 'teplarna'>('plyn');

  const heatingRates = {
    plyn: { name: 'Plyn', unitPrice: 2.8, baseDraftLoss: 420 },
    elektrina: { name: 'Elektřina / TČ', unitPrice: 5.4, baseDraftLoss: 680 },
    teplarna: { name: 'Dálkové teplo', unitPrice: 3.6, baseDraftLoss: 510 },
  };

  const currentLoss = Math.round(windowCount * heatingRates[heatingType].baseDraftLoss);
  const estimatedSavings = Math.round(currentLoss * 0.85);

  return (
    <section id="diagnostika" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/70 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-100/40 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-800 bg-cyan-50 border border-cyan-200/80 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Interaktivní studio Reno okna</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight [text-wrap:balance]">
            Podívejte se, kudy z vašich oken utíká teplo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Vyzkoušejte profesionální termovizní simulátor, odhalte skryté závady kování nebo spočítejte, kolik ušetříte za vytápění.
          </p>
        </div>

        {/* Tab Controls - Clean, Minimalist Zero-Pill Segmented Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('thermal')}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'thermal'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Termovizní simulátor (FLIR)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('anatomy')}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'anatomy'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Konstrukce & kování</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('savings')}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'savings'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Kalkulačka úspory</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Masterpiece Interactive FLIR Thermal Camera Simulator */}
        {activeTab === 'thermal' && (
          <ThermalInspectionSimulator
            onBookInspection={() => onSelectProblemForBooking('profukovani')}
          />
        )}

        {/* TAB 2: Window Anatomy & Hardware Diagnostics */}
        {activeTab === 'anatomy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Visual Frame */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
              <div className="text-xs font-bold text-slate-600 mb-3 flex items-center justify-between">
                <span>Klikněte na konstrukční bod pro diagnostiku:</span>
                <button
                  type="button"
                  onClick={() => setAnatomyThermalMode(!anatomyThermalMode)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    anatomyThermalMode
                      ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{anatomyThermalMode ? 'Tepelné tóny: ZAPNUTO' : 'Tepelné tóny: VYPNUTO'}</span>
                </button>
              </div>

              {/* Vector Window Anatomy with Thermal Transition Overlays */}
              <div className="relative aspect-[4/3] w-full max-w-md mx-auto bg-slate-100/80 rounded-2xl border border-slate-200 p-4 flex items-center justify-center shadow-inner overflow-hidden">
                
                {/* WARM THERMAL LAYER (PO SERVISU - ORANŽOVÉ TÓNY) */}
                {anatomyThermalMode && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out bg-gradient-to-br from-amber-500/35 via-orange-500/25 to-amber-600/30"
                    style={{ opacity: (100 - anatomySlider) / 100 }}
                  >
                    <div className="absolute inset-x-8 inset-y-8 rounded-xl border-2 border-amber-400/50" />
                    <div className="absolute top-3 right-3 bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                      PO SERVISU (21.0 °C)
                    </div>
                  </div>
                )}

                {/* COLD THERMAL LAYER (PŘED SERVISEM - MODRÉ/STUDENÉ TÓNY) */}
                {anatomyThermalMode && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-cyan-800/40"
                    style={{ opacity: anatomySlider / 100 }}
                  >
                    {/* Cold draft leakage plumes at bottom and corner */}
                    <div className="absolute bottom-2 inset-x-6 h-14 bg-cyan-400/40 blur-lg rounded-full" />
                    <div className="absolute top-8 left-6 w-16 h-16 bg-blue-500/40 blur-md rounded-full" />
                    <div className="absolute top-3 left-3 bg-red-950/80 text-red-300 px-2 py-0.5 rounded text-[10px] font-bold">
                      PŘED SERVISEM (6.2 °C ÚNIK)
                    </div>
                  </div>
                )}

                <svg
                  viewBox="0 0 320 380"
                  className="w-full h-full max-h-[320px] drop-shadow-sm select-none relative z-10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="15" y="15" width="290" height="350" rx="8" stroke="#94a3b8" strokeWidth="6" fill={anatomyThermalMode ? 'transparent' : '#f8fafc'} />
                  <rect x="35" y="35" width="250" height="310" rx="4" stroke="#475569" strokeWidth="8" fill={anatomyThermalMode ? 'rgba(255,255,255,0.2)' : '#e2e8f0'} />
                  <rect x="52" y="52" width="216" height="276" rx="2" stroke="#334155" strokeWidth="6" fill={anatomyThermalMode ? 'rgba(255,255,255,0.3)' : '#f1f5f9'} />
                  {/* Glass reflections */}
                  <path d="M70 70L170 230" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />
                  {/* Handle */}
                  <rect x="248" y="170" width="8" height="26" rx="2" fill="#0891b2" />
                  {/* Hinges */}
                  <rect x="44" y="280" width="12" height="28" rx="2" fill="#64748b" />
                  <rect x="44" y="60" width="12" height="24" rx="2" fill="#64748b" />
                </svg>

                {/* Hotspot buttons */}
                {DIAGNOSTIC_HOTSPOTS.map((spot, idx) => {
                  const isActive = activeHotspot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveHotspot(spot)}
                      style={{ top: spot.position.top, left: spot.position.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs transition-all z-20 cursor-pointer ${
                        isActive
                          ? 'bg-cyan-600 text-white scale-125 ring-4 ring-cyan-200 shadow-lg'
                          : 'bg-white text-slate-800 border-2 border-cyan-600 shadow-xs hover:scale-110'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Anatomy Thermal Transition Slider */}
              {anatomyThermalMode && (
                <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-amber-700">Po servisu (Teplé)</span>
                    <span className="text-slate-600 font-mono text-[11px]">
                      Tepelný přechod: {anatomySlider}%
                    </span>
                    <span className="text-blue-700">Před servisem (Studené)</span>
                  </div>
                  
                  <div className="relative flex items-center">
                    <div className="absolute inset-x-0 h-2.5 rounded-full bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 opacity-90 pointer-events-none" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={anatomySlider}
                      onChange={(e) => setAnatomySlider(parseInt(e.target.value))}
                      className="relative w-full h-6 opacity-0 cursor-pointer z-10"
                      aria-label="Posuvník tepelného přechodu konstrukce"
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-slate-900 shadow pointer-events-none"
                      style={{ left: `${anatomySlider}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Hotspot tags selector */}
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                {DIAGNOSTIC_HOTSPOTS.map((spot, idx) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot(spot)}
                    className={`px-3 py-1.5 text-xs rounded-xl border transition-colors cursor-pointer ${
                      activeHotspot.id === spot.id
                        ? 'bg-slate-900 border-slate-900 text-white font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-cyan-500 font-mono mr-1">{idx + 1}.</span>
                    <span>{spot.title.split(' ')[0]} {spot.title.split(' ')[1] || ''}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnosis Detail Panel */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-700">
                <Wrench className="w-3.5 h-3.5 text-cyan-600" />
                <span>Detail konstrukčního bodu</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{activeHotspot.title}</h3>

              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Jak se projevuje závada:</span>
                </div>
                <p className="text-amber-950/90 leading-relaxed">{activeHotspot.symptom}</p>
              </div>

              <div className="p-3.5 bg-cyan-50/80 rounded-2xl border border-cyan-200/80 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-cyan-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-cyan-700" />
                  <span>Jak to Reno okna vyřeší:</span>
                </div>
                <p className="text-cyan-950 leading-relaxed">{activeHotspot.solution}</p>
              </div>

              <div className="text-xs text-slate-600 pt-1">
                <strong>Při bezplatné kontrole:</strong> {activeHotspot.inspectionFocus}
              </div>

              <button
                type="button"
                onClick={() => onSelectProblemForBooking(activeHotspot.id)}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Objednat kontrolu tohoto bodu (0 Kč)</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Instant Heating Savings Calculator */}
        {activeTab === 'savings' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Controls */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-800">
                      Počet oken a balkónových dveří:
                    </label>
                    <span className="text-lg font-black text-cyan-700 font-mono">{windowCount} ks</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={windowCount}
                    onChange={(e) => setWindowCount(parseInt(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>2 okna</span>
                    <span>10 oken</span>
                    <span>25 oken</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    Způsob vytápění objektu:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['plyn', 'elektrina', 'teplarna'] as const).map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setHeatingType(type)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          heatingType === type
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {heatingRates[type].name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed">
                  Výpočet vychází z průměrných tepelných ztrát netěsnících oken dle ČSN EN 12207 při běžné topné sezóně na Moravě.
                </div>
              </div>

              {/* Output Display */}
              <div className="md:col-span-5 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Odhadovaná roční úspora
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
                  {estimatedSavings.toLocaleString('cs-CZ')} Kč
                </div>
                <div className="text-[11px] text-emerald-900/80 leading-relaxed">
                  Ušetříte každou topnou sezónu po odborném seřízení přítlaku a výměně těsnění.
                </div>
                <button
                  type="button"
                  onClick={() => onSelectProblemForBooking('profukovani')}
                  className="w-full py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Chci ušetřit na vytápění
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
