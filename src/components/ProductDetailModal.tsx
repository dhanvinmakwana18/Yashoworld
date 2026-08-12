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
  Mail,
} from 'lucide-react';
import { Product } from '../types';
import { openEmailClient } from '../lib/emailUtils';

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

  const handleDirectEmailOrder = () => {
    const subject = `[DIRECT ORDER] ${product.name} - ₹${product.price}`;
    const body = `Hello YashoWorld Studio Team,

I would like to order the following item directly via email:

Item: ${product.name}
Category: ${product.category}
Price: ₹${product.price}
${customName ? `Custom Engraving Name: ${customName}\n` : ''}${customDate ? `Custom Date: ${customDate}\n` : ''}
--- SHIPPING & CONTACT DETAILS ---
Name: [Please enter your full name]
Phone: [Please enter your phone number]
Delivery Address: [Please enter your address]

Please reply with payment options and details. Thank you!`;

    openEmailClient('pourfectionbyyashvi@gmail.com', subject, body);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#660033]/65 backdrop-blur-md"
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
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-panel hover:bg-white dark:hover:bg-[#4D0026] text-[#660033] dark:text-[#F5EFE6] shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-[#F5EFE6] dark:bg-[#660033] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/80 dark:border-[#D4AF37]/30 shadow-lg mb-4 bg-gradient-to-br from-[#FAF7F2] to-white dark:from-[#4D0026] dark:to-[#660033] flex flex-col items-center justify-center p-0 text-center">
              {product.imageData ? (
                <img 
                  src={product.imageData} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="p-6">
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#D4A373] mb-4">{product.name}</h3>
                  <p className="text-sm text-[#3A3A3A] dark:text-[#E8D8CD] opacity-90">{product.description}</p>
                </div>
              )}
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass-gold text-[#8B5E3C] dark:text-[#E5C158] text-[10px] font-bold uppercase z-10">
                {product.resinClarity}
              </span>
            </div>
          </div>

          {/* Right Column: Specifications & Customization */}
          <div className="p-6 sm:p-8 overflow-y-auto flex flex-col justify-between bg-[#FFF8F0] dark:bg-[#4D0026]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#8B5E3C] dark:text-[#D4AF37] uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-[#660033] dark:text-[#F5EFE6]">
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>
              </div>

              <h2 className="font-serif-display text-2xl font-bold text-[#660033] dark:text-[#F5EFE6] mb-3 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif-display text-3xl font-bold text-[#660033] dark:text-[#F5EFE6]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#6B5E55] dark:text-[#C4B8AD] line-through">
                    ₹{product.originalPrice}
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
                  <span className="text-xs font-bold text-[#660033] dark:text-[#F5EFE6]">{product.dimensions}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-[10px] text-[#6B5E55] dark:text-[#C4B8AD] block">Turnaround</span>
                  <span className="text-xs font-bold text-[#660033] dark:text-[#F5EFE6]">{product.craftingTime}</span>
                </div>
              </div>

              {/* Personalization Inputs */}
              <div className="space-y-3 mb-6 pt-4 border-t border-[#D4AF37]/20">
                <h4 className="text-xs font-bold text-[#660033] dark:text-[#F5EFE6] flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Optional Engraving Personalization
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Names (e.g., Aarav & Priya)"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/80 dark:bg-[#660033] border border-[#D4AF37]/30 text-xs text-[#660033] dark:text-[#FAF7F2] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Date (e.g., 14.02.2026)"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/80 dark:bg-[#660033] border border-[#D4AF37]/30 text-xs text-[#660033] dark:text-[#FAF7F2] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className="py-3.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA7C11] to-[#8B5E3C] text-white font-semibold text-xs tracking-wide shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleDirectEmailOrder}
                  className="py-3.5 px-3 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#660033] text-white font-semibold text-xs tracking-wide shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#F3C06B]" />
                  <span>Email Order</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCustomizer();
                }}
                className="w-full py-2 rounded-xl glass-panel text-[#8B5E3C] dark:text-[#D4AF37] font-medium text-[11px] text-center hover:bg-white dark:hover:bg-[#4D0026] transition-colors"
              >
                Need custom options? Launch 3D Customizer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
