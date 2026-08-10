import {defineField, defineType} from 'sanity'

export const servicesHero = defineType({
  name: 'servicesHero',
  title: 'Hero de Servicios',
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
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
