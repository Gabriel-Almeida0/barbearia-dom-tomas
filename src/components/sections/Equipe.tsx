import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { equipe, seloFundador } from '@/content/equipe'
import { imagens, sizes } from '@/content/imagens'
import { secoes } from '@/content/secoes'
import type { Barbeiro } from '@/content/types'
import { linkExterno, mensagemBarbeiro, whatsappUrl } from '@/lib/whatsapp'

const atrasos = [0, 1, 2, 3] as const

function CardBarbeiro({ barbeiro }: { barbeiro: Barbeiro }) {
  const img = imagens[barbeiro.imagem]
  const primeiroNome = barbeiro.nome.split(' ')[0]

  return (
    <article className="flex h-full flex-col items-center text-center">
      <div
        className={[
          'relative w-full overflow-hidden rounded-2xl bg-noite-2',
          barbeiro.fundador
            ? 'border-2 border-mostarda shadow-mostarda ring-4 ring-mostarda-soft'
            : 'border border-noite/80 shadow-card',
        ].join(' ')}
        style={{ aspectRatio: img.aspectRatio }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes.barbeiro}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        {barbeiro.fundador ? (
          <span className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-mostarda px-3 py-1 font-head text-[0.68rem] leading-none font-semibold tracking-[0.08em] text-noite uppercase shadow-[0_6px_14px_-6px_rgba(26,22,20,0.55)] sm:top-4 sm:text-[0.72rem]">
            {seloFundador}
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 font-head text-[1.12rem] leading-tight font-semibold text-grafite sm:text-[1.25rem]">
        <a
          href={whatsappUrl(mensagemBarbeiro(barbeiro))}
          {...linkExterno}
          className="rounded-sm decoration-mostarda decoration-2 underline-offset-4 hover:underline focus-visible:underline"
        >
          {barbeiro.nome}
          <span className="sr-only">
            {' '}
            — agendar com {primeiroNome} pelo WhatsApp (abre em nova aba)
          </span>
        </a>
      </h3>
      <p
        className={`mt-1 text-[0.86rem] leading-snug sm:text-[0.94rem] ${barbeiro.fundador ? 'font-semibold text-grafite-2' : 'text-muted'}`}
      >
        {barbeiro.cargo}
      </p>
      <p className="mt-1 text-[0.8rem] leading-snug text-muted sm:text-[0.86rem]">{barbeiro.especialidade}</p>
    </article>
  )
}

/** Equipe (US2): 4 barbeiros, fundador em destaque. Emenda visualmente com Depoimentos (mesmo bege da faixa WhatsApp, sem costura). */
export default function Equipe() {
  const h = secoes.equipeHead

  return (
    <section
      id="equipe"
      aria-labelledby="equipe-titulo"
      className="bg-bege pt-[var(--sec-y)] pb-[calc(var(--sec-y)*0.55)]"
    >
      <Container>
        <SectionHeading
          id="equipe-titulo"
          tom="claro"
          eyebrow={h.eyebrow}
          titulo={h.titulo}
          destaque={h.destaque}
          subtitulo={h.subtitulo}
        />
        <ul className="grid grid-cols-2 gap-x-[0.9rem] gap-y-[1.6rem] sm:gap-x-[1.1rem] lg:grid-cols-4 lg:gap-[1.1rem]">
          {equipe.map((b, i) => (
            <Reveal as="li" key={b.id} atraso={atrasos[i % 4]} className="group">
              <CardBarbeiro barbeiro={b} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
