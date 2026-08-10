import {defineField, defineType} from 'sanity'

export const contactItem = defineType({
  name: 'contactItem',
  title: 'Item de contacto',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      type: 'image',
      title: 'Ícono',
      options: {hotspot: true},
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Texto',
    }),
    defineField({
      name: 'href',
      type: 'string',
      title: 'Enlace',
      description:
        'P. ej. https://wa.link/d58b39, mailto:supervetclinicadeanimales@gmail.com, tel:+5491125930355 o link de Maps.',
    }),
  ],
  preview: {
    select: {title: 'label', media: 'icon'},
  },
})
