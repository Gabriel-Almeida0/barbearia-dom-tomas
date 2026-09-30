import type { ReactNode } from 'react'

type ContainerProps = {
  /** Elemento raiz (default 'div'). */
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav'
  /** max 880px (missão) em vez de 1180px. */
  estreito?: boolean
  className?: string
  children: ReactNode
}

/** Largura do site: min(100% - 2.5rem, 1180px), centralizado. `estreito` → 880px. */
export function Container({ as: Tag = 'div', estreito = false, className = '', children }: ContainerProps) {
  return <Tag className={`${estreito ? 'container-estreito' : 'container-site'} ${className}`.trim()}>{children}</Tag>
}
