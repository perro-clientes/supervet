import {defineArrayMember, defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Página',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL de la página, p. ej. /servicios',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Secciones',
      of: [
        defineArrayMember({type: 'hero'}),
        defineArrayMember({type: 'servicesHero'}),
        defineArrayMember({type: 'servicesSection'}),
        defineArrayMember({type: 'teamSection'}),
        defineArrayMember({type: 'ctaBanner'}),
        defineArrayMember({type: 'faqSection'}),
        defineArrayMember({type: 'testimonialsSection'}),
        defineArrayMember({type: 'textSection'}),
        defineArrayMember({type: 'photoGrid'}),
        defineArrayMember({type: 'gallerySection'}),
        defineArrayMember({type: 'contactSection'}),
        defineArrayMember({type: 'environmentSection'}),
        defineArrayMember({type: 'featureBlock'}),
        defineArrayMember({type: 'petShopSection'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
