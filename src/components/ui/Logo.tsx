type LogoProps = {
  /** Diâmetro do monograma em px (default 42 — header). */
  tamanho?: number
  /** Mostra "Dom Tomás / Barbearia" ao lado do monograma (rodapé). */
  comNome?: boolean
  /**
   * Cor do logo (não do fundo): 'claro' = para fundo escuro (anel mostarda, letras creme; default);
   * 'escuro' = para fundo claro/mostarda (tudo em --noite).
   */
  tom?: 'claro' | 'escuro'
  className?: string
}

/**
 * Monograma "DT" circular, desenhado do zero em SVG (anel duplo, D e T em traço condensado,
 * "BARBEARIA · 2014" em arco a partir de 56px). `role="img"` com nome acessível da marca.
 * Quando usado dentro de um link, o link herda o nome: <a href="#inicio"><Logo /></a>.
 */
export function Logo({ tamanho = 42, comNome = false, tom = 'claro', className = '' }: LogoProps) {
  const anel = tom === 'claro' ? 'text-mostarda' : 'text-noite'
  const letras = tom === 'claro' ? 'text-texto-escuro' : 'text-noite'
  const comArco = tamanho >= 56

  const monograma = (
    <svg
      viewBox="0 0 100 100"
      width={tamanho}
      height={tamanho}
      role={comNome ? undefined : 'img'}
      aria-label={comNome ? undefined : 'Dom Tomás Barbearia'}
      aria-hidden={comNome ? true : undefined}
      className="shrink-0"
    >
      <defs>
        <path id="dt-arco" d="M 18 50 A 32 32 0 0 1 82 50" />
      </defs>
      <g className={anel} fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="47" strokeWidth="3" />
        <circle cx="50" cy="50" r="41.5" strokeWidth="1.2" />
      </g>
      <g
        className={letras}
        fill="none"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* D */}
        <path d="M27 33 H37 Q48 33 48 44 V56 Q48 67 37 67 H27 Z" />
        {/* T */}
        <path d="M54 33 H75 M64.5 33 V67" />
      </g>
      {comArco ? (
        <text
          className={anel}
          fill="currentColor"
          fontSize="7.2"
          fontWeight="600"
          letterSpacing="1.6"
          style={{ fontFamily: 'var(--font-head)' }}
        >
          <textPath href="#dt-arco" startOffset="50%" textAnchor="middle">
            BARBEARIA · 2014
          </textPath>
        </text>
      ) : null}
      {/* estrelas laterais */}
      <g className={anel} fill="currentColor">
        <path d="M50 76 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 Z" />
      </g>
    </svg>
  )

  if (!comNome) return <span className={`inline-flex ${className}`.trim()}>{monograma}</span>

  return (
    <span
      role="img"
      aria-label="Dom Tomás Barbearia"
      className={`inline-flex items-center gap-3 ${className}`.trim()}
    >
      {monograma}
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span className={`font-display text-[1.6rem] font-bold uppercase leading-[.85] ${tom === 'claro' ? 'text-texto-escuro' : 'text-noite'}`}>
          Dom Tomás
        </span>
        <span className={`eyebrow text-[.64rem] ${tom === 'claro' ? 'text-mostarda' : 'text-noite'}`}>Barbearia</span>
      </span>
    </span>
  )
}
