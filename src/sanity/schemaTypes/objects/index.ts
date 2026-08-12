import {type SchemaTypeDefinition} from 'sanity'

import {contactForm} from './contactForm'
import {contactItem} from './contactItem'
import {contactSection} from './contactSection'
import {ctaBanner} from './ctaBanner'
import {environmentSection} from './environmentSection'
import {faqSection} from './faqSection'
import {featureBlock} from './featureBlock'
import {gallerySection} from './gallerySection'
import {hero} from './hero'
import {link} from './link'
import {petShopSection} from './petShopSection'
import {photoGrid} from './photoGrid'
import {seo} from './seo'
import {servicesHero} from './servicesHero'
import {servicesSection} from './servicesSection'
import {teamSection} from './teamSection'
import {testimonialsSection} from './testimonialsSection'
import {textSection} from './textSection'

export const objects: SchemaTypeDefinition[] = [
  seo,
  link,
  hero,
  servicesHero,
  servicesSection,
  teamSection,
  ctaBanner,
  environmentSection,
  faqSection,
  testimonialsSection,
  textSection,
  photoGrid,
  gallerySection,
  contactItem,
  contactForm,
  contactSection,
  featureBlock,
  petShopSection,
]
