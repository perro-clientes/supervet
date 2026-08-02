import {defineArrayMember, defineField, defineType} from 'sanity'

export const photoGrid = defineType({
  name: 'photoGrid',
  title: 'Galería de fotos',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
    }),
    defineField({
      name: 'photos',
      type: 'array',
      title: 'Fotos',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
