import React from 'react';
import { motion } from 'motion/react';
import { FEATURED_PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { ProductCardGraphic } from './LuxuryVisuals';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

interface FeaturedGridProps {
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
}

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({
  onSelectProduct,
  onToggleWishlist,
  isWishlisted,
}) => {
  return (
    <section id="pecas-destaque" className="w-full bg-[#0A0A0C] py-16 md:py-24 border-b border-[#C9A84C]/20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-5 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#121216] border border-[#C9A84C]/30 text-[10px] font-mono tracking-[0.2em] uppercase text-[#C9A84C]">
              <Sparkles size={11} />
              <span>CATÁLOGO DE PRECISÃO & JÓIAS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#FAF8F5] tracking-tight">
              Peças em Destaque
            </h2>
            <p className="text-sm md:text-base text-[#9A968E] mt-1 font-light">
              Especificações rigorosas, acabamentos manuais e autenticidade certificada.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#9A968E]">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121216] border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pronta Entrega</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121216] border border-white/5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Fabricação no Ateliê</span>
            </span>
          </div>
        </div>

        {/* 4-Column Spec-Driven Product Grid with Soft Rounded 2xl Cards and Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product, index) => {
            const wish = isWishlisted(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-[#121216] border border-[#C9A84C]/25 hover:border-[#C9A84C]/80 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(201,168,76,0.18)] cursor-pointer"
              >
                {/* Top Action Row: Category Tag & Wishlist Button with Rounded Pills */}
                <div className="p-4 flex items-center justify-between border-b border-white/5 z-10 bg-[#121216]/90 backdrop-blur-md">
                  <span className="text-[10px] font-mono tracking-wider text-[#C9A84C] uppercase px-2.5 py-0.5 rounded-full bg-[#0A0A0C]/80 border border-[#C9A84C]/20 font-semibold">
                    {product.category}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      wish
                        ? 'text-rose-400 bg-rose-950/40 border border-rose-500/40'
                        : 'text-[#9A968E] hover:text-[#FAF8F5] bg-white/5 border border-white/10'
                    }`}
                    title={wish ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart size={14} fill={wish ? 'currentColor' : 'none'} />
                  </motion.button>
                </div>

                {/* Center Visual Area */}
                <div className="relative w-full aspect-square flex items-center justify-center p-6 bg-[#0A0A0C]/80 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-108 transition-transform duration-700">
                    <ProductCardGraphic type={product.imageType} className="max-h-full" />
                  </div>
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#121216]/60 pointer-events-none" />
                </div>

                {/* Bottom Metadata & Spec-Sheet */}
                <div className="p-5 border-t border-white/5 bg-[#121216] z-10 flex flex-col justify-between flex-1">
                  <div>
                    {/* Reference Tag & Status Pill */}
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="text-[#9A968E]">{product.ref}</span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium ${
                          product.status === 'DISPONIVEL'
                            ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
                            : 'text-amber-400 bg-amber-950/40 border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.status === 'DISPONIVEL' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        <span>{product.statusText}</span>
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-lg font-serif text-[#FAF8F5] group-hover:text-[#C9A84C] transition-colors leading-snug line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] font-mono text-[#9A968E] uppercase block">
                        Valor Unitário
                      </span>
                      <span className="text-xl font-mono text-[#FAF8F5] font-light">
                        {product.price}
                      </span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-9 h-9 rounded-full border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0C] transition-all shadow-md"
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
