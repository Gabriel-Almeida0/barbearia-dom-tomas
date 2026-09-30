# Prompts das imagens — Dom Tomás Barbearia

Este documento serve para gerar as **14 imagens finais** do site numa IA de imagem e trocar os
placeholders sem mexer em código. Cada seção traz: arquivo, tamanho, onde aparece, o que o corte
exige, um **prompt em inglês** pronto para colar, um **negative prompt** e uma linha em português
explicando a intenção.

Fonte das dimensões: manifesto de imagens da spec (`specs/001-landing-dom-tomas/spec.md`), espelhado
em `scripts/manifesto-imagens.json`. Se os dois divergirem, vale o JSON.

---

## 1. Como usar

1. Gere a imagem com o prompt da seção (junte o **bloco de estilo comum** ao final do prompt se a
   ferramenta não guardar contexto entre gerações).
2. Recorte e redimensione para o **tamanho exato em pixels** da tabela (não só a proporção).
3. Exporte em **JPEG, sRGB, qualidade 80–82, até ~300 KB** (a galeria e os barbeiros costumam
   ficar entre 120 e 200 KB). Sem EXIF de GPS; sem perfil de cor exótico.
4. Salve em `public/images/` **com o mesmo nome** do placeholder, substituindo o arquivo. Nenhuma
   linha de código muda: o componente lê largura e altura do manifesto, então não há salto de
   layout.
5. Apague `.next/dev/cache/images` (em produção, `.next/cache/images`) (ou reinicie o `npm run dev`) e recarregue — senão o otimizador do
   Next mostra a versão antiga.
6. **Não rode `npm run placeholders -- --force`** depois de trocar: o `--force` sobrescreve suas
   imagens com placeholders. O `npm run placeholders` normal pula arquivos que já existem.

### Tabela rápida

| Arquivo | Tamanho (px) | Proporção | Onde aparece |
|---|---|---|---|
| `hero.jpg` | 1200 × 1500 | 4:5 | Hero, coluna direita (mobile: acima do texto, 72% da largura) |
| `sobre.jpg` | 1200 × 900 | 4:3 | Sobre, à direita do texto, com bloco mostarda atrás |
| `galeria-01.jpg` … `galeria-06.jpg` | 900 × 1200 | 3:4 | Galeria, 6 tiles com legenda na base |
| `barbeiro-tomas.jpg`, `-rafael`, `-diego`, `-caio` | 800 × 1000 | 4:5 | Equipe, 4 cards |
| `mapa.jpg` | 1200 × 900 | 4:3 | Contato, coluna direita |
| `og.jpg` | 1200 × 630 | 1.91:1 | Prévia de link (WhatsApp, redes). Não aparece na página |

### Proporção por ferramenta

| Proporção | Midjourney | ChatGPT / DALL·E | Flux / Stable Diffusion (gerar e depois ampliar) |
|---|---|---|---|
| 4:5 (hero, barbeiros) | `--ar 4:5` | pedir "vertical" (1024×1536) e recortar para 4:5 | 896 × 1120 (Flux) / 896 × 1152 SDXL e recortar |
| 3:4 (galeria) | `--ar 3:4` | vertical (1024×1536) e recortar para 3:4 | 864 × 1152 (Flux) / 896 × 1152 SDXL e recortar |
| 4:3 (sobre, mapa) | `--ar 4:3` | horizontal (1536×1024) e recortar para 4:3 | 1152 × 864 |
| 1.91:1 (og) | `--ar 191:100` | horizontal (1536×1024) e recortar para 1200×630 | 1344 × 704 e recortar |

Midjourney: acrescente `--style raw --v 7` (ou a versão atual) para um visual mais fotográfico e
menos "ilustrado"; o negative prompt vai em `--no ...` (só os termos, separados por vírgula).
ChatGPT/DALL·E: não há campo de negative prompt — cole a frase "Avoid: ..." no fim do prompt.
Flux: costuma ignorar negative prompt; mantenha o "no text, no logos" dentro do próprio prompt.
Se a ferramenta gerar menor que o tamanho final, amplie com um upscaler (2×) e só então recorte.

