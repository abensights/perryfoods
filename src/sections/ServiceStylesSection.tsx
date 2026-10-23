import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { SafeImage } from '../components/SafeImage';
import { foodImages } from '../data/images';
import {
  Users,
  Truck,
  Sparkles,
  CheckCircle2,
  UtensilsCrossed,
} from 'lucide-react';

interface ServiceStylesSectionProps {
  onSelectFullService: () => void;
  onExploreTrays: () => void;
  onLaunchBuffetBuilder: () => void;
}

export const ServiceStylesSection: React.FC<ServiceStylesSectionProps> = ({
  onSelectFullService,
  onExploreTrays,
  onLaunchBuffetBuilder,
}) => {
  return (
    <section id="service-styles" className="py-20 sm:py-28 bg-[#FFFCF8] scroll-mt-12 border-b border-[#EDE5D9]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="FLEXIBLE SERVICE FORMATS"
          title="How We Serve Your Occasion"
          description="Modeled for convenience, elegance, and scale. Choose between complete staffed service, hot party pan delivery, or a customized buffet spread."
          align="center"
        />

        <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Full-Service Catering */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-[#EDE5D9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EDE5D9]/30">
                <SafeImage
                  src={foodImages.occasions.wedding.url}
                  alt="Full service wedding catering"
                  fallbackTitle="Full-Service Catering"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F28A08] font-['Lexend'] shadow-xs flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Turnkey Experience</span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="font-['Lexend'] text-2xl font-bold uppercase tracking-tight text-[#24211E]">
                  Full-Service Staffed Catering
                </h3>
                <p className="mt-2 text-sm text-[#706A63] leading-relaxed">
                  Ideal for weddings, galas, and corporate banquets. Our uniformed staff manages setup, food replenishment, table service, cake-cutting, and end-of-event teardown.
                </p>

                <ul className="mt-5 space-y-2 border-t border-[#EDE5D9]/60 pt-4 text-xs text-[#24211E]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>Uniformed professional servers &amp; food attendants</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>Full setup, chafing gear, linen buffet styling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>Cake-cutting service &amp; coffee station coordination</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <Button
                variant="primary"
                size="md"
                onClick={onSelectFullService}
                className="w-full justify-center"
              >
                <span>Request Full-Service Quote</span>
              </Button>
            </div>
          </div>

          {/* Card 2: Drop-Off & Pick-Up Trays ("By The Tray") */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-[#EDE5D9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EDE5D9]/30">
                <SafeImage
                  src={foodImages.services.fastFood.url}
                  alt="Drop off catering party trays"
                  fallbackTitle="Party Trays"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#24211E] font-['Lexend'] shadow-xs flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#F28A08]" />
                  <span>By The Tray / Bulk Pans</span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="font-['Lexend'] text-2xl font-bold uppercase tracking-tight text-[#24211E]">
                  Drop-Off &amp; Pick-Up Trays
                </h3>
                <p className="mt-2 text-sm text-[#706A63] leading-relaxed">
                  Hot, oven-fresh food delivered directly to your venue or prepared for kitchen pickup in heavy-duty aluminum pans. Perfect for office lunches and casual parties.
                </p>

                <ul className="mt-5 space-y-2 border-t border-[#EDE5D9]/60 pt-4 text-xs text-[#24211E]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>Half pans (serves 10–15) &amp; Full pans (serves 20–30)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>Disposable warming chafers &amp; fuel cans available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>Punctual temperature-controlled delivery</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <Button
                variant="secondary"
                size="md"
                onClick={onExploreTrays}
                className="w-full justify-center hover:border-[#F28A08] hover:text-[#F28A08]"
              >
                <span>View Tray Menu &amp; Platters</span>
              </Button>
            </div>
          </div>

          {/* Card 3: Build-Your-Own Buffet (Featured highlight!) */}
          <div className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFF8EE] to-white border-2 border-[#F28A08] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
            <div className="absolute top-4 right-4 z-10 bg-[#F28A08] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-xs">
              Interactive Tool
            </div>

            <div>
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EDE5D9]/30">
                <SafeImage
                  src={foodImages.services.buffet.url}
                  alt="Build your own buffet spread"
                  fallbackTitle="Build-Your-Own Buffet"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F28A08] font-['Lexend'] shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Buffet Packages</span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="font-['Lexend'] text-2xl font-bold uppercase tracking-tight text-[#24211E]">
                  Build-Your-Own Buffet
                </h3>
                <p className="mt-2 text-sm text-[#706A63] leading-relaxed">
                  Design a custom buffet tailored to your budget and guest count. Pick your warm entrees, specialty pastas, garden sides, and signature Perry Foods bakery desserts.
                </p>

                <ul className="mt-5 space-y-2 border-t border-[#EDE5D9]/60 pt-4 text-xs text-[#24211E]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>2 or 3 hot entree selections with sides &amp; artisan rolls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>Live cost estimation based on your exact guest numbers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28A08] shrink-0" />
                    <span>Instant transfer to inquiry form with 1 click</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <Button
                variant="primary"
                size="md"
                onClick={onLaunchBuffetBuilder}
                className="w-full justify-center shadow-md"
              >
                <span>Launch Buffet Builder</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
