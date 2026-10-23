import { Product, CategoryItem } from '../types';

export const BOUTIQUE_INFO = {
  name: 'Aliança Relojoaria e Joalheria',
  shortName: 'Aliança',
  address: 'Rua São Pedro, 650 - Centro, Porto Seguro - BA',
  phone: '(73) 98102-9862',
  whatsappRaw: '5573981029862',
  instagram: '@aliancarelojoariaejoalheria',
  goldsmithInstagram: '@hivo_marques',
  hoursWeekday: 'Segunda a Sexta: 09:00 às 18:00',
  hoursSaturday: 'Sábado: 09:00 às 12:00',
  city: 'Porto Seguro, Bahia',
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'relogios',
    title: 'RELÓGIOS',
    subtitle: 'Cronógrafos e calibres mecânicos de alta batida com revisão na loja.',
    tag: 'HAUTE HORLOGERIE',
    imageType: 'relogios',
    itemCount: 24,
    video: '/videos/relojoaria-cronografo.mp4',
    poster: '/videos/relojoaria-cronografo.jpg',
  },
  {
    id: 'joias',
    title: 'JÓIAS EM OURO',
    subtitle: 'Correntes grumet maciças, pingentes e anéis forjados em Ouro 18k.',
    tag: 'OURO 18K 750',
    imageType: 'joias',
    itemCount: 42,
    video: '/videos/joias-corrente-ouro.mp4',
    poster: '/videos/joias-corrente-ouro.jpg',
  },
  {
    id: 'aliancas',
    title: 'ALIANÇAS',
    subtitle: 'Modelos anatômicos forjados sem emenda para o compromisso de uma vida.',
    tag: 'NOIVOS & CASAMENTO',
    imageType: 'aliancas',
    itemCount: 38,
    video: '/videos/alianca-estojo-noivos.mp4',
    poster: '/videos/alianca-estojo-noivos.jpg',
  },
  {
    id: 'oculos',
    title: 'ÓCULOS',
    subtitle: 'Armações solares e oftálmicas em acetato italiano e titânio cirúrgico.',
    tag: 'LUXURY EYEWEAR',
    imageType: 'oculos',
    itemCount: 19,
    video: '/videos/oculos-solar.mp4',
    poster: '/videos/oculos-solar.jpg',
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    category: 'ALIANÇAS OURO & PRATA',
    categoryTag: 'Ourivesaria Própria',
    title: 'Pares de Alianças em Ouro e Prata',
    ref: 'REF. AL-18K-01',
    price: 'Sob Consulta',
    rawPrice: 3890,
    status: 'DISPONIVEL',
    statusText: 'DISPONÍVEL',
    imageType: 'aliancas-18k',
    imageUrl: '/products/conjunto-dourado.webp',
    shortDescription: 'Par de alianças forjadas em Ouro Amarelo 18k 750 com acabamento chanfrado de alta precisão e interior anatômico para máximo conforto.',
    specs: {
      material: 'Ouro Amarelo 18k (Teor 750)',
      acabamento: 'Polido / Anatômico Confort',
      largura: '6.0 mm cada aro',
      gravacao: 'Gravação a laser cortesia inclusa',
      garantia: 'Garantia Vitalícia do Ouro e 1º Polimento Anual',
    },
    history: 'Forjada em peça única através de laminação contínua em nossa bancada na Rua São Pedro. Cada chanfro é esculpido à mão na lima fina para conferir reflexo nítido e interior macio que se molda aos dedos.',
    inStock: true,
  },
  {
    id: 'prod-2',
    category: 'RELOJOARIA',
    categoryTag: 'Edição Especial',
    title: 'Cronógrafo Automático Prata e Ouro',
    ref: 'REF. RL-41MM-09',
    price: 'Sob Consulta',
    rawPrice: 2450,
    status: 'DISPONIVEL',
    statusText: 'DISPONÍVEL',
    imageType: 'cronografo-gold',
    video: '/videos/relojoaria-cronografo.mp4',
    poster: '/videos/relojoaria-cronografo.jpg',
    shortDescription: 'Relógio de pulso com calibre automático, caixa em aço cirúrgico 316L com bisel banhado em ouro 18k, mostrador sunburst preto e cristal de safira.',
    specs: {
      material: 'Aço Inoxidável 316L & Ouro 18k',
      acabamento: 'Bisel polido com escala taquimétrica gravada',
      calibre: 'Calibre Mecânico Automático 28.800 vph',
      caixa: 'Diâmetro 41 mm | Espessura 12.4 mm',
      gravacao: 'Fundo rosqueado gravado numerado',
      garantia: '2 Anos de Assistência Técnica Especializada',
    },
    history: 'Uma união rigorosa entre a precisão micromecânica e o acabamento nobre do ouro. Ideal para quem valoriza a pontualidade com imponência clássica e resistência diária.',
    inStock: true,
  },
  {
    id: 'prod-3',
    category: 'ALTA JOALHERIA',
    categoryTag: 'Exclusividade',
    title: 'Anel Solitário Ouro 18k & Pedra Rubi',
    ref: 'REF. JS-18K-14',
    price: 'Sob Consulta',
    rawPrice: 1980,
    status: 'DISPONIVEL',
    statusText: 'DISPONÍVEL',
    imageType: 'solitario-diamante',
    imageUrl: '/products/alianca-solitario-rubi.jpg',
    shortDescription: 'Solitário clássico confeccionado em Ouro 18k com cravação em garras elevadas que destacam a gema rubi central lapidação brilhante.',
    specs: {
      material: 'Ouro Amarelo 18k 750',
      acabamento: 'Polimento espelhado diamantado',
      pedraCentral: 'Gema Rubi lapidação brilhante em garras elevadas de segurança',
      largura: 'Aro delicado anatômico com 2.4 mm de espessura',
      gravacao: 'Interna com iniciais e data comemorativa',
      garantia: 'Certificado de Autenticidade e Manutenção Eterna',
    },
    history: 'A quintessência do pedido de noivado e compromisso. Desenvolvido para acomodar perfeitamente alianças de casamento em conjunto harmônico, mantendo o rubi lapidado em destaque luminoso.',
    inStock: true,
  },
  {
    id: 'prod-4',
    category: 'JÓIAS EM OURO 18K',
    categoryTag: 'Sob Encomenda',
    title: 'Corrente de Ouro 18k Elo Português',
    ref: 'REF. CP-18K-22',
    price: 'Sob Consulta',
    rawPrice: 2190,
    status: 'SOB_ENCOMENDA',
    statusText: 'SOB ENCOMENDA',
    imageType: 'corrente-grumet',
    video: '/videos/joias-corrente-ouro.mp4',
    poster: '/videos/joias-corrente-ouro.jpg',
    shortDescription: 'Corrente confeccionada em Ouro 18k 750 maciço com elos modelo Português e fecho reforçado de alta segurança.',
    specs: {
      material: 'Ouro 18k Maciço 750',
      acabamento: 'Elos modelo português com acabamento polido',
      largura: 'Malha 4.5 mm | Comprimento sob medida',
      gravacao: 'Opcional em pingente personalizado',
      garantia: 'Garantia Eterna do Teor do Ouro 18k',
    },
    history: 'Forjada elo por elo no ateliê da Aliança. Uma joia de peso expressivo e durabilidade imbatível, feita para atravessar gerações sem perder o valor intrínseco.',
    inStock: false,
  },
];

