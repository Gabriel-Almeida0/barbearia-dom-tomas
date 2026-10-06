import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.urlBase}/`, changeFrequency: 'monthly', priority: 1 }]
}
