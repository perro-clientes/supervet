import type { Metadata } from 'next'

import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/live'
import { defaultDescription, defaultOgImage, defaultSettings, type SiteSettings, type SiteSettingsData } from '@/lib/site'
import type { PageData } from '@/lib/types'

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  logo,
  name,
  address,
  phone,
  phoneDisplay,
  email,
  whatsapp,
  instagram,
  mapsLink,
  copyright,
}`

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await sanityFetch({ query: siteSettingsQuery })
  const data = result.data as SiteSettingsData | null | undefined
  return { ...defaultSettings, ...data }
}

const ctaProjection = `{
  label,
  type,
  "href": select(
    type == "external" => url,
    type == "internal" && page->slug.current == "inicio" => "/",
    "/" + page->slug.current
  )
}`

const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seo {
    title,
    description,
    image,
  },
  sections[] {
    _type == "hero" => {
      _type,
      eyebrow,
      title,
      subtitle,
      image,
      cta ${ctaProjection}
    },
    _type == "aboutHero" => {
      _type,
      backgroundColor,
      title,
      subtitle,
      images,
    },
    _type == "servicesHero" => {
      _type,
      eyebrow,
      title,
      subtitle,
    },
    _type == "servicesSection" => {
      _type,
      eyebrow,
      title,
      intro,
      showCtas,
      "services": services[]-> {
        _id,
        title,
        "slug": slug.current,
        description,
        image,
        iconImage,
        order,
      },
      primaryCta ${ctaProjection},
      secondaryCta ${ctaProjection}
    },
    _type == "teamSection" => {
      _type,
      eyebrow,
      title,
      intro,
      image,
      "members": members[]-> {
        _id,
        name,
        role,
        photo,
        bio,
        order,
      }
    },
    _type == "ctaBanner" => {
      _type,
      title,
      subtitle,
      image,
      cta ${ctaProjection},
      "images": images[]-> {
        _id,
        title,
        image,
      }
    },
    _type == "faqSection" => {
      _type,
      eyebrow,
      title,
      "faqs": faqs[]-> {
        _id,
        question,
        answer,
        order,
      }
    },
    _type == "testimonialsSection" => {
      _type,
      eyebrow,
      title,
      "testimonials": testimonials[]-> {
        _id,
        quote,
        author,
        location,
        rating,
        image,
        order,
      }
    },
    _type == "textSection" => {
      _type,
      eyebrow,
      title,
      subtitle,
      image,
      imageSide,
      backgroundColor,
      backgroundImage,
      cta ${ctaProjection}
    },
    _type == "photoGrid" => {
      _type,
      title,
      photos,
    },
    _type == "gallerySection" => {
      _type,
      eyebrow,
      title,
      "images": images[]-> {
        _id,
        title,
        category,
        image,
        "aspectRatio": image.asset->metadata.dimensions.aspectRatio,
        order,
      }
    },
    _type == "contactSection" => {
      _type,
      eyebrow,
      title,
      subtitle,
      contactItems[] {
        _key,
        icon,
        label,
        href,
      },
      form {
        nameLabel,
        emailLabel,
        phoneLabel,
        messageLabel,
        submitLabel,
      },
    },
    _type == "environmentSection" => {
      _type,
      eyebrow,
      title,
      subtitle,
      image,
    },
    _type == "featureBlock" => {
      _type,
      icon,
      title,
      description,
      image,
    },
    _type == "petShopSection" => {
      _type,
      title,
      subtitle,
      backgroundImage,
      cardTitle,
      cardSubtitle,
      address,
      mapsLink,
    },
  }
}`

export async function getPage(slug: string): Promise<PageData | null> {
  const result = await sanityFetch({ query: pageQuery, params: { slug } })
  return (result.data as PageData | null) ?? null
}

const pageSlugsQuery = `*[_type == "page" && defined(slug.current)]{"slug": slug.current}`

export async function getPageSlugs(): Promise<string[]> {
  const result = await sanityFetch({ query: pageSlugsQuery })
  const slugs = result.data as { slug: string }[] | null
  return (slugs ?? []).map((item) => item.slug)
}

export async function getPageMetadata(slug: string): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPage(slug),
    getSiteSettings(),
  ])

  if (!page) {
    return { title: settings.name }
  }

  const seoTitle =
    page.seo?.title || (page.title ? `${page.title} – ${settings.name}` : settings.name)
  const description = page.seo?.description || defaultDescription
  const ogImage = page.seo?.image?.asset?._ref
    ? urlFor(page.seo.image).width(1200).url()
    : defaultOgImage

  return {
    title: seoTitle,
    description,
    openGraph: {
      title: seoTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
