<!--
Sync Impact Report
- Versão: (template sem versão) → 1.0.0
- Princípios definidos (novos, a partir do template):
  I. Estático, sem backend (agendamento só pelo WhatsApp)
  II. Fidelidade à referência de design, sem cópia
  III. Acessibilidade e responsividade não negociáveis
  IV. Performance e SEO de landing
  V. Conteúdo como dado, seções isoladas (paralelismo)
  VI. Verificação visual obrigatória
  VII. Simplicidade e versão real do Next.js
- Seções adicionadas: "Restrições de Stack e Conteúdo", "Fluxo de Desenvolvimento e Portões de Qualidade"
- Seções removidas: nenhuma
- Templates dependentes: plan-template.md (Constitution Check lê este arquivo em tempo de execução) ✅ sem alteração;
  spec-template.md ✅ sem alteração; tasks-template.md ✅ sem alteração
- TODOs: nenhum
-->

# Dom Tomás Barbearia — Constituição

## Core Principles

### I. Estático, sem backend

O site é uma landing one-page de uma barbearia fictícia, publicada como página estática.

- NÃO DEVE existir backend, banco de dados, rota de API, formulário que envie dados nem fluxo de
  agendamento próprio.
- Todo CTA de agendamento DEVE abrir o WhatsApp via `https://wa.me/<numero>?text=<mensagem>` com
  mensagem pré-preenchida (URL-encoded), em nova aba, com `rel="noopener noreferrer"`.
- O número e as mensagens DEVEM vir de um único módulo de conteúdo; nenhum componente monta URL
  de WhatsApp "na mão".

Racional: é peça de portfólio; o valor está no design e na execução, não em infraestrutura.

### II. Fidelidade à referência de design, sem cópia

- O sistema visual DEVE seguir a seção (c) de `docs/referencia/design-reference.md`: estrutura do
  Picadilly, pele do Seu Elias (mostarda chapada, bege, grafite, títulos Khand condensados com
  line-height < 1 e uma palavra em outra cor).
- Cores, fontes, raios, sombras e espaçamentos DEVEM sair de tokens (`@theme` em `globals.css`);
  valores hexadecimais soltos em componentes são proibidos, inclusive o `#111` dos badges de loja e o
  verde do WhatsApp (tokens `--loja` e `--whatsapp`).
- NENHUM texto, logo, foto ou mockup dos sites de referência pode ser reutilizado. Nomes,
  endereço, telefone, textos e imagens são inventados para a Dom Tomás.

Racional: o objetivo é demonstrar domínio de um estilo, não clonar marcas de terceiros.

### III. Acessibilidade e responsividade não negociáveis

- O layout DEVE funcionar de 360px a 1440px sem scroll horizontal (`scrollWidth <= innerWidth`).
- Contraste de texto DEVE atingir WCAG 2.1 AA (4.5:1 texto normal, 3:1 texto grande ≥ 24px ou
  ≥ 18.66px bold). Branco ou grafite sobre mostarda só é permitido em títulos display grandes
  (≈3,4–3,5:1); texto corrido e rótulos de botão sobre mostarda DEVEM usar `--noite` (≈5,2:1).
- Foco visível em todo elemento interativo (anel mostarda/grafite de 2–3px com offset).
- Semântica: um único `h1`, hierarquia de headings sem saltos, landmarks (`header`, `nav`, `main`,
  `footer`), link "Pular para o conteúdo".
- Menu mobile DEVE ter `aria-expanded`, `aria-controls`, fechar com Esc, devolver o foco ao botão
  e travar o scroll do body enquanto aberto.
- Toda imagem de conteúdo DEVE ter `alt` descritivo em português; decorativas usam `alt=""`
  ou `aria-hidden`.
- Animações DEVEM respeitar `prefers-reduced-motion` (reveal vira estado final, marquee e
  flutuação param).

### IV. Performance e SEO de landing

- Imagens DEVEM usar `next/image` com `width`/`height` ou `fill` + `sizes`; só a imagem do hero
  recebe carregamento prioritário (`preload`/`fetchPriority="high"`; `priority` está depreciado
  no Next 16).
- Fontes DEVEM ser carregadas por `next/font/google` (self-hosted, `display: 'swap'`), nunca por
  `<link>` para fonts.googleapis.com.
- JavaScript de cliente DEVE ser mínimo: só Header/MobileMenu, Reveal (IntersectionObserver) e
  o que for estritamente interativo são Client Components; o resto é Server Component.