### Consistência entre as imagens

- **Um só ambiente**: a Dom Tomás é uma barbearia clássica-moderna na Savassi, Belo Horizonte —
  paredes grafite escuras, madeira nogueira, espelhos com moldura de latão envelhecido, cadeiras
  de barbeiro vintage em couro caramelo, piso de ladrilho hidráulico em bege e grafite, detalhes
  mostarda (almofada, luminária, toalhas dobradas). A mesma sala aparece no `sobre.jpg` e em toda
  a galeria.
- **Uma só luz**: tungstênio quente (≈3200 K) vindo da esquerda, recorte (rim light) suave à
  direita, sombras profundas, fundo caindo para quase preto.
- **Barbeiros com aparência fixa** — use exatamente a mesma descrição quando o barbeiro aparecer em
  outra imagem (hero, galeria):
  - **Tomás Andrade** (fundador, ~45 anos): *a Brazilian man in his mid-forties, light-brown skin,
    short salt-and-pepper hair combed back, neatly trimmed grey beard, warm dark-brown eyes, laugh
    lines, caramel leather barber apron over a rolled-sleeve charcoal shirt.*
  - **Rafael Couto** (~28, degradê): *a Brazilian man in his late twenties, medium-brown skin, sharp
    skin-fade haircut with short textured top, thin clean moustache and light stubble, black crew-neck
    t-shirt under a caramel leather barber apron.*
  - **Diego Lanza** (~33, barba e navalha): *a Brazilian man in his early thirties, olive skin, dark
    hair in a short pompadour, full thick black beard well groomed, forearm tattoos of simple line
    art, caramel leather barber apron over a dark grey henley.*
  - **Caio Mendes** (~25, clássicos e infantil): *a Brazilian man in his mid-twenties, dark-brown
    skin, short curly black hair with a tidy shape-up, clean-shaven, bright friendly smile, caramel
    leather barber apron over a mustard-yellow t-shirt.*
- **Retratos da equipe**: mesmo fundo de estúdio grafite liso, mesma luz, mesmo avental caramelo,
  mesmo enquadramento (meio corpo, cabeça no terço superior).
- Todas as pessoas são **fictícias**. Não use nomes de pessoas reais nem "no estilo de" fotógrafos.

### Bloco de estilo comum (acrescentar a todo prompt fotográfico)

```
editorial barbershop photography, warm tungsten key light from the left with a soft rim light on the right, deep shadows, graphite and dark-brown palette with mustard #E8B330 accents and warm beige #E2DED5 highlights, subtle 35mm film grain, shallow depth of field, natural skin texture, realistic, fictional people, classic-modern barbershop in Belo Horizonte, Brazil, no text, no letters, no logos, no signage, no watermark
```

### Negative prompt comum

```
text, letters, words, typography, logo, brand name, signage, watermark, signature, frame, border, cartoon, illustration, 3d render, CGI, plastic skin, airbrushed, oversaturated, neon, cold blue light, harsh flash, extra fingers, deformed hands, distorted face, duplicate person, blurry, low resolution, jpeg artifacts, celebrity likeness
```

---

## 2. Hero — `hero.jpg`

- **Arquivo**: `public/images/hero.jpg` — **1200 × 1500 px (4:5)**
- **Onde aparece**: coluna direita do hero escuro (`--noite`), com um bloco mostarda chapado
  deslocado atrás. No celular fica acima do texto, a 72% da largura, na mesma proporção. É a
  imagem de maior prioridade de carregamento (`fetchPriority="high"`).
- **Corte**: a proporção é a mesma em todas as telas, então não há recorte extra; mas os cantos são
  arredondados (raio 16) e o bloco mostarda aparece na borda — mantenha o assunto no centro, com
  ~8% de respiro em volta. As bordas devem escurecer para o quase-preto para fundir com o fundo
  `--noite`. Nada importante nos 10% inferiores.
- **Intenção (pt-BR)**: mostrar o ofício em ação — o fundador fazendo o acabamento na navalha, com
  a luz quente contando "tradição" antes de qualquer texto.

**Prompt**

