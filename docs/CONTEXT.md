# CONTEXT — Supervet

> Documento de contexto del proyecto. **Leer SIEMPRE antes de comenzar a trabajar.**
> Si algo de este documento quedó desactualizado, actualizarlo junto con el código.

---

## 1. Qué es el proyecto

Rebuild institucional de **supervet.com.ar** (clínica veterinaria en Exaltación de la Cruz, Buenos Aires, Argentina).
El sitio actual vive en **Webflow** y se está rehaciendo desde cero sobre:

- **Next.js 16.2.12** (App Router, Turbopack, TypeScript strict)
- **React 19**
- **Tailwind CSS v4** (vía `@tailwindcss/postcss`, sin archivo `tailwind.config`)
- **Sanity v5** como CMS (Studio embebido + Visual Editing)
- **styled-components** (dependencia presente, pero **no se usa** — el proyecto va con Tailwind)

> ⚠️ **IMPORTANTE — Next.js 16 no es Next.js "de entrenamiento":** esta versión tiene cambios breaking (APIs, convenciones, estructura de archivos). Antes de escribir cualquier código de Next, leer la guía correspondiente en `node_modules/next/dist/docs/`. Heed los deprecation notices. Ver `AGENTS.md`.

---

## 2. Stack y versiones

| Capa | Tecnología | Versión | Notas |
|---|---|---|---|
| Framework | Next.js | 16.2.12 | App Router, `next dev` con Turbopack |
| UI | React | 19.2.4 | |
| Estilos | Tailwind CSS | v4 | tokens en `@theme` dentro de `src/app/globals.css` |
| CMS | Sanity | 5.31.1 | Studio embebido en `/studio`, dataset `production` |
| Integración | next-sanity | 13.2.3 | Live Content API (`defineLive`), Visual Editing |
| Imágenes | @sanity/image-url | 2.1.1 | `urlFor()` |
| PortableText | @portabletext/react | 6.2.0 | sin uso actual (ver deuda 11) |
| Visor de queries | @sanity/vision | 5.31.1 | dentro del Studio |

### Proyecto Sanity
- **projectId:** `039fs50w` (vía `NEXT_PUBLIC_SANITY_PROJECT_ID` en `.env.local`)
- **dataset:** `production`
- **apiVersion:** `2026-02-01` (fecha fija, no cambiar)
- **CORS:** `localhost:3000` habilitado
- **Roles/tokens** (ver `.env.local`):
  - `SANITY_API_READ_TOKEN` → server-side, role Viewer (Live Content)
  - `SANITY_API_WRITE_TOKEN` → solo scripts de seed, role Editor (nunca en el browser)
  - `SANITY_PREVIEW_SECRET` → para Draft Mode / Visual Editing

### Hosting
- **Sin deploy configurado aún.** El plan apunta a **Vercel** (recomendado) pero no hay plataforma definida. `.next/` está en el repo local (no commiteado, ver `.gitignore`).
- Branch `main`, remoto `origin` (origin/main). El deploy queda como tarea futura.

---

## 3. Estructura del proyecto

```
supervet/
├── AGENTS.md              # reglas de agente (Next 16 ≠ versiones conocidas)
├── CLAUDE.md              # → @AGENTS.md
├── PLAN.md                # plan de acción por fases (A→H) + inventario del sitio
├── docs/CONTEXT.md        # este documento
├── next.config.ts         # remotePatterns → cdn.sanity.io (imágenes)
├── sanity.config.ts       # config Studio + Visual Editing + resolve.locations
├── sanity.cli.ts          # CLI de Sanity (projectId/dataset desde env)
├── eslint.config.mjs      # eslint-config-next (core-web-vitals + typescript)
├── public/
│   ├── brand/             # logos e iconos SVG (isologotype, huella, phone, email, location)
│   ├── otros/             # fotos e imágenes del sitio (banners, IMG_xxxx, entorno)
│   └── servicios/         # imágenes de los 4 servicios
├── scripts/
│   ├── seed/content.mjs   # contenido completo migrado (documentos + imágenes)
│   ├── seed/index.mjs     # runner del seed (sube assets, resuelve refs, crea docs)
│   └── patch-contact.mjs  # script suelto (parche puntual de contacto)
└── src/
    ├── app/
    │   ├── (site)/        # rutas públicas del sitio (layout + 5 páginas)
    │   ├── api/draft-mode/{enable,disable}/route.ts
    │   ├── studio/[[...tool]]/page.tsx   # Studio embebido
    │   ├── globals.css    # tokens de diseño (@theme) + estilos base
    │   └── layout.tsx     # root layout: font, SanityLive, VisualEditing
    ├── components/
    │   ├── layout/        # Header, Footer, WhatsAppButton
    │   ├── pages/         # SitePage (page genérica)
    │   ├── sections/      # los 13 componentes de sección
    │   └── ui/            # primitivas: Button, Container, Section, Badge, Icon, SanityImage
    ├── lib/
    │   ├── cn.ts          # util de classnames
    │   ├── queries.ts     # GROQ queries + getters (page, settings, metadata, slugs)
    │   ├── site.ts        # defaultSettings, SiteSettings, navItems
    │   └── types.ts       # tipos TS de todas las secciones y documentos
    └── sanity/
        ├── env.ts         # env vars validadas (projectId, dataset, tokens)
        ├── structure.ts   # orden del Studio + siteSettings singleton
        ├── schemaTypes/   # documentos/ + objetos/ (todo el content model)
        └── lib/
            ├── client.ts  # cliente next-sanity (stega, useCdn:false, perspective published)
            ├── live.ts    # defineLive → sanityFetch + SanityLive
            └── image.ts   # urlFor()
```

