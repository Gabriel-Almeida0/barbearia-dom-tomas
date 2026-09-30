# Research: Landing Dom Tomás Barbearia

Fase 0 do plano. Cada item: **Decisão**, **Racional**, **Alternativas**. As APIs do Next.js foram
conferidas no próprio pacote instalado (`node_modules/next/dist/docs/`, Next 16.3.7), não na memória.

> **Obrigatório para quem implementar**: antes de codar, leia
> `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`,
> `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`,
> `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`,
> `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`,
> `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`,
> `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` e
> `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`. O `AGENTS.md` avisa que esta versão
> quebra APIs.

---

## R1. Fontes com `next/font/google` (Next 16.3.7)

**Decisão**: carregar as três famílias em `src/app/layout.tsx` com a opção `variable` e ligar as
variáveis ao Tailwind v4 via `@theme inline` em `globals.css`.

- Pesos disponíveis, conferidos em `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`:
  - **Khand**: 300, 400, 500, 600, 700 (não variável; **não há 900**). Exige `weight` explícito:
    `weight: ['500','600','700']`.
  - **Oswald**: variável (wght 200–700). Pode omitir `weight`.
  - **Poppins**: 100–900, não variável. Usar `weight: ['300','400','500','600']`.
  - **Anton** (fallback opcional do display): só 400. **Não carregar** nesta versão (YAGNI); o
    peso visual do Seu Elias sai de Khand 700 + `-webkit-text-stroke` opcional (ver R3).
- Padrão documentado (font.md, seção "With Tailwind CSS"):

  ```tsx
  const khand = Khand({ subsets: ['latin'], weight: ['500','600','700'], display: 'swap', variable: '--font-khand' })
  const oswald = Oswald({ subsets: ['latin'], display: 'swap', variable: '--font-oswald' })
  const poppins = Poppins({ subsets: ['latin'], weight: ['300','400','500','600'], display: 'swap', variable: '--font-poppins' })
  // <html lang="pt-BR" className={`${khand.variable} ${oswald.variable} ${poppins.variable}`}>
  ```

  ```css
  @theme inline {
    --font-display: var(--font-khand), "Anton", sans-serif;
    --font-head: var(--font-oswald), sans-serif;
    --font-body: var(--font-poppins), system-ui, sans-serif;
  }
  ```
- `subsets: ['latin']` cobre acentos do português (á, ã, ç, ê, õ). `display` default já é
  `'swap'`; declarar explicitamente por clareza. `preload` default `true`.
- O `layout.tsx` gerado usa o tipo global `LayoutProps<"/">` (novo no Next 16); manter.

**Racional**: self-hosting (sem request ao Google em runtime), sem CLS, e integração oficial com
Tailwind v4.

**Alternativas**: `<link>` para fonts.googleapis.com (proibido pela constituição, pior LCP);
`next/font/local` (desnecessário, Google tem as três).

## R2. Imagens com `next/image` (Next 16.3.7)

**Decisão**: `src` como **string** do manifesto (`/images/hero.jpg`) + `width`/`height` do manifesto
(ou `fill` + `sizes` dentro de caixa com `aspect-ratio`). Nada de import estático.

- Conferido em `image.md`:
  - **`priority` está depreciado no Next 16**, substituído por `preload`. A doc recomenda, na maioria
    dos casos, `loading="eager"` ou `fetchPriority="high"` em vez de `preload`. **Uso no hero:**
    `fetchPriority="high"` + `loading="eager"`. Nenhuma outra imagem recebe prioridade.
  - `loading` default é `lazy`.
  - `quality` default 75; `images.qualities` em `next.config` default `[75]` — valores fora da lista
    são coeridos. Não mudar (75 é suficiente).
  - Com `fill`, `sizes` é obrigatório na prática (sem ele o navegador assume `100vw`).
  - `onLoadingComplete` depreciado (usar `onLoad`, se precisar).
  - `alt=""` para imagem decorativa.
- `sizes` por uso: hero `(max-width: 979px) 72vw, 480px`; sobre `(max-width: 979px) 100vw, 560px`;
  galeria `(max-width: 979px) 50vw, 380px`; barbeiro `(max-width: 979px) 50vw, 280px`; mapa
  `(max-width: 979px) 100vw, 560px`.
- **Por que string e não import estático**: o manifesto é um contrato de caminho fixo; trocar o
  arquivo final não deve exigir alterar código (SC-007). Com import estático o arquivo também é
  trocável, mas o caminho vira detalhe de bundler e o `placeholder="blur"` automático some da
  comparação. Blur não é necessário: o fundo do contêiner usa a cor do token (`--noite-2` ou
  `--bege-2`) enquanto carrega.
