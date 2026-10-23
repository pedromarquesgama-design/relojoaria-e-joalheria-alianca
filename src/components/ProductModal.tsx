import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCardGraphic } from './LuxuryVisuals';
import { BOUTIQUE_INFO, WEDDING_RING_SHOTS } from '../data/mockData';
import { X, MessageCircle, ShoppingBag, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, ringSize?: string, engravingText?: string, chainLength?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'history'>('specs');
  const [selectedSize, setSelectedSize] = useState<string>('20');
  const [selectedChainLength, setSelectedChainLength] = useState<string>('60cm');
  const [engraving, setEngraving] = useState<string>('');
  const [added, setAdded] = useState<boolean>(false);
  const [selectedRingShot, setSelectedRingShot] = useState<string | null>(null);

  if (!product) return null;

  const isChain = product.category.includes('CORRENTES') || product.title.toLowerCase().includes('corrente');
  const isRing = !isChain && (product.category.includes('ALIANÇAS') || product.title.toLowerCase().includes('anel') || product.title.toLowerCase().includes('solitário'));

  const activePhoto = selectedRingShot || product.imageUrl;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Olá, Ateliê da Relojoaria e Joalheria Aliança!\n\n` +
      `Gostaria de verificar a disponibilidade da peça:\n` +
      `*${product.title}*\n` +
      `Ref: ${product.ref}\n` +
      `Valor: ${product.price}\n` +
      (isRing ? `Aro sugerido: ${selectedSize}\n` : '') +
      (isChain ? `Comprimento da corrente: ${selectedChainLength}\n` : '') +
      (engraving ? `Gravação pretendida: "${engraving}"\n` : '') +
      `\nPoderiam me enviar mais fotos/detalhes e opções de pagamento? Obrigado!`
    );
    window.open(`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleAdd = () => {
    onAddToCart(
      product,
      isRing ? selectedSize : undefined,
      engraving || undefined,
      isChain ? selectedChainLength : undefined
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#121216] border border-[#C9A84C]/30 text-[#FAF8F5] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row max-h-[92vh] rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 text-[#9A968E] hover:text-[#FAF8F5] transition-colors rounded-full bg-[#0A0A0C]/70 border border-white/10 hover:border-[#C9A84C]/50 backdrop-blur-md"
            aria-label="Fechar"
          >
            <X size={18} />
          </motion.button>

          {/* Left Column: Visual Showcase */}
          <div className="w-full md:w-1/2 bg-[#0A0A0C] border-b md:border-b-0 md:border-r border-[#C9A84C]/20 flex flex-col p-4 md:p-6 justify-between">
            <div className="relative flex-1 min-h-[260px] md:min-h-[380px] rounded-2xl bg-[#121216]/60 border border-white/5 flex items-center justify-center p-4 overflow-hidden">
              <ProductCardGraphic
                type={product.imageType}
                imageUrl={activePhoto}
                video={product.video}
                poster={product.poster}
                alt={product.title}
                className="h-full"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.14em] uppercase px-3 py-1 bg-[#121216]/90 backdrop-blur-md border border-[#C9A84C]/35 text-[#C9A84C] rounded-full shadow-lg">
                  {product.categoryTag}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#9A968E] bg-[#121216]/90 backdrop-blur-md px-3.5 py-1.5 border border-white/10 rounded-full shadow-lg">
                <span>{product.ref}</span>
                <span className="text-[#C9A84C]">FOTOGRAFIA MACRO ATELIÊ</span>
              </div>
            </div>

            {/* If Ring, show gallery thumbnail selector */}
            {isRing && (
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1">
                {WEDDING_RING_SHOTS.map((shot) => {
                  const isCurrent = activePhoto === shot.src;
                  return (
                    <button
                      key={shot.src}
                      type="button"
                      onClick={() => setSelectedRingShot(shot.src)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#C9A84C] ring-2 ring-[#C9A84C]/60 shadow-[0_0_10px_rgba(201,168,76,0.35)]'
                          : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                      }`}
                      title={shot.title}
                    >
                      <img src={shot.src} alt={shot.alt} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9A968E] uppercase mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">{product.category}</span>
                <span className={product.status === 'DISPONIVEL' ? 'text-emerald-400 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/20' : 'text-amber-400 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/20'}>
                  <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'DISPONIVEL' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {product.statusText}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif text-[#FAF8F5] leading-snug">
                {product.title}
              </h2>

              <div className="mt-2 text-xl md:text-2xl font-mono text-[#D4943E] font-medium tracking-tight">
                {product.price}
              </div>
            </div>

            <p className="text-sm text-[#9A968E] leading-relaxed mb-5 font-light">
              {product.shortDescription}
            </p>

            {/* Ring Size Option if Applicable */}
            {isRing && (
              <div className="mb-4 p-4 bg-[#17171E]/90 border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#FAF8F5]">
                    Numeração do Aro (Brasil)
                  </label>
                  <span className="text-[11px] text-[#C9A84C]">Ajuste sob medida</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['14', '16', '18', '20', '22', '24', '26', '28'].map((size) => (
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1 text-xs font-mono rounded-full transition-all border ${
                        selectedSize === size
                          ? 'bg-[#C9A84C] text-[#0A0A0C] border-[#C9A84C] font-semibold shadow-[0_0_12px_rgba(201,168,76,0.4)]'
                          : 'bg-[#121216] text-[#FAF8F5] border-white/10 hover:border-[#C9A84C]/50'
                      }`}
                    >
                      Aro {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Chain Length Option if Applicable */}
            {isChain && (
              <div className="mb-4 p-4 bg-[#17171E]/90 border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#FAF8F5]">
                    Comprimento da Corrente
                  </label>
                  <span className="text-[11px] text-[#C9A84C]">Ajuste no ateliê</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { val: '45cm', lbl: '45 cm' },
                    { val: '50cm', lbl: '50 cm' },
                    { val: '60cm', lbl: '60 cm' },
                    { val: '70cm', lbl: '70 cm' },
                  ].map((len) => (
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      key={len.val}
                      type="button"
                      onClick={() => setSelectedChainLength(len.val)}
                      className={`px-3.5 py-1 text-xs font-mono rounded-full transition-all border ${
                        selectedChainLength === len.val
                          ? 'bg-[#C9A84C] text-[#0A0A0C] border-[#C9A84C] font-semibold shadow-[0_0_12px_rgba(201,168,76,0.4)]'
                          : 'bg-[#121216] text-[#FAF8F5] border-white/10 hover:border-[#C9A84C]/50'
                      }`}
                    >
                      {len.lbl}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Complimentary Laser Engraving Input */}
            <div className="mb-5 p-4 bg-[#17171E]/90 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-mono uppercase tracking-wider text-[#C9A84C]">
                <Sparkles size={13} />
                <span>Gravação Interna Cortesia</span>
              </div>
              <input
                type="text"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                placeholder="Ex: Pedro & Maria · 19/10/2026"
                maxLength={40}
                className="w-full bg-[#101014] border border-white/10 text-xs px-4 py-2.5 text-[#FAF8F5] placeholder-[#9A968E]/60 focus:outline-none focus:border-[#C9A84C] rounded-xl font-mono transition-colors"
              />
            </div>

            {/* Tab Switcher: Specifications vs History */}
            <div className="mb-6 flex-1">
              <div className="flex gap-2 border-b border-[#C9A84C]/20 pb-2 mb-3">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`py-1 px-3 text-xs font-mono tracking-wider transition-all rounded-full ${
                    activeTab === 'specs'
                      ? 'bg-[#C9A84C] text-[#0A0A0C] font-semibold shadow-md'
                      : 'text-[#9A968E] hover:text-[#FAF8F5] hover:bg-white/5'
                  }`}
                >
                  ESPECIFICAÇÕES
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-1 px-3 text-xs font-mono tracking-wider transition-all rounded-full ${
                    activeTab === 'history'
                      ? 'bg-[#C9A84C] text-[#0A0A0C] font-semibold shadow-md'
                      : 'text-[#9A968E] hover:text-[#FAF8F5] hover:bg-white/5'
                  }`}
                >
                  HISTÓRIA DA PEÇA
                </button>
              </div>

              {activeTab === 'specs' ? (
                <div className="space-y-2 text-xs font-mono">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-[#9A968E] uppercase tracking-wider">{key}:</span>
                      <span className="text-[#FAF8F5] text-right max-w-[60%]">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-[#9A968E] leading-relaxed font-sans space-y-2.5">
                  <p>{product.history}</p>
                  <div className="p-3.5 bg-[#0A0A0C] border border-[#C9A84C]/25 rounded-2xl flex items-center gap-2.5 text-[11px] text-[#C9A84C] font-mono">
                    <ShieldCheck size={18} className="shrink-0" />
                    <span>Peça autenticada com carimbo oficial 18K 750 da Aliança.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action CTAs */}
            <div className="mt-auto space-y-2.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#D4943E] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#D4943E] text-[#0A0A0C] font-semibold text-xs tracking-wider uppercase transition-all rounded-full flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>ADICIONADO À SACOLA</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>SOLICITAR DISPONIBILIDADE & SACOLA</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppInquiry}
                className="w-full py-3 px-5 bg-transparent hover:bg-emerald-950/25 text-[#FAF8F5] border border-emerald-500/50 hover:border-emerald-400 text-xs font-mono tracking-wider uppercase transition-colors rounded-full flex items-center justify-center gap-2"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>CHAMAR NO WHATSAPP (73) 98102-9862</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
