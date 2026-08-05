import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, LayoutGrid, PackageCheck, Heart, CheckCircle2, Gift, ArrowRight } from 'lucide-react';
import { ORDER_PROCESS_STEPS } from '../data/timeline';

interface OrderProcessTimelineProps {
  onOpenCustomizer: () => void;
}

export const OrderProcessTimeline: React.FC<OrderProcessTimelineProps> = ({ onOpenCustomizer }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutGrid':
        return LayoutGrid;
      case 'PackageCheck':
        return PackageCheck;
      case 'Sparkles':
        return Sparkles;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'Gift':
        return Gift;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#FFF8F0] dark:bg-[#12100E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4AF37]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-wide text-[#8B5E3C] dark:text-[#E5C158] uppercase">
              Seamless Ordering Experience
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2421] dark:text-[#F5EFE6] tracking-tight mb-4">
            How Your Memory Journey <br />
            <span className="italic font-serif-body text-gold-gradient font-normal">Unfolds</span>
          </h2>
          <p className="text-base text-[#6B5E55] dark:text-[#C4B8AD] max-w-2xl mx-auto">
            From sending your fresh bridal garland or baby tokens to receiving your hand-polished luxury wooden gift casing.
          </p>
        </div>

        {/* Horizontal Stepper Timeline */}
        <div className="relative mb-16">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1 bg-[#D4AF37]/20 -translate-y-6 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {ORDER_PROCESS_STEPS.map((stepItem) => {
              const IconComp = getStepIcon(stepItem.iconName);
              const isActive = activeStep === stepItem.step;

              return (
                <motion.div
                  key={stepItem.step}
                  onClick={() => setActiveStep(stepItem.step)}
                  className={`glass-panel p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-[#D4AF37] shadow-2xl scale-105 bg-white/95 dark:bg-[#1C1815]/95'
                      : 'border-white/70 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md transition-all ${
                          isActive
                            ? 'bg-gradient-to-tr from-[#D4AF37] to-[#8B5E3C] text-white'
                            : 'bg-[#E8D8C4]/40 dark:bg-[#2A2421] text-[#8B5E3C] dark:text-[#D4AF37]'
                        }`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#D4AF37]">
                        0{stepItem.step}
                      </span>
                    </div>

                    {/* Step Titles */}
                    <span className="text-[10px] uppercase font-bold text-[#8B5E3C] dark:text-[#E5C158] block mb-1">
                      {stepItem.duration}
                    </span>
                    <h3 className="font-serif-display text-lg font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-2">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs text-[#6B5E55] dark:text-[#C4B8AD] leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Card */}
        <div className="glass-gold p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-2">
              Ready to Preserve Your Memory?
            </h3>
            <p className="text-sm text-[#6B5E55] dark:text-[#C4B8AD]">
              Our artists are ready to guide you on flower packing and custom engraving choices.
            </p>
          </div>

          <button
            onClick={onOpenCustomizer}
            className="px-8 py-4 rounded-full bg-[#2A2421] dark:bg-[#F5EFE6] text-white dark:text-[#12100E] font-semibold text-sm tracking-wide flex items-center gap-3 shadow-xl hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all whitespace-nowrap"
          >
            <span>Start Custom Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