- **Cache do otimizador**: ao trocar placeholders por imagens finais com o mesmo nome, apagar
  `.next/cache/images` (ou reiniciar `next dev`) para não ver a versão antiga.

**Alternativas**: `<img>` puro (perde srcset/AVIF/WebP e gera aviso do ESLint do Next);
`unoptimized` (piora Lighthouse).

## R3. Peso do título "900" do Seu Elias com Khand 700

**Decisão**: Khand 700, `line-height` 0.8–0.85, `letter-spacing: .005em`, e utilitário opcional
`.text-stroke` (`-webkit-text-stroke: .5px currentColor; paint-order: stroke fill`) só nos títulos
display-xl e display-l.

**Racional**: a Khand não tem 900 no Google Fonts; o "900" do Seu Elias é negrito sintético. O
stroke fino imita o peso sem negrito sintético borrado.

**Alternativas**: Anton nos títulos (mais pesada e menos "quadrada", foge da pele do Seu Elias);
`font-synthesis` (renderização inconsistente).

## R4. Contraste da paleta (WCAG 2.1 AA) — ajustes aos tokens da referência

Razões calculadas pela fórmula de luminância relativa (arredondadas; conferir com ferramenta no
build):

| Par | Razão | Resultado | Uso permitido |
|---|---|---|---|
| Branco sobre `--mostarda` #E8B330 | ≈ 3,5:1 | AA só texto grande | Título display da faixa (branco) |
| `--grafite` #3F3634 sobre mostarda | ≈ 3,4:1 | AA só texto grande | Palavra destacada do título |
| `--noite` #1A1614 sobre mostarda | ≈ 5,2:1 | AA | **Texto corrido, botões, marquee sobre mostarda** |
| `--mostarda` sobre `--noite` | ≈ 5,2:1 | AA | Eyebrow, destaques e links no escuro |
| `--mostarda-escuro` #B98A1C sobre `--bege` | ≈ 2,3:1 | **Reprovado** | Só decoração (ícones, barras) |
| **`--mostarda-texto` #7A5A0E** sobre `--bege` | ≈ 4,7:1 | AA | **Eyebrow e texto mostarda sobre claro (token novo)** |
| `--muted` #6E6560 (ref.) sobre `--bege` | ≈ 4,3:1 | **Reprovado** | — |
| **`--muted` #5F5752 (ajustado)** sobre `--bege` | ≈ 5,2:1 | AA | Texto secundário no claro |
| `--muted-escuro` #B5ABA2 sobre `--noite` | ≈ 7,9:1 | AA | Texto secundário no escuro |
| Branco sobre `#25D366` (WhatsApp) | ≈ 1,9:1 | **Reprovado** (1.4.11) | — |
| **Branco sobre `--whatsapp` #1E9E4F** | ≈ 3,5:1 | AA para ícone (≥3:1) | FAB e badge do WhatsApp |

**Decisão**: adicionar `--mostarda-texto:#7A5A0E`, trocar `--muted` para `#5F5752`, definir
`--whatsapp:#1E9E4F` / `--whatsapp-hover:#17843F`, e usar `--noite` (não grafite) para texto de
corpo e rótulos de botão sobre mostarda. Corpo sobre mostarda em Poppins **400** (300 fica fino
demais em 15px sobre cor saturada).

**Racional**: mantém a pele visual (a mudança é imperceptível lado a lado) e cumpre o princípio III.

**Alternativas**: seguir literalmente a referência (reprova Lighthouse/axe).

## R5. Animação de entrada (reveal) sem esconder conteúdo sem JS

**Decisão**: componente cliente `Reveal` com IntersectionObserver (`threshold: .15`,
`rootMargin: '0px 0px -8% 0px'`, desconecta após revelar). CSS esconde apenas quando o `<html>`
tem a classe `js`, adicionada por um script inline mínimo no `<head>` do layout
(`document.documentElement.classList.add('js')`). Sob `prefers-reduced-motion: reduce`, `.reveal`
fica visível sem transição. O hero **não** usa Reveal (é LCP).

**Racional**: sem JS nada fica invisível; sem flash de conteúdo com JS.

**Alternativas**: libs (framer-motion, AOS) — proibidas pela constituição; CSS `animation-timeline:
view()` — suporte ainda irregular no Safari.

## R6. Header transparente → escuro ao rolar

