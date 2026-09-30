'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type TagReveal = 'div' | 'li' | 'article' | 'section' | 'figure' | 'span' | 'ul' | 'blockquote'

type RevealProps = {
  /** Elemento raiz (default 'div'). Use 'li' para itens de <ul>. */
  as?: TagReveal
  /** 'cima' (default): sobe 26px · 'direita': entra da direita 40px (celulares da faixa). */
  direcao?: 'cima' | 'direita'
  /** Escalonamento: atraso × 90ms. */
  atraso?: 0 | 1 | 2 | 3
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Animação de entrada ao rolar (research R5). Só esconde com <html class="js">; sem JS tudo fica
 * visível. Com prefers-reduced-motion aparece direto. Revela uma vez e desconecta.
 * Não usar no Hero (LCP).
 */
export function Reveal({ as = 'div', direcao = 'cima', atraso = 0, className = '', style, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzido || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Tipagem polimórfica simplificada: o ref é o mesmo HTMLElement em todas as tags suportadas.
  const Tag = as as 'div'
  const classe = `${direcao === 'direita' ? 'reveal-direita' : 'reveal'} ${className}`.trim()

  return (
    <Tag
      ref={ref}
      className={classe}
      style={atraso ? { transitionDelay: `${atraso * 90}ms`, ...style } : style}
    >
      {children}
    </Tag>
  )
}
