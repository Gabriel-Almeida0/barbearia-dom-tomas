import type { Site } from './types'

/** Dados fictícios da marca (spec → "Dados fictícios da marca"). Fonte única de contato. */
export const site: Site = {
  nome: 'Dom Tomás Barbearia',
  nomeCurto: 'Dom Tomás',
  slogan: 'Tradição na navalha, estilo no espelho.',
  descricao:
    'Barbearia na Savassi, em Belo Horizonte, desde 2014. Corte, barba na navalha e cuidado masculino com hora marcada pelo WhatsApp.',
  desde: 2014,
  cidade: 'Belo Horizonte',
  uf: 'MG',
  endereco: {
    rua: 'Rua do Ofício, 214',
    bairro: 'Savassi',
    cep: '30140-000',
    completo: 'Rua do Ofício, 214 — Savassi, Belo Horizonte/MG',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Savassi%2C%20Belo%20Horizonte%20-%20MG',
    geo: { lat: -19.9386, lng: -43.9353 },
  },
  telefone: { exibicao: '(31) 99555-0142', e164: '+5531995550142', href: 'tel:+5531995550142' },
  whatsapp: {
    numero: '5531995550142',
    mensagemPadrao: 'Olá! Quero agendar um horário na Dom Tomás.',
  },
  instagram: {
    usuario: '@domtomas.barbearia',
    url: 'https://instagram.com/domtomas.barbearia',
  },
  email: { endereco: 'contato@domtomas.com.br', href: 'mailto:contato@domtomas.com.br' },
  horarios: [
    {
      dias: 'Terça a sexta',
      abre: '09:00',
      fecha: '20:00',
      schemaDias: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    { dias: 'Sábado', abre: '08:00', fecha: '18:00', schemaDias: ['Saturday'] },
    { dias: 'Domingo e segunda', fechado: true, schemaDias: [] },
  ],
  avaliacao: { nota: 4.9, texto: '4,9 de avaliação dos clientes' },
  urlBase: 'https://domtomas.vercel.app',
  navegacao: [
    { rotulo: 'Serviços', href: '#servicos' },
    { rotulo: 'A Barbearia', href: '#sobre' },
    { rotulo: 'Galeria', href: '#galeria' },
    { rotulo: 'Equipe', href: '#equipe' },
    { rotulo: 'Contato', href: '#contato' },
  ],
  aviso: 'Projeto fictício de portfólio. Telefone, endereço e pessoas são inventados.',
}

/** "09:00" → "9h", "08:30" → "8h30". */
export function formatarHora(hhmm: string): string {
  const [h, m] = hhmm.split(':')
  return `${Number(h)}h${m === '00' ? '' : m}`
}

/** Texto pronto de uma linha de horário: "Terça a sexta · 9h–20h" / "Domingo e segunda · Fechado". */
export function formatarHorario(h: Site['horarios'][number]): string {
  if (h.fechado || !h.abre || !h.fecha) return `${h.dias} · Fechado`
  return `${h.dias} · ${formatarHora(h.abre)}–${formatarHora(h.fecha)}`
}
