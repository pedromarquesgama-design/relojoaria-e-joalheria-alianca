import React from 'react';
import { Product } from '../types';
import { ProductCardGraphic } from './LuxuryVisuals';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="w-full max-w-md bg-[#121216] border-l border-[#C9A84C]/30 text-[#FAF8F5] shadow-[-15px_0_40px_rgba(0,0,0,0.8)] flex flex-col h-full rounded-l-3xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#C9A84C]/20 flex items-center justify-between bg-[#0E0E12]/80 backdrop-blur-md">
            <div>
              <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-[#C9A84C] block">
                PEÇAS FAVORITAS
              </span>
              <h3 className="text-xl font-serif text-[#FAF8F5]">Sua Seleção Pessoal</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-[#9A968E] hover:text-[#FAF8F5] rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
              aria-label="Fechar"
            >
              <X size={18} />
            </motion.button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full border border-dashed border-[#C9A84C]/35 flex items-center justify-center text-[#C9A84C] bg-[#C9A84C]/5">
                  <Heart size={22} className="text-[#C9A84C]" />
                </div>
                <p className="text-base font-serif text-[#FAF8F5]">Nenhum item salvo</p>
                <p className="text-xs text-[#9A968E] max-w-xs mx-auto leading-relaxed">
                  Marque o coração nas peças que mais lhe encantam para consultá-las a qualquer momento.
                </p>
              </div>
            ) : (
              items.map((prod) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={prod.id}
                  className="p-4 bg-[#17171F] border border-white/10 hover:border-[#C9A84C]/40 rounded-2xl flex gap-3.5 transition-all shadow-md"
                >
                  <div className="w-16 h-16 bg-[#0A0A0C] border border-[#C9A84C]/20 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                    <ProductCardGraphic type={prod.imageType} className="scale-75" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-[#9A968E]">
                          {prod.ref}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onRemove(prod.id)}
                          className="text-[#9A968E] hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 size={13} />
                        </motion.button>
                      </div>
                      <h4 className="text-xs font-serif text-[#FAF8F5] line-clamp-1 mt-0.5 font-medium">
                        {prod.title}
                      </h4>
                      <p className="text-xs font-mono text-[#D4943E] mt-1 font-medium">
                        {prod.price}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/5">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onMoveToCart(prod);
                          onRemove(prod.id);
                        }}
                        className="w-full py-2 px-3 bg-[#C9A84C]/15 hover:bg-[#C9A84C] text-[#FAF8F5] hover:text-[#0A0A0C] text-[11px] font-mono uppercase tracking-wider transition-all rounded-full flex items-center justify-center gap-1.5 border border-[#C9A84C]/35 font-medium"
                      >
                        <ShoppingBag size={13} />
                        <span>Mover para a Sacola</span>
                      </motion.button>
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