export interface JewelryPieceOption {
  id: 'corrente-ouro' | 'corrente-prata' | 'pulseira-ouro' | 'pulseira-prata';
  name: string;
  category: string;
  metal: 'Ouro 18k' | 'Prata 950';
  type: 'Corrente' | 'Pulseira';
  price: string;
  rawPrice: number;
  ref: string;
  imageType: string;
  description: string;
  specs: {
    material: string;
    acabamento: string;
    fecho: string;
    garantia: string;
  };
}

export const JEWELRY_PIECE_OPTIONS: JewelryPieceOption[] = [
  {
    id: 'corrente-ouro',
    name: 'Corrente de Ouro',
    category: 'JÓIAS EM OURO 18K',
    metal: 'Ouro 18k',
    type: 'Corrente',
    price: 'Sob Consulta',
    rawPrice: 0,
    ref: 'REF. CO-18K-01',
    imageType: 'corrente-grumet',
    description: 'Corrente maciça forjada em Ouro Amarelo 18k 750 com polimento de alto brilho no ateliê da Aliança.',
    specs: {
      material: 'Ouro Amarelo 18k Maciço (Teor 750)',
      acabamento: 'Polimento diamantado de alta precisão',
      fecho: 'Fecho estruturado com trava de segurança dupla',
      garantia: 'Garantia Eterna do Teor do Ouro 18k',
    },
  },
  {
    id: 'corrente-prata',
    name: 'Corrente de Prata',
    category: 'JÓIAS EM PRATA 950',
    metal: 'Prata 950',
    type: 'Corrente',
    price: 'Sob Consulta',
    rawPrice: 0,
    ref: 'REF. CP-950-02',
    imageType: 'corrente-grumet',
    description: 'Corrente em Prata de Lei 950 maciça, forjada com acabamento diamantado brilhante e alta durabilidade.',
    specs: {
      material: 'Prata 950 Maciça Legítima',
      acabamento: 'Polimento nobre com brilho espelhado',
      fecho: 'Fecho resistente de engate rápido',
      garantia: 'Certificado de Autenticidade da Prata 950',
    },
  },
  {
    id: 'pulseira-ouro',
    name: 'Pulseira de Ouro',
    category: 'JÓIAS EM OURO 18K',
    metal: 'Ouro 18k',
    type: 'Pulseira',
    price: 'Sob Consulta',
    rawPrice: 0,
    ref: 'REF. PO-18K-03',
    imageType: 'corrente-grumet',
    description: 'Pulseira anatômica em Ouro 18k 750, elos robustos com encaixe suave ao pulso e fecho reforçado.',
    specs: {
      material: 'Ouro Amarelo 18k (Teor 750)',
      acabamento: 'Polimento acetinado e faces espelhadas',
      fecho: 'Fecho gaveta com trava de pressão',
      garantia: 'Garantia Vitalícia do Ouro 18k',
    },
  },
  {
    id: 'pulseira-prata',
    name: 'Pulseira de Prata',
    category: 'JÓIAS EM PRATA 950',
    metal: 'Prata 950',
    type: 'Pulseira',
    price: 'Sob Consulta',
    rawPrice: 0,
    ref: 'REF. PP-950-04',
    imageType: 'corrente-grumet',
    description: 'Pulseira clássica em Prata 950 maciça, elos maciços e fecho italiano de alta retenção.',
    specs: {
      material: 'Prata de Lei 950 Maciça',
      acabamento: 'Polimento especial com pasta diamantada',
      fecho: 'Fecho mosquetão italiano reforçado',
      garantia: 'Garantia Vitalícia da Prata de Lei',
    },
  },
];

