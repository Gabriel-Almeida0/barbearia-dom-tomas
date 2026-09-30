import type { Barbeiro } from './types'

/** 4 barbeiros; o fundador vem primeiro e é o único com `fundador: true`. */
export const equipe: Barbeiro[] = [
  {
    id: 'tomas',
    nome: 'Tomás Andrade',
    cargo: 'Fundador e mestre barbeiro',
    especialidade: 'Navalha, barba e corte clássico',
    imagem: 'barbeiro-tomas',
    fundador: true,
  },
  {
    id: 'rafael',
    nome: 'Rafael Couto',
    cargo: 'Barbeiro',
    especialidade: 'Especialista em degradê',
    imagem: 'barbeiro-rafael',
  },
  {
    id: 'diego',
    nome: 'Diego Lanza',
    cargo: 'Barbeiro',
    especialidade: 'Barba e navalha',
    imagem: 'barbeiro-diego',
  },
  {
    id: 'caio',
    nome: 'Caio Mendes',
    cargo: 'Barbeiro',
    especialidade: 'Cortes clássicos e infantil',
    imagem: 'barbeiro-caio',
  },
]

/** Rótulo do selo do fundador. */
export const seloFundador = '★ Fundador'
