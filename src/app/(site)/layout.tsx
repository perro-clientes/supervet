import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { getSiteSettings } from "@/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.classList.add('js')",
        }}
      />
      <RevealObserver />
      <Header settings={settings} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton settings={settings} />
    </>
  );
}
