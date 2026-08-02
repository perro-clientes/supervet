import type { PortableTextBlock } from '@portabletext/types'

export type SanityImage = {
  _type?: string
  asset?: { _ref?: string; _type?: string } | null
  alt?: string | null
  hotspot?: {
    _type?: string
    x?: number
    y?: number
    height?: number
    width?: number
  } | null
  crop?: {
    _type?: string
    top?: number
    bottom?: number
    left?: number
    right?: number
  } | null
}

export type CtaLink = {
  label?: string | null
  type?: 'internal' | 'external' | null
  href?: string | null
}

export type Service = {
  _id: string
  title?: string | null
  slug?: string | null
  description?: string | null
  image?: SanityImage | null
  icon?: string | null
  order?: number | null
}

export type Faq = {
  _id: string
  question?: string | null
  answer?: string | null
  order?: number | null
}

export type Testimonial = {
  _id: string
  quote?: string | null
  author?: string | null
  location?: string | null
  rating?: number | null
  order?: number | null
}

export type TeamMember = {
  _id: string
  name?: string | null
  role?: string | null
  photo?: SanityImage | null
  bio?: string | null
  order?: number | null
}

export type GalleryImage = {
  _id: string
  title?: string | null
  category?: string | null
  image?: SanityImage | null
  order?: number | null
}

export type HeroSection = {
  _type: 'hero'
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  image?: SanityImage | null
  cta?: CtaLink | null
}

export type ServicesSection = {
  _type: 'servicesSection'
  eyebrow?: string | null
  title?: string | null
  intro?: string | null
  services?: Service[] | null
}

export type TeamSection = {
  _type: 'teamSection'
  eyebrow?: string | null
  title?: string | null
  intro?: string | null
  image?: SanityImage | null
  members?: TeamMember[] | null
}

export type CtaBannerSection = {
  _type: 'ctaBanner'
  title?: string | null
  subtitle?: string | null
  image?: SanityImage | null
  cta?: CtaLink | null
}

export type FaqSection = {
  _type: 'faqSection'
  eyebrow?: string | null
  title?: string | null
  faqs?: Faq[] | null
}

export type TestimonialsSection = {
  _type: 'testimonialsSection'
  eyebrow?: string | null
  title?: string | null
  testimonials?: Testimonial[] | null
}

export type TextSection = {
  _type: 'textSection'
  eyebrow?: string | null
  title?: string | null
  body?: PortableTextBlock[] | null
  cta?: CtaLink | null
}

export type PhotoGridSection = {
  _type: 'photoGrid'
  title?: string | null
  photos?: SanityImage[] | null
}

export type GallerySection = {
  _type: 'gallerySection'
  eyebrow?: string | null
  title?: string | null
  images?: GalleryImage[] | null
}

export type ContactSection = {
  _type: 'contactSection'
  eyebrow?: string | null
  title?: string | null
  intro?: string | null
  image?: SanityImage | null
}

export type FeatureBlockSection = {
  _type: 'featureBlock'
  icon?: string | null
  title?: string | null
  description?: string | null
  image?: SanityImage | null
}

export type Section =
  | HeroSection
  | ServicesSection
  | TeamSection
  | CtaBannerSection
  | FaqSection
  | TestimonialsSection
  | TextSection
  | PhotoGridSection
  | GallerySection
  | ContactSection
  | FeatureBlockSection

export type PageData = {
  _id: string
  title?: string | null
  slug?: string | null
  seo?: {
    title?: string | null
    description?: string | null
    image?: SanityImage | null
  } | null
  sections?: Section[] | null
}
