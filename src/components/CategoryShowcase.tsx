import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/mockData';
import { CategoryGraphic } from './LuxuryVisuals';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryId: string) => void;
  onViewAll: () => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  onViewAll,
}) => {
  return (
    <section id="categorias-showcase" className="w-full bg-[#0A0A0C] py-16 md:py-24 border-b border-[#C9A84C]/20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-5 border-b border-white/5">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#FAF8F5] tracking-tight">
              Categorias da Boutique
            </h2>
            <p className="text-sm md:text-base text-[#9A968E] mt-1 font-light">
              Alianças forjadas em ouro 18k, correntes maciças, cronógrafos com revisão e armações nobres.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewAll}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#121216] border border-[#C9A84C]/40 hover:border-[#C9A84C] text-xs font-mono tracking-widest text-[#C9A84C] hover:text-[#FAF8F5] uppercase transition-all shadow-md self-start md:self-end cursor-pointer"
          >
            <span>VER CATÁLOGO COMPLETO</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>

        {/* 4 Tall Portrait Cards with Soft Rounded 2xl Silhouette and Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-[#121216] border border-[#C9A84C]/25 hover:border-[#C9A84C]/80 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(201,168,76,0.2)]"
            >

              {/* Center Macro Visual / Video */}
              <div className="relative w-full aspect-[3/4] flex items-center justify-center overflow-hidden bg-[#0A0A0C]">
                {cat.video ? (
                  <video
                    src={cat.video}
                    poster={cat.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center filter brightness-90 group-hover:brightness-105 group-hover:scale-110 transition-all duration-700"
                  />
                ) : (
                  <CategoryGraphic
                    type={cat.imageType}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Subtle bottom dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Card Copy with Soft Styling */}
              <div className="p-5 border-t border-white/5 bg-[#121216] z-10">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xl font-serif text-[#FAF8F5] group-hover:text-[#C9A84C] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0C] transition-all shadow-md group-hover:scale-110">
                    <ArrowRight size={13} />
                  </div>
                </div>
                <p className="text-xs text-[#9A968E] line-clamp-2 font-light">
                  {cat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
