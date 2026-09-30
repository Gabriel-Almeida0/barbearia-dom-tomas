#!/usr/bin/env node
/**
 * Gera as imagens do site com o Nano Banana (Gemini) a partir de scripts/prompts-imagens.json
 * e salva cada uma em public/images/ já no tamanho exato do manifesto (JPEG q82).
 *
 * Uso:
 *   npm run gerar-imagens                      → só as que ainda são placeholder
 *   npm run gerar-imagens -- galeria-02 mapa   → só essas (sobrescreve)
 *   npm run gerar-imagens -- --todas           → todas (sobrescreve inclusive as já feitas)
 *
 * A chave fica em nanobanana.env (GEMINI_API_KEY=...), fora do git.
 * Modelo: GEMINI_IMAGE_MODEL no mesmo arquivo (padrão gemini-3.1-flash-image-preview, o Nano Banana 2).
 * Resolução por imagem (campo "resolucao" em prompts-imagens.json; ex.: hero em 2K, crítica/LCP).
 * Padrão 1K, que cobre o resto do site em tela retina. GEMINI_IMAGE_SIZE troca o padrão.
 * O gemini-2.5-flash-image não aceita resolução e gera em ~1K.
 */
import { readFile, writeFile, stat, rm, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const raiz = path.resolve(import.meta.dirname, '..')
const pastaImagens = path.join(raiz, 'public/images')
const pastaOriginais = path.join(raiz, 'docs/imagens-geradas')

// Placeholders do gerar-placeholders.mjs têm ~20–45 KB; uma foto de verdade passa de 80 KB.
const LIMITE_PLACEHOLDER = 60 * 1024

// Proporções aceitas pelo Gemini; o og (1.91:1) sai em 16:9 e é recortado.
const PROPORCAO_GEMINI = { '4:5': '4:5', '3:4': '3:4', '4:3': '4:3', '1.91:1': '16:9' }

async function lerEnv() {
  const arquivo = path.join(raiz, 'nanobanana.env')
  let texto
  try {
    texto = await readFile(arquivo, 'utf8')
  } catch {
    throw new Error('Não achei nanobanana.env na raiz do projeto.')
  }
  const env = {}
  for (const linha of texto.split('\n')) {
    const m = linha.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  if (!env.GEMINI_API_KEY) throw new Error('Preencha GEMINI_API_KEY em nanobanana.env.')
  return env
}

async function ehPlaceholder(arquivo, id) {
  // Já gerada por este script (o original fica em docs/imagens-geradas/): não é placeholder.
  if (await stat(path.join(pastaOriginais, `${id}.png`)).catch(() => null)) return false
  try {
    return (await stat(arquivo)).size < LIMITE_PLACEHOLDER
  } catch {
    return true
  }
}

async function gerar({ chave, modelo, prompt, proporcao, tamanho, referencias }) {
  const partes = [{ text: prompt }]
  for (const ref of referencias) {
    const dados = await readFile(path.join(pastaImagens, ref))
    partes.push({ inlineData: { mimeType: 'image/jpeg', data: dados.toString('base64') } })
  }
  const resposta = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': chave },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: partes }],
        generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: proporcao, ...(tamanho && { imageSize: tamanho }) } },
      }),
    },
  )
  const json = await resposta.json()
  if (!resposta.ok) throw new Error(`${resposta.status}: ${json.error?.message ?? JSON.stringify(json)}`)
  const parte = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)
  if (!parte) {
    const motivo = json.candidates?.[0]?.finishReason ?? json.promptFeedback?.blockReason ?? 'sem imagem'
    throw new Error(`o modelo não devolveu imagem (${motivo})`)
  }
  const uso = json.usageMetadata ?? {}
  return {
    imagem: Buffer.from(parte.inlineData.data, 'base64'),
    entrada: uso.promptTokenCount ?? 0,
    saida: uso.candidatesTokenCount ?? 0,
  }
}

