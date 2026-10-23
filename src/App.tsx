/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { MergedServicesAboutSection } from './sections/MergedServicesAboutSection';
import { MenuSection } from './sections/MenuSection';
import { GallerySection } from './sections/GallerySection';
import { InquirySection } from './sections/InquirySection';
import { LogoLoader } from './components/LogoLoader';

import { MenuItem } from './types';

function MainApp() {
  const { theme } = useTheme();
  // Always display the loading screen when reloading or loading in a new page
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);

  React.useEffect(() => {
    const handleQuota = () => setGmpQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const handleLoaderComplete = () => {
    setIsAppLoading(false);
  };

  const [inquiryService, setInquiryService] = useState<string | undefined>(undefined);
  const [inquiryEventType, setInquiryEventType] = useState<
    'Wedding' | 'Corporate Event' | 'Birthday' | 'Family Gathering' | 'Other' | undefined
  >(undefined);
  const [inquiryNotes, setInquiryNotes] = useState<string | undefined>(undefined);
  const [inquiryGuests, setInquiryGuests] = useState<number | string | undefined>(undefined);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setInquiryService(serviceName);
    scrollToSection('#inquiry');
  };

  const handlePlaceOrder = (item: MenuItem, quantity: number, totalBirr: number) => {
    setInquiryNotes(`Order: ${quantity}x ${item.name} (${totalBirr.toLocaleString()} Birr total)`);
    setInquiryService(item.categoryLabel);
    setInquiryGuests(quantity);
  };

  return (
    <>
      {/* Elegant Theme-Aware Logo Loader (Video, WebM, and GIF) */}
      {isAppLoading && (
        <LogoLoader
          theme={theme}
          onComplete={handleLoaderComplete}
        />
      )}

      <div className="min-h-screen flex flex-col bg-[#FFFCF8] dark:bg-[#171513] text-[#24211E] dark:text-[#F7F4EF] transition-colors duration-300">
        {/* Google Maps Quota Defense Banner */}
        {gmpQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        {/* 1. Transparent Header with 5 Links + Dark/Light Mode Button */}
        <Header />

      <main className="flex-1">
        {/* 2. Hero Landing Page: Auto and Dot Scrollable with 6 catering image slides */}
        <HeroSection
          onViewMenu={() => scrollToSection('#menu')}
          onContactUs={() => scrollToSection('#inquiry')}
        />

        {/* 3. Merged Services & About Us Section under #services */}
        <MergedServicesAboutSection
          onSelectService={handleSelectService}
          onPlanEvent={() => scrollToSection('#menu')}
          onOrderNow={() => scrollToSection('#menu')}
        />

        {/* 5. Curated Menu & Trays Section under #menu */}
        <MenuSection onPlaceOrder={handlePlaceOrder} />

        {/* 6. Food & Catering Gallery with Lightbox Modal under #gallery */}
        <GallerySection />

        {/* 7. Catering Inquiry / Request a Quote Form under #inquiry */}
        <InquirySection
          selectedService={inquiryService}
          selectedEventType={inquiryEventType}
          selectedNotes={inquiryNotes}
          selectedGuests={inquiryGuests}
        />


      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
