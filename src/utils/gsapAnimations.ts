import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom React hook for GSAP staggered timeline scroll reveal animations
 */
export function useGsapStagger<T extends HTMLElement>(
  staggerSelector: string = '.gsap-stagger-item',
  deps: any[] = []
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll(staggerSelector);
    if (!items.length) return;

    // Use IntersectionObserver for 60 FPS performance both on scroll down and scroll up
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              clearProps: 'filter',
            });
          } else {
            // Determine direction to set starting position for smooth re-entry
            const scrollY = window.scrollY || window.pageYOffset;
            const rect = entry.boundingClientRect;
            const isAbove = rect.top < 0;

            gsap.to(items, {
              opacity: 0,
              y: isAbove ? -30 : 40,
              scale: 0.96,
              filter: 'blur(4px)',
              duration: 0.5,
              ease: 'power2.in',
            });
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, deps);

  return containerRef;
}

/**
 * GSAP smooth page reveal transition timeline
 */
export function animatePageEntrance(container: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.fromTo(
    container,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 1.0, clearProps: 'all' }
  );

  return tl;
}
