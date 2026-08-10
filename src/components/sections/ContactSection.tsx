import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import { ContactForm } from "@/components/sections/ContactForm";
import type { ContactSection as ContactSectionType } from "@/lib/types";

export function ContactSection({ section }: { section: ContactSectionType }) {
  const items = section.contactItems ?? [];

  return (
    <section className="py-20 pt-32 md:py-28">
      <Container className="max-w-7xl">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex w-full flex-col gap-1 lg:w-1/2">
            {section.title && (
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-8xl">
                {section.title}
              </h1>
            )}
            {section.subtitle && (
              <p className="max-w-xl text-xl font-regular text-accent-2">
                {section.subtitle}
              </p>
            )}

            {items.length > 0 && (
              <ul className="mt-12 flex flex-col gap-8">
                {items.map((item) =>
                  item.icon?.asset?._ref ? (
                    <li key={item._key}>
                      <a
                        href={item.href || "#"}
                        target={
                          item.href?.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-center gap-4"
                      >
                        <span className="flex h-18 w-18 shrink-0 items-center justify-center">
                          <SanityImage
                            image={item.icon}
                            alt={item.label || ""}
                            width={64}
                            height={64}
                            unoptimized
                            className="rounded-full h-18 w-18 object-contain"
                          />
                        </span>
                        <span className="text-lg font-medium text-ink transition-all duration-300 hover:text-primary">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ) : null,
                )}
              </ul>
            )}
          </div>

          <div className="flex w-full items-center justify-center lg:w-1/2">
            <div className="w-full max-w-xl rounded-3xl border border-black/5 bg-primary px-6 py-10 shadow-sm md:px-12 md:py-12">
              <ContactForm form={section.form} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
