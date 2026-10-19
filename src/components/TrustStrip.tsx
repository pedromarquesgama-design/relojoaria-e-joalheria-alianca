import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, MessageCircle, MapPin } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="w-full bg-[#0A0A0C] py-16 border-b border-[#C9A84C]/20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. GARANTIA & AUTENTICIDADE */}
          <motion.div
            whileHover={{ y: -5, borderColor: 'rgba(201, 168, 76, 0.6)' }}
            className="flex items-start gap-4 p-5 border border-[#C9A84C]/25 bg-[#121216]/80 rounded-2xl shadow-lg transition-all"
          >
            <div className="w-11 h-11 shrink-0 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/35 flex items-center justify-center text-[#C9A84C] shadow-sm">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="text-xs font-mono font-semibold tracking-wider text-[#FAF8F5] uppercase">
                Garantia & Autenticidade
              </h4>
              <p className="text-xs text-[#9A968E] mt-1 font-light leading-relaxed">
                Ouro 18k certificado (teor 750) e relógios de marcas autênticas com nota e termo oficial.
              </p>
            </div>
          </motion.div>

          {/* 2. OURIVESARIA PRÓPRIA */}
          <motion.div
            whileHover={{ y: -5, borderColor: 'rgba(201, 168, 76, 0.6)' }}
            className="flex items-start gap-4 p-5 border border-[#C9A84C]/25 bg-[#121216]/80 rounded-2xl shadow-lg transition-all"
          >
            <div className="w-11 h-11 shrink-0 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/35 flex items-center justify-center text-[#C9A84C] shadow-sm">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-xs font-mono font-semibold tracking-wider text-[#FAF8F5] uppercase">
                Ourivesaria Própria
              </h4>
              <p className="text-xs text-[#9A968E] mt-1 font-light leading-relaxed">
                Fabricação, ajustes de aro imediatos, soldas e gravação interna cortesia na própria loja.
              </p>
            </div>
          </motion.div>

          {/* 3. ATENDIMENTO ESPECIALIZADO */}
          <motion.div
            whileHover={{ y: -5, borderColor: 'rgba(201, 168, 76, 0.6)' }}
            className="flex items-start gap-4 p-5 border border-[#C9A84C]/25 bg-[#121216]/80 rounded-2xl shadow-lg transition-all"
          >
            <div className="w-11 h-11 shrink-0 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/35 flex items-center justify-center text-[#C9A84C] shadow-sm">
              <MessageCircle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-mono font-semibold tracking-wider text-[#FAF8F5] uppercase">
                Atendimento Especializado
              </h4>
              <p className="text-xs text-[#9A968E] mt-1 font-light leading-relaxed">
                Consultoria personalizada via WhatsApp ou recepção privativa para prova de noivos.
              </p>
            </div>
          </motion.div>

          {/* 4. LOJA FÍSICA NO CENTRO */}
          <motion.div
            whileHover={{ y: -5, borderColor: 'rgba(201, 168, 76, 0.6)' }}
            className="flex items-start gap-4 p-5 border border-[#C9A84C]/25 bg-[#121216]/80 rounded-2xl shadow-lg transition-all"
          >
            <div className="w-11 h-11 shrink-0 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/35 flex items-center justify-center text-[#C9A84C] shadow-sm">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="text-xs font-mono font-semibold tracking-wider text-[#FAF8F5] uppercase">
                Loja Física no Centro
              </h4>
              <p className="text-xs text-[#9A968E] mt-1 font-light leading-relaxed">
                Rua São Pedro, 650 - Centro, Porto Seguro - BA. Visite e confira peças à pronta entrega.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
