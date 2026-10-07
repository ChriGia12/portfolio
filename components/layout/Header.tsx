"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/content/site";
import { href, locales, otherLocale, ui, type Locale } from "@/lib/i18n";

/** EN / IT toggle: links to the same page in the other language. */
function LanguageSwitch({ lang, pathname }: { lang: Locale; pathname: string }) {
  const other = otherLocale(lang);
  const target = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${other}`);
  return (
    <Link
      href={target}
      hrefLang={other}
      aria-label={ui[lang].a11y.switchTo}
      onClick={() => {
        try {
          localStorage.setItem("lang", other);
        } catch {}
      }}
      className="label group flex h-11 items-center gap-1.5 border border-line px-3 transition-colors duration-300 hover:border-fg"
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="text-dim">/</span>}
          <span
            className={
              l === lang
                ? "text-fg"
                : "text-dim transition-colors duration-300 group-hover:text-accent"
            }
          >
            {l}
          </span>
        </span>
      ))}
    </Link>
  );
}

export function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = ui[lang];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (path: string) => {
    const full = href(lang, path);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href={href(lang)}
          onClick={() => setOpen(false)}
          className="group flex h-11 items-center gap-3 text-sm font-medium tracking-tight"
        >
          <span aria-hidden className="h-2 w-2 bg-accent transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
          {site.name}
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <nav aria-label={t.a11y.main} className="hidden md:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.path}>
                  <Link
                    href={href(lang, item.path)}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    className={`label transition-colors duration-300 hover:text-fg ${
                      isActive(item.path) ? "text-fg" : "text-muted"
                    }`}
                  >
                    {isActive(item.path) && <span aria-hidden className="mr-2 text-accent">/</span>}
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitch lang={lang} pathname={pathname} />

          <button
            type="button"
            className="label -mr-2 flex h-11 items-center px-2 text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.a11y.close : t.a11y.menu}
          </button>
        </div>
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
            <nav aria-label={t.a11y.mobile} className="shell pt-8">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.path} className="border-b border-line">
                    <Link
                      href={href(lang, item.path)}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      className="flex items-baseline gap-4 py-5 text-4xl font-medium tracking-tight"
                    >
                      <span className="label text-accent">0{i + 1}</span>
                      {t.nav[item.key]}
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
