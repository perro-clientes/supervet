import {defineArrayMember, defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contacto',
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
      name: 'subtitle',
      type: 'text',
      title: 'Subtítulo',
      rows: 3,
    }),
    defineField({
      name: 'contactItems',
      type: 'array',
      title: 'Datos de contacto',
      of: [defineArrayMember({type: 'contactItem'})],
    }),
    defineField({
      name: 'form',
      type: 'contactForm',
      title: 'Formulario',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
