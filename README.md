# Dom Tomás Barbearia

Landing one-page de uma barbearia **fictícia** em Belo Horizonte, feita como peça de portfólio.
Todo "Agendar" abre o WhatsApp com a mensagem pronta (o serviço ou o barbeiro já vão no texto). Não
há backend nem formulário: o site não coleta nenhum dado.

No ar: https://domtomas.zyphex.site

> Negócio, endereço, telefone, pessoas, depoimentos e números são inventados, e as fotos foram
> geradas por IA. O site avisa isso no rodapé e não publica dados estruturados de negócio local
> (só `WebSite`), para o Google não indexar uma barbearia que não existe.

## O que tem

- Hero, faixa de palavras, serviços com preço e "Agendar este", sobre, galeria, equipe,
  depoimentos e contato com mapa ilustrado (imagem, sem iframe do Google).
- A peça central: a faixa mostarda "Agende pelo WhatsApp" com dois celulares inclinados, desenhados
  em HTML/CSS (conversa de agendamento e lista de horários), vazando para fora da faixa.
- Botão flutuante do WhatsApp que só aparece depois do hero.
- Responsivo de 360 a 1440 px sem rolagem lateral, foco visível, alvos de toque de 44 px,
  `prefers-reduced-motion` respeitado, contraste AA.
- Metadados com a URL real (`NEXT_PUBLIC_SITE_URL`), Open Graph, `robots.txt`, `sitemap.xml` e
  favicon.

## Stack

Next.js 16 (App Router, página estática), React 19, TypeScript, Tailwind CSS 4, `lucide-react`.
Fontes Khand, Oswald e Poppins via `next/font`. Todo o texto do negócio fica em `src/content/`; as
seções só leem de lá. As URLs do WhatsApp saem de um lugar só (`src/lib/whatsapp.ts`).

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # testes do conteúdo e dos links (node --test)
npm run lint
npm run build
```

O CI (`.github/workflows/ci.yml`) roda lint, checagem de tipos, testes e build a cada push.

## Imagens

As 14 fotos de `public/images/` foram geradas com o Nano Banana (`npm run gerar-imagens`, chave em
`nanobanana.env`, fora do git). Os prompts, com tamanho e corte de cada uma, estão em
`docs/prompts-imagens.md` e `scripts/prompts-imagens.json`. Para trocar uma foto, basta salvar o
arquivo com o mesmo nome; nenhum código muda. `npm run placeholders` gera imagens provisórias.

## Onde está o quê

| Pasta | Conteúdo |
|---|---|
| `src/content/` | dados da barbearia, serviços, equipe, depoimentos, textos e manifesto das imagens |
| `src/lib/` | links do WhatsApp + testes |
| `src/components/sections/` | uma seção da página por arquivo |
| `src/components/ui/` | botão, título de seção, logo, ícones, JSON-LD |
| `specs/001-landing-dom-tomas/` | spec, plano, pesquisa, contratos, tarefas e pendências (Spec Kit) |
| `docs/` | prompts das imagens, notas de referência visual e comparação |

Para usar com um negócio de verdade, troque os dados em `src/content/site.ts` (número de WhatsApp,
endereço, e-mail) e os textos em `src/content/`.
