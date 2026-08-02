import {defineArrayMember, defineField, defineType} from 'sanity'

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Equipo',
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
    defineField({
      name: 'members',
      type: 'array',
      title: 'Integrantes',
      of: [defineArrayMember({type: 'reference', to: [{type: 'teamMember'}]})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
