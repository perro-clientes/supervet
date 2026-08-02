import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Servicios',
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
      name: 'services',
      type: 'array',
      title: 'Servicios',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
