import Link from "next/link";
import { nav, site } from "@/content/site";
import { href, ui, type Locale } from "@/lib/i18n";
import { AxisTriad } from "@/components/technical/AxisTriad";

export function Footer({ lang }: { lang: Locale }) {
  const t = ui[lang];
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div className="flex items-end gap-4">
          <AxisTriad size={44} />
          <div>
            <p className="text-sm font-medium">{site.name}</p>
            <p className="label mt-1 text-dim">{t.site.role}</p>
          </div>
        </div>

        <nav aria-label={t.a11y.footer}>
          <ul className="label flex flex-wrap gap-x-6 text-muted [&_a]:inline-block [&_a]:py-3">
            {nav.map((item) => (
              <li key={item.path}>
                <Link href={href(lang, item.path)} className="transition-colors hover:text-fg">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
