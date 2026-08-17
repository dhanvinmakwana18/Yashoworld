import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, LayoutGrid, PackageCheck, CheckCircle2, Gift } from 'lucide-react';
import { ORDER_PROCESS_STEPS } from '../data/timeline';

interface OrderProcessTimelineProps {
  onOpenCustomizer: () => void;
}

// Sub-component to follow the Rules of Hooks for useTransform
const StepImage = ({ 
  step, 
  index, 
  totalSteps, 
  scrollYProgress, 
  imageSrc 
}: { 
  step: any, 
  index: number, 
  totalSteps: number, 
  scrollYProgress: any, 
  imageSrc: string 
}) => {
  const stepProgress = 1 / totalSteps;
  
  let input: number[];
  let output: number[];

  if (index === 0) {
    // First image is fully visible at start
    input = [0, 0.5 * stepProgress, stepProgress];
    output = [1, 1, 0];
  } else if (index === totalSteps - 1) {
    // Last image stays visible at end
    input = [(index - 1) * stepProgress, (index - 0.5) * stepProgress, 1];
    output = [0, 1, 1];
  } else {
    // Middle images fade in and out
    input = [(index - 0.5) * stepProgress, index * stepProgress, (index + 0.5) * stepProgress];
    output = [0, 1, 0];
  }
  
  // Ensure values are strictly increasing to prevent WAAPI crash
  for (let i = 1; i < input.length; i++) {
    if (input[i] <= input[i - 1]) {
      input[i] = input[i - 1] + 0.001;
    }
  }
  
  const opacity = useTransform(scrollYProgress, input, output);

  return (
    <motion.img
      src={imageSrc}
      alt={step.title}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity }}
      onError={(e) => {
        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80';
      }}
    />
  );
};

export const OrderProcessTimeline: React.FC<OrderProcessTimelineProps> = ({ onOpenCustomizer }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutGrid': return LayoutGrid;
      case 'PackageCheck': return PackageCheck;
      case 'Sparkles': return Sparkles;
      case 'CheckCircle2': return CheckCircle2;
      case 'Gift': return Gift;
      default: return Sparkles;
    }
  };

  const images = [
    '/images/gallery/varmala_hex.jpg',
    '/images/gallery/shipping_box.jpg',
    '/images/gallery/pouring_resin.jpg',
    '/images/gallery/polishing.jpg',
    '/images/gallery/gift_box.jpg'
  ];

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="relative w-full min-h-screen text-[#FAF7F2]"
    >
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/bg-process.jpg" 
          alt="Molten Gold Resin Process" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row relative z-10">
        
        {/* Left Side: Sticky Visuals */}
        <div className="w-full md:w-1/2 md:sticky top-0 h-[60vh] md:h-screen flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl glass-panel">
            {ORDER_PROCESS_STEPS.map((step, index) => (
              <StepImage 
                key={step.step}
                step={step}
                index={index}
                totalSteps={ORDER_PROCESS_STEPS.length}
                scrollYProgress={scrollYProgress}
                imageSrc={images[index]}
              />
            ))}
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#660033]/60 via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Right Side: Scrolling Text Content */}
        <div className="w-full md:w-1/2 py-[10vh] md:py-[50vh] flex flex-col gap-[30vh]">
          {/* Intro Header */}
          <div className="mb-[20vh]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                The Artisanal Journey
              </span>
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              How Your Memory <br />
              <span className="italic text-[#D4AF37] font-normal">Unfolds</span>
            </h2>
            <p className="text-lg font-light text-[#5D4E42] dark:text-[#C4B8AD] max-w-md leading-relaxed">
              From fresh flowers to a crystallized masterpiece. Explore our meticulous 14-day preservation process.
            </p>
          </div>

          {/* Steps */}
          {ORDER_PROCESS_STEPS.map((stepItem, index) => {
            const IconComp = getStepIcon(stepItem.iconName);
            return (
              <motion.div 
                key={stepItem.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px", once: false }}
                transition={{ duration: 0.6 }}
                className="max-w-lg glass-panel p-8 md:p-12 rounded-[2rem] border border-[#D4AF37]/20 shadow-xl relative"
              >
                {/* Connecting Line between steps (except last) */}
                {index !== ORDER_PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute left-12 bottom-[-30vh] w-px h-[30vh] bg-gradient-to-b from-[#D4AF37]/40 to-transparent z-[-1]" />
                )}
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#660033] to-[#8B4513] text-[#FAF7F2] flex items-center justify-center shadow-lg relative overflow-hidden">
                    <IconComp className="w-8 h-8 relative z-10" />
                    <div className="absolute inset-0 bg-[#D4AF37] opacity-20 mix-blend-overlay" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] block mb-1">
                      Step 0{stepItem.step} — {stepItem.duration}
                    </span>
                    <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-[#2A0818] dark:text-[#FAF7F2]">
                      {stepItem.title}
                    </h3>
                  </div>
                </div>
                
                <h4 className="text-[#8B4513] dark:text-[#D4AF37] font-semibold text-lg mb-4">
                  {stepItem.subtitle}
                </h4>
                <p className="text-[#5D4E42] dark:text-[#C4B8AD] leading-relaxed font-light text-base md:text-lg">
                  {stepItem.description}
                </p>
                
                {stepItem.step === 1 && (
                  <button 
                    onClick={onOpenCustomizer}
                    className="mt-8 px-6 py-3 rounded-full bg-[#2A0818] text-[#D4AF37] dark:bg-[#D4AF37] dark:text-[#2A0818] font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Start Customizing
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
