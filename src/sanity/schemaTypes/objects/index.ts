import {type SchemaTypeDefinition} from 'sanity'

import {contactSection} from './contactSection'
import {ctaBanner} from './ctaBanner'
import {faqSection} from './faqSection'
import {featureBlock} from './featureBlock'
import {gallerySection} from './gallerySection'
import {hero} from './hero'
import {link} from './link'
import {photoGrid} from './photoGrid'
import {seo} from './seo'
import {servicesSection} from './servicesSection'
import {teamSection} from './teamSection'
import {testimonialsSection} from './testimonialsSection'
import {textSection} from './textSection'

export const objects: SchemaTypeDefinition[] = [
  seo,
  link,
  hero,
  servicesSection,
  teamSection,
  ctaBanner,
  faqSection,
  testimonialsSection,
  textSection,
  photoGrid,
  gallerySection,
  contactSection,
  featureBlock,
]
