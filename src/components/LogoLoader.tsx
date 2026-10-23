import React, { useState, useEffect, useRef } from 'react';
import { preloadCriticalAssets } from '../utils/preloadAssets';

interface LogoLoaderProps {
  onComplete: () => void;
  theme?: 'light' | 'dark';
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({ onComplete, theme: propTheme }) => {
  // Determine if this is the first login in the session or a reload / returning view
  const [isFirstLogin] = useState<boolean>(() => {
    try {
      const hasVisited = sessionStorage.getItem('perry_foods_visited');
      if (!hasVisited) {
        sessionStorage.setItem('perry_foods_visited', 'true');
        return true;
      }
      return false;
    } catch {
      return true;
    }
  });

  // Determine active theme: first login defaults to dark mode, reloads follow preference
  const [activeTheme] = useState<'light' | 'dark'>(() => {
    if (propTheme) return propTheme;
    try {
      const stored = localStorage.getItem('perry_foods_theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  const isDark = activeTheme === 'dark';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [useGifFallback, setUseGifFallback] = useState<boolean>(() => {
    // If not first login, user requested using the GIFs as loading page
    return !isFirstLogin;
  });

  // Preload critical assets in the background while loader animation runs
  useEffect(() => {
    preloadCriticalAssets().catch(() => {});
  }, []);

  // Guarantee the animation plays for at least one full cycle (3.2 seconds)
  useEffect(() => {
    // Exact video/gif duration is 3.2s
    const playbackTimer = setTimeout(() => {
      startFadeOut();
    }, 3250);

    return () => {
      clearTimeout(playbackTimer);
    };
  }, []);

  const startFadeOut = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  // Attempt video playback on first login
  useEffect(() => {
    if (!useGifFallback && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fall back gracefully to GIF if browser blocks video autoplay
          setUseGifFallback(true);
        });
      }
    }
  }, [useGifFallback]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-opacity duration-450 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: isDark ? '#110F0D' : '#FFFFFF',
      }}
      role="status"
      aria-label="Loading Perry Foods"
      aria-live="polite"
    >
      {/* Animated Brand Logo Container (Responsive for Mobile, Tab & Desktop) */}
      <div className="relative w-[230px] xs:w-[270px] sm:w-[320px] md:w-[360px] max-w-[85vw] max-h-[70vh] aspect-[438/568] flex items-center justify-center">
        {useGifFallback ? (
          /* High-fidelity GIF loader depending on theme preference */
          <img
            src={
              isDark
                ? '/assets/aistudio/logo_loader_dark.gif'
                : '/assets/aistudio/logo_loader_light.gif'
            }
            alt="Perry Foods Loading Animation"
            className="w-full h-full object-contain pointer-events-none select-none"
            width={438}
            height={568}
          />
        ) : (
          /* First login Video & Webm loader */
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={startFadeOut}
            className="w-full h-full object-contain pointer-events-none select-none"
            width={438}
            height={568}
          >
            {isDark ? (
              <>
                <source src="/assets/aistudio/logo_loader_adb94dbb.webm" type="video/webm" />
                <source src="/assets/aistudio/logo_loader_dark_c97b7240.mp4" type="video/mp4" />
              </>
            ) : (
              <>
                <source src="/assets/aistudio/logo_loader_light.webm" type="video/webm" />
                <source src="/assets/aistudio/logo_loader_light_a243922f.mp4" type="video/mp4" />
              </>
            )}
            {/* Fallback image in case video sources fail */}
            <img
              src={
                isDark
                  ? '/assets/aistudio/logo_loader_dark.gif'
                  : '/assets/aistudio/logo_loader_light.gif'
              }
              alt="Perry Foods Loading Animation"
              className="w-full h-full object-contain"
            />
          </video>
        )}
      </div>
    </div>
  );
};
