import {defineArrayMember, defineField, defineType} from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Galería',
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
      name: 'images',
      type: 'array',
      title: 'Imágenes',
      of: [defineArrayMember({type: 'reference', to: [{type: 'galleryImage'}]})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
