import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { SanityLive } from "@/sanity/lib/live";
import { defaultDescription } from "@/lib/site";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supervet",
  description: defaultDescription,
  icons: {
    icon: "/brand/isologotype-32x32.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="es"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        {isDraftMode && <VisualEditing />}
        <SanityLive includeDrafts={isDraftMode} />
      </body>
    </html>
  );
}
