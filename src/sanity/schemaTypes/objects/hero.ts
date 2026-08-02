import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Subtítulo',
      rows: 3,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cta',
      type: 'link',
      title: 'Botón principal',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
