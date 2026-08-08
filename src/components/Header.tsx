import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SafeImage } from './SafeImage';
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          mobileMenuOpen
            ? 'z-50 bg-[#F5EFE6] dark:bg-[#161210] py-4 shadow-2xl border-b border-[#D4AF37]/30'
            : isScrolled
            ? 'z-40 py-3 glass-panel shadow-lg border-b border-[#D4AF37]/20'
            : 'z-40 py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group cursor-pointer">
            <SafeImage
              src="/images/branding/regenerated_image_1786195890346.png"
              fallbackSrc="/images/branding/regenerated_image_1786195890346.png"
              alt="YashoWorld Logo"
              isLogo={true}
              priority={true}
              className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
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
                    : 'text-[#1A1412] dark:text-[#E8D8CD] hover:text-[#8B4513] dark:hover:text-white font-semibold'
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

        {/* Mobile Opaque Full-Screen Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-[#F5EFE6] dark:bg-[#14100E] flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
            >
              {/* Mobile Drawer Top Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/20">
                <a
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center group"
                >
                  <SafeImage
                    src="/images/branding/regenerated_image_1786195890346.png"
                    fallbackSrc="/images/branding/regenerated_image_1786195890346.png"
                    alt="YashoWorld Logo"
                    isLogo={true}
                    priority={true}
                    className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </a>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="p-2.5 rounded-full bg-[#E8D8C4]/60 dark:bg-[#2A2421] text-[#2A2421] dark:text-[#F5EFE6]"
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
                        ? 'bg-[#8B5E3C] text-white dark:bg-[#D4AF37] dark:text-[#12100E] font-bold shadow-md'
                        : 'text-[#2A2421] dark:text-[#F5EFE6] hover:bg-[#E8D8C4]/40 dark:hover:bg-[#2A2421]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.isSpecial ? (
                      <Wand2 className="w-5 h-5 text-amber-200 dark:text-[#12100E]" />
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
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8B5E3C] to-[#4A3728] dark:from-[#D4AF37] dark:to-[#AA7C11] text-white dark:text-[#12100E] font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-lg"
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
