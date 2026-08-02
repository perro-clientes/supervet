'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {defineLocations} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Visual Editing (Presentation Tool)
    // https://www.sanity.io/docs/visual-editing
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        locations: {
          siteSettings: defineLocations({
            select: {title: 'name'},
            resolve: () => ({
              locations: [{title: 'Inicio', href: '/'}],
            }),
          }),
          page: defineLocations({
            select: {title: 'title', slug: 'slug'},
            resolve: (doc) => {
              if (!doc?.slug?.current) {
                return {
                  locations: [],
                  message: 'Falta el slug para resolver la URL',
                  tone: 'caution',
                }
              }
              const slug = doc.slug.current
              const href = slug === 'inicio' ? '/' : `/${slug}`
              return {
                locations: [{title: doc.title || 'Página', href}],
              }
            },
          }),
          service: defineLocations({
            select: {title: 'title', slug: 'slug'},
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Servicio',
                  href: `/servicios${doc?.slug?.current ? `#${doc.slug.current}` : ''}`,
                },
              ],
            }),
          }),
          teamMember: defineLocations({
            select: {title: 'name'},
            resolve: (doc) => ({
              locations: [{title: doc?.title || 'Equipo', href: '/nosotros'}],
            }),
          }),
          testimonial: defineLocations({
            select: {title: 'author'},
            resolve: (doc) => ({
              locations: [{title: doc?.title || 'Testimonios', href: '/'}],
            }),
          }),
          faq: defineLocations({
            select: {title: 'question'},
            resolve: (doc) => ({
              locations: [
                {title: doc?.title || 'Preguntas frecuentes', href: '/'},
              ],
            }),
          }),
          galleryImage: defineLocations({
            select: {title: 'title'},
            resolve: (doc) => ({
              locations: [{title: doc?.title || 'Galería', href: '/galeria'}],
            }),
          }),
        },
      },
    }),
  ],
})
