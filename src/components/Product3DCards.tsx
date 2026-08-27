import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Star,
  Eye,
  Heart,
  ShoppingBag,
  Wand2,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useGsapStagger } from '../utils/gsapAnimations';

interface Product3DCardsProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCustomizer: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  products: Product[];
}

export const Product3DCards: React.FC<Product3DCardsProps> = ({
  onQuickView,
  onAddToCart,
  onOpenCustomizer,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
  onSearchChange,
  products,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [selectedClarity, setSelectedClarity] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const activeSearchQuery = searchQuery !== undefined ? searchQuery : localSearchQuery;

  const staggerRef = useGsapStagger<HTMLDivElement>('.gsap-stagger-item', [
    selectedCategory,
    activeSearchQuery,
    sortBy,
    selectedClarity,
    viewMode,
  ]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearchQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  const categories: ProductCategory[] = [
    'All',
    'Pooja Thalis',
    'Wedding Keepsakes',
    'Flower Preservation',
    'Name Plates',
    'Memory Frames',
    'Resin Clocks',
    'Photo Frames',
    'Bookmarks',
    'Home Decor',
  ];

  const clarities = ['All', 'Ultra Crystal 100%', 'UV Protected Glass-Grade', 'Diamond Gloss'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        const matchesClarity =
          selectedClarity === 'All' || product.resinClarity === selectedClarity;
        const matchesSearch =
          product.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(activeSearchQuery.toLowerCase());
        return matchesCategory && matchesClarity && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default order
      });
  }, [products, selectedCategory, selectedClarity, activeSearchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedClarity('All');
    setLocalSearchQuery('');
    if (onSearchChange) onSearchChange('');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' || selectedClarity !== 'All' || activeSearchQuery.trim() !== '';

  return (
    <section id="products" aria-label="Curated Resin Art Collection" className="w-full min-h-screen min-h-[800px] py-20 lg:py-28 relative">
      {/* Subtle Warm Lighting Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#FAF7F2]/20 to-transparent dark:from-[#D4AF37]/5 dark:via-[#660033]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] dark:bg-[#3D0B23] border border-[#D4AF37]/30 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#8B4513] dark:text-[#F3C06B]" />
            <span className="text-[11px] font-bold tracking-widest text-[#8B4513] dark:text-[#F3C06B] uppercase font-sans">
              Bespoke Artisan Vault
            </span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#660033] dark:text-[#FAF7F2] tracking-tight mb-4">
            Curated <span className="italic font-serif-body text-[#8B4513] dark:text-[#F3C06B] font-normal">Resin Art</span> Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#4A3728] dark:text-[#E8D8CD] max-w-2xl mx-auto font-medium leading-relaxed">
            Every piece is individually hand-cast with UV-stabilized crystal resin, genuine gold leaf flakes, and preserved botanical flora.
          </p>
        </div>

        {/* Master Filter Toolbar */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/80 dark:border-[#D4AF37]/30 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input with quick clear */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B4513] dark:text-[#F3C06B]" />
              <input
                type="text"
                placeholder="Search keepsakes, thalis, frames..."
                value={activeSearchQuery}
                onChange={handleSearchInputChange}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/90 dark:bg-[#2A0818]/90 border border-[#D4AF37]/30 text-xs sm:text-sm text-[#660033] dark:text-[#FAF7F2] placeholder-[#8B5E3C]/60 dark:placeholder-[#E8D8CD]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              {activeSearchQuery && (
                <button
                  onClick={() => {
                    setLocalSearchQuery('');
                    if (onSearchChange) onSearchChange('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B5E3C] dark:text-[#D4AF37] hover:opacity-75"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Pills Scroller */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar flex-1 lg:max-w-2xl">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                      isActive
                        ? 'bg-[#8B4513] dark:bg-[#D4AF37] text-white dark:text-[#2A0818] border-[#8B4513] dark:border-[#D4AF37] shadow-sm scale-105'
                        : 'bg-white/80 dark:bg-[#3D0B23]/70 text-[#660033] dark:text-[#E8D8CD] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Utility Controls (Sort & View Mode) */}
            <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#D4AF37]/20">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B4513] dark:text-[#F3C06B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products"
                  className="px-2.5 py-2 rounded-xl bg-white/90 dark:bg-[#2A0818]/90 border border-[#D4AF37]/30 text-xs font-bold text-[#660033] dark:text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="featured">Curated Order</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Grid / List view toggle */}
              <div className="flex items-center gap-1 bg-white/80 dark:bg-[#2A0818]/80 p-1 rounded-xl border border-[#D4AF37]/20">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid View"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#8B5E3C] text-white dark:bg-[#D4AF37] dark:text-[#2A0818] shadow-xs'
                      : 'text-[#660033] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#3D0B23]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List View"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#8B5E3C] text-white dark:bg-[#D4AF37] dark:text-[#2A0818] shadow-xs'
                      : 'text-[#660033] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#3D0B23]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Badges & Quick Stats */}
          <div className="mt-3 pt-3 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#8B5E3C] dark:text-[#D4AF37] font-semibold">
                Showing <strong className="text-[#660033] dark:text-[#FAF7F2]">{filteredProducts.length}</strong> creations
              </span>

              {/* Clarity Filter Chips */}
              <div className="hidden sm:flex items-center gap-1.5 ml-2 pl-2 border-l border-[#D4AF37]/20">
                <span className="text-[11px] text-[#8B5E3C]/80 dark:text-[#D4AF37]/80">Clarity:</span>
                {clarities.map((clr) => (
                  <button
                    key={clr}
                    onClick={() => setSelectedClarity(clr)}
                    className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${
                      selectedClarity === clr
                        ? 'bg-[#D4AF37] text-[#2A0818] font-bold shadow-xs'
                        : 'text-[#660033] dark:text-[#E8D8CD] hover:bg-white/50'
                    }`}
                  >
                    {clr}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Container */}
        <div
          ref={staggerRef}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 min-h-[400px]'
              : 'flex flex-col gap-4 min-h-[400px]'
          }
          id="product-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              if (viewMode === 'list') {
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="gsap-stagger-item product-card w-full flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white dark:bg-[#1A0B12] p-4 border border-[#8B5E3C]/10 dark:border-[#D4AF37]/20 hover:shadow-xl transition-shadow duration-300 relative group"
                  >
                    {/* Image */}
                    <div
                      onClick={() => onQuickView(product)}
                      className="relative w-full sm:w-48 sm:h-48 aspect-square sm:aspect-auto shrink-0 overflow-hidden bg-[#FAF7F2] dark:bg-[#2A0818] cursor-pointer"
                    >
                      {product.imageData || product.image ? (
                        <img
                          src={product.imageData || product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                          <h4 className="font-serif-display font-bold text-sm text-[#8B4513] dark:text-[#F3C06B]">
                            {product.name}
                          </h4>
                        </div>
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#FAF7F2]/90 dark:bg-[#1A0B12]/90 text-[#8B5E3C] dark:text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm border border-[#8B5E3C]/10 dark:border-[#D4AF37]/20">
                        {product.resinClarity}
                      </span>
                    </div>

                    {/* List Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full py-1">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold text-[#8B5E3C] dark:text-[#D4AF37] uppercase tracking-[0.15em] opacity-90">
                            {product.category}
                          </span>
                          <button
                            onClick={() => onToggleWishlist(product.id)}
                            aria-label="Toggle Wishlist"
                            className={`p-2 rounded-full transition-all duration-300 ${isWishlisted ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' : 'text-[#660033]/60 dark:text-[#FAF7F2]/60 hover:text-rose-500 hover:bg-[#FAF7F2] dark:hover:bg-[#2A0818]'}`}
                          >
                            <Heart
                              className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
                            />
                          </button>
                        </div>

                        <h3
                          onClick={() => onQuickView(product)}
                          className="font-serif-display text-lg md:text-xl font-medium text-[#2A0818] dark:text-[#FAF7F2] hover:text-[#8B4513] cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-[#4A3728]/80 dark:text-[#E8D8CD]/70 line-clamp-2 mt-2 font-light leading-relaxed">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px]">
                          <div className="flex items-center gap-1 opacity-80">
                            <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                            <span className="font-medium text-[#2A0818] dark:text-[#FAF7F2]">{product.rating}</span>
                            <span className="text-[#2A0818]/60 dark:text-[#FAF7F2]/60">
                              ({product.reviewsCount} reviews)
                            </span>
                          </div>
                          <span className="text-[#D4AF37]/50">✦</span>
                          <span className="text-[#8B5E3C] dark:text-[#D4AF37]/80 font-medium">
                            {product.dimensions}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Pricing & Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-5 pt-4 border-t border-[#8B5E3C]/10 dark:border-[#D4AF37]/20 gap-4">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif-display text-xl font-bold text-[#660033] dark:text-[#F3C06B]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-[#2A0818]/40 dark:text-[#FAF7F2]/40 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onQuickView(product)}
                            className="px-5 py-2.5 bg-white dark:bg-[#1A0B12] border border-[#8B5E3C]/20 dark:border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-[0.2em] text-[#660033] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#2A0818] transition-colors"
                          >
                            Quick View
                          </button>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="px-6 py-2.5 bg-[#FAF7F2] dark:bg-[#2A0818] text-[#8B5E3C] dark:text-[#D4AF37] border border-[#8B5E3C]/10 dark:border-[#D4AF37]/20 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#8B5E3C] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#1A0B12] transition-colors flex items-center gap-2"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Standard Grid Card (Luxury Upgrade)
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="gsap-stagger-item product-card bg-white dark:bg-[#1A0B12] rounded-none border border-[#8B5E3C]/10 dark:border-[#D4AF37]/20 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col group relative"
                >
                  {/* Badges - Minimalist */}
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
                    {product.isBestSeller && (
                      <span className="px-3 py-1 bg-[#8B5E3C] dark:bg-[#D4AF37] text-white dark:text-[#1A0B12] text-[9px] font-bold uppercase tracking-widest shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="px-3 py-1 bg-[#FAF7F2]/90 dark:bg-[#3D0B23]/90 text-[#8B4513] dark:text-[#F3C06B] border border-[#D4AF37]/30 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                        New In
                      </span>
                    )}
                  </div>

                  {/* Wishlist Toggle Button - Elegant */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label={`Save ${product.name} to wishlist`}
                    className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 dark:bg-[#1A0B12]/90 shadow-sm border border-[#8B5E3C]/10 dark:border-[#D4AF37]/20 backdrop-blur-sm transition-all duration-300 ${
                      isWishlisted
                        ? 'text-rose-500'
                        : 'text-[#660033] dark:text-[#FAF7F2] hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Image Container - Aspect Square for Gallery Feel */}
                  <div
                    onClick={() => onQuickView(product)}
                    className="relative aspect-square overflow-hidden bg-[#FAF7F2] dark:bg-[#2A0818] cursor-pointer"
                  >
                    {product.imageData || product.image ? (
                      <img
                        src={product.imageData || product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex w-full h-full flex-col items-center justify-center p-6 text-center">
                        <h4 className="font-serif-display text-lg font-bold text-[#8B4513] dark:text-[#F3C06B] mb-2">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#4A3728] dark:text-[#E8D8CD] opacity-70 line-clamp-3">
                          {product.description}
                        </p>
                      </div>
                    )}

                    {/* Quick View Overlay (Luxury Fade) */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="px-6 py-2.5 bg-white dark:bg-[#1A0B12] text-[#660033] dark:text-[#F3C06B] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#FAF7F2] transition-colors shadow-lg"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Body Content - Strict Hierarchy */}
                  <div className="p-5 flex flex-col flex-1 bg-white dark:bg-[#1A0B12]">
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-[#8B5E3C] dark:text-[#D4AF37] uppercase tracking-[0.15em] mb-1.5 opacity-90">
                        {product.category}
                      </div>

                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-serif-display text-base md:text-lg font-medium text-[#2A0818] dark:text-[#FAF7F2] line-clamp-1 mb-2 group-hover:text-[#8B5E3C] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#4A3728]/80 dark:text-[#E8D8CD]/70 line-clamp-2 mb-4 font-light leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex flex-col">
                        {product.originalPrice && (
                          <span className="text-[11px] text-[#2A0818]/40 dark:text-[#FAF7F2]/40 line-through mb-0.5">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="font-serif-display text-lg font-bold text-[#660033] dark:text-[#F3C06B]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      {/* Artisan Signature / Reviews */}
                      <div className="flex items-center gap-1 opacity-80">
                        <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                        <span className="text-[11px] font-medium text-[#2A0818] dark:text-[#FAF7F2]">
                          {product.rating} <span className="opacity-50">({product.reviewsCount})</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Full Width Elegant Add to Cart */}
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-3.5 bg-[#FAF7F2] dark:bg-[#2A0818] text-[#8B5E3C] dark:text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border-t border-[#8B5E3C]/10 dark:border-[#D4AF37]/20 hover:bg-[#8B5E3C] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#1A0B12] transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="glass-panel p-12 rounded-3xl text-center max-w-md mx-auto my-10 border border-[#D4AF37]/30">
            <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 animate-spin" />
            <h3 className="font-serif-display text-xl font-bold text-[#660033] dark:text-[#FAF7F2] mb-2">
              No matching keepsakes found
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3728] dark:text-[#E8D8CD] mb-6 leading-relaxed">
              We specialize in custom creations! Tell us your dimensions, colors, and items to preserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-full bg-white/80 dark:bg-[#3D0B23] border border-[#D4AF37]/40 text-[#660033] dark:text-[#FAF7F2] text-xs font-bold uppercase tracking-wider"
              >
                Clear Filters
              </button>
              <button
                onClick={onOpenCustomizer}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B5E3C] to-[#660033] dark:from-[#D4AF37] dark:to-[#AA7C11] text-white dark:text-[#2A0818] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <Wand2 className="w-4 h-4" />
                <span>Launch Custom Studio</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
