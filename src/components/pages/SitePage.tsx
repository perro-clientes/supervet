import { notFound } from "next/navigation";

import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getPage, getSiteSettings } from "@/lib/queries";

export async function SitePage({ slug }: { slug: string }) {
  const [page, settings] = await Promise.all([
    getPage(slug),
    getSiteSettings(),
  ]);

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.sections} settings={settings} />;
}
