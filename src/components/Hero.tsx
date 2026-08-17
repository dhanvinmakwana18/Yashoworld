import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenCustomizer: () => void;
  isDarkTheme: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCustomizer }) => {
  return (
    <section
      aria-label="Hero Showcase"
      className="relative w-full min-h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Background Image */}
      <div 
        className="absolute inset-0 z-0 w-full h-full"
      >
        <img 
          src="/images/hero-bg.jpg" 
          alt="Luxury Resin Art Masterpiece" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Subtle Scrim for Text Legibility */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Hero Headline - Centered, Massive, Elegant Serif */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-6 mt-[-10vh]" // Shifted slightly up from exact center to balance the bottom button
      >
        <h1 className="font-serif-display text-[12vw] sm:text-[9vw] md:text-7xl lg:text-8xl xl:text-9xl leading-[1.05] text-[#FAF7F2] font-normal tracking-tight drop-shadow-lg">
          Masterpiece Keepsakes<br/>
          <span className="italic">Preserved Forever</span>
        </h1>
      </motion.div>

      {/* Minimalist CTA Button at the bottom center */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#products"
          className="group flex items-center gap-3 bg-[#FAF7F2] text-[#2A1B23] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        >
          <span>Explore Products</span>
          <div className="w-6 h-6 rounded-full bg-[#2A1B23] flex items-center justify-center group-hover:bg-[#4D0026] transition-colors">
            <ArrowRight className="w-3.5 h-3.5 text-[#FAF7F2]" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

