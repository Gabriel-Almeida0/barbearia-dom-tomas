import manifesto from '../../scripts/manifesto-imagens.json'
import type { Imagem, ImagemId, Proporcao } from './types'

/**
 * Imagens do manifesto (scripts/manifesto-imagens.json é a fonte única de caminho/dimensão).
 * Aqui só acrescentamos `alt` em pt-BR. Trocar o arquivo em public/images/ não exige código.
 *
 * Uso: <Image src={img.src} width={img.largura} height={img.altura} alt={img.alt} sizes=… />
 * ou   <div style={{ aspectRatio: img.aspectRatio }} className="relative"><Image fill … /></div>
 */
const alts: Record<ImagemId, string> = {
  hero: 'Barbeiro fazendo o acabamento da barba de um cliente com navalha, sob luz lateral quente',
  sobre: 'Interior da Dom Tomás Barbearia com cadeiras clássicas, espelhos e detalhes em madeira',
  mapa: 'Mapa ilustrado da Savassi, em Belo Horizonte, com um pino mostarda marcando a barbearia',
  og: 'Dom Tomás Barbearia — tradição na navalha, estilo no espelho',
  'galeria-01': 'Nuca de cliente com degradê navalhado bem marcado',
  'galeria-02': 'Close de barba sendo feita na navalha com toalha quente',
  'galeria-03': 'Cliente de perfil com corte social clássico penteado de lado',
  'galeria-04': 'Bancada com navalha, tesoura, pente e pincel de barbear',
  'galeria-05': 'Cadeira de barbeiro vintage sob luz âmbar no salão',
  'galeria-06': 'Barbeiro fazendo o contorno do pezinho com máquina',
  'barbeiro-tomas': 'Retrato de Tomás Andrade, fundador, de barba grisalha e avental de couro',
  'barbeiro-rafael': 'Retrato de Rafael Couto, barbeiro jovem com degradê e camiseta preta',
  'barbeiro-diego': 'Retrato de Diego Lanza, barbeiro de barba cheia e braços cruzados',
  'barbeiro-caio': 'Retrato de Caio Mendes, barbeiro sorridente de cabelo cacheado curto',
}

type ItemManifesto = {
  id: ImagemId
  arquivo: string
  largura: number
  altura: number
  proporcao: Proporcao
  uso: string
}

export const imagens = Object.fromEntries(
  (manifesto as ItemManifesto[]).map((item) => [
    item.id,
    {
      id: item.id,
      src: `/images/${item.arquivo.replace(/\.jpg$/, '')}.jpg`,
      largura: item.largura,
      altura: item.altura,
      proporcao: item.proporcao,
      aspectRatio: `${item.largura} / ${item.altura}`,
      uso: item.uso,
      alt: alts[item.id],
    } satisfies Imagem,
  ]),
) as Record<ImagemId, Imagem>

/** `sizes` recomendados por uso (research R2). */
export const sizes = {
  hero: '(max-width: 979px) 72vw, 480px',
  sobre: '(max-width: 979px) 100vw, 560px',
  galeria: '(max-width: 979px) 50vw, 380px',
  barbeiro: '(max-width: 979px) 50vw, 280px',
  mapa: '(max-width: 979px) 100vw, 560px',
} as const
