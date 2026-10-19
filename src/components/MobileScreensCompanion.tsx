import React, { useState } from 'react';
import { BOUTIQUE_INFO, FEATURED_PRODUCTS } from '../data/mockData';
import { GoldEmblem } from './LuxuryVisuals';
import {
  Home,
  Grid,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronLeft,
  Flame,
  Wrench,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileScreensCompanionProps {
  onOpenProductModal?: (prod: any) => void;
}

export const MobileScreensCompanion: React.FC<MobileScreensCompanionProps> = ({
  onOpenProductModal,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'categories' | 'product' | 'workshop'>('home');
  const [screen3PhotoIndex, setScreen3PhotoIndex] = useState(1);
  const [selectedRingSize, setSelectedRingSize] = useState('18');
  const [engravingText, setEngravingText] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const product = FEATURED_PRODUCTS[0]; // Par de Alianças Anatômicas Chanfradas

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 2500);
  };

  const openWhatsApp = (customMsg?: string) => {
    const text = encodeURIComponent(
      customMsg ||
        `Olá, Relojoaria e Joalheria Aliança!\nVi o Par de Alianças Anatômicas Chanfradas (Ref: AL-18K-01) no catálogo e gostaria de verificar a disponibilidade na loja de Porto Seguro.`
    );
    window.open(`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0C] text-[#FAF8F5] pb-24 flex flex-col font-sans selection:bg-[#C9A84C]/30 selection:text-[#FAF8F5]">
      {/* 1. Mobile Fixed Top Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#C9A84C]/25 px-4 h-16 flex items-center justify-between">
        <motion.div
          whileTap={{ scale: 0.96 }}
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <GoldEmblem size={24} />
          <div className="flex flex-col">
            <span className="text-base font-serif font-semibold tracking-wider text-[#FAF8F5] leading-none">
              ALIANÇA
            </span>
            <span className="text-[8px] font-mono tracking-[0.22em] text-[#C9A84C] uppercase mt-0.5">
              PORTO SEGURO · BA
            </span>
          </div>
        </motion.div>

        <div className="flex items-center gap-2">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${encodeURIComponent(
              'Olá! Gostaria de falar com o ourives da Relojoaria Aliança em Porto Seguro.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C9A84C] text-[#0A0A0C] text-[10px] font-mono font-bold tracking-wider uppercase rounded-full shadow-md"
          >
            <MessageCircle size={13} />
            <span>WhatsApp</span>
          </motion.a>
        </div>
      </header>

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
      <main className="flex-1">
        {/* =========================================================
            SCREEN 1: HOME (Início)
            ========================================================= */}
        {activeTab === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6 px-4 pt-4"
          >
            {/* Real HD Video Hero */}
            <div className="relative aspect-[4/5] w-full bg-[#121216] border border-[#C9A84C]/35 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <video
                src="/videos/hero-aliancas.mp4"
                poster="/videos/hero-aliancas.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/40 pointer-events-none" />

              <div className="absolute top-4 left-4 bg-[#0A0A0C]/85 backdrop-blur-md px-3 py-1 border border-[#C9A84C]/35 text-[9px] font-mono text-[#C9A84C] uppercase tracking-wider rounded-full shadow-lg">
                OURO 18K 750 & HAUTE HORLOGERIE
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C9A84C] block">
                  TRADIÇÃO EM PORTO SEGURO
                </span>
                <h2 className="text-2xl font-serif text-[#FAF8F5] leading-tight">
                  Alianças em Ouro 18K & Alta Relojoaria
                </h2>
                <p className="text-xs text-[#9A968E] line-clamp-2 font-light">
                  Fabricação própria na bancada da Rua São Pedro pelo mestre ourives Hivo Marques.
                </p>
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('product')}
                className="p-4 bg-[#121216] border border-[#C9A84C]/30 rounded-2xl text-left hover:border-[#C9A84C] transition-all shadow-md"
              >
                <span className="text-[9px] font-mono tracking-wider text-[#C9A84C] uppercase block mb-1">
                  DESTAQUE
                </span>
                <span className="text-xs font-serif text-[#FAF8F5] block font-medium">
                  Par de Alianças
                </span>
                <span className="text-[11px] font-mono text-[#9A968E] mt-1 block">
                  R$ 3.890
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('workshop')}
                className="p-4 bg-[#121216] border border-[#C9A84C]/30 rounded-2xl text-left hover:border-[#C9A84C] transition-all shadow-md"
              >
                <span className="text-[9px] font-mono tracking-wider text-[#C9A84C] uppercase block mb-1">
                  OFICINA LOCAL
                </span>
                <span className="text-xs font-serif text-[#FAF8F5] block font-medium">
                  Ateliê na Bancada
                </span>
                <span className="text-[11px] font-mono text-emerald-400 mt-1 block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ativo Hoje
                </span>
              </motion.button>
            </div>

            {/* Ghost CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('categories')}
              className="w-full py-3.5 px-4 bg-transparent hover:bg-[#C9A84C]/10 text-[#FAF8F5] border border-[#C9A84C] text-xs font-mono tracking-[0.14em] uppercase transition-all rounded-full flex items-center justify-center gap-2"
            >
              <span>EXPLORAR TODAS AS CATEGORIAS</span>
              <ArrowRight size={14} className="text-[#C9A84C]" />
            </motion.button>

            {/* Trust Mini Banner */}
            <div className="p-3.5 bg-[#121216]/80 border border-white/10 rounded-2xl flex items-center justify-between text-[11px] font-mono text-[#9A968E]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C9A84C]" />
                <span>Garantia Vitalícia do Ouro</span>
              </span>
              <span className="text-[#C9A84C]">Rua São Pedro, 650</span>
            </div>
          </motion.div>
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
              <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase block">
                O UNIVERSO ALIANÇA
              </span>
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
                  title: 'RELÓGIOS',
                  sub: 'Cronógrafos e automáticos suíços',
                  tag: 'HAUTE HORLOGERIE',
                  video: '/videos/relojoaria-cronografo.mp4',
                  poster: '/videos/relojoaria-cronografo.jpg',
                  action: () =>
                    openWhatsApp(
                      'Olá! Gostaria de consultar a disponibilidade de relógios automáticos na loja.'
                    ),
                },
                {
                  title: 'JÓIAS EM OURO',
                  sub: 'Correntes grumet e pingentes maciços',
                  tag: 'OURO 18K 750',
                  video: '/videos/joias-corrente-ouro.mp4',
                  poster: '/videos/joias-corrente-ouro.jpg',
                  action: () =>
                    openWhatsApp(
                      'Olá! Gostaria de ver opções de correntes grumet em ouro 18k.'
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
                {
                  title: 'OFICINA & ATELIER',
                  sub: 'Bancada e manutenção na hora',
                  tag: 'MESTRE HIVO MARQUES',
                  video: '/videos/ourives-bancada.mp4',
                  poster: '/videos/ourives-bancada.jpg',
                  action: () => setActiveTab('workshop'),
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
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('categories')}
                className="flex items-center gap-1 text-xs font-mono text-[#9A968E] hover:text-[#FAF8F5] py-1 px-2.5 rounded-full bg-white/5"
              >
                <ChevronLeft size={16} />
                <span>Voltar</span>
              </motion.button>
              <span className="text-[10px] font-mono text-[#C9A84C] tracking-widest px-3 py-1 rounded-full bg-[#121216] border border-white/10">
                {product.ref}
              </span>
            </div>

            {/* Large Video / Photo Viewer */}
            <div className="relative aspect-square w-full bg-[#121216] border border-[#C9A84C]/35 rounded-3xl overflow-hidden shadow-2xl">
              {screen3PhotoIndex === 1 && (
                <video
                  src="/videos/forja-anel-fogo.mp4"
                  poster="/videos/forja-anel-fogo.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-95"
                />
              )}
              {screen3PhotoIndex === 2 && (
                <video
                  src="/videos/hero-aliancas.mp4"
                  poster="/videos/hero-aliancas.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-95"
                />
              )}
              {screen3PhotoIndex === 3 && (
                <video
                  src="/videos/alianca-estojo-noivos.mp4"
                  poster="/videos/alianca-estojo-noivos.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-95"
                />
              )}
              {screen3PhotoIndex === 4 && (
                <video
                  src="/videos/ourives-bancada.mp4"
                  poster="/videos/ourives-bancada.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-95"
                />
              )}

              {/* Counter Pill */}
              <div className="absolute top-3 right-3 bg-[#0A0A0C]/85 backdrop-blur-md border border-white/10 px-3 py-1 text-[9px] font-mono text-[#FAF8F5] rounded-full">
                {screen3PhotoIndex} / 4 ÂNGULOS
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
                {[1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setScreen3PhotoIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      screen3PhotoIndex === idx ? 'w-5 bg-[#C9A84C]' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product Meta */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5">
                  {product.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/30 px-3 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DISPONÍVEL NA LOJA
                </span>
              </div>

              <h3 className="text-xl font-serif text-[#FAF8F5] leading-tight">
                {product.title}
              </h3>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-mono text-[#C9A84C] font-semibold">
                  {product.price}
                </span>
                <span className="text-xs font-mono text-[#9A968E]">o par em ouro 18k</span>
              </div>
            </div>

            {/* Ring Size Selector */}
            <div className="space-y-2 pt-2 border-t border-white/5">
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
                onClick={() =>
                  openWhatsApp(
                    `Olá! Gostaria de encomendar o Par de Alianças Anatômicas Chanfradas (Ref: AL-18K-01), aro ${selectedRingSize}${
                      engravingText ? ` com gravação: "${engravingText}"` : ''
                    }.`
                  )
                }
                className="w-full py-3.5 bg-gradient-to-r from-[#D4943E] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#D4943E] text-[#0A0A0C] font-mono text-xs font-bold tracking-wider uppercase rounded-full flex items-center justify-center gap-2 shadow-xl shadow-[#C9A84C]/20"
              >
                <MessageCircle size={15} />
                <span>PEDIR ORÇAMENTO NO WHATSAPP</span>
              </motion.button>
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
            className="space-y-6 px-4 pt-4"
          >
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase block">
                BANCADA ATIVA · PORTO SEGURO
              </span>
              <h3 className="text-xl font-serif text-[#FAF8F5]">A Arte da Ourivesaria</h3>
            </div>

            {/* Workshop Master Goldsmith Video */}
            <div className="relative aspect-[9/14] w-full bg-[#121216] border border-[#C9A84C]/35 rounded-3xl overflow-hidden shadow-2xl">
              <video
                src="/videos/ourives-bancada.mp4"
                poster="/videos/ourives-bancada.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/40 pointer-events-none" />

              <div className="absolute top-4 left-4 bg-[#121216]/90 border border-[#C9A84C]/30 px-3.5 py-1 text-[9px] font-mono text-[#C9A84C] uppercase tracking-wider backdrop-blur-md rounded-full shadow-lg">
                MESTRE HIVO MARQUES
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-1">
                <span className="text-sm font-serif text-[#FAF8F5] block font-medium">
                  Forja Manual do Lingote à Joia
                </span>
                <p className="text-[11px] font-mono text-[#9A968E]">
                  Rua São Pedro, 650 - Centro de Porto Seguro
                </p>
              </div>
            </div>

            {/* Workshop Specs Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 bg-[#121216] border border-white/10 rounded-2xl space-y-1 shadow-sm">
                <Flame size={16} className="text-[#C9A84C]" />
                <span className="text-[#FAF8F5] block font-semibold">Ouro 18K 750</span>
                <span className="text-[10px] text-[#9A968E] block">Fusão Própria</span>
              </div>
              <div className="p-3.5 bg-[#121216] border border-white/10 rounded-2xl space-y-1 shadow-sm">
                <Wrench size={16} className="text-[#C9A84C]" />
                <span className="text-[#FAF8F5] block font-semibold">0.02 mm</span>
                <span className="text-[10px] text-[#9A968E] block">Ajuste na Bancada</span>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="p-4 bg-[#121216] border border-[#C9A84C]/25 rounded-2xl space-y-3 shadow-md">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-serif text-[#FAF8F5] block font-medium">
                    Endereço da Boutique
                  </span>
                  <p className="text-xs text-[#9A968E] mt-0.5 font-light">
                    {BOUTIQUE_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2.5 border-t border-white/5">
                <Clock size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-serif text-[#FAF8F5] block font-medium">
                    Horário de Funcionamento
                  </span>
                  <p className="text-[11px] font-mono text-[#9A968E] mt-0.5">
                    {BOUTIQUE_INFO.hoursWeekday}
                  </p>
                  <p className="text-[11px] font-mono text-[#9A968E]">
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
                'Olá, mestre ourives Hivo Marques! Gostaria de agendar uma visita na oficina para provar alianças.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-gradient-to-r from-[#D4943E] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#D4943E] text-[#0A0A0C] font-mono text-xs font-bold tracking-wider uppercase rounded-full flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={15} />
              <span>FALAR COM O OURIVES NO WHATSAPP</span>
            </motion.a>
          </motion.div>
        )}
      </main>

      {/* 3. Fixed Bottom Tab Bar (Safe mobile navigation for all 4 screens) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0C]/95 backdrop-blur-md border-t border-[#C9A84C]/25 h-16 flex items-center justify-around px-2 shadow-2xl">
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
            activeTab === 'categories' ? 'text-[#C9A84C] font-bold scale-105' : 'text-[#9A968E]'
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
          <Sparkles size={18} />
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
  );
};
