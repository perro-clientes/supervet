import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutHero = defineType({
  name: 'aboutHero',
  title: 'Hero de Nosotros',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Color de fondo',
      options: {
        list: [
          {title: 'Blanco', value: 'white'},
          {title: 'Crema suave', value: 'primary-soft'},
          {title: 'Verde claro', value: 'secondary-light'},
          {title: 'Verde lima', value: 'accent-3'},
          {title: 'Crema', value: 'primary'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'primary-soft',
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
      name: 'images',
      type: 'array',
      title: 'Imágenes',
      description:
        'Máximo 4 imágenes en relación 1:1. Cada posición tiene un tamaño fijo.',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'aboutHeroImage',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Imagen',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Texto alternativo',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'backgroundColor'},
  },
})
