import { notFound } from "next/navigation";

import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getPage } from "@/lib/queries";

export async function SitePage({ slug }: { slug: string }) {
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.sections} />;
}