```
Vertical 4:5 editorial photograph inside a dimly lit classic-modern barbershop. A Brazilian man in his mid-forties, light-brown skin, short salt-and-pepper hair combed back, neatly trimmed grey beard, caramel leather barber apron over a rolled-sleeve charcoal shirt, carefully shaving the neckline of a seated client with a straight razor. Three-quarter view, medium close-up from chest height, the barber's focused face and the razor hand sharp, the client's head turned away and partly out of focus. Warm tungsten key light from the left raking across the razor and beard, soft rim light on the right edge, background falling off to near-black graphite with a faint out-of-focus brass mirror frame and a hint of mustard-yellow towel. Subject centered with generous dark margins. 50mm lens, f/2, shallow depth of field. Editorial barbershop photography, graphite and dark-brown palette with mustard #E8B330 accents, subtle 35mm film grain, realistic, fictional people, no text, no logos, no watermark.
```

**Negative prompt**

```
text, logo, signage, watermark, blood, cuts on skin, visible razor injury, bright background, white walls, cold light, oversaturated, cartoon, 3d render, plastic skin, extra fingers, deformed hands, distorted face, duplicate person, celebrity likeness
```

---

## 3. Sobre — `sobre.jpg`

- **Arquivo**: `public/images/sobre.jpg` — **1200 × 900 px (4:3)**
- **Onde aparece**: seção "A barbearia — Desde 2014 no coração da Savassi", à direita do texto,
  com bloco mostarda deslocado 24 px para baixo/direita. No celular ocupa 100% da largura.
- **Corte**: 4:3 fixo, sem recorte adicional. Mantenha o ponto de interesse (cadeiras + espelhos)
  no meio; o canto inferior direito fica colado ao bloco mostarda, então evite um objeto mostarda
  grande ali (some contra o bloco).
- **Intenção (pt-BR)**: apresentar a casa — o ambiente que o Tomás abriu com duas cadeiras e hoje
  tem quatro. É a "sala-mãe" que as fotos da galeria repetem.

**Prompt**

```
Horizontal 4:3 interior photograph of an empty classic-modern barbershop in Belo Horizonte, Brazil, early evening. A row of four vintage barber chairs in caramel leather and chrome facing large mirrors with aged brass frames, walnut wood counters with neatly arranged tools, deep graphite walls, hydraulic cement floor tiles in beige and graphite geometric pattern, a mustard-yellow cushion and folded mustard towels as accent, warm pendant lamps with amber glow, a tall window on the left letting in soft warm dusk light. Eye-level view from the entrance, slight diagonal perspective, chairs leading the eye to the center. 35mm lens, f/4, gentle depth of field. Warm tungsten light, deep shadows, graphite and dark-brown palette with mustard #E8B330 accents and beige #E2DED5 highlights, subtle 35mm film grain, realistic, no people, no text, no signage, no logos, no watermark.
```

**Negative prompt**

```
text, letters, neon sign, logo, brand name, posters with writing, watermark, people, crowded, messy, fluorescent light, cold blue tones, white sterile salon, fisheye distortion, cartoon, 3d render, CGI look, oversaturated
```

---

## 4. Galeria — regras comuns aos 6 tiles

- **Arquivos**: `public/images/galeria-01.jpg` … `galeria-06.jpg` — **900 × 1200 px (3:4)** cada.
- **Onde aparece**: seção "Na cadeira — Nosso trabalho", grade de 6 tiles (3 colunas no desktop,
  2 no celular), raio 16, zoom leve no hover.
- **Corte**: a **legenda** (Oswald maiúsculo, mostarda-claro) fica **sobre um gradiente preto nos
  ~20% inferiores** — deixe essa faixa escura e sem detalhe importante. O zoom de 6% no hover
  corta um pouco das bordas: nada essencial a menos de 5% da borda.
- **Consistência**: mesma sala do `sobre.jpg` ao fundo (paredes grafite, latão, couro caramelo,
  toques mostarda), mesma luz quente vinda da esquerda. Quando um barbeiro aparecer, use a
  descrição fixa dele (seção 1).

