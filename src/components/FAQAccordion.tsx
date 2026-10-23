import React, { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const buttonId = `faq-btn-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-[#F28A08] bg-white dark:bg-[#1E1B18] shadow-xs'
                : 'border-[#EDE5D9] dark:border-[#38332E] bg-white/60 dark:bg-[#1E1B18]/60 hover:bg-white dark:hover:bg-[#1E1B18]'
            }`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F28A08]"
              >
                <span className="font-['Lexend'] text-lg sm:text-xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF]">
                  <span className="text-[#F28A08] font-normal mr-3">
                    0{index + 1}.
                  </span>
                  {item.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? 'bg-[#F28A08] text-white rotate-180'
                      : 'bg-[#EDE5D9]/60 dark:bg-[#38332E] text-[#706A63] dark:text-[#A8A199]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-[#706A63] dark:text-[#A8A199] ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};
