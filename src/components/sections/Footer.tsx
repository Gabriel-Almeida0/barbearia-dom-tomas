import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { secoes } from '@/content/secoes'
import { site } from '@/content/site'
import { linkExterno, whatsappUrl } from '@/lib/whatsapp'

const tituloColuna = 'mb-5 font-head text-[.86rem] font-semibold uppercase tracking-[.1em] text-mostarda'
const link =
  'rounded-sm texto-sm text-muted-escuro transition-colors duration-300 ease-marca hover:text-mostarda'

/** Rodapé (T048): marca, navegação, canais e CTA; linha final com copyright e aviso. */
export function Footer() {
  const t = secoes.footer
  const ano = new Date().getFullYear()

  const conecte = [
    { rotulo: 'WhatsApp', href: whatsappUrl(), externo: true },
    { rotulo: 'Instagram', href: site.instagram.url, externo: true },
    { rotulo: site.email.endereco, href: site.email.href, externo: false },
    { rotulo: site.telefone.exibicao, href: site.telefone.href, externo: false },
  ]

  return (
    <footer className="bg-rodape pt-16 text-muted-escuro">
      <Container className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-8">
        <div className="col-span-2 lg:col-span-1">
          <a href="#inicio" className="inline-flex rounded-sm">
            <Logo tamanho={64} comNome />
          </a>
          <p className="texto-sm mt-5 max-w-[34ch]">{site.slogan}</p>
          <p className="texto-sm mt-1 max-w-[34ch]">
            {site.endereco.bairro}, {site.cidade} · desde {site.desde}
          </p>
        </div>

        <nav aria-labelledby="footer-navegue">
          <h2 id="footer-navegue" className={tituloColuna}>
            {t.navegue}
          </h2>
          <ul className="flex flex-col gap-3">
            {site.navegacao.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={link}>
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={tituloColuna}>{t.conecteSe}</h2>
          <ul className="flex flex-col gap-3">
            {conecte.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={link} {...(item.externo ? linkExterno : {})}>
                  {/* <wbr> depois do "@": em telas estreitas o e-mail quebra ali, não no meio do domínio */}
                  {item.rotulo.includes('@') ? (
                    <>
                      {item.rotulo.split('@')[0]}@<wbr />
                      {item.rotulo.split('@')[1]}
                    </>
                  ) : (
                    item.rotulo
                  )}
                  {item.externo ? <span className="sr-only"> (abre em nova aba)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h2 className={tituloColuna}>{t.ctaTitulo}</h2>
          <p className="texto-sm mb-5">{t.ctaTexto}</p>
          <Button href={whatsappUrl()} externo variante="primario" icone="whatsapp" larguraTotalMobile>
            {t.cta}
          </Button>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-linha-escura pt-6 pb-24 text-[.85rem] leading-relaxed sm:flex-row sm:justify-between sm:gap-6 lg:pb-8">
        <p>{t.copyright(ano)}</p>
        <p className="max-w-[60ch] sm:text-right">{site.aviso}</p>
      </Container>
    </footer>
  )
}

export default Footer
