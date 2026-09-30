# Feature Specification: Landing one-page da Dom Tomás Barbearia

**Feature Branch**: `001-landing-dom-tomas`

**Created**: 2026-09-29

**Status**: Draft

**Input**: User description: "Site one-page (landing) de uma barbearia fictícia para portfólio, 'Dom Tomás
Barbearia', com layout do Picadilly e pele do Seu Elias; agendamento só pelo WhatsApp (sem backend);
faixa 'Agende pelo WhatsApp' mostarda com celulares inclinados vazando como peça central; imagens
serão geradas por IA depois, então a spec define um manifesto de imagens com caminhos fixos e
placeholders; responsivo 360→1440, acessível, SEO básico; verificação visual em 390 e 1440."

## Contexto e decisões registradas

Esta spec foi escrita sem rodada de esclarecimento (a fase clarify foi pulada por decisão do dono).
As decisões abaixo foram tomadas com bom senso e valem como resposta às dúvidas que surgiriam:

| # | Dúvida | Decisão |
|---|--------|---------|
| D1 | Existe fluxo de agendamento? | Não. Todo "Agendar" abre uma conversa no WhatsApp com mensagem pronta. Nenhum dado é coletado pelo site. |
| D2 | A faixa "Agende através do app" do Seu Elias vira o quê, se não há app? | Vira **"AGENDE PELO WHATSAPP DOM TOMÁS"** (palavras "DOM TOMÁS" em grafite). Os dois badges pretos no estilo "loja" viram **"Chamar no WhatsApp"** e **"Siga no Instagram"**. Os dois celulares mostram telas desenhadas no próprio site: (1) conversa de agendamento no WhatsApp; (2) lista de serviços com horários livres. |
| D3 | Celulares no mobile: esconder (como o Seu Elias) ou mostrar? | **Mostrar**, menores, abaixo do texto, vazando só para baixo da faixa. É a peça que o dono mais gostou. Não pode gerar scroll horizontal. |
| D4 | Mapa do contato: embed do Google Maps ou imagem? | **Imagem estática** (`mapa.jpg`, do manifesto) com link "Abrir no Google Maps" para o bairro. Evita cookies de terceiros e peso de iframe; o endereço é fictício, então um pino real seria enganoso. |
| D5 | Lado direito do hero: logo gigante (Picadilly) ou foto? | **Foto** (`hero.jpg`, retrato 4:5) com bloco mostarda chapado deslocado atrás (linguagem do Seu Elias). O monograma "DT" aparece no header e no rodapé. |
| D6 | Seção "Sobre" com foto? | Sim: texto + botão à esquerda, foto `sobre.jpg` com bloco mostarda deslocado atrás à direita, e as 4 "features" em grade abaixo. |
| D7 | Botão "Agendar este" em cada serviço? | Sim. Abre o WhatsApp com o nome do serviço na mensagem. |
| D8 | Contraste de mostarda | Texto corrido e botões sobre mostarda usam o tom mais escuro (quase preto), não o grafite, porque grafite sobre mostarda não atinge 4.5:1. Grafite sobre mostarda só em títulos grandes. |
| D9 | É preciso avisar que é fictício? | Sim. Rodapé traz "Projeto fictício de portfólio. Telefone, endereço e pessoas são inventados." |

### Dados fictícios da marca (fonte da verdade do conteúdo)

- **Nome**: Dom Tomás Barbearia. **Fundação**: 2014. **Slogan**: "Tradição na navalha, estilo no espelho."
- **Endereço**: Rua do Ofício, 214 — Savassi, Belo Horizonte/MG, CEP 30140-000 (fictício).
- **Telefone/WhatsApp**: (31) 99555-0142 → número internacional `5531995550142` (fictício, faixa 555-01xx).
- **Instagram**: @domtomas.barbearia (fictício). **E-mail**: contato@domtomas.com.br (fictício).
- **Horário**: Terça a sexta 9h–20h · Sábado 8h–18h · Domingo e segunda fechado.
- **Confiança**: ★ 4,9 de avaliação dos clientes · +10 anos de navalha.
- **Mensagem padrão do WhatsApp**: "Olá! Quero agendar um horário na Dom Tomás."
- **Mensagem por serviço**: "Olá! Quero agendar {serviço} na Dom Tomás."
- **Mensagem por barbeiro**: "Olá! Quero agendar um horário com o {barbeiro} na Dom Tomás."

