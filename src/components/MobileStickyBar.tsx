import React from 'react';
import { Phone, Calendar } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center gap-2 shadow-lg">
      <a
        href="tel:+420770456890"
        className="flex-1 py-2.5 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-cyan-600" />
        <span>770 456 890</span>
      </a>

      <button
        type="button"
        onClick={onOpenBooking}
        className="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Kontrola zdarma</span>
      </button>
    </div>
  );
};
