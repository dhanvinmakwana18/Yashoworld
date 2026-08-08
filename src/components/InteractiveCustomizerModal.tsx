import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Wand2,
  Sparkles,
  Check,
  Send,
  HelpCircle,
  Layers,
  Palette,
  Ruler,
  Maximize2,
  MessageCircle,
} from 'lucide-react';
import { CustomizerSelection } from '../types';
const foreverRoseBookmarkImg = '/images/gallery/forever_rose_bookmark_real.jpg';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCartCustom: (customItem: any) => void;
}

export const InteractiveCustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  onAddToCartCustom,
}) => {
  const [selection, setSelection] = useState<CustomizerSelection>({
    shape: 'Hexagon',
    size: '10x10 Inches',
    baseWood: 'Walnut Dark Wood',
    memoryItems: ['Dried Wedding Garland Flowers', 'LED Base Lights'],
    goldFoil: 'Full Golden Leaf Flakes',
    engravingText: 'Aarav & Priya • 14.02.2026',
    estimatedPrice: 1499,
  });

  const [activeTab, setActiveTab] = useState<'shape' | 'size' | 'base' | 'items' | 'foil' | 'engraving'>('shape');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Price Calculation Logic (INR ₹750 - ₹2499)
  const recalculatePrice = (updated: CustomizerSelection) => {
    let basePrice = 999;

    // Size multiplier
    if (updated.size === '8x8 Inches') basePrice = 999;
    if (updated.size === '10x10 Inches') basePrice = 1499;
    if (updated.size === '12x12 Inches') basePrice = 1899;
    if (updated.size === '15x15 Inches Grand') basePrice = 2199;

    // Base Wood
    if (updated.baseWood === 'Golden Brass Trim') basePrice += 100;
    if (updated.baseWood === 'White Italian Marble') basePrice += 150;

    // Memory Items
    basePrice += updated.memoryItems.length * 50;

    // Gold foil
    if (updated.goldFoil === 'Full Golden Leaf Flakes') basePrice += 50;
    if (updated.goldFoil === 'Rose Gold Accent') basePrice += 50;

    // Cap at max 2499
    return Math.min(basePrice, 2499);
  };

  const handleUpdate = (key: keyof CustomizerSelection, value: any) => {
    const updated = { ...selection, [key]: value };
    const price = recalculatePrice(updated);
    setSelection({ ...updated, estimatedPrice: price });
  };

  const toggleMemoryItem = (item: string) => {
    const exists = selection.memoryItems.includes(item);
    const updatedItems = exists
      ? selection.memoryItems.filter((i) => i !== item)
      : [...selection.memoryItems, item];
    handleUpdate('memoryItems', updatedItems);
  };

  const shapes: Array<{ name: CustomizerSelection['shape']; path: string }> = [
    { name: 'Hexagon', path: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
    { name: 'Arch', path: 'inset(0 round 50% 50% 0 0)' },
    { name: 'Circle', path: 'circle(50% at 50% 50%)' },
    { name: 'Rectangle', path: 'inset(0 round 12px)' },
    { name: 'Heart', path: 'polygon(50% 15%, 80% 0, 100% 20%, 100% 50%, 50% 95%, 0 50%, 0 20%, 20% 0)' },
  ];

  const sizes: CustomizerSelection['size'][] = [
    '8x8 Inches',
    '10x10 Inches',
    '12x12 Inches',
    '15x15 Inches Grand',
  ];

  const baseWoods: CustomizerSelection['baseWood'][] = [
    'Walnut Dark Wood',
    'Golden Brass Trim',
    'White Italian Marble',
    'Clear Floating Glass',
  ];

  const memoryItemOptions = [
    'Dried Wedding Garland Flowers',
    'Wedding Invitation Card',
    'Baby Wristband / Hospital Socks',
    'Custom Handwritten Vows',
    'Rings Cavity / Mangalsutra Slot',
    'LED Base Lights',
    'Preserved Rose Bouquet',
    'First Birth Photo Tag',
  ];

  const goldFoilOptions: CustomizerSelection['goldFoil'][] = [
    'None',
    'Subtle Gold Specks',
    'Full Golden Leaf Flakes',
    'Rose Gold Accent',
  ];

  // WhatsApp Order Link Generator
  const generateWhatsAppLink = () => {
    const text = `Hello YashoWorld Studio! 👋 I would like to order a custom resin keepsake with these specs:
• Shape: ${selection.shape}
• Size: ${selection.size}
• Base: ${selection.baseWood}
• Memory Items: ${selection.memoryItems.join(', ')}
• Gold Foil: ${selection.goldFoil}
• Engraving: ${selection.engravingText || 'None'}
• Estimated Quote: ₹${selection.estimatedPrice}

Please confirm flower shipping details!`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl glass-panel rounded-3xl border border-[#D4A373]/40 shadow-2xl overflow-hidden z-10 my-auto flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full glass-panel hover:bg-white dark:hover:bg-[#2B231F] text-[#2D2421] dark:text-[#FAF7F2] shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Live 3D Preview Stage */}
          <div className="lg:w-1/2 p-6 sm:p-8 bg-gradient-to-br from-[#FAF7F2] to-[#F8E8EE]/50 dark:from-[#231C18] dark:to-[#2B231F] flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-[#D4A373]/20 relative overflow-hidden">
            <div className="w-full text-center lg:text-left mb-4">
              <span className="text-[11px] font-bold text-[#D4A373] dark:text-[#D8B4E2] uppercase tracking-widest">
                Interactive 3D Preview
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2D2421] dark:text-[#FAF7F2]">
                Your Bespoke Resin Keepsake
              </h3>
            </div>

            {/* Simulated 3D Shape Preview Box */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-6 flex items-center justify-center perspective-1000">
              {/* Floating Glow Halo */}
              <div className="absolute inset-0 bg-[#D4A373]/20 rounded-full blur-2xl animate-pulse-glow" />

              {/* Dynamic Shape Container */}
              <div
                className="w-56 h-56 sm:w-64 sm:h-64 relative transition-all duration-500 shadow-2xl flex items-center justify-center p-6 border-2 border-white/80 dark:border-[#D4A373]/50 overflow-hidden"
                style={{
                  clipPath: shapes.find((s) => s.name === selection.shape)?.path,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,232,238,0.75) 100%)',
                  boxShadow: '0 25px 50px rgba(212, 163, 115, 0.25), inset 0 0 20px rgba(212,163,115,0.3)',
                }}
              >
                {/* Simulated Foil Flakes */}
                {selection.goldFoil !== 'None' && (
                  <div className="absolute inset-0 pointer-events-none opacity-80 shimmer-effect" />
                )}

                {/* Simulated Flower Elements Inside */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center gap-2">
                  <Sparkles className="w-8 h-8 text-[#D4A373] animate-spin" />
                  <span className="font-serif-display text-base font-bold text-[#2D2421] dark:text-[#FAF7F2] px-2 text-center">
                    {selection.engravingText || 'Your Custom Inscription'}
                  </span>
                  <div className="flex flex-wrap gap-1 justify-center max-w-[180px] mt-1">
                    {selection.memoryItems.slice(0, 3).map((item) => (
                      <span key={item} className="text-[9px] bg-[#D4A373]/20 text-[#2D2421] px-2 py-0.5 rounded-full font-medium">
                        {item.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Wooden Base Preview */}
              <div className="absolute -bottom-2 w-64 h-5 rounded-lg bg-gradient-to-r from-[#3A2D28] via-[#2D2421] to-[#3A2D28] shadow-xl border border-[#D4A373]/40 flex items-center justify-center">
                <span className="text-[9px] text-[#FAF7F2] font-mono tracking-wider">
                  {selection.baseWood}
                </span>
              </div>
            </div>

            {/* Dynamic Price Summary */}
            <div className="w-full glass-panel p-4 rounded-2xl border border-[#D4A373]/30 flex items-center justify-between shadow-md">
              <div>
                <span className="text-[11px] text-[#3A3A3A] dark:text-[#E8D8CD] block">
                  Estimated Turnaround: 10-14 Days
                </span>
                <span className="font-serif-display text-2xl font-bold text-[#2D2421] dark:text-[#FAF7F2]">
                  ₹{selection.estimatedPrice}
                </span>
              </div>

              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Customization Wizard Controls */}
          <div className="lg:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-[#D4A373]/20 pb-4">
                <Wand2 className="w-5 h-5 text-[#D4A373]" />
                <h4 className="font-serif-display text-xl font-bold text-[#2D2421] dark:text-[#FAF7F2]">
                  Configure Specifications
                </h4>
              </div>

              {/* Wizard Nav Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
                {[
                  { id: 'shape', label: '1. Shape' },
                  { id: 'size', label: '2. Size' },
                  { id: 'base', label: '3. Base Wood' },
                  { id: 'items', label: '4. Memory Items' },
                  { id: 'foil', label: '5. Gold Foil' },
                  { id: 'engraving', label: '6. Text' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#D4A373] text-white font-bold shadow-sm'
                        : 'bg-white/50 dark:bg-[#231C18] text-[#3A3A3A] dark:text-[#E8D8CD]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              {activeTab === 'shape' && (
                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-[#2D2421] dark:text-[#FAF7F2]">Select Frame Silhouette</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {shapes.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => handleUpdate('shape', s.name)}
                        className={`p-4 rounded-2xl border text-center font-medium text-xs flex flex-col items-center gap-2 transition-all ${
                          selection.shape === s.name
                            ? 'border-[#D4A373] bg-[#D4A373]/10 text-[#2D2421] dark:text-[#D8B4E2] font-bold shadow-sm'
                            : 'border-gray-200 dark:border-gray-700 hover:border-[#D4A373]/50'
                        }`}
                      >
                        <div
                          className="w-10 h-10 bg-[#D4A373]/30 border border-[#D4A373]"
                          style={{ clipPath: s.path }}
                        />
                        <span>{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'size' && (
                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-[#2D2421] dark:text-[#FAF7F2]">Select Dimensions</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => handleUpdate('size', sz)}
                        className={`p-4 rounded-2xl border text-left font-medium text-xs transition-all ${
                          selection.size === sz
                            ? 'border-[#D4A373] bg-[#D4A373]/10 text-[#2D2421] dark:text-[#D8B4E2] font-bold shadow-sm'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <span className="block text-sm font-bold">{sz}</span>
                        <span className="text-[11px] text-[#3A3A3A] dark:text-[#E8D8CD]">Ideal for mantlepiece & desks</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'base' && (
                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-[#2D2421] dark:text-[#FAF7F2]">Select Pedestal Base</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {baseWoods.map((b) => (
                      <button
                        key={b}
                        onClick={() => handleUpdate('baseWood', b)}
                        className={`p-3.5 rounded-2xl border text-left font-medium text-xs transition-all ${
                          selection.baseWood === b
                            ? 'border-[#D4A373] bg-[#D4A373]/10 text-[#2D2421] dark:text-[#D8B4E2] font-bold'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <span>{b}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'items' && (
                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-[#2D2421] dark:text-[#FAF7F2]">Select Memory Items to Embed</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {memoryItemOptions.map((item) => {
                      const selected = selection.memoryItems.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleMemoryItem(item)}
                          className={`p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                            selected
                              ? 'border-[#D4A373] bg-[#D4A373]/15 font-bold text-[#2D2421] dark:text-[#D8B4E2]'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <span>{item}</span>
                          {selected && <Check className="w-4 h-4 text-[#D4A373]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'foil' && (
                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-[#2D2421] dark:text-[#FAF7F2]">Gold Foil Density</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {goldFoilOptions.map((f) => (
                      <button
                        key={f}
                        onClick={() => handleUpdate('goldFoil', f)}
                        className={`p-3.5 rounded-2xl border text-left font-medium text-xs transition-all ${
                          selection.goldFoil === f
                            ? 'border-[#D4A373] bg-[#D4A373]/10 text-[#2D2421] dark:text-[#D8B4E2] font-bold'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <span>{f}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'engraving' && (
                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-[#2D2421] dark:text-[#FAF7F2]">Engraving Text (Names / Wedding Date / Quote)</h5>
                  <input
                    type="text"
                    placeholder="e.g., Aarav & Priya • 14.02.2026"
                    value={selection.engravingText}
                    onChange={(e) => handleUpdate('engravingText', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-[#231C18] border border-[#D4A373]/40 text-sm text-[#2D2421] dark:text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  />
                  <p className="text-xs text-[#3A3A3A] dark:text-[#E8D8CD]">
                    Our calligraphers will laser-engrave this inscription on brass plaque or directly on wood base.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#D4A373]/20 flex items-center gap-3">
              <button
                onClick={() => {
                  onAddToCartCustom({
                    id: `custom-${Date.now()}`,
                    name: `Custom ${selection.shape} Resin Keepsake (${selection.size})`,
                    category: 'Wedding Keepsakes',
                    price: selection.estimatedPrice,
                    rating: 5,
                    reviewsCount: 1,
                    image: foreverRoseBookmarkImg,
                    description: `Custom piece with ${selection.baseWood}, ${selection.goldFoil}, and text "${selection.engravingText}"`,
                    features: selection.memoryItems,
                    dimensions: selection.size,
                    craftingTime: '10-14 Business Days',
                    customizableOptions: selection.memoryItems,
                    resinClarity: 'Ultra Crystal 100%',
                  });
                  onClose();
                }}
                className="flex-1 py-3.5 rounded-xl bg-[#D4A373] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#2D241E] transition-all text-center"
              >
                Add Custom Design to Order List
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
