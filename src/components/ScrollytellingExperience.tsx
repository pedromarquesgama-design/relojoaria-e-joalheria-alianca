import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { generateLuxuryFrames } from '../utils/luxuryFramesGenerator';
import { ArrowDown, MessageCircle, ArrowRight, X, Clock, Award, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollytellingExperienceProps {
  onReturnToCatalog: () => void;
  onOpenAtelier: () => void;
}

export function ScrollytellingExperience({
  onReturnToCatalog,
  onOpenAtelier,
}: ScrollytellingExperienceProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const marqueeTextRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const currentFrameRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Geração e Pré-carregamento dos 180 quadros procedurais de estúdio
  useEffect(() => {
    let active = true;

    generateLuxuryFrames(180, (percent) => {
      if (active) setLoadingProgress(percent);
    }).then((loadedFrames) => {
      if (active) {
        framesRef.current = loadedFrames;
        setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // 2. Inicialização do Lenis Smooth Scroll, Canvas Renderer e Coreografia GSAP
  useEffect(() => {
    if (!isLoaded || !scrollContainerRef.current || !canvasRef.current) return;

    // A. Lenis Smooth Scroll (MANDATÓRIO pelo checklist)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // B. Redimensionamento nítido com devicePixelRatio
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const IMAGE_SCALE = 0.85; // 0.82 - 0.90 proporção de ouro do checklist

    const drawFrame = (index: number) => {
      if (!ctx || !canvas) return;
      const frame = framesRef.current[index];
      if (!frame) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = frame.width;
      const ih = frame.height;

      const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.fillStyle = '#0A0A0C';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(frame, dx, dy, dw, dh);
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // C. Frame-to-Scroll Binding (Velocidade 2.0 para concluir em ~55% do scroll)
    const FRAME_COUNT = framesRef.current.length || 180;
    const FRAME_SPEED = 2.0;

    const scrollTriggerContext = gsap.context(() => {
      // 1. Frame scrub no Canvas
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
          const index = Math.min(
            Math.floor(accelerated * FRAME_COUNT),
            FRAME_COUNT - 1
          );
          if (index !== currentFrameRef.current) {
            currentFrameRef.current = index;
            requestAnimationFrame(() => drawFrame(index));
          }
        },
      });

      // 2. Circle-Wipe Hero Reveal
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Hero esmaece logo no início
          if (heroRef.current) {
            heroRef.current.style.opacity = Math.max(0, 1 - p * 12).toString();
            heroRef.current.style.pointerEvents = p > 0.08 ? 'none' : 'auto';
          }
          // Canvas expande de 0% a 80% do viewport
          const wipeProgress = Math.min(1, Math.max(0, (p - 0.01) / 0.08));
          const radius = wipeProgress * 80;
          if (canvasWrapRef.current) {
            canvasWrapRef.current.style.clipPath = `circle(${radius}% at 50% 50%)`;
          }
        },
      });

      // 3. Dark Overlay para a seção de Métricas (0.90 opacidade)
      const enterOverlay = 0.64;
      const leaveOverlay = 0.79;
      const fadeRange = 0.04;
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          let opacity = 0;
          if (p >= enterOverlay - fadeRange && p <= enterOverlay) {
            opacity = (p - (enterOverlay - fadeRange)) / fadeRange;
          } else if (p > enterOverlay && p < leaveOverlay) {
            opacity = 0.92;
          } else if (p >= leaveOverlay && p <= leaveOverlay + fadeRange) {
            opacity = 0.92 * (1 - (p - leaveOverlay) / fadeRange);
          }
          if (darkOverlayRef.current) {
            darkOverlayRef.current.style.opacity = opacity.toString();
          }
        },
      });

      // 4. Marquee Horizontal deslizante (-35% de deslocamento em scroll)
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (marqueeTextRef.current) {
            marqueeTextRef.current.style.transform = `translateX(${-self.progress * 45}%)`;
          }
        },
      });

      // 5. Sistema de Animações Variadas por Seção (fade-up, slide-left, slide-right, scale-up, stagger-up, clip-reveal)
      const sections = containerRef.current?.querySelectorAll<HTMLElement>('.scroll-section');
      sections?.forEach((section) => {
        const type = section.dataset.animation;
        const persist = section.dataset.persist === 'true';
        const enter = parseFloat(section.dataset.enter || '0') / 100;
        const leave = parseFloat(section.dataset.leave || '100') / 100;
        const children = section.querySelectorAll(
          '.section-label, .section-heading, .section-body, .cta-button, .stat'
        );

        const tl = gsap.timeline({ paused: true });

        switch (type) {
          case 'fade-up':
            tl.fromTo(
              children,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out' }
            );
            break;
          case 'slide-left':
            tl.fromTo(
              children,
              { x: -80, opacity: 0 },
              { x: 0, opacity: 1, stagger: 0.14, duration: 0.9, ease: 'power3.out' }
            );
            break;
          case 'slide-right':
            tl.fromTo(
              children,
              { x: 80, opacity: 0 },
              { x: 0, opacity: 1, stagger: 0.14, duration: 0.9, ease: 'power3.out' }
            );
            break;
          case 'scale-up':
            tl.fromTo(
              children,
              { scale: 0.85, opacity: 0 },
              { scale: 1, opacity: 1, stagger: 0.12, duration: 1.0, ease: 'power2.out' }
            );
            break;
          case 'stagger-up':
            tl.fromTo(
              children,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' }
            );
            break;
          case 'clip-reveal':
            tl.fromTo(
              children,
              { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
              {
                clipPath: 'inset(0% 0 0 0)',
                opacity: 1,
                stagger: 0.15,
                duration: 1.2,
                ease: 'power4.inOut',
              }
            );
            break;
          default:
            tl.fromTo(
              children,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
            );
        }

        // Gatilho de avanço / reversão
        ScrollTrigger.create({
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= enter && p <= leave) {
              tl.play();
            } else if (p < enter) {
              tl.reverse();
            } else if (p > leave && !persist) {
              tl.reverse();
            }
          },
        });
      });

      // 6. Contadores de Estatísticas (gsap snap com contagem de 0 até o valor final)
      const statElements = containerRef.current?.querySelectorAll<HTMLElement>('.stat-number');
      statElements?.forEach((el) => {
        const target = parseFloat(el.dataset.value || '0');
        const decimals = parseInt(el.dataset.decimals || '0');

        ScrollTrigger.create({
          trigger: scrollContainerRef.current,
          start: '64% top',
          onEnter: () => {
            gsap.fromTo(
              el,
              { textContent: '0' },
              {
                textContent: target,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: decimals === 0 ? 1 : 0.01 },
              }
            );
          },
        });
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTriggerContext.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0A0A0C] text-[#FAF8F5] min-h-screen overflow-x-hidden selection:bg-[#C9A84C]/30 selection:text-[#FAF8F5]"
    >
      {/* 1. Loader (#loader > .loader-brand, #loader-bar, #loader-percent) */}
      {!isLoaded && (
        <div
          id="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C] transition-opacity duration-700"
        >
          <div className="flex flex-col items-center max-w-md w-full px-8 text-center space-y-6">
            <div className="w-12 h-12 rounded-full border border-[#C9A84C]/40 flex items-center justify-center animate-spin-slow">
              <Sparkles size={20} className="text-[#C9A84C]" />
            </div>

            <div className="loader-brand space-y-1">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#C9A84C] uppercase">
                Ateliê de Ourivesaria & Alta Relojoaria
              </span>
              <h2 className="text-xl md:text-2xl font-serif tracking-[0.15em] text-[#FAF8F5]">
                ALIANÇA PORTO SEGURO
              </h2>
            </div>

            <div className="w-full bg-[#1A1A22] h-[2px] rounded-full overflow-hidden">
              <div
                id="loader-bar"
                className="h-full bg-gradient-to-r from-[#9E7728] via-[#C9A84C] to-[#FFE296] transition-all duration-150 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div
              id="loader-percent"
              className="font-mono text-xs text-[#9A968E] tracking-widest flex items-center justify-between w-full"
            >
              <span>SINCRONIZANDO ELEMENTOS</span>
              <span className="text-[#C9A84C] font-semibold">{loadingProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Fixed Header (.site-header > nav com logo + links) */}
      <header className="site-header fixed top-0 left-0 right-0 z-40 bg-[#0A0A0C]/85 backdrop-blur-md border-b border-[#C9A84C]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#C9A84C] uppercase border border-[#C9A84C]/40 px-2 py-0.5 rounded-[2px]">
              EXPERIÊNCIA IMERSIVA
            </span>
            <div className="hidden md:block h-3 w-[1px] bg-[#C9A84C]/30" />
            <span className="hidden md:block text-xs font-serif tracking-wider text-[#FAF8F5]">
              RELOJOARIA E JOALHERIA ALIANÇA
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAtelier}
              className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#FAF8F5] bg-[#121216] border border-[#C9A84C]/40 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 px-4 py-2 rounded-[2px] transition-all"
            >
              <MessageCircle size={13} className="text-[#C9A84C]" />
              <span>Orçamento Bancada</span>
            </button>

            <button
              onClick={onReturnToCatalog}
              className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase bg-[#C9A84C] hover:bg-[#D4943E] text-[#0A0A0C] font-semibold px-4 py-2 rounded-[2px] transition-all shadow-lg shadow-[#C9A84C]/20"
            >
              <span>Vitrine Completa</span>
              <X size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero: .hero-standalone (100vh, solid bg, word-split heading) */}
      <section
        ref={heroRef}
        className="hero-standalone fixed inset-0 z-30 flex flex-col justify-center items-center text-center px-6 bg-[#0A0A0C]"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="section-label inline-block text-[11px] font-mono tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/30 pb-1">
            ESTÚDIO DIGITAL · PORTO SEGURO, BAHIA
          </span>

          <h1 className="hero-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#FAF8F5] font-normal leading-[1.05] tracking-tight">
            <span className="block">O TEMPO</span>
            <span className="block text-[#C9A84C] italic font-serif">E A MATÉRIA,</span>
            <span className="block">FORJADOS.</span>
          </h1>

          <p className="hero-tagline max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[#9A968E] font-light leading-relaxed">
            Ourivesaria própria em Ouro 18K 750 e calibres mecânicos suíços sob iluminação
            editorial chiaroscuro.
          </p>

          <div className="pt-8 flex flex-col items-center gap-2 text-xs font-mono text-[#C9A84C] tracking-[0.2em] uppercase animate-pulse">
            <span>Role para desvendar a bancada</span>
            <ArrowDown size={16} />
          </div>
        </div>
      </section>

      {/* 4. Canvas: .canvas-wrap > canvas#canvas (fixed, full viewport) */}
      <div
        ref={canvasWrapRef}
        className="canvas-wrap fixed inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <canvas id="canvas" ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* 5. Dark overlay: #dark-overlay (fixed, full viewport, pointer-events:none) */}
      <div
        id="dark-overlay"
        ref={darkOverlayRef}
        className="fixed inset-0 z-20 pointer-events-none bg-[#0A0A0C] opacity-0 transition-opacity duration-300"
      />

      {/* 6. Marquee horizontal deslizando no scroll (12vw font size) */}
      <div className="marquee-wrap fixed top-1/2 -translate-y-1/2 left-0 right-0 z-15 pointer-events-none overflow-hidden select-none opacity-20">
        <div
          ref={marqueeTextRef}
          className="marquee-text whitespace-nowrap text-[12vw] font-serif font-light text-[#FAF8F5] uppercase tracking-wider"
          style={{ willChange: 'transform' }}
        >
          OURO 18K 750 · ALTA RELOJOARIA SUÍÇA · OURIVESARIA ARTESANAL PRÓPRIA · PORTO SEGURO · OFICINA DE PRECISÃO ·
        </div>
      </div>

      {/* 7. Scroll container (#scroll-container, 850vh de curso generoso) */}
      <div
        id="scroll-container"
        ref={scrollContainerRef}
        className="relative z-25 w-full pointer-events-none"
        style={{ height: '850vh' }}
      >
        {/* Seção 1 (15% - 30%): Alianças de Casamento (slide-left, align-left) */}
        <section
          className="scroll-section section-content align-left absolute w-full top-[22%] -translate-y-1/2 pointer-events-auto"
          data-enter="15"
          data-leave="30"
          data-animation="slide-left"
        >
          <div className="section-inner bg-[#121216]/90 border border-[#C9A84C]/25 p-8 md:p-10 rounded-[2px] shadow-2xl backdrop-blur-sm space-y-4">
            <span className="section-label text-xs font-mono tracking-[0.2em] text-[#C9A84C] uppercase block">
              001 / OURIVESARIA PRÓPRIA
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] leading-tight">
              Alianças Maciças em Ouro 18K 750
            </h2>
            <p className="section-body text-sm sm:text-base text-[#9A968E] leading-relaxed">
              Fundidas a partir do lingote bruto e moldadas no torno manual sem emendas
              soldadas. Anatomia interna convexa projetada para conforto diário vitalício.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAtelier}
                className="cta-button inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#C9A84C] hover:text-[#FAF8F5] transition-colors"
              >
                <span>Solicitar orçamento sob medida</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Seção 2 (32% - 47%): Relojoaria Mecânica (scale-up, align-right) */}
        <section
          className="scroll-section section-content align-right absolute w-full top-[39%] -translate-y-1/2 pointer-events-auto"
          data-enter="32"
          data-leave="47"
          data-animation="scale-up"
        >
          <div className="section-inner bg-[#121216]/90 border border-[#C9A84C]/25 p-8 md:p-10 rounded-[2px] shadow-2xl backdrop-blur-sm space-y-4">
            <span className="section-label text-xs font-mono tracking-[0.2em] text-[#C9A84C] uppercase block">
              002 / HAUTE HORLOGERIE
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] leading-tight">
              Calibres Automáticos de Alta Frequência
            </h2>
            <p className="section-body text-sm sm:text-base text-[#9A968E] leading-relaxed">
              Cronógrafos suíços operando a 28.800 alternâncias por hora (4Hz). Caixa em aço
              inoxidável 316L com aro de taquímetro em ouro nobre e cristal de safira duplo
              antirreflexo.
            </p>
            <div className="pt-2">
              <button
                onClick={onReturnToCatalog}
                className="cta-button inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#C9A84C] hover:text-[#FAF8F5] transition-colors"
              >
                <span>Ver cronógrafos na vitrine</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Seção 3 (49% - 63%): Alta Joalheria (slide-right, align-left) */}
        <section
          className="scroll-section section-content align-left absolute w-full top-[56%] -translate-y-1/2 pointer-events-auto"
          data-enter="49"
          data-leave="63"
          data-animation="slide-right"
        >
          <div className="section-inner bg-[#121216]/90 border border-[#C9A84C]/25 p-8 md:p-10 rounded-[2px] shadow-2xl backdrop-blur-sm space-y-4">
            <span className="section-label text-xs font-mono tracking-[0.2em] text-[#C9A84C] uppercase block">
              003 / ATELIÊ DE GEMAS & CRAVAÇÃO
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] leading-tight">
              Solitários, Correntes Grumet & Pingentes
            </h2>
            <p className="section-body text-sm sm:text-base text-[#9A968E] leading-relaxed">
              Cravação em garras chanfradas para retenção máxima de luz. Cada corrente tem
              seus elos lixados e polidos manualmente na roda de algodão com pasta diamantada.
            </p>
            <div className="pt-2">
              <button
                onClick={onReturnToCatalog}
                className="cta-button inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#C9A84C] hover:text-[#FAF8F5] transition-colors"
              >
                <span>Explorar joias em ouro</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Seção 4 (65% - 78%): STATS SECTION com Full Dark Overlay e Contadores Dinâmicos */}
        <section
          className="scroll-section section-stats absolute w-full top-[71%] -translate-y-1/2 pointer-events-auto px-6"
          data-enter="65"
          data-leave="78"
          data-animation="stagger-up"
        >
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="space-y-3">
              <span className="section-label text-xs font-mono tracking-[0.25em] text-[#C9A84C] uppercase">
                004 / RIGOR TÉCNICO & CERTIFICAÇÃO
              </span>
              <h2 className="section-heading text-3xl sm:text-5xl md:text-6xl font-serif text-[#FAF8F5]">
                A Precisão Mensurada em Números
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="stat bg-[#121216]/80 border border-[#C9A84C]/25 p-6 rounded-[2px] flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-1 text-3xl sm:text-5xl font-mono text-[#FAF8F5] font-light">
                  <span className="stat-number text-[#C9A84C]" data-value="750" data-decimals="0">
                    0
                  </span>
                  <span className="text-xl sm:text-2xl text-[#9A968E]">‰</span>
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#9A968E] uppercase mt-2">
                  Teor de Ouro 18K
                </span>
              </div>

              <div className="stat bg-[#121216]/80 border border-[#C9A84C]/25 p-6 rounded-[2px] flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-1 text-3xl sm:text-5xl font-mono text-[#FAF8F5] font-light">
                  <span className="stat-number text-[#C9A84C]" data-value="28800" data-decimals="0">
                    0
                  </span>
                  <span className="text-xl sm:text-2xl text-[#9A968E]">vph</span>
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#9A968E] uppercase mt-2">
                  Frequência do Calibre
                </span>
              </div>

              <div className="stat bg-[#121216]/80 border border-[#C9A84C]/25 p-6 rounded-[2px] flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-1 text-3xl sm:text-5xl font-mono text-[#FAF8F5] font-light">
                  <span className="stat-number text-[#C9A84C]" data-value="100" data-decimals="0">
                    0
                  </span>
                  <span className="text-xl sm:text-2xl text-[#9A968E]">%</span>
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#9A968E] uppercase mt-2">
                  Forja Manual Bancada
                </span>
              </div>

              <div className="stat bg-[#121216]/80 border border-[#C9A84C]/25 p-6 rounded-[2px] flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-1 text-3xl sm:text-5xl font-mono text-[#FAF8F5] font-light">
                  <span className="stat-number text-[#C9A84C]" data-value="0.02" data-decimals="2">
                    0
                  </span>
                  <span className="text-xl sm:text-2xl text-[#9A968E]">mm</span>
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#9A968E] uppercase mt-2">
                  Tolerância Micrométrica
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 5 (80% - 90%): Óptica de Precisão (clip-reveal, align-right) */}
        <section
          className="scroll-section section-content align-right absolute w-full top-[85%] -translate-y-1/2 pointer-events-auto"
          data-enter="80"
          data-leave="90"
          data-animation="clip-reveal"
        >
          <div className="section-inner bg-[#121216]/90 border border-[#C9A84C]/25 p-8 md:p-10 rounded-[2px] shadow-2xl backdrop-blur-sm space-y-4">
            <span className="section-label text-xs font-mono tracking-[0.2em] text-[#C9A84C] uppercase block">
              005 / ÓPTICA & ARMAÇÕES
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-serif text-[#FAF8F5] leading-tight">
              Curadoria Solar & Oftálmica
            </h2>
            <p className="section-body text-sm sm:text-base text-[#9A968E] leading-relaxed">
              Armações em acetato de celulose e titânio cirúrgico ultraleve. Lentes solares
              com proteção UV400 completa e tratamento antirreflexo traseiro para nitidez sob
              o sol baiano.
            </p>
            <div className="pt-2">
              <button
                onClick={onReturnToCatalog}
                className="cta-button inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#C9A84C] hover:text-[#FAF8F5] transition-colors"
              >
                <span>Ver óculos na coleção</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Seção 6 (91% - 100%): CTA PERSISTENTE (data-persist="true", fade-up) */}
        <section
          className="scroll-section section-content absolute w-full top-[95%] -translate-y-1/2 pointer-events-auto px-6 text-center"
          data-enter="91"
          data-leave="100"
          data-animation="fade-up"
          data-persist="true"
        >
          <div className="max-w-2xl mx-auto bg-[#121216]/95 border border-[#C9A84C]/40 p-8 sm:p-12 rounded-[2px] shadow-2xl backdrop-blur-md space-y-6">
            <span className="section-label text-xs font-mono tracking-[0.25em] text-[#C9A84C] uppercase block">
              006 / ATELIÊ & ENCOMENDAS
            </span>
            <h2 className="section-heading text-3xl sm:text-5xl font-serif text-[#FAF8F5] leading-tight">
              Sua Próxima Joia Começa na Bancada
            </h2>
            <p className="section-body text-sm sm:text-base text-[#9A968E] leading-relaxed">
              Rua São Pedro, 650, Centro de Porto Seguro - BA. Fabricação própria sob medida,
              ajustes na hora e manutenção certificada de cronógrafos.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenAtelier}
                className="cta-button w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase bg-[#C9A84C] hover:bg-[#D4943E] text-[#0A0A0C] font-bold px-6 py-3.5 rounded-[2px] transition-all shadow-xl shadow-[#C9A84C]/20"
              >
                <MessageCircle size={15} />
                <span>SOLICITAR ORÇAMENTO NO WHATSAPP</span>
              </button>
              <button
                onClick={onReturnToCatalog}
                className="cta-button w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase border border-[#FAF8F5]/30 hover:border-[#FAF8F5] text-[#FAF8F5] px-6 py-3.5 rounded-[2px] transition-all hover:bg-white/5"
              >
                <span>EXPLORAR CATÁLOGO COMPLETO</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
