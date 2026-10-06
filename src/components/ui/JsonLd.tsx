import { site } from '@/content/site'

/**
 * JSON-LD só do WebSite. A Dom Tomás é fictícia: não publicamos BarberShop (endereço, geo,
 * telefone, horário) para o Google não indexar uma barbearia que não existe em BH.
 * Serializado com `<` → `<` contra injeção.
 */
export function JsonLd() {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.nome,
    url: `${site.urlBase}/`,
    description: site.descricao,
    inLanguage: 'pt-BR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  )
}
