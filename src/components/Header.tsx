import React, { useState, useEffect, useRef } from 'react';
import { PerryLogo } from './PerryLogo';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Service', href: '#services' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#inquiry' },
];

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [isScrolled, setIsScrolled] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#hero');
  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Smooth scroll listener with RAF throttle and suppression during user nav clicks
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 30) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          // Do not override activeHash if user just clicked a nav item and page is smooth-scrolling
          if (!isNavigatingRef.current) {
            const scrollBottom =
              window.innerHeight + window.scrollY >=
              document.documentElement.scrollHeight - 60;

            if (scrollBottom) {
              setActiveHash((prev) => (prev === '#inquiry' ? prev : '#inquiry'));
            } else if (window.scrollY < 120) {
              setActiveHash((prev) => (prev === '#hero' ? prev : '#hero'));
            } else {
              const sections = ['#hero', '#services', '#menu', '#gallery', '#inquiry'];
              for (const sectionId of sections) {
                const el = document.querySelector(sectionId);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  if (rect.top <= 160 && rect.bottom > 160) {
                    setActiveHash((prev) => (prev === sectionId ? prev : sectionId));
                    break;
                  }
                }
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Lock background scroll when side menu drawer is open
  useEffect(() => {
    if (sideMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sideMenuOpen]);

  // Escape key closes side menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sideMenuOpen) {
        setSideMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sideMenuOpen]);

  const handleNavClick = (href: string) => {
    // Closes side menu immediately ("after a section is selected will get back till the side menu Icon is clicked")
    setSideMenuOpen(false);
    setActiveHash(href);
    isNavigatingRef.current = true;

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
    }, 950);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#121110]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
              : 'bg-[#FFFCF8]/95 backdrop-blur-md border-b border-[#24211E]/10 shadow-xs'
            : 'bg-transparent border-b border-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Main Header Bar */}
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with link to Home */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="flex items-center gap-2 sm:gap-3 shrink min-w-0 focus-visible:outline-2 focus-visible:outline-[#F28A08] rounded-lg p-1"
              aria-label="Perry Foods Home"
            >
              <PerryLogo size="md" variant="full" theme={theme} />
            </a>

            {/* Desktop Navigation (Visible on lg: 1024px and up) */}
            <nav
              className="hidden lg:flex items-center gap-8 text-[15px]"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeHash === link.href;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative py-1.5 transition-colors duration-200 whitespace-nowrap font-bold tracking-tight cursor-pointer ${
                      isDark
                        ? isActive
                          ? 'text-[#F28A08]'
                          : 'text-white/90 hover:text-[#F28A08]'
                        : isActive
                        ? 'text-[#24211E]'
                        : 'text-[#24211E]/70 hover:text-[#24211E]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full transition-all duration-300 ease-out origin-center ${
                        isActive
                          ? isDark
                            ? 'opacity-100 scale-x-100 bg-[#F28A08] shadow-sm shadow-[#F28A08]'
                            : 'opacity-100 scale-x-100 bg-[#24211E]'
                          : 'opacity-0 scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Dark/Light Mode Toggle + Side Menu Toggle for Tab and Mobile */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Dark / Light Mode Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F28A08] ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                    : 'bg-white hover:bg-[#FAF6F0] text-[#24211E] border border-[#24211E]/20 shadow-xs'
                }`}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-amber-600" />
                )}
              </button>

              {/* Side Menu Icon Button (Visible on Tab and Mobile screens < 1024px across all sections) */}
              <button
                type="button"
                onClick={() => setSideMenuOpen(!sideMenuOpen)}
                className={`lg:hidden p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F28A08] ${
                  sideMenuOpen
                    ? 'bg-[#F28A08] text-white shadow-md'
                    : isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-xs'
                    : 'bg-white hover:bg-[#FAF6F0] text-[#24211E] border border-[#24211E]/20 shadow-xs'
                }`}
                aria-expanded={sideMenuOpen}
                aria-label="Toggle navigation side menu"
                title="Toggle navigation menu"
              >
                {sideMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-[#F28A08]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Pull-out Side Menu Drawer for Tab & Mobile (size of 1/3 of the screen on tablet) */}
      {/* Backdrop overlay covering the other 2/3 of the screen */}
      {sideMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
          onClick={() => setSideMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Menu Panel: Pulled out with size of 1/3 screen (w-full sm:w-[50vw] md:w-1/3) */}
      <aside
        id="side-navigation-menu"
        className={`fixed top-0 right-0 bottom-0 h-full z-50 w-[85vw] sm:w-[55vw] md:w-1/3 min-w-[280px] max-w-[480px] md:max-w-none flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out ${
          sideMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isDark
            ? 'bg-[#181614] text-white border-l border-white/10'
            : 'bg-[#FFFCF8] text-[#24211E] border-l border-[#EDE5D9]'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Side Navigation Menu"
      >
        {/* Top Header inside Side Menu Drawer */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b ${
            isDark ? 'border-white/10 bg-[#141210]' : 'border-[#EDE5D9] bg-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-['Lexend'] font-bold text-sm tracking-wider uppercase text-[#F28A08]">
              Perry Foods
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSideMenuOpen(false)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-white/10 text-white/70 hover:text-white'
                : 'hover:bg-[#EDE5D9]/60 text-[#24211E]/70 hover:text-[#24211E]'
            }`}
            aria-label="Close side menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 custom-thin-scrollbar">
          {/* Main 5 Primary Sections */}
          <div>
            <p
              className={`text-[11px] font-bold uppercase tracking-widest font-['Lexend'] mb-2.5 ${
                isDark ? 'text-white/40' : 'text-[#706A63]'
              }`}
            >
              Sections
            </p>
            <nav className="flex flex-col space-y-1.5" aria-label="Side Navigation Links">
              {navLinks.map((link) => {
                const isActive = activeHash === link.href;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-['Lexend'] font-bold text-base transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#F28A08] text-white shadow-md shadow-[#F28A08]/20 translate-x-1'
                        : isDark
                        ? 'text-white/85 hover:bg-white/5 hover:text-[#F28A08] hover:translate-x-1'
                        : 'text-[#24211E]/85 hover:bg-[#EDE5D9]/50 hover:text-[#24211E] hover:translate-x-1'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};
