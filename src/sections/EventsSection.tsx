import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { SafeImage } from '../components/SafeImage';
import { Button } from '../components/Button';
import { foodImages } from '../data/images';
import { Heart, Briefcase } from 'lucide-react';

interface EventsSectionProps {
  onSelectOccasion: (eventType: 'Wedding' | 'Corporate Event') => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onSelectOccasion,
}) => {
  return (
    <section id="occasions" className="py-20 sm:py-28 bg-[#FFFCF8] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="CATERING FOR EVERY OCCASION"
          title="Tailored For Moments That Matter"
          description="Whether you're celebrating a wedding milestone or hosting executive corporate guests, Perry Foods brings thoughtful culinary curation."
          align="center"
        />

        <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Panel A: Weddings & Celebrations */}
          <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#EDE5D9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EDE5D9]/30">
              <SafeImage
                src={foodImages.occasions.wedding.url}
                alt={foodImages.occasions.wedding.alt}
                fallbackTitle="Weddings & Celebrations Catering"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F28A08] font-['Lexend'] flex items-center gap-1.5 shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-[#F28A08]" />
                <span>Weddings &amp; Celebrations</span>
              </div>
            </div>

            <div className="p-7 sm:p-9 flex flex-col flex-1 justify-between gap-6">
              <div>
                <h3 className="font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#24211E]">
                  Make Every Celebration Delicious
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#706A63] leading-relaxed">
                  Bring people together with catering options for weddings, birthdays, family gatherings, and the moments worth celebrating. From bespoke tiered cakes to grand celebration buffets, we craft menus that guests remember.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#24211E]/80">
                  <span className="px-3 py-1 bg-[#FFFCF8] border border-[#EDE5D9] rounded-lg">Wedding Banquets</span>
                  <span className="px-3 py-1 bg-[#FFFCF8] border border-[#EDE5D9] rounded-lg">Birthday Cakes</span>
                  <span className="px-3 py-1 bg-[#FFFCF8] border border-[#EDE5D9] rounded-lg">Family Reunions</span>
                </div>
              </div>

              <div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onSelectOccasion('Wedding')}
                  className="w-full sm:w-auto"
                >
                  <span>Discuss Your Celebration</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Panel B: Corporate Events */}
          <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#EDE5D9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EDE5D9]/30">
              <SafeImage
                src={foodImages.occasions.corporate.url}
                alt={foodImages.occasions.corporate.alt}
                fallbackTitle="Corporate Event Catering"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#24211E] font-['Lexend'] flex items-center gap-1.5 shadow-xs">
                <Briefcase className="w-3.5 h-3.5 text-[#F28A08]" />
                <span>Corporate Events</span>
              </div>
            </div>

            <div className="p-7 sm:p-9 flex flex-col flex-1 justify-between gap-6">
              <div>
                <h3 className="font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#24211E]">
                  Good Food for Great Gatherings
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#706A63] leading-relaxed">
                  Explore catering options for professional gatherings, meetings, workplace events, and corporate occasions. Fresh, nutritious, punctual catering that keeps teams engaged and impresses partners and clients.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#24211E]/80">
                  <span className="px-3 py-1 bg-[#FFFCF8] border border-[#EDE5D9] rounded-lg">Boardroom Lunches</span>
                  <span className="px-3 py-1 bg-[#FFFCF8] border border-[#EDE5D9] rounded-lg">Conferences &amp; Seminars</span>
                  <span className="px-3 py-1 bg-[#FFFCF8] border border-[#EDE5D9] rounded-lg">Morning Pastry Platters</span>
                </div>
              </div>

              <div>
                <Button
                  variant="dark"
                  size="md"
                  onClick={() => onSelectOccasion('Corporate Event')}
                  className="w-full sm:w-auto"
                >
                  <span>Request Corporate Catering</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
