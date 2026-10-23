import React, { useRef, useState } from 'react';
import {
  BOUTIQUE_INFO,
  FEATURED_PRODUCTS,
  JEWELRY_PIECE_OPTIONS,
  PENDANT_OPTIONS,
  JEWELRY_GALLERY_IMAGES,
  WEDDING_RING_SHOTS,
  JewelryPieceOption,
} from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { MobileLandingPage } from './MobileLandingPage';
import { InterlockingRings, WhatsAppGlyph } from './HouseIcons';
import {
  Home,
  Grid,
  Check,
  Wrench,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Product photography shown in the "Alianças" screen carousel.
 * Sourced from WEDDING_RING_SHOTS including the newly added ruby ring.
 */
const PRODUCT_SHOTS = WEDDING_RING_SHOTS;

interface MobileScreensCompanionProps {
  onOpenProductModal?: (prod: any) => void;
}

export const MobileScreensCompanion: React.FC<MobileScreensCompanionProps> = ({
  onOpenProductModal,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'categories' | 'product' | 'jewelry' | 'workshop'>('home');
  const [screen3PhotoIndex, setScreen3PhotoIndex] = useState(1);
  const [selectedRingSize, setSelectedRingSize] = useState('18');
  const [selectedMetal, setSelectedMetal] = useState<'Ouro' | 'Prata'>('Ouro');
  const [engravingText, setEngravingText] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Simplified Mobile Jewelry State (Corrente Ouro, Corrente Prata, Pulseira Ouro, Pulseira Prata + Pingente)
  const [mobilePieceId, setMobilePieceId] = useState<JewelryPieceOption['id']>('corrente-ouro');
  const [mobilePendant, setMobilePendant] = useState<'sem-pingente' | 'com-pingente'>('sem-pingente');
  const [jewelryPhotoIndex, setJewelryPhotoIndex] = useState(0);
  const jewelryGesture = useRef<{ x: number; y: number } | null>(null);

  const handleJewelryPointerDown = (e: React.PointerEvent) => {
    jewelryGesture.current = { x: e.clientX, y: e.clientY };
  };

  const handleJewelryPointerUp = (e: React.PointerEvent) => {
    const start = jewelryGesture.current;
    jewelryGesture.current = null;
    if (!start) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;

    const total = JEWELRY_GALLERY_IMAGES.length;
    setJewelryPhotoIndex((curr) =>
      dx < 0 ? (curr + 1) % total : (curr - 1 + total) % total
    );
  };

  const handleJewelryPointerCancel = () => {
    jewelryGesture.current = null;
  };

  const handleMobileSelectPiece = (pieceId: JewelryPieceOption['id']) => {
    setMobilePieceId(pieceId);
    if (pieceId === 'pulseira-ouro' || pieceId === 'pulseira-prata') {
      setJewelryPhotoIndex(1); // pulseira no estojo
    } else if (mobilePendant === 'com-pingente') {
      setJewelryPhotoIndex(2); // corrente com plaquinha
    } else {
      setJewelryPhotoIndex(0); // corrente no estojo
    }
  };

  const handleMobileSelectPendant = (opt: 'sem-pingente' | 'com-pingente') => {
    setMobilePendant(opt);
    if (opt === 'com-pingente') {
      setJewelryPhotoIndex(2); // corrente com plaquinha
    } else if (mobilePieceId.includes('pulseira')) {
      setJewelryPhotoIndex(1);
    } else {
      setJewelryPhotoIndex(0);
    }
  };

  const selectedMobilePiece = JEWELRY_PIECE_OPTIONS.find((p) => p.id === mobilePieceId) || JEWELRY_PIECE_OPTIONS[0];

  const product = FEATURED_PRODUCTS[0]; // Pares de Alianças em Ouro e Prata

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 2500);
  };

  /* ---- Swipe between the product photos ----
     The index is 1-based so it lines up with the dots (0 = nothing shown). */
  const shotGesture = useRef<{ x: number; y: number } | null>(null);

  const handleShotPointerDown = (e: React.PointerEvent) => {
    shotGesture.current = { x: e.clientX, y: e.clientY };
  };

  const handleShotPointerUp = (e: React.PointerEvent) => {
    const start = shotGesture.current;
    shotGesture.current = null;
    if (!start) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    /* Horizontal intent only, so a vertical scroll never changes the photo. */
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;

    const total = PRODUCT_SHOTS.length;
    setScreen3PhotoIndex((current) =>
      dx < 0 ? (current % total) + 1 : ((current - 2 + total) % total) + 1
    );
  };

  const handleShotPointerCancel = () => {
    shotGesture.current = null;
  };

  const openWhatsApp = (customMsg?: string) => {
    const text = encodeURIComponent(
      customMsg ||
        `Olá, Relojoaria e Joalheria Aliança!\nVi o ${product.title} (${product.ref}) no catálogo e gostaria de verificar a disponibilidade na loja de Porto Seguro.`
    );
    window.open(`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#0A0A0C] text-[#FAF8F5] font-sans selection:bg-[#C9A84C]/30 selection:text-[#FAF8F5]">
      {/* Mobile fixed-viewport shell: the landing screen fills the screen exactly,
          the other screens scroll inside their own container. */}
      <div
        className={
          activeTab === 'home'
            ? 'app-shell flex flex-col overflow-hidden'
            : activeTab === 'workshop'
              ? 'app-shell relative flex flex-col overflow-hidden pb-[calc(4rem_+_env(safe-area-inset-bottom))]'
              : 'flex min-h-screen flex-col pb-16'
        }
      >
      {/* 1. Mobile Fixed Top Header — hidden on the landing screen, which owns its own centered header */}
      {activeTab !== 'home' && (
      <header
        className={`z-40 h-16 px-4 ${
          activeTab === 'workshop'
            ? 'absolute inset-x-0 top-0 bg-transparent'
            : 'sticky top-0 border-b border-[#C9A84C]/25 bg-[#0A0A0C]/90 backdrop-blur-md'
        } flex items-center justify-between`}
      >
        <motion.div
          whileTap={{ scale: 0.96 }}
          onClick={() => setActiveTab('home')}
          className="flex items-center cursor-pointer"
        >
          <BrandLogo className="h-10 sm:h-11 w-auto" emphasis />
        </motion.div>

        <div className="flex items-center gap-2">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${encodeURIComponent(
              'Olá! Gostaria de falar com a Relojoaria Aliança em Porto Seguro.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-[#C9A84C]/55 bg-[#0B0B0B] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#C9A84C] transition-colors duration-300 hover:border-[#C9A84C] hover:bg-[#C9A84C]/[0.08]"
          >
            <WhatsAppGlyph size={12} className="text-[#C9A84C]" />
            <span>WhatsApp da loja</span>
          </motion.a>
        </div>
      </header>
      )}

      {/* Floating Feedback Notification */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-4 right-4 z-50 bg-[#C9A84C] text-[#0A0A0C] font-mono text-xs px-4 py-2.5 shadow-2xl rounded-full flex items-center justify-center gap-2"
          >
            <Check size={14} />
            <span>{actionFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Content Screens */}
      <main
        className={
          activeTab === 'home'
            ? 'flex min-h-0 flex-1 flex-col overflow-hidden'
            : activeTab === 'workshop'
              ? 'flex min-h-0 flex-1 flex-col overflow-y-auto'
              : 'flex-1 pb-4'
        }
      >
        {/* =========================================================
            SCREEN 1: HOME (Landing vertical premium)
            ========================================================= */}
        {activeTab === 'home' && (
          <MobileLandingPage
            onExploreCatalogue={() => setActiveTab('categories')}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* =========================================================
            SCREEN 2: CATEGORIES (Coleções)
            ========================================================= */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 px-4 pt-4"
          >
            <div className="border-b border-white/5 pb-3">
              <h3 className="text-xl font-serif text-[#FAF8F5]">Categorias da Boutique</h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'ALIANÇAS 18K',
                  sub: 'Modelos anatômicos forjados sem emenda',
                  tag: 'NOIVOS & CASAMENTO',
                  video: '/videos/alianca-estojo-noivos.mp4',
                  poster: '/videos/alianca-estojo-noivos.jpg',
                  action: () => setActiveTab('product'),
                },
                {
                  title: 'JÓIAS EM OURO',
                  sub: 'Correntes grumet e pingentes maciços',
                  tag: 'OURO 18K 750',
                  video: '/videos/joias-corrente-ouro.mp4',
                  poster: '/videos/joias-corrente-ouro.jpg',
                  action: () => setActiveTab('jewelry'),
                },
                {
                  title: 'OFICINA & ATELIER',
                  sub: 'Bancada e manutenção na hora',
                  tag: 'MESTRE HIVO MARQUES',
                  video: '/videos/ourives-bancada.mp4',
                  poster: '/videos/ourives-bancada.jpg',
                  action: () => setActiveTab('workshop'),
                },
                {
                  title: 'RELÓGIOS',
                  sub: 'Cronógrafos e automáticos suíços',
                  tag: 'HAUTE HORLOGERIE',
                  video: '/videos/relojoaria-cronografo.mp4',
                  poster: '/videos/relojoaria-cronografo.jpg',
                  action: () =>
                    openWhatsApp(
                      'Olá! Gostaria de consultar a disponibilidade de relógios na loja.'
                    ),
                },
                {
                  title: 'ÓCULOS',
                  sub: 'Armações nobres & proteção UV400',
                  tag: 'LUXURY EYEWEAR',
                  video: '/videos/oculos-solar.mp4',
                  poster: '/videos/oculos-solar.jpg',
                  action: () =>
                    openWhatsApp('Olá! Gostaria de conhecer a linha de óculos da boutique.'),
                },
              ].map((item, idx) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={idx}
                  onClick={item.action}
                  className="relative h-28 bg-[#121216] border border-[#C9A84C]/25 hover:border-[#C9A84C] rounded-2xl overflow-hidden flex items-center justify-between p-4 cursor-pointer group transition-all shadow-md"
                >
                  <div className="z-10 max-w-[62%]">
                    <span className="text-[9px] font-mono tracking-wider text-[#C9A84C] uppercase block mb-0.5">
                      {item.tag}
                    </span>
                    <h4 className="text-lg font-serif text-[#FAF8F5] group-hover:text-[#C9A84C] transition-colors leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#9A968E] font-light line-clamp-1 mt-0.5">
                      {item.sub}
                    </p>
                  </div>

                  {/* Video Thumbnail Background on the right */}
                  <div className="w-28 h-full absolute right-0 top-0 bottom-0 overflow-hidden rounded-r-2xl">
                    <video
                      src={item.video}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#121216] via-[#121216]/60 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* =========================================================
            SCREEN 3: PRODUCT DETAIL (Alianças & Joias)
            ========================================================= */}
        {activeTab === 'product' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 px-4 pt-4"
          >
            {/* Full-bleed product photography — the title block overlays it,
                with the dark panel resuming right below the headline. */}
            <div
              className="relative -mx-4 -mt-4"
              style={{ touchAction: 'pan-y' }}
              onPointerDown={handleShotPointerDown}
              onPointerUp={handleShotPointerUp}
              onPointerCancel={handleShotPointerCancel}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0A0C]">
                {PRODUCT_SHOTS.map((shot, i) => (
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      screen3PhotoIndex === i + 1 ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

                {/* Legibility scrim — top only, so the bottom of the photo stays clean */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#0A0A0C]/70 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Product Meta — overlaid on the photography */}
              <div className="absolute inset-x-0 bottom-0 z-10 space-y-1 px-4 pb-4">
                {/* Navigation Dots */}
                <div className="mb-2 flex items-center justify-center gap-1.5">
                  {PRODUCT_SHOTS.map((shot, i) => (
                    <button
                      key={shot.src}
                      onClick={() => setScreen3PhotoIndex(i + 1)}
                      aria-label={`Ver ${shot.alt}`}
                      className={`h-[3px] cursor-pointer rounded-full transition-all duration-300 ${
                        screen3PhotoIndex === i + 1
                          ? 'w-6 bg-[#C9A84C] shadow-[0_0_6px_rgba(0,0,0,0.9)]'
                          : 'w-[3px] bg-white/60 shadow-[0_0_4px_rgba(0,0,0,0.9)] hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#0A0A0C]/70 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#C9A84C] backdrop-blur-md">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#FAF8F5]/80 bg-[#0A0A0C]/60 px-2 py-0.5 rounded-full border border-white/10">
                    {screen3PhotoIndex} / {PRODUCT_SHOTS.length}
                  </span>
                </div>

                <h3
                  className="text-xl font-serif leading-tight text-[#FAF8F5]"
                  style={{
                    textShadow:
                      '0 1px 2px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.75)',
                  }}
                >
                  {PRODUCT_SHOTS[screen3PhotoIndex - 1]?.title || product.title}
                </h3>
              </div>
            </div>

            {/* Metal Selector — Ouro / Prata */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#FAF8F5]">
                <span>Metal:</span>
                <span className="text-[#C9A84C]">
                  {selectedMetal === 'Ouro' ? 'Ouro 18k' : 'Prata 950'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['Ouro', 'Prata'] as const).map((metal) => (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    aria-pressed={selectedMetal === metal}
                    className={`h-10 rounded-full border text-xs font-mono tracking-wider uppercase transition-all ${
                      selectedMetal === metal
                        ? 'border-[#C9A84C] bg-gradient-to-r from-[#D4943E] to-[#C9A84C] text-[#0A0A0C] font-bold shadow-[0_0_12px_rgba(201,168,76,0.35)]'
                        : 'border-white/10 text-[#9A968E] hover:text-[#FAF8F5]'
                    }`}
                  >
                    {metal}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Ring Size Selector */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#FAF8F5]">
                <span>Aro Desejado:</span>
                <span className="text-[#C9A84C]">Tamanho {selectedRingSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['14', '16', '18', '20', '22', '24', '26'].map((sz) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    key={sz}
                    onClick={() => setSelectedRingSize(sz)}
                    className={`w-9 h-8 text-xs font-mono rounded-full border transition-all ${
                      selectedRingSize === sz
                        ? 'border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0C] font-bold shadow-[0_0_10px_rgba(201,168,76,0.4)]'
                        : 'border-white/10 text-[#9A968E] hover:text-[#FAF8F5]'
                    }`}
                  >
                    {sz}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Engraving */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9A968E] block">
                Gravação Interna Cortesia:
              </label>
              <input
                type="text"
                placeholder="Ex: Hivo & Maria 15.11.2025"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                className="w-full bg-[#121216] border border-white/10 focus:border-[#C9A84C] px-4 py-2.5 text-xs font-mono text-[#FAF8F5] rounded-full outline-none transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const currentPiece = PRODUCT_SHOTS[screen3PhotoIndex - 1]?.title || product.title;
                  openWhatsApp(
                    `Olá! Vim pelo site da Relojoaria Aliança e gostaria de encomendar:\n` +
                    `• Peça: ${currentPiece}\n` +
                    `• Metal: ${selectedMetal === 'Ouro' ? 'Ouro 18k' : 'Prata 950'}\n` +
                    `• Aro: Tamanho ${selectedRingSize}${
                      engravingText ? `\n• Gravação: "${engravingText}"` : ''
                    }`
                  );
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#D4943E] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#D4943E] text-[#0A0A0C] font-mono text-xs font-bold tracking-wider uppercase rounded-full flex items-center justify-center gap-2 shadow-xl shadow-[#C9A84C]/20"
              >
                <WhatsAppGlyph size={14} />
                <span>PEDIR ORÇAMENTO NO WHATSAPP</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            SCREEN 3B: JEWELRY DETAIL (Jóias em Ouro: Correntes & Pingentes)
            ========================================================= */}
        {activeTab === 'jewelry' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4 px-4 pt-4"
          >
            {/* Full-bleed photography showcase with touch swipe & navigation dots */}
            <div
              className="relative -mx-4 -mt-4"
              style={{ touchAction: 'pan-y' }}
              onPointerDown={handleJewelryPointerDown}
              onPointerUp={handleJewelryPointerUp}
              onPointerCancel={handleJewelryPointerCancel}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0A0C]">
                {JEWELRY_GALLERY_IMAGES.map((shot, i) => (
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      jewelryPhotoIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'
                    }`}
                  />
                ))}

                {/* Scrims */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#0A0A0C]/80 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/70 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Jewelry Meta — overlaid on photography */}
              <div className="absolute inset-x-0 bottom-0 z-10 space-y-1.5 px-4 pb-4">
                {/* Navigation Dots */}
                <div className="mb-2 flex items-center justify-center gap-1.5">
                  {JEWELRY_GALLERY_IMAGES.map((shot, i) => (
                    <button
                      key={shot.src}
                      onClick={() => setJewelryPhotoIndex(i)}
                      aria-label={`Ver ${shot.title}`}
                      className={`h-[3px] cursor-pointer rounded-full transition-all duration-300 ${
                        jewelryPhotoIndex === i
                          ? 'w-6 bg-[#C9A84C] shadow-[0_0_6px_rgba(0,0,0,0.9)]'
                          : 'w-[3px] bg-white/60 shadow-[0_0_4px_rgba(0,0,0,0.9)] hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#0A0A0C]/80 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#C9A84C] backdrop-blur-md border border-[#C9A84C]/30">
                    {selectedMobilePiece.metal}
                  </span>
                  <span className="text-[10px] font-mono text-[#FAF8F5]/80 bg-[#0A0A0C]/60 px-2 py-0.5 rounded-full border border-white/10">
                    {jewelryPhotoIndex + 1} / {JEWELRY_GALLERY_IMAGES.length}
                  </span>
                </div>

                <h3
                  className="text-xl font-serif leading-tight text-[#FAF8F5]"
                  style={{
                    textShadow:
                      '0 1px 2px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.75)',
                  }}
                >
                  Correntes em Ouro e Prata
                </h3>
                <p className="text-[11px] text-[#C9A84C] font-mono">
                  {JEWELRY_GALLERY_IMAGES[jewelryPhotoIndex]?.title}
                </p>
              </div>
            </div>

            {/* 1. Escolha da Peça */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#FAF8F5] uppercase tracking-wider block">
                1. Selecione a Peça:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {JEWELRY_PIECE_OPTIONS.map((piece) => {
                  const isSelected = mobilePieceId === piece.id;
                  const isGold = piece.metal === 'Ouro 18k';
                  return (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      key={piece.id}
                      onClick={() => handleMobileSelectPiece(piece.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#C9A84C] bg-[#C9A84C]/15 text-[#FAF8F5] shadow-[0_0_12px_rgba(201,168,76,0.3)]'
                          : 'border-white/10 bg-[#121216] text-[#9A968E]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className={`px-1.5 py-0.2 rounded ${isGold ? 'text-[#C9A84C]' : 'text-[#FAF8F5]'}`}>
                          {piece.metal}
                        </span>
                      </div>
                      <span className="block text-xs font-serif font-medium leading-tight">
                        {piece.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 2. Pingente: Sem pingente ou Com pingente */}
            <div className="space-y-2 border-t border-white/5 pt-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#FAF8F5]">
                <span className="uppercase tracking-wider">2. Pingente:</span>
                <span className="text-[#C9A84C]">
                  {mobilePendant === 'com-pingente' ? 'Com pingente' : 'Sem pingente'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PENDANT_OPTIONS.map((opt) => {
                  const isSelected = mobilePendant === opt.id;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      key={opt.id}
                      onClick={() => handleMobileSelectPendant(opt.id as 'sem-pingente' | 'com-pingente')}
                      className={`py-3 px-3 rounded-xl border text-center text-xs font-mono tracking-wider uppercase transition-all ${
                        isSelected
                          ? 'border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0C] font-bold shadow-[0_0_10px_rgba(201,168,76,0.4)]'
                          : 'border-white/10 bg-[#121216] text-[#9A968E]'
                      }`}
                    >
                      {opt.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  openWhatsApp(
                    `Olá! Vim pelo site da Relojoaria Aliança e gostaria de encomendar:\n` +
                    `• Peça: ${selectedMobilePiece.name} (${selectedMobilePiece.metal})\n` +
                    `• Pingente: ${mobilePendant === 'com-pingente' ? 'Com pingente' : 'Sem pingente'}`
                  )
                }
                className="w-full py-3.5 bg-gradient-to-r from-[#D4943E] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#D4943E] text-[#0A0A0C] font-mono text-xs font-bold tracking-wider uppercase rounded-full flex items-center justify-center gap-2 shadow-xl shadow-[#C9A84C]/20"
              >
                <WhatsAppGlyph size={14} />
                <span>PEDIR ORÇAMENTO NO WHATSAPP</span>
              </motion.button>

              <button
                onClick={() => setActiveTab('categories')}
                className="w-full py-2.5 text-[11px] font-mono text-[#9A968E] hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={13} />
                <span>VOLTAR PARA TODAS AS CATEGORIAS</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            SCREEN 4: WORKSHOP (Oficina & Ateliê)
            ========================================================= */}
        {activeTab === 'workshop' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            {/* Full-bleed workshop film — the whole content area is the video */}
            <video
              src="/videos/ourives-bancada.mp4"
              poster="/videos/ourives-bancada.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center filter brightness-90"
            />

            {/* Scrims: darken top for the heading, bottom for the details card */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/75 via-[#0A0A0C]/20 to-[#0A0A0C]/85"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/85 to-transparent"
              aria-hidden="true"
            />

            {/* Overlaid content */}
            <div className="relative z-10 flex h-full min-h-0 flex-col px-4 pt-[56px] pb-1">
              <div>
                <span className="rounded-full border border-[#C9A84C]/40 bg-[#0A0A0C]/70 px-2.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#C9A84C] shadow-lg backdrop-blur-md">
                  MESTRE HIVO MARQUES
                </span>
              </div>

              {/* The video keeps this middle band clear */}
              <div className="min-h-0 flex-1" />

              <span
                className="mb-2 block font-serif text-[13px] font-medium leading-tight text-[#FAF8F5]"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.95)' }}
              >
                Forja Manual do Lingote à Joia
              </span>

              {/* Address & Hours — glass card floating over the film */}
              <div className="space-y-2 rounded-2xl border border-[#C9A84C]/30 bg-[#0A0A0C]/75 p-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.65)] backdrop-blur-md">
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#C9A84C]" />
                  <div className="min-w-0">
                    <span className="block font-serif text-[11px] font-medium text-[#FAF8F5]">
                      Endereço da Boutique
                    </span>
                    <p className="mt-0.5 text-[11px] font-light leading-snug text-[#B9B4AC]">
                      {BOUTIQUE_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-white/10 pt-2">
                  <Clock size={14} className="mt-0.5 shrink-0 text-[#C9A84C]" />
                  <div className="min-w-0">
                    <span className="block font-serif text-[11px] font-medium text-[#FAF8F5]">
                      Horário de Funcionamento
                    </span>
                    <p className="mt-0.5 font-mono text-[10px] leading-snug text-[#B9B4AC]">
                      {BOUTIQUE_INFO.hoursWeekday}
                    </p>
                    <p className="font-mono text-[10px] leading-snug text-[#B9B4AC]">
                      {BOUTIQUE_INFO.hoursSaturday}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Call */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Olá, mestre Hivo! Gostaria de agendar uma visita na oficina.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4943E] to-[#C9A84C] text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A0A0C] shadow-[0_12px_30px_rgba(0,0,0,0.55)] transition-colors hover:from-[#C9A84C] hover:to-[#D4943E]"
              >
                <WhatsAppGlyph size={14} />
                <span>FALAR COM O OURIVES NO WHATSAPP</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </main>

      {/* 3. Bottom Tab Bar — in-flow on the landing (fixed viewport) and pinned
             on the scrolling screens. */}
      <nav
        className={`safe-bottom z-40 flex h-16 shrink-0 items-center justify-around border-t border-[#C9A84C]/25 bg-[#0A0A0C]/95 px-2 backdrop-blur-md ${
          activeTab === 'home' ? '' : 'fixed bottom-0 left-0 right-0 shadow-2xl'
        }`}
      >
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-mono tracking-wider transition-all ${
            activeTab === 'home' ? 'text-[#C9A84C] font-bold scale-105' : 'text-[#9A968E]'
          }`}
        >
          <Home size={18} />
          <span>INÍCIO</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-mono tracking-wider transition-all ${
            activeTab === 'categories' || activeTab === 'jewelry' ? 'text-[#C9A84C] font-bold scale-105' : 'text-[#9A968E]'
          }`}
        >
          <Grid size={18} />
          <span>COLEÇÕES</span>
        </button>

        <button
          onClick={() => setActiveTab('product')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-mono tracking-wider transition-all ${
            activeTab === 'product' ? 'text-[#C9A84C] font-bold scale-105' : 'text-[#9A968E]'
          }`}
        >
          <InterlockingRings size={18} strokeWidth={1.4} />
          <span>ALIANÇAS</span>
        </button>

        <button
          onClick={() => setActiveTab('workshop')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-mono tracking-wider transition-all ${
            activeTab === 'workshop' ? 'text-[#C9A84C] font-bold scale-105' : 'text-[#9A968E]'
          }`}
        >
          <Wrench size={18} />
          <span>OFICINA</span>
        </button>
      </nav>
      </div>
    </div>
  );
};
