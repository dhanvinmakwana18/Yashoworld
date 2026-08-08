import React, { useState } from 'react';
import { Sparkles, LayoutGrid, PackageCheck, CheckCircle2, Gift, ArrowRight } from 'lucide-react';
import { ORDER_PROCESS_STEPS } from '../data/timeline';
import { useGsapStagger } from '../utils/gsapAnimations';

interface OrderProcessTimelineProps {
  onOpenCustomizer: () => void;
}

export const OrderProcessTimeline: React.FC<OrderProcessTimelineProps> = ({ onOpenCustomizer }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const containerRef = useGsapStagger<HTMLDivElement>('.gsap-process-step');

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
    <section id="process" aria-label="Order Process Timeline" className="py-24 relative overflow-hidden bg-[#FAF7F2] dark:bg-[#231C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4A373]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4A373]" />
            <span className="text-xs font-semibold tracking-wide text-[#2D2421] dark:text-[#E8D8CD] uppercase">
              Seamless Ordering Experience
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2421] dark:text-[#FAF7F2] tracking-tight mb-4">
            How Your Memory Journey <br />
            <span className="italic font-serif-body text-gold-gradient font-normal">Unfolds</span>
          </h2>
          <p className="text-base text-[#3A3A3A] dark:text-[#E8D8CD] max-w-2xl mx-auto">
            From sending your fresh bridal garland or baby tokens to receiving your hand-polished luxury wooden gift casing.
          </p>
        </div>

        {/* Horizontal Stepper Timeline */}
        <div className="relative mb-16">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1 bg-[#D4A373]/20 -translate-y-6 z-0" />
          
          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {ORDER_PROCESS_STEPS.map((stepItem) => {
              const IconComp = getStepIcon(stepItem.iconName);
              const isActive = activeStep === stepItem.step;

              return (
                <div
                  key={stepItem.step}
                  onClick={() => setActiveStep(stepItem.step)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStep(stepItem.step);
                    }
                  }}
                  aria-pressed={isActive}
                  aria-label={`Step ${stepItem.step}: ${stepItem.title}`}
                  className={`gsap-process-step glass-panel p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-[#D4A373] shadow-2xl scale-105 bg-white/95 dark:bg-[#2B231F]/95'
                      : 'border-white/70 dark:border-[#D4A373]/20 hover:border-[#D4A373]/50'
                  }`}
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md transition-all ${
                          isActive
                            ? 'bg-gradient-to-tr from-[#D4A373] to-[#D8B4E2] text-white'
                            : 'bg-[#F8E8EE] dark:bg-[#2B231F] text-[#D4A373] dark:text-[#D8B4E2]'
                        }`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#D4A373]">
                        0{stepItem.step}
                      </span>
                    </div>

                    {/* Step Titles */}
                    <span className="text-[10px] uppercase font-bold text-[#D4A373] dark:text-[#D8B4E2] block mb-1">
                      {stepItem.duration}
                    </span>
                    <h3 className="font-serif-display text-lg font-bold text-[#2D2421] dark:text-[#FAF7F2] mb-2">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs text-[#3A3A3A] dark:text-[#E8D8CD] leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Card */}
        <div className="glass-gold p-8 sm:p-10 rounded-3xl border border-[#D4A373]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-serif-display text-2xl font-bold text-[#2D2421] dark:text-[#FAF7F2] mb-2">
              Ready to Preserve Your Memory?
            </h3>
            <p className="text-sm text-[#3A3A3A] dark:text-[#E8D8CD]">
              Our artists are ready to guide you on flower packing and custom engraving choices.
            </p>
          </div>

          <button
            onClick={onOpenCustomizer}
            className="px-8 py-4 rounded-full bg-[#D4A373] text-white font-semibold text-sm tracking-wide flex items-center gap-3 shadow-xl hover:bg-[#2D241E] transition-all whitespace-nowrap focus:outline-hidden focus:ring-2 focus:ring-[#D4A373]"
          >
            <span>Start Custom Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
