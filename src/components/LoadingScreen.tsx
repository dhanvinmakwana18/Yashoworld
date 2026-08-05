import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#12100E] text-[#F5EFE6]"
        >
          {/* Animated Golden Sparkle Halo */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#D4AF37]/30 rounded-full blur-2xl animate-ping" />
            <motion.div
              initial={{ scale: 0.8, rotate: -30 }}
              animate={{ scale: 1.1, rotate: 0 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
              className="w-20 h-20 rounded-full glass-gold flex items-center justify-center border-2 border-[#D4AF37] shadow-2xl relative z-10"
            >
              <Sparkles className="w-10 h-10 text-[#D4AF37] animate-pulse" />
            </motion.div>
          </div>

          {/* Logo Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
          >
            Yasho<span className="text-gold-gradient">World</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium"
          >
            Preserving Memories Forever
          </motion.p>

          {/* Progress Shimmer Bar */}
          <div className="w-48 h-1 bg-[#2A2421] rounded-full overflow-hidden mt-8">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#8B5E3C]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
