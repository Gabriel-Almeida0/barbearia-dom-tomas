import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { imagens, sizes } from '@/content/imagens'
import { secoes } from '@/content/secoes'
import { whatsappUrl } from '@/lib/whatsapp'

/**
 * Hero (T030): layout do Picadilly (texto à esquerda, visual à direita) com a pele do Seu Elias
 * (foto com bloco mostarda chapado deslocado atrás). Único <h1> da página. Sem Reveal.
 * Server Component. Fica sob o header sticky (-mt/pt = altura do header, 77px).
 */
export default function Hero() {
  const hero = secoes.hero
  const foto = imagens.hero
  const href = whatsappUrl()

  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative isolate -mt-[77px] flex min-h-[92svh] flex-col overflow-hidden bg-noite pt-[77px]"
    >
      <Decoracao />

      <div className="container-site grid flex-1 items-center gap-10 pb-8 pt-6 text-center sm:gap-12 sm:pt-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:pb-6 lg:pt-12 lg:text-left">
        {/* Texto */}
        <div className="flex flex-col items-center lg:items-start">
          <p className="eyebrow text-balance text-mostarda">
            <span aria-hidden="true">✦ </span>
            {hero.eyebrow}
          </p>

          <h1 id="hero-titulo" className="display-xl text-stroke mt-4 text-balance sm:mt-5">
            <span className="block text-texto-escuro">{hero.linha1}</span>{' '}
            <span className="block text-mostarda">{hero.linha2}</span>
          </h1>

          <p className="lead mt-5 text-muted-escuro sm:mt-6">{hero.lead}</p>

          <div className="mt-8 flex w-full flex-col items-center gap-3.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <Button href={href} variante="primario" tamanho="lg" icone="seta" externo larguraTotalMobile>
              {hero.cta1}
            </Button>
            <Button href={href} variante="ghost" tamanho="lg" icone="whatsapp" externo larguraTotalMobile>
              {hero.cta2}
            </Button>
          </div>

          <ul className="texto-sm mt-6 flex flex-col items-center gap-x-4 gap-y-1.5 sm:flex-row sm:flex-wrap sm:justify-center text-muted-escuro lg:justify-start">
            {hero.confianca.map((item, i) => {
              const [destaque, ...resto] = item.split(' ')
              return (
                <li key={item} className="flex items-center gap-x-4">
                  {i > 0 ? (
                    <span aria-hidden="true" className="hidden size-1 rounded-full bg-mostarda sm:block" />
                  ) : null}
                  <span>
                    {i === 0 ? (
                      <span aria-hidden="true" className="mr-1 text-mostarda">
                        ★
                      </span>
                    ) : null}
                    <strong className="font-semibold text-texto-escuro">{destaque}</strong> {resto.join(' ')}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Foto com bloco mostarda chapado deslocado atrás (Seu Elias) */}
        <div className="relative order-first mx-auto w-[64%] max-w-[480px] sm:w-[72%] lg:order-none lg:mr-6 lg:w-full">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-card bg-mostarda sm:translate-x-6 sm:translate-y-6"
          />
          <Image
            src={foto.src}
            width={foto.largura}
            height={foto.altura}
            alt={foto.alt}
            sizes={sizes.hero}
            preload /* LCP: <link rel="preload"> no <head> (Next 16; substitui `priority`) */
            className="relative aspect-[5/4] h-auto w-full rounded-card object-cover object-[50%_30%] shadow-marca sm:aspect-auto"
          />
        </div>
      </div>

      <a
        href="#servicos"
        className="nav-link relative mx-auto mb-3 mt-1 flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-sm px-2 text-[.72rem] tracking-[.22em] text-muted-escuro transition-colors duration-300 hover:text-mostarda"
      >
        <span>
          {hero.rolar}
          <span className="sr-only"> para ver os serviços</span>
        </span>
        <ChevronDown aria-hidden="true" className="size-4 animate-bob" strokeWidth={2.2} />
      </a>
    </section>
  )
}

/** Fundo decorativo, só CSS: glow mostarda no topo direito, pontos de 4px e listras "barber pole". */
function Decoracao() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* glow radial mostarda no topo direito */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_88%_0%,rgba(232,179,48,.17),transparent_70%)]" />
      {/* textura de pontos 4px */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.045)_1px,transparent_1.2px)] bg-size-[4px_4px]" />
      {/* faixa vertical "barber pole" perto da borda direita */}
      <div className="absolute inset-y-0 right-[6%] hidden w-[120px] bg-[repeating-linear-gradient(135deg,rgba(232,179,48,.07)_0_14px,transparent_14px_30px)] [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)] lg:block" />
      {/* vinheta na base para assentar a faixa mostarda */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/25 to-transparent" />
    </div>
  )
}
