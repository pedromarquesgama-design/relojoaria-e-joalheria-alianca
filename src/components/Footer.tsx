import React from 'react';
import { BOUTIQUE_INFO } from '../data/mockData';
import { GoldEmblem } from './LuxuryVisuals';
import { Instagram, MessageCircle, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sec: string) => void;
  onOpenAtelier: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenAtelier,
}) => {
  return (
    <footer className="w-full bg-[#070709] border-t border-[#C9A84C]/25 text-[#FAF8F5] pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Brand Logo & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <GoldEmblem size={26} />
              <div>
                <span className="text-xl font-serif font-bold text-[#FAF8F5] tracking-wider block">
                  ALIANÇA
                </span>
                <span className="text-[8px] font-mono tracking-[0.2em] text-[#C9A84C] uppercase block">
                  RELOJOARIA E JOALHERIA
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9A968E] leading-relaxed font-light">
              Boutique tradicional de alta relojoaria e ourivesaria artesanal em Porto Seguro, Bahia.
              Criando alianças eternas, joias em ouro 18k e precisão micromecânica que atravessam gerações.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#C9A84C]">
              CNPJ Ativo & Oficina Própria Registrada
            </div>
          </div>

          {/* Col 2: COLEÇÕES */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-[0.16em] uppercase text-[#FAF8F5]">
              Coleções
            </h4>
            <ul className="space-y-2 text-xs text-[#9A968E] font-light">
              <li>
                <button
                  onClick={() => onNavigateSection('relogios')}
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  Relógios Mecânicos & Cronógrafos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('joias')}
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  Jóias em Ouro 18k 750
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('aliancas')}
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  Alianças de Casamento Anatômicas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('joias')}
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  Anéis de Noivado & Solitários
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('oculos')}
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  Óculos de Grau & Solares de Luxo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: SERVIÇOS DE OFICINA */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-[0.16em] uppercase text-[#FAF8F5]">
              Serviços de Oficina
            </h4>
            <ul className="space-y-2 text-xs text-[#9A968E] font-light">
              <li>
                <button
                  onClick={onOpenAtelier}
                  className="hover:text-[#C9A84C] transition-colors text-left"
                >
                  Fabricação Sob Medida de Alianças
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAtelier}
                  className="hover:text-[#C9A84C] transition-colors text-left"
                >
                  Conserto & Lubrificação de Relógios
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAtelier}
                  className="hover:text-[#C9A84C] transition-colors text-left"
                >
                  Polimento Diamantado e Limpeza Ultrassônica
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAtelier}
                  className="hover:text-[#C9A84C] transition-colors text-left"
                >
                  Ajuste de Aro Imediato em Ouro
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAtelier}
                  className="hover:text-[#C9A84C] transition-colors text-left"
                >
                  Troca de Bateria com Teste de Vedação
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: CONTATO & HORÁRIOS */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-[0.16em] uppercase text-[#FAF8F5]">
              Contato & Localização
            </h4>

            <div className="space-y-2.5 text-xs text-[#9A968E] font-light">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <span>{BOUTIQUE_INFO.address}</span>
              </div>

              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <p>{BOUTIQUE_INFO.hoursWeekday}</p>
                  <p>{BOUTIQUE_INFO.hoursSaturday}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`https://wa.me/${BOUTIQUE_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#171720] hover:bg-[#20202E] text-[#FAF8F5] border border-[#C9A84C]/35 hover:border-[#C9A84C] rounded-full transition-all font-mono text-[11px] shadow-sm hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
                >
                  <MessageCircle size={14} className="text-emerald-400" />
                  <span>WhatsApp: {BOUTIQUE_INFO.phone}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-mono text-[#C9A84C]">Instagram:</span>
                <span className="text-[11px] font-mono text-[#FAF8F5]">{BOUTIQUE_INFO.instagram}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#9A968E]">
          <div>
            © {new Date().getFullYear()} Relojoaria e Joalheria Aliança. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Ourivesaria: {BOUTIQUE_INFO.goldsmithInstagram}</span>
            <span>·</span>
            <span>Porto Seguro - BA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
