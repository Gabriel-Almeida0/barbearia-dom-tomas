import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { secoes } from '@/content/secoes'
import { whatsappUrl } from '@/lib/whatsapp'

/**
 * Faixa CTA (T046): mostarda chapada com listras diagonais de "barber pole" (layout do Picadilly,
 * pele do Seu Elias). Texto à esquerda, botão escuro à direita; empilhado no mobile.
 *
 * Contraste: branco sobre mostarda dá ~1,9:1 e reprova até para texto grande, por isso o destaque
 * do título vira um "carimbo" noite com letras mostarda-claro (≈ 10:1) em vez de text-papel.
 */
export function FaixaCta() {
  const t = secoes.faixaCta

  return (
    <section
      aria-labelledby="faixa-cta-titulo"
      className="relative overflow-hidden bg-mostarda py-14 lg:py-16"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(26,22,20,.12) 0 22px, transparent 22px 44px)',
      }}
    >
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <Reveal className="max-w-[720px]">
          <p className="eyebrow mb-3 text-noite">
            <span aria-hidden="true">✦ </span>
            {t.eyebrow}
          </p>
          <h2 id="faixa-cta-titulo" className="titulo-secao text-balance text-noite">
            {t.titulo}{' '}
            <span className="inline-block -rotate-2 rounded-card-sm bg-noite px-[.22em] pb-[.02em] pt-[.1em] text-mostarda-claro">
              {t.destaque}
            </span>
          </h2>
          <p className="texto mt-4 max-w-[46ch] font-medium text-noite">{t.texto}</p>
        </Reveal>

        <Reveal atraso={1} className="shrink-0">
          <Button
            href={whatsappUrl()}
            externo
            variante="escuro"
            tamanho="lg"
            icone="whatsapp"
            larguraTotalMobile
            className="shadow-marca"
          >
            {t.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}

export default FaixaCta
