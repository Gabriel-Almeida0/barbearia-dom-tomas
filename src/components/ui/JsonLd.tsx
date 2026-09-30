import { site } from '@/content/site'
import { faixaDePreco } from '@/content/servicos'
import { imagens } from '@/content/imagens'

/**
 * JSON-LD BarberShop (research R12; node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
 * Serializado com `<` → `<` contra injeção.
 */
export function JsonLd() {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    name: site.nome,
    description: site.descricao,
    slogan: site.slogan,
    url: site.urlBase,
    image: new URL(imagens.og.src, site.urlBase).toString(),
    telephone: site.telefone.e164,
    email: site.email.endereco,
    priceRange: faixaDePreco(),
    foundingDate: String(site.desde),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.endereco.rua,
      addressLocality: site.cidade,
      addressRegion: site.uf,
      postalCode: site.endereco.cep,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.endereco.geo.lat,
      longitude: site.endereco.geo.lng,
    },
    openingHoursSpecification: site.horarios
      .filter((h) => !h.fechado && h.abre && h.fecha)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.schemaDias,
        opens: h.abre,
        closes: h.fecha,
      })),
    sameAs: [site.instagram.url],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  )
}
