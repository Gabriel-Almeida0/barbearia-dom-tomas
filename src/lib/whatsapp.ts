import { site } from '@/content/site'
import type { Barbeiro, Servico } from '@/content/types'

/**
 * Única fonte das URLs do WhatsApp (constituição, princípio I; contracts/whatsapp-links.md).
 * Nenhum componente monta `wa.me` à mão.
 */

/** https://wa.me/5531995550142?text=<mensagem URL-encoded> */
export function whatsappUrl(mensagem: string = site.whatsapp.mensagemPadrao): string {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`
}

/** "Olá! Quero agendar Degradê (Fade) na Dom Tomás." */
export function mensagemServico(servico: Pick<Servico, 'nome'>): string {
  return `Olá! Quero agendar ${servico.nome} na Dom Tomás.`
}

/** "Olá! Quero agendar um horário com o Rafael na Dom Tomás." (primeiro nome) */
export function mensagemBarbeiro(barbeiro: Pick<Barbeiro, 'nome'>): string {
  return `Olá! Quero agendar um horário com o ${barbeiro.nome.split(' ')[0]} na Dom Tomás.`
}

/** Espalhe em todo <a> externo: <a href={…} {...linkExterno}>. */
export const linkExterno = { target: '_blank', rel: 'noopener noreferrer' } as const
