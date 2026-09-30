#!/usr/bin/env node
// Gera os placeholders das 14 imagens do manifesto (scripts/manifesto-imagens.json)
// em public/images/<arquivo>, com exatamente as dimensões do manifesto.
//
// Uso:
//   npm run placeholders             # cria só os arquivos que ainda não existem
//   npm run placeholders -- --force  # regenera todos (sobrescreve imagens finais!)
//
// Fallback sem sharp (só macOS): gere o SVG e converta com
//   sips -s format jpeg in.svg --out out.jpg
//
// As cores abaixo espelham os tokens de globals.css (noite-2, grafite, mostarda); este script
// não é componente, então os hex aqui não violam a regra de tokens da constituição.

import { readFile, mkdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const destino = path.join(raiz, 'public', 'images')
const force = process.argv.includes('--force')

const manifesto = JSON.parse(
  await readFile(path.join(raiz, 'scripts', 'manifesto-imagens.json'), 'utf8'),
)

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function svg({ arquivo, largura: w, altura: h, uso }) {
  const base = Math.min(w, h)
  const t1 = Math.round(base * 0.06)
  const t2 = Math.round(base * 0.045)
  const t3 = Math.round(base * 0.032)
  const faixa = Math.round(base * 0.16)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#231E1B"/>
      <stop offset="1" stop-color="#3F3634"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g transform="translate(${w / 2} ${h / 2}) rotate(-24)">
    <rect x="${-w * 1.5}" y="${-faixa / 2}" width="${w * 3}" height="${faixa}" fill="#E8B330" opacity=".9"/>
  </g>
  <g font-family="Helvetica, Arial, sans-serif" text-anchor="middle" fill="#F4EFE6">
    <text x="${w / 2}" y="${h * 0.2}" font-size="${t2}" font-weight="700" letter-spacing="${t2 * 0.15}">DOM TOMÁS · PLACEHOLDER</text>
    <text x="${w / 2}" y="${h * 0.78}" font-size="${t1}" font-weight="700">${esc(arquivo)}</text>
    <text x="${w / 2}" y="${h * 0.78 + t1 * 1.3}" font-size="${t2}">${w}×${h}</text>
    <text x="${w / 2}" y="${h * 0.78 + t1 * 1.3 + t2 * 1.6}" font-size="${t3}" fill="#B5ABA2">${esc(uso)}</text>
  </g>
</svg>`
}

async function existe(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

await mkdir(destino, { recursive: true })
let criadas = 0
let puladas = 0
for (const item of manifesto) {
  const saida = path.join(destino, item.arquivo)
  if (!force && (await existe(saida))) {
    console.log(`= ${item.arquivo} já existe (use --force para regenerar)`)
    puladas++
    continue
  }
  await sharp(Buffer.from(svg(item)))
    .resize(item.largura, item.altura)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(saida)
  console.log(`+ ${item.arquivo} ${item.largura}×${item.altura}`)
  criadas++
}
console.log(`\n${criadas} criada(s), ${puladas} pulada(s).`)
