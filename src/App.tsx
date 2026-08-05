import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThreeBackgroundCanvas } from './components/ThreeBackgroundCanvas';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoryAbout } from './components/StoryAbout';
import { Product3DCards } from './components/Product3DCards';
import { InteractiveCustomizerModal } from './components/InteractiveCustomizerModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { LuxuryGallery } from './components/LuxuryGallery';
import { OrderProcessTimeline } from './components/OrderProcessTimeline';
import { Testimonials3D } from './components/Testimonials3D';
import { FAQAccordion } from './components/FAQAccordion';
import { ContactSection } from './components/ContactSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { Product, CartItem } from './types';
import { PRODUCTS_DATA } from './data/products';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS_DATA[0],
      quantity: 1,
      customizationDetails: { names: 'Aarav & Priya', date: '14.02.2026' },
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['yw-001', 'yw-002']);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Theme Toggle Effect
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // Cart operations
  const handleAddToCart = (product: Product, customization?: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          customizationDetails: customization,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSearchClick = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] dark:bg-[#12100E] text-[#2D241E] dark:text-[#F5EFE6] transition-colors duration-500 relative">
      {/* Immersive UI Radial Background Glow Overlay */}
      <div className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0 bg-[radial-gradient(circle_at_70%_30%,#D4AF37_0%,transparent_50%),radial-gradient(circle_at_20%_80%,#8B5E3C_0%,transparent_50%)]" />

      {/* Loading Animation */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Ambient 3D Background Canvas */}
      <ThreeBackgroundCanvas />

      {/* Main Header */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        onSearchClick={handleSearchClick}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          isDarkTheme={isDarkTheme}
        />
        <StoryAbout />
        <Product3DCards
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToCart={handleAddToCart}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />
        <WhyChooseUs />
        <LuxuryGallery onOpenCustomizer={() => setIsCustomizerOpen(true)} />
        <OrderProcessTimeline onOpenCustomizer={() => setIsCustomizerOpen(true)} />
        <Testimonials3D />
        <FAQAccordion />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <InteractiveCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCartCustom={(customProduct) => handleAddToCart(customProduct)}
      />

      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
