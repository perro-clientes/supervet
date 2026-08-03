import {defineArrayMember, defineField, defineType} from 'sanity'

export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'Banner CTA',
  type: 'object',
  fields: [
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
      rows: 2,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen de fondo',
      options: {hotspot: true},
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Imágenes de la galería',
      description: 'Se muestran apiladas sobre el banner (máx. 3)',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'galleryImage'}],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      type: 'link',
      title: 'Botón',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'cta.label'},
  },
})
