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
import { WishlistDrawer } from './components/WishlistDrawer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { Product, CartItem } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['yw-001', 'yw-002']);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getSessionId = () => {
    let sessionId = localStorage.getItem('yasho_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('yasho_session_id', sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          let data = await response.json();
          // Map database JSON strings back to arrays if needed
          data = data.map((p: any) => ({
            ...p,
            features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
            customizableOptions: typeof p.customizableOptions === 'string' ? JSON.parse(p.customizableOptions) : p.customizableOptions,
            isBestSeller: p.isBestSeller === 1 || p.isBestSeller === true,
            isNewArrival: p.isNewArrival === 1 || p.isNewArrival === true,
          }));
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (productsLoading) return; // Wait until products are loaded
      try {
        const sessionId = getSessionId();
        const response = await fetch(`/api/cart/${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          const formattedItems = data.map((item: any) => {
            const product = products.find(p => p.id === item.product_id);
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
  }, [productsLoading, products]);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.6,
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

      addToast({
        type: 'cart',
        title: 'Added to Bag',
        description: `${product.name} (₹${product.price.toLocaleString('en-IN')}) has been reserved.`,
        actionLabel: 'View Cart',
        onAction: () => setIsCartOpen(true),
      });

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
        addToast({
          type: 'info',
          title: 'Item Removed',
          description: `${item.product.name} removed from your order.`,
        });
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
        addToast({
          type: 'info',
          title: 'Cart Cleared',
          description: 'Your shopping bag is now empty.',
        });
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    const isCurrentlySaved = wishlistIds.includes(productId);

    if (isCurrentlySaved) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      if (product) {
        addToast({
          type: 'info',
          title: 'Removed from Vault',
          description: `${product.name} removed from your saved list.`,
        });
      }
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      if (product) {
        addToast({
          type: 'wishlist',
          title: 'Saved to Vault',
          description: `${product.name} saved to your bespoke wishlist.`,
          actionLabel: 'View Vault',
          onAction: () => setIsWishlistOpen(true),
        });
      }
    }
  };

  const handleSearchClick = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const seoTitle = quickViewProduct 
    ? `${quickViewProduct.name} | YashoWorld Luxury Keepsakes` 
    : 'YashoWorld | Bespoke Handmade Resin Art & Pooja Thalis';

  const seoDescription = quickViewProduct
    ? `Discover the handcrafted ${quickViewProduct.name} at YashoWorld. ${quickViewProduct.description}. Custom-made with UV-protected optical grade crystal resin.`
    : 'YashoWorld Studio designs elite handcrafted resin art, divine crimson thalis, customized wedding varmala preservation frames, and botanic bookmarks that keep precious memories alive.';

  const seoImage = `${window.location.origin}/placeholder.png`;

  return (
    <div className="min-h-[100dvh] bg-[#FAF7F2] dark:bg-[#2A0818] text-[#660033] dark:text-[#FAF7F2] transition-colors duration-300 relative">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <meta name="theme-color" content="#660033" />
        
        {/* Open Graph */}
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

        <meta name="keywords" content="resin art, pooja thali, wedding flower preservation, handmade keepsake, customized gifts, varmala frame" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Ambient Lighting Overlay */}
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
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        onSearchClick={handleSearchClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickView={(product) => setQuickViewProduct(product)}
        onAddToCart={handleAddToCart}
        products={products}
      />

      {/* Main Content Sections */}
      <main ref={mainRef} className="relative z-10">
        <Hero
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          isDarkTheme={isDarkTheme}
        />
        <StoryAbout />
        {productsLoading ? (
          <div className="py-24 text-center min-h-[50vh] flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#8B5E3C] dark:text-[#D4AF37] font-medium font-serif-display">Loading Bespoke Masterpieces...</p>
          </div>
        ) : (
          <Product3DCards
            products={products}
            onQuickView={(product) => setQuickViewProduct(product)}
            onAddToCart={handleAddToCart}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
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
        onAddToCartCustom={(customProduct) => {
          handleAddToCart(customProduct);
          addToast({
            type: 'custom',
            title: 'Custom Keepsake Stored',
            description: `${customProduct.name} saved to your cart.`,
          });
        }}
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

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(product) => setQuickViewProduct(product)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Floating Notifications Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
