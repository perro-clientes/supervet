// Contenido inicial del sitio migrado desde Webflow (supervet.com.ar).
// Helpers para marcar referencias a imágenes ($ref image:) y a documentos ($ref doc:).
// El runner (index.mjs) resuelve los marcadores luego de subir los assets.

export const img = (key) => ({$ref: `image:${key}`})
export const ref = (id) => ({$ref: `doc:${id}`})
export const link = (label, pageId) => ({
  _type: 'link',
  label,
  type: 'internal',
  page: ref(pageId),
})
export const p = (text) => ({
  _type: 'block',
  style: 'normal',
  children: [{_type: 'span', marks: [], text}],
})

// Registro de imágenes locales (relativo a la raíz del proyecto).
export const imageRegistry = {
  logo: 'public/brand/isologotype-256x256.png',
  'home-hero': 'public/otros/home-hero.png',
  nosotros: 'public/otros/nosotros.png',
  home: 'public/otros/home.png',
  'banner-1': 'public/otros/banner-1.png',
  'banner-2': 'public/otros/banner-2.png',
  'banner-3': 'public/otros/banner-3.png',
  IMG_3755: 'public/otros/IMG_3755.jpeg',
  IMG_4273: 'public/otros/IMG_4273.jpeg',
  IMG_3837: 'public/otros/IMG_3837.jpeg',
  IMG_5077: 'public/otros/IMG_5077.jpg',
  IMG_5649: 'public/otros/IMG_5649.jpg',
  IMG_4731: 'public/otros/IMG_4731.jpg',
  IMG_3934: 'public/otros/IMG_3934.jpg',
  IMG_2621: 'public/otros/IMG_2621.jpeg',
  entorno: 'public/otros/entorno.jpg',
  'servicio-cirugia': 'public/servicios/servicio-cirugia.png',
  'servicio-diagnostico': 'public/servicios/servicio-diagnostico.png',
  'servicio-fisio': 'public/servicios/servicio-fisio.png',
  'servicio-clinica': 'public/servicios/servicio-clinica.png',
  'icon-phone': 'public/brand/phone-icon.svg',
  'icon-email': 'public/brand/email-icon.svg',
  'icon-location': 'public/brand/location-icon.svg',
}

const SERVICE_REFS = [
  ref('service.cirugia-y-traumatologia'),
  ref('service.diagnostico-por-imagenes'),
  ref('service.fisioterapia-y-rehabilitacion'),
  ref('service.clinica-medica-nutricion-dermatologia-y-homeopatia'),
]

const FAQ_REFS = [
  ref('faq.donde-estamos-ubicados'),
  ref('faq.consultas-virtuales'),
  ref('faq.domicilio'),
]

const GALERIA_REFS = [
  ref('galleryImage.img-4731'),
  ref('galleryImage.servicio-fisio'),
  ref('galleryImage.servicio-cirugia'),
  ref('galleryImage.servicio-diagnostico'),
  ref('galleryImage.home-hero'),
  ref('galleryImage.nosotros'),
  ref('galleryImage.home'),
  ref('galleryImage.img-3934'),
  ref('galleryImage.img-3837'),
]