export const PENDANT_OPTIONS = [
  { id: 'sem-pingente', label: 'Sem pingente', note: 'Apenas a peça lisa' },
  { id: 'com-pingente', label: 'Com pingente', note: 'Pingente opcional incluso na consulta' },
];

export const JEWELRY_GALLERY_IMAGES = [
  {
    src: '/products/joias/corrente-portugues-estojo.jpg',
    title: 'Corrente de Ouro 18k no Estojo',
    alt: 'Corrente de ouro 18k elo português no estojo de veludo vermelho',
    pieceMatch: 'corrente-ouro',
  },
  {
    src: '/products/joias/pulseira-ouro-estojo.jpg',
    title: 'Pulseira de Ouro 18k no Estojo',
    alt: 'Pulseira em ouro 18k no estojo de veludo vermelho',
    pieceMatch: 'pulseira-ouro',
  },
  {
    src: '/products/joias/corrente-plaquinha-ouro.jpg',
    title: 'Corrente com Pingente Placa em Ouro 18k',
    alt: 'Corrente com pingente plaquinha em ouro 18k no estojo de veludo',
    pieceMatch: 'com-pingente',
  },
  {
    src: '/products/joias/pulseira-ouro-elos.jpg',
    title: 'Pulseira de Ouro 18k Elos Maciços',
    alt: 'Pulseira em ouro 18k com fecho reforçado sobre fundo escuro',
    pieceMatch: 'pulseira-ouro',
  },
  {
    src: '/products/joias/corrente-portugues-ouro.jpg',
    title: 'Corrente de Ouro 18k Elo Português',
    alt: 'Corrente de ouro 18k elo português sobre fundo escuro',
    pieceMatch: 'corrente-ouro',
  },
];