---

## 4. Comandos útiles

```bash
npm run dev      # dev server (Turbopack) en localhost:3000
npm run build    # build de producción
npm run start    # servir el build
npm run lint     # ESLint (eslint-config-next)
npm run seed     # seed de contenido → Sanity (usa SANITY_API_WRITE_TOKEN)
```

- El Studio vive en **`http://localhost:3000/studio`**.
- Para ver Draft Mode / Visual Editing: desde el Studio (Presentation) o activando draft mode.
- **Criterio de QA antes de cerrar cualquier cambio:** `npm run lint` y `npm run build` verdes.

---

## 5. Arquitectura y flujo de datos

### Patrón de renderizado (CMS-first)
1. Cada ruta `(site)/<pagina>/page.tsx` llama a `getPageMetadata(slug)` para SEO y renderiza `<SitePage slug="..." />`.
2. `SitePage` → `getPage(slug)` (GROQ con `sanityFetch` de `defineLive`) → `SectionRenderer`.
3. `SectionRenderer` mapea `section._type` → componente de sección (`switch` en `src/components/sections/SectionRenderer.tsx`).
4. El `(site)/layout.tsx` obtiene `siteSettings` y renderiza Header + Footer + WhatsAppButton.
5. `src/app/layout.tsx` (root) renderiza `SanityLive` (Live Content, con `includeDrafts` si draft mode activo) y `<VisualEditing />` solo en draft mode.
6. `revalidate = 60` en cada página (ISR por tiempo). `useCdn: false` + Live Content.

### Draft Mode / Visual Editing (funciona end-to-end)
- `src/app/api/draft-mode/enable/route.ts` → `defineEnableDraftMode` (next-sanity).
- `src/app/api/draft-mode/disable/route.ts` → desactiva.
- `resolve.locations` en `sanity.config.ts` mapea cada documento a su URL (page→`/slug`, service→`/servicios#slug`, etc.).

### Imágenes
- Siempre usar el componente `SanityImage` (`src/components/ui/SanityImage.tsx`) que envuelve `next/image` + `urlFor`.
- `next.config.ts` permite `cdn.sanity.io`.
- `SanityImage` con `fill` pide `width 2000`; con width/height pide `width*2` (retina). Quality default 80.

---

## 6. Content model (schema Sanity)

Todo definido con `defineType`/`defineField` en `src/sanity/schemaTypes/`.

### Documentos (`documents/`)

| Tipo | Campos | Uso |
|---|---|---|
| `siteSettings` (singleton, id `siteSettings`) | `logo, name, address, phone, phoneDisplay, email, whatsapp, instagram, mapsLink, copyright` | datos globales (Header, Footer, WhatsAppButton) |
| `page` | `title, slug, seo, sections[]` | las 5 páginas. `sections` es array tipado de secciones (ver abajo) |
| `service` | `title, slug, description, image, iconImage, order` | 4 servicios reutilizables |
| `teamMember` | `name, role, photo, bio, order` | integrantes del equipo |
| `testimonial` | `quote, author, location, image, rating, order` | testimonios |
| `faq` | `question, answer, order` | preguntas frecuentes |
| `galleryImage` | `title, category, image, order` | imágenes de la galería |

