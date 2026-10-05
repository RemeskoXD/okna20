import React, { useState } from 'react';
import { FAQS } from '../data/serviceData';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-22 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-cyan-600" />
            <span>Vše, co potřebujete vědět</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Často kladené otázky k servisu oken
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Máte otázku ohledně průběhu kontroly nebo cen? Zde najdete přímé odpovědi.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Phone Assistance Banner */}
        <div className="mt-12 p-6 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">Nenašli jste odpověď na svůj dotaz?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Náš servisní dispečink je vám k dispozici od pondělí do soboty.
            </p>
          </div>
          <a
            href="tel:+420770456890"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors whitespace-nowrap shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Zavolat dispečink 770 456 890</span>
          </a>
        </div>

      </div>
    </section>
  );
};
