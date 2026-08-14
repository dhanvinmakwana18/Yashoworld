import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Wand2, ChevronDown } from 'lucide-react';
import { HeroLuxuryShowcase } from './HeroLuxuryShowcase';

interface HeroProps {
  onOpenCustomizer: () => void;
  isDarkTheme: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCustomizer }) => {
  return (
    <section aria-label="Hero Showcase" className="relative min-h-[100dvh] pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-center items-center overflow-hidden">
      {/* HTML5 Premium VFX Background Loop (Optimized for ES6+ / HTML5 Performance) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-30 mix-blend-luminosity"
          poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        >
          {/* Example VFX Source rendered via FFmpeg/After Effects */}
          <source src="https://cdn.pixabay.com/video/2020/05/25/40141-424564882_large.mp4" type="video/mp4" />
        </video>
        {/* Vignette Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/50 via-transparent to-[#FAF7F2] dark:from-[#660033]/80 dark:via-transparent dark:to-[#660033] pointer-events-none" />
      </div>

      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F8E8EE]/40 via-[#D4A373]/15 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#D8B4E2]/15 rounded-full blur-2xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center items-start text-left gap-6"
          >
            {/* Tagline Badge */}
            <div className="inline-block bg-[#FAF4ED] dark:bg-[#4D0026] text-[#8B4513] dark:text-[#F3C06B] border border-[#8B4513]/30 dark:border-[#D4A373]/30 px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold mb-2 shadow-xs">
              Artisan Handmade • YashoWorld Studio
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-[#660033] dark:text-[#FAF7F2] font-semibold">
              Every Memory <br />
              <span className="italic font-serif-body font-normal text-[#8B4513] dark:text-[#F3C06B]">
                Deserves
              </span>{' '}
              Forever.
            </h1>

            {/* Subheading */}
            <p className="text-lg leading-relaxed text-[#4D0026] dark:text-[#E8D8CD] max-w-sm font-medium">
              Handcrafted resin art that transforms your most precious moments into timeless keepsakes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a
                href="#products"
                className="px-8 py-4 bg-[#8B4513] dark:bg-[#D4A373] text-white dark:text-[#660033] rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#660033] dark:hover:bg-[#FAF7F2] transition-all flex items-center gap-3 shadow-lg group focus:outline-hidden focus:ring-2 focus:ring-[#8B4513]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenCustomizer}
                className="px-6 py-4 border border-[#8B4513]/40 dark:border-[#D4A373]/40 hover:border-[#8B4513] text-[#660033] dark:text-[#FAF7F2] rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#8B4513]/10 transition-all flex items-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-[#8B4513]"
              >
                <Wand2 className="w-4 h-4 text-[#8B4513] dark:text-[#F3C06B]" />
                <span>Custom Order</span>
              </button>
            </div>

            {/* Trust Badges & Stats */}
            <div className="mt-8 flex items-center gap-12 border-t border-[#8B4513]/20 dark:border-[#D4A373]/20 pt-8 w-full">
              <div>
                <div className="text-2xl font-serif text-[#8B4513] dark:text-[#F3C06B] font-bold">
                  12k+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#382E2B] dark:text-[#E8D8CD] font-bold">
                  Preserved Memories
                </div>
              </div>

              <div>
                <div className="text-2xl font-serif text-[#8B4513] dark:text-[#F3C06B] font-bold">
                  4.9/5
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#382E2B] dark:text-[#E8D8CD] font-bold">
                  Client Happiness
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-End Luxury Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7 h-full relative flex items-center justify-center min-h-[500px]"
          >
            <HeroLuxuryShowcase onOpenCustomizer={onOpenCustomizer} />
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Down Motion Indicator */}
      <motion.a
        href="#story"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-8 flex flex-col items-center gap-1 text-[#8B4513] dark:text-[#F3C06B] hover:text-[#D4AF37] transition-colors cursor-pointer"
        aria-label="Scroll down to explore"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
};

