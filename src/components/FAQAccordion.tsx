import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';

export const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);
  const [faqQuery, setFaqQuery] = useState<string>('');

  const filteredFaqs = FAQ_DATA.filter(
    (item) =>
      item.question.toLowerCase().includes(faqQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(faqQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#FFF8F0] dark:bg-[#12100E]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4AF37]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-wide text-[#8B5E3C] dark:text-[#E5C158] uppercase">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2421] dark:text-[#F5EFE6] tracking-tight mb-4">
            Everything You Need to <span className="italic font-serif-body text-gold-gradient font-normal">Know</span>
          </h2>
          <p className="text-base text-[#6B5E55] dark:text-[#C4B8AD] max-w-2xl mx-auto">
            Got questions about flower packing, resin yellowing protection, or delivery? We have answers.
          </p>
        </div>

        {/* Search input */}
        <div className="relative max-w-xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B5E3C] dark:text-[#D4AF37]" />
          <input
            type="text"
            placeholder="Search questions (e.g. shipping, yellowing, care)..."
            value={faqQuery}
            onChange={(e) => setFaqQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl glass-panel border border-[#D4AF37]/30 text-sm text-[#2A2421] dark:text-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="glass-panel rounded-2xl border border-white/80 dark:border-[#D4AF37]/20 overflow-hidden shadow-md transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif-display text-lg font-bold text-[#2A2421] dark:text-[#F5EFE6] hover:text-[#D4AF37] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#8B5E3C] dark:text-[#E5C158] text-[10px] uppercase font-sans font-bold tracking-wider">
                      {item.category}
                    </span>
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-[#6B5E55] dark:text-[#C4B8AD] leading-relaxed border-t border-[#D4AF37]/10 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
