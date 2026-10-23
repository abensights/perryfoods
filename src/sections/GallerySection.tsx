import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { SafeImage } from '../components/SafeImage';
import { LightboxModal } from '../components/LightboxModal';
import {
  galleryCollectionsData,
  galleryItemsData,
  GalleryCollection,
  GalleryPhoto,
} from '../data/gallery';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<GalleryCollection | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Hidden collections per user request: "Corporate Events", "Traditional Agelgel", "Celebration Buffets"
  const hiddenCollectionTitles = new Set([
    'Corporate Events',
    'Traditional Agelgel',
    'Celebration Buffets',
  ]);

  const visibleCollections = galleryCollectionsData.filter(
    (col) => !hiddenCollectionTitles.has(col.title)
  );

  // Get all photos for the active collection to show in the gallery list view
  const getCollectionPhotos = (col: GalleryCollection): GalleryPhoto[] => {
    return [col.mainPhoto, ...col.thumbnails, ...(col.extraPhotos || [])];
  };

  const activePhotos = activeCollection
    ? getCollectionPhotos(activeCollection)
    : galleryItemsData;

  // Open lightbox on specific photo
  const handleOpenPhoto = (photo: GalleryPhoto) => {
    const idx = activePhotos.findIndex((item) => item.id === photo.id);
    if (idx !== -1) {
      setSelectedPhotoIndex(idx);
    } else {
      setSelectedPhotoIndex(0);
    }
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) =>
        prev === null ? 0 : (prev + 1) % activePhotos.length
      );
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) =>
        prev === null ? 0 : (prev - 1 + activePhotos.length) % activePhotos.length
      );
    }
  };

  // Keep the viewport focused on the gallery section top when opening a collection
  const handleSelectCollection = (collection: GalleryCollection) => {
    setActiveCollection(collection);
    requestAnimationFrame(() => {
      const el = document.querySelector('#gallery');
      if (el) {
        const headerOffset = window.innerWidth < 768 ? 72 : 88;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    });
  };

  const handleBackToAllCollections = () => {
    setActiveCollection(null);
    requestAnimationFrame(() => {
      const el = document.querySelector('#gallery');
      if (el) {
        const headerOffset = window.innerWidth < 768 ? 72 : 88;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    });
  };

  return (
    <section
      id="gallery"
      className="py-14 sm:py-20 bg-[#FAF6F0] dark:bg-[#151311] scroll-mt-20 border-b border-[#EDE5D9] dark:border-[#2E2A26] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px]">
        {/* VIEW 1: Popular Collections Cards (Default Overview) */}
        {!activeCollection ? (
          <>
            <SectionHeading
              title="Popular Collections"
              description="Explore our food presentations, authentic Ethiopian catering, and artisan bakery collections."
              align="center"
            />

            {/* Popular Collections Grid: Responsive on Mobile, Tablet & Desktop */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
              {visibleCollections.map((collection) => (
                <div
                  key={collection.id}
                  onClick={() => handleSelectCollection(collection)}
                  className="group bg-white dark:bg-[#1E1B18] rounded-3xl p-4 sm:p-5 border border-[#EDE5D9] dark:border-[#38332E] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectCollection(collection);
                    }
                  }}
                  aria-label={`Open ${collection.title} collection`}
                >
                  <div>
                    {/* 1. Main Featured Photo with generous rounded corners */}
                    <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#EDE5D9]/40 dark:bg-[#282420] group/main">
                      <SafeImage
                        src={collection.mainPhoto.image}
                        alt={collection.mainPhoto.imageAlt}
                        fallbackTitle={collection.mainPhoto.title}
                        className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover/main:scale-105 ${collection.mainPhoto.imageClassName || ''}`}
                      />

                      {/* Gentle hover overlay with Zoom icon */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/main:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 text-[#24211E] flex items-center justify-center shadow-md transform scale-90 group-hover/main:scale-100 transition-transform">
                          <ZoomIn className="w-5 h-5 text-[#F28A08]" />
                        </div>
                      </div>
                    </div>

                    {/* 2. Row of 3 Thumbnails side by side */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mt-2.5 sm:mt-3">
                      {collection.thumbnails.map((thumb) => (
                        <div
                          key={thumb.id}
                          className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#EDE5D9]/40 dark:bg-[#282420] shadow-2xs group/thumb"
                        >
                          <SafeImage
                            src={thumb.image}
                            alt={thumb.imageAlt}
                            fallbackTitle={thumb.title}
                            className={`w-full h-full object-cover object-center transition-transform duration-300 group-hover/thumb:scale-110 ${thumb.imageClassName || ''}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Card Footer: Collection Title + Photo Count Badge */}
                  <div className="mt-3.5 sm:mt-4 pt-3 border-t border-[#EDE5D9]/50 dark:border-[#38332E]/60 flex items-center justify-between gap-3">
                    <h3 className="font-['Lexend'] text-base sm:text-lg font-bold text-[#24211E] dark:text-[#F7F4EF] group-hover:text-[#F28A08] transition-colors truncate">
                      {collection.title}
                    </h3>

                    <div
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#706A63] dark:text-[#A8A199] shrink-0 tabular-nums"
                      title={`${collection.photoCount} photos in this collection`}
                    >
                      <ImageIcon className="w-4 h-4 text-[#706A63] dark:text-[#A8A199]" />
                      <span>{collection.photoCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* VIEW 2: Compact Collection Gallery List View for Mobile, Tab & Desktop */
          <div className="animate-in fade-in duration-200">
            {/* Top Back Nav & Exhibition Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-7 pb-3 border-b border-[#EDE5D9]/70 dark:border-[#38332E]/70">
              <button
                type="button"
                onClick={handleBackToAllCollections}
                className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-[#24211E] dark:text-white bg-white dark:bg-[#1E1B18] border border-[#EDE5D9] dark:border-[#38332E] hover:border-[#F28A08] transition-all cursor-pointer shadow-2xs w-fit"
              >
                <span>All Collections</span>
              </button>

              <div className="text-left sm:text-right">
                <h2 className="font-['Lexend'] text-lg sm:text-2xl font-extrabold uppercase tracking-wide text-[#24211E] dark:text-[#F7F4EF]">
                  {activeCollection.title}
                </h2>
                <span className="text-[11px] sm:text-xs text-[#706A63] dark:text-[#A8A199]">
                  {getCollectionPhotos(activeCollection).length} Photographs · Click to view and zoom
                </span>
              </div>
            </div>

            {/* Compact Editorial Gallery Grid: Tight & Dense on Mobile and Tablet */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
              {getCollectionPhotos(activeCollection).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenPhoto(photo)}
                  className="group flex flex-col cursor-pointer bg-white dark:bg-[#1E1B18] p-2 sm:p-2.5 rounded-2xl border border-[#EDE5D9] dark:border-[#38332E] shadow-2xs hover:shadow-md hover:border-[#F28A08]/50 transition-all duration-200"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenPhoto(photo);
                    }
                  }}
                >
                  {/* Image container: compact, uniform aspect-4/3 */}
                  <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-[#EDE5D9]/40 dark:bg-[#25211D]">
                    <SafeImage
                      src={photo.image}
                      alt={photo.imageAlt}
                      fallbackTitle={photo.title}
                      className={`w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 ${photo.imageClassName || ''}`}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 text-[#24211E] flex items-center justify-center shadow-md">
                        <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F28A08]" />
                      </div>
                    </div>
                  </div>

                  {/* Under-image title & description: compact typography */}
                  <div className="mt-2 px-0.5 min-w-0">
                    <h4 className="font-['Lexend'] text-xs sm:text-sm font-bold text-[#24211E] dark:text-[#F7F4EF] group-hover:text-[#F28A08] transition-colors truncate">
                      {photo.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#706A63] dark:text-[#A8A199] mt-0.5 line-clamp-1 leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Zoom Pin Detail Viewer */}
      <LightboxModal
        items={activePhotos}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
