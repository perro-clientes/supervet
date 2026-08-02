import {defineField, defineType} from 'sanity'

export const featureBlock = defineType({
  name: 'featureBlock',
  title: 'Diferencial',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icono',
      options: {
        list: [
          {title: 'Huella', value: 'paw'},
          {title: 'Corazón', value: 'heart'},
          {title: 'Cruz médica', value: 'cross'},
          {title: 'Estetoscopio', value: 'stethoscope'},
          {title: 'Frasco', value: 'flask'},
          {title: 'Casa', value: 'home'},
          {title: 'Mapa', value: 'map'},
        ],
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Descripción',
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
    select: {title: 'title', subtitle: 'description'},
  },
})
