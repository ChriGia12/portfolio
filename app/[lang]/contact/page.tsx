import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternates, isLocale, ui } from "@/lib/i18n";
import { Contact } from "@/components/sections/Contact";

export async function generateMetadata(props: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const t = ui[lang].contact;
  return { title: t.label, description: t.meta, alternates: alternates(lang, "/contact") };
}

export default async function ContactPage(props: PageProps<"/[lang]/contact">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  return <Contact lang={lang} as="h1" />;
}
