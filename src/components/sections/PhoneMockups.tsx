import type { ReactNode } from 'react'
import { Logo } from '@/components/ui/Logo'
import { IconeWhatsApp } from '@/components/ui/icons'
import { servicos, formatarPreco } from '@/content/servicos'
import s from './FaixaWhatsApp.module.css'

/**
 * Dois celulares desenhados em HTML/CSS (research R8) — nada de imagem de terceiros.
 * Decorativo: o wrapper é aria-hidden; o texto equivalente está no parágrafo da faixa.
 * Tamanhos internos em cqw (container query) para escalar entre 160px (mobile) e 230px (desktop).
 */

type Balao = { de: 'cliente' | 'loja'; texto: string; hora: string }

const conversa: Balao[] = [
  { de: 'cliente', texto: 'Oi! Tem horário sábado de manhã?', hora: '09:12' },
  { de: 'loja', texto: 'Tem sim! 9h, 10h30 ou 11h. Qual prefere?', hora: '09:13' },
  { de: 'cliente', texto: '10h30, corte + barba 💈', hora: '09:13' },
  { de: 'loja', texto: 'Fechado, Lucas! Te esperamos ✂️', hora: '09:14' },
]

/** Horários de exemplo por serviço; `false` = ocupado (riscado). */
const agenda: Record<string, [string, boolean][]> = {
  'corte-classico': [
    ['9h', false],
    ['10h30', true],
    ['11h', true],
  ],
  'barba-na-navalha': [
    ['9h', true],
    ['9h30', false],
    ['14h', true],
  ],
  'corte-e-barba': [
    ['10h30', true],
    ['13h', false],
    ['15h', true],
  ],
  'degrade-fade': [
    ['8h', false],
    ['11h', true],
    ['16h', true],
  ],
}

function PhoneFrame({ children, statusClaro = false }: { children: ReactNode; statusClaro?: boolean }) {
  return (
    <div className={s.fone}>
      <div className={s.tela}>
        <span className={s.notch} />
        <div className={`${s.status} ${statusClaro ? 'text-papel' : 'text-noite'}`}>
          <span>9:41</span>
          <span className="tracking-[.1em]">●●● ▮</span>
        </div>
        {children}
      </div>
    </div>
  )
}

function TelaConversa() {
  return (
    <PhoneFrame statusClaro>
      {/* status + barra verde formam um bloco só */}
      <div className="-mt-[9cqw] flex flex-col bg-whatsapp pt-[9cqw]">
        <div className="flex items-center gap-[2.6cqw] px-[4cqw] pb-[3.4cqw] pt-[2cqw] text-papel">
          <span className="grid size-[11cqw] shrink-0 place-items-center rounded-full bg-noite [&_svg]:size-[9.4cqw]">
            <Logo tamanho={22} />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-head text-[5cqw] font-semibold">Dom Tomás Barbearia</span>
            <span className="text-[3.8cqw] opacity-90">online</span>
          </span>
        </div>
      </div>
      <div className={s.conversa}>
        <span className="mx-auto rounded-full bg-papel/80 px-[3cqw] py-[.6cqw] text-[3.6cqw] font-semibold uppercase tracking-[.08em] text-muted">
          Hoje
        </span>
        {conversa.map((b, i) => (
          <p key={i} className={`${s.balao} ${b.de === 'cliente' ? s.balaoCliente : s.balaoLoja}`}>
            {b.texto}
            <span className={s.hora}>
              {b.hora}
              {b.de === 'cliente' ? <span className="ml-[1cqw] text-check-wa">✓✓</span> : null}
            </span>
          </p>
        ))}
      </div>
      <div className={s.digitar}>
        <span className={s.campo}>Mensagem</span>
        <span className={s.enviar}>
          <IconeWhatsApp className="size-[6cqw]" />
        </span>
      </div>
    </PhoneFrame>
  )
}

function TelaHorarios() {
  const lista = servicos.slice(0, 4)
  return (
    <PhoneFrame>
      <div className="-mt-[9cqw] bg-mostarda px-[5cqw] pb-[4.5cqw] pt-[12cqw] text-noite">
        <span className="block font-head text-[3.8cqw] font-semibold uppercase tracking-[.18em]">Horários</span>
        <span className="block font-display text-[11cqw] font-bold uppercase leading-[.9]">Sábado, 12</span>
      </div>
      <div className={s.agenda}>
        {lista.map((sv) => (
          <div key={sv.id} className={s.servico}>
            <div className={s.servicoTopo}>
              <span className="truncate">{sv.nome}</span>
              <span className={s.preco}>{formatarPreco(sv.preco)}</span>
            </div>
            <div className={s.chips}>
              {(agenda[sv.id] ?? []).map(([h, livre]) => (
                <span key={h} className={`${s.chip} ${livre ? s.chipLivre : s.chipOcupado}`}>
                  {h}
                </span>
              ))}
            </div>
          </div>
        ))}
        <span className={s.botaoFalso}>
          <IconeWhatsApp className="size-[5.4cqw]" />
          Agendar no WhatsApp
        </span>
      </div>
    </PhoneFrame>
  )
}

export default function PhoneMockups() {
  return (
    <div aria-hidden="true" className={s.palco}>
      <div className={s.slotTras}>
        <TelaHorarios />
      </div>
      <div className={s.slotFrente}>
        <div className="motion-safe:animate-floaty">
          <TelaConversa />
        </div>
      </div>
    </div>
  )
}
