import { AboutHero } from "@/components/sections/AboutHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { EnvironmentSection } from "@/components/sections/EnvironmentSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureBlock } from "@/components/sections/FeatureBlock";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PetShopSection } from "@/components/sections/PetShopSection";
import { PhotoGrid } from "@/components/sections/PhotoGrid";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ServicesHeroSection } from "@/components/sections/ServicesHeroSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TextSection } from "@/components/sections/TextSection";
import type { Section } from "@/lib/types";

export function SectionRenderer({
  sections,
}: {
  sections?: Section[] | null;
}) {
  if (!sections) return null;

  return (
    <>
      {sections.map((section, index) => {
        switch (section._type) {
          case "hero":
            return <HeroSection key={index} section={section} />;
          case "aboutHero":
            return <AboutHero key={index} section={section} />;
          case "servicesHero":
            return <ServicesHeroSection key={index} section={section} />;
          case "servicesSection":
            return <ServicesSection key={index} section={section} />;
          case "teamSection":
            return <TeamSection key={index} section={section} />;
          case "ctaBanner":
            return <CtaBanner key={index} section={section} />;
          case "faqSection":
            return <FaqSection key={index} section={section} />;
          case "testimonialsSection":
            return <TestimonialsSection key={index} section={section} />;
          case "textSection":
            return <TextSection key={index} section={section} />;
          case "photoGrid":
            return <PhotoGrid key={index} section={section} />;
          case "gallerySection":
            return <GallerySection key={index} section={section} />;
          case "contactSection":
            return <ContactSection key={index} section={section} />;
          case "environmentSection":
            return <EnvironmentSection key={index} section={section} />;
          case "petShopSection":
            return <PetShopSection key={index} section={section} />;
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
