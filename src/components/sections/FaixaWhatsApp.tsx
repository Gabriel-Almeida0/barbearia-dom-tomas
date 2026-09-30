import { BotaoLoja } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { secoes } from '@/content/secoes'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'
import PhoneMockups from './PhoneMockups'
import s from './FaixaWhatsApp.module.css'

/**
 * Faixa "Agende pelo WhatsApp" (US3, peça central) — pele da faixa do app do Seu Elias:
 * mostarda chapada, largura total, solta entre fundos bege, com dois celulares vazando.
 */
export default function FaixaWhatsApp() {
  const t = secoes.faixaWhatsApp

  return (
    <section id="agendar" aria-labelledby="agendar-titulo" className={`${s.faixa} bg-mostarda`}>
      <Container className="grid items-center lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <SectionHeading
            id="agendar-titulo"
            eyebrow={t.eyebrow}
            eyebrowOculto
            titulo={t.titulo}
            destaque={t.destaque}
            destaqueEmLinha
            tom="mostarda"
            tamanho="display-l"
            alinhamento="esquerda"
            comMargem={false}
            className="[&_h2]:text-[clamp(3.1rem,14vw,4.6rem)] lg:[&_h2]:text-[min(6.2rem,calc(10vw-8px))]"
          />
          <p className={`${s.texto} mt-7 text-noite`}>{t.texto}</p>
          <div className="mt-9 flex flex-wrap gap-5">
            <BotaoLoja
              href={whatsappUrl()}
              icone="whatsapp"
              linha1={t.badgeWhatsApp.linha1}
              linha2={t.badgeWhatsApp.linha2}
            />
            <BotaoLoja
              href={site.instagram.url}
              icone="instagram"
              linha1={t.badgeInstagram.linha1}
              linha2={t.badgeInstagram.linha2}
            />
          </div>
        </div>

        <Reveal direcao="direita" className={s.coluna}>
          <PhoneMockups />
        </Reveal>
      </Container>
    </section>
  )
}
