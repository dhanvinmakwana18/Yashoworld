import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Wand2, Star, Award } from 'lucide-react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';

interface HeroProps {
  onOpenCustomizer: () => void;
  isDarkTheme: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCustomizer, isDarkTheme }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#E8D8C4]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#8B5E3C]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center items-start text-left gap-6"
          >
            {/* Tagline Badge */}
            <div className="inline-block bg-[#E8D8C4] text-[#8B5E3C] px-3.5 py-1.5 rounded text-[9px] uppercase tracking-[0.2em] font-bold mb-2 shadow-xs">
              Artisan Handmade • YashoWorld Studio
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-[#2D241E] dark:text-[#F5EFE6] font-normal">
              Every Memory <br />
              <span className="italic font-serif-body font-light text-[#8B5E3C] dark:text-[#E5C158]">
                Deserves
              </span>{' '}
              Forever.
            </h1>

            {/* Subheading */}
            <p className="text-lg leading-relaxed text-[#5D4E42] dark:text-[#C4B8AD] max-w-sm font-light">
              Handcrafted resin art that transforms your most precious moments into timeless keepsakes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a
                href="#products"
                className="px-8 py-4 bg-[#8B5E3C] text-white rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-[#2D241E] transition-all flex items-center gap-3 shadow-lg group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenCustomizer}
                className="px-6 py-4 border border-[#8B5E3C]/30 hover:border-[#8B5E3C] text-[#8B5E3C] dark:text-[#E5C158] rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-[#E8D8C4]/30 transition-all flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom Order</span>
              </button>
            </div>

            {/* Trust Badges & Stats */}
            <div className="mt-8 flex items-center gap-12 border-t border-[#D4AF37]/20 pt-8 w-full">
              <div>
                <div className="text-2xl font-serif text-[#8B5E3C] dark:text-[#E5C158] font-bold">
                  12k+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#5D4E42] dark:text-[#C4B8AD] opacity-70">
                  Preserved Memories
                </div>
              </div>

              <div>
                <div className="text-2xl font-serif text-[#8B5E3C] dark:text-[#E5C158] font-bold">
                  4.9/5
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#5D4E42] dark:text-[#C4B8AD] opacity-70">
                  Client Happiness
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Resin Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-7 h-full relative flex items-center justify-center min-h-[520px]"
          >
            {/* Immersive Glass Container Showcase */}
            <div className="relative w-full max-w-[480px] h-[540px] bg-white/40 dark:bg-[#1C1815]/50 backdrop-blur-md border border-white/60 dark:border-[#D4AF37]/30 rounded-xl shadow-[0_40px_100px_-20px_rgba(139,94,60,0.3)] flex items-center justify-center overflow-hidden group">
              
              {/* Floating Instruction Hint */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-wider font-semibold text-[#8B5E3C] dark:text-[#D4AF37] flex items-center gap-1.5 shadow-xs pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Drag to Rotate 3D Resin</span>
              </div>

              {/* Three.js Canvas Container */}
              <div className="w-full h-full relative z-10">
                <ThreeHeroCanvas isDarkTheme={isDarkTheme} />
              </div>

              {/* Bottom Featured Piece Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/50 dark:bg-[#12100E]/70 border border-white/60 dark:border-[#D4AF37]/30 backdrop-blur-lg rounded-lg z-20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#8B5E3C] dark:text-[#E5C158]">
                    Featured Piece
                  </div>
                  <div className="text-sm font-serif font-bold text-[#2D241E] dark:text-[#F5EFE6]">
                    Ethereal Wedding Garland Frame
                  </div>
                </div>
                <button
                  onClick={onOpenCustomizer}
                  className="px-3 py-1.5 bg-[#8B5E3C] text-white rounded text-[10px] uppercase tracking-widest font-bold hover:bg-[#2D241E] transition-colors"
                >
                  Configure
                </button>
              </div>
            </div>

            {/* Floating Side Cards (Immersive UI Feature) */}
            <div className="hidden xl:flex absolute -top-4 -right-4 w-40 h-44 bg-white/70 dark:bg-[#1C1815]/80 backdrop-blur-sm border border-white/70 dark:border-[#D4AF37]/30 rounded-lg shadow-xl p-3.5 flex-col justify-between z-20">
              <div className="w-full h-20 bg-[#E8D8C4]/60 dark:bg-[#2A2421] rounded-md flex items-center justify-center text-[#8B5E3C] dark:text-[#E5C158]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest font-bold text-[#8B5E3C] dark:text-[#E5C158]">
                  Name Plates
                </div>
                <div className="text-[11px] opacity-70 text-[#5D4E42] dark:text-[#C4B8AD]">
                  Custom Golden Inlay
                </div>
              </div>
            </div>

            <div className="hidden xl:flex absolute -bottom-6 -left-6 w-40 h-44 bg-white/70 dark:bg-[#1C1815]/80 backdrop-blur-sm border border-white/70 dark:border-[#D4AF37]/30 rounded-lg shadow-xl p-3.5 flex-col justify-between z-20">
              <div className="w-full h-20 bg-[#E8D8C4]/60 dark:bg-[#2A2421] rounded-md flex items-center justify-center text-[#8B5E3C] dark:text-[#E5C158]">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest font-bold text-[#8B5E3C] dark:text-[#E5C158]">
                  Resin Clocks
                </div>
                <div className="text-[11px] opacity-70 text-[#5D4E42] dark:text-[#C4B8AD]">
                  Ocean Wave Series
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
