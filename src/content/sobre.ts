import type { Feature } from './types'

export const sobre: {
  eyebrow: string
  titulo: string
  destaque: string
  paragrafos: [string, string]
  cta: string
  features: [Feature, Feature, Feature, Feature]
} = {
  eyebrow: 'A barbearia',
  titulo: 'Desde 2014 no',
  destaque: 'coração da Savassi',
  paragrafos: [
    'O Tomás abriu a casa em 2014 com duas cadeiras, uma navalha herdada do avô e a teimosia de fazer barbearia do jeito antigo: sem pressa, com conversa boa e toalha quente.',
    'Hoje são quatro barbeiros e o mesmo cuidado de sempre. Cada cliente tem hora marcada, café passado na hora e um acabamento que só sai da cadeira quando está do jeito certo.',
  ],
  cta: 'Agendar horário',
  features: [
    {
      titulo: 'Navalha e toalha quente',
      texto: 'Barba feita no ritual clássico, com vapor e balm no final.',
      icone: 'navalha',
    },
    {
      titulo: 'Horário respeitado',
      texto: 'Hora marcada é hora cumprida. Sem fila, sem espera.',
      icone: 'relogio',
    },
    {
      titulo: 'Produtos de primeira',
      texto: 'Pomadas, óleos e balms selecionados para cada tipo de fio.',
      icone: 'produto',
    },
    {
      titulo: 'Café e boa conversa',
      texto: 'Um cafezinho coado na hora enquanto você espera a sua vez.',
      icone: 'cafe',
    },
  ],
}

/** Frase da missão: `antes` + <strong>`destaque`</strong> + `depois`. */
export const missao = {
  eyebrow: 'Nossa missão',
  antes: 'Aqui ninguém é só mais um na cadeira. A gente cuida do seu visual com ',
  destaque: 'o tempo e o capricho de barbearia de antigamente',
  depois: '.',
  autor: 'Tomás Andrade, fundador',
}
