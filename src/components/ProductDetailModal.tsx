import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Clock,
  Heart,
  Wand2,
  Check,
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, customization?: any) => void;
  onOpenCustomizer: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenCustomizer,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [customName, setCustomName] = useState<string>('');
  const [customDate, setCustomDate] = useState<string>('');
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const handleAdd = () => {
    onAddToCart(product, {
      names: customName,
      date: customDate,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-2 max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-panel hover:bg-white dark:hover:bg-[#2A2421] text-[#2A2421] dark:text-[#F5EFE6] shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-[#F5EFE6] dark:bg-[#12100E] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/80 dark:border-[#D4AF37]/30 shadow-lg mb-4">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass-gold text-[#8B5E3C] dark:text-[#E5C158] text-[10px] font-bold uppercase">
                {product.resinClarity}
              </span>
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Customization */}
          <div className="p-6 sm:p-8 overflow-y-auto flex flex-col justify-between bg-[#FFF8F0] dark:bg-[#1C1815]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#8B5E3C] dark:text-[#D4AF37] uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>
              </div>

              <h2 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-3 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif-display text-3xl font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#6B5E55] dark:text-[#C4B8AD] line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#6B5E55] dark:text-[#C4B8AD] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Crafting Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass-panel p-3 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-[10px] text-[#6B5E55] dark:text-[#C4B8AD] block">Dimensions</span>
                  <span className="text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6]">{product.dimensions}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-[10px] text-[#6B5E55] dark:text-[#C4B8AD] block">Turnaround</span>
                  <span className="text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6]">{product.craftingTime}</span>
                </div>
              </div>

              {/* Personalization Inputs */}
              <div className="space-y-3 mb-6 pt-4 border-t border-[#D4AF37]/20">
                <h4 className="text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6] flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Optional Engraving Personalization
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Names (e.g., Aarav & Priya)"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/80 dark:bg-[#12100E] border border-[#D4AF37]/30 text-xs focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Date (e.g., 14.02.2026)"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/80 dark:bg-[#12100E] border border-[#D4AF37]/30 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAdd}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA7C11] to-[#8B5E3C] text-white font-semibold text-sm tracking-wide shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Your Selection!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Order Selection
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenCustomizer();
                }}
                className="w-full py-2.5 rounded-xl glass-panel text-[#8B5E3C] dark:text-[#D4AF37] font-medium text-xs text-center hover:bg-white dark:hover:bg-[#2A2421] transition-colors"
              >
                Need standard customization? Launch 3D Customizer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
