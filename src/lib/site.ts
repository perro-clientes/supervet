export const defaultSettings = {
  name: 'Supervet',
  address: 'RUTA 8 km 72 (barrio los pinos, remanso) Exaltación de la Cruz',
  phone: '+5491125930355',
  phoneDisplay: '11-2-5930-355',
  email: 'supervetclinicadeanimales@gmail.com',
  whatsapp: 'https://wa.link/d58b39',
  instagram: 'https://www.instagram.com/supervetok/',
  mapsLink: 'https://maps.app.goo.gl/N3yoghc7kTaLiaMd7',
  copyright: '© 2025 Supervet',
}

export type SiteSettingsData = {
  _id?: string
  logo?: {
    _type?: string
    asset?: { _ref?: string; _type?: string }
    alt?: string
  } | null
}

export type SiteSettings = typeof defaultSettings & SiteSettingsData

export const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Contacto', href: '/contacto' },
] as const
