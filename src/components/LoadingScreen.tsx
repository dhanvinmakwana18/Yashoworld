import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Skip heavy canvas particles on small mobile devices to prevent Chrome crashing
    if (window.innerWidth < 640 || window.matchMedia('(pointer: coarse)').matches) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Particle Swarm
    const particleCount = Math.min(window.innerWidth < 640 ? 60 : 140, 150);
    const particles: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      speed: number;
      alpha: number;
    }> = [];

    const centerX = width / 2;
    const centerY = height / 2 - 20;

    const goldColors = ['#D4AF37', '#E5C158', '#F5EFE6', '#8B5E3C', '#FFF8F0'];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 80 + 30;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: centerX + Math.cos(angle) * radius,
        targetY: centerY + Math.sin(angle) * radius,
        size: Math.random() * 2.5 + 1,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        speed: Math.random() * 0.04 + 0.02,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += (p.targetX - p.x) * p.speed;
        p.y += (p.targetY - p.y) * p.speed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 700);
    }, 2000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#660033] text-[#F5EFE6] overflow-hidden"
        >
          {/* Particle Canvas background forming logo */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* Logo Reveal */}
          <div className="text-center z-10 relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif-display text-4xl sm:text-5xl font-bold tracking-widest uppercase text-white mb-2"
            >
              Yasho<span className="text-gold-gradient">World</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium"
            >
              Preserving Memories Forever
            </motion.p>
          </div>

          {/* Progress Shimmer Bar */}
          <div className="w-48 sm:w-64 h-1 bg-[#4D0026] rounded-full overflow-hidden mt-10 z-10 relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#8B5E3C]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
