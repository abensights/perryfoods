import React from 'react';
import { SafeImage } from './SafeImage';
import { useTheme } from '../context/ThemeContext';

export interface ComingSoonMenuCardProps {
  category: 'agelgel' | 'buffet' | 'lunch-box';
  categoryLabel?: string;
  header?: string;
  body: string;
  image: string;
  alt: string;
  isHero?: boolean;
}

export const ComingSoonMenuCard: React.FC<ComingSoonMenuCardProps> = ({
  categoryLabel,
  header = 'Coming Soon',
  body,
  image,
  alt,
  isHero = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl border transition-all duration-300 hover:-translate-y-1 hover:border-[#F28A08]/50 cursor-pointer flex flex-col justify-start ${
        isHero
          ? 'col-span-1 sm:col-span-2 lg:col-span-3 max-w-2xl w-full mx-auto min-h-[340px] sm:min-h-[380px]'
          : 'min-h-[420px] sm:min-h-[460px] h-full'
      } ${
        isDark
          ? 'bg-[#1C1917]/90 border-[#38332E] text-[#FFFCF8]'
          : 'bg-[#FAF6F0]/85 border-[#EDE5D9] text-[#24211E]'
      }`}
    >
      {/* Background catering photography under visible adaptive light/dark mode scrim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <SafeImage
          src={image}
          alt={alt}
          className="w-full h-full object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-115"
        />
        {/* Adjusted translucent scrim so background image is clearly visible in light & dark mode */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-br from-[#1A1715]/82 via-[#1E1B18]/78 to-[#141210]/84 group-hover:from-[#1A1715]/75 group-hover:via-[#1E1B18]/70'
              : 'bg-gradient-to-br from-[#FFFDF9]/78 via-[#FAF6F0]/70 to-[#F5ECE1]/74 group-hover:from-[#FFFDF9]/70 group-hover:via-[#FAF6F0]/62'
          }`}
        />
        {/* Brand warm orange glowing accent blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#F28A08]/15 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:scale-125" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#F28A08]/10 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:scale-125" />
      </div>

      {/* Content - Top-aligned so all card contents start at the exact same height */}
      <div className="relative z-10 flex flex-col justify-start items-start text-left">
        {/* Category Header like "Traditional bread" - plain text, no placeholder card/pill, no stars */}
        {categoryLabel && (
          <span className="text-xs uppercase tracking-wider text-[#F28A08] font-bold font-['Lexend'] mb-2 block">
            {categoryLabel}
          </span>
        )}

        <h3
          className={`font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 transition-colors duration-300 group-hover:text-[#F28A08] ${
            isDark ? 'text-[#FFFCF8]' : 'text-[#24211E]'
          }`}
        >
          {header}
        </h3>

        <p
          className={`text-xs sm:text-sm leading-relaxed font-['Poppins'] ${
            isHero ? 'max-w-xl' : ''
          } ${
            isDark ? 'text-[#EDE5D9]/90' : 'text-[#3E3A35]'
          }`}
        >
          {body}
        </p>
      </div>
    </div>
  );
};
