import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ZoomIn, X, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { GALLERY_DATA } from '../data/gallery';
import { GalleryItem } from '../types';

interface LuxuryGalleryProps {
  onOpenCustomizer: () => void;
}

export const LuxuryGallery: React.FC<LuxuryGalleryProps> = ({ onOpenCustomizer }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [likesState, setLikesState] = useState<{ [id: string]: number }>({});

  const tags = ['All', 'Weddings', 'Baby Memories', 'Home Decor', 'Anniversary', 'Name Plates', 'Festival Gifts'];

  const filteredGallery = selectedTag === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === selectedTag);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#F5EFE6] dark:bg-[#1C1815]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4AF37]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-wide text-[#8B5E3C] dark:text-[#E5C158] uppercase">
              Pinterest Luxury Visual Journal
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2421] dark:text-[#F5EFE6] tracking-tight mb-4">
            Preserved Memory <span className="italic font-serif-body text-gold-gradient font-normal">Gallery</span>
          </h2>
          <p className="text-base text-[#6B5E55] dark:text-[#C4B8AD] max-w-2xl mx-auto">
            Step inside our visual showcase. Floating glass frames exhibiting real bridal garlands, baby footprints, and custom residential entrance plates.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-8 no-scrollbar">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] text-white shadow-md scale-105'
                  : 'bg-white/60 dark:bg-[#2A2421]/60 text-[#6B5E55] dark:text-[#C4B8AD] hover:bg-white dark:hover:bg-[#2A2421]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGallery.map((item) => {
            const currentLikes = item.likes + (likesState[item.id] || 0);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setActiveItem(item)}
                className="glass-panel p-3 rounded-3xl border border-white/80 dark:border-[#D4AF37]/25 overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer group relative flex flex-col justify-between"
              >
                {/* Floating Glass Frame Wrap */}
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#FFF8F0] dark:bg-[#12100E]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Golden Sparkle Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full glass-gold text-white text-[10px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className="p-2 rounded-full glass-panel text-white hover:text-red-400 transition-colors flex items-center gap-1 text-xs"
                      >
                        <Heart className="w-4 h-4 fill-current text-red-500" />
                        <span>{currentLikes}</span>
                      </button>
                    </div>

                    <div>
                      <h4 className="font-serif-display text-lg font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/80 line-clamp-2 mb-3">
                        {item.story}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#D4AF37]">
                        <ZoomIn className="w-4 h-4" /> Expand Memory Story
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Story Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl glass-panel rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[85vh]"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full glass-panel text-[#2A2421] dark:text-[#F5EFE6]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-square md:aspect-auto overflow-hidden bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#FFF8F0] dark:bg-[#1C1815]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#8B5E3C] dark:text-[#E5C158] text-xs font-bold uppercase">
                      {activeItem.category}
                    </span>
                    <span className="text-xs text-[#6B5E55] dark:text-[#C4B8AD] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {activeItem.date}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-4">
                    {activeItem.title}
                  </h3>

                  <div className="glass-panel p-4 rounded-2xl border border-[#D4AF37]/20 mb-6">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                      Client Story Note
                    </h4>
                    <p className="text-sm text-[#6B5E55] dark:text-[#C4B8AD] leading-relaxed italic font-serif-body">
                      "{activeItem.story}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onOpenCustomizer();
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <span>Request Similar Custom Piece</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
