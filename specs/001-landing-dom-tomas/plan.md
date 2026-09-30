# Implementation Plan: Landing one-page da Dom Tomás Barbearia

**Branch**: `001-landing-dom-tomas` | **Date**: 2026-09-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-landing-dom-tomas/spec.md`

## Summary

Landing one-page estática de uma barbearia fictícia em Belo Horizonte. Estrutura do Picadilly
(hero escuro, faixa rolante, cards, alternância claro/escuro, header fixo com desfoque, reveal) com a
pele do Seu Elias (mostarda chapada, bege, grafite, títulos Khand condensados com line-height < 1 e
uma palavra em outra cor). Peça central: faixa mostarda "AGENDE PELO WHATSAPP DOM TOMÁS" com badges
pretos estilo loja e dois celulares inclinados vazando, com telas desenhadas em HTML/CSS. Todo
agendamento abre o WhatsApp (sem backend). Imagens seguem um manifesto de caminhos fixos com
placeholders gerados por script, para troca posterior por imagens de IA. Implementação pensada para
vários agentes em paralelo: fundação sequencial e, depois, uma seção por arquivo.

## ⚠️ Leitura obrigatória antes de codar (Next.js 16.3.7)

O `AGENTS.md` avisa: "This is NOT the Next.js you know". Quem implementar **DEVE** ler em
`node_modules/next/dist/docs/` antes de tocar em fontes, imagens ou metadados:

| Assunto | Arquivo |
|---|---|
| Fontes (guia) | `01-app/01-getting-started/13-fonts.md` |
| Fontes (API, `weight`, `variable`, Tailwind v4) | `01-app/03-api-reference/02-components/font.md` (seção "With Tailwind CSS") |
| Imagens (guia) | `01-app/01-getting-started/12-images.md` |
| Imagens (API) | `01-app/03-api-reference/02-components/image.md` |
| Metadata e OG | `01-app/01-getting-started/14-metadata-and-og-images.md`, `01-app/03-api-reference/04-functions/generate-metadata.md` |
| JSON-LD | `01-app/02-guides/json-ld.md` |

Pontos já conferidos nesses arquivos (detalhes em [research.md](./research.md) R1, R2, R12):

- `next/font/google`: Khand **não é variável** (pesos 300–700, sem 900) → `weight` obrigatório;
  Oswald é variável; Poppins exige `weight`. Usar `variable: '--font-…'` e mapear em
  `@theme inline` no `globals.css`.
- `next/image`: **`priority` está depreciado** no Next 16 (substituído por `preload`); a doc
  recomenda `loading="eager"`/`fetchPriority="high"` para o LCP. `quality` default 75 e
  `images.qualities` default `[75]`. Com `fill`, informar `sizes`.
- Metadata: `metadataBase` necessário para URLs relativas de Open Graph. JSON-LD em `<script>` com
  `JSON.stringify(...).replace(/</g,'\\u003c')`.
- O `layout.tsx` gerado usa o tipo global `LayoutProps<"/">`.

## Technical Context

**Language/Version**: TypeScript 5 (strict), React 19.2.8, Node 22.

**Primary Dependencies**: Next.js 16.3.7 (App Router, `src/`), Tailwind CSS v4 (`@tailwindcss/postcss`),
`lucide-react` (a adicionar), `sharp` (devDependency explícita, só para o script de placeholders).
Sem libs de UI nem de animação.

**Storage**: N/A (conteúdo estático tipado em `src/content/`; imagens em `public/images/`).

**Testing**: `npm run lint` (ESLint `eslint-config-next`), `npm run build` (typecheck + build),
verificação visual e funcional com Playwright MCP (390×844 e 1440×900), Lighthouse CLI mobile.
Sem suíte de testes unitários (YAGNI: não há lógica além de montar URLs; a URL é verificada no
navegador).

**Target Platform**: navegadores modernos (Chrome/Edge/Safari/Firefox últimas 2 versões, iOS
Safari 16+), 360px → 1440px+.

**Project Type**: web — landing estática one-page (App Router, rota única `/`).

**Performance Goals**: Lighthouse mobile ≥ 90 performance, ≥ 95 acessibilidade/boas práticas/SEO;
LCP < 2,5 s; CLS < 0,05.

**Constraints**: sem backend; sem scroll horizontal 360–1440; WCAG 2.1 AA; `prefers-reduced-motion`;
nenhum asset dos sites de referência; JS de cliente mínimo (Header, MobileMenu, Reveal).

**Scale/Scope**: 1 página, 12 blocos visuais, ~20 componentes, 14 imagens.

## Sistema visual (transcrição da seção (c) de `docs/referencia/design-reference.md`)

### Tokens (vão para `src/app/globals.css`)

Valores da referência, com os ajustes de contraste de research R4 marcados com ★.

```css
:root{
  --mostarda:#E8B330; --mostarda-claro:#F5C95A; --mostarda-escuro:#B98A1C;
  --mostarda-soft:rgba(232,179,48,.14);
  --mostarda-texto:#7A5A0E;          /* ★ eyebrow/texto mostarda sobre claro (AA) */
  --grafite:#3F3634; --grafite-2:#4D4341;
  --noite:#1A1614; --noite-2:#231E1B; --rodape:#120F0D;
  --bege:#E2DED5; --bege-2:#EDE9E1; --papel:#FFFFFF;
  --muted:#5F5752;                   /* ★ era #6E6560 (4,3:1 no bege) */
  --muted-escuro:#B5ABA2; --texto-escuro:#F4EFE6;
  --linha-escura:rgba(255,255,255,.1);
  --loja:#111111;                    /* badges estilo loja e moldura dos celulares */
  --whatsapp:#1E9E4F; --whatsapp-hover:#17843F;   /* ★ #25D366 reprova com ícone branco */
  --r:16px; --r-sm:10px; --r-pill:999px;
  --sombra:0 18px 40px -22px rgba(20,14,10,.45);
  --sombra-card:0 10px 24px -20px rgba(20,14,10,.5);
  --sombra-mostarda:0 14px 30px -12px rgba(232,179,48,.5);
  --ease:cubic-bezier(.22,.61,.36,1);
  --maxw:1180px; --gutter:1.25rem;   /* container = min(100% - 2.5rem, var(--maxw)) */
  --sec-y:clamp(3.5rem,8vw,6.5rem);
  --header-h:77px;
}
```

No Tailwind v4 esses valores entram em `@theme` como `--color-mostarda`, `--color-noite`, …,
`--radius-card: 16px`, `--shadow-card`, `--ease-marca`, `--font-display/head/body`, e
`--animate-marquee`, `--animate-pulse-wa`, `--animate-floaty`, `--animate-bob` com os `@keyframes`
dentro do próprio `@theme`. Gerando utilitários `bg-mostarda`, `text-noite`, `font-display`,
`rounded-card`, `animate-marquee` etc.

### Fontes

Khand 500/600/700 (display), Oswald variável 300–600 (head), Poppins 300/400/500/600 (body), todas
por `next/font/google` (research R1). Sem Anton nesta versão.

### Escala tipográfica (utilitários de componente em `globals.css` via `@utility`)

| Token | Uso | Valor |
|---|---|---|
| `display-xl` | h1 hero | Khand 700, `clamp(3rem,8vw,6rem)`, lh **0.85**, uppercase, ls .005em |
| `display-l` | h2 da faixa WhatsApp / sobre | Khand 700, `clamp(2.8rem,6vw,4.5rem)`, lh **0.8**, uppercase |
| `h2` (`titulo-secao`) | títulos de seção | Khand 700, `clamp(2.2rem,5vw,3.6rem)`, lh 0.9, uppercase |
| `h3` | cards | Oswald 600, 1.18rem, lh 1.3 |
| `eyebrow` | acima dos títulos | Oswald 600, .78rem, uppercase, ls .22em, `--mostarda-texto` no claro / `--mostarda` no escuro, prefixo "✦" |
| `lead` | hero | Poppins 300, `clamp(1.05rem,1.6vw,1.22rem)`, lh 1.7, max 36ch |
| `body` | parágrafos | Poppins 300/400, 1rem, lh 1.8 (400 sobre mostarda) |
| `small` | cards/legendas | Poppins 400, .94rem, lh 1.65 |
| `nav` | links | Oswald 500, .86rem, uppercase, ls .08em |
| `botao` | CTA | Oswald 600, .98rem, uppercase, ls .04em |
| `missao` | frase da missão | Oswald 300, `clamp(1.35rem,3.2vw,2.35rem)`, lh 1.35 |

**Título em duas cores**: sobre mostarda → base branca + palavra em `--grafite`; sobre escuro →
base `--texto-escuro` + palavra em `--mostarda`; sobre bege → base `--grafite` + palavra em
`--mostarda-texto` (ou `--mostarda` se ≥ 24px, contraste de texto grande). Implementado pelo
componente `SectionHeading` (prop `destaque`).

### Espaçamentos e layout

Escala 4px (4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 104). Padding de seção `var(--sec-y)` (104 → 56).
Gap de grade 1.1–1.4rem. Cabeçalho de seção centralizado, max 640px, margem inferior
`clamp(2.2rem,5vw,3.4rem)`. Container `min(100% - 2.5rem, 1180px)`; missão max 880px.
**Breakpoints**: 980px (hamburguer; grades 4→2, 3→2, 2→1) e 560px (1 coluna; botões largura total).
No Tailwind v4: `--breakpoint-*: initial;` seguido de `--breakpoint-sm: 35rem` (560),
`--breakpoint-lg: 61.25rem` (980) e `--breakpoint-xl: 80rem` (1280). Mobile-first: base = < 560,
`sm:` ≥ 560, `lg:` ≥ 980. Ninguém usa `md:`/`2xl:`.

### Componentes (base e de seção)

- **Header sticky** 77px: transparente sobre o hero; ao rolar `rgba(26,22,20,.86)` + blur 12px +
  linha inferior. Monograma "DT" (SVG próprio, 42px) à esquerda; nav (gap 1.9rem, sublinhado
  mostarda 2px crescendo no hover) e CTA mostarda em pílula à direita. Mobile: hamburguer (3 barras
  26×2 que viram X) + painel escuro `rgba(26,22,20,.97)` com links grandes e divisórias, CTA
  largura total.
- **Button** (pílula 999px, padding `.85rem 1.6rem`, lg `1.05rem 2.1rem`): `primario` (mostarda
  sólida, texto `--noite`, `--sombra-mostarda`, hover -2px, seta anda 3px), `escuro` (`--noite`,
  texto `--mostarda-claro`), `ghost` (borda `rgba(255,255,255,.28)`, hover mostarda),
  `loja` (`--loja`, raio 10px, altura 52px, ícone + 2 linhas 10px/17px), `whatsapp`.
- **Card de serviço**: branco, raio 16, borda `rgba(0,0,0,.06)`, padding `1.7rem 1.5rem`, ícone
  56×56 em `--mostarda-soft`; hover: barra mostarda 3px no topo (`scaleX` 0→1), sobe 6px, ícone
  mostarda sólido. Preço em Oswald no canto; duração em `small`; link "Agendar este →".
- **Feature escura** (sobre): `--noite-2`, borda 1px `--linha-escura`, ícone 46×46, hover
  translateX 6px.
- **Tile de galeria**: 3:4, raio 16, legenda Oswald uppercase `--mostarda-claro` sobre gradiente
  preto na base, zoom 1.06 em 0.6s no hover.
- **Card de barbeiro**: foto 4:5 raio 16, nome Oswald, cargo `--muted`; fundador com borda
  mostarda 2px, anel `--mostarda-soft` e selo pílula "★ Fundador".
- **Depoimento**: card branco, ★★★★★ mostarda (`aria-label="5 de 5 estrelas"`), citação,
  "— NOME" em Oswald uppercase.
- **Marquee**: faixa `--mostarda` 51px com bordas `--mostarda-escuro`, texto `--noite` Oswald 600
  uppercase ls .12em, 22s linear, conteúdo duplicado com a cópia `aria-hidden`.
- **Faixa WhatsApp** (peça central): ver research R8 — `margin:120px 0 140px; padding:80px 0;
  overflow-x:clip`; grid `1fr 1.3fr`; título display-l branco com "DOM TOMÁS" em grafite; texto
  Poppins 400 15px lh 1.8 `--noite` max 460px; badges loja; `PhoneFrame` ×2 inclinados (-14° /
  +18°) vazando (`margin:-160px 0 -190px`); mobile ~160px abaixo do texto vazando só para baixo.
- **Sobre com sobreposição**: foto com bloco mostarda chapado deslocado atrás (translate 24px/24px).
- **Faixa CTA**: mostarda + `repeating-linear-gradient(45deg, rgba(26,22,20,.12) 0 22px,
  transparent 22px 44px)`; flex space-between; botão escuro com texto mostarda-claro.
- **Contato**: grid 2 colunas; lista com ícone + label Oswald mostarda uppercase + texto; mapa
  (imagem) raio 16 com `grayscale(.25)` e min-height 340px, link "Abrir no Google Maps".
- **Footer**: `--rodape`, grid `1.6fr 1fr 1fr 1.2fr`, h4 Oswald mostarda ls .1em, divisória,
  copyright .85rem e aviso de projeto fictício.
- **FAB WhatsApp**: 58px, `--whatsapp`, ícone branco, pulse 2.6s, fixo `right:20px bottom:20px`,
  `aria-label="Agendar pelo WhatsApp"`.

### Ordem das seções (page.tsx) e ritmo de fundos

| # | Seção (arquivo) | Âncora | Fundo |
|---|---|---|---|
| 1 | `Header` | — | transparente → noite translúcido |
| 2 | `Hero` | `#inicio` | `--noite` + glow mostarda + listras barber pole sutis |
| 3 | `Marquee` | — | `--mostarda` |
| 4 | `Servicos` | `#servicos` | `--bege-2` |
| 5 | `Sobre` | `#sobre` | `--noite` |
| 6 | `Missao` | — | gradiente `--noite`→`--noite-2` com glow mostarda |
| 7 | `Galeria` | `#galeria` | `--bege` |
| 8 | `FaixaWhatsApp` | `#agendar` | `--mostarda` entre `--bege` |
| 9 | `Equipe` + `Depoimentos` | `#equipe` | `--bege` (contínuo com a faixa WhatsApp) |
| 10 | `FaixaCta` | — | mostarda listrada |
| 11 | `Contato` | `#contato` | `--noite` |
| 12 | `Footer` + `WhatsAppFab` | — | `--rodape` |