export const WEDDING_RING_SHOTS = [
  {
    src: '/products/conjunto-dourado.webp',
    alt: 'Par de alianças e anel de diamante em ouro 18k sobre veludo vermelho',
    title: 'Conjunto Alianças & Anel em Ouro 18k',
  },
  {
    src: '/products/anel-diamante.webp',
    alt: 'Anel de diamante solitário em caixa de veludo vermelho',
    title: 'Anel Solitário Ouro 18k & Diamante',
  },
  {
    src: '/products/alianca-solitario-rubi.jpg',
    alt: 'Anel solitário em ouro 18k com pedra rubi central em estojo de veludo vermelho',
    title: 'Anel Solitário Ouro 18k & Pedra Rubi',
  },
  {
    src: '/products/brincos-dourados-estojo.webp',
    alt: 'Par de alianças douradas em estojo de veludo vermelho',
    title: 'Par de Alianças 18k Tradicional',
  },
  {
    src: '/products/brincos-dourados-caixa.webp',
    alt: 'Par de alianças douradas em caixa de veludo vermelho',
    title: 'Alianças Chanfradas 6mm',
  },
  {
    src: '/products/conjunto-prateado.webp',
    alt: 'Conjunto de alianças prateadas com anel de diamante em veludo vermelho',
    title: 'Conjunto Alianças em Prata 950 & Solitário',
  },
  {
    src: '/products/brincos-prateados-estojo.webp',
    alt: 'Par de alianças prateadas em estojo de veludo vermelho',
    title: 'Par de Alianças em Prata de Lei 950',
  },
];

export const GOLD_JEWELRY_HERO_PRODUCT: Product = {
  id: 'prod-grumet-18k',
  category: 'JÓIAS EM OURO & PRATA',
  categoryTag: 'Ourivesaria Autoral',
  title: 'Corrente de Ouro 18k 750',
  ref: 'REF. CO-18K-01',
  price: 'R$ 3.890',
  rawPrice: 3890,
  status: 'DISPONIVEL',
  statusText: 'DISPONÍVEL OU SOB MEDIDA',
  imageType: 'corrente-grumet',
  shortDescription: 'Corrente maciça forjada em Ouro 18k 750 com polimento espelhado no ateliê da Aliança em Porto Seguro.',
  specs: {
    material: 'Ouro Amarelo 18k Maciço (Teor 750)',
    acabamento: 'Polimento Diamantado Alto Brilho',
    fecho: 'Fecho estruturado com trava de segurança',
    gravacao: 'Timbre oficial 18k 750 e punção Aliança',
    garantia: 'Garantia Eterna do Ouro e 1º Polimento Anual Grátis',
  },
  history: 'Forjada na bancada da Rua São Pedro em Porto Seguro. Uma joia clássica e atemporal concebida para durar gerações.',
  inStock: true,
};


