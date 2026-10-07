import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { defaultLocale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import NotFound from "./[lang]/not-found";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "404",
  robots: { index: false },
};

/** 404 for URLs outside /en and /it. Must render the full document. */
export default function GlobalNotFound() {
  return (
    <html
      lang={defaultLocale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header lang={defaultLocale} />
        <main id="main" className="flex-1">
          <NotFound />
        </main>
        <Footer lang={defaultLocale} />
      </body>
    </html>
  );
}