**Serviços (8)**

| Serviço | Descrição curta | Duração | Preço |
|---|---|---|---|
| Corte Clássico | Tesoura e máquina, finalizado com pomada e conselho de estilo. | 45 min | R$ 55 |
| Barba na Navalha | Toalha quente, navalha e balm hidratante. | 30 min | R$ 45 |
| Corte + Barba | O combo completo, com toalha quente e acabamento na régua. | 75 min | R$ 90 |
| Degradê (Fade) | Transição limpa do zero ao comprimento, no navalhado ou na máquina. | 50 min | R$ 60 |
| Pezinho e Acabamento | Contorno na navalha entre um corte e outro. | 15 min | R$ 25 |
| Sobrancelha | Alinhamento discreto na navalha ou pinça. | 15 min | R$ 20 |
| Hidratação Capilar e de Barba | Máscara, vapor e massagem no couro cabeludo. | 30 min | R$ 40 |
| Corte Infantil | Até 10 anos, com paciência e cadeira de pirata. | 40 min | R$ 45 |

**Equipe (4)**: Tomás Andrade (fundador e mestre barbeiro, destaque "★ Fundador"), Rafael Couto
(barbeiro, especialista em degradê), Diego Lanza (barbeiro, barba e navalha), Caio Mendes (barbeiro,
cortes clássicos e infantil).

