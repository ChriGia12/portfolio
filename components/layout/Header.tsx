"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 text-sm font-medium tracking-tight"
        >
          <span aria-hidden className="h-2 w-2 bg-accent transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`label transition-colors duration-300 hover:text-fg ${
                    isActive(item.href) ? "text-fg" : "text-muted"
                  }`}
                >
                  {isActive(item.href) && <span aria-hidden className="mr-2 text-accent">/</span>}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="label -mr-2 flex h-11 items-center px-2 text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex h-[calc(100dvh-4rem)] flex-col justify-between bg-bg md:hidden"
          >
            <nav aria-label="Mobile" className="shell pt-8">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 py-5 text-4xl font-medium tracking-tight"
                    >
                      <span className="label text-accent">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="shell label flex gap-6 pb-10 text-muted">
              <a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
