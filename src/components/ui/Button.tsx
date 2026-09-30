import type { MouseEventHandler, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { linkExterno } from '@/lib/whatsapp'
import { IconeInstagram, IconeWhatsApp } from './icons'

/**
 * Botões da marca. Sempre renderizam <a> (tudo na landing é link: âncora, WhatsApp, mapa).
 * Sem "use client": funciona em Server Components e também dentro de Client Components
 * (ex.: MobileMenu passa `onClick` para fechar o painel).
 */

export type VarianteBotao = 'primario' | 'escuro' | 'ghost' | 'whatsapp'
export type IconeBotao = 'seta' | 'whatsapp' | 'instagram'

type ButtonProps = {
  href: string
  variante: VarianteBotao
  /** md (default): padding .85rem 1.6rem · lg: 1.05rem 2.1rem */
  tamanho?: 'md' | 'lg'
  /** true → target=_blank rel=noopener noreferrer (todo link de WhatsApp/Instagram/mapa) */
  externo?: boolean
  /** 'seta' vai à direita do texto e anda 3px no hover; 'whatsapp'/'instagram' vão à esquerda. */
  icone?: IconeBotao
  /** width 100% abaixo de 560px (sm) */
  larguraTotalMobile?: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  children: ReactNode
  'aria-label'?: string
}

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full texto-botao whitespace-nowrap ' +
  'transition-[translate,background-color,color,border-color,box-shadow] duration-300 ease-marca ' +
  'hover:-translate-y-0.5 focus-visible:-translate-y-0.5'

const variantes: Record<VarianteBotao, string> = {
  // Texto --noite sobre mostarda (5,2:1). Nunca branco/grafite em rótulo sobre mostarda.
  primario: 'bg-mostarda text-noite shadow-mostarda hover:bg-mostarda-claro',
  // Para fundos mostarda/claros. Texto mostarda-claro sobre noite.
  escuro: 'bg-noite text-mostarda-claro hover:bg-noite-2 hover:shadow-marca',
  // Só sobre fundo escuro (hero, contato, menu).
  ghost: 'border border-white/28 text-texto-escuro hover:border-mostarda hover:text-mostarda',
  // Branco sobre --whatsapp-hover (#17843F ≈ 4,8:1). O verde --whatsapp (3,5:1) só serve para ícone.
  whatsapp: 'bg-whatsapp-hover text-papel hover:brightness-90',
}

const tamanhos = {
  md: 'px-[1.6rem] py-[.85rem]',
  lg: 'px-[2.1rem] py-[1.05rem]',
} as const

function Icone({ icone }: { icone: IconeBotao }) {
  if (icone === 'seta')
    return (
      <ArrowRight
        aria-hidden="true"
        className="size-[1.1em] transition-[translate] duration-300 ease-marca group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]"
        strokeWidth={2.4}
      />
    )
  if (icone === 'whatsapp') return <IconeWhatsApp className="size-[1.25em]" />
  return <IconeInstagram className="size-[1.2em]" />
}

export function Button({
  href,
  variante,
  tamanho = 'md',
  externo = false,
  icone,
  larguraTotalMobile = false,
  className = '',
  onClick,
  children,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = [
    base,
    variantes[variante],
    tamanhos[tamanho],
    larguraTotalMobile ? 'w-full sm:w-auto' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={classes} onClick={onClick} aria-label={ariaLabel} {...(externo ? linkExterno : {})}>
      {icone && icone !== 'seta' ? <Icone icone={icone} /> : null}
      <span>{children}</span>
      {icone === 'seta' ? <Icone icone="seta" /> : null}
    </a>
  )
}

type BotaoLojaProps = {
  href: string
  icone: 'whatsapp' | 'instagram'
  /** linha pequena (10px): "Chamar no" */
  linha1: string
  /** linha grande (17px semibold): "WhatsApp" */
  linha2: string
  className?: string
}

/**
 * Badge preto estilo "loja de apps" (faixa WhatsApp). bg-loja, raio 10px, altura 52px,
 * ícone 26px + duas linhas. Sempre externo. Nome acessível = "linha1 linha2".
 */
export function BotaoLoja({ href, icone, linha1, linha2, className = '' }: BotaoLojaProps) {
  return (
    <a
      href={href}
      {...linkExterno}
      className={
        'inline-flex h-[52px] shrink-0 items-center gap-3 rounded-card-sm bg-loja pl-3.5 pr-5 text-papel ' +
        'transition-[translate,box-shadow] duration-300 ease-marca hover:-translate-y-0.5 hover:shadow-marca ' +
        className
      }
    >
      {icone === 'whatsapp' ? (
        <IconeWhatsApp className="size-[26px] shrink-0" />
      ) : (
        <IconeInstagram className="size-[26px] shrink-0" />
      )}
      <span className="flex flex-col text-left font-body">
        <span className="text-[10px] leading-[1.1] tracking-[.02em]">{linha1}</span>
        <span className="text-[17px] font-semibold leading-[1.15]">{linha2}</span>
      </span>
    </a>
  )
}
