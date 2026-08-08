import React, { useState } from 'react';
import { Sparkles, Heart, Wand2, ChevronRight, ShieldCheck, Check } from 'lucide-react';
import { SafeImage } from './SafeImage';
const foreverRoseBookmarkImg = '/images/gallery/regenerated_image_1786194115113.png';
const thaliRedLakshmiGaneshImg = '/images/gallery/regenerated_image_1786190493138.jpg';
const preservedRoseCoasterImg = '/images/gallery/flower_preservation_art.jpg';

interface HeroLuxuryShowcaseProps {
  onOpenCustomizer: () => void;
}

const ARTWORK_PRESETS = [
  {
    id: 'artwork-1',
    title: '"Forever" Rose Resin Bookmark',
    subtitle: 'Real Dried Rose • Gold Foil • Optical Clarity',
    tag: 'Bestseller Keepsake',
    image: foreverRoseBookmarkImg,
  },
  {
    id: 'artwork-2',
    title: 'Crimson Lakshmi-Ganesha Divine Pooja Thali',
    subtitle: 'Golden Shubh-Labh • Handcrafted Idols • Vivid Red Swirl',
    tag: 'Divine Collection',
    image: thaliRedLakshmiGaneshImg,
  },
  {
    id: 'artwork-3',
    title: 'Real Dried Rose & Pearl Resin Coaster',
    subtitle: 'Preserved Red Rose • Pink Bougainvillea • Gold Leaf Flakes',
    tag: 'Signature Artisan',
    image: preservedRoseCoasterImg,
  },
];

export const HeroLuxuryShowcase: React.FC<HeroLuxuryShowcaseProps> = ({ onOpenCustomizer }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentArtwork = ARTWORK_PRESETS[activeIdx];

  return (
    <div className="w-full max-w-[540px] mx-auto relative group">
      {/* Soft Rose Gold & Pastel Backdrop Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A373]/30 via-[#F8E8EE]/50 to-[#D8B4E2]/30 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Main Glass Frame Showcase */}
      <div className="relative bg-white/80 dark:bg-[#2B231F]/90 backdrop-blur-xl border border-white/80 dark:border-[#D4A373]/30 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[540px] transition-all duration-500">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-4 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-gold border border-[#D4A373]/40 text-[10px] uppercase tracking-widest font-bold text-[#2D2421] dark:text-[#E8D8CD] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>{currentArtwork.tag}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#3A3A3A] dark:text-[#E8D8CD] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
            <span>UV Protected Glass</span>
          </div>
        </div>

        {/* Center High-Definition Resin Artwork Image Frame */}
        <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-white/60 dark:border-[#D4A373]/20 bg-[#FAF7F2] dark:bg-[#231C18] shadow-inner flex items-center justify-center my-2 group/img">
          <SafeImage
            src={currentArtwork.image}
            alt={currentArtwork.title}
            priority={true}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Crystal Resin Gloss Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/20 pointer-events-none" />

          {/* Quick Customizer Floating Badge */}
          <button
            onClick={onOpenCustomizer}
            className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[#D4A373] hover:bg-[#2D241E] text-white text-xs font-semibold tracking-wide backdrop-blur-md shadow-lg flex items-center gap-2 transition-all group-hover/img:translate-y-0 translate-y-1"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-100" />
            <span>Customize This Style</span>
          </button>
        </div>

        {/* Artwork Description & Preset Switcher Controls */}
        <div className="mt-2 z-10">
          <div className="mb-4">
            <h3 className="text-lg font-serif font-bold text-[#2D2421] dark:text-[#FAF7F2] leading-snug">
              {currentArtwork.title}
            </h3>
            <p className="text-xs text-[#3A3A3A] dark:text-[#E8D8CD] font-medium mt-1">
              {currentArtwork.subtitle}
            </p>
          </div>

          {/* Preset Selector Thumbnails */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#D4A373]/20">
            {ARTWORK_PRESETS.map((preset, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-1.5 rounded-xl border text-left transition-all flex items-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-[#D4A373] ${
                    isSelected
                      ? 'bg-white dark:bg-[#231C18] border-[#D4A373] shadow-md scale-102'
                      : 'bg-white/50 dark:bg-[#231C18]/50 border-transparent hover:border-[#D4A373]/50 opacity-80 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={preset.image}
                    alt={preset.title}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="hidden sm:block overflow-hidden">
                    <div className="text-[10px] font-bold text-[#2D2421] dark:text-[#FAF7F2] truncate">
                      Option 0{idx + 1}
                    </div>
                    <div className="text-[9px] text-[#D4A373] dark:text-[#D8B4E2] truncate font-medium">
                      {preset.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
