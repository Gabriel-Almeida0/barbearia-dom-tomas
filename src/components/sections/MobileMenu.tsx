'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { secoes } from '@/content/secoes'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'

type MobileMenuProps = {
  /** Avisa o Header (fundo escuro enquanto o painel está aberto). */
  onChange?: (aberto: boolean) => void
}

const SELETOR_FOCAVEL = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Menu mobile (< 980px). Botão hamburguer 44×44 (3 barras 26×2 que viram X) + painel
 * `role="dialog"` fixo abaixo do header. Acessibilidade (research R7 / US5 cenário 2):
 * foco no primeiro link ao abrir, Tab preso (botão + painel), Esc fecha e devolve o foco,
 * body sem rolagem enquanto aberto, fecha ao clicar num link e ao passar de 980px.
 */
export default function MobileMenu({ onChange }: MobileMenuProps) {
  const [aberto, setAberto] = useState(false)
  const botaoRef = useRef<HTMLButtonElement>(null)
  const painelRef = useRef<HTMLDivElement>(null)
  const tituloId = useId()

  const fechar = useCallback((devolverFoco = false) => {
    setAberto(false)
    if (devolverFoco) botaoRef.current?.focus()
  }, [])

  useEffect(() => {
    onChange?.(aberto)
  }, [aberto, onChange])

  // Foco, Tab preso, Esc e trava de rolagem enquanto aberto.
  useEffect(() => {
    if (!aberto) return
    const painel = painelRef.current
    const botao = botaoRef.current
    painel?.querySelector<HTMLElement>(SELETOR_FOCAVEL)?.focus()

    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function aoTeclar(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        fechar(true)
        return
      }
      if (e.key !== 'Tab' || !painel || !botao) return
      const focaveis = [botao, ...painel.querySelectorAll<HTMLElement>(SELETOR_FOCAVEL)]
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]
      const atual = document.activeElement as HTMLElement | null
      const dentro = atual ? focaveis.includes(atual) : false
      if (e.shiftKey && (atual === primeiro || !dentro)) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && (atual === ultimo || !dentro)) {
        e.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = overflowAnterior
    }
  }, [aberto, fechar])

  // Fecha ao passar para o layout desktop (≥ 980px).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 61.25rem)')
    function aoMudar(e: MediaQueryListEvent) {
      if (e.matches) setAberto(false)
    }
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  const barra =
    'absolute left-[9px] h-0.5 w-[26px] rounded-full bg-texto-escuro transition-[translate,rotate,opacity] duration-300 ease-marca'

  return (
    <div className="lg:hidden">
      <button
        ref={botaoRef}
        type="button"
        aria-expanded={aberto}
        aria-controls="menu-mobile"
        aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setAberto((v) => !v)}
        className="relative -mr-2 block size-11 rounded-full"
      >
        <span aria-hidden="true" className={`${barra} top-[14px] ${aberto ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span aria-hidden="true" className={`${barra} top-[21px] ${aberto ? 'opacity-0' : ''}`} />
        <span aria-hidden="true" className={`${barra} top-[28px] ${aberto ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>

      {/* Véu: toca fora do painel para fechar. */}
      <div
        aria-hidden="true"
        onClick={() => fechar()}
        className={
          'fixed inset-x-0 top-[77px] h-[100dvh] bg-noite/55 transition-opacity duration-300 ease-marca ' +
          (aberto ? 'opacity-100' : 'pointer-events-none opacity-0')
        }
      />

      <div
        ref={painelRef}
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        inert={!aberto}
        className={
          'fixed inset-x-0 top-[77px] max-h-[calc(100dvh-77px)] overflow-y-auto overscroll-contain border-t border-linha-escura ' +
          'bg-[rgba(26,22,20,.97)] shadow-marca duration-300 ease-marca ' +
          // Ao abrir a visibilidade muda na hora (o foco precisa do painel visível);
          // ao fechar ela entra na transição para o painel sumir só depois do fade.
          (aberto
            ? 'visible translate-y-0 opacity-100 transition-[opacity,translate]'
            : 'invisible -translate-y-3 opacity-0 transition-[opacity,translate,visibility]')
        }
      >
        <h2 id={tituloId} className="sr-only">
          Menu
        </h2>
        <nav aria-label="Principal (celular)" className="container-site pt-3 pb-8">
          <ul>
            {site.navegacao.map((item) => (
              <li key={item.href} className="border-b border-linha-escura">
                <a
                  href={item.href}
                  onClick={() => fechar()}
                  className="flex items-center justify-between py-[1.05rem] font-display text-[2rem] leading-none font-semibold tracking-[.04em] text-texto-escuro uppercase transition-colors duration-300 ease-marca hover:text-mostarda focus-visible:text-mostarda focus-visible:outline-offset-[-3px]"
                >
                  {item.rotulo}
                  <span aria-hidden="true" className="text-[1.1rem] text-mostarda">
                    ✦
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Button
            href={whatsappUrl()}
            variante="primario"
            tamanho="lg"
            icone="whatsapp"
            externo
            onClick={() => fechar()}
            className="mt-7 w-full"
          >
            {secoes.ctas.agendar}
          </Button>
          <p className="texto-sm mt-5 text-center text-muted-escuro">
            {site.endereco.bairro} · {site.cidade}/{site.uf} · {site.telefone.exibicao}
          </p>
        </nav>
      </div>
    </div>
  )
}
