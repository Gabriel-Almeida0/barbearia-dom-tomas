import Image from 'next/image'
import { Clock, Coffee, FlaskConical, Slice, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { imagens, sizes } from '@/content/imagens'
import { sobre } from '@/content/sobre'
import type { IconeFeature } from '@/content/types'
import { whatsappUrl } from '@/lib/whatsapp'

const icones: Record<IconeFeature, LucideIcon> = {
  navalha: Slice,
  relogio: Clock,
  produto: FlaskConical,
  cafe: Coffee,
}

/**
 * Sobre (T035): esqueleto do Picadilly (texto + features no escuro) com a pele do Seu Elias
 * (foto com bloco mostarda chapado deslocado atrás).
 */
export default function Sobre() {
  const img = imagens.sobre

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="secao overflow-x-clip bg-noite">
      <Container>
        <div className="grid items-center gap-[clamp(3rem,7vw,5.5rem)] lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              id="sobre-titulo"
              tom="escuro"
              alinhamento="esquerda"
              eyebrow={sobre.eyebrow}
              titulo={sobre.titulo}
              destaque={sobre.destaque}
              destaqueEmLinha
              comMargem={false}
            />
            <div className="mt-6 space-y-4">
              {sobre.paragrafos.map((p) => (
                <p key={p.slice(0, 24)} className="texto max-w-[46ch] font-light text-muted-escuro">
                  {p}
                </p>
              ))}
            </div>
            <Button
              href={whatsappUrl()}
              externo
              variante="primario"
              icone="seta"
              larguraTotalMobile
              className="mt-9"
            >
              {sobre.cta}
            </Button>
          </Reveal>

          <Reveal atraso={1} className="relative mr-4 mb-4 sm:mr-6 sm:mb-6 lg:mr-0">
            {/* Bloco mostarda chapado, deslocado atrás da foto (estilo Seu Elias). */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-card bg-mostarda sm:translate-x-6 sm:translate-y-6 lg:-translate-x-6"
            />
            <Image
              src={img.src}
              width={img.largura}
              height={img.altura}
              alt={img.alt}
              sizes={sizes.sobre}
              loading="lazy"
              className="relative h-auto w-full rounded-card object-cover shadow-marca"
              style={{ aspectRatio: img.aspectRatio }}
            />
          </Reveal>
        </div>

        <ul className="mt-[clamp(3.5rem,7vw,5.5rem)] grid gap-[1.1rem] sm:grid-cols-2 lg:grid-cols-4">
          {sobre.features.map((f, i) => {
            const Icone = icones[f.icone]
            return (
              <Reveal as="li" key={f.titulo} atraso={(i % 4) as 0 | 1 | 2 | 3}>
                <article className="h-full rounded-card border border-linha-escura bg-noite-2 p-6 transition-[translate,border-color] duration-300 ease-marca hover:translate-x-1.5 hover:border-mostarda/40">
                  <span
                    aria-hidden="true"
                    className="mb-4 grid size-[46px] place-items-center rounded-[12px] bg-mostarda-soft text-mostarda"
                  >
                    <Icone className="size-[22px]" strokeWidth={2} />
                  </span>
                  <h3 className="titulo-card text-texto-escuro">{f.titulo}</h3>
                  <p className="texto-sm mt-1.5 text-muted-escuro">{f.texto}</p>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
