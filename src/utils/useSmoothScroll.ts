import { useEffect } from 'react';

/**
 * Custom Inertia Smooth Scroll Hook
 * Intercepts mouse wheel scrolling for a gentle, luxurious, smooth gliding motion ("slowly slowly moving").
 * Maintains native touch scrolling on mobile devices.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Only apply inertia wheel scroll on desktop pointer devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isAnimating = false;

    const smoothStep = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.5) {
        // Higher divisor (e.g., 14) creates a slower, silkier, more gradual scroll transition
        currentY += diff / 14;
        window.scrollTo(0, currentY);
        requestAnimationFrame(smoothStep);
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isAnimating = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Don't intercept scroll if user is scrolling inside a modal/drawer or nested overflow box
      const targetEl = e.target as HTMLElement | null;
      if (
        targetEl?.closest('.overflow-y-auto') ||
        targetEl?.closest('.overflow-x-auto') ||
        targetEl?.closest('[role="dialog"]')
      ) {
        return;
      }

      e.preventDefault();

      const delta = e.deltaY;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;

      // Calculate target Y position with smooth dampening
      targetY = Math.min(Math.max(0, targetY + delta * 0.85), maxY);

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(smoothStep);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
};
