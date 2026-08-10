// Patch puntual: re-agrega la contactSection a page.contacto si no existe.
// Uso: node scripts/patch-contact.mjs  (requiere SANITY_API_WRITE_TOKEN en .env.local)
import {createClient} from '@sanity/client'
import {createHash, randomUUID} from 'node:crypto'
import {createReadStream, readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {content, imageRegistry} from './seed/content.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const {projectId, dataset, token} = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
}

if (!projectId || !dataset || !token) {
  console.error('Faltan variables de entorno (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN).')
  process.exit(1)
}

const client = createClient({projectId, dataset, token, useCdn: false})

// 1) Resolver refs de imagen (mismo criterio determinístico que el seed: sha1 del archivo)
const existingAssets = await client.fetch('*[_type == "sanity.imageAsset"]{_id}')
const assetsBySha1 = new Map()
for (const {_id} of existingAssets) {
  const [, sha1] = _id.split('-')
  if (sha1) assetsBySha1.set(sha1, _id)
}

const assetIds = {}
for (const [key, relPath] of Object.entries(imageRegistry)) {
  const abs = resolve(root, relPath)
  const buf = readFileSync(abs)
  const sha1 = createHash('sha1').update(buf).digest('hex')
  const assetId = assetsBySha1.get(sha1)
  if (!assetId) {
    const asset = await client.assets.upload('image', createReadStream(abs), {
      filename: `${key}.${relPath.split('.').pop()}`,
    })
    assetIds[key] = asset._id
    assetsBySha1.set(sha1, asset._id)
  } else {
    assetIds[key] = assetId
  }
}

// 2) Extraer la contactSection del contenido del seed y resolver sus marcadores
function resolveMarkers(node, key) {
  if (Array.isArray(node)) {
    return node.map((item) => {
      const resolved = resolveMarkers(item)
      if (resolved && typeof resolved === 'object' && !resolved._key) {
        return {...resolved, _key: key()}
      }
      return resolved
    })
  }
  if (node && typeof node === 'object') {
    if (node.$ref && node.$ref.startsWith('image:')) {
      const id = assetIds[node.$ref.slice(6)]
      if (!id) throw new Error(`Asset sin resolver: ${node.$ref}`)
      return {_type: 'image', asset: {_type: 'reference', _ref: id}}
    }
    const out = {}
    for (const [k, v] of Object.entries(node)) {
      out[k] = resolveMarkers(v, key)
    }
    return out
  }
  return node
}

const pageDoc = content.find((d) => d._id === 'page.contacto')
if (!pageDoc) {
  console.error('No se encontró page.contacto en el seed.')
  process.exit(1)
}

const seedSection = pageDoc.sections.find((s) => s._type === 'contactSection')
if (!seedSection) {
  console.error('El seed no tiene contactSection para page.contacto.')
  process.exit(1)
}

const resolved = resolveMarkers(seedSection, () => `k${randomUUID().slice(0, 8)}`)

// 3) Chequear si ya existe y agregarla al final de las secciones
const current = await client.fetch('*[_type == "page" && _id == "page.contacto"][0]{_id, sections}')
if (!current) {
  console.error('No se encontró page.contacto en Sanity.')
  process.exit(1)
}

const alreadyHas = (current.sections ?? []).some((s) => s._type === 'contactSection')
if (alreadyHas) {
  console.log('page.contacto ya tiene una contactSection. No se agregó nada.')
  process.exit(0)
}

const sections = [resolved, ...(current.sections ?? [])]
await client.patch('page.contacto').set({sections}).commit()
console.log('✔ contactSection re-agregada a page.contacto (al inicio).')
