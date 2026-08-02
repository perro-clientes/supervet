import type { Metadata } from "next";

import { SitePage } from "@/components/pages/SitePage";
import { getPageMetadata } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("servicios");
}

export default function ServiciosPage() {
  return <SitePage slug="servicios" />;
}
