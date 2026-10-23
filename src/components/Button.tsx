import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium font-["Lexend"] transition-all duration-300 ease-out cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28A08] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-7 py-3.5 rounded-xl gap-2.5 font-semibold',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#F28A08] text-white hover:bg-[#DB7A04] border border-[#F28A08]/90 hover:border-[#DB7A04] shadow-sm hover:shadow-md hover:shadow-[#F28A08]/25 active:scale-[0.985]',
    secondary:
      'bg-white/90 dark:bg-transparent text-[#24211E] dark:text-[#F7F4EF] border border-[#24211E]/40 dark:border-white/20 hover:border-[#24211E] dark:hover:border-[#F28A08]/50 hover:bg-white dark:hover:bg-white/10 shadow-xs active:scale-[0.985]',
    dark:
      'bg-[#24211E] text-white hover:bg-[#34302C] border border-white/10 hover:border-white/20 shadow-sm hover:shadow active:scale-[0.985]',
    outline:
      'bg-transparent text-[#F28A08] border border-[#F28A08]/80 hover:border-[#F28A08] hover:bg-[#F28A08]/10 active:scale-[0.985]',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
