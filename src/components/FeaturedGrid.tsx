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
            <h2 className="text-3xl md:text-4xl font-serif text-[#FAF8F5] tracking-tight">
              Peças em Destaque
            </h2>
            <p className="text-sm md:text-base text-[#9A968E] mt-1 font-light">
              Especificações rigorosas, acabamentos manuais e autenticidade certificada.
            </p>
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
                {/* Center Visual Area */}
                <div className="relative w-full aspect-square flex items-center justify-center p-6 bg-[#0A0A0C]/80 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-108 transition-transform duration-700">
                    <ProductCardGraphic
                      type={product.imageType}
                      imageUrl={product.imageUrl}
                      alt={product.title}
                      className="max-h-full"
                    />
                  </div>
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#121216]/60 pointer-events-none" />
                </div>

                {/* Bottom Metadata & Spec-Sheet */}
                <div className="p-5 border-t border-white/5 bg-[#121216] z-10 flex flex-col justify-between flex-1">
                  <div>
                    {/* Reference Tag */}
                    <div className="text-[10px] font-mono text-[#9A968E] mb-2">
                      <span>{product.ref}</span>
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
