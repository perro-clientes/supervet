import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {hotspot: true},
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nombre',
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Dirección',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Teléfono (WhatsApp)',
      description: 'Número con código de país, p. ej. +5491125930355',
    }),
    defineField({
      name: 'phoneDisplay',
      type: 'string',
      title: 'Teléfono (display)',
      description: 'Formato para mostrar en el sitio, p. ej. 11-2-5930-355',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'whatsapp',
      type: 'url',
      title: 'WhatsApp (link)',
      description: 'Enlace de WhatsApp, p. ej. https://wa.link/…',
    }),
    defineField({
      name: 'instagram',
      type: 'url',
      title: 'Instagram',
    }),
    defineField({
      name: 'mapsLink',
      type: 'url',
      title: 'Google Maps (link)',
    }),
    defineField({
      name: 'copyright',
      type: 'string',
      title: 'Copyright',
      description: 'Texto de pie de página, p. ej. © 2025 Supervet',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'address'},
  },
})
