import React from 'react';
import { CartItem } from '../types';
import { BOUTIQUE_INFO } from '../data/mockData';
import { ProductCardGraphic } from './LuxuryVisuals';
import { X, Trash2, Plus, Minus, MessageCircle, ShieldCheck, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const total = items.reduce(
    (acc, item) => acc + item.product.rawPrice * item.quantity,
    0
  );

  const handleCheckoutWhatsApp = () => {
    let orderList = items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.product.title}* (${it.product.ref})\n` +
          `   Qtd: ${it.quantity}x — ${it.product.price}\n` +
          (it.ringSize ? `   Aro: ${it.ringSize}\n` : '') +
          (it.engravingText ? `   Gravação: "${it.engravingText}"\n` : '')
      )
      .join('\n');

    const text = encodeURIComponent(
      `Olá, Relojoaria e Joalheria Aliança!\n\n` +
      `Gostaria de formalizar o pedido da minha sacola digital:\n\n` +
      `${orderList}\n\n` +
      `*Total Estimado: R$ ${total.toLocaleString('pt-BR')},00*\n\n` +
      `Poderiam confirmar a disponibilidade e informar os dados para envio ou retirada na loja física de Porto Seguro?`
    );

    window.open(`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

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
                CURADORIA EXCLUSIVA
              </span>
              <h3 className="text-xl font-serif text-[#FAF8F5]">Sacola de Atendimento</h3>
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

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full border border-dashed border-[#C9A84C]/35 flex items-center justify-center text-[#C9A84C] bg-[#C9A84C]/5">
                  <ShoppingBag size={22} className="text-[#C9A84C]" />
                </div>
                <p className="text-base font-serif text-[#FAF8F5]">Sua sacola está vazia</p>
                <p className="text-xs text-[#9A968E] max-w-xs mx-auto leading-relaxed">
                  Explore nossas alianças em ouro 18k, relógios de alta precisão e joias exclusivas.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.product.id}
                  className="p-4 bg-[#17171F] border border-white/10 hover:border-[#C9A84C]/40 rounded-2xl flex gap-3.5 transition-all shadow-md"
                >
                  <div className="w-18 h-18 bg-[#0A0A0C] border border-[#C9A84C]/20 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                    <ProductCardGraphic type={item.product.imageType} className="scale-75" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-[#9A968E]">
                          {item.product.ref}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#9A968E] hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                      <h4 className="text-xs font-serif text-[#FAF8F5] line-clamp-1 mt-0.5 font-medium">
                        {item.product.title}
                      </h4>
                      {item.ringSize && (
                        <p className="text-[11px] font-mono text-[#C9A84C] mt-0.5">
                          Aro: {item.ringSize}
                        </p>
                      )}
                      {item.engravingText && (
                        <p className="text-[10px] font-mono text-[#9A968E] italic line-clamp-1 mt-0.5">
                          Gravação: "{item.engravingText}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
                      <div className="flex items-center border border-white/10 rounded-full bg-[#121216] px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 hover:text-[#C9A84C] text-[#9A968E] transition-colors rounded-full"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 hover:text-[#C9A84C] text-[#9A968E] transition-colors rounded-full"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-medium text-[#D4943E]">
                        R$ {(item.product.rawPrice * item.quantity).toLocaleString('pt-BR')},00
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#C9A84C]/20 bg-[#0E0E12] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#9A968E] uppercase tracking-wider">Subtotal Estimado</span>
                <span className="text-lg text-[#FAF8F5] font-semibold font-mono text-[#D4943E]">
                  R$ {total.toLocaleString('pt-BR')},00
                </span>
              </div>

              <div className="p-3 bg-[#17171F] border border-[#C9A84C]/20 rounded-2xl flex items-center gap-2.5 text-[11px] text-[#9A968E]">
                <ShieldCheck size={16} className="text-[#C9A84C] shrink-0" />
                <span>Atendimento direto com ourives e relojoeiros em Porto Seguro.</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#D4943E] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#D4943E] text-[#0A0A0C] font-semibold text-xs tracking-wider uppercase transition-all rounded-full flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(201,168,76,0.35)]"
              >
                <MessageCircle size={16} />
                <span>FINALIZAR ATENDIMENTO NO WHATSAPP</span>
              </motion.button>

              <button
                onClick={onClearCart}
                className="w-full py-1 text-[11px] font-mono text-[#9A968E] hover:text-[#FAF8F5] text-center transition-colors"
              >
                Esvaziar sacola
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