### Movimento

`.reveal`: opacity 0 + translateY(26px) → visível em 0.7s `--ease` (variante `from-right`
translateX(40px) para os celulares). Hover botão -2px; hover card -6px. Marquee 22s linear.
`floaty` ±8px/6s no celular da frente; `bob` 1.8s na seta "ROLE"; `pulse` 2.6s no FAB. Tudo
desligado em `prefers-reduced-motion: reduce` (inclusive o marquee, diferente do Picadilly).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Como o plano cumpre | Status |
|---|---|---|
| I. Estático, sem backend | Nenhuma rota de API/form; `src/lib/whatsapp.ts` é a única fonte das URLs `wa.me` | ✅ |
| II. Fidelidade sem cópia | Tokens/tipografia/componentes transcritos da seção (c); textos, monograma, telas dos celulares e imagens próprios; hex só em tokens | ✅ |
| III. Acessibilidade/responsivo | Ajustes de contraste (R4), menu acessível (R7), skip link, reveal sem esconder sem JS (R5), `overflow-x:clip` na faixa (R8), checagem de scroll em 5 larguras | ✅ |
| IV. Performance/SEO | `next/font`, `next/image` com `sizes`, hero `fetchPriority="high"` (não `priority`), 3 Client Components, metadata + OG + JSON-LD BarberShop | ✅ |
| V. Conteúdo como dado, seções isoladas | `src/content/*` tipado; 1 arquivo por seção; só a integração edita `page.tsx`; manifesto de imagens como JSON único | ✅ |
| VI. Verificação visual | Playwright MCP 390/1440 por seção vs `docs/referencia/*`, lint e build por bloco | ✅ |
| VII. Simplicidade / Next real | Leitura obrigatória de `node_modules/next/dist/docs/` registrada acima; só `lucide-react` + `sharp` (dev) | ✅ |

