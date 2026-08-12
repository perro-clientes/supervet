import {defineField, defineType} from 'sanity'

export const textSection = defineType({
  name: 'textSection',
  title: 'Bloque de texto',
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
      type: 'string',
      title: 'Subtítulo',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen',
      description: 'Se muestra en relación de aspecto 1:1.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        }),
      ],
    }),
    defineField({
      name: 'imageSide',
      type: 'string',
      title: 'Posición de la imagen',
      hidden: ({parent}) => !parent?.image,
      options: {
        list: [
          {title: 'Izquierda', value: 'left'},
          {title: 'Derecha', value: 'right'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    }),
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
      initialValue: 'white',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Imagen de fondo (opcional)',
      description:
        'Se muestra detrás del bloque, con un velo claro para mantener el contraste del texto.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cta',
      type: 'link',
      title: 'Botón',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
  },
})
