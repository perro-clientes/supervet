import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .id('content')
    .title('Content')
    .items([
      S.listItem()
        .title('Configuración del sitio')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.documentTypeListItem('page').title('Páginas'),
      S.documentTypeListItem('service').title('Servicios'),
      S.documentTypeListItem('teamMember').title('Equipo'),
      S.documentTypeListItem('testimonial').title('Testimonios'),
      S.documentTypeListItem('faq').title('Preguntas frecuentes'),
      S.documentTypeListItem('galleryImage').title('Galería'),
    ])
