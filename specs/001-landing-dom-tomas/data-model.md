# Data Model: Landing Dom Tomás Barbearia

Não há banco. "Dados" = conteúdo estático tipado em `src/content/` (constituição, princípio V) e o
manifesto de imagens em `scripts/manifesto-imagens.json`. Os valores concretos estão na spec
("Dados fictícios da marca" e "Manifesto de Imagens"); aqui ficam formas, regras e relações.

## Tipos (`src/content/types.ts`)

```ts
export type Horario = { dias: string; abre?: string; fecha?: string; fechado?: boolean }
// ex.: { dias: 'Terça a sexta', abre: '09:00', fecha: '20:00' }

export type Site = {
  nome: 'Dom Tomás Barbearia'
  nomeCurto: 'Dom Tomás'
  slogan: string
  desde: 2014
  cidade: 'Belo Horizonte'; uf: 'MG'
  endereco: { rua: string; bairro: string; cep: string; mapsUrl: string }
  telefone: { exibicao: '(31) 99555-0142'; e164: '+5531995550142' }
  whatsapp: { numero: '5531995550142'; mensagemPadrao: string }
  instagram: { usuario: '@domtomas.barbearia'; url: string }
  email: string
  horarios: Horario[]
  avaliacao: { nota: 4.9; texto: string }
  urlBase: 'https://domtomas.vercel.app'
  navegacao: { rotulo: string; href: `#${string}` }[]   // Serviços, A Barbearia, Galeria, Equipe, Contato
  aviso: string                                          // "Projeto fictício de portfólio…"
}

export type IconeServico =
  'tesoura' | 'navalha' | 'combo' | 'degrade' | 'acabamento' | 'sobrancelha' | 'hidratacao' | 'infantil'

export type Servico = {
  id: string            // slug único: 'corte-classico'
  nome: string
  descricao: string     // ≤ 90 caracteres
  duracaoMin: number    // > 0
  preco: number         // em reais, inteiro > 0
  icone: IconeServico
}

export type Barbeiro = {
  id: string            // 'tomas' → imagem 'barbeiro-tomas.jpg'
  nome: string
  cargo: string         // 'Fundador e mestre barbeiro' | 'Barbeiro'
  especialidade: string
  imagem: ImagemId
  fundador?: boolean    // exatamente 1 true
}

export type Depoimento = { autor: string; texto: string; nota: 1|2|3|4|5 }

export type Feature = { titulo: string; texto: string; icone: 'navalha'|'relogio'|'produto'|'cafe' }

export type ItemGaleria = { imagem: ImagemId; legenda: string }

export type ImagemId =
  | 'hero' | 'sobre' | 'mapa' | 'og'
  | 'galeria-01' | 'galeria-02' | 'galeria-03' | 'galeria-04' | 'galeria-05' | 'galeria-06'
  | 'barbeiro-tomas' | 'barbeiro-rafael' | 'barbeiro-diego' | 'barbeiro-caio'

