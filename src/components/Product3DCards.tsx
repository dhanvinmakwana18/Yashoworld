import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const categories: ProductCategory[] = [
    'All',
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

  // 3D Card Tilt mouse handler
  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#E8D8C4]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4AF37]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-wide text-[#8B5E3C] dark:text-[#E5C158] uppercase">
              Handcrafted Masterpieces
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2421] dark:text-[#F5EFE6] tracking-tight mb-4">
            Curated <span className="italic font-serif-body text-gold-gradient font-normal">Resin Art</span> Collection
          </h2>
          <p className="text-base text-[#6B5E55] dark:text-[#C4B8AD] max-w-2xl mx-auto">
            Explore our handcrafted luxury creations. Each piece is individually cast with real dried flora, 24K gold foil, and crystal UV optical resin.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/70 dark:border-[#D4AF37]/20 shadow-lg mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B5E3C] dark:text-[#D4AF37]" />
              <input
                type="text"
                placeholder="Search memory frames, clocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/80 dark:bg-[#12100E]/80 border border-[#D4AF37]/30 text-xs sm:text-sm text-[#2A2421] dark:text-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            {/* Categories Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] text-white shadow-md scale-105'
                      : 'bg-white/50 dark:bg-[#2A2421]/60 text-[#6B5E55] dark:text-[#C4B8AD] hover:bg-white dark:hover:bg-[#2A2421]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <SlidersHorizontal className="w-4 h-4 text-[#8B5E3C] dark:text-[#D4AF37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#12100E]/80 border border-[#D4AF37]/30 text-xs font-medium text-[#2A2421] dark:text-[#F5EFE6] focus:outline-none"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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
                  onMouseMove={(e) => handleMouseMoveCard(e, product.id)}
                  onMouseLeave={handleMouseLeaveCard}
                  onMouseEnter={() => setHoveredCardId(product.id)}
                  className="glass-panel rounded-2xl border border-white/80 dark:border-[#D4AF37]/25 overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, box-shadow 0.3s' }}
                >
                  {/* Card Badges */}
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Best Seller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="px-2.5 py-1 rounded-full bg-[#8B5E3C] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
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
                    className={`absolute top-3 right-3 z-20 p-2 rounded-full glass-panel shadow-md transition-all ${
                      isWishlisted
                        ? 'text-red-500 fill-red-500 scale-110'
                        : 'text-[#6B5E55] dark:text-[#C4B8AD] hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Product Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F5EFE6] dark:bg-[#1C1815]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Glass Reflection Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onQuickView(product)}
                          className="px-3.5 py-2 rounded-xl glass-panel text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-white hover:text-[#2A2421] transition-colors shadow-lg"
                        >
                          <Eye className="w-3.5 h-3.5" /> Quick View
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#B8860B] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Clarity */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-[#8B5E3C] dark:text-[#D4AF37] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-[10px] text-[#6B5E55] dark:text-[#C4B8AD] bg-[#E8D8C4]/40 dark:bg-[#2A2421] px-2 py-0.5 rounded-full">
                          {product.resinClarity}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-serif-display text-base font-bold text-[#2A2421] dark:text-[#F5EFE6] line-clamp-1 group-hover:text-[#D4AF37] transition-colors mb-2"
                      >
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center text-[#D4AF37]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6] ml-1">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-[#6B5E55] dark:text-[#C4B8AD]">
                          ({product.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Price and Order CTA */}
                    <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif-display text-xl font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#6B5E55] dark:text-[#C4B8AD] line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                          Free Gift Packing
                        </span>
                      </div>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-2.5 rounded-xl bg-[#2A2421] dark:bg-[#F5EFE6] text-white dark:text-[#12100E] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all shadow-md"
                        title="Add to Cart / Order"
                      >
                        <ShoppingBag className="w-4 h-4" />
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
