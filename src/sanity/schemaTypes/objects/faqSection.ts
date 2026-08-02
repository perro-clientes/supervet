import {defineArrayMember, defineField, defineType} from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'Preguntas frecuentes',
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
      name: 'faqs',
      type: 'array',
      title: 'Preguntas',
      of: [defineArrayMember({type: 'reference', to: [{type: 'faq'}]})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