### `galeria-01.jpg` — "Degradê"

- **Intenção (pt-BR)**: provar a técnica do Rafael — transição limpa do zero ao comprimento.

```
Vertical 3:4 close-up photograph of the back and side of a young Brazilian man's head showing a crisp skin fade haircut, perfectly smooth gradient from bare skin at the nape to short textured hair on top, sharp razor-lined neckline. Slightly low angle from behind the shoulder, the head in the upper two-thirds of the frame, black barber cape at the bottom falling into shadow. In the soft-focus background a brass-framed mirror and graphite wall of the same classic-modern barbershop. Warm tungsten key light from the left grazing the fade to reveal texture, soft rim light on the right. 85mm lens, f/2.8. Editorial barbershop photography, graphite and dark-brown palette with mustard #E8B330 accents, subtle 35mm film grain, realistic, no text, no logos, no watermark.
```

Negative: comum + `patchy fade, uneven hairline, razor bumps, irritated skin, face visible`

### `galeria-02.jpg` — "Barba na navalha"

- **Intenção (pt-BR)**: o ritual da barba — toalha quente, espuma e navalha, com o Diego.

```
Vertical 3:4 close-up photograph of a hot-towel beard shave. A client reclined in a caramel leather barber chair, eyes closed and relaxed, lower face covered in rich white shaving foam, a steaming folded towel around the forehead. The hands of a Brazilian barber with olive skin and simple line-art forearm tattoos hold a straight razor at the cheek; only his hands and forearm visible, sleeve of a dark grey henley under a caramel leather apron. Visible wisps of steam catching the warm light. Composition with the razor and foam in the upper-middle, the lower fifth dark cape and shadow. Warm tungsten key light from the left, rim light on the steam, background near-black graphite with a blurred brass mirror frame. 85mm lens, f/2.2. Editorial barbershop photography, subtle 35mm film grain, realistic, fictional people, no text, no logos, no watermark.
```

Negative: comum + `blood, cuts, pain expression, cartoon foam, bright bathroom`

### `galeria-03.jpg` — "Corte clássico"

- **Intenção (pt-BR)**: o resultado do corte social — cliente pronto, penteado, confiante.

```
Vertical 3:4 portrait of a Brazilian man in his thirties, medium-brown skin, freshly finished classic side-part haircut combed with light matte pomade, clean tapered sides, short tidy beard, wearing a dark navy shirt, seated in a caramel leather barber chair and looking slightly off camera with a calm confident expression. Head and shoulders in the upper two-thirds, the lower fifth darker cape and chair armrest. Background the same classic-modern barbershop: brass-framed mirror, graphite wall, a hint of mustard towel, all softly blurred. Warm tungsten key light from the left, soft rim light on the hair from the right. 85mm lens, f/2. Editorial barbershop photography, graphite and dark-brown palette with mustard #E8B330 accents, subtle 35mm film grain, realistic, fictional person, no text, no logos, no watermark.
```

Negative: comum + `messy hair, wet greasy look, fashion model pose, studio white backdrop`

### `galeria-04.jpg` — "Ferramentas"

- **Intenção (pt-BR)**: o capricho nos instrumentos — detalhe de ofício, sem pessoas.

```
Vertical 3:4 still-life photograph of barber tools laid out on a dark walnut wood counter: a folding straight razor with a horn handle, polished steel scissors, a wooden comb, a badger-hair shaving brush in a brass stand, a small ceramic bowl of shaving cream and a folded mustard-yellow towel. Seen from a 45-degree high angle, tools arranged diagonally in the upper and middle part of the frame, the lower fifth fading into dark wood shadow. Warm tungsten light from the left producing specular highlights on steel and brass, deep shadows, background a blurred graphite wall. 50mm lens, f/4. Editorial barbershop photography, graphite and dark-brown palette with mustard #E8B330 accents, subtle 35mm film grain, realistic, no people, no brand names engraved, no text, no logos, no watermark.
```

Negative: comum + `engraved brand, labels on bottles, plastic tools, clutter, white background, product catalog lighting`

### `galeria-05.jpg` — "Ambiente"

