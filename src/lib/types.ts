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
  iconImage?: SanityImage | null
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
  image?: SanityImage | null
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
  aspectRatio?: number | null
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

export type AboutHeroImage = {
  _key?: string
  image?: SanityImage | null
}

export type AboutHeroSection = {
  _type: 'aboutHero'
  backgroundColor?: string | null
  title?: string | null
  subtitle?: string | null
  images?: AboutHeroImage[] | null
}

export type ServicesHeroSection = {
  _type: 'servicesHero'
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
}

export type ServicesSection = {
  _type: 'servicesSection'
  eyebrow?: string | null
  title?: string | null
  intro?: string | null
  showCtas?: boolean | null
  services?: Service[] | null
  primaryCta?: CtaLink | null
  secondaryCta?: CtaLink | null
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
  images?: GalleryImage[] | null
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
  subtitle?: string | null
  image?: SanityImage | null
  imageSide?: 'left' | 'right' | null
  backgroundColor?:
    | 'white'
    | 'primary-soft'
    | 'secondary-light'
    | 'accent-3'
    | 'primary'
    | null
  backgroundImage?: SanityImage | null
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

export type ContactItem = {
  _key?: string
  icon?: SanityImage | null
  label?: string | null
  href?: string | null
}

export type ContactForm = {
  nameLabel?: string | null
  emailLabel?: string | null
  phoneLabel?: string | null
  messageLabel?: string | null
  submitLabel?: string | null
}

export type ContactSection = {
  _type: 'contactSection'
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  contactItems?: ContactItem[] | null
  form?: ContactForm | null
}

export type FeatureBlockSection = {
  _type: 'featureBlock'
  icon?: string | null
  title?: string | null
  description?: string | null
  image?: SanityImage | null
}

export type EnvironmentSection = {
  _type: 'environmentSection'
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  image?: SanityImage | null
}

export type PetShopSection = {
  _type: 'petShopSection'
  title?: string | null
  subtitle?: string | null
  backgroundImage?: SanityImage | null
  cardTitle?: string | null
  cardSubtitle?: string | null
  address?: string | null
  mapsLink?: string | null
}

export type Section =
  | HeroSection
  | AboutHeroSection
  | ServicesHeroSection
  | ServicesSection
  | TeamSection
  | CtaBannerSection
  | FaqSection
  | TestimonialsSection
  | TextSection
  | PhotoGridSection
  | GallerySection
  | ContactSection
  | EnvironmentSection
  | FeatureBlockSection
  | PetShopSection

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
