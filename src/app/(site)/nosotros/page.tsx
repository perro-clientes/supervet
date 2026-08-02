import type { Metadata } from "next";

import { SitePage } from "@/components/pages/SitePage";
import { getPageMetadata } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("nosotros");
}

export default function NosotrosPage() {
  return <SitePage slug="nosotros" />;
}
