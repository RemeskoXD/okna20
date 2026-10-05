import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  User,
  Home,
  Check,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { BookingSubmission, BookingFormState } from '../types';

interface BookingWizardProps {
  initialCity?: string;
  initialIssue?: string;
  onBookingSuccess: (booking: BookingSubmission) => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialCity = 'Brno',
  initialIssue = 'kontrola-zdarma',
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormState>({
    serviceType: initialIssue,
    windowType: 'plastova',
    windowCount: 6,
    issueDescription: '',
    city: initialCity,
    postalCode: initialCity === 'Brno' ? '60200' : '70200',
    address: '',
    preferredDate: getTomorrowDateString(),
    preferredTimeSlot: 'dopoledne',
    fullName: '',
    phone: '',
    email: '',
    urgency: 'standard',
    agreedToTerms: true,
  });

  function getTomorrowDateString() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  const [validationError, setValidationError] = useState<string | null>(null);

  const defaultZipMap: Record<string, string> = {
    Brno: '60200',
    Ostrava: '70200',
    Olomouc: '77900',
    Zlín: '76001',
    Prostějov: '79601',
    Přerov: '75002',
    Kroměříž: '76701',
    'Uherské Hradiště': '68601',
    Blansko: '67801',
    Břeclav: '69002',
    Hodonín: '69501',
    Vyškov: '68201',
    Znojmo: '66902',
    Opava: '74601',
    'Frýdek-Místek': '73801',
    Havířov: '73601',
    Karviná: '73301',
    'Nový Jičín': '74101',
    Vsetín: '75501',
    'Valašské Meziříčí': '75701',
    Šumperk: '78701',
  };

  const handleCityChange = (newCity: string) => {
    setFormData((prev) => ({
      ...prev,
      city: newCity,
      postalCode: defaultZipMap[newCity] || prev.postalCode,
    }));
  };

  const serviceOptions = [
    {
      id: 'kontrola-zdarma',
      title: 'Bezplatná kontrola oken a seřízení',
      badge: '0 Kč ZDARMA',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      description: 'Kompletní revize kování, těsnění a přítlaku u vás doma.',
    },
    {
      id: 'profukovani',
      title: 'Profukování a výměna těsnění',
      badge: 'Nejžádanější',
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
      description: 'Z oken táhne zima, únik tepla, potřeba nového EPDM těsnění.',
    },
    {
      id: 'drhnuti',
      title: 'Seřízení drhnoucího křídla / pantů',
      badge: 'Běžná oprava',
      badgeColor: 'text-neutral-400 border-neutral-700 bg-neutral-900',
      description: 'Křídlo drhne o spodní rám, dře nebo se těžko zavírá.',
    },
    {
      id: 'klika',
      title: 'Oprava zablokované kliky / kování',
      badge: 'Rychlý servis',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
      description: 'Klika se protáčí, lupe v ní nebo nejde otočit do svislé polohy.',
    },
    {
      id: 'balkon',
      title: 'Servis balkónových a vchodových dveří',
      badge: 'Specialista',
      badgeColor: 'text-neutral-400 border-neutral-700 bg-neutral-900',
      description: 'Prověšení těžkého křídla, seřízení zámku a těsnění prahu.',
    },
  ];

  const windowTypeOptions = [
    { id: 'plastova', label: 'Plastová okna (PVC)' },
    { id: 'drevena', label: 'Dřevěná eurookna' },
    { id: 'hlinikova', label: 'Hliníková okna' },
    { id: 'kombinace', label: 'Kombinace / starší typy' },
  ];

  const moravaCities = [
    'Brno',
    'Ostrava',
    'Olomouc',
    'Zlín',
    'Prostějov',
    'Přerov',
    'Kroměříž',
    'Uherské Hradiště',
    'Blansko',
    'Břeclav',
    'Hodonín',
    'Vyškov',
    'Znojmo',
    'Opava',
    'Frýdek-Místek',
    'Havířov',
    'Karviná',
    'Nový Jičín',
    'Vsetín',
    'Valašské Meziříčí',
    'Šumperk',
  ];

