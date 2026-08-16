import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { Testimonial } from '../types';

export const Testimonials3D: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS_DATA);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API fetch failed');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((t: any) => ({
            ...t,
            rating: typeof t.rating === 'string' ? parseFloat(t.rating) : t.rating,
          }));
          setTestimonialsList(formatted);
        }
      })
      .catch(() => {
        // Fallback to static mock if API unavailable
      });
  }, []);

  // Create a slight parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-400, 0]);

  // Duplicate data to create a seamless loop
  const topRow = [...testimonialsList, ...testimonialsList];
  const bottomRow = [...testimonialsList, ...testimonialsList].reverse();

  const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
    <div className="w-[350px] sm:w-[450px] shrink-0 glass-panel p-8 rounded-3xl border border-white/90 dark:border-[#D4AF37]/30 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <Quote className="absolute top-6 right-8 w-16 h-16 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-colors pointer-events-none" />

      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5E3C] to-[#D4AF37] text-white flex items-center justify-center font-serif-display text-xl font-bold shadow-lg border border-[#D4AF37]">
          {testimonial.author.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <div className="flex items-center gap-1 text-[#D4AF37] mb-1">
            {[...Array(Math.round(testimonial.rating))].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <h3 className="font-serif-display text-lg font-bold text-[#2A2421] dark:text-[#F5EFE6]">
            {testimonial.author}
          </h3>
          <span className="text-[10px] font-semibold text-[#8B5E3C] dark:text-[#D4AF37] block">
            {testimonial.location}
          </span>
        </div>
      </div>

      <blockquote className="text-sm sm:text-base text-[#2A2421] dark:text-[#F5EFE6] font-serif-body italic leading-relaxed mb-6">
        "{testimonial.content}"
      </blockquote>

      <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Heart className="w-3 h-3 fill-current" /> Verified Purchase
        </span>
        <span className="text-[10px] text-[#6B5E55] dark:text-[#C4B8AD] font-mono truncate max-w-[120px]">
          {testimonial.productOrdered}
        </span>
      </div>
    </div>
  );

  return (
    <section ref={targetRef} id="testimonials" className="relative w-full h-screen min-h-[700px] flex flex-col justify-center overflow-hidden snap-start">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/bg-testimonials.jpg" 
          alt="Dark Moody Obsidian Resin" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4AF37]/30 mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-semibold tracking-wide text-[#8B5E3C] dark:text-[#E5C158] uppercase">
            Heartfelt Stories
          </span>
        </div>
        <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#660033] dark:text-[#F5EFE6] tracking-tight mb-4">
          Loved by Over <br className="md:hidden" /> <span className="italic font-serif-body text-gold-gradient font-normal">10,000 Families</span>
        </h2>
      </div>

      {/* Marquee Rows */}
      <div className="relative z-10 flex flex-col gap-6 overflow-hidden">
        {/* Top Row moving Left */}
        <motion.div 
          className="flex gap-6 w-max"
          style={{ x: x1 }}
        >
          {topRow.map((t, i) => <TestimonialCard key={`top-${i}`} testimonial={t} />)}
        </motion.div>

        {/* Bottom Row moving Right */}
        <motion.div 
          className="flex gap-6 w-max"
          style={{ x: x2 }}
        >
          {bottomRow.map((t, i) => <TestimonialCard key={`bot-${i}`} testimonial={t} />)}
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};
