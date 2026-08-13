import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Servicios',
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
      name: 'intro',
      type: 'text',
      title: 'Introducción',
      rows: 3,
    }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Servicios',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
    }),
    defineField({
      name: 'showCtas',
      type: 'boolean',
      title: 'Mostrar botones',
      description: 'Muestra u oculta los botones de esta sección.',
      initialValue: true,
    }),
    defineField({
      name: 'primaryCta',
      type: 'link',
      title: 'Botón principal',
      description: 'Si se deja vacío, el botón no se muestra.',
      hidden: ({parent}) => parent?.showCtas === false,
    }),
    defineField({
      name: 'secondaryCta',
      type: 'link',
      title: 'Botón secundario',
      description: 'Si se deja vacío, el botón no se muestra.',
      hidden: ({parent}) => parent?.showCtas === false,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
