import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const isCenter = align === 'center';
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {kicker && (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 font-['Lexend'] ${
            isDark ? 'text-[#F28A08]' : 'text-[#F28A08]'
          }`}
        >
          {kicker}
        </span>
      )}

      <h2
        className={`font-['Lexend'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05] ${
          isDark ? 'text-[#FFFCF8]' : 'text-[#24211E] dark:text-[#F7F4EF]'
        }`}
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${
            isDark ? 'text-[#EDE5D9]/80' : 'text-[#706A63] dark:text-[#A8A199]'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
