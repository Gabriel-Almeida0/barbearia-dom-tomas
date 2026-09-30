# Referência de design: Picadilly + Seu Elias → "Dom Tomás Barbearia"

Coletado em 29/09/2026 com Playwright (1440×900 e 390×844). Valores são `getComputedStyle` reais. O CSS completo do Picadilly está salvo em `picadilly-styles.css` (23 KB, com comentários, bem organizado; vale ler). Os screenshots ficam nesta pasta (`picadilly-{1440|390}-{secao}.png`, `seuelias-{1440|390}-{secao}.png`, `*-full.png`).

**Regra:** extraímos só o estilo. Nenhum texto, logo, foto ou mockup deles vai para o site novo.

---

## (a) Números extraídos

### 1. Picadilly Barbershop (picadillybarber.com)

Site estático feito à mão (HTML + um único `styles.css`), com tokens em `:root`. Altura: 7957px em 1440 de largura.

**Fontes (Google Fonts):**
`https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Oswald:wght@300;400;500;600;700&display=swap`
- `--f-display`: **Anton** 400 (h1, h2, títulos das faixas)
- `--f-head`: **Oswald** 300–700 (h3, botões, nav, eyebrow, labels)
- `--f-body`: **Inter** 400–700 (parágrafos)

**Tokens `:root` (literais):**
```css
--gold:#e3a43a; --gold-bright:#f2c56b; --gold-deep:#b97f25; --gold-soft:rgba(227,164,58,.14);
--ink:#16120c; --ink-soft:#221c14; --ink-card:#2a221a; --ink-line:rgba(255,255,255,.1);
--cream:#faf6ee; --cream-2:#f1e9d9; --paper:#fff;
--text:#2b251c; --muted:#6c6253; --text-dark:#f5efe3; --muted-dark:#b9ad99;
--radius:16px; --radius-sm:10px;
--shadow:0 18px 40px -22px rgba(20,14,6,.45);
--shadow-gold:0 14px 30px -12px rgba(227,164,58,.5);
--ease:cubic-bezier(.22,.61,.36,1); --maxw:1180px;
```
Rodapé `#100d08`. A faixa CTA usa gradiente `135deg, #b97f25 → #e3a43a → #f2c56b`. O botão flutuante do WhatsApp é `#25d366`.

**Tipografia (1440px):**
| Elemento | Fonte | Tamanho | Peso | Line-height | Letter-spacing | Transform | Cor |
|---|---|---|---|---|---|---|---|
| h1 hero | Anton | 86.4px (`clamp(2.6rem,7.4vw,5.4rem)`) | 400 | 0.98 | 0.01em | uppercase | #f5efe3 (2ª linha em gold) |
| h2 seção | Anton | 54.4px (`clamp(2rem,5vw,3.4rem)`) | 400 | 1.02 | 0.01em | uppercase | #2b251c no claro / #f5efe3 no escuro |
| h2 faixa CTA | Anton | 41.6px (`clamp(1.6rem,3.6vw,2.6rem)`) | 700 (sintético) | 1.02 | — | uppercase | #1a1206 |
| h3 card | Oswald | 18.88px (1.18rem) | 600 | 1.65 | normal | none | #2b251c |
| eyebrow | Oswald | 0.78rem | 600 | — | **0.22em** | uppercase | gold-deep, com prefixo "✦ " |
| lead hero | Inter | 19.5px (`clamp(1.05rem,1.6vw,1.22rem)`) | 400 | 1.65 | — | — | #b9ad99, max 34ch |
| p subtítulo | Inter | 16.96px (1.06rem) | 400 | 1.65 | — | — | #6c6253 |
| p card | Inter | 15.2px (0.95rem) | 400 | 1.65 | — | — | #6c6253 |
| link da nav | Oswald | 13.76px (0.86rem) | 500 | — | 0.08em | uppercase | #f5efe3 |
| botão | Oswald | 15.68px (0.98rem), lg 16.8px | 600 | — | 0.04em | uppercase | #1a1206 |
| mission text | Oswald | `clamp(1.35rem,3.2vw,2.35rem)` | **300** | 1.35 | — | — | #f5efe3, destaque em gold |

