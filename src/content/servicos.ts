import type { Servico } from './types'

/** 8 serviços, na ordem da spec. Preço em reais (inteiro); use formatarPreco() para exibir. */
export const servicos: Servico[] = [
  {
    id: 'corte-classico',
    nome: 'Corte Clássico',
    descricao: 'Tesoura e máquina, finalizado com pomada e conselho de estilo.',
    duracaoMin: 45,
    preco: 55,
    icone: 'tesoura',
  },
  {
    id: 'barba-na-navalha',
    nome: 'Barba na Navalha',
    descricao: 'Toalha quente, navalha e balm hidratante.',
    duracaoMin: 30,
    preco: 45,
    icone: 'navalha',
  },
  {
    id: 'corte-e-barba',
    nome: 'Corte + Barba',
    descricao: 'O combo completo, com toalha quente e acabamento na régua.',
    duracaoMin: 75,
    preco: 90,
    icone: 'combo',
  },
  {
    id: 'degrade-fade',
    nome: 'Degradê (Fade)',
    descricao: 'Transição limpa do zero ao comprimento, no navalhado ou na máquina.',
    duracaoMin: 50,
    preco: 60,
    icone: 'degrade',
  },
  {
    id: 'pezinho-e-acabamento',
    nome: 'Pezinho e Acabamento',
    descricao: 'Contorno na navalha entre um corte e outro.',
    duracaoMin: 15,
    preco: 25,
    icone: 'acabamento',
  },
  {
    id: 'sobrancelha',
    nome: 'Sobrancelha',
    descricao: 'Alinhamento discreto na navalha ou pinça.',
    duracaoMin: 15,
    preco: 20,
    icone: 'sobrancelha',
  },
  {
    id: 'hidratacao-capilar-e-de-barba',
    nome: 'Hidratação Capilar e de Barba',
    descricao: 'Máscara, vapor e massagem no couro cabeludo.',
    duracaoMin: 30,
    preco: 40,
    icone: 'hidratacao',
  },
  {
    id: 'corte-infantil',
    nome: 'Corte Infantil',
    descricao: 'Até 10 anos, com paciência e cadeira de pirata.',
    duracaoMin: 40,
    preco: 45,
    icone: 'infantil',
  },
]

/** 55 → "R$ 55" */
export const formatarPreco = (preco: number) => `R$ ${preco}`

/** 45 → "45 min"; 75 → "75 min" */
export const formatarDuracao = (min: number) => `${min} min`

/** Faixa de preço para JSON-LD: "R$ 20–90". */
export function faixaDePreco(lista: Servico[] = servicos): string {
  const precos = lista.map((s) => s.preco)
  return `R$ ${Math.min(...precos)}–${Math.max(...precos)}`
}