export const GOLD_JEWELRY_ITEMS: Product[] = [
  GOLD_JEWELRY_HERO_PRODUCT,
  {
    id: 'prod-cruz-18k',
    category: 'JÓIAS EM OURO 18K',
    categoryTag: 'Pingentes de Fé',
    title: 'Pingente Cruz Maciça em Ouro 18k 750',
    ref: 'REF. PG-CRUZ-18K',
    price: 'R$ 890',
    rawPrice: 890,
    status: 'DISPONIVEL',
    statusText: 'DISPONÍVEL',
    imageType: 'solitario-diamante',
    shortDescription: 'Cruz esculpida em ouro 18k maciço com acabamento chanfrado e passador reforçado para correntes de até 6mm.',
    specs: {
      material: 'Ouro 18k 750 Maciço',
      acabamento: 'Faces chanfradas com polimento espelhado',
      largura: 'Dimensões: 32mm x 18mm',
      gravacao: 'Punção 18K no passador',
      garantia: 'Garantia Vitalícia do Ouro',
    },
    history: 'Símbolo eterno esculpido no fogo. Peça de presença marcante e atemporal, concebida para resistir ao uso diário contínuo.',
    inStock: true,
  },
  {
    id: 'prod-bento-18k',
    category: 'JÓIAS EM OURO 18K',
    categoryTag: 'Tradição & Proteção',
    title: 'Medalha de São Bento em Ouro 18k',
    ref: 'REF. PG-BENTO-18K',
    price: 'R$ 1.150',
    rawPrice: 1150,
    status: 'DISPONIVEL',
    statusText: 'DISPONÍVEL',
    imageType: 'solitario-diamante',
    shortDescription: 'Medalha dupla face com cunhagem de altíssima definição das inscrições sacras em latim e aro circular polido.',
    specs: {
      material: 'Ouro Amarelo 18k (750)',
      acabamento: 'Cunhagem em alto relevo e fundo acetinado',
      largura: 'Diâmetro: 20 mm',
      gravacao: 'Inscrições em relevo frente e verso',
      garantia: 'Garantia Eterna do Ouro 18k',
    },
    history: 'Uma das joias de devoção mais requisitadas na boutique de Porto Seguro, executada com precisão absoluta de cada caractere sacro.',
    inStock: true,
  },
  {
    id: 'prod-cartier-18k',
    category: 'JÓIAS EM OURO 18K',
    categoryTag: 'Clássico Eterno',
    title: 'Corrente Cartier Longa Ouro 18k',
    ref: 'REF. CR-CART-18K',
    price: 'R$ 3.490',
    rawPrice: 3490,
    status: 'DISPONIVEL',
    statusText: 'DISPONÍVEL',
    imageType: 'corrente-grumet',
    shortDescription: 'Malha Cartier clássica com elos retangulares alongados e acabamento polido reluzente.',
    specs: {
      material: 'Ouro 18k 750',
      acabamento: 'Polimento manual na pasta diamantada',
      largura: 'Espessura 3.2 mm | 60 cm',
      fecho: 'Fecho mosquetão italiano anatômico',
      gravacao: 'Timbre 750 no fecho',
      garantia: 'Garantia Vitalícia do Ouro 18k',
    },
    history: 'Design parisiense adaptado com a robustez e pureza do ouro forjado na bancada do ateliê.',
    inStock: true,
  },
];

export const BENTO_NOIVOS_ITEMS = [
  {
    title: 'Aliança Trabalhada Ouro 18k',
    subtitle: 'Frisos diamantados e acabamento acetinado feito na lima.',
    ref: 'REF. AL-TB-08',
  },
  {
    title: 'Anel Solitário Clássico',
    subtitle: 'Garras de precisão para noivado e renovação de votos.',
    ref: 'REF. JS-SL-03',
  },
  {
    title: 'Gravação Interna Cortesia',
    subtitle: 'Nomes, datas e caligrafia comemorativa cortesia da casa.',
    ref: 'SERVIÇO ATELIER',
  },
];

export const BENTO_WATCH_ITEMS = [
  {
    title: 'Relógios Masculinos & Femininos',
    subtitle: 'Seleção suíça e japonesa de marcas conceituadas no mercado.',
    ref: 'CURADORIA PREMIUM',
  },
  {
    title: 'Armações & Óculos Solares',
    subtitle: 'Proteção UV400 e armações anatômicas em acetato italiano.',
    ref: 'COLEÇÃO ÓTICA',
  },
  {
    title: 'Manutenção & Ajustes de Precisão',
    subtitle: 'Troca de bateria com teste de vedação, polimento e lubrificação.',
    ref: 'OFICINA ESPECIALIZADA',
  },
];