- **Intenção (pt-BR)**: a cadeira como símbolo da casa — a mesma do `sobre.jpg`, agora de perto.

```
Vertical 3:4 photograph of a single vintage barber chair in caramel leather with chrome and enamel base, a mustard-yellow cushion on the seat, standing in front of a brass-framed mirror in a dark graphite classic-modern barbershop. A warm amber pendant lamp above casts a pool of light on the chair; the rest of the room falls into deep shadow with hints of walnut shelves and beige-and-graphite hydraulic floor tiles. Chair centered in the upper two-thirds, floor tiles in the lower part fading dark. 35mm lens, f/2.8, eye level. Editorial interior photography, graphite and dark-brown palette with mustard #E8B330 accents, subtle 35mm film grain, realistic, no people, no text, no signage, no logos, no watermark.
```

Negative: comum + `modern plastic chair, bright salon, multiple lamps, neon, people`

### `galeria-06.jpg` — "Acabamento"

- **Intenção (pt-BR)**: o "pezinho" — o contorno fino na máquina que fecha o corte.

```
Vertical 3:4 close-up photograph of a barber outlining the hairline around a client's ear with a cordless trimmer. The barber is a Brazilian man in his late twenties, medium-brown skin, sharp skin-fade haircut, black t-shirt under a caramel leather apron, seen partially from the side, his hand and trimmer sharp in focus; the client's temple and crisp line-up near the ear in the upper-middle of the frame. Tiny hair clippings visible on the black cape. Lower fifth darker cape. Background the same classic-modern barbershop softly blurred: graphite wall, brass mirror frame. Warm tungsten key light from the left, soft rim light. 85mm lens, f/2.5. Editorial barbershop photography, graphite and dark-brown palette with mustard #E8B330 accents, subtle 35mm film grain, realistic, fictional people, no brand on the trimmer, no text, no logos, no watermark.
```

Negative: comum + `brand name on clipper, visible logo on tool, cuts on skin, blurry hands`

---

## 5. Equipe — regras comuns aos 4 retratos

- **Arquivos**: `public/images/barbeiro-tomas.jpg`, `barbeiro-rafael.jpg`, `barbeiro-diego.jpg`,
  `barbeiro-caio.jpg` — **800 × 1000 px (4:5)** cada.
- **Onde aparece**: seção "Quem cuida de você — Nossa equipe", 4 cards (4 colunas no desktop,
  2 no celular), com nome e especialidade abaixo da foto. O card do Tomás tem borda mostarda e o
  selo "★ Fundador".
- **Corte**: 4:5 fixo, cantos arredondados. **Rosto no terço superior**, olhos a ~35% da altura,
  topo da cabeça com respiro de ~6%; meio corpo (até a cintura). Todos na mesma escala para a grade
  ficar alinhada.
- **Consistência**: mesmo fundo de estúdio grafite liso com leve degradê para o marrom, mesma luz,
  mesmo avental de couro caramelo, mesma lente (85 mm, f/2.8).

### `barbeiro-tomas.jpg` — Tomás Andrade, fundador e mestre barbeiro

- **Intenção (pt-BR)**: o dono da casa desde 2014 — autoridade tranquila, olhar de quem ensina.

```
Vertical 4:5 waist-up studio portrait of a Brazilian man in his mid-forties, light-brown skin, short salt-and-pepper hair combed back, neatly trimmed grey beard, warm dark-brown eyes, laugh lines, wearing a caramel leather barber apron over a rolled-sleeve charcoal shirt, holding a closed straight razor loosely in one hand at chest height, looking into the camera with a calm, proud half-smile. Face in the upper third of the frame, centered. Plain graphite studio backdrop with a subtle warm gradient to dark brown. Warm tungsten key light from the left at 45 degrees, soft rim light on the right shoulder and hair. 85mm lens, f/2.8. Editorial portrait photography, graphite and dark-brown palette with a mustard #E8B330 accent, subtle 35mm film grain, realistic, fictional person, no text, no logos, no watermark.
```

Negative: comum + `old frail man, long beard, suit and tie, busy background`

### `barbeiro-rafael.jpg` — Rafael Couto, especialista em degradê

