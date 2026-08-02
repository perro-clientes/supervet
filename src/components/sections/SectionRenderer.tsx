import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeatureBlock } from "@/components/sections/FeatureBlock";
import { GalleryLightbox } from "@/components/sections/GalleryLightbox";
import { Hero } from "@/components/sections/Hero";
import { PhotoGrid } from "@/components/sections/PhotoGrid";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSlider } from "@/components/sections/TestimonialsSlider";
import { TextSection } from "@/components/sections/TextSection";
import type { Section } from "@/lib/types";
import type { SiteSettings } from "@/lib/site";

export function SectionRenderer({
  sections,
  settings,
}: {
  sections?: Section[] | null;
  settings: SiteSettings;
}) {
  if (!sections) return null;

  return (
    <>
      {sections.map((section, index) => {
        switch (section._type) {
          case "hero":
            return <Hero key={index} section={section} />;
          case "servicesSection":
            return <ServicesGrid key={index} section={section} />;
          case "teamSection":
            return <TeamSection key={index} section={section} />;
          case "ctaBanner":
            return <CtaBanner key={index} section={section} />;
          case "faqSection":
            return <FaqAccordion key={index} section={section} />;
          case "testimonialsSection":
            return <TestimonialsSlider key={index} section={section} />;
          case "textSection":
            return <TextSection key={index} section={section} />;
          case "photoGrid":
            return <PhotoGrid key={index} section={section} />;
          case "gallerySection":
            return <GalleryLightbox key={index} section={section} />;
          case "contactSection":
            return (
              <ContactSection
                key={index}
                section={section}
                settings={settings}
              />
            );
          case "featureBlock":
            return (
              <FeatureBlock key={index} section={section} index={index} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