**Decisão**: `Header` é Client Component; um elemento sentinela de 1px renderizado pelo próprio Header (`position:absolute; top:100px`) é observado
por IntersectionObserver; quando sai da tela, `data-stuck="true"` no header aplica
`bg-[rgba(26,22,20,.86)] backdrop-blur-md border-b`. Hero usa `-mt-[77px]` (altura do header) e
`pt` compensando. Âncoras usam `scroll-margin-top: 90px` (utilitário global `section[id]`).
`html { scroll-behavior: smooth }` só dentro de `@media (prefers-reduced-motion: no-preference)`.

**Alternativas**: listener de `scroll` com throttle (mais JS, mais trabalho no main thread).

## R7. Menu mobile acessível

**Decisão**: `MobileMenu` (cliente) com botão `aria-expanded`/`aria-controls="menu-mobile"`,
`aria-label` alternando "Abrir menu"/"Fechar menu"; painel `id="menu-mobile"` com `role="dialog"`
`aria-modal="true"` e `aria-label="Menu"`; foco vai ao primeiro link; Tab fica preso no painel;
Esc fecha e devolve foco ao botão; `document.body.style.overflow='hidden'` enquanto aberto; fecha ao
clicar em link e ao passar de 980px (matchMedia). Painel `rgba(26,22,20,.97)`, links Khand/Oswald
grandes com divisórias de 1px, CTA de largura total.

## R8. Faixa "Agende pelo WhatsApp" — celulares vazando sem scroll horizontal

**Decisão**:
- Seção com `overflow-x: clip` (não `hidden`) e `overflow-y: visible`: `clip` não cria contêiner
  de rolagem, então o vazamento vertical continua visível e o horizontal é cortado sem scroll.
- Desktop (≥ 980px): grid `1fr 1.3fr`; coluna de celulares com `margin: -160px 0 -190px`; dois
  `PhoneFrame` (largura ~230px, `aspect-ratio: 9/19.5`, raio 36px, borda 10px `#111`, sombra
  `0 30px 60px -20px rgba(0,0,0,.45)`), o de trás `rotate(18deg) translate(40%,-8%)`, o da frente
  `rotate(-14deg)`, `z-index` maior. Margem da seção `120px 0 140px`, padding `80px 0`.
- Mobile (< 980px): coluna única; celulares ~160px abaixo do texto, `margin-bottom: -120px`
  (vazam só para baixo); margem inferior da seção aumenta para acomodar.
- Telas: HTML/CSS próprios. Tela 1 "WhatsApp": barra verde com monograma e "Dom Tomás Barbearia ·
  online", balões (cliente: "Oi! Tem horário sábado de manhã?"; barbearia: "Tem sim! 9h, 10h30 ou
  11h. Qual prefere?"; cliente: "10h30, corte + barba 💈"; barbearia: "Fechado, Lucas! Te esperamos
  ✂️"), campo de digitação falso. Tela 2 "Horários": cabeçalho mostarda "Sábado, 12", lista de
  serviços com preço e chips de horário (livre/ocupado). Ambas `aria-hidden="true"`; o texto
  equivalente está no parágrafo da faixa.
- Badges "loja": `<a>` preto `#111`, raio 10px, altura 52px, ícone SVG à esquerda + 2 linhas
  ("Chamar no" 10px / "WhatsApp" 17px semibold; "Siga no" / "Instagram"), gap 20px.
- Entrada: `Reveal` com variação `from-right`; flutuação opcional ±8px/6s no celular da frente,
  desligada com movimento reduzido.

## R9. Links do WhatsApp

**Decisão**: `src/lib/whatsapp.ts` exporta `whatsappUrl(mensagem?: string)` →
`https://wa.me/5531995550142?text=${encodeURIComponent(mensagem)}` e helpers
`mensagemServico(nome)`, `mensagemBarbeiro(nome)`. Todos os links: `target="_blank"`
`rel="noopener noreferrer"`. `wa.me` resolve para app no celular e WhatsApp Web no desktop.

**Alternativas**: `api.whatsapp.com/send` (equivalente, URL mais longa).

## R10. Ícones

**Decisão**: `lucide-react` para ícones genéricos (Scissors, Clock, MapPin, Phone, Star, Menu, X,
ArrowRight, ChevronDown, Coffee, Sparkles, Droplets, Baby, Eye, Brush, CalendarCheck).
**Marcas (WhatsApp, Instagram) em SVG inline próprio** em `src/components/ui/icons.tsx`, porque o
lucide removeu ícones de marca. Monograma "DT" em SVG próprio (`src/components/ui/Logo.tsx`).

## R11. Placeholders de imagem

