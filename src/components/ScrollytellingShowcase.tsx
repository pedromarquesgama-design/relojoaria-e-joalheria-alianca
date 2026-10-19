import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Clock, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollytellingShowcaseProps {
  onOpenAtelier: () => void;
  onExploreProducts: () => void;
}

export const ScrollytellingShowcase: React.FC<ScrollytellingShowcaseProps> = ({
  onOpenAtelier,
  onExploreProducts,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Marquee horizontal scroll
      if (marqueeRef.current && containerRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 2. Animated Stats Counters
      const triggerStats = (el: HTMLElement | null, targetVal: number, decimals = 0) => {
        if (!el || !containerRef.current) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { textContent: '0' },
              {
                textContent: targetVal,
                duration: 2.2,
                ease: 'power2.out',
                snap: { textContent: decimals === 0 ? 1 : 0.01 },
              }
            );
          },
        });
      };

      triggerStats(stat1Ref.current, 750, 0);
      triggerStats(stat2Ref.current, 28800, 0);
      triggerStats(stat3Ref.current, 100, 0);
      triggerStats(stat4Ref.current, 0.02, 2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#070709] border-b border-[#C9A84C]/25 py-20 md:py-28 overflow-hidden"
    >
      {/* Background Subtle Gradient & Floating Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#171720]/40 via-[#0A0A0C] to-[#070709] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none animate-float-slow" />

      {/* 1. SECTION INTRO BADGE & HEADLINE */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-[#121216]/90 border border-[#C9A84C]/40 rounded-full backdrop-blur-md shadow-lg"
        >
          <Sparkles size={13} className="text-[#C9A84C]" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#C9A84C] uppercase font-semibold">
            ATELIÊ IMERSIVO & ALTA PRECISÃO
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] tracking-tight max-w-3xl mx-auto"
        >
          A Matéria Nobre sob a Ótica da Precisão Suíça
        </motion.h2>
        <p className="text-sm md:text-base text-[#9A968E] mt-3 font-light max-w-2xl mx-auto">
          Onde a tolerância micrométrica da relojoaria mecânica encontra a força do ouro 18k forjado na bancada.
        </p>
      </div>

      {/* 2. OVERSIZED HORIZONTAL TEXT MARQUEE */}
      <div className="w-full overflow-hidden select-none py-6 my-4 border-y border-[#C9A84C]/15 bg-[#0A0A0C]/80 relative z-10">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap text-[8vw] sm:text-[7vw] lg:text-[6vw] font-serif font-light text-[#FAF8F5]/85 uppercase tracking-[0.08em]"
          style={{ willChange: 'transform' }}
        >
          OURO 18K 750 · ALTA RELOJOARIA SUÍÇA · OURIVESARIA ARTESANAL PRÓPRIA · PORTO SEGURO · OFICINA DE RESTAURAÇÃO · LENTES UV400 ·&nbsp;
          OURO 18K 750 · ALTA RELOJOARIA SUÍÇA · OURIVESARIA ARTESANAL PRÓPRIA · PORTO SEGURO · OFICINA DE RESTAURAÇÃO · LENTES UV400 ·
        </div>
      </div>

      {/* 3. DUAL-VIEWPORT LUXURY VIDEO SHOWCASE with Soft Rounded 3xl Design */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 my-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Video: Solid Gold Wedding Bands */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.5 }}
            className="group relative bg-[#121216] border border-[#C9A84C]/35 rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(201,168,76,0.12)] hover:border-[#C9A84C]/70 transition-colors"
          >
            <div className="relative aspect-[9/14] sm:aspect-[4/5] overflow-hidden">
              <video
                src="/videos/hero-aliancas.mp4"
                poster="/videos/hero-aliancas.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-5 left-5 bg-[#0A0A0C]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A84C]/35 text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider font-semibold shadow-md">
                OURIVESARIA · FORJA CONTÍNUA
              </div>

              <div className="absolute bottom-5 left-5 right-5 bg-[#0A0A0C]/90 backdrop-blur-md border border-white/10 p-4.5 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <h4 className="text-base font-serif text-[#FAF8F5]">Par Alianças 18K Anatômico</h4>
                  <p className="text-[11px] font-mono text-[#9A968E] mt-0.5">Forjadas a 1064°C na Rua São Pedro</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenAtelier}
                  className="w-10 h-10 rounded-full bg-[#C9A84C] text-[#0A0A0C] hover:bg-[#D4943E] transition-colors flex items-center justify-center shadow-lg"
                  title="Orçamento sob medida"
                >
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Video: Precision Automatic Chronograph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative bg-[#121216] border border-[#C9A84C]/35 rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(201,168,76,0.12)] hover:border-[#C9A84C]/70 transition-colors"
          >
            <div className="relative aspect-[9/14] sm:aspect-[4/5] overflow-hidden">
              <video
                src="/videos/relojoaria-cronografo.mp4"
                poster="/videos/relojoaria-cronografo.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-5 left-5 bg-[#0A0A0C]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A84C]/35 text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider font-semibold shadow-md">
                HAUTE HORLOGERIE · 28.800 VPH
              </div>

              <div className="absolute bottom-5 left-5 right-5 bg-[#0A0A0C]/90 backdrop-blur-md border border-white/10 p-4.5 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <h4 className="text-base font-serif text-[#FAF8F5]">Cronógrafo Automático Steel & Gold</h4>
                  <p className="text-[11px] font-mono text-[#9A968E] mt-0.5">Calibre Suíço revisado com vácuo</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onExploreProducts}
                  className="w-10 h-10 rounded-full bg-[#C9A84C] text-[#0A0A0C] hover:bg-[#D4943E] transition-colors flex items-center justify-center shadow-lg"
                  title="Ver no catálogo"
                >
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. STATS SECTION (Soft Rounded Cards with Animated Counters) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            whileHover={{ y: -4, borderColor: 'rgba(201, 168, 76, 0.6)' }}
            className="bg-[#121216]/90 border border-[#C9A84C]/25 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-2">
              <Award size={20} className="text-[#C9A84C]" />
            </div>
            <div className="flex items-baseline gap-1 text-3xl sm:text-4xl font-mono text-[#FAF8F5] font-light">
              <span ref={stat1Ref} className="text-[#C9A84C]">
                0
              </span>
              <span className="text-lg text-[#9A968E]">‰</span>
            </div>
            <span className="text-[11px] font-mono tracking-wider text-[#9A968E] uppercase mt-2">
              Pureza Ouro 18K
            </span>
            <span className="text-[10px] text-[#9A968E]/60 mt-0.5">Certificação Vitalícia</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, borderColor: 'rgba(201, 168, 76, 0.6)' }}
            className="bg-[#121216]/90 border border-[#C9A84C]/25 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-2">
              <Clock size={20} className="text-[#C9A84C]" />
            </div>
            <div className="flex items-baseline gap-1 text-3xl sm:text-4xl font-mono text-[#FAF8F5] font-light">
              <span ref={stat2Ref} className="text-[#C9A84C]">
                0
              </span>
              <span className="text-lg text-[#9A968E]">vph</span>
            </div>
            <span className="text-[11px] font-mono tracking-wider text-[#9A968E] uppercase mt-2">
              Frequência Mecânica
            </span>
            <span className="text-[10px] text-[#9A968E]/60 mt-0.5">Calibres de Alta Batida</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, borderColor: 'rgba(201, 168, 76, 0.6)' }}
            className="bg-[#121216]/90 border border-[#C9A84C]/25 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-2">
              <Flame size={20} className="text-[#C9A84C]" />
            </div>
            <div className="flex items-baseline gap-1 text-3xl sm:text-4xl font-mono text-[#FAF8F5] font-light">
              <span ref={stat3Ref} className="text-[#C9A84C]">
                0
              </span>
              <span className="text-lg text-[#9A968E]">%</span>
            </div>
            <span className="text-[11px] font-mono tracking-wider text-[#9A968E] uppercase mt-2">
              Forja Própria na Bancada
            </span>
            <span className="text-[10px] text-[#9A968E]/60 mt-0.5">Sem Terceirização</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, borderColor: 'rgba(201, 168, 76, 0.6)' }}
            className="bg-[#121216]/90 border border-[#C9A84C]/25 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-2">
              <ShieldCheck size={20} className="text-[#C9A84C]" />
            </div>
            <div className="flex items-baseline gap-1 text-3xl sm:text-4xl font-mono text-[#FAF8F5] font-light">
              <span ref={stat4Ref} className="text-[#C9A84C]">
                0
              </span>
              <span className="text-lg text-[#9A968E]">mm</span>
            </div>
            <span className="text-[11px] font-mono tracking-wider text-[#9A968E] uppercase mt-2">
              Tolerância de Ajuste
            </span>
            <span className="text-[10px] text-[#9A968E]/60 mt-0.5">Medição Micrométrica</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
