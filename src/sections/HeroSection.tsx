import React, { useState, useEffect, useCallback, useRef } from 'react';
import { heroSlidesData } from '../data/heroSlides';
import { UtensilsCrossed, ChefHat, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onViewMenu?: () => void;
  onBuildBuffet?: () => void;
  onContactUs: () => void;
}

// Comfortable 5.5s slide duration for slow, cinematic background shifts
const SLIDE_DURATION = 5500;

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewMenu,
  onBuildBuffet,
  onContactUs,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isContactClicked, setIsContactClicked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleContactClick = () => {
    setIsContactClicked(true);
    setTimeout(() => setIsContactClicked(false), 600);
    onContactUs();
  };

  const totalSlides = heroSlidesData.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Continuous auto-play timer that works immediately on load without needing to scroll
  // Only changes slides when the timer finishes or when dots are clicked (no hovering triggers)
  // Continuous auto-play timer that works smoothly without overlooping
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        nextSlide();
      }, SLIDE_DURATION);
    };

    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentIndex, nextSlide]);

  // Touch swipe support for mobile without glitching
  const handleTouchStart = (e: React.TouchEvent) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const currentSlide = heroSlidesData[currentIndex];

  return (
    <section
      id="hero"
      className={`relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-500 pt-24 sm:pt-28 md:pt-24 pb-20 sm:pb-24 ${
        isDark ? 'bg-[#121110] text-white' : 'bg-[#FFFCF8] text-[#24211E]'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Welcome to Perry Foods Carousel"
    >
      {/* Background Slides: Slower Cinematic Crossfade */}
      <div className="absolute inset-0 z-0">
        {heroSlidesData.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
                isActive
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Background Photography (Slide 0 uses Lunch Box.jpg) */}
              <img
                src={slide.imageUrl}
                alt={slide.altText}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className={`w-full h-full object-cover object-center transition-all duration-1000 ${
                  isDark
                    ? 'filter brightness-[0.78] contrast-[1.05]'
                    : 'filter brightness-[0.98] contrast-[1.02] saturate-[1.05]'
                }`}
              />

              {/* Scrims: Dark Mode vs Light Mode Thin Transparent White Layering */}
              {isDark ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(242,138,8,0.12),transparent)]" />
                </>
              ) : (
                <>
                  {/* Light Mode: Thin transparent white layering so the photography remains clearly visible */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFFCF8]/60 via-[#FFFCF8]/35 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFCF8]/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(242,138,8,0.06),transparent)]" />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Header 1 (current size): Welcome to Perry Foods */}
          <h1
            className={`font-['Lexend'] text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-[1.08] transition-colors duration-300 drop-shadow-xs ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Welcome to <span className="text-[#f28a08]" style={{ color: '#f28a08' }}>Perry Foods</span>
          </h1>

          {/* Content without card: Pure unobstructed typography */}
          <div className="mt-4 sm:mt-5">
            {/* Header 2 (smaller size): Slide Title in Lexend font */}
            <h2
              key={`title-${currentIndex}`}
              className={`font-['Lexend'] text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-tight transition-colors duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500 ${
                isDark ? 'text-[#FFFCF8]' : 'text-[#24211E]'
              }`}
              style={{ textWrap: 'balance' }}
            >
              {currentSlide.title}
            </h2>

            {/* Header 3 / Body: Slide Description in Poppins font - dark color in light mode */}
            <p
              key={`desc-${currentIndex}`}
              className={`mt-2.5 sm:mt-4 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl font-['Poppins'] transition-colors duration-300 animate-in fade-in slide-in-from-bottom-3 duration-700 ${
                isDark ? 'text-[#EDE5D9]/90' : 'text-[#24211E] font-medium'
              }`}
              style={{ textWrap: 'balance' }}
            >
              {currentSlide.description}
            </p>
          </div>

          {/* Landing Page Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* View Menu Button: Sleek 1px stroke */}
            <button
              type="button"
              onClick={onViewMenu || onBuildBuffet}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#F28A08] hover:bg-[#DB7A04] border border-[#F28A08] shadow-md shadow-[#F28A08]/20 hover:shadow-lg hover:shadow-[#F28A08]/30 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <UtensilsCrossed className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
              <span>View Menu</span>
            </button>

            {/* Contact Us Button: Body stays white, contents turn yellow when clicked */}
            <button
              type="button"
              onClick={handleContactClick}
              className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm ${
                isDark
                  ? isContactClicked
                    ? 'bg-white text-[#F28A08] border border-white'
                    : 'text-white border border-white/30 bg-white/10 hover:bg-white hover:text-[#F28A08] hover:border-white active:bg-white active:text-[#F28A08] active:border-white backdrop-blur-md'
                  : isContactClicked
                  ? 'bg-white text-[#F28A08] border border-[#F28A08]'
                  : 'text-[#24211E] border border-[#24211E]/20 bg-white hover:bg-white hover:text-[#F28A08] hover:border-[#F28A08] active:bg-white active:text-[#F28A08] active:border-[#F28A08]'
              }`}
            >
              <Mail className="w-5 h-5 text-[#F28A08] shrink-0" />
              <span className="transition-colors duration-200">Contact Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Dots: No card, smaller dots, animated loading fill when active */}
      <div className="absolute bottom-7 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          {heroSlidesData.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className="group py-2 px-1 focus-visible:outline-none cursor-pointer flex items-center justify-center"
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                aria-current={isActive}
              >
                {isActive ? (
                  /* Active Dot: Expands into an elongated pill with active loading progress fill */
                  <div
                    className={`relative w-9 sm:w-11 h-2 sm:h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                      isDark
                        ? 'bg-white/25 ring-1 ring-white/10'
                        : 'bg-[#24211E]/20 ring-1 ring-[#24211E]/30'
                    }`}
                  >
                    <div
                      key={`fill-${currentIndex}`}
                      className="absolute top-0 bottom-0 left-0 bg-[#F28A08] rounded-full"
                      style={{
                        animation: `dotProgressAnim ${SLIDE_DURATION}ms linear forwards`,
                      }}
                    />
                  </div>
                ) : (
                  /* Inactive Dot: Smaller sleek circular dot */
                  <div
                    className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      isDark
                        ? 'bg-white/40 group-hover:bg-white/80'
                        : 'bg-[#24211E]/40 group-hover:bg-[#24211E]/80'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
