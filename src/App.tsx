import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { FEATURED_PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ScrollytellingShowcase } from './components/ScrollytellingShowcase';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedGrid } from './components/FeaturedGrid';
import { SplitBento } from './components/SplitBento';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { TrustStrip } from './components/TrustStrip';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { AtelierModal } from './components/AtelierModal';
import { MobileScreensCompanion } from './components/MobileScreensCompanion';

export default function App() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // Modals state
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [atelierOpen, setAtelierOpen] = useState(false);

  // Monitor window resize to automatically serve the native mobile app layout on phones
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, ringSize?: string, engravingText?: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (it) =>
          it.product.id === product.id &&
          it.ringSize === ringSize &&
          it.engravingText === engravingText
      );
      if (existing) {
        return prev.map((it) =>
          it === existing ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { product, quantity: 1, ringSize, engravingText }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.product.id === productId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((it) => it.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlistItems.some((p) => p.id === productId);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const grid = document.getElementById('pecas-destaque');
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#C9A84C]/30 selection:text-[#FAF8F5]">
      {/* SE O USUÁRIO ESTIVER NO CELULAR (< 768px): Renderiza o site mobile nativo com os 4 fluxos */}
      {isMobile ? (
        <MobileScreensCompanion
          onOpenProductModal={(p) => setSelectedProduct(p)}
        />
      ) : (
        /* SE O USUÁRIO ESTIVER NO DESKTOP: Renderiza a vitrine editorial fundida com a experiência scrollytelling */
        <>
          {/* 1. Header (Sticky Dark Glass) */}
          <Header
            cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            wishlistCount={wishlistItems.length}
            onOpenCart={() => setCartOpen(true)}
            onOpenWishlist={() => setWishlistOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenAtelier={() => setAtelierOpen(true)}
            onNavigateSection={handleScrollToSection}
          />

          <main className="flex-1">
            {/* 2. Hero Section com Vídeos HD Chiaroscuro sincronizados aos slides */}
            <HeroSection
              onExploreClick={() => handleScrollToSection('pecas-destaque')}
              onCustomQuoteClick={() => setAtelierOpen(true)}
            />

            {/* 3. Ateliê Imersivo / Scrollytelling Unificado (Marquee 12vw, vídeos e contadores animados) */}
            <ScrollytellingShowcase
              onOpenAtelier={() => setAtelierOpen(true)}
              onExploreProducts={() => handleScrollToSection('pecas-destaque')}
            />

            {/* 4. Categorias da Boutique com 4 vídeos reais em looping */}
            <CategoryShowcase
              onSelectCategory={(catId) => handleScrollToSection('pecas-destaque')}
              onViewAll={() => handleScrollToSection('pecas-destaque')}
            />

            {/* 5. Peças em Destaque (Spec-Driven Product Grid) */}
            <FeaturedGrid
              onSelectProduct={(p) => setSelectedProduct(p)}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted}
            />

            {/* 6. Bento Grid Lançamentos & Fabricação com vídeos dedicados */}
            <SplitBento
              onOpenAtelier={() => setAtelierOpen(true)}
              onExploreCategory={(cat) => handleScrollToSection('pecas-destaque')}
            />

            {/* 7. Craftsmanship Section com vídeo real do mestre ourives soldando na bancada */}
            <CraftsmanshipSection onOpenAtelier={() => setAtelierOpen(true)} />

            {/* 8. Trust Signals & Autoridade Local */}
            <TrustStrip />
          </main>

          {/* 9. Footer Executivo Dark Luxury */}
          <Footer
            onNavigateSection={handleScrollToSection}
            onOpenAtelier={() => setAtelierOpen(true)}
          />
        </>
      )}

      {/* Modais Globais & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlistItems}
        onRemove={(id) =>
          setWishlistItems((prev) => prev.filter((p) => p.id !== id))
        }
        onMoveToCart={(product) => handleAddToCart(product)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <AtelierModal
        isOpen={atelierOpen}
        onClose={() => setAtelierOpen(false)}
      />
    </div>
  );
}
