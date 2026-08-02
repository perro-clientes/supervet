import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contacto',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Pretítulo',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
    }),
    defineField({
      name: 'intro',
      type: 'text',
      title: 'Introducción',
      rows: 3,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
