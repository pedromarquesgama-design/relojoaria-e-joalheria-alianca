import React from 'react';
import { motion } from 'motion/react';
import { BENTO_NOIVOS_ITEMS, BENTO_WATCH_ITEMS } from '../data/mockData';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface SplitBentoProps {
  onOpenAtelier: () => void;
  onExploreCategory: (cat: string) => void;
}

export const SplitBento: React.FC<SplitBentoProps> = ({
  onOpenAtelier,
  onExploreCategory,
}) => {
  return (
    <section className="w-full bg-[#0A0A0C] py-16 md:py-24 border-b border-[#C9A84C]/20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-[#121216] border border-[#C9A84C]/30 text-[10px] font-mono tracking-[0.2em] uppercase text-[#C9A84C]">
            <Sparkles size={11} />
            <span>LANÇAMENTOS & FABRICAÇÃO PRÓPRIA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#FAF8F5] tracking-tight">
            Curadorias em Destaque
          </h2>
          <p className="text-sm md:text-base text-[#9A968E] mt-2 font-light">
            O casamento perfeito entre a joalheria matrimonial artesanal e a precisão dos relógios e armações.
          </p>
        </div>

        {/* 2-Column Asymmetric Bento Grid with Soft Rounded 3xl Silhouette and Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Box: ESPECIAL NOIVOS & COMPROMISSO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5 }}
            className="bg-[#121216] border border-[#C9A84C]/30 rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#C9A84C]/70 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.95),0_0_25px_rgba(201,168,76,0.15)]"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase block font-semibold">
                    ATELIER EXCLUSIVO
                  </span>
                  <h3 className="text-2xl font-serif text-[#FAF8F5]">
                    Especial Noivos & Compromisso
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onExploreCategory('aliancas')}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#C9A84C]/10 border border-white/10 hover:border-[#C9A84C] text-xs font-mono tracking-wider text-[#9A968E] hover:text-[#C9A84C] flex items-center gap-1.5 uppercase transition-all cursor-pointer"
                >
                  <span>Ver Todos</span>
                  <ArrowRight size={13} />
                </motion.button>
              </div>

              {/* Inner Split: Large feature video left + 3 stacked mini-cards right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                {/* Large feature video (5 cols) with Soft Rounded 2xl Container */}
                <div className="md:col-span-5 bg-[#0C0C10] border border-[#C9A84C]/30 rounded-2xl overflow-hidden relative aspect-square group/bento shadow-lg">
                  <video
                    src="/videos/alianca-estojo-noivos.mp4"
                    poster="/videos/alianca-estojo-noivos.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover/bento:brightness-105 group-hover/bento:scale-108 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-center text-[10px] font-mono text-[#FAF8F5] bg-[#121216]/90 backdrop-blur-md py-1.5 rounded-full border border-white/10 font-medium">
                    FORJA ARTESANAL & ESTOJO
                  </div>
                </div>

                {/* 3 Stacked Mini-Cards (7 cols) with Soft Rounded xl Design */}
                <div className="md:col-span-7 space-y-3">
                  {BENTO_NOIVOS_ITEMS.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4, borderColor: 'rgba(201, 168, 76, 0.5)' }}
                      onClick={onOpenAtelier}
                      className="p-3.5 bg-[#171720]/90 hover:bg-[#1E1E2A] border border-white/10 rounded-xl transition-all cursor-pointer group shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-serif text-[#FAF8F5] group-hover:text-[#C9A84C] transition-colors font-medium">
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono text-[#9A968E] px-2 py-0.5 bg-[#121216] border border-white/10 rounded-full">
                          {item.ref}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9A968E] font-light">
                        {item.subtitle}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action with Soft Rounded Pill */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs text-[#9A968E] flex items-center gap-1.5 font-light">
                <CheckCircle2 size={14} className="text-[#C9A84C] shrink-0" />
                <span>Largura, aro e gravação direta com o ourives</span>
              </span>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenAtelier}
                className="px-4 py-2 rounded-full bg-[#C9A84C]/15 hover:bg-[#C9A84C] border border-[#C9A84C]/40 text-xs font-mono text-[#C9A84C] hover:text-[#0A0A0C] uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                <span>Agendar Prova →</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Box: SELEÇÃO RELÓGIOS & ÓCULOS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#121216] border border-[#C9A84C]/30 rounded-3xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#C9A84C]/70 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.95),0_0_25px_rgba(201,168,76,0.15)]"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase block font-semibold">
                    ALTA PRECISÃO & ESTILO
                  </span>
                  <h3 className="text-2xl font-serif text-[#FAF8F5]">
                    Seleção Relógios & Óculos
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onExploreCategory('relogios')}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#C9A84C]/10 border border-white/10 hover:border-[#C9A84C] text-xs font-mono tracking-wider text-[#9A968E] hover:text-[#C9A84C] flex items-center gap-1.5 uppercase transition-all cursor-pointer"
                >
                  <span>Ver Modelos</span>
                  <ArrowRight size={13} />
                </motion.button>
              </div>

              {/* Inner Split: Large feature video left + 3 stacked mini-cards right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                {/* Large feature video (5 cols) with Soft Rounded 2xl Container */}
                <div className="md:col-span-5 bg-[#0C0C10] border border-[#C9A84C]/30 rounded-2xl overflow-hidden relative aspect-square group/bento shadow-lg">
                  <video
                    src="/videos/relojoaria-cronografo.mp4"
                    poster="/videos/relojoaria-cronografo.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover/bento:brightness-105 group-hover/bento:scale-108 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-center text-[10px] font-mono text-[#FAF8F5] bg-[#121216]/90 backdrop-blur-md py-1.5 rounded-full border border-white/10 font-medium">
                    CALIBRES AUTOMÁTICOS
                  </div>
                </div>

                {/* 3 Stacked Mini-Cards (7 cols) with Soft Rounded xl Design */}
                <div className="md:col-span-7 space-y-3">
                  {BENTO_WATCH_ITEMS.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4, borderColor: 'rgba(201, 168, 76, 0.5)' }}
                      onClick={() => onExploreCategory(idx === 1 ? 'oculos' : 'relogios')}
                      className="p-3.5 bg-[#171720]/90 hover:bg-[#1E1E2A] border border-white/10 rounded-xl transition-all cursor-pointer group shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-serif text-[#FAF8F5] group-hover:text-[#C9A84C] transition-colors font-medium">
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono text-[#9A968E] px-2 py-0.5 bg-[#121216] border border-white/10 rounded-full">
                          {item.ref}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9A968E] font-light">
                        {item.subtitle}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action with Soft Rounded Pill */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs text-[#9A968E] flex items-center gap-1.5 font-light">
                <CheckCircle2 size={14} className="text-[#C9A84C] shrink-0" />
                <span>Revisão mecânica e teste de estanqueidade na bancada</span>
              </span>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onExploreCategory('relogios')}
                className="px-4 py-2 rounded-full bg-[#C9A84C]/15 hover:bg-[#C9A84C] border border-[#C9A84C]/40 text-xs font-mono text-[#C9A84C] hover:text-[#0A0A0C] uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                <span>Consultar Relógios →</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
