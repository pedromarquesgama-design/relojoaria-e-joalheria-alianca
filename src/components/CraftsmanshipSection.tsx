import React from 'react';
import { motion } from 'motion/react';
import { BOUTIQUE_INFO } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

interface CraftsmanshipSectionProps {
  onOpenAtelier: () => void;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({
  onOpenAtelier,
}) => {
  return (
    <section className="w-full bg-[#0E0E12] border-y border-[#C9A84C]/25 py-16 md:py-24 relative overflow-hidden">
      {/* Ambient Gold Rays */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C9A84C]/8 rounded-full blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#D4943E]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* 1. Headline on Top (Full Width Editorial Serif) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-10 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FAF8F5] leading-[1.14] tracking-tight [text-wrap:balance]">
            FORJAMOS CADA ALIANÇA NA PRÓPRIA LOJA, DO MAÇARICO AO POLIMENTO.
          </h2>
        </motion.div>

        {/* 2. Side-by-Side: Video alongside Subtitle + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Workshop Video Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 lg:col-span-5"
          >
            <div className="relative bg-[#0A0A0C] border border-[#C9A84C]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(201,168,76,0.18)] aspect-[9/14] sm:aspect-[9/15] max-h-[520px] w-full mx-auto group">
              <video
                src="/videos/ourives-bancada.mp4"
                poster="/videos/ourives-bancada.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/80 via-transparent to-[#0A0A0C]/25 pointer-events-none" />
            </div>
          </motion.div>

          {/* Subtitle Column on the side of the video + CTA at the bottom (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7 lg:col-span-7 flex flex-col justify-center"
          >
            <div className="space-y-5 text-base sm:text-lg text-[#9A968E] font-light leading-relaxed mb-8">
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

            {/* CTA Button at the bottom of the subtitle */}
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
        </div>
      </div>
    </section>
  );
};