**Decisão**: `scripts/gerar-placeholders.mjs` (Node) lê o manifesto (`src/content/imagens.ts` é TS;
o script mantém uma cópia JSON-like simples ou lê `scripts/manifesto-imagens.json`, ver data-model),
gera um SVG por imagem (fundo em gradiente `--noite-2`→`--grafite` com faixa mostarda, nome do
arquivo, dimensão e uso em texto) e converte para JPEG com **sharp**.

- Conferido na máquina: **ImageMagick não está instalado** (`magick`/`convert` ausentes),
  `rsvg-convert` ausente; **`sips` existe** e converte SVG→JPEG; **`sharp` está disponível**
  (dependência opcional do Next em `node_modules/sharp`, binário `@img/sharp-darwin-arm64`).
- Adicionar `sharp` como `devDependency` explícita para não depender de dependência transitiva.
  Fallback documentado: `sips -s format jpeg in.svg --out out.jpg` (só macOS).
- Não sobrescreve arquivos existentes; `--force` regenera. Script npm: `"placeholders": "node
  scripts/gerar-placeholders.mjs"`.
- Fonte única do manifesto: `scripts/manifesto-imagens.json` (lido pelo script) e
  `src/content/imagens.ts` importa esse JSON (`resolveJsonModule` já vem ativo no tsconfig do
  create-next-app), evitando duas listas.

## R12. SEO: metadata, Open Graph e JSON-LD

**Decisão**:
- `export const metadata: Metadata` no `layout.tsx` com `metadataBase: new URL('https://domtomas.vercel.app')`
  (provisório), `title` ("Dom Tomás Barbearia | Corte e barba em Belo Horizonte"), `description`,
  `openGraph` (type website, locale pt_BR, siteName, `images: ['/images/og.jpg']` 1200×630),
  `twitter` (summary_large_image), `alternates.canonical: '/'`, `icons`.
  `metadataBase` é necessário para URLs relativas de OG (generate-metadata.md).
- JSON-LD conforme `02-guides/json-ld.md`: `<script type="application/ld+json">` renderizado em
  `page.tsx` (ou componente `JsonLd`), com `JSON.stringify(data).replace(/</g, '\\u003c')`.
  Tipo `BarberShop` (subtipo de LocalBusiness): name, image, url, telephone, priceRange "R$ 20–90",
  address (PostalAddress), geo aproximado da Savassi, openingHoursSpecification (Ter–Sex 09:00–20:00,
  Sáb 08:00–18:00), sameAs (Instagram fictício).
- Alternativa `opengraph-image.jpg` como convenção de arquivo em `src/app/`: rejeitada para manter
  todas as imagens no manifesto em `public/images/`.

## R13. Verificação visual (Playwright)

**Decisão**: usar as ferramentas **Playwright MCP** disponíveis aos agentes (`browser_navigate`,
`browser_resize`, `browser_take_screenshot`, `browser_evaluate`) contra `next start` (build de
produção) em `http://localhost:3000`. Viewports 390×844 e 1440×900; full page e por seção
(`#servicos`, etc.). Salvar em `docs/verificacao/{390|1440}-{secao}.png` e comparar lado a lado
com `docs/referencia/picadilly-*` / `seuelias-*`. Checagens via `browser_evaluate`:
`document.documentElement.scrollWidth <= innerWidth` em 360/390/768/1024/1440; nenhum erro em
`browser_console_messages`.

- Conferido: não há `@playwright/test` no projeto; existe CLI Python do Playwright global, mas sem
  browsers do Playwright instalados (só perfis do MCP). O MCP é o caminho sem instalação.
- Lighthouse: `npx -y lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=docs/verificacao/lighthouse-mobile.html`
  (baixa o pacote na hora; opcional se sem rede — então usar o painel do Chrome).

## R14. Organização para trabalho paralelo

**Decisão**: fundação sequencial cria tokens, keyframes e utilitários **todos** em `globals.css`,
conteúdo em `src/content/`, UI base em `src/components/ui/`, helpers em `src/lib/`. Depois, cada
bloco de seção é dono exclusivo de seus arquivos em `src/components/sections/` (e de um
`*.module.css` próprio, se precisar de CSS que não cabe em utilitários). Blocos **não** editam
`globals.css`, `src/content/*`, `src/components/ui/*` nem `page.tsx`. Se um bloco descobrir falta
num arquivo compartilhado, registra em `specs/001-landing-dom-tomas/pendencias.md` e a tarefa de
integração resolve.

**Racional**: elimina conflitos de edição entre agentes.