export const content = [
  // ---------- siteSettings ----------
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    logo: img('logo'),
    name: 'Supervet',
    address: 'RUTA 8 km 72 (barrio los pinos, remanso) Exaltación de la Cruz',
    phone: '+5491125930355',
    phoneDisplay: '11-2-5930-355',
    email: 'supervetclinicadeanimales@gmail.com',
    whatsapp: 'https://wa.link/d58b39',
    instagram: 'https://www.instagram.com/supervetok/',
    mapsLink: 'https://maps.app.goo.gl/N3yoghc7kTaLiaMd7',
    copyright: '© 2025 Supervet – Todos los Derechos Reservados',
  },

  // ---------- Servicios ----------
  {
    _id: 'service.cirugia-y-traumatologia',
    _type: 'service',
    title: 'Cirugía y Traumatología',
    slug: {_type: 'slug', current: 'cirugia-y-traumatologia'},
    description: 'Desde los procedimientos de rutina hasta las intervenciones más complejas.',
    image: img('servicio-cirugia'),
    icon: 'cross',
    order: 1,
  },
  {
    _id: 'service.diagnostico-por-imagenes',
    _type: 'service',
    title: 'Diagnóstico por imágenes',
    slug: {_type: 'slug', current: 'diagnostico-por-imagenes'},
    description: 'Disponemos de rayos X digitales y ecografías de alta resolución.',
    image: img('servicio-diagnostico'),
    icon: 'xray',
    order: 2,
  },
  {
    _id: 'service.fisioterapia-y-rehabilitacion',
    _type: 'service',
    title: 'Fisioterapia y Rehabilitación',
    slug: {_type: 'slug', current: 'fisioterapia-y-rehabilitacion'},
    description: 'Ayudamos a que los animales recuperen movilidad, fuerza y calidad de vida.',
    image: img('servicio-fisio'),
    icon: 'paw',
    order: 3,
  },
  {
    _id: 'service.clinica-medica-nutricion-dermatologia-y-homeopatia',
    _type: 'service',
    title: 'Clínica médica, Nutrición, Dermatología y Homeopatía',
    slug: {_type: 'slug', current: 'clinica-medica-nutricion-dermatologia-y-homeopatia'},
    description:
      'Atención integral y personalizada para prevenir, diagnosticar y tratar enfermedades',
    image: img('servicio-clinica'),
    icon: 'heart',
    order: 4,
  },

  // ---------- Testimonio ----------
  {
    _id: 'testimonial.sofia-vergada',
    _type: 'testimonial',
    quote: 'Un equipo de profesionales en quien confiar...',
    author: 'Sofia Vergada',
    location: 'Luján, Buenos Aires',
    rating: 5,
    order: 1,
  },

  // ---------- FAQs ----------
  // Nota: el sitio actual usa texto lorem ipsum de relleno; se migra tal cual
  // y queda pendiente reemplazar por respuestas reales desde el Studio.
  {
    _id: 'faq.donde-estamos-ubicados',
    _type: 'faq',
    question: '¿Dónde estamos ubicados?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur cdolor col adipiscing elit. Integer mattis nunc augue vel lacinia erat euismod ut. Sed eleifend tellus nonole tincidunt aliquet. Fusce aliquam mi felis.',
    order: 1,
  },
  {
    _id: 'faq.consultas-virtuales',
    _type: 'faq',
    question: '¿Hacemos consultas virtuales?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur cdolor col adipiscing elit. Integer mattis nunc augue vel lacinia erat euismod ut. Sed eleifend tellus nonole tincidunt aliquet. Fusce aliquam mi felis.',
    order: 2,
  },
  {
    _id: 'faq.domicilio',
    _type: 'faq',
    question: '¿Nos acercamos a domicilio?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur cdolor col adipiscing elit. Integer mattis nunc augue vel lacinia erat euismod ut. Sed eleifend tellus nonole tincidunt aliquet. Fusce aliquam mi felis.',
    order: 3,
  },

  // ---------- Galería (mismo orden que /galeria en Webflow) ----------
  {
    _id: 'galleryImage.img-4731',
    _type: 'galleryImage',
    title: 'Nuestros pacientes',
    category: 'Pacientes',
    image: img('IMG_4731'),
    order: 1,
  },
  {
    _id: 'galleryImage.servicio-fisio',
    _type: 'galleryImage',
    title: 'Fisioterapia',
    category: 'Fisioterapia',
    image: img('servicio-fisio'),
    order: 2,
  },
  {
    _id: 'galleryImage.servicio-cirugia',
    _type: 'galleryImage',
    title: 'Cirugía',
    category: 'Cirugía',
    image: img('servicio-cirugia'),
    order: 3,
  },
  {
    _id: 'galleryImage.servicio-diagnostico',
    _type: 'galleryImage',
    title: 'Diagnóstico por imágenes',
    category: 'Diagnóstico',
    image: img('servicio-diagnostico'),
    order: 4,
  },
  {
    _id: 'galleryImage.home-hero',
    _type: 'galleryImage',
    title: 'El equipo',
    category: 'Equipo',
    image: img('home-hero'),
    order: 5,
  },
  {
    _id: 'galleryImage.nosotros',
    _type: 'galleryImage',
    title: 'Instalaciones',
    category: 'Instalaciones',
    image: img('nosotros'),
    order: 6,
  },
  {
    _id: 'galleryImage.home',
    _type: 'galleryImage',
    title: 'Nuestra clínica',
    category: 'Instalaciones',
    image: img('home'),
    order: 7,
  },
  {
    _id: 'galleryImage.img-3934',
    _type: 'galleryImage',
    title: 'Pet Shop',
    category: 'Pet Shop',
    image: img('IMG_3934'),
    order: 8,
  },
  {
    _id: 'galleryImage.img-3837',
    _type: 'galleryImage',
    title: 'Pacientes',
    category: 'Pacientes',
    image: img('IMG_3837'),
    order: 9,
  },

  // ---------- Páginas ----------
  {
    _id: 'page.inicio',
    _type: 'page',
    title: 'Inicio',
    slug: {_type: 'slug', current: 'inicio'},
    seo: {
      _type: 'seo',
      title: 'Supervet - Donde la salud de tu mascota se vive distinto',
      description:
        'Ecografía, Rayos X, Traumatología, Cirugías de todo tipo, Internación diurna, Cardiología, Fisioterapia, Nutrición y Dermatología.',
      image: img('logo'),
    },
    sections: [
      {
        _type: 'hero',
        eyebrow: '',
        title: 'Donde la salud de tu mascota se vive distinto',
        subtitle: 'Tecnología, calidez y naturaleza al servicio de quienes más querés.',
        image: img('home-hero'),
      },
      {
        _type: 'servicesSection',
        eyebrow: '',
        title: 'Contamos con todos los servicios que tu mascota puede necesitar',
        intro:
          'Ecografía, Rayos X, Traumatología, Cirugías de todo tipo, Internación diurna, Cardiología, Fisioterapia, Nutrición y Dermatología.',
        services: SERVICE_REFS,
      },
      {
        _type: 'teamSection',
        eyebrow: '',
        title: 'Conocé a nuestro equipo veterinario',
        intro:
          'Un lugar donde la medicina veterinaria se combina con el amor por los animales, la naturaleza y el trato humano.',
        image: img('nosotros'),
        members: [],
      },
      {
        _type: 'ctaBanner',
        title: 'Agendá hoy tu consulta',
        subtitle: 'para atenderte',
        image: img('banner-3'),
        images: GALERIA_REFS.slice(0, 3),
        cta: link('Contactanos', 'page.contacto'),
      },
      {
        _type: 'faqSection',
        eyebrow: 'Preguntas frecuentes',
        title: 'Todo lo que necesitas saber',
        faqs: FAQ_REFS,
      },
      {
        _type: 'testimonialsSection',
        eyebrow: '',
        title: '¿Qué dicen nuestros pacientes?',
        testimonials: [ref('testimonial.sofia-vergada')],
      },
    ],
  },
  {
    _id: 'page.nosotros',
    _type: 'page',
    title: 'Nosotros',
    slug: {_type: 'slug', current: 'nosotros'},
    seo: {
      _type: 'seo',
      title: 'Supervet - Nosotros',
      description:
        'Un lugar donde la medicina veterinaria se combina con el amor por los animales, la naturaleza y el trato humano.',
    },
    sections: [
      {
        _type: 'hero',
        eyebrow: '',
        title: 'Nosotros',
        subtitle:
          'Un lugar donde la medicina veterinaria se combina con el amor por los animales, la naturaleza y el trato humano.',
      },
      {
        _type: 'photoGrid',
        title: '',
        photos: [
          img('IMG_3755'),
          img('IMG_4273'),
          img('IMG_3837'),
          img('IMG_5077'),
          img('IMG_5649'),
        ],
      },
      {
        _type: 'textSection',
        eyebrow: '',
        title: 'Supervet no es una clínica más',
        body: [
          p(
            'Ofrecemos una atención completa, profesional y 100 % personalizada, con seguimiento constante y una respuesta inmediata por WhatsApp (sí, te contestamos al toque 🐾).'
          ),
        ],
      },
      {
        _type: 'textSection',
        eyebrow: '',
        title: 'Todos los servicios que tu mascota puede necesitar',
        body: [
          p(
            'Ecografía, Rayos X, Traumatología, Cirugías de todo tipo, Internación diurna, Cardiología, Fisioterapia, Nutrición y Dermatología.'
          ),
          p(
            'En toda la zona no existe otra clínica con este nivel de equipamiento ni especialización, y nuestros servicios únicos hacen que muchos clientes recorran más de 20 km para atenderse acá.'
          ),
        ],
        cta: link('Ver servicios', 'page.servicios'),
      },
      {
        _type: 'ctaBanner',
        title: 'Agendá hoy tu consulta',
        subtitle: 'para atenderte',
        image: img('banner-3'),
        images: GALERIA_REFS.slice(0, 3),
        cta: link('Contactanos', 'page.contacto'),
      },
      {
        _type: 'featureBlock',
        icon: 'home',
        title: 'Nuestro Pet Shop',
        description:
          'Contamos con un Pet Shop súper completo: alimentos balanceados, deshidratados, húmedos, productos de cuidado, antiparasitarios, pipetas y una farmacia veterinaria integral. Todo en un mismo lugar.',
        image: img('IMG_3934'),
      },
      {
        _type: 'featureBlock',
        icon: 'map',
        title: 'El remanso',
        description:
          'RUTA 8 km 72 (barrio los pinos, remanso) Exaltación de la Cruz',
      },
      {
        _type: 'featureBlock',
        icon: 'paw',
        title: 'Nuestro diferencial: el entorno.',
        description:
          'Nuestra clínica está rodeada de verde, árboles y palmeras, con amplio estacionamiento y fácil acceso.\n\nNo venís solo a una consulta: venís a una experiencia tranquila, luminosa y natural, que se nota desde que llegás.',
        image: img('IMG_2621'),
      },
    ],
  },
  {
    _id: 'page.servicios',
    _type: 'page',
    title: 'Servicios',
    slug: {_type: 'slug', current: 'servicios'},
    seo: {
      _type: 'seo',
      title: 'Supervet - Servicios',
      description:
        'Tecnología, calidez y naturaleza al servicio de quienes más querés. Ecografía, Rayos X, Traumatología, Cirugías de todo tipo, Internación diurna, Cardiología, Fisioterapia, Nutrición y Dermatología.',
    },
    sections: [
      {
        _type: 'hero',
        eyebrow: '',
        title: 'Tecnología, calidez y naturaleza al servicio de quienes más querés',
        subtitle:
          'Ecografía, Rayos X, Traumatología, Cirugías de todo tipo, Internación diurna, Cardiología, Fisioterapia, Nutrición y Dermatología.',
      },
      {
        _type: 'servicesSection',
        eyebrow: '',
        title: '',
        intro: '',
        services: SERVICE_REFS,
      },
      {
        _type: 'ctaBanner',
        title: 'Agendá hoy tu consulta',
        subtitle: 'para atenderte',
        image: img('banner-3'),
        images: GALERIA_REFS.slice(0, 3),
        cta: link('Contactanos', 'page.contacto'),
      },
    ],
  },
  {
    _id: 'page.galeria',
    _type: 'page',
    title: 'Galería',
    slug: {_type: 'slug', current: 'galeria'},
    seo: {
      _type: 'seo',
      title: 'Supervet - Galería',
      description: 'Ponete en contacto con nosotros y despeja todas las dudas que tengas.',
    },
    sections: [
      {
        _type: 'gallerySection',
        eyebrow: '',
        title: '',
        images: GALERIA_REFS,
      },
    ],
  },
  {
    _id: 'page.contacto',
    _type: 'page',
    title: 'Contacto',
    slug: {_type: 'slug', current: 'contacto'},
    seo: {
      _type: 'seo',
      title: 'Supervet - Contacto',
      description: 'Ponete en contacto con nosotros y despeja todas las dudas que tengas.',
    },
    sections: [
      {
        _type: 'contactSection',
        eyebrow: '',
        title: 'Contactanos',
        subtitle:
          'Ponete en contacto con nosotros y despeja todas las dudas que tengas.',
        contactItems: [
          {
            _type: 'contactItem',
            icon: img('icon-phone'),
            label: '11-2-5930-355',
            href: 'https://wa.link/d58b39',
          },
          {
            _type: 'contactItem',
            icon: img('icon-email'),
            label: 'supervetclinicadeanimales@gmail.com',
            href: 'mailto:supervetclinicadeanimales@gmail.com',
          },
          {
            _type: 'contactItem',
            icon: img('icon-location'),
            label:
              'RUTA 8 km 72 (barrio los pinos, remanso) Exaltación de la Cruz',
            href: 'https://maps.app.goo.gl/N3yoghc7kTaLiaMd7',
          },
        ],
        form: {
          _type: 'contactForm',
          nameLabel: 'Nombre',
          emailLabel: 'Email',
          phoneLabel: 'Teléfono',
          messageLabel: 'Mensaje',
          submitLabel: 'Enviar',
        },
      },
      {
        _type: 'environmentSection',
        eyebrow: '',
        title: 'Nuestro diferencial: el entorno.',
        subtitle:
          'Nuestra clínica está rodeada de verde, árboles y palmeras, con amplio estacionamiento y fácil acceso. No venís solo a una consulta: venís a una experiencia tranquila, luminosa y natural, que se nota desde que llegás.',
        image: img('entorno'),
      },
    ],
  },
]
