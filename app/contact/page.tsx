import type { Metadata } from "next";
import { site } from "@/content/site";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email, LinkedIn and GitHub.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact as="h1" />;
}
