"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navItems, type SiteSettings } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logo = settings.logo?.asset?._ref
    ? urlFor(settings.logo).width(140).url()
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Ir al inicio">
          {logo ? (
            <Image
              src={logo}
              alt={settings.logo?.alt || settings.name}
              width={70}
              height={70}
              className="h-14 w-14 object-contain"
            />
          ) : (
            <span className="text-xl font-extrabold tracking-tight">
              {settings.name}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => {
            if (item.label === "Contacto") return null;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary",
                  isActive(pathname, item.href)
                    ? "text-primary"
                    : "text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contacto" size="sm">
            Contacto
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-black/10 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={cn(
              "block h-0.5 w-5 bg-ink transition-transform",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-ink transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-ink transition-transform",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </Container>

      {open && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-semibold transition-colors hover:bg-cream-soft hover:text-primary",
                  isActive(pathname, item.href) ? "text-primary" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