**Layout e espaçamento**
- Container: `width:min(100% - 2.5rem, 1180px)`, ou seja, gutter de 20px no mobile. O bloco de missão usa max 880px.
- Padding de seção: `clamp(3.5rem, 8vw, 6.5rem) 0`, que dá 104px no desktop e 56px no mobile.
- Cabeçalho de seção (`.section__head`): centralizado, max 640px, margem inferior `clamp(2.2rem,5vw,3.4rem)`.
- Gaps de grid: de 1.1rem a 1.4rem.
- Breakpoints: 980px (menu hamburguer, grids viram 1 ou 2 colunas) e 560px (1 coluna, botões com largura total).

**Raios e sombras**
- Cards, fotos e mapa: 16px. Ícones: 12–14px. Botões e badges: 999px (pílula).
- Sombra de card no repouso: `0 10px 24px -20px rgba(20,14,6,.5)`. No hover usa `--shadow`.

**Botões (`.btn`), todos em pílula**
- `--gold`: gradiente `135deg bright→gold→deep` com `--shadow-gold`. No hover sobe `translateY(-2px)` e a seta anda 3px.
- `--dark`: fundo ink, texto creme.
- `--ghost`: transparente, borda `rgba(255,255,255,.28)`. No hover borda e texto ficam gold.
- Padding `0.85rem 1.6rem`. O `lg` usa `1.05rem 2.1rem`.

**Animações**
- `.reveal`: opacity 0 + translateY(26px), vira visível com `0.7s var(--ease)` (IntersectionObserver).
- `floaty`: logo do hero, 6s, ±12px.
- `bob`: seta "role", 1.8s.
- `marquee`: faixa dourada, 22s linear, translateX(-50%).
- `pulse`: botão do WhatsApp, 2.6s.
- Cards de serviço: no hover sobem 6px, uma barra gold de 3px aparece no topo (`scaleX` 0→1) e o ícone passa a ter fundo gold.
- Galeria: no hover a imagem faz `scale(1.06)` em 0.6s.
- Nav: sublinhado gold de 2px que cresce de 0 a 100%.
- Respeita `prefers-reduced-motion`, exceto o marquee.

**Header:** `position:sticky`, transparente sobre o hero (o hero tem `margin-top:-76px`). Com a classe `.is-stuck` ganha `rgba(20,16,10,.86)`, `backdrop-filter: blur(12px)` e uma linha inferior. Altura ~77px e logo com 42px de altura. Nav à direita, com gap de 1.9rem, e botão CTA gold em pílula no final.

### 2. Seu Elias (seuelias.com)

WordPress com OceanWP e Elementor. Altura: 5260px.

**Fontes (Google Fonts):**
- **Khand** 400/600/700/900: títulos e nav. É uma condensada, mais "quadrada" e menos pesada que a Anton.
- **Poppins** 300/400/600/700: corpo em 300 (leve).
- Os ícones vêm do Font Awesome.

**Cores**
| Papel | Valor |
|---|---|
| Fundo do body (bege-acinzentado) | `#E6E1D8` (rgb 230,225,216) |
| Faixa do app / amarelo-mostarda | `#F6B332` (rgb 246,179,50) |
| Variante amarela nos h3 | `#F5B144` |
| Marrom-grafite (texto principal, 548 ocorrências) | `#423A38` (rgb 66,58,56) |
| Cards das unidades e rodapé | `#433A39` / `#4D4341` / `#534844` |
| Branco | títulos sobre o amarelo |

**Seção "Agende através do app" (1440px)**
- É uma `section` com largura total 1440, `background:#F6B332`, `padding:80px 0` e `margin:80px 0 100px`. Por isso o bege do body aparece acima e abaixo, e a faixa fica "solta".
- Altura da faixa: 556px. Container de 1140px em 2 colunas: 481px de texto e 658px de mockup.
- h2: Khand **72px / 900 / line-height 55.44px (0.77!)**, uppercase, branco. A parte "SEU ELIAS" é um `<span>` com `#423A38`. O line-height menor que 1 é o que deixa as linhas coladas.
- Texto de apoio: Poppins **14px / 300 / 25.2px (1.8)**, cor #423A38, largura ~460px, margin-bottom 20px.
- Botões de loja: imagens com badge preto, 175×52 (Google Play) e 186×55 (App Store), raio de ~4–6px embutido na imagem, gap de ~20px.
- Mockup: um único PNG (438×628) com **dois celulares inclinados**. O `.elementor-widget-container` recebe **`margin:-155px 0 -200px`**, e a imagem fica **65px acima do topo da faixa** e encosta ou passa um pouco do fundo. A seção tem `overflow:visible`. Há entrada com `fadeInRight` do Elementor.
- **No mobile (390) o mockup fica oculto** (0×0). A faixa vira coluna única com h2 ~46px, padding lateral de ~30px e badges lado a lado.