async function main() {
  const args = process.argv.slice(2)
  const todas = args.includes('--todas')
  const escolhidas = args.filter((a) => !a.startsWith('--'))

  const env = await lerEnv()
  const modelo = env.GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-image-preview'
  // 1K cobre galeria, equipe, sobre e mapa em retina; só o hero pede 2K (ver prompts-imagens.json).
  const aceitaTamanho = !modelo.startsWith('gemini-2.5')
  const tamanhoPadrao = env.GEMINI_IMAGE_SIZE || '1K'
  const manifesto = JSON.parse(await readFile(path.join(raiz, 'scripts/manifesto-imagens.json'), 'utf8'))
  const { estilo, imagens } = JSON.parse(await readFile(path.join(raiz, 'scripts/prompts-imagens.json'), 'utf8'))

  const desconhecidas = escolhidas.filter((id) => !manifesto.some((m) => m.id === id))
  if (desconhecidas.length) throw new Error(`Imagem desconhecida: ${desconhecidas.join(', ')}`)

  const fila = []
  for (const item of manifesto) {
    const destino = path.join(pastaImagens, item.arquivo)
    if (escolhidas.length ? escolhidas.includes(item.id) : todas || (await ehPlaceholder(destino, item.id))) {
      fila.push({ ...item, destino })
    }
  }
  if (!fila.length) {
    console.log('Nada a gerar: todas as imagens já são fotos de verdade. Passe nomes ou --todas para refazer.')
    return
  }

  await mkdir(pastaOriginais, { recursive: true })
  console.log(`Modelo ${modelo} — gerando ${fila.length}: ${fila.map((f) => f.id).join(', ')}\n`)
  let falhas = 0
  const tokens = { entrada: 0, saida: 0 }
  for (const item of fila) {
    const p = imagens[item.id]
    const tamanho = aceitaTamanho ? (p.resolucao ?? tamanhoPadrao) : undefined
    // O mapa é ilustração: não leva o bloco de estilo fotográfico.
    const partes = [p.prompt]
    if (item.id !== 'mapa' && estilo) partes.push(`Style: ${estilo}.`)
    if (p.negativo) partes.push(`Avoid: ${p.negativo}.`)
    const referencias = p.referencias ?? []
    if (referencias.length) {
      partes.push(
        'The attached photo is a reference from the same barbershop: keep the same room, light and, if the same person appears, the same face. Do not copy its composition.',
      )
    }
    process.stdout.write(`• ${item.id}${tamanho ? ` [${tamanho}]` : ''} … `)
    try {
      const { imagem: bruta, entrada, saida } = await gerar({
        chave: env.GEMINI_API_KEY,
        modelo,
        prompt: partes.join('\n\n'),
        proporcao: PROPORCAO_GEMINI[item.proporcao],
        tamanho,
        referencias,
      })
      tokens.entrada += entrada
      tokens.saida += saida
      await writeFile(path.join(pastaOriginais, `${item.id}.png`), bruta)
      await sharp(bruta)
        .resize(item.largura, item.altura, { fit: 'cover' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(item.destino)
      const kb = Math.round((await stat(item.destino)).size / 1024)
      console.log(`ok (${item.largura}×${item.altura}, ${kb} KB; tokens: ${entrada} entrada, ${saida} saída)`)
    } catch (erro) {
      falhas++
      console.log(`falhou — ${erro.message}`)
    }
  }

  // O otimizador do Next guarda a versão antiga em cache.
  await rm(path.join(raiz, '.next/dev/cache/images'), { recursive: true, force: true })
  await rm(path.join(raiz, '.next/cache/images'), { recursive: true, force: true })
  console.log(`\nTokens usados: ${tokens.entrada} de entrada, ${tokens.saida} de saída (preço por token na tabela do modelo).`)
  console.log(`\nPronto. Originais em docs/imagens-geradas/. Recarregue o site.${falhas ? ` ${falhas} falharam.` : ''}`)
  if (falhas) process.exitCode = 1
}

main().catch((erro) => {
  console.error(`Erro: ${erro.message}`)
  process.exit(1)
})
