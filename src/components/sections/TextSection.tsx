import { PortableText } from "@portabletext/react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { TextSection as TextSectionType } from "@/lib/types";

export function TextSection({ section }: { section: TextSectionType }) {
  const body = section.body ?? [];

  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <div className="flex flex-col gap-6">
          {section.eyebrow && <Badge>{section.eyebrow}</Badge>}
          {section.title && (
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
              {section.title}
            </h2>
          )}
          {body.length > 0 && (
            <div className="space-y-4 text-lg font-medium leading-relaxed text-muted">
              <PortableText value={body} />
            </div>
          )}
          {section.cta?.href && (
            <div className="mt-2">
              <Button href={section.cta.href} variant="secondary">
                {section.cta.label}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
