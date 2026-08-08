import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SafeImage } from './SafeImage';
import {
  Sparkles,
  Star,
  Eye,
  Heart,
  ShoppingBag,
  Wand2,
  Check,
  Search,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS_DATA } from '../data/products';

interface Product3DCardsProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCustomizer: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const Product3DCards: React.FC<Product3DCardsProps> = ({
  onQuickView,
  onAddToCart,
  onOpenCustomizer,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories: ProductCategory[] = [
    'All',
    'Pooja Thalis',
    'Memory Frames',
    'Flower Preservation',
    'Wedding Keepsakes',
    'Photo Frames',
    'Name Plates',
    'Resin Clocks',
    'Wall Decor',
    'Bookmarks',
    'Keychains',
    'Home Decor',
    'Festival Gifts',
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products" aria-label="Curated Resin Art Collection" className="py-24 relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#E8D8C4]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4A373]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#8B4513] dark:text-[#F3C06B]" />
            <span className="text-xs font-semibold tracking-wide text-[#1A1412] dark:text-[#E8D8CD] uppercase">
              Handcrafted Masterpieces
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1412] dark:text-[#FAF7F2] tracking-tight mb-4">
            Curated <span className="italic font-serif-body text-gold-gradient font-normal">Resin Art</span> Collection
          </h2>
          <p className="text-base text-[#382E2B] dark:text-[#E8D8CD] max-w-2xl mx-auto font-medium">
            Explore our handcrafted luxury creations. Each piece is individually cast with real dried flora, gold foil, and crystal UV optical resin.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/80 dark:border-[#D4A373]/25 shadow-lg mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B4513] dark:text-[#F3C06B]" />
              <input
                type="text"
                placeholder="Search memory frames, clocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#231C18] border border-[#8B4513]/30 dark:border-[#D4A373]/30 text-xs sm:text-sm text-[#1A1412] dark:text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
            </div>

            {/* Categories Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#8B4513] dark:bg-[#D4A373] text-white dark:text-[#161210] shadow-md scale-105'
                      : 'bg-white/80 dark:bg-[#2B231F] text-[#382E2B] dark:text-[#E8D8CD] hover:bg-white dark:hover:bg-[#2B231F] border border-gray-200 dark:border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <SlidersHorizontal className="w-4 h-4 text-[#8B4513] dark:text-[#F3C06B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#231C18] border border-[#8B4513]/30 dark:border-[#D4A373]/30 text-xs font-bold text-[#1A1412] dark:text-[#FAF7F2] focus:outline-none"
              >
                <option value="featured">Featured Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3D Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel rounded-2xl border border-white/80 dark:border-[#D4AF37]/25 overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
                >
                  {/* Card Badges */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 flex flex-col gap-1">
                    {product.isBestSeller && (
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#D4A373] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Best Seller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#D8B4E2] text-[#2D2421] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        New Release
                      </span>
                    )}
                  </div>

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-20 p-1.5 sm:p-2 rounded-full glass-panel shadow-md transition-all ${
                      isWishlisted
                        ? 'text-rose-500 fill-rose-500 scale-110'
                        : 'text-[#3A3A3A] dark:text-[#E8D8CD] hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Product Image Container */}
                  <div
                    onClick={() => onQuickView(product)}
                    className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2] dark:bg-[#2B231F]"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Glass Reflection Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(product);
                          }}
                          className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl glass-panel text-[#2D2421] dark:text-[#FAF7F2] text-[11px] sm:text-xs font-semibold flex items-center gap-1 hover:bg-white hover:text-[#2D2421] transition-colors shadow-lg"
                        >
                          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Quick View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#D4A373] hover:bg-[#B8860B] text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-colors shadow-lg"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Clarity */}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] sm:text-[11px] font-bold text-[#8B4513] dark:text-[#F3C06B] uppercase tracking-wider truncate">
                          {product.category}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-bold text-[#1A1412] dark:text-[#FAF7F2] bg-[#FAF4ED] dark:bg-[#2B231F] px-1.5 py-0.5 rounded-full shrink-0 border border-[#8B4513]/20 dark:border-transparent">
                          {product.resinClarity}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-serif-display text-xs sm:text-base font-bold text-[#1A1412] dark:text-[#FAF7F2] line-clamp-2 sm:line-clamp-1 group-hover:text-[#8B4513] dark:group-hover:text-[#F3C06B] transition-colors mb-1.5"
                      >
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2.5">
                        <div className="flex items-center text-[#8B4513] dark:text-[#F3C06B]">
                          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                          <span className="text-[11px] sm:text-xs font-bold text-[#1A1412] dark:text-[#FAF7F2] ml-0.5">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-[#382E2B] dark:text-[#E8D8CD] font-medium">
                          ({product.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Price and Order CTA */}
                    <div className="pt-2 sm:pt-3 border-t border-[#8B4513]/20 dark:border-[#D4A373]/20 flex items-center justify-between gap-1">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-serif-display text-sm sm:text-xl font-bold text-[#1A1412] dark:text-[#FAF7F2]">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] sm:text-xs text-[#382E2B] dark:text-[#E8D8CD] line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">
                          Free Gift Packing
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="p-2 sm:p-2.5 rounded-xl bg-[#8B4513] dark:bg-[#D4A373] text-white dark:text-[#161210] hover:bg-[#1A1412] dark:hover:bg-[#FAF7F2] transition-all shadow-md active:scale-95 shrink-0"
                        title="Add to Cart / Order"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="glass-panel p-12 rounded-3xl text-center max-w-md mx-auto my-12 border border-[#D4AF37]/30">
            <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 animate-spin" />
            <h3 className="font-serif-display text-xl font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-2">
              No matching resin art found
            </h3>
            <p className="text-sm text-[#6B5E55] dark:text-[#C4B8AD] mb-6">
              We create fully customized pieces! Tell us your vision and we will craft it for you.
            </p>
            <button
              onClick={onOpenCustomizer}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] text-white font-medium text-sm flex items-center gap-2 mx-auto shadow-md"
            >
              <Wand2 className="w-4 h-4" />
              <span>Request Custom Design</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