### Secciones (`objects/` — array `sections` de `page`)

| `_type` | Campos clave | Componente |
|---|---|---|
| `hero` | `eyebrow, title, subtitle, image, cta(link)` | `Hero` |
| `servicesHero` | `eyebrow, title, subtitle` | `ServicesHero` |
| `servicesSection` | `eyebrow, title, intro, services[]→service, primaryCta, secondaryCta` | `ServicesGrid` |
| `teamSection` | `eyebrow, title, intro, image, members[]→teamMember` | `TeamSection` |
| `ctaBanner` | `title, subtitle, image, images[]→galleryImage (máx 3), cta` | `CtaBanner` |
| `faqSection` | `eyebrow, title, faqs[]→faq` | `FaqAccordion` |
| `testimonialsSection` | `eyebrow, title, testimonials[]→testimonial` | `TestimonialsSlider` |
| `textSection` | `eyebrow, title, subtitle, image, imageSide, backgroundColor, backgroundImage, cta` | `TextSection` |
| `photoGrid` | `title, photos[] (image inline)` | `PhotoGrid` |
| `gallerySection` | `eyebrow, title, images[]→galleryImage` | `GalleryLightbox` |
| `contactSection` | `eyebrow, title, subtitle, contactItems[], form` | `ContactSection` |
| `environmentSection` | `eyebrow, title, subtitle, image` | `EnvironmentSection` |
| `petShopSection` | `title, subtitle, backgroundImage, cardTitle, cardSubtitle, address, mapsLink` | `PetShopSection` |
| `featureBlock` | `icon (preset), title, description, image` | `FeatureBlock` |

### Objetos auxiliares
- `seo` → `title, description, image` (Open Graph)
- `link` → `label, type (internal|external), page→page, url` (el tipo decide qué campo se muestra; `ctaProjection` en queries lo resuelve a `href`)
- `contactItem` → `icon (image), label, href`
- `contactForm` → labels del formulario (`nameLabel, emailLabel, phoneLabel, messageLabel, submitLabel`)

> **Nota:** `ctaProjection` en `src/lib/queries.ts` resuelve `page->slug.current == "inicio"` a `/`.

---

## 7. Datos globales del sitio (siteSettings, seed)

| Dato | Valor |
|---|---|
| Logo | `isologotype-256x256.png` |
| WhatsApp | `https://wa.link/d58b39` (+54 11 2593-0355) |
| Email | `supervetclinicadeanimales@gmail.com` |
| Teléfono (display) | `11-2-5930-355` |
| Dirección | RUTA 8 km 72 (barrio los pinos, remanso) Exaltación de la Cruz |
| Instagram | `https://www.instagram.com/supervetok/` |
| Maps | `https://maps.app.goo.gl/N3yoghc7kTaLiaMd7` |
| Copyright | © 2025 Supervet |

### Páginas y sus secciones (orden en el seed)
- **Inicio `/`**: hero → servicesSection → teamSection → ctaBanner → faqSection → testimonialsSection
- **Nosotros `/nosotros`**: hero → photoGrid (5 fotos) → textSection ×2 → ctaBanner → featureBlock ×3 (Pet Shop / El remanso / El entorno)
- **Servicios `/servicios`**: servicesHero → servicesSection → ctaBanner
- **Galería `/galeria`**: gallerySection (9 imágenes)
- **Contacto `/contacto`**: contactSection → environmentSection

### Los 4 servicios
1. Cirugía y Traumatología
2. Diagnóstico por imágenes
3. Fisioterapia y Rehabilitación
4. Clínica médica, Nutrición, Dermatología y Homeopatía

---

## 8. Diseño (tokens)

Paleta y tokens definidos en `src/app/globals.css` (`@theme`), extraídos del template **Pawcare** de Webflow:

- **Primary:** `#fce5ab` (crema) · `--color-primary-soft: #fce5ab59`
- **Secondary:** `#318c8b` (verde) · `--color-secondary-dark: #133737` · `--color-secondary-light: #c8dfdf`
- **Accent-01:** `#be561d` (naranja) · **Accent-02:** `#402b17` (marrón) · **Accent-03:** `#d0f3a2`
- **Ink:** `#133737` (texto) · **Muted:** `#7b7ba0`
- **Fuente:** Montserrat (Google Fonts vía `next/font`, variable `--font-montserrat`)
- **Spacing:** `--spacing-container: 1366px` · **Radius:** `--radius-pill: 300px`

