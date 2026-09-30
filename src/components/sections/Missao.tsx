import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { missao } from '@/content/sobre'

/**
 * Missão (T036): faixa escura em gradiente noite → noite-2 com glow radial mostarda atrás das aspas (sem tocar a borda: nada de emenda com o Sobre),
 * aspas gigantes decorativas e a frase em Oswald 300 com o destaque em mostarda.
 */
export default function Missao() {
  return (
    <section
      aria-label="Nossa missão"
      className="relative isolate pt-[calc(var(--sec-y)*0.6)] pb-[var(--sec-y)] overflow-hidden bg-noite bg-linear-to-b from-noite to-noite-2"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_45%_at_50%_38%,rgba(232,179,48,0.13),transparent_75%)]"
      />
      <Container estreito className="text-center">
        <Reveal>
          <p className="eyebrow text-mostarda">
            <span aria-hidden="true">✦ </span>
            {missao.eyebrow}
          </p>
          <span
            aria-hidden="true"
            className="mt-2 block h-[4.2rem] select-none font-display text-[8rem] font-bold leading-[1] text-mostarda/55"
          >
            &ldquo;
          </span>
          <figure className="mt-2">
            <blockquote className="texto-missao text-balance text-texto-escuro">
              <p>
                {missao.antes}
                <strong className="font-normal text-mostarda">{missao.destaque}</strong>
                {missao.depois}
              </p>
            </blockquote>
            <figcaption className="eyebrow mt-7 text-muted-escuro">
              <span aria-hidden="true">— </span>
              <cite className="not-italic">{missao.autor}</cite>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  )
}
