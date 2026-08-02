import {defineField, defineType} from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Imagen de galería',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Categoría',
      description: 'P. ej. Instalaciones, Pacientes, Equipo',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Orden',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
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
