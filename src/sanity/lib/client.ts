import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, readToken } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // El dataset solo expone lectura pública para IDs sin puntos (siteSettings,
  // assets). Con el readToken en la config, `sanityFetch` (defineLive) sigue
  // autenticando aunque no pase el token explícito en perspective "published".
  // El archivo solo se importa desde código server (verificar antes de usar en
  // componentes client).
  token: readToken,
  // Con ISR + revalidación por tag no hace falta el CDN, y evita resultados
  // stale del cache (p. ej. documentos creados por seed que el CDN no ve).
  useCdn: false,
  perspective: 'published',
  stega: {
    studioUrl: '/studio',
  },
})
