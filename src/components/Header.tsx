import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  ShoppingBag,
  Sparkles,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Heart,
  Wand2,
  Phone,
  Eye,
  Tag,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenCustomizer: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onSearchClick: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenCustomizer,
  isDarkTheme,
  onToggleTheme,
  onSearchClick,
  searchQuery = '',
  onSearchChange,
  onQuickView,
  onAddToCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (Math.abs(currentScrollY - lastScrollY.current) > 6) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setScrollDirection('down');
        } else if (currentScrollY < lastScrollY.current) {
          setScrollDirection('up');
        }
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleTagClick = (tag: string) => {
    setLocalQuery(tag);
    if (onSearchChange) {
      onSearchChange(tag);
    }
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Real-time filter PRODUCTS_DATA
  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    if (!localQuery.trim()) return true;
    const q = localQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.features.some((f) => f.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  const quickSearchTags = ['Rose Bookmark', 'Pooja Thali', 'Wedding Keepsake', 'Resin Clock', 'Ganesha'];

  const navLinks = [
    { name: 'Story', href: '#story' },
    { name: 'Collection', href: '#products' },
    { name: '3D Customizer', href: '#customizer', isSpecial: true },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#660033]/60 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Top Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F3C06B] to-[#8B4513] origin-left z-50 shadow-[0_0_12px_#D4AF37]"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          mobileMenuOpen
            ? 'z-50 bg-[#F5EFE6] dark:bg-[#660033] py-4 shadow-2xl border-b border-[#D4AF37]/30'
            : isScrolled
            ? scrollDirection === 'down'
              ? 'z-40 py-2.5 glass-panel shadow-md border-b border-[#D4AF37]/20 -translate-y-1 backdrop-blur-md'
              : 'z-40 py-3.5 glass-panel shadow-xl border-b border-[#D4AF37]/30 translate-y-0 backdrop-blur-lg'
            : 'z-40 py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
            <img
              src="/images/logo.png"
              alt="YashoWorld Logo"
              className="w-9 h-9 object-contain rounded-full border border-[#D4AF37]/30 shadow-xs group-hover:scale-105 transition-transform duration-300"
            />
            <h1 className="font-serif-display text-xl sm:text-2xl font-bold tracking-widest text-[#660033] dark:text-[#FAF7F2] whitespace-nowrap">
              YASHO<span className="text-[#D4AF37]">WORLD</span>
            </h1>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.isSpecial) {
                    e.preventDefault();
                    onOpenCustomizer();
                  }
                }}
                className={`transition-colors relative group py-1 ${
                  link.isSpecial
                    ? 'text-[#8B4513] dark:text-[#F3C06B] font-bold flex items-center gap-1.5'
                    : 'text-[#660033] dark:text-[#E8D8CD] hover:text-[#8B4513] dark:hover:text-white font-semibold'
                }`}
              >
                {link.isSpecial && <Wand2 className="w-3.5 h-3.5 text-[#8B4513] dark:text-[#F3C06B] animate-pulse" />}
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8B4513] dark:bg-[#F3C06B] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Real-time Interactive Search Component */}
            <div ref={searchContainerRef} className="relative">
              <div
                className={`flex items-center transition-all duration-300 rounded-full border ${
                  isSearchOpen || localQuery
                    ? 'w-48 sm:w-64 bg-white/90 dark:bg-[#2A2421]/90 border-[#D4A373] shadow-md px-3 py-1.5'
                    : 'w-10 h-10 hover:bg-[#E8D8C4]/40 dark:hover:bg-[#2A2421] border-transparent justify-center cursor-pointer'
                }`}
                onClick={() => {
                  if (!isSearchOpen) {
                    setIsSearchOpen(true);
                    setTimeout(() => searchInputRef.current?.focus(), 50);
                  }
                }}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B4513] dark:text-[#F3C06B] shrink-0" />
                {(isSearchOpen || localQuery) && (
                  <>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={localQuery}
                      onChange={handleInputChange}
                      onFocus={() => setIsSearchOpen(true)}
                      placeholder="Search resin art, thalis..."
                      className="w-full bg-transparent border-none text-xs text-[#2D241E] dark:text-[#F5EFE6] focus:outline-none focus:ring-0 ml-2"
                    />
                    {localQuery && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocalQuery('');
                          if (onSearchChange) onSearchChange('');
                        }}
                        className="p-1 text-[#8B4513] dark:text-[#F3C06B] hover:opacity-80"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Real-time Search Popover Results Dropdown */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-80 sm:w-96 glass-panel rounded-2xl border border-white/80 dark:border-[#D4A373]/30 shadow-2xl overflow-hidden z-50 p-4"
                  >
                    {/* Header tags */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#8B4513] dark:text-[#F3C06B] uppercase tracking-wider mb-2">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Popular Keepsakes
                        </span>
                        <span>{filteredProducts.length} items</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {quickSearchTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#1A1412] hover:bg-[#8B5E3C] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#12100E] text-[#5D4E42] dark:text-[#E8D8CD] transition-colors border border-[#D4A373]/20 flex items-center gap-1 font-medium"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filtered Products List */}
                    <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-white/60 dark:bg-[#1E1815]/60 hover:bg-[#F5EFE6] dark:hover:bg-[#2A2421] border border-transparent hover:border-[#D4A373]/30 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              {product.image && (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-11 h-11 rounded-lg object-cover border border-white/80 dark:border-[#D4A373]/20 shadow-sm"
                                />
                              )}
                              <div>
                                <h4 className="text-xs font-bold text-[#2A2421] dark:text-[#FAF7F2] line-clamp-1 group-hover:text-[#8B4513] dark:group-hover:text-[#F3C06B] transition-colors">
                                  {product.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] font-semibold text-[#8B5E3C] dark:text-[#D4AF37]">
                                    ₹{product.price.toLocaleString('en-IN')}
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#E8D8C4]/50 dark:bg-[#2D241E] text-[#5D4E42] dark:text-[#C4B8AD]">
                                    {product.category}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {onQuickView && (
                                <button
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    onQuickView(product);
                                  }}
                                  title="Quick View"
                                  className="p-1.5 rounded-lg bg-white/80 dark:bg-[#2D241E] hover:bg-[#8B5E3C] hover:text-white dark:hover:bg-[#D4AF37] text-[#2D241E] dark:text-[#FAF7F2] transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onAddToCart && (
                                <button
                                  onClick={() => {
                                    onAddToCart(product);
                                  }}
                                  title="Add to Cart"
                                  className="p-1.5 rounded-lg bg-[#8B5E3C] text-white hover:bg-[#4A3728] dark:bg-[#D4AF37] dark:text-[#12100E] transition-colors shadow-xs"
                                >
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center text-xs text-[#8B5E3C] dark:text-[#D4AF37]">
                          No resin keepsakes found matching "{localQuery}"
                        </div>
                      )}
                    </div>

                    {/* View All Collection CTA */}
                    <div className="pt-2 mt-2 border-t border-[#D4AF37]/20 flex justify-between items-center text-[10px]">
                      <span className="text-[#5D4E42] dark:text-[#C4B8AD]">Real-time Python Engine Active</span>
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          const productsSection = document.getElementById('products');
                          if (productsSection) {
                            productsSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="font-bold text-[#8B4513] dark:text-[#F3C06B] flex items-center gap-1 hover:underline"
                      >
                        View Collection <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Light/Dark Theme"
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#E8D8C4]/40 dark:hover:bg-[#2A2421] text-[#2D241E] dark:text-[#F5EFE6] transition-colors"
            >
              {isDarkTheme ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5E3C]" />
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#E8D8C4]/40 dark:hover:bg-[#2A2421] text-[#2D241E] dark:text-[#F5EFE6] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D241E] dark:text-[#F5EFE6]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#8B5E3C] text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Custom Order CTA Button */}
            <button
              onClick={onOpenCustomizer}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A3728] dark:bg-[#8B5E3C] text-[#F5EFE6] hover:bg-[#8B5E3C] dark:hover:bg-[#D4AF37] dark:hover:text-[#12100E] text-[10px] uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#D4AF37] dark:text-inherit" />
              <span>Custom Order</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden p-2 rounded-lg text-[#660033] dark:text-[#F5EFE6]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Opaque Full-Screen Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-[#F5EFE6] dark:bg-[#660033] flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
            >
              {/* Mobile Drawer Top Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/20">
                <a
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center group"
                >
                  <h1 className="font-serif-display text-2xl font-bold tracking-widest text-[#660033] dark:text-[#FAF7F2]">
                    YASHO<span className="text-[#D4AF37]">WORLD</span>
                  </h1>
                </a>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="p-2.5 rounded-full bg-[#E8D8C4]/60 dark:bg-[#4D0026] text-[#660033] dark:text-[#F5EFE6]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex flex-col gap-2 py-6 my-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.isSpecial) {
                        e.preventDefault();
                        onOpenCustomizer();
                      }
                    }}
                    className={`text-lg font-serif-display font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-between ${
                      link.isSpecial
                        ? 'bg-[#8B5E3C] text-white dark:bg-[#D4AF37] dark:text-[#660033] font-bold shadow-md'
                        : 'text-[#660033] dark:text-[#F5EFE6] hover:bg-[#E8D8C4]/40 dark:hover:bg-[#4D0026]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.isSpecial ? (
                      <Wand2 className="w-5 h-5 text-amber-200 dark:text-[#660033]" />
                    ) : (
                      <span className="text-xs text-[#D4AF37] font-sans font-bold">→</span>
                    )}
                  </a>
                ))}
              </div>

              {/* Mobile Drawer Bottom Action */}
              <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8B5E3C] to-[#660033] dark:from-[#D4AF37] dark:to-[#AA7C11] text-white dark:text-[#660033] font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>3D Custom Order Builder</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
