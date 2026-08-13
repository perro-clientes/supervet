# Plan de Acción — Rebuild de Supervet

Rebuild institucional de [supervet.com.ar](https://supervet.com.ar/) (actualmente en Webflow) sobre **Next.js 16 + TypeScript + Tailwind v4 + Sanity v5 (Studio embebido + Visual Editing)**.

---

## 1. Estado actual (scaffold completado)

- Next.js 16.2.12 (App Router, Turbopack, TS strict), React 19, Tailwind v4, ESLint.
- Sanity v5.31.1, `next-sanity@13.2.3`, `@sanity/vision`, `@sanity/image-url`. Proyecto `039fs50w`, dataset `production`, CORS `localhost:3000` ok.
- Studio embebido en `/studio` con Presentation Tool (`/api/draft-mode/enable`).
- `src/sanity/`: `env`, `lib/client` (stega), `lib/live`, `lib/image`.
- Rutas draft-mode enable/disable.
- `schemaTypes/` con esqueleto `documents/` y `objects/` (vacíos).
- `.env.local` listo (falta completar nada: READ_TOKEN cargado).

## 2. Decisiones tomadas

1. **Las páginas son editables desde Sanity** (content model `page` + secciones). El Visual Editing es el objetivo central.
2. **Formulario de contacto**: se construye con la UI + API route propia; el provider (ReSend, Cloudflare redirect, otro) se decide en la FASE F.
3. **Contenido inicial**: se migra el contenido actual del sitio (textos reales) e imágenes desde Webflow → Sanity. Después todo es editable desde el Studio.

## 3. Inventario del sitio actual

### Datos globales (`siteSettings`)
| Dato | Valor |
|---|---|
| Logo | `isologotype-256x256.png` |
| WhatsApp | `https://wa.link/d58b39` (+54 11 2593-0355) |
| Email | `supervetclinicadeanimales@gmail.com` |
| Teléfono (display) | `11-2-5930-355` |
| Dirección | RUTA 8 km 72 (barrio los pinos, remanso) Exaltacion de la Cruz |
| Instagram | `https://www.instagram.com/supervetok/` |
| Google Maps | `https://maps.app.goo.gl/N3yoghc7kTaLiaMd7` |
| Copyright | © 2025 Supervet |

### Páginas
- **Inicio (`/`)**: hero → servicios (intro + 4 cards) → equipo → CTA banner → FAQ (3 preguntas) → testimonios.
- **Nosotros (`/nosotros`)**: hero + galería de fotos → "Supervet no es una clínica más" → servicios (texto) → CTA banner → Pet Shop → El remanso (mapa) → Nuestro diferencial: el entorno.
- **Servicios (`/servicios`)**: hero → 4 servicios (cards) → CTA banner.
- **Galería (`/galeria`)**: lightbox/masonry con 9 imágenes.
- **Contacto (`/contacto`)**: hero → datos de contacto → formulario → Nuestro diferencial: el entorno.

### Servicios (×4, reutilizables)
| Servicio | Descripción | Imagen |
|---|---|---|
| Cirugía y Traumatología | Desde los procedimientos de rutina hasta las intervenciones más complejas. | servicio-cirugia.png |
| Diagnóstico por imágenes | Disponemos de rayos X digitales y ecografías de alta resolución. | servicio-diagnostico.png |
| Fisioterapia y Rehabilitación | Ayudamos a que los animales recuperen movilidad, fuerza y calidad de vida. | servicio-fisio.png |
| Clínica médica, Nutrición, Dermatología y Homeopatía | Atención integral y personalizada para prevenir, diagnosticar y tratar enfermedades | servicio-clinica.png |

> Intro servicios (texto): "Ecografía, Rayos X, Traumatología, Cirugías de todo tipo, Internación diurna, Cardiología, Fisioterapia, Nutrición y Dermatología."

### Otros contenidos
- **Testimonio (×1, hoy repetido)**: "Un equipo de profesionales en quien confiar..." — Sofia Vergada, Luján, Buenos Aires.
- **FAQ (×3, hoy lorem ipsum)**: ¿Dónde estamos ubicados? / ¿Hacemos consultas virtuales? / ¿Nos acercamos a domicilio?
- **Banner CTA**: "Agendá hoy tu consulta para atenderte".
- **Equipo**: bloque "Conocé a nuestro equipo veterinario" (hoy sin miembros publicados).
- **Footer**: logo, páginas, recursos (Términos / Políticas), contacto, Instagram.

### Assets a migrar (~20 imágenes)
- Logos: isologotype, wp-logo.
- Home: home-hero, nosotros, banners 1-3.
- Servicios: 4 imágenes.
- Nosotros: 5 fotos (IMG_3755, IMG_4273, IMG_3837, IMG_5077, IMG_5649) + IMG_3934 (pet shop) + IMG_2621 (entorno).
- Contacto: entorno.jpg, los-angeles-default (mapa estático).
- Galería: 9 imágenes.
- Iconos SVG: huella, phone, email, location, (formas decorativas del template Pawcare se recrean en SVG/CSS).

## 4. Fases

### FASE A — Content model (schema Sanity)
**Objetivo:** tipos de documento + secciones editables desde el Studio.

**Archivos:**
- `src/sanity/schemaTypes/documents/`: `page.ts`, `siteSettings.ts`, `service.ts`, `teamMember.ts`, `testimonial.ts`, `faq.ts`, `galleryImage.ts`.
- `src/sanity/schemaTypes/objects/`: `seo.ts`, `link.ts`, `hero.ts`, `servicesSection.ts`, `teamSection.ts`, `ctaBanner.ts`, `faqSection.ts`, `testimonialsSection.ts`, `textSection.ts`, `photoGrid.ts`, `gallerySection.ts`, `contactSection.ts`, `featureBlock.ts`.
- `src/sanity/structure.ts`: orden de la navegación + `siteSettings` como singleton.
- `sanity.config.ts`: `resolve.locations` mapeando tipos → rutas (hero→`/`, service→`/servicios#slug`, etc.).

**Modelo de datos clave:**
- `page` `{ title, slug, seo, sections: [hero, servicesSection, teamSection, ctaBanner, faqSection, testimonialsSection, textSection, photoGrid, gallerySection, contactSection, featureBlock] }` — array tipado de secciones.
- `siteSettings` (singleton) `{ logo, name, address, phone, phoneDisplay, email, whatsapp, instagram, mapsLink, copyright }`.
- `service` `{ title, slug, description, image, icon, order }` (icon = preset "huella" u otro).
- `testimonial` `{ quote, author, location, rating, order }`.
- `faq` `{ question, answer, order }`.
- `teamMember` `{ name, role, photo, bio, order }`.
- `galleryImage` `{ title, category, image, order }`.

**Criterio de aceptación:** el Studio muestra todos los tipos, se crean documentos sin error, `sanity typegen` o `tsc` pasan.

### FASE B — Migración de assets + seed de contenido
**Objetivo:** contenido real en Sanity (los 5 documentos `page`, 4 servicios, 3 FAQs, 1 testimonio, siteSettings, ~20 imágenes).

**Archivos/acciones:**
- Script `scripts/seed/*` (Node con `sanity` client): descarga las imágenes del CDN de Webflow → `client.assets.upload('image', ...)` → crea los documentos iniciales con las referencias.
- Verificación de cada imagen/URL antes de migrar (algunas URLs del Webflow pueden faltar).

**Criterio de aceptación:** todo el contenido del inventario (sección 3) está en el dataset y editable; el Studio muestra las imágenes.

### FASE C — Componentes base de UI
**Objetivo:** layout shell + primitivas.

**Archivos:**
- `src/components/layout/Header.tsx`, `Footer.tsx`, `WhatsAppButton.tsx`.
- `src/components/ui/`: `Container`, `Button`, `Section`, `Badge`.
- Fuente del template (fuente Pawcare / Google Fonts) + tokens base en `globals.css` (`@theme`).
- `siteSettings` consultado vía `sanityFetch` en el layout.

**Criterio de aceptación:** header/footer renderizan datos globales reales (logo, nav, teléfono, instagram).

### FASE D — Páginas + renderizado de secciones
**Objetivo:** las 5 rutas renderizan contenido de Sanity con Draft Mode + Live Content.

**Archivos:**
- `src/app/(site)/page.tsx` (home), `nosotros/page.tsx`, `servicios/page.tsx`, `galeria/page.tsx`, `contacto/page.tsx`.
- `src/components/sections/SectionRenderer.tsx` (mapeo `section._type` → componente).
- `src/lib/queries.ts` (GROQ para páginas + settings).
- Metadata/SEO dinámico por página (`seo` object).

**Criterio de aceptación:** 5 páginas renderizan el contenido seed; editar en Studio → Live Content refleja cambios; Draft Mode muestra drafts.

### FASE E — Componentes de sección específicos
**Objetivo:** paridad visual con Webflow.

**Archivos:** `src/components/sections/`: `HeroSection`, `AboutHero`, `ServicesSection`, `ServicesHeroSection`, `TeamSection`, `CtaBanner`, `FaqSection`, `TestimonialsSection`, `PhotoGrid`, `GallerySection`, `ContactSection`, `FeatureBlock`, `TextSection`.

**Criterio de aceptación:** cada sección replica el diseño actual (mobile + desktop).

### FASE F — Formulario de contacto
**Objetivo:** UI del form + envío.

**Archivos:**
- `src/components/sections/ContactForm.tsx` (estados idle/success/error).
- `src/app/api/contact/route.ts` (endpoint propio).
- Decisión abierta: ReSend / Cloudflare redirect / otro — se resuelve acá.

**Criterio de aceptación:** submit funciona en local con feedback de éxito/error.

### FASE G — Visual Editing + QA final
**Objetivo:** round-trip completo de Visual Editing + release-ready.

**Acciones:**
- `resolve.locations` completo y testeado (click en el sitio → abre el documento correcto en Studio y viceversa).
- Draft mode end-to-end (Presentation Tool con drafts).
- SEO: sitemap.xml, robots.txt, Open Graph, `metadata` por página.
- Chequeo de performance: `next/image` con las imágenes de Sanity, `image` sizes.
- `npm run build`, `npm run lint` limpios.

**Criterio de aceptación:** FASE 11 del scaffold + Visual Editing round-trip + build/lint verdes.

### FASE H — Diseño final (Figma)
**Objetivo:** mapear design tokens 1:1 cuando llegue el archivo de Figma.

**Acciones:** tokens en `@theme` (colores, tipografías, spacing) + ajustes de componentes según diseño.

**Criterio de aceptación:** el sitio matchea el Figma pixel-perfect.

## 5. Preguntas abiertas / deudas

- **Provider del form** (FASE F): ReSend vs Cloudflare redirect vs otro.
- **Tipografía exacta** del template Pawcare (a confirmar al recibir Figma; mientras tanto se usa la del template).
- **Paleta de colores**: placeholder hasta Figma (verde/naturaleza del sitio actual).
- **Equipo**: el bloque existe pero no hay miembros publicados — ¿los cargamos nosotros o el cliente?
- **Términos / Políticas**: hoy apuntan a `/` sin contenido — ¿los creamos o los omitimos en la primera versión?

## 6. Flujo de trabajo

- Se aplica una fase por vez, con plan de acción breve previo y aprobación explícita.
- Al cierre de cada fase: verificación + resumen (archivos tocados, criterio de aceptación).
