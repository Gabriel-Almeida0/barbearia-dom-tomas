'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { secoes } from '@/content/secoes'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'
import MobileMenu from './MobileMenu'

/**
 * Header sticky (77px). Transparente sobre o hero; depois de ~100px de rolagem ganha fundo
 * noite translúcido + blur + linha inferior (`data-stuck`). A detecção usa um sentinela de 1px
 * posicionado no documento (top:100px) e um IntersectionObserver — sem listener de scroll.
 * Abaixo de lg (980px) nav e CTA somem e entra o MobileMenu.
 */
export default function Header() {
  const sentinelaRef = useRef<HTMLSpanElement>(null)
  const [preso, setPreso] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    const sentinela = sentinelaRef.current
    if (!sentinela || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entrada]) => setPreso(!entrada.isIntersecting))
    observer.observe(sentinela)
    return () => observer.disconnect()
  }, [])

  const escuro = preso || menuAberto

  return (
    <>
      <span
        ref={sentinelaRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-[100px] left-0 h-px w-px"
      />
      <header
        data-stuck={preso ? '' : undefined}
        data-menu-aberto={menuAberto ? '' : undefined}
        className={
          'sticky top-0 z-50 h-[77px] border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-marca ' +
          (escuro
            ? 'border-linha-escura bg-[rgba(26,22,20,.86)] backdrop-blur-md'
            : 'border-transparent bg-transparent')
        }
      >
        <div className="container-site flex h-full items-center justify-between gap-6">
          <a
            href="#inicio"
            className="-m-1 inline-flex shrink-0 rounded-full p-1"
            aria-label={`${site.nome} — início`}
          >
            <Logo tamanho={42} />
          </a>

          <div className="hidden items-center gap-[2.4rem] lg:flex">
            <nav aria-label="Principal">
              <ul className="flex items-center gap-[1.9rem]">
                {site.navegacao.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={
                        'nav-link relative inline-block py-2 text-texto-escuro transition-colors duration-300 ease-marca hover:text-mostarda-claro ' +
                        "after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-mostarda after:content-[''] " +
                        'after:transition-[width] after:duration-300 after:ease-marca hover:after:w-full focus-visible:after:w-full'
                      }
                    >
                      {item.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Button href={whatsappUrl()} variante="primario" externo>
              {secoes.ctas.agendar}
            </Button>
          </div>

          <MobileMenu onChange={setMenuAberto} />
        </div>
      </header>
    </>
  )
}
