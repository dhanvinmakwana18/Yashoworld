import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SafeImage } from './SafeImage';
import { Sparkles, Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonials';

export const Testimonials3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#F5EFE6] dark:bg-[#1C1815]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4AF37]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-wide text-[#8B5E3C] dark:text-[#E5C158] uppercase">
              Heartfelt Stories
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2421] dark:text-[#F5EFE6] tracking-tight mb-4">
            Loved by Over <span className="italic font-serif-body text-gold-gradient font-normal">10,000 Families</span>
          </h2>
          <p className="text-base text-[#6B5E55] dark:text-[#C4B8AD] max-w-2xl mx-auto">
            Read how our handcrafted resin artworks preserve the sacred emotional essence of weddings, births, and milestones.
          </p>
        </div>

        {/* 3D Rotating Testimonial Stage */}
        <div className="max-w-4xl mx-auto relative px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/90 dark:border-[#D4AF37]/30 shadow-2xl relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-8 w-20 h-20 text-[#D4AF37]/15 pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B5E3C] to-[#D4AF37] text-white flex items-center justify-center font-serif-display text-2xl font-bold shadow-lg border-2 border-[#D4AF37] shrink-0">
                  {currentTestimonial.author.split(' ').map((n: string) => n[0]).join('')}
                </div>

                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-[#D4AF37] mb-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                    {currentTestimonial.author}
                  </h3>
                  <span className="text-xs font-semibold text-[#8B5E3C] dark:text-[#D4AF37] block">
                    {currentTestimonial.role} • {currentTestimonial.location}
                  </span>
                  <span className="text-[11px] text-[#6B5E55] dark:text-[#C4B8AD] mt-1 block font-mono">
                    Ordered: {currentTestimonial.productOrdered}
                  </span>
                </div>
              </div>

              <blockquote className="text-base sm:text-lg text-[#2A2421] dark:text-[#F5EFE6] font-serif-body italic leading-relaxed mb-6">
                "{currentTestimonial.content}"
              </blockquote>

              <div className="flex items-center justify-between pt-6 border-t border-[#D4AF37]/20">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current" /> Verified Customer Purchase
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Testimonial"
                    className="p-2.5 rounded-full glass-gold hover:bg-[#D4AF37] hover:text-white transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Testimonial"
                    className="p-2.5 rounded-full glass-gold hover:bg-[#D4AF37] hover:text-white transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8" role="tablist" aria-label="Testimonial slides">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial slide ${idx + 1}`}
                aria-selected={currentIndex === idx}
                role="tab"
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37] ${
                  currentIndex === idx ? 'w-8 bg-[#D4AF37]' : 'bg-[#E8D8C4] dark:bg-[#2A2421]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
