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
    <section id="products" aria-label="Curated Resin Art Collection" className="py-20 lg:py-28 relative overflow-hidden">
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
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="gsap-stagger-item glass-panel p-4 sm:p-5 rounded-2xl border border-white/80 dark:border-[#D4AF37]/30 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row items-center gap-5 group"
                  >
                    {/* List Thumbnail */}
                    <div
                      onClick={() => onQuickView(product)}
                      className="w-full sm:w-48 h-44 rounded-xl overflow-hidden bg-[#FAF7F2] dark:bg-[#3D0B23] shrink-0 relative cursor-pointer border border-[#D4AF37]/20"
                    >
                      {product.imageData || product.image ? (
                        <img
                          src={product.imageData || product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                          <h4 className="font-serif-display font-bold text-sm text-[#8B4513] dark:text-[#F3C06B]">
                            {product.name}
                          </h4>
                        </div>
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#8B5E3C]/90 text-white text-[9px] font-bold uppercase backdrop-blur-xs">
                        {product.resinClarity}
                      </span>
                    </div>

                    {/* List Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11px] font-bold text-[#8B4513] dark:text-[#F3C06B] uppercase tracking-wider">
                            {product.category}
                          </span>
                          <button
                            onClick={() => onToggleWishlist(product.id)}
                            aria-label="Toggle Wishlist"
                            className="p-1.5 rounded-full hover:bg-[#FAF7F2] dark:hover:bg-[#4D0026] text-[#660033] dark:text-[#FAF7F2]"
                          >
                            <Heart
                              className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-current' : ''}`}
                            />
                          </button>
                        </div>

                        <h3
                          onClick={() => onQuickView(product)}
                          className="font-serif-display text-lg sm:text-xl font-bold text-[#660033] dark:text-[#FAF7F2] hover:text-[#8B4513] dark:hover:text-[#F3C06B] cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-[#4A3728] dark:text-[#E8D8CD] line-clamp-2 mt-1 leading-relaxed">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                          <div className="flex items-center gap-1 text-amber-600 dark:text-[#F3C06B]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-bold">{product.rating}</span>
                            <span className="text-[#8B5E3C] dark:text-[#E8D8CD]/70">
                              ({product.reviewsCount} reviews)
                            </span>
                          </div>
                          <span className="text-[#D4AF37]">✦</span>
                          <span className="text-[#8B5E3C] dark:text-[#D4AF37] font-medium">
                            {product.dimensions}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Pricing & Actions */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#D4AF37]/15">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif-display text-xl font-bold text-[#8B4513] dark:text-[#F3C06B]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#660033]/40 dark:text-[#FAF7F2]/40 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onQuickView(product)}
                            className="px-3 py-2 rounded-xl bg-white/80 dark:bg-[#3D0B23] border border-[#D4AF37]/30 text-xs font-bold text-[#660033] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] flex items-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick View</span>
                          </button>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="px-4 py-2 rounded-xl bg-[#8B5E3C] dark:bg-[#D4AF37] text-white dark:text-[#2A0818] text-xs font-bold uppercase tracking-wider hover:opacity-90 flex items-center gap-1.5 transition-all shadow-md"
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

              // Standard Grid Card
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="gsap-stagger-item product-card glass-panel rounded-2xl border border-white/80 dark:border-[#D4AF37]/30 overflow-hidden shadow-lg hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 pointer-events-none">
                    {product.isBestSeller && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#8B4513] dark:bg-[#D4AF37] text-white dark:text-[#2A0818] text-[9px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Best Seller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#3D0B23] text-[#8B4513] dark:text-[#F3C06B] border border-[#D4AF37]/30 text-[9px] font-bold uppercase tracking-wider shadow-xs">
                        New In
                      </span>
                    )}
                  </div>

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label={`Save ${product.name} to wishlist`}
                    className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full glass-panel shadow-md transition-all ${
                      isWishlisted
                        ? 'text-rose-500 fill-rose-500 scale-110'
                        : 'text-[#660033] dark:text-[#FAF7F2] hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Image Container */}
                  <div
                    onClick={() => onQuickView(product)}
                    className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2] dark:bg-[#3D0B23] flex flex-col items-center justify-center cursor-pointer border-b border-[#D4AF37]/20"
                  >
                    {product.imageData || product.image ? (
                      <img
                        src={product.imageData || product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="p-4 text-center">
                        <h4 className="font-serif-display text-base font-bold text-[#8B4513] dark:text-[#F3C06B] mb-1">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#4A3728] dark:text-[#E8D8CD] opacity-70 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    )}

                    {/* Quick action overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="px-3 py-1.5 rounded-xl glass-panel text-xs font-bold text-white flex items-center gap-1 hover:bg-white hover:text-[#660033] transition-colors shadow-lg"
                      >
                        <Eye className="w-3.5 h-3.5" /> Quick View
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[#8B4513] dark:text-[#F3C06B] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-[9px] font-bold text-[#8B5E3C] dark:text-[#D4AF37] bg-[#FAF7F2] dark:bg-[#3D0B23] px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                          {product.resinClarity}
                        </span>
                      </div>

                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-serif-display text-sm sm:text-base font-bold text-[#660033] dark:text-[#FAF7F2] line-clamp-1 group-hover:text-[#8B4513] dark:group-hover:text-[#F3C06B] transition-colors cursor-pointer mb-1.5"
                      >
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex items-center text-amber-600 dark:text-[#F3C06B]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-bold text-[#660033] dark:text-[#FAF7F2] ml-1">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#4A3728] dark:text-[#E8D8CD] font-medium">
                          ({product.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Price and Cart */}
                    <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif-display text-base sm:text-lg font-bold text-[#8B4513] dark:text-[#F3C06B]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-[#660033]/40 dark:text-[#FAF7F2]/40 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold block">
                          Handcrafted in India
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="p-2.5 rounded-xl bg-[#8B5E3C] dark:bg-[#D4AF37] text-white dark:text-[#2A0818] hover:bg-[#660033] dark:hover:bg-[#FAF7F2] transition-all shadow-md active:scale-95 shrink-0"
                        title="Add to Cart"
                        aria-label={`Add ${product.name} to cart`}
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
