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

    // Use IntersectionObserver for 60 FPS performance instead of heavy scroll listeners
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
              items,
              {
                opacity: 0,
                y: 40,
                scale: 0.96,
                filter: 'blur(4px)',
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.85,
                stagger: 0.08,
                clearProps: 'transform,filter',
              }
            );

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
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
