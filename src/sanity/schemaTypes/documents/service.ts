import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
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
          {title: 'Radiografía', value: 'xray'},
        ],
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Orden',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
  orderings: [
    {
      title: 'Orden',
      name: 'ordenAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
