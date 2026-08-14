import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Mail,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import { CartItem } from '../types';
import { sendCartOrderEmail } from '../lib/emailUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const totalPrice = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'YASHO10') {
      setDiscountApplied(true);
    }
  };

  // WhatsApp formatted order string
  const generateWhatsAppOrderText = () => {
    const itemsList = cartItems
      .map(
        (i) =>
          `• ${i.product.name} (Qty: ${i.quantity}) - ₹${i.product.price * i.quantity}${
            i.customizationDetails?.names ? ` [Text: ${i.customizationDetails.names}]` : ''
          }`
      )
      .join('\n');

    const message = `Hello YashoWorld Studio! 👋 I would like to place an order for the following handcrafted resin items:

${itemsList}

Subtotal: ₹${subtotal}
${discountApplied ? 'Discount (YASHO10): -10%' : ''}
Total Estimated Amount: ₹${totalPrice}

Please share payment options and flower courier shipping instructions!`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  };

  const handleEmailOrder = () => {
    const items = cartItems.map((i) => ({
      name: i.product.name,
      quantity: i.quantity,
      price: i.product.price,
      category: i.product.category,
      customNote: i.customizationDetails?.names || '',
    }));

    sendCartOrderEmail({
      items,
      subtotal,
      discountAmount,
      totalPrice,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md glass-panel shadow-2xl border-l border-[#D4AF37]/30 flex flex-col justify-between bg-[#FFF8F0] dark:bg-[#1C1815]"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif-display text-xl font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                  Your Memory Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full glass-panel text-[#2A2421] dark:text-[#F5EFE6] hover:bg-white dark:hover:bg-[#2A2421]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto text-[#D4AF37]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-display text-lg font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                    Your cart is empty
                  </h4>
                  <p className="text-xs text-[#6B5E55] dark:text-[#C4B8AD] max-w-xs mx-auto">
                    Explore our resin memory collection or launch the 3D customizer to build your own keepsake.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="glass-panel p-3.5 rounded-2xl border border-white/80 dark:border-[#D4AF37]/20 flex gap-3 relative shadow-sm"
                  >

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif-display text-sm font-bold text-[#2A2421] dark:text-[#F5EFE6] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-[#8B5E3C] dark:text-[#D4AF37] block">
                          {item.product.category}
                        </span>
                        {item.customizationDetails?.names && (
                          <span className="text-[10px] text-[#6B5E55] dark:text-[#C4B8AD] italic block">
                            Note: {item.customizationDetails.names}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-serif-display text-sm font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                          ₹{item.product.price * item.quantity}
                        </span>

                        <div className="flex items-center gap-2 bg-[#E8D8C4]/30 dark:bg-[#12100E] px-2 py-1 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="text-[#6B5E55] dark:text-[#C4B8AD] hover:text-[#2A2421]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="text-[#6B5E55] dark:text-[#C4B8AD] hover:text-[#2A2421]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-400 hover:text-red-600 p-1 self-start"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#D4AF37]/20 bg-white/40 dark:bg-[#12100E]/60 space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (Try YASHO10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/80 dark:bg-[#1C1815] border border-[#D4AF37]/30 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] text-white text-xs font-bold hover:bg-[#B8860B]"
                  >
                    Apply
                  </button>
                </form>

                {discountApplied && (
                  <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold">
                    <span>YASHO10 Promo Applied (10% Off)</span>
                    <span>-₹{discountAmount.toFixed(0)}</span>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-1.5 pt-2 border-t border-[#D4AF37]/15">
                  <div className="flex items-center justify-between text-xs text-[#6B5E55] dark:text-[#C4B8AD]">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#6B5E55] dark:text-[#C4B8AD]">
                    <span>Wooden Gift Box Packaging</span>
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-bold text-[#2A2421] dark:text-[#F5EFE6] pt-1">
                    <span>Total Amount</span>
                    <span className="font-serif-display text-xl text-gold-gradient">
                      ₹{totalPrice.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Instant Order Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleEmailOrder}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#660033] hover:from-[#660033] hover:to-[#8B4513] text-white font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Mail className="w-5 h-5 text-[#F3C06B]" />
                    <span>Order Directly via Email</span>
                  </button>

                  <a
                    href={generateWhatsAppOrderText()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Or Order via WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
