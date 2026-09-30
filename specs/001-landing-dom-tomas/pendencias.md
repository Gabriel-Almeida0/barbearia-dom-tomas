# Pendências (append-only)

Uma linha por item, com o prefixo do bloco (ex.: `B3: falta token X em globals.css`). A integração
(T051) resolve e marca como resolvido.

## T003 — conferência dos guias do Next 16.3.7

- Sem divergências — conferido em 2026-09-29 (`font.md` "With Tailwind CSS" usa `@theme inline`;
  `weight` obrigatório só para fontes não variáveis; `image.md`: `priority` depreciado desde v16,
  preferir `loading="eager"`/`fetchPriority="high"`; `metadataBase` compõe URLs relativas;
  `json-ld.md`: `<script type="application/ld+json">` com `.replace(/</g, '\\u003c')`).
- Nota (não é divergência): `lucide-react` instalado é a **v1.48** — ícones de marca não existem
  (confirma R10). Nomes conferidos: Scissors, Slice, Combine, Layers, Ruler, Eye, Droplets, Baby,
  Clock, MapPin, Phone, Mail, Star, Menu, X, ArrowRight, ChevronDown, Coffee, Sparkles, Brush,
  CalendarCheck, FlaskConical, Timer, SprayCan.

## Itens dos blocos

- B1: `MobileMenu` ganhou prop opcional `onChange?(aberto)` (Header escurece o fundo com o menu aberto) — contrato listava sem props; não quebra quem usa `<MobileMenu />`.
- B1: verificação feita com Playwright de `../pbn/node_modules` + Chrome do sistema (`channel:"chrome"`), pois o projeto não tem playwright; sem token novo necessário.
- B6: cores locais no FaixaWhatsApp.module.css sem token — balão do cliente `#dcf5c9`, aro do celular `#d9d6d0`, check azul `#34b7f1` (decorativos, aria-hidden). Se quiser tokens (`--color-balao-wa`, `--color-aro`), mover para globals.css.
- B6: em < 980px os celulares ficam visíveis (160px, vazando 120px para baixo), não ocultos como no Seu Elias; margem inferior da seção 200px no mobile. Em 360px os badges quebram para coluna (flex-wrap).
- B7: `secoes.equipeHead` não tem `subtitulo` (o Picadilly mostra "Barbeiros apaixonados pelo ofício…" sob "NOSSA EQUIPE"); Equipe.tsx/Depoimentos.tsx não passam subtítulo. Se a integração quiser, acrescentar `subtitulo` em src/content/secoes.ts e passar `subtitulo={h.subtitulo}` no SectionHeading.
- B7: fotos dos barbeiros ainda são placeholders ("DOM TOMÁS · PLACEHOLDER"); alts já vêm de src/content/imagens.ts. Estrelas em `text-mostarda-escuro` sobre branco ≈ 2,9:1 (decorativas, texto alternativo via `aria-label="5 de 5 estrelas"`).
- B7: padding entre Equipe e Depoimentos reduzido localmente com `pb/pt-[calc(var(--sec-y)*0.55)]` (sem utilitário novo). Seção Depoimentos usa `aria-labelledby="depoimentos-titulo"` (sem id de âncora).
- B2: Marquee usa `[animation-duration:40s]` local (cada metade do trilho repete os itens 2× para cobrir 1440+ sem buraco; com 22s ficaria rápido demais). Se preferir, criar token `--animate-marquee` com 40s em globals.css. "ROLE ↓" do hero virou link para `#servicos` (texto sr-only "para ver os serviços"). No desktop o h1 quebra em 4 linhas (Khand 96px não cabe em 2 na coluna 1.15fr) — intencional, estilo empilhado do Seu Elias.
- B3: aria-label "Agendar <nome> pelo WhatsApp" (T033) não contém o texto visível "Agendar este" (WCAG 2.5.3 label-in-name); sugestão para T051: "Agendar este: <nome> pelo WhatsApp". tsc --noEmit tem erros fora de B3 (Depoimentos/Equipe: subtitulo; Header: onChange); Servicos.tsx limpo.
- B8: FaixaCta — T046 pedia destaque do h2 em `text-papel` sobre mostarda, mas branco × #E8B330 dá ~1,9:1 (reprova até como texto grande). Resolvido localmente: destaque "VISUAL?" num carimbo `bg-noite text-mostarda-claro` levemente girado. Se quiser outra solução, ajustar `secoes.faixaCta`/tasks.
- B8: Footer usa `new Date().getFullYear()` no Server Component; como a página é estática, o ano fica o do build (ok para portfólio; rebuild anual atualiza).
- B8: verificação feita com Chrome headless via CDP (script em scratchpad) e salva como `docs/verificacao/B8-{390|1440}-{cta,contato,footer,fab-1..3}.png` (T050 citava `{390|1440}-cta.png` etc.; a integração pode renomear se quiser o padrão antigo).

## Resolução (T051 — integração, 2026-09-29)

- B1 `MobileMenu onChange` — **resolvido**: aceito como está (prop opcional, compatível com o contrato).
- B1 Playwright externo — **resolvido**: registro só informativo; a verificação final usou o mesmo método.
- B2 marquee 40s — **resolvido**: `--animate-marquee` em globals.css passou para 40s; removido o `[animation-duration:40s]` local do Marquee.tsx.
- B2 "ROLE" como link e h1 em 4 linhas — **resolvido**: mantidos (intencionais).
- B3 label-in-name — **resolvido**: aria-label agora é "Agendar este: <nome> pelo WhatsApp" (texto vem de `secoes.servicos.agendarEste`). tsc limpo.
- B6 hex locais — **resolvido**: tokens `--color-balao-wa`, `--color-check-wa`, `--color-aro` em globals.css; module CSS usa `var()`, PhoneMockups usa `text-check-wa`. Nenhum hex fora de globals.css.
- B6 celulares no mobile — **resolvido**: mantidos visíveis (D3), agora 150px (190px ≥ 560px) e centrados — antes cortavam na borda esquerda em 390. Margem inferior 130px no mobile.
- B7 subtítulo da equipe — **resolvido**: `secoes.equipeHead.subtitulo` criado e passado ao SectionHeading.
- B7 placeholders dos barbeiros — **aberto (esperado)**: aguardam as imagens finais (docs/prompts-imagens.md).
- B7 estrelas mostarda-escuro 2,9:1 — **aceito**: decorativas; a informação está no `aria-label`.
- B7 emenda Equipe→Depoimentos — **resolvido**: as duas agora em `bg-bege` (antes bege-2), o que também tira a costura bege/bege-2 logo abaixo da faixa WhatsApp. Plano (tabela de fundos, linha 9) passa a ser bege.
- B8 FaixaCta carimbo — **resolvido**: mantido o carimbo noite/mostarda-claro.
- B8 ano do build — **resolvido**: aceito.
- B8 nomes dos screenshots — **resolvido**: verificação final salva em `docs/verificacao/final-{390|1440}-*.png`.
- **Aberto — decisão do dono**: o título da faixa WhatsApp ("AGENDE PELO WHATSAPP", branco sobre mostarda) tem 1,92:1, não os ≈3,4:1 que a constituição (III) assume; o Lighthouse aponta (Acessibilidade 96). Mantido branco por ser a assinatura visual pedida (Seu Elias). Alternativa AA: base em `--noite` e "DOM TOMÁS" em branco, ou corrigir a exceção na constituição.
- **Aberto**: LCP simulado 2,7–2,8 s (meta < 2,5 s) com o placeholder do hero; reavaliar com a imagem final.
