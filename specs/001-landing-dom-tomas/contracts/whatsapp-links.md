# Contrato: links de WhatsApp e Instagram

Fonte única: `src/lib/whatsapp.ts` + `src/content/site.ts`. Nenhum componente monta URL à mão
(constituição, princípio I).

## Formato

```
https://wa.me/5531995550142?text=<encodeURIComponent(mensagem)>
```

- Número: só dígitos, com DDI 55 e DDD 31, sem `+`.
- Atributos do `<a>`: `target="_blank"` `rel="noopener noreferrer"`.
- Nome acessível: o texto visível do botão; para botões só com ícone, `aria-label`.

## Mensagens

| Origem | Mensagem |
|---|---|
| Padrão (header, hero, menu mobile, faixa WhatsApp, faixa CTA, contato, footer, FAB) | `Olá! Quero agendar um horário na Dom Tomás.` |
| Card de serviço "Agendar este" | `Olá! Quero agendar {Servico.nome} na Dom Tomás.` |
| Card de barbeiro (opcional, link no nome/foto) | `Olá! Quero agendar um horário com o {primeiro nome} na Dom Tomás.` |

Exemplo esperado (verificável no navegador):
`Degradê (Fade)` → `https://wa.me/5531995550142?text=Ol%C3%A1!%20Quero%20agendar%20Degrad%C3%AA%20(Fade)%20na%20Dom%20Tom%C3%A1s.`

## Outros links externos

| Link | URL |
|---|---|
| Instagram | `https://instagram.com/domtomas.barbearia` (fictício) |
| Mapa | `https://www.google.com/maps/search/?api=1&query=Savassi%2C%20Belo%20Horizonte%20-%20MG` |
| Telefone | `tel:+5531995550142` (mesma aba) |
| E-mail | `mailto:contato@domtomas.com.br` (mesma aba) |

## Pontos de CTA (inventário para teste — SC-002)

1. Header — "Agendar horário" (desktop)
2. Menu mobile — CTA largura total
3. Hero — "Agendar horário →" (primário)
4. Hero — "WhatsApp" (ghost)
5. Serviços — 8× "Agendar este" (mensagem por serviço)
6. Serviços — "Ver horários no WhatsApp"
7. Sobre — "Agendar horário"
8. Faixa WhatsApp — badge "Chamar no WhatsApp"
9. Faixa CTA — "Agendar pelo WhatsApp"
10. Contato — botão primário "Agendar pelo WhatsApp"
11. Footer — CTA
12. FAB flutuante
