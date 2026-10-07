import { ButtonLink } from "@/components/ui/ButtonLink";
import { AxisTriad } from "@/components/technical/AxisTriad";
import { defaultLocale, href, ui } from "@/lib/i18n";

// not-found receives no params, so this page is shown in the default language.
const lang = defaultLocale;

export default function NotFound() {
  const t = ui[lang].notFound;
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <AxisTriad size={64} />
      <p className="label mt-8 text-accent">{t.label}</p>
      <h1 className="mt-4 text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
        {t.title[0]}
        <br />
        {t.title[1]}
      </h1>
      <div className="mt-10 flex gap-3">
        <ButtonLink href={href(lang)} variant="primary">
          {t.home}
        </ButtonLink>
        <ButtonLink href={href(lang, "/projects")}>{t.projects}</ButtonLink>
      </div>
    </section>
  );
}
