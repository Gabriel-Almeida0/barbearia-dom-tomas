type Tom = 'claro' | 'escuro' | 'mostarda'

type SectionHeadingProps = {
  /** Texto acima do título; o "✦" é acrescentado aqui (decorativo). */
  eyebrow: string
  /** Parte base do título. */
  titulo: string
  /** Palavra(s) em cor de contraste, anexada(s) ao fim do título. */
  destaque?: string
  /** true → destaque em linha própria (ex.: "AGENDE PELO WHATSAPP / DOM TOMÁS"). */
  destaqueEmLinha?: boolean
  subtitulo?: string
  /** default 'h2'. Só o Hero usa 'h1'. */
  nivel?: 'h1' | 'h2'
  /** default 'secao' (titulo-secao). 'display-l'/'display-xl' ganham text-stroke. */
  tamanho?: 'secao' | 'display-l' | 'display-xl'
  /**
   * Fundo onde o título está:
   * - claro:    eyebrow mostarda-texto · base grafite · destaque mostarda-texto · sub muted
   * - escuro:   eyebrow mostarda · base texto-escuro · destaque mostarda · sub muted-escuro
   * - mostarda: eyebrow noite · base branca (papel) · destaque grafite · sub noite
   */
  tom: Tom
  /** default 'centro' (max 640px, centralizado). */
  alinhamento?: 'centro' | 'esquerda'
  /** Eyebrow só para leitor de tela (quando destoar do visual, ex.: faixa WhatsApp). */
  eyebrowOculto?: boolean
  /** default true: margem inferior clamp(2.2rem,5vw,3.4rem). */
  comMargem?: boolean
  /** id do heading, para aria-labelledby da seção. */
  id?: string
  className?: string
}

const cores: Record<Tom, { eyebrow: string; base: string; destaque: string; sub: string }> = {
  claro: { eyebrow: 'text-mostarda-texto', base: 'text-grafite', destaque: 'text-mostarda-texto', sub: 'text-muted' },
  escuro: { eyebrow: 'text-mostarda', base: 'text-texto-escuro', destaque: 'text-mostarda', sub: 'text-muted-escuro' },
  mostarda: { eyebrow: 'text-noite', base: 'text-papel', destaque: 'text-grafite', sub: 'text-noite' },
}

const tamanhos = {
  secao: 'titulo-secao',
  'display-l': 'display-l text-stroke',
  'display-xl': 'display-xl text-stroke',
} as const

/** Cabeçalho de seção: eyebrow + título em duas cores + subtítulo. Server Component. */
export function SectionHeading({
  eyebrow,
  titulo,
  destaque,
  destaqueEmLinha = false,
  subtitulo,
  nivel = 'h2',
  tamanho = 'secao',
  tom,
  alinhamento = 'centro',
  eyebrowOculto = false,
  comMargem = true,
  id,
  className = '',
}: SectionHeadingProps) {
  const Heading = nivel
  const c = cores[tom]
  const wrapper = [
    alinhamento === 'centro' ? 'mx-auto max-w-[640px] text-center' : 'text-left',
    comMargem ? 'mb-[clamp(2.2rem,5vw,3.4rem)]' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapper}>
      <p className={eyebrowOculto ? 'sr-only' : `eyebrow mb-3 ${c.eyebrow}`}>
        <span aria-hidden="true">✦ </span>
        {eyebrow}
      </p>
      <Heading id={id} className={`${tamanhos[tamanho]} ${c.base} text-balance`}>
        {titulo}
        {destaque ? (
          <>
            {destaqueEmLinha ? null : ' '}
            <span className={`${c.destaque} ${destaqueEmLinha ? 'block' : ''}`.trim()}>{destaque}</span>
          </>
        ) : null}
      </Heading>
      {subtitulo ? (
        <p className={`texto mt-4 max-w-[640px] ${c.sub} ${alinhamento === 'centro' ? 'mx-auto' : ''}`.trim()}>
          {subtitulo}
        </p>
      ) : null}
    </div>
  )
}
