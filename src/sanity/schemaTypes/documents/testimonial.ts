import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Cita',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Autor',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Ubicación',
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Puntaje',
      description: 'De 1 a 5 estrellas',
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Orden',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'location',
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
