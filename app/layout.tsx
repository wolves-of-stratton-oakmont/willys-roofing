import type { Metadata } from "next";
import { Archivo, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

/**
 * Fonts (next/font, self-hosted, no layout shift):
 *  • Archivo      — display / headings (variable wght + wdth; industrial)
 *  • Public Sans  — body (variable; civic, highly legible)
 *  • IBM Plex Mono — eyebrows, labels, data/specs (the engineered voice)
 * Each exposes a CSS variable consumed by --font-* tokens in globals.css.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Roofing in ${site.primaryCity} & ${site.regionShort}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "roofing",
    "roofers",
    "roof replacement",
    "roof repair",
    "shingle roofing",
    "flat roofing",
    "eavestrough",
    site.primaryCity,
    "Hamilton roofing",
    "Niagara roofing",
    "Ontario",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Roofing in ${site.primaryCity} & ${site.regionShort}`,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — licensed, insured roofing in ${site.serviceRegion}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Roofing in ${site.primaryCity} & ${site.regionShort}`,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${archivo.variable} ${publicSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-chalk-100)]">
        {/* Skip link — first focusable element for keyboard/AT users. */}
        <a
          href="#main"
          className="sr-only rounded-[var(--radius-sm)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--color-slate-900)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