**Re-check pós-design (Fase 1)**: data-model, contratos de UI e quickstart não introduzem backend,
dependências novas nem arquivos compartilhados entre blocos. ✅ Sem violações; Complexity Tracking
vazio.

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-dom-tomas/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── ui-components.md      # props dos componentes base e das seções
│   └── whatsapp-links.md     # contrato das URLs wa.me e mensagens
├── checklists/requirements.md
└── tasks.md                  # /speckit-tasks
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx            # fontes, metadata, <html lang="pt-BR">, script "js", skip link
│   ├── page.tsx              # monta as seções (só a tarefa de integração edita)
│   └── globals.css           # @theme (tokens, fontes, breakpoints, keyframes) + @utility
├── content/                  # dados tipados (fonte da verdade do conteúdo)
│   ├── types.ts
│   ├── site.ts               # marca, contato, horários, WhatsApp, redes, navegação
│   ├── servicos.ts
│   ├── equipe.ts
│   ├── depoimentos.ts
│   ├── sobre.ts              # parágrafos, features, missão
│   ├── galeria.ts
│   ├── secoes.ts             # textos de hero, faixas e cabeçalhos de seção
│   └── imagens.ts            # importa scripts/manifesto-imagens.json + alt
├── lib/
│   └── whatsapp.ts           # whatsappUrl(), mensagemServico(), mensagemBarbeiro()
├── components/
│   ├── ui/                   # fundação (compartilhado, só leitura para blocos)
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Reveal.tsx        # "use client"
│   │   ├── Logo.tsx          # monograma DT (SVG)
│   │   ├── icons.tsx         # WhatsApp, Instagram (SVG próprios)
│   │   └── JsonLd.tsx
│   └── sections/             # 1 dono por arquivo (blocos [P])
│       ├── Header.tsx        # "use client"
│       ├── MobileMenu.tsx    # "use client"
│       ├── Hero.tsx
│       ├── Marquee.tsx
│       ├── Servicos.tsx
│       ├── Sobre.tsx
│       ├── Missao.tsx
│       ├── Galeria.tsx
│       ├── FaixaWhatsApp.tsx
│       ├── PhoneMockups.tsx  # PhoneFrame + TelaConversa + TelaHorarios
│       ├── FaixaWhatsApp.module.css (opcional)
│       ├── Equipe.tsx
│       ├── Depoimentos.tsx
│       ├── FaixaCta.tsx
│       ├── Contato.tsx
│       ├── Footer.tsx
│       └── WhatsAppFab.tsx
public/images/                # 14 arquivos do manifesto (placeholders → finais)
scripts/
├── manifesto-imagens.json    # fonte única do manifesto
└── gerar-placeholders.mjs    # SVG → JPEG com sharp; não sobrescreve sem --force
docs/
├── referencia/               # (existente) screenshots e design-reference.md
├── verificacao/              # screenshots Playwright 390/1440 + Lighthouse
└── prompts-imagens.md        # prompts por imagem (tarefa final)
```

**Structure Decision**: projeto único Next.js com App Router em `src/`. Fundação em `app/`,
`content/`, `lib/`, `components/ui/`; seções isoladas em `components/sections/`, um arquivo (ou par)
por bloco paralelo. Arquivos padrão do create-next-app em `public/` (`file.svg`, `globe.svg`,
`next.svg`, `vercel.svg`, `window.svg`) são removidos na fundação.

## Complexity Tracking

Sem violações da constituição a justificar.