- DEVE haver `metadata` completa (title, description, Open Graph, `metadataBase`, `lang="pt-BR"`)
  e JSON-LD `BarberShop` sanitizado (`<` → `<`).
- Meta de Lighthouse (mobile, build de produção): Performance ≥ 90, Acessibilidade ≥ 95,
  Boas Práticas ≥ 95, SEO ≥ 95.

### V. Conteúdo como dado, seções isoladas

- Todo texto e dado (serviços, preços, equipe, depoimentos, contato, horários, imagens) DEVE
  morar em `src/content/`, tipado. Componentes de seção não contêm strings de negócio literais
  além de rótulos estruturais.
- Cada seção da página DEVE ficar em arquivo próprio em `src/components/sections/`, dependendo
  apenas de `src/components/ui/`, `src/lib/` e `src/content/`. Seções NÃO importam umas às outras.
- Só a tarefa de integração edita `src/app/page.tsx`. Isso permite que agentes diferentes
  implementem seções em paralelo sem conflito de arquivos.
- Imagens DEVEM seguir o manifesto de imagens (caminhos fixos em `public/images/`); trocar
  placeholder pela imagem final não pode exigir mudança de código.

### VI. Verificação visual obrigatória

- Nenhuma seção está "pronta" sem screenshot via Playwright em 390px e 1440px comparado lado a
  lado com os screenshots de referência correspondentes em `docs/referencia/`.
- `npm run lint` e `npm run build` DEVEM passar sem erros antes de fechar qualquer bloco.
- A checagem de scroll horizontal e de console sem erros faz parte da verificação.

### VII. Simplicidade e versão real do Next.js

- Next.js 16.3.7 tem mudanças que quebram APIs. Antes de usar `next/font`, `next/image`,
  `metadata` ou qualquer API do framework, quem implementa DEVE ler o guia correspondente em
  `node_modules/next/dist/docs/` e seguir o que está lá, não a memória.
- Sem bibliotecas de UI pesadas nem de animação. Permitido: `lucide-react` para ícones. CSS +
  IntersectionObserver para movimento.
- YAGNI: nada de CMS, i18n, tema escuro alternável, analytics ou rotas extras.

## Restrições de Stack e Conteúdo

- Stack: Next.js 16.3.7 (App Router, `src/`), React 19, TypeScript estrito, Tailwind CSS v4
  (tokens via `@theme` em `src/app/globals.css`), ESLint (`eslint-config-next`).
- Fontes: Khand (títulos display), Oswald (h3, nav, botões, eyebrow), Poppins (corpo).
- Idioma: todo conteúdo e documentação em português do Brasil.
- Dados fictícios: "Dom Tomás Barbearia", Belo Horizonte/MG, desde 2014; telefone e endereço
  claramente fictícios (ex.: telefone com prefixo de teste). O rodapé DEVE dizer que é um projeto
  fictício de portfólio.
- Imagens finais serão geradas por IA pelo dono do projeto; até lá, placeholders gerados por
  script ocupam os mesmos caminhos.

## Fluxo de Desenvolvimento e Portões de Qualidade

1. Fundação (tokens, fontes, layout, conteúdo, componentes base, placeholders) é sequencial e
   precede qualquer seção.
2. Seções são implementadas em blocos paralelos `[P]`, cada um dono exclusivo dos seus arquivos.
3. Integração: `page.tsx` monta as seções na ordem definida no plano.
4. Portões: lint → build → Playwright (390 e 1440, sem scroll horizontal, console limpo) →
   Lighthouse → revisão de acessibilidade.
5. Commits são feitos pelo dono do projeto; agentes não fazem `git commit`.

## Governance

- Esta constituição prevalece sobre preferências individuais de implementação. Qualquer violação
  DEVE ser justificada na tabela "Complexity Tracking" do plano.
- Emendas: editar este arquivo com Sync Impact Report, incrementar versão semântica (MAJOR para
  remoção/redefinição de princípio, MINOR para princípio/seção nova, PATCH para redação) e
  atualizar a data de emenda.
- Revisão de conformidade: o "Constitution Check" do `plan.md` e a verificação final de tarefas
  DEVEM citar cada princípio aplicável.
- Orientação de runtime para agentes: `AGENTS.md` / `CLAUDE.md` na raiz.

**Version**: 1.0.0 | **Ratified**: 2026-09-29 | **Last Amended**: 2026-09-29