- **Intenção (pt-BR)**: o barbeiro jovem e preciso — o próprio cabelo é o cartão de visita.

```
Vertical 4:5 waist-up studio portrait of a Brazilian man in his late twenties, medium-brown skin, sharp skin-fade haircut with short textured top, thin clean moustache and light stubble, wearing a black crew-neck t-shirt under a caramel leather barber apron, a pair of barber clippers hanging from the apron pocket, body turned slightly, face toward the camera with a confident relaxed look. Face in the upper third of the frame, centered. Plain graphite studio backdrop with a subtle warm gradient to dark brown. Warm tungsten key light from the left at 45 degrees, soft rim light on the right. 85mm lens, f/2.8. Editorial portrait photography, graphite and dark-brown palette, subtle 35mm film grain, realistic, fictional person, no brand on the clippers, no text, no logos, no watermark.
```

Negative: comum + `sunglasses, cap, hat, jewelry chains, brand name on clothing`

### `barbeiro-diego.jpg` — Diego Lanza, barba e navalha

- **Intenção (pt-BR)**: o especialista em barba — braços cruzados, firme, barba impecável.

```
Vertical 4:5 waist-up studio portrait of a Brazilian man in his early thirties, olive skin, dark hair in a short pompadour, full thick black beard well groomed with clean cheek lines, simple line-art forearm tattoos, wearing a caramel leather barber apron over a dark grey henley with sleeves pushed up, arms crossed over the chest, serious but friendly expression looking at the camera. Face in the upper third of the frame, centered. Plain graphite studio backdrop with a subtle warm gradient to dark brown. Warm tungsten key light from the left at 45 degrees, soft rim light on the right. 85mm lens, f/2.8. Editorial portrait photography, graphite and dark-brown palette, subtle 35mm film grain, realistic, fictional person, no text, no logos, no watermark.
```

Negative: comum + `aggressive expression, tattoos on face, tattoos with letters, words in tattoos`

### `barbeiro-caio.jpg` — Caio Mendes, cortes clássicos e infantil

- **Intenção (pt-BR)**: o mais novo da equipe, simpático — quem tem paciência com as crianças.

```
Vertical 4:5 waist-up studio portrait of a Brazilian man in his mid-twenties, dark-brown skin, short curly black hair with a tidy shape-up, clean-shaven, bright friendly open smile, wearing a caramel leather barber apron over a mustard-yellow t-shirt, holding a wooden comb in one hand near the chest, looking at the camera. Face in the upper third of the frame, centered. Plain graphite studio backdrop with a subtle warm gradient to dark brown. Warm tungsten key light from the left at 45 degrees, soft rim light on the right. 85mm lens, f/2.8. Editorial portrait photography, graphite and dark-brown palette with mustard #E8B330 accent, subtle 35mm film grain, realistic, fictional person, no text, no logos, no watermark.
```

Negative: comum + `exaggerated grin, cartoonish, teenager, braces, cap, hat`

---

## 6. Contato — `mapa.jpg`

- **Arquivo**: `public/images/mapa.jpg` — **1200 × 900 px (4:3)**
- **Onde aparece**: seção "Venha nos ver — Onde estamos" (fundo escuro), coluna direita, com
  cantos arredondados, filtro leve de cinza (`grayscale(.25)`), altura mínima de 340 px e o link
  "Abrir no Google Maps".
- **Corte**: no celular a altura mínima pode cortar as laterais (object-fit cover) — mantenha o
  **pino mostarda no centro exato** e nada importante nos 15% laterais. É uma **ilustração**, não
  foto nem print de mapa real.
- **Intenção (pt-BR)**: indicar "estamos no centro, na Savassi" sem reproduzir um mapa real — o
  endereço é fictício, então o mapa é estilizado de propósito.

