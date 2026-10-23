import React from 'react';
import { Button } from '../components/Button';
import { SafeImage } from '../components/SafeImage';
import { foodImages } from '../data/images';

interface CTASectionProps {
  onPlanEvent: () => void;
  onExploreServices: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onPlanEvent,
  onExploreServices,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FFFCF8] dark:bg-[#171513] relative overflow-hidden border-t border-[#EDE5D9] dark:border-[#2E2A26] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-[#24211E] text-white p-8 sm:p-14 lg:p-20 shadow-2xl border border-white/10">
          {/* Subtle background image under dark gradient scrim */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <SafeImage
              src={foodImages.hero.spread}
              alt="Perry Foods catering spread"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#24211E] via-[#24211E]/95 to-[#24211E]/80" />

          <div className="relative z-10 max-w-3xl flex flex-col items-start">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F28A08] font-['Lexend'] mb-3">
              GET IN TOUCH TODAY
            </span>

            <h2 className="font-['Lexend'] text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#FFFCF8] leading-[1.05]">
              Your Next Gathering Deserves Great Food.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#EDE5D9]/80 leading-relaxed max-w-xl">
              Tell us what you're planning, and let's explore the right catering options for your occasion.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={onPlanEvent}
                className="w-full sm:w-auto"
              >
                <span>Plan Your Event</span>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onExploreServices}
                className="w-full sm:w-auto text-[#FFFCF8] border-white/20 hover:bg-white/10 hover:border-white/40"
              >
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
