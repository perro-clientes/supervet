import type { Metadata } from "next";

import { SitePage } from "@/components/pages/SitePage";
import { getPageMetadata } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contacto");
}

export default function ContactoPage() {
  return <SitePage slug="contacto" />;
}
