import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCustomQuoteClick: () => void;
}

const SLIDES = [
  {
    eyebrow: 'OURIVESARIA PRÓPRIA EM PORTO SEGURO',
    headline: 'ALIANÇAS EM OURO FORJADAS PARA UMA VIDA INTEIRA.',
    subtitle:
      'Pares confeccionados em barra maciça de ouro 18k pelo mestre Hivo Marques, com interior anatômico e ajuste sob medida na Rua São Pedro.',
    tag: 'DESTAQUE PRINCIPAL',
    video: '/videos/hero-aliancas.mp4',
    poster: '/videos/hero-aliancas.jpg',
    badge: 'FORJA EM OURO 18K 750',
    meta: 'Par Anatômico Chanfrado · Acabamento Rústico & Polido',
  },
  {
    eyebrow: 'BANCADA LOCAL & PEÇAS EXCLUSIVAS',
    headline: 'ALIANÇAS FORJADAS NA CHAMA DO NOSSO ATELIÊ.',
    subtitle:
      'Modelos anatômicos e chanfrados produzidos em barra contínua de ouro 18k 750, com acabamento esculpido na lima e gravação cortesia.',
    tag: 'FUSÃO CONTÍNUA',
    video: '/videos/forja-anel-fogo.mp4',
    poster: '/videos/forja-anel-fogo.jpg',
    badge: 'CHAMA ATIVA A 1064°C',
    meta: 'Solda de Alta Temperatura · Zero Emendas Frágeis',
  },
  {
    eyebrow: 'ALTA RELOJOARIA & REVISÃO MECÂNICA',
    headline: 'CRONÓGRAFOS COM CALIBRE AUTOMÁTICO E REVISÃO NA LOJA.',
    subtitle:
      'Caixas em aço cirúrgico e ouro 18k com cristal de safira, teste de estanqueidade e assistência técnica em nossa bancada.',
    tag: 'HAUTE HORLOGERIE',
    video: '/videos/relojoaria-cronografo.mp4',
    poster: '/videos/relojoaria-cronografo.jpg',
    badge: 'CALIBRE 28.800 VPH',
    meta: 'Aço 316L & Ouro 18K · Cristal de Safira Antirreflexo',
  },
  {
    eyebrow: 'REFORMA DE OURO & RESTAURAÇÃO',
    headline: 'SUA JOIA DE FAMÍLIA TRANSFORMADA EM PORTO SEGURO.',
    subtitle:
      'Derretemos ouro antigo para forjar novas alianças, fazemos ajustes de aro no mesmo dia e polimento com pasta diamantada.',
    tag: 'OFICINA LOCAL',
    video: '/videos/ourives-bancada.mp4',
    poster: '/videos/ourives-bancada.jpg',
    badge: 'MESTRE OURIVES NA BANCADA',
    meta: 'Atendimento Direto na Rua São Pedro, 650',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCustomQuoteClick,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const slide = SLIDES[activeSlide];

  return (
    <section className="relative w-full bg-[#0A0A0C] border-b border-[#C9A84C]/20 overflow-hidden py-8 sm:py-12 md:py-20">
      {/* Dynamic Ambient Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#C9A84C]/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#D4943E]/10 rounded-full blur-[130px] pointer-events-none animate-float-slow" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Asymmetric 50/50 Dark Chiaroscuro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Animated Editorial & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              {/* Brand Logo on top of headline (2x bigger) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: '120px' }}
                className="mb-6 sm:mb-8 flex items-center text-[120px]"
              >
                <BrandLogo className="h-[80px] sm:h-[105px] lg:h-[120px] w-auto max-w-full" />
              </motion.div>

              {/* Main Headline with Smooth Text Motion */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`headline-${activeSlide}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl sm:text-5xl lg:text-[58px] font-serif font-normal text-[#FAF8F5] leading-[1.08] tracking-[-0.015em] mb-6 [text-wrap:balance]"
                >
                  {slide.headline}
                </motion.h1>
              </AnimatePresence>

              {/* Subtitle */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`sub-${activeSlide}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base sm:text-lg text-[#9A968E] font-light leading-relaxed mb-8 max-w-xl"
                >
                  {slide.subtitle}
                </motion.p>
              </AnimatePresence>

              {/* CTA Group with Soft Pill Buttons and Spring Physics */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreClick}
                  className="px-7 py-4 bg-gradient-to-r from-[#C9A84C] to-[#D4943E] hover:from-[#D4943E] hover:to-[#C9A84C] text-[#0A0A0C] font-semibold text-xs font-mono tracking-[0.14em] uppercase transition-all rounded-full flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_30px_rgba(201,168,76,0.45)] cursor-pointer"
                >
                  <span>VER ALIANÇAS E RELÓGIOS</span>
                  <ArrowRight size={15} className="text-[#0A0A0C]" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCustomQuoteClick}
                  className="px-6 py-4 bg-[#121216]/80 hover:bg-[#1A1A22] text-[#FAF8F5] hover:text-[#C9A84C] border border-[#C9A84C]/40 hover:border-[#C9A84C] text-xs font-mono tracking-[0.12em] uppercase transition-all rounded-full flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
                >
                  <Sparkles size={14} className="text-[#C9A84C]" />
                  <span>ENCOMENDAR SOB MEDIDA</span>
                </motion.button>
              </div>
            </div>

            {/* Slide Indicator at bottom-left: 01 ————— 04 with Soft Rounded Pill Design */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 pt-4 border-t border-white/10"
            >
              <span className="text-xs font-mono font-medium text-[#FAF8F5]">
                {`0${activeSlide + 1}`}
              </span>

              {/* Interactive Rounded Progress Line Segments */}
              <div className="flex items-center gap-2 flex-1 max-w-[220px]">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      index === activeSlide
                        ? 'w-10 bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.6)]'
                        : 'w-5 bg-white/20 hover:bg-white/40'
                    }`}
                    title={`Ir para destaque 0${index + 1}`}
                  />
                ))}
              </div>

              <span className="text-xs font-mono text-[#9A968E]">04</span>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() =>
                    setActiveSlide((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1))
                  }
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-[#C9A84C] flex items-center justify-center text-[#9A968E] hover:text-[#FAF8F5] transition-colors"
                  aria-label="Slide anterior"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setActiveSlide((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0))
                  }
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-[#C9A84C] flex items-center justify-center text-[#9A968E] hover:text-[#FAF8F5] transition-colors"
                  aria-label="Próximo slide"
                >
                  →
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Real Luxury Video with Soft Rounded 3xl Silhouette and Motion */}
          <div className="relative w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[480px] aspect-[9/16] max-h-[640px] bg-[#121216] border border-[#C9A84C]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(201,168,76,0.18)]"
            >
              {/* Active Video Player with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.video
                  key={slide.video}
                  src={slide.video}
                  poster={slide.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105 border-none"
                  style={{ borderStyle: 'none' }}
                />
              </AnimatePresence>

              {/* Dark chiaroscuro soft vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-transparent to-[#0A0A0C]/40 pointer-events-none" />

              {/* Audio Toggle Button */}
              <div className="absolute top-5 right-5 z-10">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-full bg-[#0A0A0C]/80 hover:bg-[#C9A84C] text-[#FAF8F5] hover:text-[#0A0A0C] border border-white/10 transition-all shadow-lg cursor-pointer"
                  title={isMuted ? 'Ativar áudio' : 'Mutar áudio'}
                  aria-label={isMuted ? 'Ativar áudio' : 'Mutar áudio'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
