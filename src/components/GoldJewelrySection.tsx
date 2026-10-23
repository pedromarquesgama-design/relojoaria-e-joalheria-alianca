import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BOUTIQUE_INFO,
  JEWELRY_PIECE_OPTIONS,
  PENDANT_OPTIONS,
  JEWELRY_GALLERY_IMAGES,
  JewelryPieceOption,
} from '../data/mockData';
import { Product } from '../types';
import { WhatsAppGlyph } from './HouseIcons';
import {
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Check,
  Flame,
  Camera,
} from 'lucide-react';

interface GoldJewelrySectionProps {
  id?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, ringSize?: string, engravingText?: string, chainLength?: string) => void;
}

export const GoldJewelrySection: React.FC<GoldJewelrySectionProps> = ({
  id = 'joias',
  onAddToCart,
}) => {
  // 1. Seleção da Peça: Corrente de Ouro (primeiro), Corrente de Prata, Pulseira de Ouro, Pulseira de Prata
  const [selectedPieceId, setSelectedPieceId] = useState<JewelryPieceOption['id']>('corrente-ouro');
  
  // 2. Pingente opcional: 'sem-pingente' ou 'com-pingente' (sem preço e sem tipo de pingente)
  const [selectedPendant, setSelectedPendant] = useState<'sem-pingente' | 'com-pingente'>('sem-pingente');
  
  // 3. Índice da foto ativa na galeria
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [isAdded, setIsAdded] = useState(false);

  const selectedPiece = JEWELRY_PIECE_OPTIONS.find((p) => p.id === selectedPieceId) || JEWELRY_PIECE_OPTIONS[0];

  const handleSelectPiece = (pieceId: JewelryPieceOption['id']) => {
    setSelectedPieceId(pieceId);
    if (pieceId === 'pulseira-ouro' || pieceId === 'pulseira-prata') {
      setActiveImageIndex(1); // Pulseira no estojo
    } else if (selectedPendant === 'com-pingente') {
      setActiveImageIndex(2); // Corrente com pingente
    } else {
      setActiveImageIndex(0); // Corrente no estojo
    }
  };

  const handleSelectPendant = (opt: 'sem-pingente' | 'com-pingente') => {
    setSelectedPendant(opt);
    if (opt === 'com-pingente') {
      setActiveImageIndex(2); // Corrente com pingente plaquinha
    } else if (selectedPieceId.includes('pulseira')) {
      setActiveImageIndex(1);
    } else {
      setActiveImageIndex(0);
    }
  };

  const currentProduct: Product = {
    id: `prod-${selectedPiece.id}`,
    category: selectedPiece.category,
    categoryTag: selectedPiece.metal,
    title: selectedPiece.name + (selectedPendant === 'com-pingente' ? ' (Com Pingente)' : ' (Sem Pingente)'),
    ref: selectedPiece.ref,
    price: selectedPiece.price,
    rawPrice: selectedPiece.rawPrice,
    status: 'DISPONIVEL',
    statusText: 'DISPONÍVEL OU SOB MEDIDA',
    imageType: selectedPiece.imageType,
    shortDescription: selectedPiece.description,
    specs: {
      material: selectedPiece.specs.material,
      acabamento: selectedPiece.specs.acabamento,
      fecho: selectedPiece.specs.fecho,
      garantia: selectedPiece.specs.garantia,
      gravacao: 'Certificado de autenticidade da Aliança',
    },
    history: selectedPiece.description,
    inStock: true,
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Olá, Ateliê da Relojoaria e Joalheria Aliança!\n\n` +
      `Gostaria de solicitar orçamento para:\n` +
      `• Peça: ${selectedPiece.name} (${selectedPiece.metal})\n` +
      `• Pingente: ${selectedPendant === 'com-pingente' ? 'Com pingente' : 'Sem pingente'}\n\n` +
      `Gostaria de verificar a disponibilidade e valores na loja de Porto Seguro.`
    );
    window.open(`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleAddToCartClick = () => {
    onAddToCart(currentProduct);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <section
      id={id}
      className="w-full bg-[#0A0A0C] py-16 md:py-24 border-b border-[#C9A84C]/20 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-28 w-[500px] h-[500px] bg-[#C9A84C]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -left-28 w-[400px] h-[400px] bg-[#D4943E]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-5 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[10px] font-mono uppercase tracking-[0.16em] text-[#C9A84C] mb-3">
              <Sparkles size={12} />
              <span>Coleção de Ourivesaria</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#FAF8F5] tracking-tight">
              Correntes & Pulseiras
            </h2>
            <p className="text-sm md:text-base text-[#9A968E] mt-2 font-light max-w-2xl">
              Peças forjadas em Ouro 18k 750 e Prata de Lei 950 com polimento de alto padrão no ateliê da Aliança.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-[#9A968E]">
            <span className="flex items-center gap-1.5 text-[#C9A84C]">
              <Flame size={14} /> Bancada Própria
            </span>
            <span>•</span>
            <span>Garantia Vitalícia dos Metais Nobres</span>
          </div>
        </div>

        {/* Main 2-Column Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="relative w-full aspect-[4/5] min-h-[440px] rounded-3xl overflow-hidden bg-[#121216] border border-[#C9A84C]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              {/* Photo Display with smooth transition */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={JEWELRY_GALLERY_IMAGES[activeImageIndex].src}
                  src={JEWELRY_GALLERY_IMAGES[activeImageIndex].src}
                  alt={JEWELRY_GALLERY_IMAGES[activeImageIndex].alt}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-103 transition-transform duration-700"
                />
              </AnimatePresence>

              {/* Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/25 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-transparent to-transparent pointer-events-none" />

              {/* Top Tags & Photo Count */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#0A0A0C]/80 backdrop-blur-md border border-[#C9A84C]/40 text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">
                  {selectedPiece.metal}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0A0A0C]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#FAF8F5]/80">
                  Foto {activeImageIndex + 1} de {JEWELRY_GALLERY_IMAGES.length}
                </span>
              </div>

              {/* Prev / Next Navigation Arrows */}
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={() =>
                  setActiveImageIndex((prev) =>
                    (prev - 1 + JEWELRY_GALLERY_IMAGES.length) % JEWELRY_GALLERY_IMAGES.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0A0A0C]/80 backdrop-blur-md border border-white/20 text-[#FAF8F5] flex items-center justify-center text-xl opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#C9A84C] hover:text-[#C9A84C] cursor-pointer"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Próxima foto"
                onClick={() =>
                  setActiveImageIndex((prev) => (prev + 1) % JEWELRY_GALLERY_IMAGES.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0A0A0C]/80 backdrop-blur-md border border-white/20 text-[#FAF8F5] flex items-center justify-center text-xl opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#C9A84C] hover:text-[#C9A84C] cursor-pointer"
              >
                ›
              </button>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                <div className="p-4 rounded-2xl bg-[#0A0A0C]/85 backdrop-blur-md border border-[#C9A84C]/25 shadow-2xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A84C]">
                      RELOJOARIA E JOALHERIA ALIANÇA
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Pronta-entrega na loja
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-[#FAF8F5] leading-snug">
                    {JEWELRY_GALLERY_IMAGES[activeImageIndex].title}
                  </h3>
                  <p className="text-xs text-[#9A968E] mt-1 line-clamp-2 font-light">
                    {selectedPiece.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip with all 5 pictures */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {JEWELRY_GALLERY_IMAGES.map((img, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer group/thumb ${
                      isActive
                        ? 'border-[#C9A84C] ring-2 ring-[#C9A84C]/60 shadow-[0_0_12px_rgba(201,168,76,0.35)]'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover object-center group-hover/thumb:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-1 right-1.5 text-[9px] font-mono text-white/80">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Customizer with exact requested options */}
          <div className="lg:col-span-6 bg-[#121216] border border-[#C9A84C]/25 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
            <div className="space-y-6">
              {/* Product Header */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#9A968E] uppercase tracking-wider mb-1">
                  <span>Escolha do Cliente</span>
                  <span className="text-[#C9A84C]">Ateliê Porto Seguro</span>
                </div>
                <div className="flex items-baseline justify-between gap-4 mt-2">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5]">
                      Correntes em Ouro e Prata
                    </h3>
                    <span className="text-xs font-mono text-[#C9A84C]">
                      {selectedPiece.name} · {selectedPiece.metal} ({selectedPendant === 'com-pingente' ? 'Com pingente' : 'Sem pingente'})
                    </span>
                  </div>
                </div>
              </div>

              {/* 1. Escolha da Peça: Corrente de Ouro, Corrente de Prata, Pulseira de Ouro, Pulseira de Prata */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-[#FAF8F5] uppercase tracking-wider block">
                  1. Selecione a Peça:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {JEWELRY_PIECE_OPTIONS.map((piece) => {
                    const isSelected = selectedPieceId === piece.id;
                    const isGold = piece.metal === 'Ouro 18k';
                    return (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        key={piece.id}
                        onClick={() => handleSelectPiece(piece.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[92px] ${
                          isSelected
                            ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-[#FAF8F5] shadow-[0_0_15px_rgba(201,168,76,0.25)]'
                            : 'bg-[#0A0A0C]/70 border-white/10 text-[#9A968E] hover:border-white/25 hover:text-[#FAF8F5]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                            isGold
                              ? 'bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/40'
                              : 'bg-white/10 text-[#FAF8F5] border border-white/20'
                          }`}>
                            {piece.metal}
                          </span>
                        </div>
                        <span className="block text-base font-serif font-medium mt-2 leading-tight">
                          {piece.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Pingente: Com pingente ou Sem pingente */}
              <div className="space-y-3 border-t border-white/5 pt-5">
                <div className="flex items-center justify-between text-xs font-mono text-[#FAF8F5]">
                  <span className="uppercase tracking-wider">2. Pingente:</span>
                  <span className="text-[#C9A84C]">
                    {selectedPendant === 'com-pingente' ? 'Com pingente' : 'Sem pingente'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {PENDANT_OPTIONS.map((opt) => {
                    const isSelected = selectedPendant === opt.id;
                    return (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        key={opt.id}
                        onClick={() => handleSelectPendant(opt.id as 'sem-pingente' | 'com-pingente')}
                        className={`py-3.5 px-4 rounded-2xl border text-center transition-all cursor-pointer font-mono text-xs uppercase tracking-wider ${
                          isSelected
                            ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0C] font-bold shadow-[0_0_12px_rgba(201,168,76,0.35)]'
                            : 'bg-[#0A0A0C]/70 border-white/10 text-[#9A968E] hover:border-white/25 hover:text-[#FAF8F5]'
                        }`}
                      >
                        {opt.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTAs and Security Strip */}
            <div className="mt-8 pt-5 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#D4943E] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#D4943E] text-[#0A0A0C] font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(201,168,76,0.3)] cursor-pointer"
                >
                  <WhatsAppGlyph size={15} />
                  <span>PEDIR NO WHATSAPP</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCartClick}
                  className="w-full py-3.5 px-4 rounded-full bg-[#0A0A0C] border border-[#C9A84C]/50 hover:border-[#C9A84C] text-[#FAF8F5] hover:text-[#C9A84C] font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isAdded ? (
                    <>
                      <Check size={15} className="text-emerald-400" />
                      <span>ADICIONADO À SACOLA</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={15} />
                      <span>RESERVAR NO CATÁLOGO</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-[#9A968E] text-center border-t border-white/5">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck size={12} className="text-[#C9A84C]" />
                  <span>Metal Legítimo Certificado</span>
                </div>
                <div className="border-x border-white/5">
                  <span>Fecho Reforçado</span>
                </div>
                <div>
                  <span className="text-[#C9A84C]">Garantia Vitalícia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
