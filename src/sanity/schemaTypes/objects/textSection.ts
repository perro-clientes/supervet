import {defineArrayMember, defineField, defineType} from 'sanity'

export const textSection = defineType({
  name: 'textSection',
  title: 'Bloque de texto',
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
      name: 'body',
      type: 'array',
      title: 'Contenido',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'cta',
      type: 'link',
      title: 'Botón',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
