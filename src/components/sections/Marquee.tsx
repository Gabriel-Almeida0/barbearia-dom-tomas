import { secoes } from '@/content/secoes'

/**
 * Faixa rolante mostarda (T031). O trilho tem duas metades idênticas e anda -50% (animate-marquee),
 * então o loop não tem emenda. Só a primeira lista é lida por leitor de tela; as cópias são
 * `aria-hidden`. Com prefers-reduced-motion a animação é desligada em globals.css e a faixa fica parada.
 * Cada metade repete os itens 2× para cobrir telas largas (≥ 1440px) sem buraco.
 */
export default function Marquee() {
  return (
    <div
      role="presentation"
      data-fundo="mostarda"
      className="flex h-[51px] items-center overflow-hidden border-y border-mostarda-escuro bg-mostarda"
    >
      <div className="flex w-max animate-marquee">
        <Lista />
        <Lista oculta />
        <Lista oculta />
        <Lista oculta />
      </div>
    </div>
  )
}

function Lista({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul
      aria-hidden={oculta ? 'true' : undefined}
      className="flex shrink-0 items-center font-head text-[.92rem] font-semibold uppercase leading-none tracking-[.12em] text-noite"
    >
      {secoes.marquee.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden="true" className="px-6 text-[.8em] text-noite/70 sm:px-7">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )
}
