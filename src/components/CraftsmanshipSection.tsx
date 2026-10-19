import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BOUTIQUE_INFO } from '../data/mockData';
import { ArrowRight, Flame, Shield, Wrench, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface CraftsmanshipSectionProps {
  onOpenAtelier: () => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  onOpenAtelier,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="w-full bg-[#0E0E12] border-y border-[#C9A84C]/25 py-16 md:py-24 relative overflow-hidden">
      {/* Ambient Gold Rays */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C9A84C]/8 rounded-full blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#D4943E]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column (7 cols): Editorial Serif Statement & Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-[#121216] border border-[#C9A84C]/35 text-xs font-mono uppercase tracking-[0.16em] text-[#C9A84C] self-start shadow-sm">
              <Sparkles size={12} />
              <span>A ARTE DA OURIVESARIA & RELOJOARIA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FAF8F5] leading-tight tracking-tight mb-6 [text-wrap:balance]">
              FORJAMOS CADA ALIANÇA NA PRÓPRIA LOJA, DO MAÇARICO AO POLIMENTO.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#9A968E] font-light leading-relaxed mb-8">
              <p>
                Na Rua São Pedro, o mestre ourives{' '}
                <span className="text-[#C9A84C] font-normal">{BOUTIQUE_INFO.goldsmithInstagram}</span>{' '}
                atende você diretamente na bancada. Cada par de alianças sob medida nasce do derretimento de ouro 18k 750,
                da forja a maçarico e da laminação contínua em peça única.
              </p>
              <p>
                Para relógios, nossa oficina realiza testes de estanqueidade a vácuo, troca imediata de baterias originais
                e restauração de caixas com polimento diamantado.
              </p>
            </div>

            {/* Atelier Highlights with Soft Rounded-xl Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 pt-4 border-t border-white/5 text-xs font-mono">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121216]/80 border border-white/5 text-[#FAF8F5]">
                <Flame size={16} className="text-[#C9A84C] shrink-0" />
                <span>Ouro 18k Maciço</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121216]/80 border border-white/5 text-[#FAF8F5]">
                <Wrench size={16} className="text-[#C9A84C] shrink-0" />
                <span>Bancada de Precisão</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121216]/80 border border-white/5 text-[#FAF8F5]">
                <Shield size={16} className="text-[#C9A84C] shrink-0" />
                <span>Garantia Vitalícia</span>
              </div>
            </div>

            {/* CTA Button with Soft Rounded-full Pill */}
            <div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenAtelier}
                className="px-8 py-4 bg-transparent hover:bg-[#C9A84C]/15 text-[#FAF8F5] border border-[#C9A84C] text-xs font-mono tracking-[0.14em] uppercase transition-all rounded-full inline-flex items-center gap-2.5 group shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] cursor-pointer"
              >
                <span>SOLICITAR PROJETO SOB MEDIDA</span>
                <ArrowRight size={15} className="text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Real Workshop Video with Soft Rounded 3xl Shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-[#0A0A0C] border border-[#C9A84C]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(201,168,76,0.18)] aspect-[9/16] max-h-[560px] mx-auto group">
              <video
                src="/videos/ourives-bancada.mp4"
                poster="/videos/ourives-bancada.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-transparent to-[#0A0A0C]/30 pointer-events-none" />

              {/* In-house Badge Pill */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="bg-[#121216]/95 border border-[#C9A84C]/40 px-3.5 py-1.5 rounded-full text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider backdrop-blur-md font-semibold shadow-md">
                  BANCADA ATIVA · CENTRO
                </span>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-[#0A0A0C]/85 hover:bg-[#C9A84C] text-[#FAF8F5] hover:text-[#0A0A0C] border border-white/15 transition-all shadow-md"
                  title={isMuted ? 'Ativar áudio' : 'Mutar áudio'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>

              {/* Bottom Inscription Rounded Card Inset */}
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-[#0E0E12]/95 border border-[#C9A84C]/30 p-4 rounded-2xl flex items-center justify-between text-[11px] font-mono text-[#9A968E] backdrop-blur-md shadow-xl">
                <span>Ourives: Hivo Marques</span>
                <span className="text-[#C9A84C] font-semibold">Rua São Pedro, 650</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
