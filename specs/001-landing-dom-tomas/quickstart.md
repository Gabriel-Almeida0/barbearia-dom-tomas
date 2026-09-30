# Quickstart: validar a landing Dom Tomás

Guia de execução e validação. Detalhes de dados em [data-model.md](./data-model.md), APIs em
[contracts/](./contracts/), decisões em [research.md](./research.md), sistema visual em
[plan.md](./plan.md#sistema-visual-transcrição-da-seção-c-de-docsreferenciadesign-referencemd).

## Pré-requisitos

- Node 22 (`node -v`), npm.
- Ler antes de codar: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`,
  `.../02-components/image.md`, `.../01-getting-started/14-metadata-and-og-images.md`,
  `.../02-guides/json-ld.md` (Next 16.3.7 quebra APIs; `priority` de imagem está depreciado).
- Referências visuais: `docs/referencia/design-reference.md` (seção c) e os PNGs da mesma pasta.

## Setup

```bash
cd /Users/gabrielalmeidasantosmelo/projetos/barbearia-dom-tomas
npm install
npm install lucide-react
npm install -D sharp
npm run placeholders          # gera os 14 JPEGs em public/images/ (não sobrescreve)
npm run placeholders -- --force   # regenera tudo (cuidado: apaga imagens finais)
```

Conferir: `ls public/images` → `hero.jpg sobre.jpg galeria-01..06.jpg barbeiro-{tomas,rafael,diego,caio}.jpg mapa.jpg og.jpg`;
`sips -g pixelWidth -g pixelHeight public/images/hero.jpg` → 1200 × 1500.

## Rodar

```bash
npm run dev                   # http://localhost:3000 (desenvolvimento)
npm run lint && npm run build && npm run start   # produção, usado na verificação
```

## Cenários de validação

### V1 — Agendamento (US1, SC-001, SC-002)

1. Em 390×844, tocar em cada CTA listado em `contracts/whatsapp-links.md` (inventário de 12 pontos).
2. Esperado: todos com `href` começando por `https://wa.me/5531995550142?text=`, `target="_blank"`,
   `rel="noopener noreferrer"`. No console do Playwright:
   ```js
   [...document.querySelectorAll('a[href*="wa.me"]')].map(a => [a.textContent.trim() || a.ariaLabel, decodeURIComponent(a.href.split('text=')[1]), a.target, a.rel])
   ```
   → ≥ 19 links (8 "Agendar este" + demais), mensagens conforme o contrato, acentos corretos.

### V2 — Conteúdo e âncoras (US2, US4)

- Clicar em cada item do menu: a seção rola e o título fica visível abaixo do header (77px).
- Serviços: 8 cards com preço "R$ …" e duração; grade 4 col (1440), 2 col (768), 1 col (390).
- Equipe: 4 cards, Tomás com selo "★ Fundador"; depoimentos: 3 cards com 5 estrelas.
- Contato: endereço, horários, `tel:`, WhatsApp, Instagram, "Abrir no Google Maps".

### V3 — Faixa "Agende pelo WhatsApp" (US3)

- 1440: faixa de borda a borda, bege acima/abaixo, título "AGENDE PELO WHATSAPP" branco +
  "DOM TOMÁS" grafite, linhas coladas (lh 0.8); celular de trás ultrapassa o topo, o da frente a
  base. Comparar com `docs/referencia/seuelias-1440-app-contexto.png`.
- 390: texto em coluna, badges lado a lado, celulares menores abaixo vazando só para baixo.
  Comparar com `docs/referencia/seuelias-390-app.png` (lá os celulares estão ocultos; aqui aparecem
  por decisão D3).
- Telas dos celulares têm `aria-hidden="true"`.

### V4 — Responsividade (SC-003)

Com Playwright MCP, em cada largura 360, 390, 768, 1024, 1440:
```js
document.documentElement.scrollWidth <= window.innerWidth   // → true
```

### V5 — Acessibilidade (US5, SC-005)

- Primeiro Tab mostra "Pular para o conteúdo"; foco visível em todos os links/botões.
- Menu mobile: `aria-expanded` alterna; foco no primeiro link; Tab preso; Esc fecha e devolve foco.
- Um único `h1`: `document.querySelectorAll('h1').length === 1`.
- Emular `prefers-reduced-motion: reduce` (`page.emulateMedia({ reducedMotion: 'reduce' })` via
  `browser_run_code`): nada anima, todo conteúdo visível.
- Desativar JS: todo conteúdo visível (reveal não esconde).

### V6 — Verificação visual (constituição VI, SC-006)

Contra `npm run start`, Playwright MCP (`browser_resize` 390×844 e 1440×900,
`browser_take_screenshot` full page e por seção). Salvar em `docs/verificacao/` com o padrão
`{390|1440}-{secao}.png` e comparar lado a lado:

| Seção Dom Tomás | Referência 1440 | Referência 390 |
|---|---|---|
| header (fixo) | `picadilly-1440-header-stuck.png` | `picadilly-390-header-stuck.png`, `picadilly-390-menu.png` |
| hero | `picadilly-1440-hero.png` | `picadilly-390-hero.png` |
| marquee | `picadilly-1440-strip.png` | `picadilly-390-strip.png` |
| serviços | `picadilly-1440-servicos.png` | `picadilly-390-servicos.png` |
| sobre | `picadilly-1440-sobre.png` (+ `seuelias-1440-sobre.png` p/ bloco mostarda) | `picadilly-390-sobre.png` |
| missão | `picadilly-1440-missao.png` | `picadilly-390-missao.png` |
| galeria | `picadilly-1440-galeria.png` | `picadilly-390-galeria.png` |
| faixa WhatsApp | `seuelias-1440-app.png`, `seuelias-1440-app-contexto.png` | `seuelias-390-app.png`, `seuelias-390-app-contexto.png` |
| equipe + depoimentos | `picadilly-1440-equipe.png` | `picadilly-390-equipe.png` |
| faixa CTA | `picadilly-1440-ctaband.png` | `picadilly-390-ctaband.png` |
| contato | `picadilly-1440-contato.png` | `picadilly-390-contato.png` |
| footer | `picadilly-1440-footer.png`, `seuelias-1440-footer.png` | `picadilly-390-footer.png` |
| página inteira | `picadilly-1440-full.png`, `seuelias-1440-full.png` | `*-390-full.png` |

Critério: mesma estrutura e ordem, mesma paleta (mostarda/bege/grafite/noite), títulos Khand com
palavra destacada, raios/sombras equivalentes; `browser_console_messages` sem erros.

### V7 — Qualidade (SC-004, SC-008)

```bash
npx -y lighthouse http://localhost:3000 --form-factor=mobile \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html --output-path=docs/verificacao/lighthouse-mobile.html
```
Esperado: ≥ 90 / ≥ 95 / ≥ 95 / ≥ 95; LCP < 2,5 s; CLS < 0,05.
SEO: `view-source` mostra `<html lang="pt-BR">`, `og:image` absoluto (`https://domtomas.vercel.app/images/og.jpg`)
e `<script type="application/ld+json">` com `"@type":"BarberShop"`.

### V8 — Troca de imagem (US6, SC-007)

1. Copiar qualquer JPEG 900×1200 para `public/images/galeria-01.jpg`.
2. Apagar `.next/cache/images` (ou reiniciar o dev server) e recarregar.
3. Esperado: nova imagem aparece, sem mudança de código e sem salto de layout.
4. `npm run placeholders` de novo → arquivo trocado **não** é sobrescrito.
