import React from 'react';
import { motion } from 'motion/react';
import { Heart, Baby, Feather, Building2, ArrowRight } from 'lucide-react';

const memories = [
  {
    id: 'wedding',
    title: 'Wedding & Bridal',
    description: 'Varmalas, bouquets, and matrimonial keepsakes encapsulated in crystal-clear resin.',
    icon: Heart,
    delay: 0.1,
  },
  {
    id: 'baby',
    title: 'First Milestones',
    description: "First curls, hospital bracelets, and umbilical cords kept safe for generations.",
    icon: Baby,
    delay: 0.2,
  },
  {
    id: 'memorial',
    title: 'In Loving Memory',
    description: 'Ash encapsulation and funeral flower preservation crafted with deep respect.',
    icon: Feather,
    delay: 0.3,
  },
  {
    id: 'corporate',
    title: 'Corporate Milestones',
    description: 'Celebrate achievements and brand identity with custom luxury resin awards.',
    icon: Building2,
    delay: 0.4,
  },
];

export const ShopByMemory: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/bg-collection.jpg" 
          alt="Crystal Resin Collection" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3 block drop-shadow-md"
          >
            Curated Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-display text-4xl sm:text-5xl lg:text-7xl font-bold text-[#FAF7F2] mb-4 tracking-tight drop-shadow-lg"
          >
            Shop by <span className="italic text-[#F3C06B]">Memory</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#E8D8CD] max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed drop-shadow-md"
          >
            Every piece of art tells a unique story. Discover bespoke resin preservation tailored to the most profound moments of your life journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {memories.map((memory) => {
            const Icon = memory.icon;
            return (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: memory.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[220px] sm:h-[280px] rounded-xl overflow-hidden cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 shadow-xl"
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-colors duration-500">
                    <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </div>
                  
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#F3C06B] transition-colors">
                    {memory.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#E8D8CD] font-light leading-relaxed line-clamp-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {memory.description}
                  </p>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
