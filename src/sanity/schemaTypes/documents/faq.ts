import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Pregunta frecuente',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      title: 'Pregunta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'text',
      title: 'Respuesta',
      rows: 4,
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Orden',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
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
