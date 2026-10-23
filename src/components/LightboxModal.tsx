import React, { useEffect, useCallback, useState } from 'react';
import { GalleryItem } from '../types';
import { SafeImage } from './SafeImage';
import { useTheme } from '../context/ThemeContext';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom when switching images or opening
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200 overflow-y-auto ${
        isDark ? 'bg-black/90 backdrop-blur-md' : 'bg-black/65 backdrop-blur-md'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Image detail: ${currentItem.title}`}
    >
      {/* Background click to close */}
      <div className="fixed inset-0 cursor-zoom-out" onClick={onClose} aria-hidden="true" />

      {/* Close button ONLY (X sign) - all other buttons removed as requested */}
      <button
        type="button"
        onClick={onClose}
        className={`fixed top-4 right-4 z-40 p-2.5 sm:p-3 rounded-full transition-all shadow-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F28A08] ${
          isDark
            ? 'bg-[#1E1B18]/90 text-white hover:bg-[#2A2622] border border-white/20'
            : 'bg-white/95 text-[#24211E] hover:bg-[#FAF6F0] border border-[#EDE5D9]'
        }`}
        aria-label="Close"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev / Next controls */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className={`fixed left-2 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full transition-all shadow-xl cursor-pointer ${
              isDark
                ? 'bg-[#1E1B18]/90 text-white hover:bg-[#F28A08] hover:text-white border border-white/15'
                : 'bg-white/95 text-[#24211E] hover:bg-[#F28A08] hover:text-white border border-[#EDE5D9]'
            }`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className={`fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full transition-all shadow-xl cursor-pointer ${
              isDark
                ? 'bg-[#1E1B18]/90 text-white hover:bg-[#F28A08] hover:text-white border border-white/15'
                : 'bg-white/95 text-[#24211E] hover:bg-[#F28A08] hover:text-white border border-[#EDE5D9]'
            }`}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Main Pinterest-Style Pin Detail Card */}
      <div
        className={`relative z-20 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl transition-colors my-auto border ${
          isDark
            ? 'bg-[#1E1B18] text-[#F7F4EF] border-[#38332E]'
            : 'bg-white text-[#24211E] border-[#EDE5D9]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px] max-h-[85vh]">
          {/* Image Placeholder & Click-To-Zoom View */}
          <div
            className={`md:col-span-7 relative flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none ${
              isDark ? 'bg-[#141210]' : 'bg-[#FAF6F0]'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? 'Click to reset zoom' : 'Click to zoom in'}
          >
            {/* Visual zoom indicator badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-xs pointer-events-none bg-black/60 text-white">
              {isZoomed ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to fit</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to zoom</span>
                </>
              )}
            </div>

            {/* Scrollable / pannable image display */}
            <div
              className={`w-full h-full max-h-[68vh] flex items-center justify-center overflow-auto custom-thin-scrollbar rounded-2xl ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
            >
              <SafeImage
                src={currentItem.image}
                alt={currentItem.imageAlt}
                fallbackTitle={currentItem.title}
                className={`transition-transform duration-300 object-contain rounded-xl max-h-[66vh] w-auto max-w-full ${
                  isZoomed
                    ? 'scale-160 cursor-zoom-out max-h-none my-14'
                    : 'scale-100 cursor-zoom-in'
                }`}
              />
            </div>
          </div>

          {/* Clean Details Panel without tags, jibberish, or buttons */}
          <div
            className={`md:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto custom-thin-scrollbar border-t md:border-t-0 md:border-l ${
              isDark ? 'border-[#38332E] bg-[#1E1B18]' : 'border-[#EDE5D9] bg-white'
            }`}
          >
            <div>
              {/* Photo counter */}
              <div className="flex items-center justify-end pb-3 mb-4 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/60 text-xs">
                <span className="text-[#706A63] dark:text-[#A8A199] font-medium tabular-nums">
                  {currentIndex + 1} of {items.length}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-['Lexend'] text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF]">
                {currentItem.title}
              </h2>

              {/* Description */}
              {currentItem.caption && (
                <p className="mt-3 text-xs sm:text-sm text-[#706A63] dark:text-[#A8A199] leading-relaxed">
                  {currentItem.caption}
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-[#EDE5D9]/50 dark:border-[#38332E]/60 text-[11px] text-[#706A63] dark:text-[#A8A199]">
              <span>Click on the photo to zoom in and examine culinary details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
