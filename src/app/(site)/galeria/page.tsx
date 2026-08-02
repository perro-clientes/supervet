import type { Metadata } from "next";

import { SitePage } from "@/components/pages/SitePage";
import { getPageMetadata } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("galeria");
}

export default function GaleriaPage() {
  return <SitePage slug="galeria" />;
}
