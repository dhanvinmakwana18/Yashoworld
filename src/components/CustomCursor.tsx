import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Track mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Inner dot physics
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const dotXSpring = useSpring(dotX, { damping: 40, stiffness: 600, mass: 0.2 });
  const dotYSpring = useSpring(dotY, { damping: 40, stiffness: 600, mass: 0.2 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') != null ||
        target.closest('button') != null ||
        target.classList.contains('cursor-pointer');
      
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D4AF37] pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isPointer ? 1.6 : 1,
          backgroundColor: isPointer ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
          borderColor: isPointer ? '#D4AF37' : 'rgba(212, 175, 55, 0.4)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotXSpring,
          y: dotYSpring,
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: isPointer ? 0 : 1,
        }}
      />
    </>
  );
};