**Outros números**
- h1 do "BAR BE ARIA SEU ELIAS": Khand 104px/900/0.77, empilhado sílaba por sílaba.
- h3 das unidades: Poppins 38px/700/0.8, uppercase, amarelo.
- Nav: Khand 16px/600, letter-spacing 1.4px, uppercase, #423A38, line-height 48px.
- Botões: retangulares (raio 0), Poppins 18px/600, letter-spacing 1.2px, padding `25px 60px`. Há duas combinações: grafite com texto amarelo e amarelo com texto grafite.
- Container: 1140px.
- Header: `relative`, **não fixo**, fundo transparente sobre o bege, 99px. Logo circular de 100px à esquerda, menu no centro, redes sociais à direita. No mobile vira logo + hamburguer.

**Ordem das seções:** header → slider do hero (3 colunas: foto, card escuro central, foto) → grid 6×2 de unidades (foto em cima, card grafite embaixo) → **faixa do app** → sobre (bloco amarelo com título gigante empilhado + card branco com texto sobreposto e botão grafite) → serviços (fundo com foto escura, lista de serviços em Khand alternando branco e amarelo) → vídeo com bloco amarelo deslocado atrás → blog (título empilhado + 2 cards) → rodapé grafite (logo, menu centralizado, redes).

**Linguagem visual que vale herdar:** blocos de cor chapados que se sobrepõem de forma assimétrica (amarelo atrás de foto ou card, deslocado), títulos condensados com line-height menor que 1 e uma palavra em outra cor, corpo leve (300).

---

## (b) Picadilly: seções na ordem (1440 → 390)

