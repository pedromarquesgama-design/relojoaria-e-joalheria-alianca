export type ProductStatus = 'DISPONIVEL' | 'SOB_ENCOMENDA';

export interface ProductSpecification {
  material: string;
  acabamento: string;
  largura?: string;
  pedraCentral?: string;
  quilates?: string;
  calibre?: string;
  caixa?: string;
  lentes?: string;
  gravacao: string;
  garantia: string;
}

export interface Product {
  id: string;
  category: string;
  categoryTag: string;
  title: string;
  ref: string;
  price: string;
  rawPrice: number;
  status: ProductStatus;
  statusText: string;
  imageType: 'aliancas-18k' | 'cronografo-gold' | 'solitario-diamante' | 'corrente-grumet' | 'oculos-titanium' | 'anel-aparador';
  shortDescription: string;
  specs: ProductSpecification;
  history: string;
  inStock: boolean;
}

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageType: 'relogios' | 'joias' | 'aliancas' | 'oculos' | 'oficina';
  itemCount: number;
  video?: string;
  poster?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  ringSize?: string;
  engravingText?: string;
}
