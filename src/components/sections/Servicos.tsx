import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Baby, Clock, Combine, Droplets, Eye, Layers, Ruler, Scissors, Slice } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatarDuracao, formatarPreco, servicos } from '@/content/servicos'
import { secoes } from '@/content/secoes'
import type { IconeServico, Servico } from '@/content/types'
import { linkExterno, mensagemServico, whatsappUrl } from '@/lib/whatsapp'

/**
 * B3 — Serviços (T033). Layout do Picadilly (grade 4→2→1 de cards brancos) com a pele Dom Tomás:
 * fundo bege-2, títulos Khand/Oswald, detalhes mostarda. Cada card agenda o serviço pelo WhatsApp
 * com mensagem própria (contracts/whatsapp-links.md).
 */

const icones: Record<IconeServico, LucideIcon> = {
  tesoura: Scissors,
  navalha: Slice,
  combo: Combine,
  degrade: Layers,
  acabamento: Ruler,
  sobrancelha: Eye,
  hidratacao: Droplets,
  infantil: Baby,
}

const HEADING_ID = 'servicos-titulo'

function CardServico({ servico }: { servico: Servico }) {
  const Icone = icones[servico.icone]

  return (
    <article
      className={
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-black/[.06] bg-papel ' +
        'px-6 py-[1.7rem] shadow-card ' +
        'transition-[translate,box-shadow] duration-300 ease-marca ' +
        'hover:-translate-y-1.5 hover:shadow-marca focus-within:-translate-y-1.5 focus-within:shadow-marca ' +
        // barra mostarda de 3px no topo
        'before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 ' +
        'before:bg-mostarda before:transition-transform before:duration-300 before:ease-marca before:content-[""] ' +
        'hover:before:scale-x-100 focus-within:before:scale-x-100'
      }
    >
      <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
        <span
          aria-hidden="true"
          className={
            'grid size-14 shrink-0 place-items-center rounded-[12px] bg-mostarda-soft text-mostarda-texto ' +
            'transition-colors duration-300 ease-marca group-hover:bg-mostarda group-hover:text-noite ' +
            'group-focus-within:bg-mostarda group-focus-within:text-noite'
          }
        >
          <Icone className="size-6" strokeWidth={1.9} />
        </span>
        <h3 className="titulo-card text-grafite sm:mt-5">{servico.nome}</h3>
      </div>

      <p className="texto-sm mt-3 flex-1 text-muted sm:mt-2">{servico.descricao}</p>

      <div
        className={
          'mt-5 flex items-center justify-between gap-3 border-t border-dashed border-black/[.12] pt-4 ' +
          'flex-wrap lg:flex-col lg:items-start'
        }
      >
        <div className="flex items-baseline gap-3">
          <p className="whitespace-nowrap font-head text-[1.45rem] font-semibold leading-none text-grafite">
            <span className="sr-only">Preço: </span>
            {formatarPreco(servico.preco)}
          </p>
          <p className="flex items-center gap-1.5 self-center whitespace-nowrap font-body text-[.84rem] text-muted">
            <Clock aria-hidden="true" className="size-4 text-mostarda-texto" strokeWidth={2} />
            <span className="sr-only">Duração: </span>
            {formatarDuracao(servico.duracaoMin)}
          </p>
        </div>

        <a
          href={whatsappUrl(mensagemServico(servico))}
          {...linkExterno}
          aria-label={`${secoes.servicos.agendarEste}: ${servico.nome} pelo WhatsApp`}
          className={
            'group/link -my-2 inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-sm py-1 font-head text-[.86rem] font-semibold ' +
            'uppercase tracking-[.08em] text-mostarda-texto underline-offset-4 hover:underline'
          }
        >
          {secoes.servicos.agendarEste}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-[translate] duration-300 ease-marca group-hover/link:translate-x-[3px]"
            strokeWidth={2.4}
          />
        </a>
      </div>
    </article>
  )
}

export default function Servicos() {
  const head = secoes.servicosHead

  return (
    <section id="servicos" aria-labelledby={HEADING_ID} className="secao bg-bege-2">
      <Container>
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            tom="claro"
            eyebrow={head.eyebrow}
            titulo={head.titulo}
            destaque={head.destaque}
            subtitulo={head.subtitulo}
          />
        </Reveal>

        <ul className="grid grid-cols-1 gap-[1.1rem] sm:grid-cols-2 lg:grid-cols-4">
          {servicos.map((servico, i) => (
            <Reveal as="li" key={servico.id} atraso={(i % 4) as 0 | 1 | 2 | 3}>
              <CardServico servico={servico} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-[clamp(2.2rem,5vw,3rem)] flex flex-col items-center gap-5 text-center">
          <p className="texto-sm max-w-[52ch] text-muted">{secoes.servicos.nota}</p>
          <Button href={whatsappUrl()} variante="escuro" externo icone="whatsapp" tamanho="lg" larguraTotalMobile>
            {secoes.servicos.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
