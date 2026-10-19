import React from 'react';
import { BOUTIQUE_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

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
        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {/* Col 1: Brand Logo & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center">
              <BrandLogo className="h-9 sm:h-10 w-auto" />
            </div>

            <p className="text-xs text-[#9A968E] leading-relaxed font-light">
              Boutique tradicional de alta relojoaria e ourivesaria artesanal em Porto Seguro, Bahia.
              Criando alianças eternas, joias em ouro 18k e precisão micromecânica que atravessam gerações.
            </p>
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
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#9A968E]">
          <div>
            © {new Date().getFullYear()} Relojoaria e Joalheria Aliança. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Porto Seguro - BA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
