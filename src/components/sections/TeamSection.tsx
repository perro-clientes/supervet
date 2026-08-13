import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { TeamSection as TeamSectionType } from "@/lib/types";

export function TeamSection({ section }: { section: TeamSectionType }) {
  const members = section.members ?? [];

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {section.image?.asset?._ref && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <SanityImage
                image={section.image}
                alt={section.image.alt || section.title || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-5">
            {section.eyebrow && (
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">
                {section.eyebrow}
              </p>
            )}
            {section.title && (
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-accent-2 md:text-7xl">
                {section.title}
              </h2>
            )}
            {section.intro && (
              <p className="text-2xl font-regular text-accent-2">{section.intro}</p>
            )}
            <div className="mt-2">
              <Button href="/nosotros">
                Leer más
              </Button>
            </div>
          </div>
        </div>

        {members.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => (
              <article key={member._id} className="text-center">
                {member.photo?.asset?._ref && (
                  <div className="relative mx-auto mb-4 aspect-square w-full overflow-hidden rounded-full">
                    <SanityImage
                      image={member.photo}
                      alt={member.photo.alt || member.name || ""}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-bold text-ink">{member.name}</h3>
                {member.role && (
                  <p className="text-sm font-medium text-secondary">
                    {member.role}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
