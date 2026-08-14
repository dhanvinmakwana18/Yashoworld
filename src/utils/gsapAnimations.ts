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

    const items = Array.from(el.querySelectorAll(staggerSelector)) as Element[];
    if (!items.length) return;

    // Initial state for premium 3D entrance
    gsap.set(items, {
      opacity: 0,
      y: 80,
      scale: 0.85,
      rotationX: 15,
      filter: 'blur(12px)',
    });

    let batchedElements: Element[] = [];
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            batchedElements.push(entry.target);
            observer.unobserve(entry.target);
          }
        });

        if (batchedElements.length > 0) {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            gsap.to(batchedElements, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: 'blur(0px)',
              duration: 1.2,
              stagger: 0.1,
              ease: 'power4.out',
              clearProps: 'filter,transform',
            });
            batchedElements = [];
          }, 50);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
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
