import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, HeartHandshake, PackageCheck, Truck, Palette, Sparkle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: '100% Handmade',
      subtitle: 'Artisanal Perfection',
      description: 'Hand-poured, hand-arranged, and polished by master artisans with zero automation shortcuts.',
    },
    {
      icon: ShieldCheck,
      title: 'Premium Resin',
      subtitle: 'Non-Yellowing UV Shield',
      description: 'Formulated with high-refraction optical resin that stays crystal clear for decades.',
    },
    {
      icon: Palette,
      title: 'Custom Designs',
      subtitle: 'Bespoke Artistry',
      description: 'Choose your shapes, floral palettes, brass engravings, and floating 24K gold foil flakes.',
    },
    {
      icon: PackageCheck,
      title: 'Safe Packaging',
      subtitle: 'Shatterproof Wooden Casing',
      description: 'Custom molded velvet-foam inserts inside luxury wooden gift packaging with full transit insurance.',
    },
    {
      icon: Truck,
      title: 'Fast Worldwide Delivery',
      subtitle: 'Tracked Express Shipping',
      description: 'Express door-to-door courier service with live tracking so your memory arrives safely.',
    },
    {
      icon: HeartHandshake,
      title: 'Made with Love',
      subtitle: 'Empathy & Devotion',
      description: 'We honor your sentimental treasures as sacred memories, crafting each piece with warmth and care.',
    },
  ];

  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-[#FFF8F0] dark:bg-[#12100E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4AF37]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-wide text-[#8B5E3C] dark:text-[#E5C158] uppercase">
              The YashoWorld Distinction
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2421] dark:text-[#F5EFE6] tracking-tight mb-4">
            Why Discerning Clients <br />
            <span className="italic font-serif-body text-gold-gradient font-normal">Trust YashoWorld</span>
          </h2>
          <p className="text-base text-[#6B5E55] dark:text-[#C4B8AD] max-w-2xl mx-auto">
            Combining heirloom emotional storytelling with uncompromising museum-grade material quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-white/80 dark:border-[#D4AF37]/20 hover:-translate-y-2 transition-all duration-300 shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] via-[#AA7C11] to-[#8B5E3C] text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    {feature.subtitle}
                  </span>
                  <h3 className="font-serif-display text-xl font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#6B5E55] dark:text-[#C4B8AD] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
