import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { SafeImage } from '../components/SafeImage';
import { serviceCategoriesData, ServiceCategory } from '../data/servicesCategories';
import { useTheme } from '../context/ThemeContext';

interface MergedServicesAboutSectionProps {
  onSelectService?: (serviceName: string) => void;
  onPlanEvent: () => void;
  onOrderNow?: () => void;
}

export const MergedServicesAboutSection: React.FC<MergedServicesAboutSectionProps> = ({
  onSelectService: _onSelectService,
  onPlanEvent: _onPlanEvent,
  onOrderNow,
}) => {
  const { theme: _theme } = useTheme();

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const activeCategory: ServiceCategory = serviceCategoriesData[selectedCategoryIndex];

  const handlePlaceOrder = () => {
    if (onOrderNow) {
      onOrderNow();
    } else {
      const el = document.querySelector('#menu');
      if (el) {
        const headerOffset = window.innerWidth < 768 ? 112 : 84;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section id="services" className="min-h-[90vh] sm:min-h-screen flex flex-col justify-center py-16 sm:py-24 bg-[#FFFCF8] dark:bg-[#171513] scroll-mt-20 border-b border-[#EDE5D9] dark:border-[#2E2A26] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          title="Food Crafted for Life's Moments"
          description="At Perry Foods, we unite authentic culinary tradition, artisan bakery expertise, and turnkey catering services to make every gathering unforgettable."
          align="center"
        />

        {/* Tailored Catering Services Category Showcase */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-10">
            <h3 className="font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase text-[#24211E] dark:text-[#F7F4EF] mt-1">
              Tailored Service Categories
            </h3>
          </div>

          {/* Category Selector Tabs - Fully displayed on tab and mobile with custom thin scrollbar */}
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-5xl overflow-x-auto custom-thin-scrollbar pb-3 px-2 flex justify-start md:justify-center">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#EDE5D9]/40 dark:bg-[#262320]/80 rounded-2xl border border-[#EDE5D9] dark:border-[#3A3530] shrink-0">
                {serviceCategoriesData.map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryIndex(idx)}
                    className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F28A08] ${
                      selectedCategoryIndex === idx
                        ? 'bg-[#F28A08] text-white shadow-md font-bold'
                        : 'bg-white dark:bg-[#201D1A] text-[#706A63] dark:text-[#A8A199] border border-transparent hover:text-[#24211E] dark:hover:text-white'
                    }`}
                  >
                    {cat.tabLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Selected Service Spotlight - Responsive layout fitting tablet and desktop */}
          <div
            className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm p-4 sm:p-6 md:p-7 lg:p-9 transition-all bg-white dark:bg-[#221F1C] border-[#EDE5D9] dark:border-[#3A3530]"
          >
            <div
              key={activeCategory.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-7 lg:gap-8 items-center transition-opacity duration-300 ease-out"
            >
              <div className="md:col-span-6 relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/11] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#EDE5D9]/40 dark:bg-[#2A2622] border border-[#EDE5D9] dark:border-[#3A3530] shadow-md group">
                <SafeImage
                  src={activeCategory.imageUrl}
                  alt={activeCategory.altText}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="md:col-span-6 flex flex-col justify-between gap-4 sm:gap-5 md:gap-6">
                <div>
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F28A08] font-['Lexend']">
                    {activeCategory.tagline}
                  </span>
                  <h4 className="font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase text-[#24211E] dark:text-[#F7F4EF] mt-1">
                    {activeCategory.title}
                  </h4>
                  <p className="mt-3 text-sm sm:text-base text-[#706A63] dark:text-[#A8A199] leading-relaxed font-['Poppins']">
                    {activeCategory.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDE5D9] dark:border-[#3A3530] flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handlePlaceOrder}
                    className="w-full sm:w-auto"
                  >
                    <span>Place Your Order</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
