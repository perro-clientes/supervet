// Seed del contenido inicial de Supervet hacia Sanity.
// Uso: npm run seed  (requiere SANITY_API_WRITE_TOKEN en .env.local)
import {createClient} from '@sanity/client'
import {createHash} from 'node:crypto'
import {createReadStream, readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {content, imageRegistry} from './content.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')

const {projectId, dataset, apiVersion, token} = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_WRITE_TOKEN,
}

if (!projectId || !dataset || !token) {
  console.error(
    'Faltan variables de entorno. Chequeá que .env.local tenga NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET y SANITY_API_WRITE_TOKEN (token de escritura).'
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion || '2026-02-01',
  token,
  useCdn: false,
})

let counter = 0
const key = () => `k${(counter++).toString(36)}`

// 1) Subir assets locales (reutilizando los que ya existen, por sha1 del archivo)
const existingAssets = await client.fetch(
  '*[_type == "sanity.imageAsset"]{_id}'
)
const assetsBySha1 = new Map()
for (const {_id} of existingAssets) {
  const [, sha1] = _id.split('-')
  if (sha1) assetsBySha1.set(sha1, _id)
}

const assetIds = {}
for (const [imageKey, relPath] of Object.entries(imageRegistry)) {
  const abs = resolve(root, relPath)
  try {
    const buf = readFileSync(abs)
    const sha1 = createHash('sha1').update(buf).digest('hex')
    const ext = relPath.split('.').pop()
    // El id del asset es deterministico: image-<sha1>-<w>x<h>-<ext>
    // Se verifica si ya existe para evitar duplicados entre corridas.
    let assetId = assetsBySha1.get(sha1) || null
    if (!assetId) {
      const asset = await client.assets.upload('image', createReadStream(abs), {
        filename: `${imageKey}.${ext}`,
      })
      assetId = asset._id
      assetsBySha1.set(sha1, assetId)
    }
    assetIds[imageKey] = assetId
    console.log(`  ✔ imagen ${imageKey} → ${assetId}`)
  } catch (error) {
    console.error(`  ✖ falló subida de ${imageKey} (${abs})`, error.message)
    process.exit(1)
  }
}

// 2) Resolver marcadores ($ref image:/doc:) y agregar _key a los arrays
function resolveMarkers(node) {
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
      if (!id) {
        throw new Error(`Asset sin resolver: ${node.$ref}`)
      }
      return {_type: 'image', asset: {_type: 'reference', _ref: id}}
    }
    if (node.$ref && node.$ref.startsWith('doc:')) {
      return {_type: 'reference', _ref: node.$ref.slice(4)}
    }
    const out = {}
    for (const [k, v] of Object.entries(node)) {
      out[k] = resolveMarkers(v)
    }
    return out
  }
  return node
}

// 3) Orden topológico: los documentos referenciados se crean primero,
//    así Sanity no rechaza referencias a documentos inexistentes.
function collectDocRefs(node, set) {
  if (Array.isArray(node)) {
    node.forEach((item) => collectDocRefs(item, set))
    return
  }
  if (node && typeof node === 'object') {
    if (typeof node.$ref === 'string' && node.$ref.startsWith('doc:')) {
      set.add(node.$ref.slice(4))
    } else {
      Object.values(node).forEach((v) => collectDocRefs(v, set))
    }
  }
}

const byId = new Map(content.map((d) => [d._id, d]))
const order = []
const seen = new Set()
const visiting = new Set()
function visit(doc) {
  if (seen.has(doc._id)) return
  if (visiting.has(doc._id)) return
  visiting.add(doc._id)
  const refs = new Set()
  collectDocRefs(doc, refs)
  for (const ref of refs) {
    const target = byId.get(ref)
    if (target) visit(target)
  }
  visiting.delete(doc._id)
  seen.add(doc._id)
  order.push(doc)
}
content.forEach(visit)

// 4) Crear (o reemplazar) los documentos
for (const doc of order) {
  const resolved = resolveMarkers(doc)
  try {
    await client.createOrReplace(resolved)
    console.log(`  ✔ ${doc._id} (${doc._type})`)
  } catch (error) {
    console.error(`  ✖ falló ${doc._id}`, error.message)
    process.exit(1)
  }
}

console.log(
  `\nSeed completo: ${content.length} documentos + ${Object.keys(assetIds).length} assets.`
)
