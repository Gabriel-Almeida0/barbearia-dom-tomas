# Contrato: componentes de UI

Contrato entre a fundação (dona de `src/components/ui/`, `src/lib/`, `src/content/`, `globals.css`)
e os blocos paralelos (donos de `src/components/sections/*`). Blocos só **consomem** estas APIs.
Se faltar algo, registrar em `specs/001-landing-dom-tomas/pendencias.md` (não editar a fundação).

## Base (`src/components/ui/`)

```ts
// Container.tsx — Server
type ContainerProps = { as?: 'div'|'section'|'header'|'footer'; estreito?: boolean /* max 880 */; className?: string; children: ReactNode }
// largura: min(100% - 2.5rem, 1180px), centralizado

// Button.tsx — Server; sempre renderiza <a>
type ButtonProps = {
  href: string
  variante: 'primario' | 'escuro' | 'ghost' | 'whatsapp'
  tamanho?: 'md' | 'lg'
  externo?: boolean          // true → target=_blank rel=noopener noreferrer
  icone?: 'seta' | 'whatsapp' | 'instagram'
  larguraTotalMobile?: boolean // 100% abaixo de 560px
  className?: string
  children: ReactNode
  'aria-label'?: string
}

// BotaoLoja (exportado de Button.tsx) — badge preto estilo loja
type BotaoLojaProps = { href: string; icone: 'whatsapp' | 'instagram'; linha1: string; linha2: string }
// #111, raio 10px, altura 52px, ícone 26px à esquerda, linha1 10px / linha2 17px semibold, sempre externo

// SectionHeading.tsx — Server
type SectionHeadingProps = {
  eyebrow: string
  titulo: string            // parte base
  destaque?: string         // palavra(s) em outra cor, anexada ao fim (ou `destaqueAntes`)
  subtitulo?: string
  nivel?: 'h1' | 'h2'       // default h2
  tamanho?: 'secao' | 'display-l' | 'display-xl'
  tom: 'claro' | 'escuro' | 'mostarda'  // define cores base/destaque/eyebrow
  alinhamento?: 'centro' | 'esquerda'   // default centro (max 640px)
  id?: string               // para aria-labelledby da seção
}

// Reveal.tsx — "use client"
type RevealProps = { as?: keyof JSX.IntrinsicElements; direcao?: 'cima' | 'direita'; atraso?: 0|1|2|3 /* ×90ms */; className?: string; children: ReactNode }

// Logo.tsx — Server; monograma "DT" circular em SVG próprio
type LogoProps = { tamanho?: number /* px, default 42 */; comNome?: boolean; tom?: 'claro'|'escuro' }

// icons.tsx — SVGs de marca
export function IconeWhatsApp(props: SVGProps<SVGSVGElement>): JSX.Element
export function IconeInstagram(props: SVGProps<SVGSVGElement>): JSX.Element

// JsonLd.tsx — Server; renderiza <script type="application/ld+json"> sanitizado
```

## Seções (`src/components/sections/`) — todas sem props

Cada seção é `export default function Nome()`, lê `src/content/*`, e renderiza um landmark
`<section id=… aria-labelledby=…>` (exceto Header/Footer/Marquee/FAB). Server Components, salvo
Header e MobileMenu.

| Arquivo | Export | Elemento raiz | Âncora | Cliente? |
|---|---|---|---|---|
| Header.tsx | `Header` | `<header>` sticky, contém `<nav aria-label="Principal">` e `MobileMenu` | — | sim |
| MobileMenu.tsx | `MobileMenu` | botão + painel `role="dialog"` | `#menu-mobile` | sim |
| Hero.tsx | `Hero` | `<section id="inicio">` com o único `<h1>` | `#inicio` | não |
| Marquee.tsx | `Marquee` | `<div role="presentation">` + texto `aria-hidden` na cópia | — | não |
| Servicos.tsx | `Servicos` | `<section id="servicos">` | `#servicos` | não |
| Sobre.tsx | `Sobre` | `<section id="sobre">` | `#sobre` | não |
| Missao.tsx | `Missao` | `<section aria-label="Nossa missão">` com `<blockquote>` | — | não |
| Galeria.tsx | `Galeria` | `<section id="galeria">`, `<ul>` de `<figure>` | `#galeria` | não |
| FaixaWhatsApp.tsx | `FaixaWhatsApp` | `<section id="agendar">` | `#agendar` | não |
| PhoneMockups.tsx | `PhoneMockups` | `<div aria-hidden="true">` com 2 `PhoneFrame` | — | não |
| Equipe.tsx | `Equipe` | `<section id="equipe">` | `#equipe` | não |
| Depoimentos.tsx | `Depoimentos` | `<section aria-labelledby>` | — | não |
| FaixaCta.tsx | `FaixaCta` | `<section aria-labelledby>` | — | não |
| Contato.tsx | `Contato` | `<section id="contato">` com `<address>` | `#contato` | não |
| Footer.tsx | `Footer` | `<footer>` | — | não |
| WhatsAppFab.tsx | `WhatsAppFab` | `<a>` fixo, `aria-label="Agendar pelo WhatsApp"` | — | não |

