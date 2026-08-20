import type { Metadata, Viewport } from "next";

import "@fontsource-variable/manrope/wght.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.css";

import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionScrollAssist } from "@/components/SectionScrollAssist";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Koncept Werk | Interior Design & Build",
    template: "%s | Koncept Werk",
  },
  description:
    "Koncept Werk brings intelligent interior design, construction and project management together for residential and commercial spaces.",
  icons: {
    icon: "/images/brand/koncept-mark.webp",
    apple: "/images/brand/koncept-mark.webp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2eee7",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "61 Kaki Bukit Avenue 1, 02-26, Shuli Industrial Park",
    addressLocality: "Singapore",
    postalCode: "417943",
    addressCountry: "SG",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <RevealObserver />
        <SectionScrollAssist />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
