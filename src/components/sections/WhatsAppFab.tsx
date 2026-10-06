'use client'

import { useEffect, useRef } from 'react'
import { IconeWhatsApp } from '@/components/ui/icons'
import { secoes } from '@/content/secoes'
import { linkExterno, whatsappUrl } from '@/lib/whatsapp'

/**
 * Botão flutuante do WhatsApp (T049). Fica em z-40, abaixo do header/menu mobile (z-50), então
 * não cobre o CTA de largura total do painel. O anel de pulso para em prefers-reduced-motion
 * (regra global em globals.css para .animate-pulse-wa).
 *
 * Só aparece depois do hero (auditoria DOM-09): no celular ele cobria o texto e o botão do
 * WhatsApp do próprio hero, que já tem os dois CTAs. Sem JS (sem `html.js`), fica sempre visível.
 */
export function WhatsAppFab() {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const fab = ref.current
    const hero = document.getElementById('inicio')
    if (!fab || !hero || !('IntersectionObserver' in window)) {
      fab?.setAttribute('data-visivel', '')
      return
    }
    const observador = new IntersectionObserver(([entrada]) => {
      fab.toggleAttribute('data-visivel', !entrada.isIntersecting)
    })
    observador.observe(hero)
    return () => observador.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href={whatsappUrl()}
      {...linkExterno}
      aria-label={secoes.ctas.fabAriaLabel}
      className="fab-wa fixed right-5 bottom-5 z-40 grid size-[58px] place-items-center rounded-full bg-whatsapp text-papel shadow-marca transition-[translate,background-color,opacity] duration-300 ease-marca hover:-translate-y-0.5 hover:bg-whatsapp-hover focus-visible:bg-whatsapp-hover"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-pulse-wa rounded-full bg-whatsapp" />
      <IconeWhatsApp className="relative size-7" />
    </a>
  )
}

export default WhatsAppFab
