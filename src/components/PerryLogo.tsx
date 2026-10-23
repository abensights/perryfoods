import React from 'react';
import properLogo from '../assets/proper_logo.png';
import { useTheme } from '../context/ThemeContext';

interface PerryLogoProps {
  variant?: 'full' | 'icon' | 'fork-only';
  theme?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PerryLogo: React.FC<PerryLogoProps> = ({
  variant = 'full',
  theme = 'auto',
  size = 'md',
  className = '',
}) => {
  const { theme: contextTheme } = useTheme();

  // Determine active theme
  const activeTheme = theme === 'auto' ? contextTheme : theme;
  const isDark = activeTheme === 'dark';

  const logoHeight = {
    sm: 'h-8 sm:h-9',
    md: 'h-9.5 sm:h-11 md:h-12',
    lg: 'h-12 sm:h-14',
    xl: 'h-15 sm:h-18',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Official Perry Foods Logo Mark with proper attached asset and refined size */}
      <img
        src="/assets/aistudio/Frame_5_308cc04e.png"
        alt="Perry Foods Logo"
        width={696}
        height={984}
        style={{ aspectRatio: '696 / 984' }}
        className={`${logoHeight} w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105`}
      />

      {/* Brand Wordmark in Lexend Font */}
      {variant === 'full' && (
        <div className="flex flex-col leading-none min-w-0">
          <span
            className={`font-['Lexend'] text-base xs:text-xl sm:text-2xl font-bold tracking-wide sm:tracking-wider uppercase transition-colors truncate ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            PERRY FOODS
          </span>
          <span
            className={`font-['Lexend'] text-[8.5px] xs:text-[10px] sm:text-[11px] tracking-[0.16em] xs:tracking-[0.24em] uppercase font-semibold mt-0.5 sm:mt-1 transition-colors truncate ${
              isDark ? 'text-zinc-300' : 'text-black'
            }`}
          >
            Catering &amp; Food Services
          </span>
        </div>
      )}
    </div>
  );
};
