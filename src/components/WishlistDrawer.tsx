import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, ArrowRight, Trash2, Sparkles, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onOpenCustomizer: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
  onOpenCustomizer,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#660033]/60 dark:bg-black/80 backdrop-blur-xs z-50 transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF7F2] dark:bg-[#2A0818] border-l border-[#D4AF37]/30 shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wishlist-drawer-title"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-white/40 dark:bg-[#3D0B23]/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] dark:bg-[#4D0026] border border-[#D4AF37]/30 flex items-center justify-center text-rose-500 shadow-xs">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2
                    id="wishlist-drawer-title"
                    className="font-serif-display text-xl font-bold text-[#660033] dark:text-[#FAF7F2]"
                  >
                    Saved Keepsakes
                  </h2>
                  <p className="text-xs text-[#8B5E3C] dark:text-[#D4AF37]">
                    {wishlistProducts.length} {wishlistProducts.length === 1 ? 'masterpiece' : 'masterpieces'} in your vault
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close Wishlist"
                className="p-2.5 rounded-full hover:bg-[#FAF7F2] dark:hover:bg-[#4D0026] text-[#660033] dark:text-[#FAF7F2] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {wishlistProducts.length > 0 ? (
                wishlistProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-2xl bg-white/90 dark:bg-[#3D0B23]/90 border border-[#D4AF37]/25 shadow-sm hover:shadow-md transition-all flex gap-4 relative group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => onQuickView(product)}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5EFE6] dark:bg-[#2A0818] shrink-0 border border-[#D4AF37]/20 cursor-pointer relative"
                    >
                      {product.imageData || product.image ? (
                        <img
                          src={product.imageData || product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-2 text-center text-[10px] font-bold text-[#8B5E3C] dark:text-[#D4AF37]">
                          {product.name.slice(0, 15)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            onClick={() => onQuickView(product)}
                            className="font-serif-display text-sm font-bold text-[#660033] dark:text-[#FAF7F2] line-clamp-1 cursor-pointer hover:text-[#8B4513] dark:hover:text-[#F3C06B] transition-colors"
                          >
                            {product.name}
                          </h3>
                          <button
                            onClick={() => onRemoveFromWishlist(product.id)}
                            aria-label={`Remove ${product.name} from wishlist`}
                            className="text-[#660033]/50 dark:text-[#FAF7F2]/50 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#2A0818] text-[#8B5E3C] dark:text-[#D4AF37] font-medium inline-block mt-1">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#D4AF37]/15">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-[#8B4513] dark:text-[#F3C06B]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-[#660033]/40 dark:text-[#FAF7F2]/40 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onRemoveFromWishlist(product.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#8B5E3C] dark:bg-[#D4AF37] text-white dark:text-[#2A0818] text-[11px] font-bold tracking-wider uppercase hover:opacity-90 flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#F5EFE6] dark:bg-[#3D0B23] border border-[#D4AF37]/30 flex items-center justify-center text-[#8B5E3C] dark:text-[#D4AF37] mb-4">
                    <Heart className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-[#660033] dark:text-[#FAF7F2] mb-1">
                    Your Vault is Empty
                  </h3>
                  <p className="text-xs text-[#8B5E3C] dark:text-[#D4AF37] max-w-xs mb-6 leading-relaxed">
                    Save your favorite thalis, wedding floral blocks, and crystal keepsakes to review later or order whenever you're ready.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#8B5E3C] dark:bg-[#D4AF37] text-white dark:text-[#2A0818] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Footer / Custom CTA */}
            {wishlistProducts.length > 0 && (
              <div className="p-6 border-t border-[#D4AF37]/20 bg-white/60 dark:bg-[#3D0B23]/60 backdrop-blur-md space-y-3">
                <button
                  onClick={() => {
                    wishlistProducts.forEach((p) => onAddToCart(p));
                    onClose();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5E3C] to-[#660033] dark:from-[#D4AF37] dark:to-[#AA7C11] text-white dark:text-[#2A0818] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Move All ({wishlistProducts.length}) to Cart</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomizer();
                  }}
                  className="w-full py-2.5 rounded-xl bg-transparent border border-[#D4AF37]/40 text-[#8B4513] dark:text-[#F3C06B] font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#D4AF37]/10 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Looking for Custom Dimensions? Launch 3D Studio</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
