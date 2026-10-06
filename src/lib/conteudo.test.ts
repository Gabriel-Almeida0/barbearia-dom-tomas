// Testes do conteúdo e dos links (node --test, com type stripping do Node 22+).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatarHora, formatarHorario, site } from '../content/site.ts'
import { servicos } from '../content/servicos.ts'
import { equipe } from '../content/equipe.ts'
import { mensagemBarbeiro, mensagemServico, whatsappUrl } from './whatsapp.ts'

test('URL pública: domínio no ar por padrão, sem barra no fim', () => {
  if (!process.env.NEXT_PUBLIC_SITE_URL) assert.equal(site.urlBase, 'https://domtomas.zyphex.site')
  assert.ok(!site.urlBase.endsWith('/'))
  assert.ok(!site.urlBase.includes('vercel.app'))
})

test('honestidade: aviso de ficção, e-mail em domínio reservado, sem Instagram', () => {
  assert.match(site.aviso, /^Projeto fictício de portfólio — negócio, depoimentos e números ilustrativos/)
  assert.match(site.email.endereco, /@example\.com$/)
  assert.equal(site.email.href, `mailto:${site.email.endereco}`)
  assert.ok(!('instagram' in site))
})

test('WhatsApp: mensagem padrão e por serviço/barbeiro, codificada na URL', () => {
  assert.equal(whatsappUrl('a b&c'), `https://wa.me/${site.whatsapp.numero}?text=a%20b%26c`)
  assert.equal(whatsappUrl(), `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(site.whatsapp.mensagemPadrao)}`)
  assert.equal(mensagemServico({ nome: 'Degradê (Fade)' }), 'Olá! Quero agendar Degradê (Fade) na Dom Tomás.')
  assert.equal(mensagemBarbeiro({ nome: 'Rafael Couto' }), 'Olá! Quero agendar um horário com o Rafael na Dom Tomás.')
})

test('horários formatados', () => {
  assert.equal(formatarHora('09:00'), '9h')
  assert.equal(formatarHora('08:30'), '8h30')
  assert.equal(formatarHorario({ dias: 'Sábado', abre: '08:00', fecha: '18:00', schemaDias: ['Saturday'] }), 'Sábado · 8h–18h')
  assert.equal(formatarHorario({ dias: 'Domingo', fechado: true, schemaDias: [] }), 'Domingo · Fechado')
})

test('serviços: 8, ids únicos, preço e duração positivos, descrição curta', () => {
  assert.equal(servicos.length, 8)
  assert.equal(new Set(servicos.map((s) => s.id)).size, servicos.length)
  for (const s of servicos) {
    assert.ok(Number.isInteger(s.preco) && s.preco > 0, s.id)
    assert.ok(s.duracaoMin > 0, s.id)
    assert.ok(s.descricao.length <= 90, `${s.id}: ${s.descricao.length} caracteres`)
  }
})

test('equipe: exatamente um fundador, e é o primeiro', () => {
  assert.equal(equipe.filter((b) => b.fundador).length, 1)
  assert.equal(equipe[0].fundador, true)
})
