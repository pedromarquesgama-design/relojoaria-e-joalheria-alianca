import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppGlyph } from './HouseIcons';
import { BOUTIQUE_INFO } from '../data/mockData';

/**
 * Mobile vertical landing page — "ALIANÇA RELOJOARIA E JOALHERIA".
 *
 * The hero is a synchronized carousel: swiping or letting it auto-advance
 * swaps the media, the headline and the subtext together so each slide reads
 * as one cohesive moment.
 *
 * The whole page is a fixed-height flex column: the media card absorbs the
 * leftover height (flex-1 / min-h-0) so nothing ever forces a page scroll.
 */

interface Slide {
  id: string;
  /** Video played as the full-bleed background of the slide. */
  video: string;
  /** Still frame shown while the video loads and used as the poster. */
  poster: string;
  alt: string;
  /**
   * Headline split into explicit lines so the line breaks are pixel-exact.
   * The last line renders in gold; the ones before it render in white.
   */
  headlineLines: string[];
  /** Label of the primary CTA button for this slide. */
  ctaLabel: string;
  /** Pre-filled WhatsApp message for the secondary CTA. */
  ctaMessage: string;
}

const SLIDES: Slide[] = [
  {
    id: 'atelier',
    video: '/videos/alianca-estojo-noivos.mp4',
    poster: '/videos/alianca-estojo-noivos.jpg',
    alt: 'Ourives segurando uma aliança de ouro sobre a bancada do ateliê',
    headlineLines: ['ALIANÇAS', 'PERSONALIZADAS EM', 'OURO E PRATA'],
    ctaLabel: 'Conhecer o ateliê',
    ctaMessage:
      'Olá! Gostaria de agendar uma visita ao ateliê do mestre Hivo Marques para conhecer a forja de perto.',
  },
  {
    id: 'heirlooms',
    video: '/videos/ourives-bancada.mp4',
    poster: '/videos/ourives-bancada.jpg',
    alt: 'Ourives trabalhando em uma joia com maçarico em ateliê mal iluminado',
    headlineLines: ['TRANSFORMAMOS', 'SUA PRATA E OURO', 'EM NOVAS JOIAS'],
    ctaLabel: 'Avaliar minha joia',
    ctaMessage:
      'Olá! Gostaria de avaliar a transformação da minha joia de família (reciclagem, ajuste ou polimento).',
  },
  {
    id: 'watches',
    video: '/videos/relojoaria-cronografo.mp4',
    poster: '/videos/relojoaria-cronografo.jpg',
    alt: 'Cronógrafo masculino de alta relojoaria com mostrador escuro e detalhes dourados',
    headlineLines: ['MANUTENÇÃO E', 'VENDA DE RELÓGIOS', 'MULTIMARCAS'],
    ctaLabel: 'Ver relógios disponíveis',
    ctaMessage:
      'Olá! Gostaria de consultar a disponibilidade de cronógrafos e a revisão de serviço na loja.',
  },
];

const AUTOPLAY_MS = 5600;
/** Minimum horizontal travel (px) before a swipe is treated as a slide change. */
const SWIPE_THRESHOLD = 48;

interface MobileLandingPageProps {
  onExploreCatalogue?: () => void;
}

