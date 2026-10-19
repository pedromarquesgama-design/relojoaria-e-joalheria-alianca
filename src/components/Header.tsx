import React, { useState } from 'react';
import { GoldEmblem } from './LuxuryVisuals';
import { BOUTIQUE_INFO } from '../data/mockData';
import { Search, Heart, ShoppingBag, Menu, X, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAtelier: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAtelier,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOP MICRO-BANNER */}
      <div className="w-full bg-[#0E0E12] border-b border-[#C9A84C]/25 text-[#C9A84C] py-2 px-4 text-center z-40 relative">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[11px] font-mono tracking-[0.12em] uppercase">
          <div className="hidden sm:block text-[#9A968E] text-[10px]">
            PORTO SEGURO · BAHIA
          </div>
          <div className="w-full sm:w-auto text-center truncate">
            OURIVESARIA PRÓPRIA & RELOJOARIA DE PRECISÃO · RUA SÃO PEDRO, 650 - CENTRO, PORTO SEGURO - BA
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-[#C9A84C]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ATELIÊ ABERTO HOJE</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR (Sticky Dark Glass) */}
      <header className="sticky top-0 z-40 w-full bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#C9A84C]/20 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
          {/* Left: Hamburger + Navigation Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FAF8F5] hover:text-[#C9A84C] transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <nav className="hidden lg:flex items-center gap-7 text-[12px] font-mono tracking-[0.14em] uppercase text-[#FAF8F5]/85">
              <button
                onClick={() => onNavigateSection('relogios')}
                className="hover:text-[#C9A84C] transition-colors whitespace-nowrap cursor-pointer py-1"
              >
                RELÓGIOS
              </button>
              <button
                onClick={() => onNavigateSection('joias')}
                className="hover:text-[#C9A84C] transition-colors whitespace-nowrap cursor-pointer py-1"
              >
                JÓIAS
              </button>
              <button
                onClick={() => onNavigateSection('aliancas')}
                className="hover:text-[#C9A84C] transition-colors whitespace-nowrap cursor-pointer py-1"
              >
                ALIANÇAS
              </button>
              <button
                onClick={() => onNavigateSection('oculos')}
                className="hover:text-[#C9A84C] transition-colors whitespace-nowrap cursor-pointer py-1"
              >
                ÓCULOS
              </button>
              <button
                onClick={onOpenAtelier}
                className="text-[#C9A84C] hover:text-[#FAF8F5] transition-colors whitespace-nowrap cursor-pointer py-1 font-semibold flex items-center gap-1"
              >
                <span>OFICINA</span>
                <span className="text-[9px] px-1 py-0.2 bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C]">
                  ATELIER
                </span>
              </button>
            </nav>
          </div>

          {/* Center: Brand Lockup with Minimalist Gold Clock-Ring Emblem */}
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group text-center"
          >
            <GoldEmblem size={28} className="group-hover:rotate-45 transition-transform duration-700 shrink-0" />
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.08em] text-[#FAF8F5] font-semibold leading-tight">
                ALIANÇA
              </span>
              <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[#C9A84C] -mt-0.5 whitespace-nowrap">
                RELOJOARIA E JOALHERIA
              </span>
            </div>
          </div>

          {/* Right: Search, Wishlist, Bag & Direct WhatsApp CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-[#9A968E] hover:text-[#FAF8F5] transition-colors rounded-full hover:bg-white/5"
              aria-label="Buscar produtos"
              title="Pesquisar catálogo"
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-[#9A968E] hover:text-[#FAF8F5] transition-colors rounded-full hover:bg-white/5"
              aria-label="Favoritos"
              title="Peças favoritadas"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C9A84C] text-[#0A0A0C] font-mono text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#9A968E] hover:text-[#FAF8F5] transition-colors rounded-full hover:bg-white/5"
              aria-label="Sacola de atendimento"
              title="Sacola digital"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4943E] text-[#0A0A0C] font-mono text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Subtle Gold Border WhatsApp Action with Soft Pill Rounded-full */}
            <a
              href={`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Olá, Relojoaria e Joalheria Aliança! Gostaria de falar com um consultor.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#C9A84C]/45 hover:border-[#C9A84C] text-[#FAF8F5] hover:text-[#C9A84C] text-[11px] font-mono tracking-wider transition-all rounded-full bg-[#121216]/80 hover:bg-[#121216] shadow-sm hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>WHATSAPP (73) 98102-9862</span>
            </a>
          </div>
        </div>

        {/* Mobile Flyout Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0D10] border-b border-[#C9A84C]/25 p-5 animate-fade-in">
            <nav className="flex flex-col space-y-3.5 text-xs font-mono tracking-widest uppercase">
              <button
                onClick={() => {
                  onNavigateSection('relogios');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-[#FAF8F5] hover:text-[#C9A84C] py-1 border-b border-white/5"
              >
                RELÓGIOS
              </button>
              <button
                onClick={() => {
                  onNavigateSection('joias');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-[#FAF8F5] hover:text-[#C9A84C] py-1 border-b border-white/5"
              >
                JÓIAS EM OURO
              </button>
              <button
                onClick={() => {
                  onNavigateSection('aliancas');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-[#FAF8F5] hover:text-[#C9A84C] py-1 border-b border-white/5"
              >
                ALIANÇAS 18K
              </button>
              <button
                onClick={() => {
                  onNavigateSection('oculos');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-[#FAF8F5] hover:text-[#C9A84C] py-1 border-b border-white/5"
              >
                ÓCULOS & ARMAÇÕES
              </button>
              <button
                onClick={() => {
                  onOpenAtelier();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-[#C9A84C] font-semibold py-1 border-b border-white/5"
              >
                OFICINA DE OURIVESARIA & RELÓGIOS →
              </button>
            </nav>

            <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-[#9A968E]">
              <span>Rua São Pedro, 650 - Centro</span>
              <span className="text-[#C9A84C]">Porto Seguro - BA</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
