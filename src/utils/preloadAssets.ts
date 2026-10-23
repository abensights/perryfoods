/**
 * Asset preloading utility to cache images and essential assets in parallel
 * during initial splash loading for instant, lag-free rendering.
 */

import lunchBoxImg from '../assets/Lunch Box.jpg';
import breadImg from '../assets/Bread Catering.jpg';
import ambashaImg from '../assets/Ambasha Catering.jpg';
import eventImg from '../assets/Event Catering.jpg';
import cookieImg from '../assets/Cookie Catering.jpg';
import cakeImg from '../assets/Cake catering.jpg';

import properLogo from '../assets/proper_logo.png';
import services3Img from '../assets/Services 3 Final.jpg';
import services4Img from '../assets/Services 4.jpg';
import difoDaboImg from '../assets/Menu/Difo Dabo.jpg';
import hibistImg from '../assets/Menu/Hibist.jpg';
import corpDiplomaticImg from '../assets/Menu/Corp Diplomatic.jpg';
import smallFastingAgelgelImg from '../assets/Menu/Small Fasting Agelgel.jpg';

export const loadedImageCache = new Set<string>();

/**
 * Preloads an image into browser cache and triggers decoding for instant display
 */
export function preloadImage(src: string): Promise<void> {
  if (!src || loadedImageCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    const onFinish = () => {
      loadedImageCache.add(src);
      resolve();
    };

    if (img.complete) {
      onFinish();
      return;
    }

    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(onFinish).catch(onFinish);
      } else {
        onFinish();
      }
    };

    img.onerror = () => {
      resolve();
    };
  });
}

/**
 * Preloads all critical landing page images in parallel
 */
export function preloadCriticalAssets(): Promise<void[]> {
  const criticalList = [
    lunchBoxImg,
    breadImg,
    ambashaImg,
    eventImg,
    cookieImg,
    cakeImg,
    properLogo,
    services3Img,
    services4Img,
    difoDaboImg,
    hibistImg,
    corpDiplomaticImg,
    smallFastingAgelgelImg,
  ];

  return Promise.all(criticalList.map(preloadImage));
}