1. **Header** (sticky, 77px). Logo à esquerda. À direita, 5 links (Oswald uppercase, tracking 0.08em) e o CTA gold em pílula. Transparente no topo e escuro com blur ao rolar. **Mobile:** logo + hamburguer (3 barras de 26×2px que viram X). O menu abre como painel escuro `rgba(20,16,10,.97)` com links grandes separados por linhas de 1px e um CTA de largura total.
2. **Hero** (`#16120c`, min-height 92vh, ~828px). Grid `1.15fr 0.85fr`. À esquerda: eyebrow gold ("✦ BARBEARIA · CIDADE · DESDE ANO"), h1 Anton em 2 linhas (linha 1 creme, linha 2 gold), lead em cinza-bege, dois botões (gold "Agendar →" + ghost com ícone do WhatsApp) e uma linha de confiança ("★ 4,9 avaliação • +10 anos"). À direita: logo grande flutuando (`floaty`). Fundo com radial gold suave no topo à direita, textura de pontos de 4px e uma faixa vertical com listras diagonais de "barber pole" a 6% da borda direita. "ROLE ↓" centralizado embaixo. **Mobile:** coluna única centralizada, logo em cima (72%), texto embaixo, botões com largura total empilhados.
3. **Strip marquee** (51px). Faixa gold com bordas `#b97f25`, texto Oswald 600 uppercase com tracking 0.12em rolando infinitamente ("CORTE ✦ BARBA ✦ ...").
4. **Serviços** (cream `#faf6ee`). Cabeçalho centralizado (eyebrow + h2 + sub). Grid de **4 colunas** com 8 cards brancos (raio 16, padding 1.7rem 1.5rem): ícone em quadrado 56×56 gold-soft, título Oswald, descrição. Nota centralizada e botão escuro "Ver horários e agendar". **Mobile:** 2 colunas até 980px e 1 coluna abaixo de 560px.
5. **Sobre** (escuro). Grid 1fr 1fr. À esquerda: eyebrow, h2 em 2 linhas, 2 parágrafos (max 46ch) e botão gold. À direita: 4 "features" empilhadas (card `#2a221a`, borda de 1px, ícone 46×46, título + texto). No hover o card anda 6px para a direita. **Mobile:** 1 coluna.
6. **Missão** (gradiente escuro, 432px). Centralizada, max 880px: eyebrow, aspas gigantes em gold a 55% de opacidade e frase em Oswald 300 grande com trecho destacado em gold. Glow radial gold no topo.
7. **Galeria** (cream). Grid de **3 colunas** com tiles 3:4, raio 16, legenda Oswald uppercase gold sobre gradiente preto na base, badge de play circular gold em vídeos e zoom no hover. Linha "Siga @... no Instagram" embaixo. **Mobile:** 2 colunas.
8. **Faixa CTA** (236px). Gradiente gold com listras diagonais escuras a 18% (`repeating-linear-gradient(45deg,…22px…)`). Flex com espaço entre os itens: à esquerda eyebrow, h2 Anton escuro e texto; à direita botão **preto** em pílula com texto gold-bright. **Mobile:** empilhado, botão com largura total.
9. **Equipe + Depoimentos** (cream-2 `#f1e9d9`, uma única seção). Equipe: grid de 3 colunas com fotos 4:5 (raio 16), nome em Oswald e cargo em muted. O dono tem borda gold de 2px, anel gold-soft e badge em pílula "★ Proprietário" no topo. Depois vem um segundo cabeçalho centralizado e 3 cards brancos de depoimento (★★★★★ gold, citação, "— CLIENTE" em Oswald uppercase). **Mobile:** equipe em 2 colunas e depoimentos em 1.
10. **Contato** (escuro). Grid 1fr 1fr. À esquerda: eyebrow, h2 e uma lista (ícone + label Oswald gold uppercase + texto) com endereço, horário e contato, seguida de 2 botões (gold + ghost). À direita: iframe do Google Maps com raio 16, `grayscale(.25)` e min-height 340px. **Mobile:** 1 coluna.
11. **Footer** (`#100d08`). Grid `1.6fr 1fr 1fr 1.2fr`: marca (logo 200px + frase), "NAVEGUE" (h4 Oswald gold com tracking 0.1em), "CONECTE-SE" e o CTA gold. Linha divisória e copyright em 0.85rem. **Mobile:** 1 coluna.
12. **FAB do WhatsApp** fixo no canto inferior direito, 58px, verde, com pulse.

Ritmo de fundos: escuro → gold → claro → escuro → escuro → claro → gold → creme → escuro → mais escuro. Claro e escuro se alternam, e o gold funciona como separador.

---

## (c) Proposta de sistema visual: Dom Tomás Barbearia

**Ideia:** usar o esqueleto do Picadilly (ordem das seções, hero escuro, cards, alternância claro/escuro, sticky com blur, reveal) com a pele do Seu Elias: mostarda chapada, bege-acinzentado, grafite quente, títulos condensados pesados com line-height menor que 1 e uma palavra em outra cor, e a faixa de app com mockup vazando. O dourado em gradiente do Picadilly dá lugar à **mostarda sólida**, que é mais gráfica.

### Tokens
```css
:root{
  /* marca */
  --mostarda:#E8B330;        /* entre #E6B22F pedido e #F6B332 real */
  --mostarda-claro:#F5C95A;
  --mostarda-escuro:#B98A1C;
  --mostarda-soft:rgba(232,179,48,.14);
  /* neutros quentes */
  --grafite:#3F3634;         /* texto principal e "palavra de contraste" (≈#423A38) */
  --grafite-2:#4D4341;       /* cards escuros */
  --noite:#1A1614;           /* hero, sobre, contato */
  --noite-2:#231E1B;
  --rodape:#120F0D;
  --bege:#E2DED5;            /* fundo principal claro (≈#E0DDD4/#E6E1D8) */
  --bege-2:#EDE9E1;          /* variação de seção clara */
  --papel:#FFFFFF;
  --muted:#6E6560;  --muted-escuro:#B5ABA2;
  --texto-escuro:#F4EFE6;
  --linha-escura:rgba(255,255,255,.1);
  /* forma */
  --r:16px; --r-sm:10px; --r-pill:999px;
  --sombra:0 18px 40px -22px rgba(20,14,10,.45);
  --sombra-mostarda:0 14px 30px -12px rgba(232,179,48,.5);
  --ease:cubic-bezier(.22,.61,.36,1);
  --maxw:1180px;
  --gutter:1.25rem;          /* container = min(100% - 2.5rem, var(--maxw)) */
  --sec-y:clamp(3.5rem,8vw,6.5rem);
  /* tipo */
  --f-display:"Khand","Anton",sans-serif;       /* 700/900 */
  --f-head:"Oswald",sans-serif;                 /* 400-600 */
  --f-body:"Poppins",system-ui,sans-serif;      /* 300/400/600 */
}
```
Google Fonts: `https://fonts.googleapis.com/css2?family=Khand:wght@500;600;700&family=Oswald:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap`

