import {defineField, defineType} from 'sanity'

export const contactForm = defineType({
  name: 'contactForm',
  title: 'Formulario',
  type: 'object',
  fields: [
    defineField({
      name: 'nameLabel',
      type: 'string',
      title: 'Etiqueta Nombre',
      initialValue: 'Nombre',
    }),
    defineField({
      name: 'emailLabel',
      type: 'string',
      title: 'Etiqueta Email',
      initialValue: 'Email',
    }),
    defineField({
      name: 'phoneLabel',
      type: 'string',
      title: 'Etiqueta Teléfono',
      initialValue: 'Teléfono',
    }),
    defineField({
      name: 'messageLabel',
      type: 'string',
      title: 'Etiqueta Mensaje',
      initialValue: 'Mensaje',
    }),
    defineField({
      name: 'submitLabel',
      type: 'string',
      title: 'Texto del botón',
      initialValue: 'Enviar',
    }),
  ],
})
