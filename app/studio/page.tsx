import type { Metadata } from "next";
import Image from "next/image";

import { InquiryCta } from "@/components/InquiryCta";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { TextLink } from "@/components/TextLink";
import { team } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet Koncept Werk, an interior design and build studio bringing intelligent planning, craftsmanship and project delivery together.",
  alternates: { canonical: "/studio" },
};

const strengths = [
  "Smart, space-saving design solutions",
  "Turnkey interior and contracting service",
  "Customized approach tailored to your lifestyle and needs",
  "Transparent processes and timely delivery",
] as const;

export default function StudioPage() {
  return (
    <main id="main-content" className="studio-page page-main">
      <header className="studio-hero">
        <div className="studio-hero__image media-frame">
          <Image
            src="/images/projects/residential/kitchen-warm.webp"
            alt="Koncept Werk warm kitchen and living interior"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 62vw"
          />
        </div>
        <div className="studio-hero__copy">
          <p className="eyebrow">About Koncept Werk</p>
          <h1>A studio where design meets delivery.</h1>
          <p className="prose-large">
            Founded with a vision to bring intelligent, space-saving interior solutions to modern living and work
            environments, Koncept Werk combines design expertise with contracting precision.
          </p>
        </div>
      </header>

      <section className="studio-team section-pad" aria-labelledby="team-title">
        <div className="page-shell">
          <div className="studio-team__intro">
            <h2 id="team-title" data-reveal>People behind the work</h2>
            <p data-reveal>
              Interior design and interior architecture come together with a wider network of craftspeople and project
              partners.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <article className="team-member" key={member.name} data-reveal>
                <div className="team-member__image">
                  <Image src={member.image} alt={member.name} fill sizes="(max-width: 430px) 100vw, 25vw" />
                </div>
                <div className="team-member__copy">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-mission section-pad page-shell" aria-labelledby="mission-title">
        <p className="studio-mission__label" id="mission-title">Our mission</p>
        <blockquote data-reveal>
          To create intelligent, efficient and aesthetically pleasing spaces that enhance everyday living and working.
        </blockquote>
      </section>

      <section className="studio-strengths section-pad" aria-labelledby="strengths-title">
        <div className="page-shell">
          <div className="studio-strengths__intro">
            <h2 id="strengths-title" data-reveal>What sets us apart</h2>
            <p data-reveal>
              A practical, tailored approach keeps the space, the brief and the build aligned from beginning to end.
            </p>
          </div>
          <div className="studio-strengths__list">
            {strengths.map((strength) => (
              <div className="studio-strengths__item" key={strength} data-reveal>
                <strong>{strength}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-process page-shell section-pad" aria-labelledby="approach-title">
        <div className="home-process__heading">
          <h2 id="approach-title" data-reveal>Thoughtful planning. Clear execution.</h2>
          <p data-reveal>
            Every project is guided by functionality, innovation and craftsmanship, then carried through a defined
            journey from consultation to renovation.
          </p>
        </div>
        <ProcessTimeline showDescriptions={false} />
      </section>

      <section className="careers-prompt page-shell section-pad" id="career" aria-labelledby="career-title">
        <h2 id="career-title" data-reveal>Interested in joining the studio?</h2>
        <div className="careers-prompt__copy" data-reveal>
          <p>
            There are no published vacancies at present. Koncept Werk welcomes general expressions of interest for
            future opportunities.
          </p>
          <TextLink href="/careers">Careers at Koncept Werk</TextLink>
        </div>
      </section>

      <InquiryCta />
    </main>
  );
}
