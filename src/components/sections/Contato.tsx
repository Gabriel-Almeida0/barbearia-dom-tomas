import type { ReactNode } from 'react'
import Image from 'next/image'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { IconeInstagram } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { imagens, sizes } from '@/content/imagens'
import { secoes } from '@/content/secoes'
import { formatarHorario, site } from '@/content/site'
import { linkExterno, whatsappUrl } from '@/lib/whatsapp'

const linkTexto =
  'rounded-sm text-texto-escuro underline decoration-mostarda/60 decoration-1 underline-offset-4 ' +
  'transition-colors duration-300 ease-marca hover:text-mostarda hover:decoration-mostarda'

function ItemContato({ icone, rotulo, children }: { icone: ReactNode; rotulo: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-mostarda-soft text-mostarda"
      >
        {icone}
      </span>
      <div className="min-w-0">
        <p className="font-head text-[.86rem] font-semibold uppercase leading-10 tracking-[.12em] text-mostarda">
          {rotulo}
        </p>
        <div className="texto-sm text-texto-escuro/85">{children}</div>
      </div>
    </li>
  )
}

/** Contato (T047): endereço, horários e canais à esquerda; mapa ilustrado (link) à direita. */
export function Contato() {
  const r = secoes.contato.rotulos
  const iconeCls = 'size-[18px]'

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="secao bg-noite">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <Reveal>
          <SectionHeading {...secoes.contatoHead} tom="escuro" alinhamento="esquerda" id="contato-titulo" />

          <address className="not-italic">
            <ul className="flex flex-col gap-6">
              <ItemContato icone={<MapPin className={iconeCls} strokeWidth={2} />} rotulo={r.endereco}>
                <p>{site.endereco.completo}</p>
                <p className="text-muted-escuro">CEP {site.endereco.cep}</p>
              </ItemContato>

              <ItemContato icone={<Clock className={iconeCls} strokeWidth={2} />} rotulo={r.horario}>
                <ul>
                  {site.horarios.map((h) => (
                    <li key={h.dias}>{formatarHorario(h)}</li>
                  ))}
                </ul>
              </ItemContato>

              <ItemContato icone={<Phone className={iconeCls} strokeWidth={2} />} rotulo={r.telefone}>
                <p className="flex flex-wrap gap-x-2">
                  <a href={site.telefone.href} className={linkTexto}>
                    {site.telefone.exibicao}
                  </a>
                  <span aria-hidden="true" className="text-muted-escuro">
                    ·
                  </span>
                  <a href={whatsappUrl()} {...linkExterno} className={linkTexto}>
                    WhatsApp<span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </p>
              </ItemContato>

              <ItemContato icone={<IconeInstagram className={iconeCls} />} rotulo={r.instagram}>
                <a href={site.instagram.url} {...linkExterno} className={linkTexto}>
                  {site.instagram.usuario}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </ItemContato>

              <ItemContato icone={<Mail className={iconeCls} strokeWidth={2} />} rotulo={r.email}>
                <a href={site.email.href} className={`${linkTexto} break-all`}>
                  {site.email.endereco}
                </a>
              </ItemContato>
            </ul>
          </address>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={whatsappUrl()} externo variante="primario" icone="whatsapp" larguraTotalMobile>
              {secoes.contato.cta}
            </Button>
            <Button href={site.endereco.mapsUrl} externo variante="ghost" icone="seta" larguraTotalMobile>
              {secoes.contato.mapa}
            </Button>
          </div>
        </Reveal>

        <Reveal atraso={1} className="lg:h-full">
          <a
            href={site.endereco.mapsUrl}
            {...linkExterno}
            aria-label={secoes.contato.mapaAriaLabel}
            className="group relative block overflow-hidden rounded-card border border-linha-escura shadow-marca lg:h-full"
          >
            <Image
              src={imagens.mapa.src}
              width={imagens.mapa.largura}
              height={imagens.mapa.altura}
              alt={imagens.mapa.alt}
              sizes={sizes.mapa}
              className="h-full min-h-[340px] w-full object-cover grayscale-[.25] transition-[scale,filter] duration-500 ease-marca group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-noite/85 px-4 py-2 font-head text-[.8rem] font-semibold uppercase tracking-[.1em] text-mostarda backdrop-blur-sm"
            >
              <MapPin className="size-4" strokeWidth={2.2} />
              {site.endereco.bairro} · {site.cidade}
            </span>
          </a>
        </Reveal>
      </Container>
    </section>
  )
}

export default Contato