  const timeSlots = [
    { id: 'rano', label: 'Ráno (08:00 – 10:30)', desc: 'Před odchodem do práce' },
    { id: 'dopoledne', label: 'Dopoledne (10:30 – 13:00)', desc: 'Ideální klidný čas' },
    { id: 'odpoledne', label: 'Odpoledne (13:00 – 16:00)', desc: 'Po obědě' },
    { id: 'podvecer', label: 'Podvečer (16:00 – 18:30)', desc: 'Po návratu z práce' },
  ];

  // Quick dates generator (next 7 days)
  const availableDates = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dayName = d.toLocaleDateString('cs-CZ', { weekday: 'short' });
    const formatted = d.toISOString().split('T')[0];
    const displayDate = d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' });
    return {
      iso: formatted,
      dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      displayDate,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    };
  });

  const handleNext = () => {
    setValidationError(null);
    if (step === 1) {
      if (!formData.serviceType) {
        setValidationError('Zvolte prosím, jaký servis nebo kontrolu potřebujete.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.city) {
        setValidationError('Vyberte prosím město na Moravě.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.preferredDate || !formData.preferredTimeSlot) {
        setValidationError('Zvolte prosím preferovaný den a čas.');
        return;
      }
      setStep(4);
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic validation
    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      setValidationError('Vyplňte prosím vaše celé jméno.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setValidationError('Zadejte prosím platné telefonní číslo pro potvrzení termínu.');
      return;
    }
    if (!formData.address.trim()) {
      setValidationError('Vyplňte prosím ulici a číslo popisné, kde se okna nachází.');
      return;
    }

    const newBooking: BookingSubmission = {
      ...formData,
      id: `RENO-MO-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'nová',
    };

    // Save to local storage for local persistence
    try {
      const stored = localStorage.getItem('reno_okna_bookings');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newBooking);
      localStorage.setItem('reno_okna_bookings', JSON.stringify(list));
    } catch {
      // storage unavailable
    }

    onBookingSuccess(newBooking);
  };

  return (
    <section id="kontrola" className="py-14 sm:py-22 bg-slate-100/70 border-y border-slate-200 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>Online rezervace servisu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Objednejte si kontrolu oken zdarma
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Vyplňte 4 jednoduché kroky. Náš dispečer vás obratem kontaktuje pro potvrzení přesného času příjezdu technika po celé Moravě.
          </p>
        </div>

        {/* Step Progress Bar - Zero Pill Clean Tabs */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
          {[
            { num: 1, label: 'Typ servisu' },
            { num: 2, label: 'Lokalita' },
            { num: 3, label: 'Termín' },
            { num: 4, label: 'Kontakt' },
          ].map((s) => {
            const isActive = step === s.num;
            const isCompleted = step > s.num;
            return (
              <div
                key={s.num}
                className={`py-3 px-2 sm:px-4 rounded-xl border text-center transition-all ${
                  isActive
                    ? 'bg-cyan-50 border-cyan-600 text-cyan-950 font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-white border-slate-300 text-cyan-700 font-medium'
                    : 'bg-white/60 border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold">
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-cyan-700" />
                  ) : (
                    <span className="font-mono">{s.num}.</span>
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wizard Card Body */}
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
          
          {validationError && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: Service Type & Windows info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  1. Jakou službu nebo kontrolu potřebujete?
                </h3>
                <p className="text-xs text-slate-500">
                  Vyberte nejvhodnější možnost. Bezplatná vstupní diagnostika je zahrnuta v každé návštěvě.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((opt) => {
                  const isSelected = formData.serviceType === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, serviceType: opt.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-50/70 border-cyan-600 shadow-xs ring-1 ring-cyan-600/30'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-bold text-slate-900">{opt.title}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                          opt.id === 'kontrola-zdarma'
                            ? 'text-emerald-700 border-emerald-300 bg-emerald-50'
                            : 'text-cyan-700 border-cyan-200 bg-cyan-50'
                        }`}>
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Window Type & Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Typ oken ve vašem objektu:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {windowTypeOptions.map((wt) => (
                      <button
                        type="button"
                        key={wt.id}
                        onClick={() => setFormData({ ...formData, windowType: wt.id })}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border text-left truncate transition-colors ${
                          formData.windowType === wt.id
                            ? 'bg-cyan-100/70 border-cyan-600 text-cyan-950 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {wt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Přibližný počet oken / křídel:
                    </label>
                    <span className="text-xs font-bold text-cyan-700 font-mono">
                      {formData.windowCount} {formData.windowCount === 1 ? 'okno' : formData.windowCount < 5 ? 'okna' : 'oken'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={formData.windowCount}
                    onChange={(e) => setFormData({ ...formData, windowCount: parseInt(e.target.value) })}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 okno</span>
                    <span>10 oken</span>
                    <span>25+ oken (bytový dům)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Location on Morava */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  2. Kde na Moravě se okna nachází?
                </h3>
                <p className="text-xs text-slate-500">
                  Naše mobilní týmy pokrývají celou Moravu bez příplatků za ujeté kilometry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="wizard-city" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Město / spádová obec na Moravě:
                  </label>
                  <select
                    id="wizard-city"
                    value={formData.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white"
                  >
                    {moravaCities.map((city) => (
                      <option key={city} value={city}>
                        {city} (a okolní obce)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="wizard-zip" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Poštovní směrovací číslo (PSČ):
                  </label>
                  <input
                    id="wizard-zip"
                    type="text"
                    placeholder="Např. 602 00"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white placeholder:text-slate-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="wizard-address" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ulice a číslo popisné / orientační:
                </label>
                <div className="relative">
                  <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="wizard-address"
                    type="text"
                    placeholder="Např. Masarykova 45/2"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Dopravné po celé Moravě je zdarma.</strong> Neúčtujeme žádné skryté paušály za cestovné ani v odlehlejších obcích.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time slot */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  3. Vyberte si preferovaný termín návštěvy
                </h3>
                <p className="text-xs text-slate-500">
                  Přijedeme v čase, který vám vyhovuje. Čas upřesníme telefonicky.
                </p>
              </div>

              {/* Day selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Dostupné dny pro lokalitu {formData.city}:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = formData.preferredDate === item.iso;
                    return (
                      <button
                        type="button"
                        key={item.iso}
                        onClick={() => setFormData({ ...formData, preferredDate: item.iso })}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-cyan-600 border-cyan-600 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`text-[11px] font-medium ${isSelected ? 'text-cyan-100' : 'text-slate-500'}`}>{item.dayName}</div>
                        <div className="text-sm font-bold mt-0.5">{item.displayDate}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slot selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Časové okno:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.preferredTimeSlot === slot.id;
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        onClick={() => setFormData({ ...formData, preferredTimeSlot: slot.id })}
                        className={`p-3 rounded-xl border text-left transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-cyan-50 border-cyan-600 text-slate-900 font-semibold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{slot.label}</div>
                          <div className="text-[11px] text-slate-500">{slot.desc}</div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-cyan-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Customer Details & Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  4. Kontaktní údaje pro potvrzení
                </h3>
                <p className="text-xs text-slate-500">
                  Na zadaný telefon vám zašleme SMS s potvrzením rezervace a kontaktem na vašeho technika.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="wizard-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Jméno a příjmení: *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="wizard-name"
                      type="text"
                      placeholder="Petr Novák"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="wizard-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Telefonní číslo (pro SMS): *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="wizard-phone"
                      type="tel"
                      placeholder="+420 777 123 456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="wizard-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  E-mail (pro zaslání protokolu kontroly):
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="wizard-email"
                    type="email"
                    placeholder="novak@email.cz"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="wizard-notes" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Upřesňující poznámka pro technika (nepovinné):
                </label>
                <textarea
                  id="wizard-notes"
                  rows={2}
                  placeholder="Např. Okna v 2. patře, zvonek Novákovi, drhne zejména okno v obývacím pokoji..."
                  value={formData.issueDescription}
                  onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Order Summary Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-cyan-600" />
                  <span>Souhrn vaší nezávazné rezervace:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 text-slate-700">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Služba:</span>
                    <strong className="text-slate-900">Kontrola oken</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Místo:</span>
                    <strong className="text-slate-900">{formData.city}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Cena výjezdu:</span>
                    <strong className="text-emerald-700 font-mono">0 Kč (ZDARMA)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Cena kontroly:</span>
                    <strong className="text-emerald-700 font-mono">0 Kč (ZDARMA)</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Zpět</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-xl transition-colors cursor-pointer shadow-sm shadow-cyan-600/20"
              >
                <span>Pokračovat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-600/25"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Závazně potvrdit termín zdarma</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
