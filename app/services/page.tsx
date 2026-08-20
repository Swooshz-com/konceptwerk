import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { InquiryCta } from "@/components/InquiryCta";
import { TextLink } from "@/components/TextLink";
import { serviceGroups } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential interior design, commercial design and build, exhibition environments, custom carpentry and end-to-end project management.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="services-page page-main">
      <header className="services-intro page-shell section-pad">
        <h1>Design, build and everything between.</h1>
        <div>
          <p>
            Koncept Werk connects interior design, visualisation, construction and project management for homes,
            commercial environments and exhibition spaces.
          </p>
        </div>
      </header>

      <nav className="services-index page-shell" aria-label="Services on this page">
        {serviceGroups.map((group) => <Link href={`#${group.id}`} key={group.id}>{group.title}</Link>)}
      </nav>

      <div>
        {serviceGroups.map((group) => (
          <section className="service-chapter" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
            <div className="service-chapter__content">
              <span className="service-chapter__number">{group.number}</span>
              <div className="service-chapter__body" data-reveal>
                <h2 id={`${group.id}-title`}>{group.title}</h2>
                <h3>{group.heading}</h3>
                <p>{group.description}</p>
                <ul className="service-list">
                  {group.services.map((service) => <li key={service}>{service}</li>)}
                </ul>
                <TextLink href={`/work/${group.projectSlug}`}>View related work</TextLink>
              </div>
            </div>
            <div className="service-chapter__image" data-reveal="image">
              <Image src={group.image} alt={group.imageAlt} fill sizes="(max-width: 900px) 100vw, 57vw" />
            </div>
          </section>
        ))}
      </div>

      <InquiryCta />
    </main>
  );
}
