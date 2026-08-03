import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { type SiteSettings } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zM12 16.602a4.623 4.623 0 0 1 0-9.246 4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 1 1 0-2.155 1.077 1.077 0 0 1 0 2.155z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const footerPages = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
];

const footerResources = [
  { label: "Términos y Condiciones", href: "/" },
  { label: "Políticas de privacidad", href: "/" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const logo = settings.logo?.asset?._ref
    ? urlFor(settings.logo).width(160).url()
    : null;

  return (
    <footer className="bg-secondary-light">
      <Container className="py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Ir al inicio">
              {logo ? (
                <Image
                  src={logo}
                  alt={settings.logo?.alt || settings.name}
                  width={100}
                  height={100}
                  className="h-40 w-40 object-contain"
                />
              ) : (
                <span className="text-xl font-extrabold tracking-tight">
                  {settings.name}
                </span>
              )}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-16">
            <div className="max-w-[200px]">
              <p className="mb-4 text-lg font-bold">Contacto</p>
              <address className="space-y-3 text-sm font-medium not-italic text-muted">
                <p className="text-ink mb-1">Dirección:</p>
                <p>{settings.address}</p>
                <p className="text-ink mb-1">Email:</p>
                <p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="break-all transition-colors hover:text-secondary"
                  >
                    {settings.email}
                  </a>
                </p>
                <p className="text-ink mb-1">Teléfono:</p>
                <p>
                  <a
                    href={settings.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-secondary"
                  >
                    +54 {settings.phoneDisplay}
                  </a>
                </p>
              </address>
            </div>

            <div>
              <p className="mb-4 text-lg font-bold">Páginas</p>
              <ul className="space-y-3">
                {footerPages.map((page) => (
                  <li key={page.label}>
                    <Link
                      href={page.href}
                      className="text-sm font-medium text-muted transition-colors hover:text-secondary"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-lg font-bold">Recursos</p>
              <ul className="space-y-3">
                {footerResources.map((resource) => (
                  <li key={resource.label}>
                    <Link
                      href={resource.href}
                      className="text-sm font-medium text-muted transition-colors hover:text-secondary"
                    >
                      {resource.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-lg font-bold">Seguinos</p>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${settings.name}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/30 text-secondary transition-colors hover:bg-secondary-dark"
              >
                <InstagramIcon />
              </a>
            </div>

          </div>
        </div>
      </Container>

      <div className="p-4">
        <p className="text-md font-medium text-accent-2">
          {settings.copyright}
        </p>
      </div>
    </footer>
  );
}
