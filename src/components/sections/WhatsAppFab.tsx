import { IconeWhatsApp } from '@/components/ui/icons'
import { secoes } from '@/content/secoes'
import { linkExterno, whatsappUrl } from '@/lib/whatsapp'

/**
 * Botão flutuante do WhatsApp (T049). Fica em z-40, abaixo do header/menu mobile (z-50), então
 * não cobre o CTA de largura total do painel. O anel de pulso para em prefers-reduced-motion
 * (regra global em globals.css para .animate-pulse-wa).
 */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      {...linkExterno}
      aria-label={secoes.ctas.fabAriaLabel}
      className="fixed right-5 bottom-5 z-40 grid size-[58px] place-items-center rounded-full bg-whatsapp text-papel shadow-marca transition-[translate,background-color] duration-300 ease-marca hover:-translate-y-0.5 hover:bg-whatsapp-hover focus-visible:bg-whatsapp-hover"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-pulse-wa rounded-full bg-whatsapp" />
      <IconeWhatsApp className="relative size-7" />
    </a>
  )
}

export default WhatsAppFab
