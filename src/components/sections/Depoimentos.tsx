import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { depoimentos } from '@/content/depoimentos'
import { secoes } from '@/content/secoes'

const atrasos = [0, 1, 2, 3] as const

/** Depoimentos (US2): continuação visual da Equipe no mesmo bege. */
export default function Depoimentos() {
  const h = secoes.depoimentosHead

  return (
    <section
      aria-labelledby="depoimentos-titulo"
      className="bg-bege pt-[calc(var(--sec-y)*0.55)] pb-[var(--sec-y)]"
    >
      <Container>
        <SectionHeading
          id="depoimentos-titulo"
          tom="claro"
          eyebrow={h.eyebrow}
          titulo={h.titulo}
          destaque={h.destaque}
        />
        <ul className="grid gap-[1.1rem] lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <Reveal as="li" key={d.autor} atraso={atrasos[i % 4]}>
              <figure className="flex h-full flex-col rounded-2xl bg-papel p-[1.7rem] shadow-card ring-1 ring-noite/5">
                <p
                  role="img"
                  aria-label={`${d.nota} de 5 estrelas`}
                  className="text-[1.05rem] leading-none tracking-[0.12em] text-mostarda-escuro"
                >
                  <span aria-hidden="true">{'★'.repeat(d.nota)}{'☆'.repeat(5 - d.nota)}</span>
                </p>
                <blockquote className="texto mt-4 flex-1 text-grafite">
                  <p>“{d.texto}”</p>
                </blockquote>
                <figcaption className="mt-5">
                  <cite className="font-head text-[0.82rem] font-medium tracking-[0.06em] text-muted uppercase not-italic">
                    — {d.autor}
                  </cite>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
