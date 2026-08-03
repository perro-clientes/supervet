import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SanityImage } from "@/components/ui/SanityImage";
import type { ContactSection as ContactSectionType } from "@/lib/types";
import type { SiteSettings } from "@/lib/site";

const contactItems = [
  {
    key: "phone",
    icon: "phone" as const,
    label: "Teléfono",
    hrefType: "external" as const,
  },
  {
    key: "email",
    icon: "email" as const,
    label: "Email",
    hrefType: "mailto" as const,
  },
  {
    key: "address",
    icon: "map" as const,
    label: "Dirección",
    hrefType: "maps" as const,
  },
  {
    key: "whatsapp",
    icon: "whatsapp" as const,
    label: "WhatsApp",
    hrefType: "external" as const,
  },
];

function ContactIcon({ name }: { name: string }) {
  const className = "h-6 w-6";
  switch (name) {
    case "email":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.4 13.9c-.2.7-1.3 1.3-1.8 1.3-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.5.5c-.1.1-.3.3-.1.6.1.3.7 1.2 1.6 1.9 1.1 1 2 1.3 2.3 1.5.3.1.5.1.6 0l1-1.2c.2-.2.3-.2.6-.1l2 .9c.3.2.5.3.6.4 0 .1 0 .7-.2 1.4Z" />
        </svg>
      );
    default:
      return <Icon name={name} className={className} />;
  }
}

export function ContactSection({
  section,
  settings,
}: {
  section: ContactSectionType;
  settings: SiteSettings;
}) {
  const items = [
    { ...contactItems[0], value: settings.phoneDisplay, href: `tel:${settings.phone}` },
    { ...contactItems[1], value: settings.email, href: `mailto:${settings.email}` },
    { ...contactItems[2], value: settings.address, href: settings.mapsLink },
    { ...contactItems[3], value: "Escribinos ahora", href: settings.whatsapp },
  ];

  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {section.eyebrow && <Badge>{section.eyebrow}</Badge>}
            {section.title && (
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
                {section.title}
              </h2>
            )}
            {section.intro && (
              <p className="text-lg font-medium text-muted">{section.intro}</p>
            )}

            <ul className="mt-4 space-y-4">
              {items.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target={item.hrefType === "external" ? "_blank" : undefined}
                    rel={
                      item.hrefType === "external"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                      <ContactIcon name={item.icon} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold uppercase tracking-wider text-muted">
                        {item.label}
                      </span>
                      <span className="block font-bold text-ink">
                        {item.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {section.image?.asset?._ref ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <SanityImage
                image={section.image}
                alt={section.image.alt || section.title || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[480px]">
              <iframe
                src="https://www.google.com/maps?q=Supervet&output=embed"
                title="Mapa"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
