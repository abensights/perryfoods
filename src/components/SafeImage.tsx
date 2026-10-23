import React, { useState, useEffect, useRef } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { loadedImageCache } from '../utils/preloadAssets';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Perry Foods gourmet selection',
  className = '',
  containerClassName = '',
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  // If image was already loaded or preloaded in cache, don't show loading spinner
  const [isLoading, setIsLoading] = useState(() => {
    if (!src) return false;
    return !loadedImageCache.has(src);
  });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;
    if (loadedImageCache.has(src)) {
      setIsLoading(false);
      return;
    }
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      loadedImageCache.add(src);
      setIsLoading(false);
    }
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5EFE6] via-[#FFFCF8] to-[#EDE5D9] text-[#706A63] ${containerClassName || className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F28A08_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#F28A08]/10 text-[#F28A08] flex items-center justify-center mb-2">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#24211E]/70 font-['Lexend']">
            Perry Foods
          </span>
          {fallbackTitle && (
            <span className="text-xs text-[#706A63] mt-1 max-w-[200px] truncate">
              {fallbackTitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full h-full bg-[#EDE5D9]/20 dark:bg-[#25211D]/30 ${containerClassName}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        onLoad={() => {
          if (src) loadedImageCache.add(src);
          setIsLoading(false);
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full ${className} transition-opacity duration-300 ease-out`}
        {...props}
      />
    </div>
  );
};

