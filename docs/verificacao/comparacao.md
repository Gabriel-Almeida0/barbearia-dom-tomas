# Verificação final (T054–T057, T060) — 2026-09-29

Contra `npm run build && npm run start` (Next 16.3.7). Screenshots: `final-{390|1440}-{secao}.png` e
`final-{390|1440}-full.png`. Capturados com Playwright + Chrome do sistema (o Playwright MCP estava
preso por outra sessão).

## Comparação com a referência (V6)

| Seção | Resultado |
|---|---|
| header / hero | Mesma estrutura do Picadilly (logo · nav · CTA pílula; hero escuro 2 colunas, foto com bloco mostarda deslocado). OK. |
| marquee | Faixa mostarda 51px com bordas mostarda-escuro. OK. |
| serviços | Grade 4 → 2 → 1, cards brancos com ícone em mostarda-soft. OK. |
| sobre + missão | Corrigido: o glow da missão encostava na borda superior e criava uma linha visível na emenda com o Sobre; agora fica atrás das aspas. Padding superior da missão reduzido (evita ~220px de vazio escuro entre as duas). |
| galeria | Tiles 3:4 com legenda Oswald mostarda-claro, igual ao Picadilly. OK. |
| faixa WhatsApp | Refeita contra `seuelias-1440-app*.png`: título ~99px (1440) / ~55px (390), 3 linhas coladas com "DOM TOMÁS" em grafite em linha própria; grid 1.05fr/1fr; celulares absolutos na coluna (não inflam a faixa) — o de trás passa ~90px do topo e o da frente ~80px da base. No mobile os celulares cortavam na borda esquerda: agora 150px (190px ≥ 560px), centrados. |
| equipe + depoimentos | Corrigido: fundo bege-2 criava uma costura "no ar" logo abaixo da faixa (margem bege → seção bege-2). Agora bege, contínuo com a faixa. Equipe ganhou subtítulo (pendência B7). |
| faixa CTA | Mostarda listrada, carimbo "VISUAL?" noite. OK. |
| contato | Corrigido: o mapa ficava centralizado verticalmente, abaixo do título; agora estica na altura da coluna, alinhado ao topo (como no Picadilly). |
| footer | Corrigido no mobile: Navegue + Conecte-se lado a lado (o rodapé tinha ~1100px de altura); e-mail quebra depois do "@" em vez de no meio do domínio. |

## V4 — scroll horizontal e console

`scrollWidth <= innerWidth` → true em 360, 390, 768, 1024 e 1440. Console sem erros nem avisos
em todas as larguras.

## V1 / V5

- 25 links `wa.me` (8 "Agendar este", 4 barbeiros, demais CTAs), todos `https://wa.me/5531995550142?text=…`,
  `target=_blank`, `rel="noopener noreferrer"`, mensagens com acentos corretos.
- 1 `h1`, sem salto de heading; primeiro Tab mostra "Pular para o conteúdo".
- Menu mobile: `aria-expanded` alterna, foco vai para o 1º link, Tab fica no menu, body travado,
  Esc fecha e devolve o foco ao botão.
- `reducedMotion: 'reduce'`: 0 animações rodando, 0 reveals ocultos. JS desativado: 37/37 reveals visíveis.

## V7 — Lighthouse mobile (`lighthouse-mobile.html`)

Performance 96 · Acessibilidade 96 · Boas práticas 100 · SEO 100 · CLS 0 · LCP 2,8 s (simulado,
4G lento; a meta era < 2,5 s). O hero passou de `fetchPriority/loading` para `preload`
(LCP 3,0 → 2,7–2,8 s). O LCP real observado fica em ~0,1 s depois do TTFB; o número simulado é
dominado pelo download da imagem do hero e vai mudar com a imagem final.
Única falha de acessibilidade: contraste do "AGENDE PELO WHATSAPP" branco sobre mostarda (1,92:1),
ver pendências.

`og:image` absoluto (`https://domtomas.vercel.app/images/og.jpg`), `<html lang="pt-BR">` e JSON-LD
`BarberShop` presentes no HTML.

## V8 — troca de imagem (T060)

`galeria-01.jpg` trocado por um JPEG 900×1200 azul → apareceu após limpar `.next/cache/images`,
tile no mesmo tamanho (382×509 em 1440), sem mudança de código. `npm run placeholders` → "0 criada(s),
14 pulada(s)", arquivo trocado intacto (mesmo sha1). Placeholder original restaurado.
