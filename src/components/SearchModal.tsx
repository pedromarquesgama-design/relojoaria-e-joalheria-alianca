import React, { useState, useMemo } from 'react';
import { FEATURED_PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { ProductCardGraphic } from './LuxuryVisuals';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return FEATURED_PRODUCTS;
    const q = query.toLowerCase();
    return FEATURED_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#121216] border border-[#C9A84C]/35 text-[#FAF8F5] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-3xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#C9A84C]/20 flex items-center gap-3 bg-[#0E0E12]/90 backdrop-blur-md">
            <Search size={20} className="text-[#C9A84C] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por aliança, relógio, ouro 18k ou referência (ex: AL-18K-01)..."
              className="flex-1 bg-transparent border-none text-sm font-sans text-[#FAF8F5] placeholder-[#9A968E] focus:outline-none"
            />
            {query && (
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuery('')}
                className="p-1.5 text-[#9A968E] hover:text-[#FAF8F5] rounded-full"
              >
                <X size={16} />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="text-xs font-mono tracking-wider text-[#9A968E] hover:text-[#FAF8F5] px-3 py-1.5 border border-white/10 hover:border-[#C9A84C]/40 rounded-full bg-white/5 transition-colors"
            >
              ESC
            </motion.button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2.5">
            <div className="text-[10px] font-mono tracking-wider text-[#9A968E] uppercase px-2 flex justify-between">
              <span>{filtered.length} Peças Encontradas na Curadoria</span>
              <span className="text-[#C9A84C]">Porto Seguro · BA</span>
            </div>

            {filtered.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#9A968E] space-y-2">
                <p className="font-serif text-base text-[#FAF8F5]">Nenhum item correspondente à busca</p>
                <p>Tente termos como "aliança", "ouro 18k", "cronógrafo" ou "óculos".</p>
              </div>
            ) : (
              filtered.map((prod) => (
                <motion.div
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="p-3.5 bg-[#17171F] hover:bg-[#1E1E28] border border-white/5 hover:border-[#C9A84C]/40 rounded-2xl cursor-pointer flex items-center justify-between transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-13 h-13 bg-[#0A0A0C] border border-[#C9A84C]/25 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                      <ProductCardGraphic type={prod.imageType} className="scale-65" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider block">
                        {prod.category} · {prod.ref}
                      </span>
                      <h4 className="text-sm font-serif text-[#FAF8F5] group-hover:text-[#C9A84C] transition-colors">
                        {prod.title}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-medium text-[#D4943E] block">
                      {prod.price}
                    </span>
                    <div className="text-[10px] font-mono text-[#9A968E] group-hover:text-[#FAF8F5] transition-colors">
                      Ver detalhes →
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
