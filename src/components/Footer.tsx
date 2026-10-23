import React from 'react';
import { PerryLogo } from './PerryLogo';
import { siteConfig } from '../config/siteConfig';
import { MapPin, Mail, Phone, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className={`pt-14 pb-10 border-t transition-colors ${
        isDark
          ? 'bg-[#1E1B18] text-[#EDE5D9] border-[#34302C]'
          : 'bg-[#FFFCF8] text-[#4A453F] border-[#EDE5D9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-10 pb-10 border-b ${
            isDark ? 'border-[#34302C]' : 'border-[#EDE5D9]'
          }`}
        >
          {/* Col 1: Brand Lockup & Description */}
          <div className="flex flex-col gap-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="inline-block"
            >
              <PerryLogo variant="full" theme={theme} size="lg" />
            </a>
            <p
              className={`text-sm leading-relaxed max-w-md ${
                isDark ? 'text-[#EDE5D9]/75' : 'text-[#706A63]'
              }`}
            >
              {siteConfig.brand.footerDescription}
            </p>
            <div className="pt-1 flex flex-col gap-2.5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F28A08] font-['Lexend'] block mb-1 font-bold">
                  Brand Values
                </span>
                <p className={`text-xs ${isDark ? 'text-[#EDE5D9]/60' : 'text-[#706A63]'}`}>
                  Welcoming · Appetizing · Dependable · Professional · Celebratory
                </p>
              </div>

              {/* Social Media Platforms */}
              <div className="pt-1 flex items-center gap-2">
                <a
                  href="https://www.instagram.com/perryfoods"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Follow Perry Foods on Instagram"
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-200 text-[#F28A08] hover:text-white hover:bg-[#F28A08] hover:border-[#F28A08] hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-[#F28A08]/10 border-[#F28A08]/30'
                      : 'bg-[#F28A08]/10 border-[#F28A08]/30'
                  }`}
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/perryfoods"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Follow Perry Foods on Facebook"
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-200 text-[#F28A08] hover:text-white hover:bg-[#F28A08] hover:border-[#F28A08] hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-[#F28A08]/10 border-[#F28A08]/30'
                      : 'bg-[#F28A08]/10 border-[#F28A08]/30'
                  }`}
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/perryfoods"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  title="Join Perry Foods on Telegram"
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-200 text-[#F28A08] hover:text-white hover:bg-[#F28A08] hover:border-[#F28A08] hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-[#F28A08]/10 border-[#F28A08]/30'
                      : 'bg-[#F28A08]/10 border-[#F28A08]/30'
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/perryfoods"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="Connect with Perry Foods on LinkedIn"
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-200 text-[#F28A08] hover:text-white hover:bg-[#F28A08] hover:border-[#F28A08] hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-[#F28A08]/10 border-[#F28A08]/30'
                      : 'bg-[#F28A08]/10 border-[#F28A08]/30'
                  }`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Contact Information - Positioned at top right aligned with Crafted Elegantly by abensight, with left-aligned text */}
          <div className="flex flex-col gap-3 md:items-start md:text-left md:justify-self-end md:ml-auto w-fit">
            <span
              className={`text-sm font-bold uppercase tracking-wider font-['Lexend'] ${
                isDark ? 'text-[#FFFCF8]' : 'text-[#24211E]'
              }`}
            >
              Contact
            </span>
            <div
              className={`flex flex-col gap-3 text-xs md:items-start ${
                isDark ? 'text-[#EDE5D9]/85' : 'text-[#706A63]'
              }`}
            >
              <a
                href="mailto:Perryfoods@gmail.com"
                className="flex items-center gap-2.5 hover:text-[#F28A08] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#F28A08] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Perryfoods@gmail.com</span>
              </a>
              <a
                href="tel:+251911458705"
                className="flex items-center gap-2.5 hover:text-[#F28A08] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F28A08] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">+251911458705</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#F28A08] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Arbegnoch St, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F28A08] shrink-0" />
                <span className="text-xs sm:text-sm font-medium">2:00 - 12:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Copyright & Crafted Elegantly by abensight */}
        <div
          className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isDark ? 'text-[#EDE5D9]/60' : 'text-[#706A63]'
          }`}
        >
          <p>&copy; {currentYear} Perry Foods. All rights reserved.</p>
          <p className="text-xs">
            Crafted Elegantly by{' '}
            <a
              href="https://abensights.com.et/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F28A08] hover:underline font-semibold"
            >
              abensight
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
