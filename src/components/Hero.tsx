import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Wand2, ChevronDown, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

interface HeroProps {
  onOpenCustomizer: () => void;
  isDarkTheme: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCustomizer }) => {
  return (
    <section
      aria-label="Hero Showcase"
      className="relative min-h-[92dvh] pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col justify-center items-center overflow-hidden text-center"
    >
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#F8E8EE]/25 to-transparent dark:from-[#D4AF37]/10 dark:via-[#660033]/25 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-[#3D0B23]/80 text-[#8B4513] dark:text-[#F3C06B] border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold mb-6 shadow-xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Artisan Handmade • YashoWorld Studio</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl leading-[1.12] text-[#660033] dark:text-[#FAF7F2] font-bold tracking-tight mb-6">
            Every Memory{' '}
            <span className="italic font-serif-body font-normal text-[#8B4513] dark:text-[#F3C06B]">
              Deserves
            </span>{' '}
            Forever.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#4A3728] dark:text-[#E8D8CD] max-w-2xl font-normal mb-8">
            Handcrafted resin art that encapsulates your most cherished wedding petals, sacred pooja rituals, and milestones into timeless crystal masterpieces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-12">
            <a
              href="#products"
              className="px-8 py-4 bg-[#8B5E3C] dark:bg-[#D4AF37] text-white dark:text-[#2A0818] rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-[#660033] dark:hover:bg-[#FAF7F2] transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenCustomizer}
              className="px-7 py-4 border border-[#8B5E3C]/40 dark:border-[#D4AF37]/40 hover:border-[#8B5E3C] dark:hover:border-[#D4AF37] bg-white/70 dark:bg-[#3D0B23]/70 backdrop-blur-md text-[#660033] dark:text-[#FAF7F2] rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-[#FAF7F2] dark:hover:bg-[#4D0026] transition-all duration-300 flex items-center gap-2.5 shadow-md hover:scale-105"
            >
              <Wand2 className="w-4 h-4 text-[#8B4513] dark:text-[#F3C06B]" />
              <span>3D Custom Studio</span>
            </button>
          </div>

          {/* Trust Badges & Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-8 border-t border-[#D4AF37]/25 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-xl sm:text-2xl font-serif-display text-[#8B4513] dark:text-[#F3C06B] font-bold">
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                <span>12k+</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#4A3728] dark:text-[#E8D8CD] font-bold mt-0.5">
                Preserved Memories
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-serif-display text-[#8B4513] dark:text-[#F3C06B] font-bold">
                4.9 / 5
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#4A3728] dark:text-[#E8D8CD] font-bold mt-0.5">
                Client Rating
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-xl sm:text-2xl font-serif-display text-[#8B4513] dark:text-[#F3C06B] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100%</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#4A3728] dark:text-[#E8D8CD] font-bold mt-0.5">
                UV Crystal Clarity
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-xl sm:text-2xl font-serif-display text-[#8B4513] dark:text-[#F3C06B] font-bold">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Artisan</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#4A3728] dark:text-[#E8D8CD] font-bold mt-0.5">
                Handcrafted in India
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <a
        href="#products"
        className="mt-12 inline-flex flex-col items-center gap-1 text-[#8B4513] dark:text-[#F3C06B] hover:text-[#D4AF37] transition-colors cursor-pointer"
        aria-label="Scroll down to explore collection"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
