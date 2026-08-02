import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Enlace',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Texto',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Tipo',
      options: {
        list: [
          {title: 'Interno (página)', value: 'internal'},
          {title: 'Externo (URL)', value: 'external'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'page',
      type: 'reference',
      to: [{type: 'page'}],
      title: 'Página',
      hidden: ({parent}) => parent?.type !== 'internal',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      hidden: ({parent}) => parent?.type !== 'external',
    }),
  ],
})
