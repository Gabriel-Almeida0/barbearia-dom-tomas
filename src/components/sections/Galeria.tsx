import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { galeria } from '@/content/galeria'
import { secoes } from '@/content/secoes'
import { imagens, sizes } from '@/content/imagens'

/**
 * Galeria (T038): grade 2 → 3 colunas de tiles 3:4 com zoom no hover e legenda sobre gradiente.
 * A caixa tem aspect-ratio fixo antes da imagem carregar (sem CLS). Zoom só sem movimento reduzido.
 */
export default function Galeria() {
  const head = secoes.galeriaHead

  return (
    <section id="galeria" aria-labelledby="galeria-titulo" className="secao bg-bege">
      <Container>
        <Reveal>
          <SectionHeading id="galeria-titulo" tom="claro" eyebrow={head.eyebrow} titulo={head.titulo} destaque={head.destaque} />
        </Reveal>

        <ul className="grid grid-cols-2 gap-[.75rem] sm:gap-[1.1rem] lg:grid-cols-3" role="list">
          {galeria.map((item, i) => {
            const img = imagens[item.imagem]
            return (
              <Reveal as="li" key={item.imagem} atraso={(i % 3) as 0 | 1 | 2}>
                <figure
                  className="group relative m-0 overflow-hidden rounded-card bg-noite-2 shadow-card"
                  style={{ aspectRatio: '3 / 4' }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={sizes.galeria}
                    loading="lazy"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-600 motion-safe:ease-marca motion-safe:group-hover:scale-[1.06] motion-safe:group-focus-within:scale-[1.06]"
                  />
                  <figcaption
                    className={
                      'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent ' +
                      'px-[clamp(.8rem,2.4vw,1.15rem)] pb-[clamp(.75rem,2.2vw,1.05rem)] pt-16 ' +
                      'font-head text-[clamp(.78rem,2.4vw,.95rem)] font-medium uppercase leading-tight tracking-[.08em] text-mostarda-claro'
                    }
                  >
                    {item.legenda}
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </ul>

      </Container>
    </section>
  )
}
