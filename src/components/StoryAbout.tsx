import React from 'react';
import { Sparkles, Heart, Shield, Award, Layers, CheckCircle2 } from 'lucide-react';
import { useGsapStagger } from '../utils/gsapAnimations';

export const StoryAbout: React.FC = () => {
  const pillarsRef = useGsapStagger<HTMLDivElement>('.gsap-pillar-card');
  const timelineRef = useGsapStagger<HTMLDivElement>('.gsap-timeline-card');

  const pillars = [
    {
      title: '100% Handmade',
      subtitle: 'Artisanal Precision',
      description:
        'Every single frame, clock, and resin block is hand-poured, hand-arranged, and diamond-polished in our master studio.',
      icon: Sparkles,
      color: 'from-[#D4A373] to-[#B8860B]',
    },
    {
      title: 'Truly Unique',
      subtitle: 'One-of-a-Kind Creations',
      description:
        'No two flowers or resin pours are ever identical. Your keepsake is a bespoke piece of fine art made exclusively for you.',
      icon: Layers,
      color: 'from-[#D8B4E2] to-[#B583C2]',
    },
    {
      title: 'Premium Quality',
      subtitle: 'UV Optical Resin',
      description:
        'We use formula-grade non-yellowing optical resin with HALS UV defense, maintaining glass clarity for a lifetime.',
      icon: Shield,
      color: 'from-[#D4A373] to-[#E8A5A5]',
    },
    {
      title: 'Bespoke Customization',
      subtitle: 'Tailored to Your Story',
      description:
        'From gold leaf density to custom engraved vows and initials—you control every aesthetic detail.',
      icon: Award,
      color: 'from-[#A8C3A0] to-[#809E78]',
    },
    {
      title: 'Made with Love',
      subtitle: 'Empathy & Care',
      description:
        'We understand the profound emotional value of your wedding flowers or baby milestones. We treat every memory like sacred treasure.',
      icon: Heart,
      color: 'from-[#E8A5A5] to-[#D8B4E2]',
    },
  ];

  const studioTimeline = [
    {
      year: 'Step 01',
      title: 'Sourcing & Gentle Moisture Extraction',
      description:
        'Fresh flowers are received within 48 hours of your event and embedded in organic silica gel for 5-7 days to retain natural vibrant pigments without color decay.',
    },
    {
      year: 'Step 02',
      title: 'Artistic 3D Composition & Layout Design',
      description:
        'Master floral artists carefully arrange dried petals, foliage, invitation cards, and gold foil flakes in harmonized depth layers inside the frame mold.',
    },
    {
      year: 'Step 03',
      title: 'Vacuum Degassed UV Resin Casting',
      description:
        'Clear optical resin is poured slowly in multi-level shallow casts inside a vacuum degassing chamber to guarantee zero air bubbles.',
    },
    {
      year: 'Step 04',
      title: 'Hand Sanding, Edging & Mirror Polish',
      description:
        'After 72 hours of solid curing, each piece undergoes 10 stages of progressive wet sanding and diamond buffing for liquid-glass shine.',
    },
  ];

  return (
    <section id="story" aria-label="Our Story and Craftsmanship" className="w-full min-h-screen min-h-[700px] py-24 relative bg-[#FAF7F2] dark:bg-[#231C18]">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8E8EE]/50 dark:bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8EFE6]/50 dark:bg-[#D8B4E2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4A373]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4A373]" />
            <span className="text-xs font-semibold tracking-wide text-[#2D2421] dark:text-[#E8D8CD] uppercase">
              The YashoWorld Story
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2421] dark:text-[#FAF7F2] tracking-tight mb-6">
            Preserving Moments that <br />
            <span className="italic font-serif-body text-gold-gradient font-normal">
              Words Cannot Express
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#3A3A3A] dark:text-[#E8D8CD] font-normal leading-relaxed">
            Founded with a passion for eternalizing life’s most emotional milestones, YashoWorld merges fine art craftsmanship with advanced optical resin technology.
          </p>
        </div>

        {/* 5 Core Pillars Grid - GSAP Stagger Timeline */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="gsap-pillar-card glass-panel p-6 rounded-2xl border border-white/80 dark:border-[#D4A373]/25 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-xl group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pillar.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#1A1412] dark:text-[#FAF7F2] mb-1">
                  {pillar.title}
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#8B4513] dark:text-[#F3C06B] font-bold mb-3">
                  {pillar.subtitle}
                </span>
                <p className="text-xs text-[#382E2B] dark:text-[#E8D8CD] leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Animated Craftsmanship Process Timeline */}
        <div className="glass-gold p-8 sm:p-12 rounded-3xl border border-[#D4A373]/40 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1412] dark:text-[#FAF7F2] mb-3">
              The Art of Resin Preservation
            </h3>
            <p className="text-sm text-[#382E2B] dark:text-[#E8D8CD]">
              How we transform delicate perishable flowers into indestructible glass-like keepsakes.
            </p>
          </div>

          <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A373]/50 to-transparent -translate-y-6 pointer-events-none" />

            {studioTimeline.map((step) => (
              <div
                key={step.year}
                className="gsap-timeline-card glass-panel p-6 rounded-2xl border border-white/80 dark:border-[#D4A373]/25 relative z-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#8B4513]/10 dark:bg-[#F3C06B]/20 text-[#8B4513] dark:text-[#F3C06B] text-xs font-bold font-serif-display">
                      {step.year}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#8B4513] dark:text-[#F3C06B]" />
                  </div>
                  <h4 className="font-serif-display text-base font-bold text-[#1A1412] dark:text-[#FAF7F2] mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#382E2B] dark:text-[#E8D8CD] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
