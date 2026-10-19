import React, { useState } from 'react';
import { BOUTIQUE_INFO } from '../data/mockData';
import { CategoryGraphic } from './LuxuryVisuals';
import { X, MessageCircle, Flame, Clock, Award, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AtelierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtelierModal: React.FC<AtelierModalProps> = ({ isOpen, onClose }) => {
  const [serviceType, setServiceType] = useState('aliancas-medida');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('ouro-18k');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabels: Record<string, string> = {
      'aliancas-medida': 'Fabricação de Alianças Sob Medida em Ouro 18k',
      'reforma-ouro': 'Reforma de Joia / Transformação de Ouro de Família',
      'conserto-relogio': 'Manutenção & Conserto de Relógio de Precisão',
      'polimento-ajuste': 'Polimento, Limpeza & Ajuste de Aro Imediato',
    };

    const text = encodeURIComponent(
      `Olá, Mestre Hivo Marques e Equipe da Relojoaria e Joalheria Aliança!\n\n` +
      `Gostaria de solicitar um orçamento para nossa Oficina de Ourivesaria / Relojoaria:\n\n` +
      `*Serviço:* ${serviceLabels[serviceType] || serviceType}\n` +
      `*Material Desejado:* ${material.toUpperCase()}\n` +
      (description ? `*Detalhes do Projeto:* ${description}\n` : '') +
      `\nPodemos alinhar o projeto e agendar um horário na loja do Centro de Porto Seguro?`
    );

    window.open(`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}?text=${text}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#121216] border border-[#C9A84C]/35 text-[#FAF8F5] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#C9A84C]/20 flex items-center justify-between bg-[#0E0E12]/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/35 flex items-center justify-center text-[#C9A84C]">
                <Flame size={20} className="text-[#C9A84C]" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-[#C9A84C] block">
                  OFICINA PRÓPRIA EM PORTO SEGURO
                </span>
                <h3 className="text-xl font-serif text-[#FAF8F5]">Orçamento & Atendimento Sob Medida</h3>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-[#9A968E] hover:text-[#FAF8F5] rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
            >
              <X size={18} />
            </motion.button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleWhatsAppQuote} className="p-6 overflow-y-auto space-y-5">
            <div className="p-4 bg-[#171720] border border-[#C9A84C]/25 rounded-2xl flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#0A0A0C] border border-[#C9A84C]/30 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                <CategoryGraphic type="oficina" className="scale-65" />
              </div>
              <div className="text-xs">
                <span className="font-serif text-[#FAF8F5] block font-medium">
                  Ourivesaria Artesanal por {BOUTIQUE_INFO.goldsmithInstagram}
                </span>
                <span className="text-[#9A968E] leading-relaxed">
                  Fundição em maçarico, laminação de ouro 18k, calibragem micromecânica e gravação imediata na loja.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-[#FAF8F5] mb-2.5">
                Tipo de Atendimento / Serviço
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: 'aliancas-medida', label: 'Alianças Sob Medida' },
                  { id: 'reforma-ouro', label: 'Reforma de Ouro Antigo' },
                  { id: 'conserto-relogio', label: 'Conserto de Relógio' },
                  { id: 'polimento-ajuste', label: 'Polimento & Ajuste de Aro' },
                ].map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setServiceType(s.id)}
                    className={`p-3 text-left rounded-2xl border transition-all ${
                      serviceType === s.id
                        ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-[#FAF8F5] shadow-sm'
                        : 'bg-[#17171F] border-white/10 text-[#9A968E] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{s.label}</span>
                      {serviceType === s.id && <Check size={14} className="text-[#C9A84C]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-[#FAF8F5] mb-2.5">
                Material de Preferência
              </label>
              <div className="flex flex-wrap sm:flex-nowrap gap-2 text-xs font-mono">
                {[
                  { id: 'ouro-18k', label: 'Ouro Amarelo 18k' },
                  { id: 'ouro-branco', label: 'Ouro Branco 18k' },
                  { id: 'ouro-rose', label: 'Ouro Rosé 18k' },
                  { id: 'relogio-aco', label: 'Aço / Misto' },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`flex-1 py-2 px-2.5 text-center rounded-full border text-[11px] transition-all ${
                      material === m.id
                        ? 'bg-[#C9A84C] text-[#0A0A0C] border-[#C9A84C] font-semibold shadow-md'
                        : 'bg-[#17171F] border-white/10 text-[#9A968E] hover:border-white/20'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-[#FAF8F5] mb-2.5">
                Descreva sua ideia, numeração ou necessidade
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Gostaria de confeccionar alianças anatômicas chanfradas de 6mm com gravação de data e acabamento acetinado..."
                className="w-full bg-[#101014] border border-white/10 text-xs px-4 py-3 text-[#FAF8F5] placeholder-[#9A968E]/60 focus:outline-none focus:border-[#C9A84C] rounded-2xl font-sans leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#9A968E] pt-1">
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#C9A84C]" />
                Resposta média em até 30 minutos
              </span>
              <span className="flex items-center gap-1.5">
                <Award size={13} className="text-[#C9A84C]" />
                Garantia vitalícia do teor do ouro
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 px-5 bg-gradient-to-r from-[#D4943E] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#D4943E] text-[#0A0A0C] font-semibold text-xs tracking-wider uppercase transition-all rounded-full flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(201,168,76,0.35)]"
            >
              <MessageCircle size={16} />
              <span>SOLICITAR ORÇAMENTO NO WHATSAPP</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
