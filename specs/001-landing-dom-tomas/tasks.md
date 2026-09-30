---

description: "Tarefas de implementação da landing Dom Tomás Barbearia"
---

# Tasks: Landing one-page da Dom Tomás Barbearia

**Input**: Design documents from `/specs/001-landing-dom-tomas/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: a spec não pede testes automatizados. A validação é por lint, build, Playwright MCP
(390/1440 vs `docs/referencia/`) e Lighthouse — tarefas de verificação estão em cada bloco e na
Fase 5.

**Organization**: por decisão do dono, depois da fundação o trabalho é dividido em **blocos de
seção independentes** (B1–B8), cada um dono exclusivo dos seus arquivos em
`src/components/sections/`, para que agentes diferentes trabalhem em paralelo. Cada bloco leva o
rótulo da user story que ele mais atende (mapa na seção Dependencies).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência de tarefa incompleta)
- **[Story]**: US1–US6 da spec
- Caminhos relativos à raiz `/Users/gabrielalmeidasantosmelo/projetos/barbearia-dom-tomas`

## Regras para TODOS os agentes (ler antes de começar)

1. **Next.js 16.3.7 quebra APIs.** Antes de codar, ler em `node_modules/next/dist/docs/`:
   `01-app/03-api-reference/02-components/font.md`, `01-app/03-api-reference/02-components/image.md`,
   `01-app/01-getting-started/14-metadata-and-og-images.md`, `01-app/02-guides/json-ld.md`.
   `priority` de `next/image` está **depreciado** → usar `fetchPriority="high"` + `loading="eager"`
   só no hero. Resumo em `research.md` (R1, R2, R12).
2. Fonte da verdade visual: `plan.md` → "Sistema visual" (transcrição da seção (c) de
   `docs/referencia/design-reference.md`) com os ajustes de contraste de `research.md` R4
   (texto/botão sobre mostarda = `text-noite`; eyebrow no claro = `text-mostarda-texto`).
3. **Blocos não editam arquivos compartilhados**: `src/app/*`, `src/content/*`, `src/lib/*`,
   `src/components/ui/*`, `package.json`. Faltou algo? Anotar em
   `specs/001-landing-dom-tomas/pendencias.md` (uma linha por item, com o ID do bloco) e seguir; a
   integração (T051) resolve. CSS que não cabe em utilitários vai num `*.module.css` do próprio bloco.
4. **Servidor compartilhado**: um único `npm run dev` na porta 3000, iniciado em T026. Agentes de
   bloco **não** rodam `next build`/`next dev` próprios (conflito em `.next/`). Checagem por bloco:
   `npx eslint <arquivos do bloco>` e `npx tsc --noEmit`.
5. Verificação visual por bloco com Playwright MCP em 390×844 e 1440×900; salvar em
   `docs/verificacao/{390|1440}-{secao}.png`; comparar com os PNGs de referência indicados.
6. Nada de texto, logo, foto ou mockup dos sites de referência. Textos vêm de `src/content/`.
7. Sem `git commit` (o dono faz os commits).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: dependências, limpeza do template e placeholders de imagem.

- [X] T001 Instalar `lucide-react` (dependency) e `sharp` (devDependency) e adicionar o script `"placeholders": "node scripts/gerar-placeholders.mjs"` em `package.json`
- [X] T002 Remover `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`; criar pastas `public/images/`, `src/content/`, `src/lib/`, `src/components/ui/`, `src/components/sections/`, `docs/verificacao/`, `scripts/`
- [X] T003 [P] Ler os guias do Next listados em "Regras para TODOS os agentes" (item 1) e registrar em `specs/001-landing-dom-tomas/pendencias.md` qualquer divergência encontrada em relação a `research.md` (se nenhuma, escrever "Sem divergências — conferido em <data>")
- [X] T004 [P] Criar `scripts/manifesto-imagens.json` com os 14 itens `{ id, arquivo, largura, altura, proporcao, uso }` exatamente como a tabela "Manifesto de imagens" de `data-model.md` (hero 1200×1500 4:5; sobre 1200×900 4:3; galeria-01…06 900×1200 3:4; barbeiro-tomas/rafael/diego/caio 800×1000 4:5; mapa 1200×900 4:3; og 1200×630 1.91:1)
- [X] T005 Criar `scripts/gerar-placeholders.mjs` (ESM, Node 22) que lê `scripts/manifesto-imagens.json`, monta um SVG por item (gradiente `#231E1B`→`#3F3634`, faixa diagonal `#E8B330`, textos "DOM TOMÁS · PLACEHOLDER", nome do arquivo, `LxA`, uso) e converte para JPEG qualidade 82 com `sharp` em `public/images/<arquivo>`; **pula arquivos existentes** e aceita `--force`; fallback documentado em comentário: `sips -s format jpeg in.svg --out out.jpg`. Rodar `npm run placeholders` e conferir dimensões com `sips -g pixelWidth -g pixelHeight`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: tokens, fontes, conteúdo, helpers, componentes base e esqueleto da página. **Nenhum
bloco começa antes do checkpoint T026.**

### Estilo global

- [X] T006 Reescrever `src/app/globals.css`: `@import "tailwindcss"`; `@theme` com todas as cores de `plan.md` → Tokens (`--color-mostarda` … `--color-whatsapp-hover`, incluindo ★ `--color-mostarda-texto:#7A5A0E`, `--color-muted:#5F5752`, `--color-whatsapp:#1E9E4F`, `--color-loja:#111111`), `--radius-card:16px`, `--radius-card-sm:10px`, sombras (`--shadow-card`, `--shadow-marca`, `--shadow-mostarda`), `--ease-marca`, `--breakpoint-*: initial` + `sm 35rem`, `lg 61.25rem`, `xl 80rem`, animações `--animate-marquee` (22s linear infinite, translateX(-50%)), `--animate-floaty` (6s ±8px), `--animate-bob` (1.8s), `--animate-pulse-wa` (2.6s) com `@keyframes` dentro do `@theme`; `@theme inline` com `--font-display/head/body` apontando para `--font-khand/oswald/poppins`; `@utility` para `display-xl`, `display-l`, `titulo-secao`, `eyebrow`, `lead`, `texto`, `texto-sm`, `nav-link`, `texto-botao`, `texto-missao`, `text-stroke`, `secao`, `container-site` com os valores da tabela "Escala tipográfica" do plano; base: `body` bege + Poppins + `--grafite`; `:focus-visible` (anel 3px mostarda, offset 3px; em fundo mostarda anel `--noite`); `section[id]{scroll-margin-top:90px}`; `scroll-behavior:smooth` só em `prefers-reduced-motion: no-preference`; `.js .reveal{opacity:0;transform:translateY(26px)}`, `.js .reveal-direita{opacity:0;transform:translateX(40px)}`, `.is-visible{opacity:1;transform:none;transition:.7s var(--ease-marca)}`; bloco `@media (prefers-reduced-motion: reduce)` zerando animações/transições e mostrando `.reveal`; classe `.skip-link` (oculta até foco)

### Conteúdo tipado (`src/content/`)

- [X] T007 Criar `src/content/types.ts` com os tipos de `data-model.md` (`Site`, `Horario`, `Servico` com "descricao ≤ 90 caracteres", "duracaoMin > 0", "preco inteiro > 0", `IconeServico`, `Barbeiro` com "exatamente 1 fundador", `Depoimento`, `Feature`, `ItemGaleria`, `ImagemId`, `Imagem`)
- [X] T008 [P] Criar `src/content/site.ts` com os dados fictícios da spec (endereço Rua do Ofício, 214 — Savassi, CEP 30140-000; telefone `(31) 99555-0142` / `+5531995550142`; WhatsApp `5531995550142` e mensagem padrão "Olá! Quero agendar um horário na Dom Tomás."; Instagram `@domtomas.barbearia` → `https://instagram.com/domtomas.barbearia`; e-mail; horários Ter–Sex 09:00–20:00, Sáb 08:00–18:00, Dom/Seg fechado; avaliação 4,9; `urlBase` `https://domtomas.vercel.app`; `navegacao` Serviços `#servicos`, A Barbearia `#sobre`, Galeria `#galeria`, Equipe `#equipe`, Contato `#contato`; `aviso` de projeto fictício; `mapsUrl` de `contracts/whatsapp-links.md`)
- [X] T009 [P] Criar `src/content/servicos.ts` com os 8 serviços da tabela da spec, na mesma ordem, ids em slug e `icone` de `IconeServico`
- [X] T010 [P] Criar `src/content/equipe.ts` com Tomás Andrade (fundador, primeiro), Rafael Couto, Diego Lanza, Caio Mendes, cargos/especialidades da spec e `imagem` `barbeiro-<id>`
- [X] T011 [P] Criar `src/content/depoimentos.ts` com os 3 depoimentos da spec (nota 5)
- [X] T012 [P] Criar `src/content/sobre.ts` com `sobre` (eyebrow, título/destaque, 2 parágrafos, 4 features: Navalha e toalha quente, Horário respeitado, Produtos de primeira, Café e boa conversa) e `missao` (antes/destaque/depois da frase da spec)
- [X] T013 [P] Criar `src/content/galeria.ts` com 6 itens galeria-01…06 e legendas Degradê, Barba na navalha, Corte clássico, Ferramentas, Ambiente, Acabamento
- [X] T014 [P] Criar `src/content/secoes.ts` com todos os textos de seção listados em `data-model.md` → "Textos de seção" (hero, marquee, servicosHead, galeriaHead, faixaWhatsApp com badges, equipeHead, depoimentosHead, faixaCta, contatoHead, footer)
- [X] T015 [P] Criar `src/content/imagens.ts` que importa `scripts/manifesto-imagens.json`, monta `imagens: Record<ImagemId, Imagem>` com `src: /images/<arquivo>` e acrescenta `alt` em pt-BR descritivo para cada imagem (og com alt de marca)

### Helpers e componentes base

- [X] T016 Criar `src/lib/whatsapp.ts` com `whatsappUrl(msg?)`, `mensagemServico(servico)`, `mensagemBarbeiro(barbeiro)` e constante `linkExterno = { target: '_blank', rel: 'noopener noreferrer' }`, conforme `contracts/whatsapp-links.md` (depende de T008)
- [X] T017 [P] Criar `src/components/ui/icons.tsx` com `IconeWhatsApp` e `IconeInstagram` em SVG próprio (`currentColor`, `aria-hidden` por padrão)
- [X] T018 [P] Criar `src/components/ui/Logo.tsx`: monograma "DT" circular em SVG desenhado do zero (anel duplo, "DT" em traço condensado, "BARBEARIA · 2014" em arco ou linha), props de `contracts/ui-components.md`, `role="img"` + `aria-label="Dom Tomás Barbearia"`
- [X] T019 [P] Criar `src/components/ui/Container.tsx` conforme contrato (`min(100% - 2.5rem, 1180px)`, `estreito` = 880px)
- [X] T020 [P] Criar `src/components/ui/Reveal.tsx` (`"use client"`): IntersectionObserver `threshold .15`, `rootMargin '0px 0px -8% 0px'`, adiciona `is-visible` e desconecta; aplica `reveal` ou `reveal-direita`; `atraso` via `transition-delay` 90ms × n; sem efeito se `prefers-reduced-motion`
- [X] T021 Criar `src/components/ui/Button.tsx` com `Button` (variantes `primario` mostarda + `text-noite` + `shadow-mostarda` + hover -2px e seta +3px; `escuro` noite + `text-mostarda-claro`; `ghost` borda `rgba(255,255,255,.28)` hover mostarda; `whatsapp`), tamanhos md/lg, `larguraTotalMobile`, e `BotaoLoja` (preto `bg-loja`, raio 10px, altura 52px, ícone 26px + linhas 10px/17px semibold, externo) conforme `contracts/ui-components.md` (depende de T016, T017)
- [X] T022 [P] Criar `src/components/ui/SectionHeading.tsx`: eyebrow com "✦", título com `destaque` em outra cor por `tom` (mostarda: base branca/destaque `grafite`; escuro: base `texto-escuro`/destaque `mostarda`; claro: base `grafite`/destaque `mostarda-texto`), tamanhos `secao`/`display-l`/`display-xl`, `nivel` h1/h2, alinhamento, subtítulo max 640px, margem inferior `clamp(2.2rem,5vw,3.4rem)`
- [X] T023 [P] Criar `src/components/ui/JsonLd.tsx` que gera o JSON-LD `BarberShop` a partir de `site`, `servicos` (priceRange "R$ 20–90" calculado) e `imagens.og`, serializado com `.replace(/</g,'\\u003c')` (ver `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`)
- [X] T024 Reescrever `src/app/layout.tsx`: `Khand` (`weight ['500','600','700']`), `Oswald` (variável), `Poppins` (`weight ['300','400','500','600']`) de `next/font/google` com `subsets ['latin']`, `display 'swap'`, `variable '--font-khand' | '--font-oswald' | '--font-poppins'`; `<html lang="pt-BR">` com as classes de variável; `<head>` com script inline `document.documentElement.classList.add('js')`; `metadata` com `metadataBase`, title, description, `openGraph` (pt_BR, website, `/images/og.jpg` 1200×630), `twitter` summary_large_image, `alternates.canonical '/'`; link `.skip-link` "Pular para o conteúdo" → `#conteudo`; `<JsonLd />`; manter tipo `LayoutProps<"/">`
- [X] T025 Criar **stubs** de todas as seções em `src/components/sections/` (`Header`, `MobileMenu`, `Hero`, `Marquee`, `Servicos`, `Sobre`, `Missao`, `Galeria`, `FaixaWhatsApp`, `PhoneMockups`, `Equipe`, `Depoimentos`, `FaixaCta`, `Contato`, `Footer`, `WhatsAppFab`), cada um exportando o componente com o elemento raiz, `id` e fundo do contrato e um texto "TODO <Nome>", e escrever `src/app/page.tsx` **provisório** montando tudo na ordem do plano dentro de `<main id="conteudo">` (Header antes do main; Footer e FAB depois). Assim cada bloco vê sua seção no contexto sem editar `page.tsx`
- [X] T026 Checkpoint da fundação: `npm run lint`, `npm run build` sem erros; subir `npm run dev` na porta 3000 (fica rodando para todos os blocos); screenshot 390 e 1440 em `docs/verificacao/000-fundacao-{390|1440}.png`

**Checkpoint**: fundação pronta — os blocos B1–B8 podem começar em paralelo.

---

## Phase 3: Blocos de seção em paralelo

Cada bloco = um agente. Tarefas de implementação do bloco são `[P]` entre blocos; a tarefa de
verificação de cada bloco depende só das tarefas do próprio bloco.

### Bloco B1 — Header + MobileMenu (US5, atende US1) · arquivos: `src/components/sections/Header.tsx`, `src/components/sections/MobileMenu.tsx`

- [X] T027 [P] [US5] Implementar `src/components/sections/Header.tsx` (`"use client"`): `<header>` sticky top-0 z-50, altura 77px, transparente; observa sentinela (um `<span>` de 1px criado pelo próprio Header logo abaixo dele, `position:absolute; top:100px`) e aplica `data-stuck` → `bg-[rgba(26,22,20,.86)] backdrop-blur-md border-b border-linha-escura`; `Logo` 42px à esquerda (link `#inicio`); `<nav aria-label="Principal">` com `site.navegacao` (classe `nav-link`, `text-texto-escuro`, gap 1.9rem, sublinhado mostarda 2px crescendo 0→100% no hover/focus) e `Button primario` "Agendar horário" externo com `whatsappUrl()`; abaixo de `lg` esconde nav/CTA e renderiza `MobileMenu`. Referência: `docs/referencia/picadilly-1440-hero.png` (topo), `picadilly-1440-header-stuck.png`
- [X] T028 [P] [US5] Implementar `src/components/sections/MobileMenu.tsx` (`"use client"`): botão 44×44 com 3 barras 26×2 que viram X, `aria-expanded`, `aria-controls="menu-mobile"`, `aria-label` Abrir/Fechar menu; painel `id="menu-mobile"` `role="dialog"` `aria-modal="true"` fixo abaixo do header, `bg-[rgba(26,22,20,.97)]`, links grandes (`font-display` ~2rem uppercase) separados por linhas 1px `border-linha-escura`, CTA primário largura total (fecha o menu ao clicar); foco no primeiro link ao abrir, Tab preso, Esc fecha e devolve foco, `body` sem rolagem enquanto aberto, fecha em ≥ 980px via `matchMedia`. Referência: `docs/referencia/picadilly-390-menu.png`, `picadilly-390-header-stuck.png`
- [X] T029 [US5] Verificar B1: `npx eslint src/components/sections/Header.tsx src/components/sections/MobileMenu.tsx`, `npx tsc --noEmit`; Playwright 390 (menu fechado, aberto, após rolar) e 1440 (topo e após rolar) → `docs/verificacao/{390|1440}-header*.png`; teclado: Tab/Enter/Esc conforme US5 cenário 2

### Bloco B2 — Hero + Marquee (US1) · arquivos: `src/components/sections/Hero.tsx`, `src/components/sections/Marquee.tsx`

- [X] T030 [P] [US1] Implementar `src/components/sections/Hero.tsx`: `<section id="inicio">` `bg-noite`, `-mt-[77px] pt-[77px]`, min-h `92svh`; fundo com radial mostarda suave no topo direito, textura de pontos 4px e faixa vertical de listras diagonais "barber pole" mostarda a ~6% de opacidade perto da borda direita (tudo CSS, `aria-hidden`); grid `lg:grid-cols-[1.15fr_.85fr]`; esquerda: eyebrow `secoes.hero.eyebrow` em `text-mostarda`, **único `<h1>`** `display-xl` com linha 1 `text-texto-escuro` e linha 2 `text-mostarda`, `lead` `text-muted-escuro` max 36ch, `Button primario lg` "Agendar horário" + seta e `Button ghost lg` com ícone WhatsApp (ambos `whatsappUrl()`, externos, `larguraTotalMobile`), linha de confiança (★ mostarda); direita: `next/image` `imagens.hero` (1200×1500, `sizes="(max-width: 979px) 72vw, 480px"`, **`fetchPriority="high"` + `loading="eager"`**, sem `priority`) com raio 16 e bloco `bg-mostarda` chapado deslocado atrás (translate 24px/24px); "ROLE ↓" centralizado na base com `animate-bob`. Mobile: coluna única centralizada, foto em cima (72% da largura), botões empilhados largura total. Sem `Reveal` no hero. Referência: `docs/referencia/picadilly-1440-hero.png`, `picadilly-390-hero.png`
- [X] T031 [P] [US1] Implementar `src/components/sections/Marquee.tsx`: faixa `bg-mostarda` 51px, bordas top/bottom `border-mostarda-escuro`, `overflow-hidden`; trilho com os itens de `secoes.marquee` separados por "✦", duplicado (cópia `aria-hidden="true"`), `animate-marquee`, texto `text-noite` Oswald 600 uppercase `tracking-[.12em]`; parado com movimento reduzido. Referência: `docs/referencia/picadilly-1440-strip.png`, `picadilly-390-strip.png`
- [X] T032 [US1] Verificar B2: eslint dos 2 arquivos + `tsc --noEmit`; Playwright 390/1440 → `docs/verificacao/{390|1440}-hero.png`, `{390|1440}-marquee.png`; conferir que o hero cabe sem scroll horizontal em 360 e que os 2 CTAs têm `href` `wa.me` correto

### Bloco B3 — Serviços (US2, atende US1) · arquivo: `src/components/sections/Servicos.tsx`

- [X] T033 [P] [US2] Implementar `src/components/sections/Servicos.tsx`: `<section id="servicos" aria-labelledby>` `bg-bege-2` `secao`; `SectionHeading` tom claro com `secoes.servicosHead`; `<ul>` grade `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.1rem]` com 8 cards (`<li><article>`): branco, `rounded-card`, borda `rgba(0,0,0,.06)`, padding `1.7rem 1.5rem`, `shadow-card`; ícone lucide (mapa `IconeServico` → Scissors, Slice/Brush, Combine, Layers, Ruler, Eye, Droplets, Baby — escolher equivalentes existentes no lucide) em quadrado 56×56 `bg-mostarda-soft` `text-mostarda-texto` raio 12; `h3` Oswald 600; descrição `texto-sm text-muted`; rodapé do card com duração ("45 min", ícone Clock) e preço `R$ 55` em Oswald 600 `text-grafite`; link "Agendar este →" (`whatsappUrl(mensagemServico(s))`, externo, `aria-label="Agendar <nome> pelo WhatsApp"`). Hover/focus-within: barra mostarda 3px no topo (`scaleX` 0→1), sobe 6px, `shadow-marca`, ícone fica `bg-mostarda text-noite`. Abaixo: nota centralizada e `Button escuro` "Ver horários no WhatsApp". Cards com `Reveal` (atraso escalonado). Referência: `docs/referencia/picadilly-1440-servicos.png`, `picadilly-390-servicos.png`
- [X] T034 [US2] Verificar B3: eslint + `tsc --noEmit`; Playwright 390 (1 col), 768 (2 col), 1440 (4 col) → `docs/verificacao/{390|1440}-servicos.png`; conferir as 8 mensagens decodificadas contra `contracts/whatsapp-links.md`

### Bloco B4 — Sobre + Missão (US2) · arquivos: `src/components/sections/Sobre.tsx`, `src/components/sections/Missao.tsx`

- [X] T035 [P] [US2] Implementar `src/components/sections/Sobre.tsx`: `<section id="sobre">` `bg-noite` `secao`; grid `lg:grid-cols-2` gap grande; esquerda: `SectionHeading` tom escuro alinhado à esquerda (`sobre.eyebrow/titulo/destaque`), 2 parágrafos `texto text-muted-escuro` max 46ch, `Button primario` "Agendar horário"; direita: `next/image` `imagens.sobre` (1200×900, `sizes="(max-width: 979px) 100vw, 560px"`, lazy) raio 16 com bloco `bg-mostarda` chapado deslocado atrás (estilo Seu Elias); abaixo, 4 features em grade `sm:grid-cols-2 lg:grid-cols-4`: card `bg-noite-2` borda 1px `border-linha-escura` raio 16, ícone 46×46 (`bg-mostarda-soft text-mostarda`), título Oswald `text-texto-escuro`, texto `texto-sm text-muted-escuro`, hover `translateX(6px)`; `Reveal` nos blocos. Referência: `docs/referencia/picadilly-1440-sobre.png`, `seuelias-1440-sobre.png`, `picadilly-390-sobre.png`
- [X] T036 [P] [US2] Implementar `src/components/sections/Missao.tsx`: `<section aria-label="Nossa missão">` fundo gradiente `noite`→`noite-2` com glow radial mostarda no topo, padding `secao`, `Container estreito` centralizado: eyebrow `text-mostarda`, aspas gigantes (Khand ~8rem) `text-mostarda/55` `aria-hidden`, `<blockquote>` com `texto-missao` (Oswald 300 `clamp(1.35rem,3.2vw,2.35rem)` lh 1.35) `text-texto-escuro` e `<strong>` do destaque em `text-mostarda` peso 400; `<cite>` "Tomás Andrade, fundador". Referência: `docs/referencia/picadilly-1440-missao.png`, `picadilly-390-missao.png`
- [X] T037 [US2] Verificar B4: eslint + `tsc --noEmit`; Playwright 390/1440 → `docs/verificacao/{390|1440}-sobre.png`, `{390|1440}-missao.png`; contraste dos textos secundários no escuro

### Bloco B5 — Galeria (US2) · arquivo: `src/components/sections/Galeria.tsx`

- [X] T038 [P] [US2] Implementar `src/components/sections/Galeria.tsx`: `<section id="galeria">` `bg-bege` `secao`; `SectionHeading` tom claro (`secoes.galeriaHead`); `<ul>` `grid-cols-2 lg:grid-cols-3 gap-[1.1rem]`; cada `<li><figure>` 3:4 `rounded-card overflow-hidden relative` com `next/image` `fill` (`sizes="(max-width: 979px) 50vw, 380px"`, lazy, `alt` do manifesto), zoom `scale(1.06)` em .6s no hover/focus-within, `<figcaption>` Oswald uppercase `text-mostarda-claro` sobre gradiente preto na base; abaixo, linha "Siga @domtomas.barbearia no Instagram" com ícone e link externo. `Reveal` escalonado. Referência: `docs/referencia/picadilly-1440-galeria.png`, `picadilly-390-galeria.png`
- [X] T039 [US2] Verificar B5: eslint + `tsc --noEmit`; Playwright 390 (2 col) e 1440 (3 col) → `docs/verificacao/{390|1440}-galeria.png`; sem CLS ao carregar (caixas com aspect-ratio)

### Bloco B6 — Faixa "Agende pelo WhatsApp" (US3 — peça central) · arquivos: `src/components/sections/FaixaWhatsApp.tsx`, `src/components/sections/PhoneMockups.tsx`, `src/components/sections/FaixaWhatsApp.module.css` (opcional)

- [X] T040 [P] [US3] Implementar `src/components/sections/PhoneMockups.tsx`: wrapper `aria-hidden="true"`; `PhoneFrame` (largura 230px desktop / ~160px mobile, `aspect-ratio: 9/19.5`, raio 36px, borda 10px `border-loja`, notch, sombra `0 30px 60px -20px rgba(0,0,0,.45)`); **tela 1 "conversa"**: barra superior verde (`bg-whatsapp`) com `Logo` pequeno e "Dom Tomás Barbearia · online", fundo bege-2 com balões (cliente à direita, barbearia à esquerda) com os 4 textos de `research.md` R8 e horários, campo de digitação falso; **tela 2 "horários"**: cabeçalho `bg-mostarda text-noite` "Sábado, 12", lista de 4 serviços com preço e chips de horário (livres `bg-papel`, ocupados riscados `text-muted`), botão "Agendar no WhatsApp" desenhado; transformações: de trás `rotate(18deg) translate(40%,-8%)`, da frente `rotate(-14deg)` z-10 com `animate-floaty` (só sem movimento reduzido). Texto das telas em HTML real (nada de imagem)
- [X] T041 [P] [US3] Implementar `src/components/sections/FaixaWhatsApp.tsx` (+ `FaixaWhatsApp.module.css` se precisar): `<section id="agendar" aria-labelledby>` largura total `bg-mostarda`, `margin: 120px 0 140px`, `padding: 80px 0`, **`overflow-x: clip`** (não `hidden`) e `overflow-y: visible`; entre fundos bege (a página já é bege); `Container` com grid `lg:grid-cols-[1fr_1.3fr] items-center`; texto: `SectionHeading` tom mostarda tamanho `display-l` alinhado à esquerda — "AGENDE PELO WHATSAPP" branco + "DOM TOMÁS" `text-grafite`, lh .8, `text-stroke`, sem eyebrow visível se destoar (usar `sr-only` se necessário); parágrafo Poppins **400** 15px lh 1.8 `text-noite` max 460px; dois `BotaoLoja` lado a lado gap 20px: WhatsApp ("Chamar no" / "WhatsApp", `whatsappUrl()`) e Instagram ("Siga no" / "Instagram", `site.instagram.url`); coluna direita: `PhoneMockups` com `margin: -160px 0 -190px` (vaza acima e abaixo), dentro de `Reveal direcao="direita"`. Mobile (< 980px): coluna única, celulares abaixo do texto, ~160px, `margin-bottom: -120px` (vazam só para baixo), margem inferior da seção maior, badges lado a lado e quebrando para coluna se não couberem. Referência: `docs/referencia/seuelias-1440-app.png`, `seuelias-1440-app-contexto.png`, `seuelias-390-app.png`, `seuelias-390-app-contexto.png`
- [X] T042 [US3] Verificar B6: eslint + `tsc --noEmit`; Playwright 1440 (seção + contexto com bege acima/abaixo) e 390 → `docs/verificacao/{390|1440}-faixa-whatsapp.png`; lado a lado com as 4 referências do Seu Elias; `scrollWidth <= innerWidth` em 360, 390, 768, 1024, 1440; contraste do parágrafo `text-noite` sobre mostarda ≥ 4.5:1

### Bloco B7 — Equipe + Depoimentos (US2) · arquivos: `src/components/sections/Equipe.tsx`, `src/components/sections/Depoimentos.tsx`

- [X] T043 [P] [US2] Implementar `src/components/sections/Equipe.tsx`: `<section id="equipe">` `bg-bege-2` `secao` (padding-bottom reduzido para emendar com Depoimentos); `SectionHeading` tom claro (`secoes.equipeHead`); `<ul>` `grid-cols-2 lg:grid-cols-4 gap-[1.1rem]`; card: foto 4:5 `next/image` (`imagens[b.imagem]`, 800×1000, `sizes="(max-width: 979px) 50vw, 280px"`) raio 16, nome Oswald 600 `text-grafite`, cargo/especialidade `texto-sm text-muted`; fundador com borda 2px `border-mostarda`, anel `ring-4 ring-mostarda-soft` e selo pílula "★ Fundador" (`bg-mostarda text-noite` Oswald uppercase) no topo da foto; nome do barbeiro como link opcional para `whatsappUrl(mensagemBarbeiro(b))`. Referência: `docs/referencia/picadilly-1440-equipe.png`, `picadilly-390-equipe.png`
- [X] T044 [P] [US2] Implementar `src/components/sections/Depoimentos.tsx`: `<section aria-labelledby>` `bg-bege-2` (continuação visual da Equipe); `SectionHeading` tom claro (`secoes.depoimentosHead`); `<ul>` `lg:grid-cols-3` gap; card branco raio 16 `shadow-card` padding 1.7rem: estrelas ★★★★★ `text-mostarda-escuro` com `aria-label="5 de 5 estrelas"`, `<blockquote>` `texto`, `<cite>` "— NOME" Oswald uppercase `text-muted` ls .06em; `Reveal` escalonado
- [X] T045 [US2] Verificar B7: eslint + `tsc --noEmit`; Playwright 390 (equipe 2 col, depoimentos 1 col) e 1440 → `docs/verificacao/{390|1440}-equipe.png`; conferir selo do fundador e alt das 4 fotos

### Bloco B8 — Faixa CTA + Contato + Footer + FAB (US4, atende US1) · arquivos: `src/components/sections/FaixaCta.tsx`, `src/components/sections/Contato.tsx`, `src/components/sections/Footer.tsx`, `src/components/sections/WhatsAppFab.tsx`

- [X] T046 [P] [US4] Implementar `src/components/sections/FaixaCta.tsx`: `<section aria-labelledby>` `bg-mostarda` com `repeating-linear-gradient(45deg, rgba(26,22,20,.12) 0 22px, transparent 22px 44px)`, padding ~3.5rem; `Container` flex `lg:justify-between lg:items-center`, empilhado no mobile; esquerda: eyebrow `text-noite`, h2 `titulo-secao` `text-noite` com destaque `text-papel` (texto grande ≥ 24px → contraste 3.5:1 ok) ou grafite, texto `text-noite`; direita: `Button escuro lg` "Agendar pelo WhatsApp" (`text-mostarda-claro`), largura total no mobile. Referência: `docs/referencia/picadilly-1440-ctaband.png`, `picadilly-390-ctaband.png`
- [X] T047 [P] [US4] Implementar `src/components/sections/Contato.tsx`: `<section id="contato">` `bg-noite` `secao`; grid `lg:grid-cols-2`; esquerda: `SectionHeading` tom escuro à esquerda (`secoes.contatoHead`), `<address class="not-italic">` com lista (ícone lucide 40×40 `bg-mostarda-soft text-mostarda` + label Oswald uppercase `text-mostarda` + texto `text-texto-escuro`): Endereço, Horário (um item por linha de `site.horarios`), Telefone (`tel:`) e WhatsApp, Instagram; botões `Button primario` "Agendar pelo WhatsApp" e `Button ghost` "Abrir no Google Maps" (`site.endereco.mapsUrl`, externo); direita: `next/image` `imagens.mapa` (1200×900, `sizes="(max-width: 979px) 100vw, 560px"`) raio 16, `grayscale-[.25]`, `min-h-[340px] object-cover`, envolto em link externo para o mapa com `aria-label`. Referência: `docs/referencia/picadilly-1440-contato.png`, `picadilly-390-contato.png`
- [X] T048 [P] [US4] Implementar `src/components/sections/Footer.tsx`: `<footer>` `bg-rodape` padding-top 4rem; grid `lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]` (1 col no mobile): marca (`Logo comNome` + `site.slogan` `text-muted-escuro`), "Navegue" (h2 visual h4: Oswald `text-mostarda` uppercase ls .1em; links `site.navegacao`), "Conecte-se" (WhatsApp, Instagram, e-mail, telefone), CTA (`Button primario` "Agendar horário"); divisória `border-linha-escura`; linha final com "© {ano atual} Dom Tomás Barbearia" e `site.aviso` em `.85rem text-muted-escuro`. Referência: `docs/referencia/picadilly-1440-footer.png`, `seuelias-1440-footer.png`, `picadilly-390-footer.png`
- [X] T049 [P] [US1] Implementar `src/components/sections/WhatsAppFab.tsx`: `<a>` fixo `right-5 bottom-5 z-40`, 58×58 `rounded-full bg-whatsapp hover:bg-whatsapp-hover`, `IconeWhatsApp` branco 28px, `shadow-marca`, anel de pulso (`animate-pulse-wa` num pseudo-elemento/`span` `aria-hidden`), `aria-label="Agendar pelo WhatsApp"`, externo com `whatsappUrl()`; não cobre o CTA de largura total do menu mobile (z-index abaixo do painel)
- [X] T050 [US4] Verificar B8: eslint + `tsc --noEmit`; Playwright 390/1440 → `docs/verificacao/{390|1440}-cta.png`, `-contato.png`, `-footer.png`, e FAB visível em 3 alturas de rolagem; links `tel:`, mapa e Instagram corretos

**Checkpoint**: todos os blocos verificados individualmente.

---

## Phase 4: Integração (sequencial, um agente)

- [X] T051 Finalizar `src/app/page.tsx`: conferir ordem do plano (Header → main#conteudo[Hero, Marquee, Servicos, Sobre, Missao, Galeria, FaixaWhatsApp, Equipe, Depoimentos, FaixaCta, Contato] → Footer → WhatsAppFab), remover restos de stub, resolver cada item de `specs/001-landing-dom-tomas/pendencias.md` (editando arquivos compartilhados quando necessário) e marcar como resolvido
- [X] T052 Revisar as costuras entre seções em `src/app/page.tsx` (e, se preciso, nos arquivos de seção, avisando o dono do bloco): header transparente sobre o hero, bege visível acima/abaixo da faixa WhatsApp, emenda Equipe→Depoimentos, ritmo de fundos da tabela do plano, âncoras com `scroll-margin-top`

---

## Phase 5: Verificação (constituição VI)

- [X] T053 Rodar `npm run lint` e `npm run build` sem erros nem avisos de API depreciada (ex.: `priority` em imagem); corrigir no arquivo do bloco responsável
- [X] T054 Subir `npm run start` e, com Playwright MCP, capturar página inteira e cada seção em 390×844 e 1440×900 em `docs/verificacao/final-{390|1440}-*.png`; comparar lado a lado com a tabela do cenário V6 de `specs/001-landing-dom-tomas/quickstart.md` e registrar diferenças relevantes em `docs/verificacao/comparacao.md`
- [X] T055 Checar `document.documentElement.scrollWidth <= innerWidth` em 360, 390, 768, 1024 e 1440 e `browser_console_messages` sem erros (quickstart V4); registrar em `docs/verificacao/comparacao.md`
- [X] T056 Checar acessibilidade e agendamento (quickstart V1 e V5): inventário dos 12 pontos de CTA com mensagens decodificadas, 1 único `h1`, skip link, menu mobile por teclado, `reducedMotion: 'reduce'` sem animações, página com JS desativado mostrando todo o conteúdo
- [X] T057 Rodar Lighthouse mobile (quickstart V7) → `docs/verificacao/lighthouse-mobile.html`; metas ≥ 90/95/95/95; conferir `og:image` absoluto e JSON-LD `BarberShop` no HTML
- [X] T058 Corrigir tudo o que T053–T057 apontarem, cada correção no arquivo do bloco dono, e repetir a verificação afetada

---

## Phase 6: User Story 6 — Imagens finais (Priority: P3)

**Goal**: o dono consegue gerar e trocar as 14 imagens sem tocar em código.

**Independent Test**: quickstart V8.

- [X] T059 [US6] Escrever `docs/prompts-imagens.md`: introdução em português (como usar, onde salvar, dimensões exatas, apagar `.next/cache/images` após trocar, não rodar `npm run placeholders -- --force` depois), bloco de **estilo comum** (editorial barber photography, warm tungsten key light with side rim, deep shadows, graphite/brown palette with mustard #E8B330 accents on beige #E2DED5 surfaces, subtle 35mm film grain, shallow depth of field, fictional people, no text, no logos, no watermarks) e, para **cada uma das 14 imagens do manifesto**, uma seção com: arquivo, dimensão/proporção, onde aparece, explicação em português do que a imagem precisa comunicar, **prompt em inglês** detalhado (assunto, enquadramento, lente, luz, paleta, composição respeitando áreas de corte — ex.: espaço à direita no hero para o bloco mostarda, legenda na base da galeria), **negative prompt** em inglês, e dicas de corte (crop seguro para 4:5/3:4 e para o recorte mobile). Coerência entre os 4 barbeiros (mesmo fundo de estúdio grafite, mesma luz, mesmo avental de couro caramelo) e entre as 6 fotos da galeria (mesma barbearia de `sobre.jpg`). `og.jpg` é a única com texto: "DOM TOMÁS BARBEARIA" em fonte condensada e faixa mostarda
- [X] T060 [US6] Validar quickstart V8: trocar temporariamente `public/images/galeria-01.jpg` por outra imagem 900×1200, confirmar troca sem mudança de código e sem salto de layout, rodar `npm run placeholders` e confirmar que o arquivo não foi sobrescrito; restaurar o placeholder

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Fase 1)**: T001 → T002; T003 e T004 em paralelo; T005 depende de T001 e T004.
- **Fundação (Fase 2)**: T006 e T007 primeiro; T008–T015 [P] depois de T007; T016 depois de T008;
  T017–T020, T022, T023 [P]; T021 depois de T016+T017; T023 depois de T008, T009, T015; T024
  depois de T006 e T023; T025 depois de T019–T022; T026 fecha a fase. **Bloqueia todos os blocos.**
- **Blocos B1–B8 (Fase 3)**: todos dependem só de T026; **independentes entre si**.
- **Integração (Fase 4)**: depende de todos os blocos.
- **Verificação (Fase 5)**: depende da integração.
- **US6 (Fase 6)**: T059 pode começar logo após T004 (só precisa do manifesto) — pode rodar em
  paralelo com os blocos; T060 depende de T051.

### Mapa bloco → user story

| Bloco | Tarefas | Arquivos (dono exclusivo) | User stories |
|---|---|---|---|
| B1 Header + MobileMenu | T027–T029 | `sections/Header.tsx`, `sections/MobileMenu.tsx` | US5, US1 |
| B2 Hero + Marquee | T030–T032 | `sections/Hero.tsx`, `sections/Marquee.tsx` | US1 |
| B3 Serviços | T033–T034 | `sections/Servicos.tsx` | US2, US1 |
| B4 Sobre + Missão | T035–T037 | `sections/Sobre.tsx`, `sections/Missao.tsx` | US2 |
| B5 Galeria | T038–T039 | `sections/Galeria.tsx` | US2 |
| B6 Faixa WhatsApp | T040–T042 | `sections/FaixaWhatsApp.tsx`, `sections/PhoneMockups.tsx`, `sections/FaixaWhatsApp.module.css` | US3 |
| B7 Equipe + Depoimentos | T043–T045 | `sections/Equipe.tsx`, `sections/Depoimentos.tsx` | US2 |
| B8 CTA + Contato + Footer + FAB | T046–T050 | `sections/FaixaCta.tsx`, `sections/Contato.tsx`, `sections/Footer.tsx`, `sections/WhatsAppFab.tsx` | US4, US1 |

Arquivos compartilhados (só leitura para blocos): `src/app/*`, `src/content/*`, `src/lib/*`,
`src/components/ui/*`, `package.json`. Arquivo de recado comum: `specs/001-landing-dom-tomas/pendencias.md`
(append-only, uma linha por item, prefixo do bloco).

### Within Each Block

- Implementação dos arquivos do bloco (podem ser [P] entre si) → verificação do bloco.
- Verificação usa o dev server compartilhado da porta 3000 (T026); nada de `next build` por bloco.

## Parallel Example: Fase 3

```bash
# Depois de T026, disparar 8 agentes ao mesmo tempo:
Agente B1: "T027–T029 — Header.tsx e MobileMenu.tsx"
Agente B2: "T030–T032 — Hero.tsx e Marquee.tsx"
Agente B3: "T033–T034 — Servicos.tsx"
Agente B4: "T035–T037 — Sobre.tsx e Missao.tsx"
Agente B5: "T038–T039 — Galeria.tsx"
Agente B6: "T040–T042 — PhoneMockups.tsx e FaixaWhatsApp.tsx"
Agente B7: "T043–T045 — Equipe.tsx e Depoimentos.tsx"
Agente B8: "T046–T050 — FaixaCta.tsx, Contato.tsx, Footer.tsx, WhatsAppFab.tsx"
# Em paralelo, se houver capacidade: T059 (docs/prompts-imagens.md)
```

## Implementation Strategy

### MVP

1. Fases 1 e 2 (fundação + stubs).
2. B2 (Hero + Marquee) + B8 (FAB/Contato) → já dá para agendar pelo WhatsApp (US1).
3. B6 (faixa WhatsApp) → peça central (US3).
4. Demais blocos, integração, verificação.

### Paralelo (recomendado)

1. Um agente faz Fases 1–2 (T001–T026).
2. Oito agentes fazem B1–B8 simultaneamente; um nono pode fazer T059.
3. Um agente faz integração (T051–T052) e verificação (T053–T058), depois T060.

## Notes

- [P] = arquivos diferentes, sem dependência de tarefa incompleta.
- Cada bloco é completável e verificável sozinho graças aos stubs de T025.
- Commits: feitos pelo dono do projeto, não pelos agentes.
- Evitar: editar arquivo de outro bloco, hex solto em componente, `priority` em `next/image`,
  `<link>` para Google Fonts, texto/imagem dos sites de referência.