**Depoimentos (3)**: Lucas M. ("Saí com o melhor degradê da minha vida e ainda ganhei um café."),
André P. ("Agendar pelo WhatsApp leva um minuto. Pontuais e caprichosos."), Marcelo R. ("A barba na
navalha com toalha quente virou meu ritual de sábado."). Todos 5 estrelas.

**Features do Sobre (4)**: Navalha e toalha quente · Horário respeitado · Produtos de primeira ·
Café e boa conversa. **Frase da missão**: "Aqui ninguém é só mais um na cadeira. A gente cuida do
seu visual com **o tempo e o capricho de barbearia de antigamente**."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Agendar pelo WhatsApp de qualquer ponto da página (Priority: P1)

Um visitante chega pelo celular, entende em segundos que é uma barbearia em BH e toca em "Agendar".
O WhatsApp abre com a mensagem pronta para a Dom Tomás.

**Why this priority**: É a conversão do negócio. Sem isso a landing não cumpre função nenhuma.

**Independent Test**: Abrir a página em 390px, tocar em cada CTA de agendamento (header, hero,
serviços, faixa WhatsApp, faixa CTA, contato, botão flutuante) e conferir que todos apontam para o
mesmo número com a mensagem correta, em nova aba.

**Acceptance Scenarios**:

1. **Given** a página aberta no topo, **When** o visitante toca em "Agendar horário" no hero,
   **Then** abre-se uma nova aba para o WhatsApp do número 5531995550142 com o texto
   "Olá! Quero agendar um horário na Dom Tomás.".
2. **Given** o visitante em qualquer altura da página, **When** ele toca no botão flutuante verde,
   **Then** o mesmo link de WhatsApp é aberto, e o botão tem nome acessível "Agendar pelo WhatsApp".
3. **Given** o card "Degradê (Fade)", **When** o visitante toca em "Agendar este", **Then** a
   mensagem pré-preenchida é "Olá! Quero agendar Degradê (Fade) na Dom Tomás.".
4. **Given** o menu mobile aberto, **When** o visitante toca no CTA de largura total, **Then** o
   WhatsApp abre e o menu se fecha.

---

### User Story 2 - Conhecer serviços, preços e a barbearia (Priority: P1)

O visitante rola a página para ver quanto custa, quem atende, como é o ambiente e o que dizem os
clientes antes de decidir.

**Why this priority**: Preço e confiança são o que decide o agendamento.

**Independent Test**: Navegar pelas âncoras do menu (Serviços, A Barbearia, Galeria, Equipe,
Contato) e verificar que cada seção exibe o conteúdo listado em "Dados fictícios".

**Acceptance Scenarios**:

1. **Given** o menu, **When** o visitante clica em "Serviços", **Then** a página rola suavemente
   (ou salta, com movimento reduzido) até a seção, com o título visível abaixo do header fixo.
2. **Given** a seção de serviços, **Then** os 8 serviços aparecem com nome, descrição, duração e
   preço em R$ (4 colunas no desktop, 2 no tablet, 1 abaixo de 560px).
3. **Given** a seção de equipe, **Then** os 4 barbeiros aparecem com foto, nome e especialidade, e
   o fundador tem destaque visual (borda mostarda + selo "★ Fundador").
4. **Given** a seção de depoimentos, **Then** 3 depoimentos aparecem com 5 estrelas e nome.

---

### User Story 3 - Faixa "Agende pelo WhatsApp" como peça de impacto (Priority: P1)

O visitante (e o recrutador que olha o portfólio) encontra, entre fundos bege, uma faixa mostarda
larga com título gigante, dois badges pretos e dois celulares inclinados que vazam para fora da
faixa, mostrando uma conversa de agendamento e uma lista de horários.

**Why this priority**: É a peça central pedida pelo dono; é o que diferencia o portfólio.

**Independent Test**: Screenshot em 1440 e 390 lado a lado com `seuelias-1440-app-contexto.png` e
`seuelias-390-app.png`; conferir proporções, vazamento e badges.

**Acceptance Scenarios**:

1. **Given** 1440px, **Then** a faixa ocupa a largura total, com bege visível acima e abaixo; o
   título "AGENDE PELO WHATSAPP" está em branco e "DOM TOMÁS" em grafite, em fonte condensada com
   linhas coladas; os celulares ficam à direita, o de trás passa do topo da faixa e o da frente
   passa da base.
2. **Given** 390px, **Then** o texto fica em coluna única, os badges lado a lado (ou empilhados
   abaixo de 360px de conteúdo útil), e os celulares menores aparecem abaixo do texto vazando para
   baixo, sem scroll horizontal.
3. **Given** o badge "Chamar no WhatsApp", **When** clicado, **Then** abre o WhatsApp com a
   mensagem padrão; **Given** "Siga no Instagram", **Then** abre o perfil fictício em nova aba.
4. **Given** as telas dos celulares, **Then** elas são desenhadas pelo site (texto real, não
   imagem), mas ficam ocultas para leitores de tela (são ilustração) e a informação equivalente
   existe em texto na página.

---

### User Story 4 - Encontrar endereço e horário (Priority: P2)

O visitante quer saber onde fica e quando abre.

**Why this priority**: Necessário para ir até lá, mas secundário ao agendamento.

**Independent Test**: Ir até "Contato" e ler endereço, horário, telefone e redes; clicar em
"Abrir no Google Maps".

**Acceptance Scenarios**:

1. **Given** a seção de contato, **Then** aparecem endereço, horário por dia, telefone (link
   `tel:`), WhatsApp e Instagram, com ícones e rótulos.
2. **Given** a imagem do mapa, **When** o visitante clica em "Abrir no Google Maps", **Then** abre
   uma busca pelo bairro Savassi, Belo Horizonte, em nova aba.

---

### User Story 5 - Navegação acessível e responsiva (Priority: P2)

Um visitante usa só teclado ou leitor de tela, ou está num celular de 360px.

**Why this priority**: Requisito de qualidade do portfólio (constituição, princípio III).

**Independent Test**: Tab por toda a página, abrir/fechar o menu mobile por teclado, checar a
ordem de leitura com o leitor de tela e medir scroll horizontal em 360, 390, 768, 1024 e 1440.

**Acceptance Scenarios**:

1. **Given** o primeiro Tab, **Then** aparece o link "Pular para o conteúdo".
2. **Given** o menu mobile, **When** aberto com Enter, **Then** o botão informa estado expandido,
   o foco vai para o primeiro link, Esc fecha e devolve o foco ao botão, e o fundo não rola.
3. **Given** preferência de movimento reduzido, **Then** nenhum elemento anima (entrada, faixa
   rolante, flutuação, pulso), e todo conteúdo aparece já no estado final.

---

### User Story 6 - Trocar placeholders pelas imagens finais (Priority: P3)

O dono gera as imagens com IA a partir dos prompts documentados e substitui os arquivos.

**Why this priority**: Não bloqueia o site (placeholders cobrem), mas define o acabamento final.

**Independent Test**: Substituir `public/images/galeria-01.jpg` por outra imagem das mesmas
dimensões e recarregar: a nova imagem aparece sem nenhuma mudança de código.

**Acceptance Scenarios**:

1. **Given** o manifesto de imagens, **Then** cada imagem tem caminho, dimensão, proporção, uso e
   prompt correspondente no documento de prompts.
2. **Given** o script de placeholders rodado de novo, **Then** ele não sobrescreve imagens que já
   foram trocadas, a menos que seja pedido explicitamente.

---

### Edge Cases

- **WhatsApp não instalado / desktop**: o link abre o WhatsApp Web; nada no site depende de
  confirmar o envio.
- **JavaScript desativado**: todo conteúdo é visível (a animação de entrada não pode esconder nada
  sem JS); o menu mobile degrada para os links visíveis via âncora no rodapé/menu.
- **Tela de 360px**: títulos gigantes quebram sem estourar; badges e botões cabem; celulares da
  faixa não geram scroll horizontal.
- **Telas ≥ 1600px**: conteúdo fica limitado a 1180px e centralizado; faixas de cor continuam de
  borda a borda.
- **Imagem ausente**: se um arquivo do manifesto faltar, o build não quebra e o espaço reservado
  mantém a proporção (sem salto de layout).
- **Âncora com header fixo**: o título da seção não fica escondido sob o header.
- **Zoom 200%**: o texto reflui sem cortar conteúdo.
- **Mensagem com acentos**: "Tomás", "Degradê" chegam corretos no WhatsApp (codificação de URL).

## Requirements *(mandatory)*

### Functional Requirements

**Estrutura e ordem**

- **FR-001**: A página DEVE ter, nesta ordem: Header fixo → Hero escuro → Faixa rolante mostarda →
  Serviços (claro) → Sobre (escuro) → Missão (escuro) → Galeria (claro) → Faixa "Agende pelo
  WhatsApp" (mostarda sobre bege) → Equipe + Depoimentos (claro) → Faixa CTA listrada (mostarda)
  → Contato (escuro) → Rodapé (mais escuro) + botão flutuante do WhatsApp.
- **FR-002**: O menu DEVE ter os links Serviços, A Barbearia, Galeria, Equipe, Contato e um CTA
  "Agendar horário" em pílula mostarda.

**Agendamento**

- **FR-003**: Todo CTA de agendamento DEVE abrir o WhatsApp do número fictício em nova aba com
  mensagem pré-preenchida; nenhum formulário ou coleta de dados é permitido.
- **FR-004**: Cada serviço DEVE ter ação "Agendar este" com o nome do serviço na mensagem.
- **FR-005**: DEVE existir botão flutuante do WhatsApp fixo no canto inferior direito, visível em
  toda a página, com animação de pulso (suspensa com movimento reduzido).

**Header e menu**

- **FR-006**: O header DEVE ser transparente sobre o hero e ganhar fundo escuro translúcido com
  desfoque e linha inferior após a rolagem.
- **FR-007**: Abaixo de 980px o menu vira botão hamburguer que abre painel escuro com links grandes
  separados por linhas e CTA de largura total; comportamento de teclado conforme US5.

**Hero e faixa rolante**

- **FR-008**: O hero DEVE ter eyebrow "✦ BARBEARIA · BELO HORIZONTE · DESDE 2014", título em duas
  linhas ("TRADIÇÃO NA NAVALHA," / "ESTILO NO ESPELHO." — segunda linha em mostarda), texto de
  apoio, dois botões (primário "Agendar horário →" e contorno "WhatsApp" com ícone), linha de
  confiança e a foto do hero com bloco mostarda deslocado atrás; "ROLE ↓" centralizado na base.
- **FR-009**: A faixa rolante DEVE exibir continuamente "CORTE ✦ BARBA ✦ DEGRADÊ ✦ NAVALHA ✦
  SOBRANCELHA ✦ HIDRATAÇÃO ✦" em loop infinito, estática com movimento reduzido.

**Seções de conteúdo**

- **FR-010**: Serviços: cabeçalho centralizado (eyebrow + título com palavra destacada + subtítulo),
  grade 4→2→1 de 8 cards com ícone, nome, descrição, duração, preço e "Agendar este"; nota e botão
  escuro "Ver horários no WhatsApp" abaixo.
- **FR-011**: Sobre: título em duas cores, 2 parágrafos, botão primário, foto com bloco mostarda
  deslocado, 4 features com ícone em cards escuros.
- **FR-012**: Missão: frase grande centralizada com aspas gigantes mostarda e trecho em destaque
  mostarda, sobre fundo escuro com brilho mostarda no topo.
- **FR-013**: Galeria: 6 fotos 3:4 em grade 3→2 colunas com legenda sobre gradiente escuro e zoom
  suave no hover; linha "Siga @domtomas.barbearia no Instagram" abaixo.
- **FR-014**: Faixa "Agende pelo WhatsApp": conforme US3 e decisão D2/D3.
- **FR-015**: Equipe + Depoimentos: 4 cards de barbeiro 4:5 (grade 4→2 colunas), destaque do
  fundador; depois cabeçalho próprio e 3 cards de depoimento (3→1 colunas).
- **FR-016**: Faixa CTA: fundo mostarda com listras diagonais escuras sutis, título "BORA DAR UM
  TAPA NO VISUAL?" com palavra destacada, texto curto e botão escuro "Agendar pelo WhatsApp".
- **FR-017**: Contato: lista com ícones (Endereço, Horário, Telefone/WhatsApp, Instagram), dois
  botões (primário e contorno) e imagem de mapa com link externo (decisão D4).
- **FR-018**: Rodapé: monograma + frase, "Navegue" (âncoras), "Conecte-se" (WhatsApp, Instagram,
  e-mail), CTA, linha divisória, "© {ano} Dom Tomás Barbearia" e aviso de projeto fictício (D9).

**Imagens**

- **FR-019**: Todas as imagens DEVEM seguir o **Manifesto de Imagens** abaixo (caminho, dimensão,
  proporção e uso fixos). Trocar o arquivo não pode exigir mudança de código.
- **FR-020**: Durante o desenvolvimento, placeholders DEVEM ocupar exatamente esses caminhos e
  dimensões, gerados por um script reexecutável que não sobrescreve arquivos existentes sem pedido
  explícito.
- **FR-021**: DEVE existir documento de prompts (`docs/prompts-imagens.md`) com um prompt por
  imagem, em inglês para o gerador, com explicação em português, coerente com a paleta (mostarda,
  bege, grafite, noite) e com o estilo fotográfico definido.
- **FR-022**: Toda imagem de conteúdo DEVE ter texto alternativo descritivo em português.

**Qualidade**

- **FR-023**: Sem scroll horizontal entre 360px e 1440px.
- **FR-024**: Contraste WCAG 2.1 AA; foco visível; semântica e landmarks; um único h1.
- **FR-025**: Movimento (entrada ao rolar, faixa rolante, flutuação dos celulares, pulso) DEVE ser
  desativado com preferência de movimento reduzido.
- **FR-026**: A página DEVE declarar título, descrição, idioma pt-BR, prévia para redes sociais
  (Open Graph com `og.jpg`) e dados estruturados de barbearia local (nome, endereço, telefone,
  horário, faixa de preço, URL, imagem).
- **FR-027**: Nenhum texto, logo, foto ou mockup dos sites de referência pode ser usado.

### Manifesto de Imagens

Todas em `public/images/`, JPEG, sRGB, qualidade ~82. Dimensões são as do arquivo entregue (2× o
maior tamanho exibido, aproximadamente).

| Arquivo | Dimensão (px) | Proporção | Onde aparece | Conteúdo esperado |
|---|---|---|---|---|
| `hero.jpg` | 1200 × 1500 | 4:5 | Hero, coluna direita (mobile: acima do texto, 72% da largura) | Barbeiro fazendo acabamento na navalha num cliente, luz lateral quente, fundo escuro |
| `sobre.jpg` | 1200 × 900 | 4:3 | Sobre, à direita do texto, com bloco mostarda atrás | Interior da barbearia: cadeiras clássicas, espelhos, madeira e detalhes mostarda |
| `galeria-01.jpg` | 900 × 1200 | 3:4 | Galeria, tile 1 — "Degradê" | Nuca com degradê navalhado |
| `galeria-02.jpg` | 900 × 1200 | 3:4 | Galeria, tile 2 — "Barba na navalha" | Close de barba com toalha quente/navalha |
| `galeria-03.jpg` | 900 × 1200 | 3:4 | Galeria, tile 3 — "Corte clássico" | Cliente com corte social de lado, penteado |
| `galeria-04.jpg` | 900 × 1200 | 3:4 | Galeria, tile 4 — "Ferramentas" | Bancada com navalha, tesoura, pente, pincel |
| `galeria-05.jpg` | 900 × 1200 | 3:4 | Galeria, tile 5 — "Ambiente" | Cadeira de barbeiro vintage sob luz âmbar |
| `galeria-06.jpg` | 900 × 1200 | 3:4 | Galeria, tile 6 — "Acabamento" | Pezinho/contorno sendo feito com máquina |
| `barbeiro-tomas.jpg` | 800 × 1000 | 4:5 | Equipe, card 1 (fundador) | Homem ~45 anos, barba grisalha aparada, avental de couro |
| `barbeiro-rafael.jpg` | 800 × 1000 | 4:5 | Equipe, card 2 | Homem ~28 anos, degradê, camiseta preta |
| `barbeiro-diego.jpg` | 800 × 1000 | 4:5 | Equipe, card 3 | Homem ~33 anos, barba cheia, braços cruzados |
| `barbeiro-caio.jpg` | 800 × 1000 | 4:5 | Equipe, card 4 | Homem ~25 anos, sorridente, cabelo cacheado curto |
| `mapa.jpg` | 1200 × 900 | 4:3 | Contato, coluna direita | Mapa estilizado (ilustração) em bege/grafite com pino mostarda, sem marcas reais |
| `og.jpg` | 1200 × 630 | 1.91:1 | Prévia de compartilhamento (Open Graph/Twitter) | Composição de marca: foto escura + nome "Dom Tomás Barbearia" + faixa mostarda |

Estilo fotográfico comum: fotografia editorial de barbearia, luz quente de tungstênio com recorte
lateral, sombras profundas, tons de grafite/marrom com acentos mostarda, grão leve de filme,
profundidade de campo rasa, pessoas fictícias (sem semelhança com pessoas reais), sem texto nem
logotipos na imagem (exceto `og.jpg`).

### Key Entities

- **Marca/Negócio**: nome, slogan, fundação, cidade, endereço, telefone, WhatsApp, Instagram,
  e-mail, horários por dia, avaliação.
- **Serviço**: nome, descrição curta, duração, preço, ícone.
- **Barbeiro**: nome, cargo/especialidade, foto (do manifesto), se é fundador.
- **Depoimento**: autor, texto, nota.
- **Item de galeria**: imagem (do manifesto), legenda.
- **Feature do Sobre**: título, texto, ícone.
- **Imagem do manifesto**: caminho, largura, altura, proporção, texto alternativo, uso.
- **Link de WhatsApp**: número + mensagem (padrão, por serviço, por barbeiro).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A partir do topo da página, um visitante no celular chega à conversa de agendamento
  no WhatsApp em 1 toque e em menos de 5 segundos.
- **SC-002**: 100% dos CTAs de agendamento (≥ 9 pontos, incluindo os 8 "Agendar este") abrem o
  WhatsApp com o número e a mensagem corretos.
- **SC-003**: Zero pixels de scroll horizontal em 360, 390, 768, 1024 e 1440px.
- **SC-004**: Auditoria automática de qualidade em modo celular com notas mínimas: desempenho 90,
  acessibilidade 95, boas práticas 95, SEO 95.
- **SC-005**: Nenhum erro de contraste AA e nenhum erro crítico de acessibilidade em auditoria
  automática; navegação completa por teclado sem armadilha de foco.
- **SC-006**: Em comparação lado a lado com as referências (390 e 1440), um revisor reconhece a
  mesma estrutura de seções, a mesma paleta e o mesmo padrão de título em duas cores, e a faixa do
  WhatsApp reproduz o vazamento dos celulares.
- **SC-007**: Substituir qualquer imagem do manifesto por um arquivo final das mesmas dimensões não
  exige nenhuma alteração de código e não causa salto de layout.
- **SC-008**: O conteúdo principal (título do hero) aparece em até 2,5 s numa conexão móvel
  simulada.

## Assumptions

- Público: moradores de BH, 18–50 anos, majoritariamente no celular; e recrutadores vendo o
  portfólio no desktop.
- O site é estático e será publicado numa hospedagem de sites estáticos/Next; URL de produção
  ainda não definida — usar `https://domtomas.vercel.app` como base provisória nos metadados.
- Não há painel, CMS, internacionalização, tema alternável nem analytics nesta versão.
- As imagens finais serão geradas por IA pelo dono; até lá, placeholders de mesma dimensão.
- O mapa é ilustrativo (endereço fictício).
- A referência visual é `docs/referencia/design-reference.md` (seção c) e os screenshots da mesma
  pasta; o arquivo `picadilly-styles.css` citado lá não está presente na pasta, então os valores da
  própria referência bastam.
