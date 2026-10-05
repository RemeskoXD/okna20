import React from 'react';
import { BookingSubmission } from '../types';
import { CheckCircle2, Calendar, MapPin, Phone, Download, X, ShieldCheck, Sparkles } from 'lucide-react';

interface BookingSuccessModalProps {
  booking: BookingSubmission | null;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const downloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Reno okna//Servis oken Morava//CS',
      'BEGIN:VEVENT',
      `SUMMARY:Kontrola oken zdarma - Reno okna (${booking.id})`,
      `DESCRIPTION:Bezplatná kontrola oken a diagnostika těsnosti technikem Reno okna pro adresu ${booking.address}, ${booking.city}. Telefon servisu: +420 770 456 890.`,
      `LOCATION:${booking.address}, ${booking.city}`,
      `DTSTART:${booking.preferredDate.replace(/-/g, '')}T090000Z`,
      `DTEND:${booking.preferredDate.replace(/-/g, '')}T103000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reno-okna-termin-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close icon */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          aria-label="Zavřít"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-14 h-14 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Title */}
        <div className="space-y-1 mb-6">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
            Rezervace byla úspěšně přijata
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Těšíme se na vás!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Děkujeme, pane/paní <strong className="text-slate-900">{booking.fullName}</strong>. Váš požadavek na bezplatnou kontrolu oken jsme zařadili do plánu servisní trasy.
          </p>
        </div>

        {/* Reference details box */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 text-xs mb-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Kód rezervace:</span>
            <span className="text-cyan-700 font-mono font-bold text-sm">{booking.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div>
              <span className="text-slate-500 block text-[11px]">Plánovaný termín:</span>
              <strong className="text-slate-900 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                {booking.preferredDate} ({booking.preferredTimeSlot})
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Místo kontroly:</span>
              <strong className="text-slate-900 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                {booking.city}
              </strong>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-slate-600 flex items-center justify-between">
            <span>Cena za výjezd a diagnostiku:</span>
            <span className="text-emerald-700 font-bold text-sm font-mono">0 Kč (ZDARMA)</span>
          </div>
        </div>

        {/* Simulated Notification Notice */}
        <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200 text-xs text-slate-700 flex items-start gap-2.5 mb-6">
          <Phone className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block">Potvrzovací SMS odeslána</strong>
            <span>Na číslo {booking.phone} vám byl odeslán souhrn. Náš dispečer vám ještě zavolá pro potvrzení času.</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={downloadIcs}
            className="flex-1 py-3 px-4 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-600" />
            <span>Přidat do kalendáře (.ics)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors flex items-center justify-center cursor-pointer shadow-sm shadow-cyan-600/25"
          >
            <span>Rozumím, pokračovat</span>
          </button>
        </div>

      </div>
    </div>
  );
};
