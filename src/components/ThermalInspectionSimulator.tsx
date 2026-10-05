import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowLeftRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Thermometer,
  Eye,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Layers,
  Wind,
  ShieldCheck,
  Calendar,
  Volume2,
  VolumeX,
  Crosshair,
  TrendingDown
} from 'lucide-react';

interface ThermalInspectionSimulatorProps {
  onBookInspection: () => void;
}

export const ThermalInspectionSimulator: React.FC<ThermalInspectionSimulatorProps> = ({
  onBookInspection,
}) => {
  // Slider position: 0% (Po servisu - 100% teplé/oranžové) to 100% (Před servisem - 100% studené/modré)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  
  // Transition display mode: 'curtain' (dělicí opona s neonovým řezem) | 'blend' (plynulé prolínání barev)
  const [transitionMode, setTransitionMode] = useState<'curtain' | 'blend'>('curtain');
  
  // Auto-play animation state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const animDirection = useRef<'down' | 'up'>('down');

  // Palette: 'ironbow' | 'rainbow' | 'whitehot'
  const [palette, setPalette] = useState<'ironbow' | 'rainbow' | 'whitehot'>('ironbow');
  
  // Outdoor weather scenario: -10 °C, -5 °C, +2 °C
  const [outdoorTemp, setOutdoorTemp] = useState<number>(-5);
  
  // Cursor tracking for live thermal spot meter
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  // Selected leak point for modal breakdown
  const [selectedLeakPoint, setSelectedLeakPoint] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Critical leak points on the unserviced window
  const leakPoints = [
    {
      id: 1,
      x: 24, // percentage
      y: 78,
      title: 'Spodní roh křídla a parapet',
      tempBefore: 4.8 + (outdoorTemp + 5) * 0.4,
      tempAfter: 20.8,
      issue: 'Zteřelé obvodové těsnění a nedostatečný přítlak kování.',
      consequence: 'Průvan u parapetu, chlad od podlahy, riziko tvorby plísní pod rosným bodem.',
      renoFix: 'Výměna za pryžové EPDM těsnění s dutinkou + seřízení spodního pantu.',
    },
    {
      id: 2,
      x: 76,
      y: 45,
      title: 'Zavírací hrana u kliky',
      tempBefore: 7.2 + (outdoorTemp + 5) * 0.3,
      tempAfter: 21.2,
      issue: 'Vyjmutý nebo netlačící excentrický čep převodovky.',
      consequence: 'Křídlo nedoléhá k rámu, uniká teplý vzduch pod stropem, hluk z ulice.',
      renoFix: 'Přestavení čepů na zimní přítlak + promazání vodících drážek.',
    },
    {
      id: 3,
      x: 26,
      y: 20,
      title: 'Horní rohový pant (nůžky)',
      tempBefore: 6.4 + (outdoorTemp + 5) * 0.35,
      tempAfter: 20.9,
      issue: 'Prověšení těžkého křídla vlastní vahou po letech provozu.',
      consequence: 'Mezera v horním rohu křídla, profukování při větru, ztížené vyklápění.',
      renoFix: 'Výškové a stranové docentrování nůžkového ložiska imbusovým klíčem.',
    },
    {
      id: 4,
      x: 50,
      y: 84,
      title: 'Středové doléhání prahu',
      tempBefore: 5.6 + (outdoorTemp + 5) * 0.4,
      tempAfter: 21.0,
      issue: 'Prohnutí PVC profilu vlivem slunečního záření a mrazu.',
      consequence: 'Ztráta až 22 % tepla místnosti, kondenzace vody na skle.',
      renoFix: 'Instalace přídavného středového přítlaku a kalibrace dorazu.',
    },
  ];

  // Dynamic values calculated from slider position
  const coldRatio = sliderPosition / 100; // 1 = 100% cold, 0 = 100% warm
  const warmRatio = 1 - coldRatio;
  
  // Interpolated average frame temperature
  const interpolatedFrameTemp = (4.8 + warmRatio * 16.2).toFixed(1);
  // Interpolated heat loss percentage
  const interpolatedLossPercent = Math.round(coldRatio * 25);
  // Interpolated annual cost loss in CZK
  const interpolatedLossCzk = Math.round(coldRatio * 4200);

  // Smooth auto-play loop using requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    let lastTime = performance.now();
    const speed = 0.04; // percent per ms

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      setSliderPosition((prev) => {
        let next = prev;
        if (animDirection.current === 'down') {
          next = prev - delta * speed;
          if (next <= 5) {
            next = 5;
            animDirection.current = 'up';
          }
        } else {
          next = prev + delta * speed;
          if (next >= 95) {
            next = 95;
            animDirection.current = 'down';
          }
        }
        return Math.round(next * 10) / 10;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  // Pointer tracking for reticle spot meter
  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const xPercent = Math.round((x / rect.width) * 100);
    const yPercent = Math.round((y / rect.height) * 100);

    setCursorPos({ x: xPercent, y: yPercent, active: true });

    if (isDragging.current && transitionMode === 'curtain') {
      setIsPlaying(false);
      setSliderPosition(xPercent);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Temperature calculation at cursor
  const calculateTemperatureAtCursor = (xPercent: number, yPercent: number) => {
    // If curtain mode: check whether cursor is on cold side (x <= sliderPosition)
    const isColdArea = transitionMode === 'curtain' 
      ? xPercent <= sliderPosition 
      : Math.random() < coldRatio;

    if (!isColdArea && transitionMode === 'curtain') {
      return (21.0 + Math.sin(xPercent * 0.05) * 0.4).toFixed(1);
    }

    // In blend mode: interpolate based on coldRatio
    const distToBottom = Math.abs(yPercent - 82);
    const distToEdge = Math.min(Math.abs(xPercent - 22), Math.abs(xPercent - 78), Math.abs(yPercent - 18), distToBottom);
    
    let baseCold = 5.2 + (outdoorTemp + 5) * 0.5;
    if (distToEdge < 10) {
      baseCold = baseCold + distToEdge * 0.9;
    } else {
      baseCold = 15.5;
    }

    if (transitionMode === 'curtain') {
      return baseCold.toFixed(1);
    } else {
      const blended = baseCold * coldRatio + 21.0 * warmRatio;
      return blended.toFixed(1);
    }
  };

  const currentHoverTemp = calculateTemperatureAtCursor(cursorPos.x, cursorPos.y);
  const isColdDraftZone = parseFloat(currentHoverTemp) < 12.0;

  // Active palette styles
  const paletteStyles = {
    ironbow: {
      coldBg: 'from-blue-950 via-indigo-900 to-purple-950',
      warmBg: 'from-amber-600 via-orange-500 to-amber-700',
      track: 'from-blue-600 via-purple-600 via-orange-500 to-amber-500',
      scale: 'bg-gradient-to-t from-blue-900 via-purple-700 via-orange-500 to-yellow-300',
    },
    rainbow: {
      coldBg: 'from-cyan-950 via-blue-900 to-teal-950',
      warmBg: 'from-emerald-600 via-yellow-500 to-red-600',
      track: 'from-cyan-500 via-blue-600 via-yellow-500 to-red-500',
      scale: 'bg-gradient-to-t from-blue-900 via-cyan-500 via-green-500 via-yellow-400 to-red-500',
    },
    whitehot: {
      coldBg: 'from-black via-neutral-900 to-slate-900',
      warmBg: 'from-neutral-300 via-white to-neutral-200',
      track: 'from-neutral-900 via-neutral-500 to-white',
      scale: 'bg-gradient-to-t from-black via-neutral-600 via-neutral-300 to-white',
    },
  };

  return (
    <div className="space-y-6">
      
      {/* Top Camera Header & Mode Controller */}
      <div className="bg-slate-900 text-slate-200 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Live FLIR Camera HUD telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider text-white">
              FLIR IR-CAM PRO · VIZUÁLNÍ PŘECHOD
            </span>
          </div>
          <span className="hidden sm:inline-block w-px h-4 bg-slate-700" />
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>ε: 0.94 (PVC/Sklo)</span>
            <span className="text-cyan-400">Venku: {outdoorTemp} °C</span>
            <span className="text-amber-400">Interiér: 21.0 °C</span>
          </div>
        </div>

        {/* Center: Transition Type (Curtain vs Smooth Blend) */}
        <div className="inline-flex p-1 bg-slate-800 rounded-xl border border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => setTransitionMode('curtain')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              transitionMode === 'curtain'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Dělicí opona s posuvnou hranou"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Dělicí opona (Split)</span>
          </button>
          
          <button
            type="button"
            onClick={() => setTransitionMode('blend')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              transitionMode === 'blend'
                ? 'bg-gradient-to-r from-cyan-600 to-amber-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Plynulé barevné prolínání modrá -> oranžová"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plynulé prolínání (Fade)</span>
          </button>
        </div>

        {/* Right: Auto-play and Weather presets */}
        <div className="flex items-center gap-2 text-xs">
          {/* Auto-play button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30 animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
            title={isPlaying ? 'Pozastavit animaci přechodu' : 'Přehrát plynulou animaci přechodu'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pauza' : 'Animovat přechod'}</span>
          </button>

          {/* Palette selector */}
          <select
            value={palette}
            onChange={(e) => setPalette(e.target.value as any)}
            className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
          >
            <option value="ironbow">Ironbow</option>
            <option value="rainbow">Rainbow HC</option>
            <option value="whitehot">White Hot</option>
          </select>
        </div>

      </div>

      {/* Main Thermal Viewfinder Stage */}
      <div className="relative max-w-5xl mx-auto">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseEnter={() => setCursorPos((p) => ({ ...p, active: true }))}
          onMouseLeave={() => {
            isDragging.current = false;
            setCursorPos((p) => ({ ...p, active: false }));
          }}
          onMouseDown={(e) => {
            if (transitionMode === 'curtain') {
              isDragging.current = true;
              handlePointerMove(e.clientX, e.clientY);
            }
          }}
          onMouseUp={() => {
            isDragging.current = false;
          }}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 select-none cursor-crosshair bg-slate-950"
        >

          {/* LAYER 1: BASE (PO SERVISU - TEPLÉ ORANŽOVO-ZLATÉ TÓNY) */}
          <div className={`absolute inset-0 bg-gradient-to-br ${paletteStyles[palette].warmBg} flex flex-col justify-between p-6 sm:p-8 text-white transition-colors duration-300`}>
            
            {/* Architectural Window Thermal Render - WARM & SEALED */}
            <div className="absolute inset-0 p-8 sm:p-12 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 600 450" className="w-full h-full drop-shadow-2xl" fill="none">
                {/* Wall reveal warm ambient */}
                <rect x="20" y="20" width="560" height="410" rx="12" fill="rgba(251,146,60,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                
                {/* Outer frame - warm 20.8 °C */}
                <rect x="50" y="50" width="500" height="350" rx="8" fill="rgba(234,88,12,0.4)" stroke="rgba(254,215,170,0.5)" strokeWidth="8" />
                
                {/* Movable sash frame - perfectly insulated */}
                <rect x="75" y="75" width="450" height="300" rx="4" fill="rgba(249,115,22,0.35)" stroke="rgba(253,186,116,0.6)" strokeWidth="6" />
                
                {/* Insulated glass - uniform warm surface */}
                <rect x="95" y="95" width="410" height="260" rx="2" fill="rgba(251,191,36,0.3)" stroke="rgba(254,240,138,0.4)" strokeWidth="2" />
                
                {/* Glass reflection beam */}
                <path d="M120 120L320 340" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeDasharray="10 10" />
                <path d="M160 120L360 340" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="10 10" />

                {/* Airtight rubber gasket seal in glowing warm gold */}
                <rect x="70" y="70" width="460" height="310" rx="6" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.85" />
              </svg>
            </div>

            {/* Badge Top Right */}
            <div className="self-end z-10 flex items-center gap-2 bg-emerald-950/85 backdrop-blur-md border border-emerald-400/50 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>STAV PO SERVISU RENO OKNA</span>
            </div>

            {/* Telemetry info bottom right */}
            <div className="self-end z-10 bg-black/75 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 text-xs space-y-1.5 max-w-xs shadow-2xl">
              <div className="flex justify-between font-mono text-[11px] text-amber-300">
                <span>PRŮMĚRNÁ TEPLOTA:</span>
                <strong className="text-white text-sm">21.2 °C</strong>
              </div>
              <div className="flex justify-between font-mono text-[11px] text-emerald-400 font-bold">
                <span>TEPELNÁ ZTRÁTA:</span>
                <span>0 % (DOKONALÝ PŘÍTLAK)</span>
              </div>
              <div className="flex justify-between font-mono text-[11px] text-slate-300">
                <span>TLUMENÍ ZVUKU:</span>
                <span>-38 dB (BEZ PRŮVANU)</span>
              </div>
            </div>

          </div>

          {/* LAYER 2: OVERLAY (PŘED SERVISEM - MODRÉ/STUDENÉ TÓNY S PLYNULÝM PŘECHODEM) */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${paletteStyles[palette].coldBg} flex flex-col justify-between p-6 sm:p-8 text-white ${
              isPlaying ? 'transition-all duration-75 ease-linear' : 'transition-opacity duration-300'
            }`}
            style={{
              // In curtain mode: use CSS clip-path to slice smoothly without distorting the SVG geometry
              // In blend mode: use CSS opacity transition
              clipPath: transitionMode === 'curtain' ? `inset(0 ${100 - sliderPosition}% 0 0)` : undefined,
              WebkitClipPath: transitionMode === 'curtain' ? `inset(0 ${100 - sliderPosition}% 0 0)` : undefined,
              opacity: transitionMode === 'blend' ? sliderPosition / 100 : 1,
            }}
          >
            {/* Architectural Window Thermal Render - COLD DRAFT PLUMES */}
            <div className="absolute inset-0 p-8 sm:p-12 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 600 450" className="w-full h-full drop-shadow-2xl" fill="none">
                {/* Wall reveal - cold perimeter */}
                <rect x="20" y="20" width="560" height="410" rx="12" fill="rgba(15,23,42,0.6)" stroke="rgba(56,189,248,0.3)" strokeWidth="3" />
                
                {/* Outer frame - uninsulated cold bridge */}
                <rect x="50" y="50" width="500" height="350" rx="8" fill="rgba(30,58,138,0.5)" stroke="rgba(96,165,250,0.4)" strokeWidth="8" />
                
                {/* Sash frame - misaligned & sagging */}
                <rect x="75" y="77" width="450" height="300" rx="4" fill="rgba(30,27,75,0.7)" stroke="rgba(147,197,253,0.3)" strokeWidth="6" />
                
                {/* Glass pane - cold glass core */}
                <rect x="95" y="97" width="410" height="260" rx="2" fill="rgba(17,24,39,0.5)" stroke="rgba(125,211,252,0.2)" strokeWidth="2" />

                {/* Severe Cold Plume 1: Bottom edge & Sill - deep blue & freezing cyan */}
                <ellipse cx="250" cy="380" rx="180" ry="40" fill="url(#coldLeakGradient2)" opacity="0.9" />
                <ellipse cx="400" cy="380" rx="120" ry="30" fill="url(#coldLeakGradient2)" opacity="0.8" />

                {/* Severe Cold Plume 2: Left lower corner */}
                <circle cx="85" cy="360" r="60" fill="url(#cornerFreezeGradient2)" opacity="0.95" />

                {/* Severe Cold Plume 3: Right sash edge */}
                <ellipse cx="525" cy="220" rx="25" ry="120" fill="url(#camLeakGradient2)" opacity="0.9" />

                {/* Severe Cold Plume 4: Top hinge */}
                <circle cx="85" cy="85" r="50" fill="url(#cornerFreezeGradient2)" opacity="0.85" />

                {/* Draft Wind Flow Streaks */}
                <path d="M70 380 Q 150 360, 220 375" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.8" />
                <path d="M300 385 Q 380 365, 460 380" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.8" />
                <path d="M525 180 Q 510 240, 520 290" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />

                {/* Gradient Definitions */}
                <defs>
                  <radialGradient id="coldLeakGradient2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#1e3a8a" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#172554" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="cornerFreezeGradient2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#1e40af" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="camLeakGradient2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#1d4ed8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#030712" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Badge Top Left */}
            <div className="self-start z-10 flex items-center gap-2 bg-red-950/90 backdrop-blur-md border border-red-500/50 text-red-300 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xl whitespace-nowrap">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>PŘED SERVISEM (MASIVNÍ ÚNIKY TEPLA)</span>
            </div>

            {/* Telemetry info bottom left */}
            <div className="self-start z-10 bg-black/85 backdrop-blur-md border border-red-500/30 rounded-2xl p-4 text-xs space-y-1.5 max-w-xs shadow-2xl whitespace-nowrap">
              <div className="flex justify-between gap-4 font-mono text-[11px] text-cyan-300">
                <span>TEPLOTA U RÁMU:</span>
                <strong className="text-white text-sm">
                  {(4.8 + (outdoorTemp + 5) * 0.4).toFixed(1)} °C
                </strong>
              </div>
              <div className="flex justify-between gap-4 font-mono text-[11px] text-red-400 font-bold">
                <span>ÚNIK TEPLA:</span>
                <span>AŽ 25 % NÁKLADŮ V ZIMĚ</span>
              </div>
              <div className="flex justify-between gap-4 font-mono text-[11px] text-amber-400">
                <span>KONDENZACE / ROSNÝ BOD:</span>
                <span>RIZIKO PLÍSNÍ U PARAPETU</span>
              </div>
            </div>

          </div>

          {/* LAYER 3: CLICKABLE LEAK HOTSPOTS */}
          <div className="absolute inset-0 pointer-events-auto">
            {leakPoints.map((point) => {
              const isSelected = selectedLeakPoint === point.id;
              const isVisible = transitionMode === 'blend' 
                ? sliderPosition >= 20
                : point.x <= sliderPosition + 5;
              if (!isVisible) return null;

              return (
                <button
                  key={point.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLeakPoint(isSelected ? null : point.id);
                  }}
                  style={{ top: `${point.y}%`, left: `${point.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-30 transition-transform cursor-pointer ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                  title={`${point.title}: Klikněte pro diagnostiku`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-7 w-7 bg-red-600 text-white font-black text-xs items-center justify-center border-2 border-white shadow-lg">
                      !
                    </span>
                  </span>
                  
                  {/* Floating Micro Tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden sm:group-hover:flex items-center gap-1.5 px-2.5 py-1 bg-black/90 backdrop-blur-md text-white text-[11px] rounded-lg whitespace-nowrap shadow-xl border border-white/20">
                    <span className="text-red-400 font-bold">{point.tempBefore.toFixed(1)} °C</span>
                    <span>· {point.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* LAYER 4: LIVE TARGETING RETICLE */}
          {cursorPos.active && (
            <div
              className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2 transition-opacity"
              style={{ top: `${cursorPos.y}%`, left: `${cursorPos.x}%` }}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border border-white/70 rounded-full" />
                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
                <div className="w-full h-px bg-white/40 absolute" />
                <div className="h-full w-px bg-white/40 absolute" />
              </div>

              <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 bg-black/90 backdrop-blur-md border border-white/30 rounded-xl px-2.5 py-1.5 shadow-2xl whitespace-nowrap text-left">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white">
                  <span className={`w-2 h-2 rounded-full ${isColdDraftZone ? 'bg-cyan-400 animate-ping' : 'bg-amber-400'}`} />
                  <span>Sp1: {currentHoverTemp} °C</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-300">
                  {isColdDraftZone ? (
                    <span className="text-cyan-300">Zóna chladného průvanu</span>
                  ) : (
                    <span className="text-emerald-300">Utěsněno Reno okna</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LAYER 5: CURTAIN MODE GLOWING TRANSITION DIVIDER LINE */}
          {transitionMode === 'curtain' && (
            <div
              className={`absolute inset-y-0 w-1 bg-white cursor-ew-resize z-40 flex items-center justify-center shadow-[0_0_20px_#06b6d4,0_0_10px_#f97316] ${
                isPlaying ? 'transition-all duration-75 ease-linear' : ''
              }`}
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Neon border edge halo */}
              <div className="absolute inset-y-0 -left-1 w-2 bg-cyan-400/40 blur-xs pointer-events-none" />
              <div className="absolute inset-y-0 -right-1 w-2 bg-amber-400/40 blur-xs pointer-events-none" />

              {/* Draggable knob */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 -ml-0.5 bg-white text-slate-900 rounded-full shadow-2xl flex items-center justify-center border-2 border-cyan-500 transition-transform hover:scale-110 active:scale-95 cursor-grab">
                <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-700" />
              </div>
            </div>
          )}

          {/* LAYER 6: THERMOGRAPHIC COLOR TEMPERATURE SCALE */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl">
            <span className="text-[10px] font-mono font-bold text-yellow-300 mb-1">+23°C</span>
            <div className={`w-3.5 h-36 rounded-md ${paletteStyles[palette].scale} shadow-inner relative`}>
              {cursorPos.active && (
                <div
                  className="absolute right-0 translate-x-full w-2 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-white"
                  style={{
                    top: `${Math.max(0, Math.min(100, 100 - ((parseFloat(currentHoverTemp) + 5) / 28) * 100))}%`,
                  }}
                />
              )}
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 mt-1">-5°C</span>
          </div>

        </div>
      </div>

      {/* DEDICATED FLUID SLIDER CONTROL BAR (VYLEPŠENÝ POSUVNÍK PŘECHODU) */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-md space-y-4">
        
        {/* Header of Slider Control with Real-time Output */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Plynulý posuvník přechodu:
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                sliderPosition > 60
                  ? 'bg-blue-100 text-blue-800'
                  : sliderPosition > 30
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {sliderPosition > 70
                  ? 'Před servisem (úniky)'
                  : sliderPosition > 30
                  ? 'Částečné seřízení'
                  : 'Po servisu (dokonale utěsněno)'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Posunutím jezdce plynule měníte stav z modrých studených tónů do hřejivých oranžových tónů.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-sans">Teplota rámu</span>
              <strong className="text-slate-900 text-sm font-bold">{interpolatedFrameTemp} °C</strong>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-sans">Tepelná ztráta</span>
              <strong className={sliderPosition > 30 ? 'text-red-600 text-sm font-bold' : 'text-emerald-600 text-sm font-bold'}>
                {interpolatedLossPercent} %
              </strong>
            </div>
          </div>
        </div>

        {/* The Range Input Slider with Multi-color Gradient Track */}
        <div className="space-y-2">
          <div className="relative flex items-center">
            {/* Custom Track Background */}
            <div className="absolute inset-x-0 h-3 rounded-full bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 opacity-90 pointer-events-none shadow-inner" />
            
            <input
              type="range"
              min="0"
              max="100"
              step="0.5"
              value={sliderPosition}
              onChange={(e) => {
                setIsPlaying(false);
                setSliderPosition(parseFloat(e.target.value));
              }}
              className="relative w-full h-8 opacity-0 cursor-pointer z-10"
              aria-label="Posuvník tepelného přechodu"
            />

            {/* Visual Custom Thumb Indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-3 border-slate-900 shadow-lg pointer-events-none transition-transform hover:scale-110 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-2 h-2 rounded-full bg-cyan-600" />
            </div>
          </div>

          {/* Track Labels & Presets */}
          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600 pt-1">
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setSliderPosition(0);
              }}
              className="hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>0% Po servisu (Teplé tóny)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setSliderPosition(50);
              }}
              className="hover:text-purple-600 transition-colors px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 cursor-pointer"
            >
              50% Srovnání
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setSliderPosition(100);
              }}
              className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>100% Před servisem (Studené tóny)</span>
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            </button>
          </div>
        </div>

        {/* Quick Action Bar under Slider */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>
              <strong>Efekt servisu Reno okna:</strong> Odstranění úniku tepla v hodnotě až{' '}
              <strong className="text-emerald-700 font-mono">4 200 Kč / sezónu</strong>.
            </span>
          </div>

          <button
            type="button"
            onClick={onBookInspection}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
          >
            Rezervovat bezplatnou termovizi (0 Kč)
          </button>
        </div>

      </div>

      {/* SELECTED LEAK POINT BREAKDOWN (IF USER CLICKS ANY OF THE 4 WARNING PINS) */}
      {selectedLeakPoint && (
        (() => {
          const point = leakPoints.find((p) => p.id === selectedLeakPoint);
          if (!point) return null;
          return (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-red-500/40 p-6 sm:p-7 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-lg">
                    !
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                      Zjištěná tepelná závada
                    </span>
                    <h4 className="text-xl font-bold text-slate-900">{point.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 font-mono">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 block">PŘED SERVISEM</span>
                    <span className="text-base font-bold text-red-600">{point.tempBefore.toFixed(1)} °C</span>
                  </div>
                  <ArrowLeftRight className="w-4 h-4 text-slate-400" />
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 block">PO SEŘÍZENÍ</span>
                    <span className="text-base font-bold text-emerald-600">{point.tempAfter.toFixed(1)} °C</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <strong className="text-slate-900 block mb-1">Příčina závady:</strong>
                  <span className="text-slate-600">{point.issue}</span>
                </div>
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
                  <strong className="text-amber-950 block mb-1">Důsledek pro dům:</strong>
                  <span className="text-amber-900/90">{point.consequence}</span>
                </div>
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <strong className="text-emerald-950 block mb-1">Řešení Reno okna:</strong>
                  <span className="text-emerald-900/90">{point.renoFix}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  Bezplatná termovizní kontrola odhalí tyto skryté mezerky během 15 minut.
                </span>
                <button
                  type="button"
                  onClick={onBookInspection}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Objednat kontrolu tohoto bodu zdarma (0 Kč)
                </button>
              </div>
            </div>
          );
        })()
      )}

      {/* Direct Callout Banner */}
      <div className="max-w-4xl mx-auto p-6 sm:p-7 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Bezplatné měření u vás doma</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold">
            Chcete vidět reálný termogram vašich oken?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
            Náš technik přijede s kalibrovanou termokamerou a na displeji vám přímo ukáže, kde vaše okna ztrácí teplo a proč táhne od parapetu. Vše nezávazně a zdarma (0 Kč).
          </p>
        </div>
        <button
          type="button"
          onClick={onBookInspection}
          className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 active:scale-98 rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Calendar className="w-4 h-4 text-cyan-600" />
          <span>Rezervovat termovizi zdarma</span>
        </button>
      </div>

    </div>
  );
};
