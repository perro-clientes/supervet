import {defineField, defineType} from 'sanity'

export const petShopSection = defineType({
  name: 'petShopSection',
  title: 'Pet Shop',
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
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Imagen de fondo',
      description: 'Imagen de fondo del contenedor principal (rounded-xl).',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cardTitle',
      type: 'string',
      title: 'Título de la tarjeta',
    }),
    defineField({
      name: 'cardSubtitle',
      type: 'text',
      title: 'Subtítulo de la tarjeta',
      rows: 4,
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Dirección',
      description: 'Texto que acompaña al ícono de ubicación.',
    }),
    defineField({
      name: 'mapsLink',
      type: 'url',
      title: 'Enlace al mapa (Google Maps)',
      description: 'URL que abre el mapa al hacer clic en la dirección.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'cardTitle'},
  },
})