export type Imagem = {
  id: ImagemId
  src: `/images/${string}.jpg`
  largura: number
  altura: number
  proporcao: '4:5' | '4:3' | '3:4' | '1.91:1'
  uso: string          // onde aparece (documentação)
  alt: string          // pt-BR, descritivo; '' só se decorativa
}
```

## Arquivos de conteúdo

| Arquivo | Exporta | Regras |
|---|---|---|
| `site.ts` | `site: Site` | número WhatsApp só dígitos com DDI; `mapsUrl` = busca "Savassi, Belo Horizonte - MG" |
| `servicos.ts` | `servicos: Servico[]` | exatamente 8, ids únicos, ordem da spec |
| `equipe.ts` | `equipe: Barbeiro[]` | 4 itens, 1 fundador (Tomás, primeiro), `imagem` existe no manifesto |
| `depoimentos.ts` | `depoimentos: Depoimento[]` | 3 itens, nota 5 |
| `sobre.ts` | `sobre: { eyebrow, titulo, destaque, paragrafos: [string,string], features: Feature[4] }`, `missao: { eyebrow, antes, destaque, depois }` | 4 features |
| `galeria.ts` | `galeria: ItemGaleria[]` | 6 itens, galeria-01…06, legendas: Degradê, Barba na navalha, Corte clássico, Ferramentas, Ambiente, Acabamento |
| `secoes.ts` | textos de `hero`, `marquee` (itens), `servicosHead`, `galeriaHead`, `faixaWhatsApp`, `equipeHead`, `depoimentosHead`, `faixaCta`, `contatoHead`, `footer` | cada título tem `titulo` + `destaque` (palavra em outra cor) |
| `imagens.ts` | `imagens: Record<ImagemId, Imagem>` | importa `scripts/manifesto-imagens.json` (id, src, dimensões, proporção, uso) e acrescenta `alt` |

### Textos de seção (`secoes.ts`) — valores

- **hero**: eyebrow "Barbearia · Belo Horizonte · Desde 2014"; linha1 "Tradição na navalha,";
  linha2 (mostarda) "estilo no espelho."; lead "Corte, barba e cuidado masculino com calma,
  toalha quente e acabamento de mestre. Na cadeira da Dom Tomás, o detalhe é o serviço.";
  cta1 "Agendar horário"; cta2 "WhatsApp"; confiança "★ 4,9 avaliação dos clientes • +10 anos de
  navalha"; rolar "Role".
- **marquee**: Corte, Barba, Degradê, Navalha, Sobrancelha, Hidratação, Toalha quente.
- **servicosHead**: eyebrow "O que fazemos"; titulo "Nossos" destaque "serviços"; sub "Do corte
  clássico à barba na navalha, com hora marcada e preço na mesa."; nota "Pagamento em Pix, cartão
  ou dinheiro. Chegue 5 minutos antes."; cta "Ver horários no WhatsApp".
- **sobre**: eyebrow "A barbearia"; titulo "Desde 2014 no" destaque "coração da Savassi"; 2
  parágrafos sobre o Tomás ter aberto a casa com duas cadeiras e hoje ter quatro barbeiros; cta
  "Agendar horário".
- **missao**: eyebrow "Nossa missão"; frase da spec com destaque.
- **galeriaHead**: eyebrow "Na cadeira"; titulo "Nosso" destaque "trabalho"; rodapé "Siga
  @domtomas.barbearia no Instagram".
- **faixaWhatsApp**: titulo "Agende pelo WhatsApp" destaque "Dom Tomás"; texto "Escolha o serviço,
  o barbeiro e o horário numa conversa rápida. A gente confirma na hora e te lembra no dia. Sem
  app, sem cadastro, sem fila."; badge1 { linha1: "Chamar no", linha2: "WhatsApp" }; badge2
  { linha1: "Siga no", linha2: "Instagram" }.
- **equipeHead**: eyebrow "Quem cuida de você"; titulo "Nossa" destaque "equipe".
- **depoimentosHead**: eyebrow "Quem senta, volta"; titulo "O que dizem os" destaque "clientes".
- **faixaCta**: eyebrow "Hora de renovar"; titulo "Bora dar um tapa no" destaque "visual?"; texto
  "Seu horário está a uma mensagem de distância."; cta "Agendar pelo WhatsApp".
- **contatoHead**: eyebrow "Venha nos ver"; titulo "Onde" destaque "estamos".

## Manifesto de imagens (`scripts/manifesto-imagens.json`)

Array de objetos `{ id, arquivo, largura, altura, proporcao, uso }`. Valores (espelho da spec):

| id | arquivo | largura × altura | proporção | uso / `sizes` |
|---|---|---|---|---|
| hero | hero.jpg | 1200 × 1500 | 4:5 | Hero dir. — `(max-width: 979px) 72vw, 480px` — `fetchPriority="high"` |
| sobre | sobre.jpg | 1200 × 900 | 4:3 | Sobre — `(max-width: 979px) 100vw, 560px` |
| galeria-01…06 | galeria-0N.jpg | 900 × 1200 | 3:4 | Galeria — `(max-width: 979px) 50vw, 380px` |
| barbeiro-tomas/rafael/diego/caio | barbeiro-*.jpg | 800 × 1000 | 4:5 | Equipe — `(max-width: 979px) 50vw, 280px` |
| mapa | mapa.jpg | 1200 × 900 | 4:3 | Contato — `(max-width: 979px) 100vw, 560px` |
| og | og.jpg | 1200 × 630 | 1.91:1 | `metadata.openGraph.images` (não renderizada na página) |

**Regras**: arquivo em `public/images/`; o componente sempre usa `largura`/`altura` do manifesto
(ou `fill` dentro de caixa com a `aspect-ratio` do manifesto) → trocar arquivo não muda layout;
placeholders têm exatamente as mesmas dimensões.

## Link de WhatsApp (derivado, `src/lib/whatsapp.ts`)

- `whatsappUrl(msg = site.whatsapp.mensagemPadrao)` →
  `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(msg)}`
- `mensagemServico(s: Servico)` → `Olá! Quero agendar ${s.nome} na Dom Tomás.`
- `mensagemBarbeiro(b: Barbeiro)` → `Olá! Quero agendar um horário com o ${b.nome.split(' ')[0]} na Dom Tomás.`
- Contrato completo em [contracts/whatsapp-links.md](./contracts/whatsapp-links.md).

## Relações

- `Barbeiro.imagem` e `ItemGaleria.imagem` → `ImagemId` do manifesto.
- `Servico` → gera `mensagemServico` → `whatsappUrl`.
- `Site.navegacao[].href` → `id` das seções (`#servicos`, `#sobre`, `#galeria`, `#equipe`,
  `#contato`); `#inicio` no hero e `#agendar` na faixa WhatsApp.
- JSON-LD `BarberShop` é derivado de `Site` + `imagens.og` + faixa de preço de `servicos`
  (mín–máx).

## Estados de UI

- **Header**: `topo` (transparente) ↔ `fixo` (`data-stuck="true"`), por sentinela.
- **MobileMenu**: `fechado` ↔ `aberto` (Enter/clique no botão; Esc, clique em link, clique no
  fundo ou viewport ≥ 980px fecham).
- **Reveal**: `pendente` (só com `html.js` e sem movimento reduzido) → `visivel` (uma vez).
