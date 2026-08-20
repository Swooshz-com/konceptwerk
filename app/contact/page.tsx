import type { Metadata } from "next";

import { EnquiryForm } from "@/components/EnquiryForm";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a residential or commercial interior project with Koncept Werk in Singapore.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="page-main">
      <section className="contact-hero">
        <div className="contact-hero__details">
          <h1>Have a space in mind?</h1>
          <div className="contact-details">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            <p>{site.address}</p>
            <div>
              {site.hours.map((line) => <p key={line}>{line}</p>)}
            </div>
          </div>
        </div>
        <div className="contact-hero__form">
          <h2>Let&apos;s shape it together.</h2>
          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
