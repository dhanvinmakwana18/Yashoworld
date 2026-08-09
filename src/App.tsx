import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Helmet } from 'react-helmet-async';
import { animatePageEntrance } from './utils/gsapAnimations';
import { LuxuryAmbientBackground } from './components/LuxuryAmbientBackground';
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
  const mainRef = useRef<HTMLElement>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['yw-001', 'yw-002']);
  const [searchQuery, setSearchQuery] = useState('');

  const getSessionId = () => {
    let sessionId = localStorage.getItem('yasho_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('yasho_session_id', sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const sessionId = getSessionId();
        const response = await fetch(`/api/cart/${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          const formattedItems = data.map((item: any) => {
            const product = PRODUCTS_DATA.find(p => p.id === item.product_id);
            if (!product) return null;
            let parsedCustomizations = item.customizations;
            if (typeof parsedCustomizations === 'string') {
              try { parsedCustomizations = JSON.parse(parsedCustomizations); } catch(e) {}
            }
            return {
              dbId: item.id,
              product: product,
              quantity: item.quantity,
              customizationDetails: parsedCustomizations,
            };
          }).filter(Boolean);
          setCartItems(formattedItems);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    // Disable smooth scrolling on touch devices (mobile) to prevent native scroll hijack issues on Chrome/Safari
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    
    if (isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
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
  const handleAddToCart = async (product: Product, customization?: any) => {
    try {
      const sessionId = getSessionId();
      const existing = cartItems.find((item) => item.product.id === product.id);
      
      if (existing && existing.dbId) {
        // Update existing item
        const newQty = existing.quantity + 1;
        const res = await fetch(`/api/cart/${existing.dbId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQty, customizations: customization || existing.customizationDetails }),
        });
        if (res.ok) {
          setCartItems((prev) =>
            prev.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: newQty }
                : item
            )
          );
        }
      } else {
        // Create new item
        const res = await fetch(`/api/cart/${sessionId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, quantity: 1, customizations: customization }),
        });
        if (res.ok) {
          const savedItem = await res.json();
          setCartItems((prev) => [
            ...prev,
            { dbId: savedItem.id, product, quantity: 1, customizationDetails: customization },
          ]);
        }
      }
      setIsCartOpen(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId: string, delta: number) => {
    const item = cartItems.find(i => i.product.id === productId);
    if (!item || !item.dbId) return;

    const newQty = item.quantity + delta;
    if (newQty > 0) {
      try {
        const res = await fetch(`/api/cart/${item.dbId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQty, customizations: item.customizationDetails }),
        });
        if (res.ok) {
          setCartItems((prev) =>
            prev.map((i) => i.product.id === productId ? { ...i, quantity: newQty } : i)
          );
        }
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    } else {
      handleRemoveItem(productId);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    const item = cartItems.find(i => i.product.id === productId);
    if (!item || !item.dbId) return;
    try {
      const res = await fetch(`/api/cart/${item.dbId}`, { method: 'DELETE' });
      if (res.ok) {
        setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const sessionId = getSessionId();
      const res = await fetch(`/api/cart/session/${sessionId}`, { method: 'DELETE' });
      if (res.ok) {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
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

  const seoTitle = quickViewProduct 
    ? `${quickViewProduct.name} | YashoWorld Luxury Keepsakes` 
    : 'YashoWorld | Bespoke Handmade Resin Art & Pooja Thalis';

  const seoDescription = quickViewProduct
    ? `Discover the handcrafted ${quickViewProduct.name} at YashoWorld. ${quickViewProduct.description}. Custom-made with UV-protected optical grade crystal resin.`
    : 'YashoWorld Studio designs elite handcrafted resin art, divine crimson thalis, customized wedding varmala preservation frames, and botanic bookmarks that keep precious memories alive.';

  const seoImage = `${window.location.origin}/placeholder.png`;

  return (
    <div className="min-h-[100dvh] bg-[#FAF7F2] dark:bg-[#660033] text-[#660033] dark:text-[#FAF7F2] transition-colors duration-300 relative">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <meta name="theme-color" content="#660033" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
        <meta property="twitter:image" content={seoImage} />

        {/* Search Engine and Discoverability */}
        <meta name="keywords" content="resin art, pooja thali, wedding flower preservation, handmade keepsake, customized gifts, varmala frame" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {/* Custom Particle & Ring Cursor */}
      

      {/* Immersive UI Soft Pastel Radial Background Glow Overlay */}
      <div className="fixed top-0 left-0 w-full h-full opacity-25 pointer-events-none z-0 bg-[radial-gradient(circle_at_70%_30%,#D4A373_0%,transparent_50%),radial-gradient(circle_at_20%_80%,#D8B4E2_0%,transparent_50%)]" />

      {/* Loading Animation */}
      {isLoading && (
        <LoadingScreen
          onComplete={() => {
            setIsLoading(false);
            if (mainRef.current) {
              animatePageEntrance(mainRef.current);
            }
          }}
        />
      )}

      {/* Ambient Luxury Background */}
      <LuxuryAmbientBackground />

      {/* Main Header */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        onSearchClick={handleSearchClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickView={(product) => setQuickViewProduct(product)}
        onAddToCart={handleAddToCart}
      />

      {/* Main Content Sections */}
      <main ref={mainRef} className="relative z-10">
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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
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
        onClearCart={handleClearCart}
      />
    </div>
  );
}