export const MobileLandingPage: React.FC<MobileLandingPageProps> = ({
  onExploreCatalogue,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const gestureStart = useRef<{ x: number; y: number } | null>(null);

  const slide = SLIDES[index];

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  /* Functional updates so rapid swipes never read a stale index. */
  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  /* Autoplay, paused while the user is interacting with the carousel. */
  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused, index]);

  /* ---- Swipe handling ----
     Bound to the root container rather than the media layer: the content
     column sits above the video and would otherwise swallow every touch. */
  const handlePointerDown = (e: React.PointerEvent) => {
    gestureStart.current = { x: e.clientX, y: e.clientY };
    setIsPaused(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const start = gestureStart.current;
    gestureStart.current = null;
    setIsPaused(false);
    if (!start) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    /* Ignore mostly-vertical drags so the gesture never fights scrolling. */
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      dx < 0 ? next() : prev();
    }
  };

  const handlePointerCancel = () => {
    gestureStart.current = null;
    setIsPaused(false);
  };

  const openWhatsApp = useCallback((message: string) => {
    window.open(
      `https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }, []);

  /* Slide-change variants: the full-bleed video cross-dissolves with a slow
     push-in (no translation, which would expose the edges of the frame),
     while the copy fades up in place for a tighter, more editorial feel. */
  const mediaVariants = {
    enter: { opacity: 0, scale: 1.08 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.03 },
  };

  const copyVariants = {
    enter: { opacity: 0, y: 14 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div
      className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#0B0B0B] font-sans text-white selection:bg-[#D4AF37]/30 selection:text-white"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {/* ================= FULL-BLEED VIDEO BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.video
            key={slide.id}
            src={slide.video}
            poster={slide.poster}
            aria-label={slide.alt}
            autoPlay
            loop
            muted
            playsInline
            custom={direction}
            variants={mediaVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Legibility scrims: dark at the top for the logo, dark at the bottom
            for the headline and CTAs, keeping the middle of the video clear. */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/85 via-[#0B0B0B]/15 to-[#0B0B0B]/92"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/75 to-transparent"
          aria-hidden="true"
        />
        {/* Warm golden aura tinting the frame */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              'radial-gradient(75% 55% at 50% 42%, rgba(212,175,55,0.42) 0%, rgba(212,175,55,0) 72%)',
          }}
          aria-hidden="true"
        />
        {/* Gold hairline frame */}
        <div
          className="pointer-events-none absolute inset-0 border border-[#D4AF37]/30"
          aria-hidden="true"
        />
      </div>

      {/* ================= OVERLAID CONTENT ================= */}
      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {/* Top bar — larger signature logo with balanced breathing room */}
        <header className="safe-top shrink-0 px-4 pb-2 pt-5">
          <div className="flex items-center justify-center drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            <BrandLogo className="h-[74px] w-auto" emphasis />
          </div>
        </header>

        {/* Spacer pushes the copy + CTAs to the lower half of the video */}
        <div className="min-h-0 flex-1" />

        {/* Synchronized headline — one line per array entry, tightly stacked */}
        <section className="shrink-0 px-5">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={slide.id}
              variants={copyVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-center font-serif text-[clamp(22px,7.2vw,31px)] font-bold uppercase leading-[1.12] tracking-[0.01em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                {slide.headlineLines.map((line, i) =>
                  i === slide.headlineLines.length - 1 ? (
                    <span
                      key={line}
                      className="block bg-gradient-to-r from-[#F3DFA0] via-[#D4AF37] to-[#B8912A] bg-clip-text text-transparent"
                      style={{ textShadow: '0 0 20px rgba(212,175,55,0.35)' }}
                    >
                      {line}
                    </span>
                  ) : (
                    <span key={line} className="block text-white">
                      {line}
                    </span>
                  )
                )}
              </h1>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Slider indicator — directly below the headline */}
        <div
          className="mt-3 flex shrink-0 items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Destaques da maison"
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir para o destaque ${i + 1}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`h-[3px] cursor-pointer rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-7 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.55)]'
                  : 'w-3 bg-white/35 hover:bg-white/55'
              }`}
            />
          ))}
        </div>

        {/* Call to action */}
        <section className="shrink-0 space-y-2.5 px-4 pb-5 pt-4">
          <motion.button
            type="button"
            key={slide.id}
            whileTap={{ scale: 0.985 }}
            onClick={() => onExploreCatalogue?.()}
            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F0D98A] via-[#D4AF37] to-[#B8912A] px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#14110A] shadow-[0_8px_26px_-6px_rgba(212,175,55,0.65),0_2px_12px_rgba(0,0,0,0.6)] transition-shadow duration-300 hover:shadow-[0_12px_36px_-6px_rgba(212,175,55,0.85),0_2px_12px_rgba(0,0,0,0.6)]"
          >
            <span>{slide.ctaLabel}</span>
            <ArrowRight
              size={14}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.985 }}
            onClick={() => openWhatsApp(slide.ctaMessage)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#D4AF37]/55 bg-[#0B0B0B]/70 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37] backdrop-blur-md transition-colors duration-300 hover:border-[#D4AF37]/90 hover:bg-[#D4AF37]/[0.10]"
          >
            <WhatsAppGlyph size={13} className="text-[#D4AF37]" />
            <span>WhatsApp da loja</span>
          </motion.button>
        </section>
      </div>
    </div>
  );
};