> FASE H (pendiente): mapear tokens 1:1 cuando llegue el archivo de **Figma**.

---

## 9. Estado del proyecto por fase (PLAN.md)

| Fase | Descripción | Estado |
|---|---|---|
| **A** | Content model (schema Sanity) | ✅ Completo |
| **B** | Migración de assets + seed | ✅ Script listo (`npm run seed`) |
| **C** | Componentes base de UI (layout shell) | ✅ Header, Footer, WhatsAppButton |
| **D** | Páginas + renderizado de secciones | ✅ 5 rutas + SectionRenderer + SEO dinámico |
| **E** | Componentes de sección específicos | ✅ Los 13 existen y renderizan |
| **F** | Formulario de contacto | ⚠️ **INCOMPLETO** (ver deudas) |
| **G** | Visual Editing + QA final | ⚠️ Parcial: draft-mode + resolve.locations ok; faltan sitemap/robots y QA build/lint |
| **H** | Diseño final (Figma) | ⏳ Pendiente |

---

## 10. Deudas técnicas y decisiones pendientes

1. **Formulario de contacto (FASE F) — incompleto.**
   - `ContactForm.tsx`: `handleSubmit` es un **no-op** (solo `event.preventDefault()`).
   - **No existe** `src/app/api/contact/route.ts`.
   - **Provider sin decidir:** ReSend / Cloudflare redirect / otro.
2. **SEO técnico (FASE G):** faltan `sitemap.xml` y `robots.txt`.
3. **FAQ:** las 3 respuestas del seed son **lorem ipsum** (el sitio actual también); pendiente reemplazarlas por respuestas reales desde el Studio.
4. **Equipo:** el bloque `teamSection` existe pero `members: []` (no hay `teamMember` publicados). Decidir si se cargan o los carga el cliente.
5. **Términos / Políticas:** en el Footer apuntan a `/` sin contenido propio. Decidir si crear esas páginas o quitarlas.
6. **Deploy:** no hay plataforma configurada (Vercel recomendado).
7. **Diseño:** paleta y tipografía son placeholder del template Pawcare hasta recibir el **Figma** (FASE H).
8. **`styled-components`** está en `package.json` pero no se usa; se puede remover.
9. **`scripts/patch-contact.mjs`** es un script suelto de parche puntual (no forma parte del flujo de seed normal).
10. **Footer:** `CtaBanner` tiene el título hardcodeado ("Agendá hoy tu consulta para atenderte.") en vez de usar `section.title`/`section.subtitle` del schema.
11. **`@portabletext/react`** quedó sin uso tras reemplazar `body` (PortableText) por `subtitle` en `textSection`; se puede remover de `package.json`.

---

## 11. Convenciones de código (respetar SIEMPRE)

- **Sin comentarios en el código** salvo que se pidan explícitamente.
- **Idioma:** contenido del sitio y textos en español; identificadores en inglés.
- **Imports:** alias `@/` → `src/`. Orden: externos → internos (ver cualquier componente existente).
- **Componentes:** server components por defecto; `"use client"` solo cuando haya estado/eventos (Header, FaqAccordion, GalleryLightbox, TestimonialsSlider, ContactForm).
- **Imágenes de Sanity:** siempre vía `SanityImage` (`fill` + `sizes` correctos, `object-cover`).
- **Enlaces:** `Button` con `href` renderiza `<a>`; CTAs del CMS usan el tipo `link` resuelto a `href` por la query.
- **Tailwind v4:** usar tokens `@theme` (`text-secondary`, `bg-primary-soft`, `rounded-pill`, `max-w-container`, etc.). No hay `tailwind.config`; las utilidades custom se definen en `globals.css`.
- **Estilos inline/exóticos:** el template Pawcare usa radios redondeados muy grandes (`rounded-3xl`, `rounded-4xl`, pill) — mantener la estética.
- **Antes de tocar Next:** leer docs en `node_modules/next/dist/docs/` (AGENTS.md).
- **Cierre de cualquier tarea:** `npm run lint` y `npm run build` verdes.

---

## 12. Flujo de trabajo acordado

1. **Siempre** pedir que se lea este documento (`docs/CONTEXT.md`) antes de empezar.
2. Se trabaja **una fase/feature por vez**, con un mini plan y aprobación explícita del usuario.
3. Al cerrar: verificación (lint + build) + resumen de archivos tocados y criterio de aceptación.
4. Mantener `PLAN.md` y este `CONTEXT.md` actualizados ante cambios estructurales.