> A Khand no Google Fonts vai só até **700**. O "900" do Seu Elias é negrito sintético, porque o Elementor pede 900. Para chegar ao mesmo peso visual há duas opções: Khand 700 + `-webkit-text-stroke:.5px currentColor`, ou **Anton** (Picadilly) para títulos gigantes. Minha recomendação: **Khand 700** para h1/h2 (é o visual do Seu Elias) e **Anton** como fallback ou só nos números grandes.

### Escala tipográfica
| Token | Uso | Valor |
|---|---|---|
| display-xl | h1 hero | Khand 700, `clamp(3rem, 8vw, 6rem)`, lh **0.85**, uppercase, ls 0.005em |
| display-l | h2 da faixa do app / sobre | Khand 700, `clamp(2.8rem, 6vw, 4.5rem)` (72px no desktop), lh **0.8** |
| h2 | títulos de seção | Khand 700, `clamp(2.2rem, 5vw, 3.6rem)`, lh 0.9 |
| h3 | cards | Oswald 600, 1.18rem, lh 1.3 |
| eyebrow | acima dos títulos | Oswald 600, 0.78rem, uppercase, ls 0.22em, cor `--mostarda-escuro` (no claro) ou `--mostarda` (no escuro), prefixo "✦" ou uma tesoura pequena |
| lead | hero | Poppins 300, `clamp(1.05rem,1.6vw,1.22rem)`, lh 1.7, max 36ch |
| body | parágrafos | Poppins 300/400, 1rem, lh 1.8 |
| small | cards e legendas | Poppins 400, 0.94rem, lh 1.65 |
| nav | links | Oswald 500, 0.86rem, uppercase, ls 0.08em |
| botão | CTA | Oswald 600, 0.98rem, uppercase, ls 0.04em |

**Padrão de título "duas cores" (do Seu Elias):** parte em branco ou creme e a palavra-chave em `--grafite` sobre mostarda. Sobre fundo escuro, a palavra-chave vai em `--mostarda`. Sobre bege, a palavra vai em mostarda e o resto em grafite.

### Espaçamentos
Escala de 4px: 4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 104. Padding de seção `var(--sec-y)` (104 → 56). Gap de grid 1.1–1.4rem. Cabeçalho de seção centralizado com max 640px e margem inferior `clamp(2.2rem,5vw,3.4rem)`. Breakpoints: 980 e 560.

### Componentes
- **Header sticky**: transparente sobre o hero escuro. Ao rolar ganha `rgba(26,22,20,.86)` + blur de 12px. Logo "DT" (monograma circular desenhado do zero) à esquerda, nav e **CTA mostarda em pílula** à direita. Mobile: hamburguer + painel escuro com links grandes separados por linhas.
- **Botões** (pílula 999px):
  - `primário`: fundo `--mostarda` sólido, texto `--grafite`, `--sombra-mostarda`, hover -2px.
  - `escuro`: fundo `--noite`, texto `--mostarda-claro`.
  - `ghost`: borda `rgba(255,255,255,.28)`, hover mostarda.
  - `loja`: preto `#111`, raio **10px**, altura 52px, ícone à esquerda + 2 linhas ("Disponível no" em 10px / nome da loja em 17px semibold). São desenhados em HTML e não copiados.
