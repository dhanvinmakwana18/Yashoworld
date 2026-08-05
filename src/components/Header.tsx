import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenCustomizer: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenCustomizer,
  isDarkTheme,
  onToggleTheme,
  onSearchClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-3 glass-panel shadow-lg border-b border-[#D4AF37]/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-gold flex items-center justify-center border border-[#D4AF37]/50 group-hover:rotate-12 transition-transform duration-500 shadow-md">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-widest uppercase text-[#8B5E3C] dark:text-[#E5C158]">
              Yasho<span className="text-gold-gradient">World</span>
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 text-[#4A3728] dark:text-[#C4B8AD] font-medium -mt-1">
              Preserving Memories Forever
            </span>
          </div>
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
                  ? 'text-[#8B5E3C] dark:text-[#E5C158] font-bold flex items-center gap-1.5'
                  : 'text-[#4A3728] dark:text-[#C4B8AD] hover:text-[#D4AF37] dark:hover:text-white'
              }`}
            >
              {link.isSpecial && <Wand2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />}
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Search Collection"
            className="p-2 sm:p-2.5 rounded-full hover:bg-[#E8D8C4]/40 dark:hover:bg-[#2A2421] text-[#2D241E] dark:text-[#F5EFE6] transition-colors"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#5D4E42] dark:text-[#C4B8AD]" />
          </button>

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
            className="lg:hidden p-2 rounded-lg text-[#2A2421] dark:text-[#F5EFE6]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel border-t border-[#D4AF37]/20 px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
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
                  className={`text-base font-medium py-2 border-b border-[#D4AF37]/10 flex items-center justify-between ${
                    link.isSpecial
                      ? 'text-[#D4AF37] font-bold'
                      : 'text-[#2A2421] dark:text-[#F5EFE6]'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.isSpecial && <Wand2 className="w-4 h-4 text-[#D4AF37]" />}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8B5E3C] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-md"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>3D Custom Order Builder</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