```
Horizontal 4:3 flat vector-style illustrated city map, top-down view, minimal and elegant. Warm beige #E2DED5 background for city blocks, graphite #3F3634 streets of varying widths forming an irregular grid with one diagonal avenue crossing it, a small square with muted olive green trees, a few thin dark-brown secondary lines. A single large mustard-yellow #E8B330 map pin with a subtle soft shadow placed exactly in the center of the image, a faint mustard glow circle around it. Clean, no labels, no street names, no letters, no numbers, no icons of real brands, no compass text. Subtle paper texture, restrained palette of beige, graphite, dark brown and mustard only.
```

**Negative prompt**

```
text, labels, street names, letters, numbers, Google Maps interface, UI buttons, real city map, satellite imagery, 3d buildings, photograph, bright blue water, multiple pins, logos, watermark, cluttered
```

Midjourney: aqui use `--style raw` sem o bloco de estilo fotográfico.

---

## 7. Prévia de compartilhamento — `og.jpg`

- **Arquivo**: `public/images/og.jpg` — **1200 × 630 px (1.91:1)**
- **Onde aparece**: não aparece na página; é a imagem que o WhatsApp, Instagram, LinkedIn e X
  mostram quando alguém compartilha o link (`metadata.openGraph.images`).
- **Corte**: algumas plataformas recortam para quase quadrado no centro — deixe a **metade
  esquerda (~55%) escura e limpa** para o título e o assunto fotográfico no **terço direito**.
  Uma **faixa mostarda vertical** fina na borda esquerda amarra com a marca.
- **Título**: a spec prevê "DOM TOMÁS BARBEARIA" na imagem, mas IAs erram letras (acento do Á,
  espaçamento). Recomendado: gere **sem texto** com o prompt abaixo e escreva o título num editor
  (Figma, Canva, Photopea) na área escura da esquerda — fonte condensada tipo Khand/Oswald 700,
  maiúsculas, "DOM TOMÁS" em branco e "BARBEARIA" em mostarda #E8B330, eventualmente o slogan
  "Tradição na navalha, estilo no espelho." em Poppins, bege.
- **Intenção (pt-BR)**: um cartão de visita que já diz "barbearia clássica, escura e quente" na
  miniatura do WhatsApp.

**Prompt (sem texto — recomendado)**

```
Wide 1.91:1 banner photograph for a barbershop brand. The left 55 percent of the frame is a deep, clean, almost-black graphite area with a very soft warm vignette, completely empty to leave room for a title, with a thin solid mustard-yellow #E8B330 vertical stripe along the far left edge. On the right third, a classic-modern barbershop scene: a straight razor, a badger shaving brush and a steaming folded mustard towel on a dark walnut counter in front of a brass-framed mirror, lit by warm tungsten light from the left with a soft rim light, shallow depth of field, the scene gently fading into the dark left side. Editorial barbershop photography, graphite and dark-brown palette with mustard #E8B330 accents and beige #E2DED5 highlights, subtle 35mm film grain, realistic, no people, no text, no letters, no logos, no watermark.
```

**Negative prompt**

```
text, letters, typography, logo, watermark, clutter on the left side, objects on the left half, bright background, people, faces, neon, cold light, cartoon, 3d render
```

**Variante com texto (só se a ferramenta escrever bem, ex.: modelos recentes do ChatGPT)** — troque
"completely empty to leave room for a title" por:

```
with the words "DOM TOMÁS" in large bold white condensed uppercase sans-serif and below it "BARBEARIA" in mustard-yellow #E8B330 of the same font, left-aligned and vertically centered in the dark left area
```

Confira letra por letra (principalmente o **Á**) antes de usar.

---

## 8. Checklist antes de trocar

- [ ] Tamanho exato em pixels da tabela (não só a proporção).
- [ ] JPEG sRGB, qualidade 80–82, até ~300 KB.
- [ ] Nenhum texto, logo, marca d'água ou marca de ferramenta (exceto o título do `og.jpg`).
- [ ] Rosto dos barbeiros no terço superior; base dos tiles da galeria escura.
- [ ] Mesmo avental caramelo e mesmo fundo nos 4 retratos.
- [ ] Nome do arquivo idêntico, em `public/images/`.
- [ ] `.next/dev/cache/images` (em produção, `.next/cache/images`) apagado e página recarregada.
- [ ] Nada de `npm run placeholders -- --force`.
