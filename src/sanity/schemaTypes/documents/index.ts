import {type SchemaTypeDefinition} from 'sanity'

import {faq} from './faq'
import {galleryImage} from './galleryImage'
import {page} from './page'
import {service} from './service'
import {siteSettings} from './siteSettings'
import {teamMember} from './teamMember'
import {testimonial} from './testimonial'

export const documents: SchemaTypeDefinition[] = [
  siteSettings,
  page,
  service,
  teamMember,
  testimonial,
  faq,
  galleryImage,
]
