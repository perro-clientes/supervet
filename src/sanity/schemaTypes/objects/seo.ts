import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
      description: 'Título para buscadores. Si se omite, se usa el título de la página.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Descripción',
      rows: 3,
      description: 'Meta descripción para buscadores.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen Open Graph',
      options: {hotspot: true},
    }),
  ],
})
