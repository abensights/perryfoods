import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { SafeImage } from '../components/SafeImage';
import { foodImages } from '../data/images';

interface AboutSectionProps {
  onExploreServices: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreServices,
}) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#24211E] text-[#EDE5D9] scroll-mt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Story Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionHeading
              kicker="THE PERRY FOODS EXPERIENCE"
              title="Food That Brings People Together"
              align="left"
              theme="dark"
            />

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#EDE5D9]/85">
              At Perry Foods, we bring catering, baked treats, desserts, and everyday food options together for the occasions and moments that matter.
            </p>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#EDE5D9]/70">
              Whether you’re planning a celebration, organizing a corporate gathering, or looking for something delicious to share, we’re here to help you explore the right options for your needs.
            </p>

            {/* Core Pillars */}
            <div className="mt-8 grid grid-cols-2 gap-4 w-full border-t border-[#34302C] pt-6">
              <div>
                <span className="font-['Lexend'] text-2xl font-bold uppercase text-[#F28A08] block">
                  Artisanal
                </span>
                <span className="text-xs text-[#EDE5D9]/60">Freshly prepared recipes</span>
              </div>
              <div>
                <span className="font-['Lexend'] text-2xl font-bold uppercase text-[#F28A08] block">
                  Reliable
                </span>
                <span className="text-xs text-[#EDE5D9]/60">Punctual event delivery</span>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="primary"
                size="md"
                onClick={onExploreServices}
              >
                <span>Get to Know Our Services</span>
              </Button>
            </div>
          </div>

          {/* Asymmetrical Photo Collage Column (7 cols) inspired by reference */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
              {/* Image 1: Main Banquet spread */}
              <div className="rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-[#34302C] border-2 border-white/10 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <SafeImage
                  src={foodImages.storyCollage.photo1}
                  alt="Perry Foods banquet dishes"
                  fallbackTitle="Catering Banquet"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2: Celebration Cake */}
              <div className="rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-[#34302C] border-2 border-white/10 shadow-2xl transform translate-y-6 rotate-2 hover:rotate-0 transition-transform duration-500">
                <SafeImage
                  src={foodImages.storyCollage.photo2}
                  alt="Perry Foods artisanal celebration cake"
                  fallbackTitle="Celebration Cake"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 3: Wedding Table Setting */}
              <div className="rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-[#34302C] border-2 border-white/10 shadow-2xl transform -translate-y-4 rotate-1 hover:rotate-0 transition-transform duration-500">
                <SafeImage
                  src={foodImages.storyCollage.photo3}
                  alt="Perry Foods celebration dining setup"
                  fallbackTitle="Dining Setup"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 4: Fresh Bakery Croissants & Muffins */}
              <div className="rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-[#34302C] border-2 border-white/10 shadow-2xl transform translate-y-2 -rotate-2 hover:rotate-0 transition-transform duration-500">
                <SafeImage
                  src={foodImages.storyCollage.photo4}
                  alt="Perry Foods fresh baked muffins and pastries"
                  fallbackTitle="Bakery"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
