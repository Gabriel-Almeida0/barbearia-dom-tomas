/**
 * Tipos do conteúdo estático da landing (data-model.md).
 * Todo texto de negócio mora em src/content/*; seções só leem daqui.
 */

/** Linha de horário de funcionamento. `fechado: true` dispensa abre/fecha. */
export type Horario = {
  dias: string
  abre?: string // 'HH:MM'
  fecha?: string // 'HH:MM'
  fechado?: boolean
  /** Dias no formato schema.org (JSON-LD). Vazio quando fechado. */
  schemaDias: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[]
}

export type LinkNavegacao = { rotulo: string; href: `#${string}` }

export type Site = {
  nome: 'Dom Tomás Barbearia'
  nomeCurto: 'Dom Tomás'
  slogan: string
  descricao: string // meta description
  desde: 2014
  cidade: 'Belo Horizonte'
  uf: 'MG'
  endereco: {
    rua: string
    bairro: string
    cep: string
    /** Linha única pronta para exibir: "Rua do Ofício, 214 — Savassi, Belo Horizonte/MG" */
    completo: string
    mapsUrl: string
    geo: { lat: number; lng: number } // aproximado da Savassi (JSON-LD)
  }
  telefone: { exibicao: '(31) 99555-0142'; e164: '+5531995550142'; href: `tel:${string}` }
  whatsapp: { numero: '5531995550142'; mensagemPadrao: string }
  instagram: { usuario: '@domtomas.barbearia'; url: string }
  email: { endereco: string; href: `mailto:${string}` }
  horarios: Horario[]
  avaliacao: { nota: 4.9; texto: string }
  urlBase: 'https://domtomas.vercel.app'
  navegacao: LinkNavegacao[] // Serviços, A Barbearia, Galeria, Equipe, Contato
  aviso: string // "Projeto fictício de portfólio…"
}

export type IconeServico =
  | 'tesoura'
  | 'navalha'
  | 'combo'
  | 'degrade'
  | 'acabamento'
  | 'sobrancelha'
  | 'hidratacao'
  | 'infantil'

export type Servico = {
  /** slug único, ex.: 'corte-classico' */
  id: string
  nome: string
  /** ≤ 90 caracteres */
  descricao: string
  /** minutos, > 0 */
  duracaoMin: number
  /** reais, inteiro > 0 */
  preco: number
  icone: IconeServico
}

export type ImagemId =
  | 'hero'
  | 'sobre'
  | 'mapa'
  | 'og'
  | 'galeria-01'
  | 'galeria-02'
  | 'galeria-03'
  | 'galeria-04'
  | 'galeria-05'
  | 'galeria-06'
  | 'barbeiro-tomas'
  | 'barbeiro-rafael'
  | 'barbeiro-diego'
  | 'barbeiro-caio'

export type Barbeiro = {
  /** 'tomas' → imagem 'barbeiro-tomas' */
  id: string
  nome: string
  cargo: string // 'Fundador e mestre barbeiro' | 'Barbeiro'
  especialidade: string
  imagem: ImagemId
  /** exatamente 1 barbeiro com true (o primeiro da lista) */
  fundador?: boolean
}

export type Depoimento = { autor: string; texto: string; nota: 1 | 2 | 3 | 4 | 5 }

export type IconeFeature = 'navalha' | 'relogio' | 'produto' | 'cafe'

export type Feature = { titulo: string; texto: string; icone: IconeFeature }

export type ItemGaleria = { imagem: ImagemId; legenda: string }

export type Proporcao = '4:5' | '4:3' | '3:4' | '1.91:1'

export type Imagem = {
  id: ImagemId
  src: `/images/${string}.jpg`
  largura: number
  altura: number
  proporcao: Proporcao
  /** valor pronto para CSS aspect-ratio, ex.: '4 / 5' */
  aspectRatio: string
  uso: string // onde aparece (documentação)
  alt: string // pt-BR descritivo; '' só se decorativa
}

/** Título em duas cores: `titulo` na cor base, `destaque` na cor de contraste. */
export type TituloDuasCores = { titulo: string; destaque: string }

/** Cabeçalho de seção padrão (eyebrow + título em duas cores + subtítulo opcional). */
export type CabecalhoSecao = TituloDuasCores & { eyebrow: string; subtitulo?: string }

/** Badge preto estilo loja (duas linhas). */
export type Badge = { linha1: string; linha2: string }
