import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Integrante del equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Rol',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Foto',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Biografía',
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
      title: 'name',
      subtitle: 'role',
      media: 'photo',
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
