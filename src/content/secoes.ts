import type { Badge, CabecalhoSecao } from './types'

/**
 * Textos de seção (data-model.md → "Textos de seção").
 * Títulos em duas cores: `titulo` (cor base) + `destaque` (cor de contraste), para SectionHeading.
 */
export const secoes = {
  hero: {
    eyebrow: 'Barbearia · Belo Horizonte · Desde 2014',
    linha1: 'Tradição na navalha,',
    linha2: 'estilo no espelho.', // em mostarda
    lead: 'Corte, barba e cuidado masculino com calma, toalha quente e acabamento de mestre. Na cadeira da Dom Tomás, o detalhe é o serviço.',
    cta1: 'Agendar horário',
    cta2: 'WhatsApp',
    /** Linha de confiança, já separada em itens (o ★ é decorativo, renderizado pela seção). */
    confianca: ['4,9 avaliação dos clientes', '+10 anos de navalha'],
    rolar: 'Role',
  },

  /** Itens da faixa rolante, separados por "✦" na renderização. */
  marquee: ['Corte', 'Barba', 'Degradê', 'Navalha', 'Sobrancelha', 'Hidratação', 'Toalha quente'],

  servicosHead: {
    eyebrow: 'O que fazemos',
    titulo: 'Nossos',
    destaque: 'serviços',
    subtitulo: 'Do corte clássico à barba na navalha, com hora marcada e preço na mesa.',
  } satisfies CabecalhoSecao,
  servicos: {
    nota: 'Pagamento em Pix, cartão ou dinheiro. Chegue 5 minutos antes.',
    cta: 'Ver horários no WhatsApp',
    agendarEste: 'Agendar este',
  },

  galeriaHead: {
    eyebrow: 'Na cadeira',
    titulo: 'Nosso',
    destaque: 'trabalho',
  } satisfies CabecalhoSecao,
  galeria: {
    /** "Siga @domtomas.barbearia no Instagram" — o @ vem de site.instagram.usuario. */
    rodapeAntes: 'Siga',
    rodapeDepois: 'no Instagram',
  },

  faixaWhatsApp: {
    eyebrow: 'Agendamento',
    titulo: 'Agende pelo WhatsApp',
    destaque: 'Dom Tomás',
    texto:
      'Escolha o serviço, o barbeiro e o horário numa conversa rápida. A gente confirma na hora e te lembra no dia. Sem app, sem cadastro, sem fila.',
    badgeWhatsApp: { linha1: 'Chamar no', linha2: 'WhatsApp' } satisfies Badge,
    badgeInstagram: { linha1: 'Siga no', linha2: 'Instagram' } satisfies Badge,
  },

  equipeHead: {
    eyebrow: 'Quem cuida de você',
    titulo: 'Nossa',
    destaque: 'equipe',
    subtitulo: 'Quatro barbeiros, a mesma escola: navalha firme, conversa boa e hora marcada. Escolha com quem sentar.',
  } satisfies CabecalhoSecao,

  depoimentosHead: {
    eyebrow: 'Quem senta, volta',
    titulo: 'O que dizem os',
    destaque: 'clientes',
  } satisfies CabecalhoSecao,

  faixaCta: {
    eyebrow: 'Hora de renovar',
    titulo: 'Bora dar um tapa no',
    destaque: 'visual?',
    texto: 'Seu horário está a uma mensagem de distância.',
    cta: 'Agendar pelo WhatsApp',
  } satisfies CabecalhoSecao & { texto: string; cta: string },

  contatoHead: {
    eyebrow: 'Venha nos ver',
    titulo: 'Onde',
    destaque: 'estamos',
  } satisfies CabecalhoSecao,
  contato: {
    rotulos: {
      endereco: 'Endereço',
      horario: 'Horário',
      telefone: 'Telefone e WhatsApp',
      instagram: 'Instagram',
      email: 'E-mail',
    },
    cta: 'Agendar pelo WhatsApp',
    mapa: 'Abrir no Google Maps',
    mapaAriaLabel: 'Abrir a localização da Dom Tomás no Google Maps (nova aba)',
  },

  footer: {
    navegue: 'Navegue',
    conecteSe: 'Conecte-se',
    ctaTitulo: 'Bora marcar?',
    ctaTexto: 'Agende em um minuto pelo WhatsApp.',
    cta: 'Agendar horário',
    copyright: (ano: number) => `© ${ano} Dom Tomás Barbearia`,
  },

  /** Rótulos compartilhados por vários CTAs. */
  ctas: {
    agendar: 'Agendar horário',
    agendarWhatsApp: 'Agendar pelo WhatsApp',
    fabAriaLabel: 'Agendar pelo WhatsApp',
  },
} as const

export type Secoes = typeof secoes