## Utilitários globais disponíveis (definidos na fundação em `globals.css`)

- Cores: `bg-/text-/border-` + `mostarda`, `mostarda-claro`, `mostarda-escuro`, `mostarda-soft`,
  `mostarda-texto`, `grafite`, `grafite-2`, `noite`, `noite-2`, `rodape`, `bege`, `bege-2`, `papel`,
  `muted`, `muted-escuro`, `texto-escuro`, `linha-escura`, `loja`, `whatsapp`, `whatsapp-hover`.
- Fontes: `font-display`, `font-head`, `font-body`.
- Raio/sombra: `rounded-card` (16), `rounded-card-sm` (10), `shadow-card`, `shadow-marca`,
  `shadow-mostarda`; easing `ease-marca`.
- Tipografia (`@utility`): `display-xl`, `display-l`, `titulo-secao`, `eyebrow`, `lead`, `texto`,
  `texto-sm`, `nav-link`, `texto-botao`, `texto-missao`, `text-stroke`.
- Layout: `secao` (padding-block `--sec-y`), `container-site`.
- Animação: `animate-marquee`, `animate-floaty`, `animate-bob`, `animate-pulse-wa`, classes
  `.reveal` / `.reveal-direita` / `.is-visible` (usadas pelo `Reveal`).
- Breakpoints: `sm:` ≥ 560px, `lg:` ≥ 980px, `xl:` ≥ 1280px.

---

## API implementada na fundação (T001–T026) — **use isto**

Imports (todos **named exports** na UI; seções continuam `export default`):

```ts
import { Button, BotaoLoja } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'          // "use client"
import { Logo } from '@/components/ui/Logo'
import { IconeWhatsApp, IconeInstagram } from '@/components/ui/icons'
import { whatsappUrl, mensagemServico, mensagemBarbeiro, linkExterno } from '@/lib/whatsapp'
import { site, formatarHorario, formatarHora } from '@/content/site'
import { servicos, formatarPreco, formatarDuracao, faixaDePreco } from '@/content/servicos'
import { equipe, seloFundador } from '@/content/equipe'
import { depoimentos } from '@/content/depoimentos'
import { sobre, missao } from '@/content/sobre'
import { galeria } from '@/content/galeria'
import { secoes } from '@/content/secoes'
import { imagens, sizes } from '@/content/imagens'
```

Acréscimos/ajustes em relação ao contrato acima:

- **Button**: + `onClick?` (MobileMenu fecha o painel). Sem `"use client"`, pode ser usado em client
  components. `icone="seta"` fica à direita e anda 3px no hover; `whatsapp`/`instagram` à esquerda.
  Variante `whatsapp` usa `bg-whatsapp-hover` (#17843F, 4,8:1 com texto branco) — `bg-whatsapp`
  (3,5:1) só serve para ícone (FAB). `ghost` só em fundo escuro.
- **BotaoLoja**: + `className?`.
- **Container**: + `as="nav"`. Equivale às classes `container-site` / `container-estreito`.
- **SectionHeading**: + `destaqueEmLinha?` (destaque em linha própria — faixa WhatsApp),
  `eyebrowOculto?` (eyebrow `sr-only`), `comMargem?` (default true), `className?`. O "✦" já é
  inserido. `display-l`/`display-xl` ganham `text-stroke` automaticamente.
- **Reveal**: `as` aceita `'div'|'li'|'article'|'section'|'figure'|'span'|'ul'|'blockquote'`; + `style?`.
- **Logo**: + `className?`. `tom='claro'` (default) = logo claro para fundo escuro; `tom='escuro'`
  = tudo em noite, para fundo claro/mostarda. Arco "BARBEARIA · 2014" só a partir de 56px. Tem
  `role="img"` + `aria-label` próprios — dentro de link não precisa de texto extra.
- **Conteúdo**: `site.telefone.href`, `site.email.{endereco,href}`, `site.endereco.completo`,
  `site.horarios[].schemaDias`; `imagens[id].aspectRatio` ('4 / 5' etc.) para caixas com `fill`;
  `sizes.{hero,sobre,galeria,barbeiro,mapa}`; `secoes.hero.confianca` é array de 2 itens (o ★ é
  da seção); `secoes.servicos.{nota,cta,agendarEste}`, `secoes.galeria.{rodapeAntes,rodapeDepois}`,
  `secoes.contato.rotulos`, `secoes.footer.copyright(ano)`, `secoes.ctas`.
- **Utilitários extras**: `titulo-card` (h3 Oswald 600 1.18rem), `container-estreito`. Foco: em
  qualquer descendente de `.bg-mostarda` ou `[data-fundo="mostarda"]` o anel vira `--noite`.
  Variáveis CSS `--sec-y`, `--header-h`, `--maxw` e todos `--color-*` disponíveis em `*.module.css`.