- **Card de serviço**: branco, raio 16, borda `rgba(0,0,0,.06)`, ícone 56×56 em `--mostarda-soft`. No hover: barra mostarda de 3px no topo, sobe 6px e o ícone fica mostarda sólido. Preço opcional em Oswald no canto.
- **Feature escura** (sobre): card `--noite-2`, borda de 1px `--linha-escura`, ícone 46×46, hover translateX 6px.
- **Tile de galeria**: 3:4, raio 16, legenda Oswald uppercase mostarda-claro sobre gradiente preto, zoom de 1.06 no hover.
- **Card de barbeiro**: foto 4:5 com raio 16. O destaque do "fundador" tem borda mostarda, anel `--mostarda-soft` e badge em pílula.
- **Depoimento**: card branco com estrelas mostarda.
- **Marquee strip**: faixa `--mostarda`, texto grafite em Oswald uppercase com ls 0.12em, 22s linear.
- **Faixa de app "Agende pelo app Dom Tomás"** (peça central, baseada no Seu Elias):
  ```
  .app-band { background:var(--mostarda); margin:120px 0 140px; padding:80px 0; overflow:visible; }
  .app-band__inner { container; display:grid; grid-template-columns: 1fr 1.3fr; align-items:center; }
  .app-band__title { Khand 700; font-size:clamp(2.8rem,6vw,4.5rem); line-height:.8; color:#fff; uppercase }
  .app-band__title span { color:var(--grafite) }
  .app-band__text { Poppins 300; 15px; lh 1.8; color:var(--grafite); max-width:460px }
  .app-band__phones { position:relative; margin:-160px 0 -190px; }  /* vaza para cima e para baixo */
  .phone { width:~230px; aspect-ratio:9/19.5; border-radius:36px; border:10px solid #111; box-shadow:0 30px 60px -20px rgba(0,0,0,.45); }
  .phone--back  { transform: rotate(18deg) translate(40%, -8%); }
  .phone--front { transform: rotate(-14deg); z-index:1 }
  ```
  A seção fica entre fundos `--bege`, para a faixa ler como uma tira larga sobre o bege. As telas dos celulares são mockups próprios em HTML/CSS (agenda, escolha de barbeiro), sem imagem de terceiros. Entrada: `fadeInRight` / reveal. **Mobile:** os celulares ficam menores (~160px), passam para baixo do texto e vazam só para baixo (`margin-bottom:-120px`). Uma alternativa fiel ao Seu Elias é escondê-los. Os badges de loja ficam lado a lado.
- **Bloco "Sobre" com sobreposição** (opcional, do Seu Elias): bloco mostarda com título empilhado gigante (lh 0.8) à esquerda e card branco sobreposto à direita, com o botão escuro saindo para fora da borda inferior do card.
- **Faixa CTA**: mostarda com listras diagonais grafite a 12–18% e botão escuro com texto mostarda.
- **Contato**: grid 2 colunas, lista com labels em Oswald mostarda e mapa com raio 16 + leve grayscale.
- **Footer**: `--rodape`, grid `1.6fr 1fr 1fr 1.2fr`, h4 em Oswald mostarda com ls 0.1em.
- **FAB do WhatsApp** com pulse.

### Ordem sugerida das seções do Dom Tomás
1. Header sticky
2. Hero escuro (h1 Khand com 2ª linha em mostarda, dois CTAs, linha de confiança, monograma ou foto à direita, listras de barber pole mostarda sutis)
3. Marquee mostarda
4. Serviços (bege-2, grid 4→2→1, com preços)
5. Sobre (escuro, texto + 4 features)
6. Missão/citação (escuro com glow mostarda)
7. Galeria (bege, grid 3→2)
8. **Faixa do app** (mostarda sobre bege, celulares vazando)
9. Equipe + depoimentos (bege-2)
10. Faixa CTA listrada
11. Contato (escuro)
12. Footer

### Movimento
`.reveal` com translateY(26px) e opacidade em 0.7s `--ease`. Hover de botão -2px. Hover de card -6px. Marquee de 22s. Os celulares da faixa entram em fadeInRight e, opcionalmente, flutuam ±8px em 6s. Respeitar `prefers-reduced-motion`.
