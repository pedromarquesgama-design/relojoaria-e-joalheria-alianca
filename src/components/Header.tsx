import React, { useState } from 'react';
import { GoldEmblem } from './LuxuryVisuals';
import { BrandLogo } from './BrandLogo';
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
              </button>
            </nav>
          </div>

          {/* Center: Official Brand Logo on Navbar */}
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center cursor-pointer group py-1"
            title="Relojoaria e Joalheria Aliança - Voltar ao início"
          >
            <BrandLogo className="h-9 sm:h-11 w-auto group-hover:scale-102 transition-transform duration-300" />
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
                JÓIAS EM OURO 18K (CORRENTES & PINGENTES)
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
  );
};
