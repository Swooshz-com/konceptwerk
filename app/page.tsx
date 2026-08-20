import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/ArrowIcon";
import { InquiryCta } from "@/components/InquiryCta";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { TextLink } from "@/components/TextLink";
import { articles, projects, serviceGroups, site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Koncept Werk | Interior Design & Build",
  },
  description:
    "Koncept Werk brings intelligent interior design, construction and project management together for residential and commercial spaces.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: site.name,
    title: "Koncept Werk | Interior Design & Build",
    description:
      "Smart design, seamless execution and interiors tailored for your space.",
    url: site.url,
    images: [
      {
        url: "/images/projects/residential/residential-hero.webp",
        width: 2433,
        height: 1314,
        alt: "Koncept Werk residential interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koncept Werk | Interior Design & Build",
    description: "Smart design, seamless execution and interiors tailored for your space.",
    images: ["/images/projects/residential/residential-hero.webp"],
  },
};

const principles = [
  {
    title: "Smart, space-saving design solutions",
    description: "Planning starts with how a home needs to work, making room for comfort, storage and the routines of daily life.",
  },
  {
    title: "Turnkey interior and contracting service",
    description: "Interior design, construction and project management stay connected from the first plan through delivery.",
  },
  {
    title: "Customized around your lifestyle",
    description: "Each project is tailored to the people, preferences and practical needs that make a space feel like home.",
  },
  {
    title: "Transparent processes and timely delivery",
    description: "A clear six-stage journey keeps consultation, quotation, planning, scheduling and renovation easy to follow.",
  },
] as const;

const homepageProjects = [
  ...projects.filter((project) => project.category === "Residential"),
  ...projects.filter((project) => project.category === "Commercial"),
];

export default function HomePage() {
  return (
    <main id="main-content" className="home-page page-main--flush">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__media">
          <Image
            src="/images/projects/residential/residential-hero.webp"
            alt="Warm Koncept Werk open-plan residential interior with timber cabinetry"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="home-hero__content">
          <h1 id="home-title">
            Smart Design.{" "}
            <span>Seamless Execution. Tailored for Your Space.</span>
          </h1>
          <p className="home-hero__sub">
            At KonceptWerk.com, we specialize in intelligent interior design and quality contract work that transforms
            your space into a harmonious blend of functionality and style.
          </p>
          <div className="home-hero__actions">
            <TextLink href="/work">Discover our portfolio</TextLink>
            <TextLink href="/contact">Start a project</TextLink>
          </div>
        </div>
      </section>

      <section className="home-intro page-shell section-pad" aria-labelledby="about-title">
        <h2 id="about-title" data-reveal>Spaces that work smarter, feel better and reflect who you are.</h2>
        <div className="home-intro__copy" data-reveal>
          <p>
            Koncept Werk combines intelligent interior design with contracting precision to deliver residential,
            commercial spaces from concept through execution.
          </p>
          <TextLink href="/studio">About Koncept Werk</TextLink>
        </div>
      </section>

      <section className="home-process page-shell section-pad" aria-labelledby="process-title">
        <div className="home-process__heading">
          <h2 id="process-title" data-reveal>From first conversation to completed space.</h2>
          <p data-reveal>
            Six clear stages take the brief through consultation, quotation, design, scheduling and renovation.
          </p>
        </div>
        <ProcessTimeline />
      </section>

      <section className="home-principles section-pad" aria-labelledby="why-title">
        <div className="home-principles__layout page-shell">
          <h2 id="why-title" data-reveal>What sets us apart</h2>
          <div className="principles-list">
            {principles.map((principle) => (
              <article className="principle" key={principle.title} data-reveal>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-services section-pad" aria-labelledby="services-title">
        <div className="page-shell">
          <div className="home-services__intro">
            <h2 id="services-title" data-reveal>Design meets delivery.</h2>
            <p data-reveal>
              One studio connects the spatial idea, visualisation, construction detail and project coordination.
            </p>
          </div>
          <div className="service-preview-list">
            {serviceGroups.map((group) => (
              <Link className="service-preview" href={"/services#" + group.id} key={group.id}>
                <span className="service-preview__number">{group.number}</span>
                <h3>{group.title}</h3>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-work page-shell" aria-labelledby="selected-work-title">
        <div className="section-heading-row">
          <h2 id="selected-work-title" data-reveal>Selected work</h2>
          <TextLink href="/work">Explore all work</TextLink>
        </div>
        <div className="home-work-grid">
          {Array.from({ length: Math.ceil(homepageProjects.length / 2) }, (_, rowIndex) => (
            <div className="home-work-row" key={"work-row-" + (rowIndex + 1)}>
              {homepageProjects.slice(rowIndex * 2, rowIndex * 2 + 2).map((project, projectOffset) => {
                const projectIndex = rowIndex * 2 + projectOffset;

                return (
                  <article
                    className="home-project"
                    key={project.slug}
                    data-reveal="image"
                    style={{ "--delay": String(projectIndex * 60) + "ms" } as CSSProperties}
                  >
                    <Link className="home-project__image" href={"/work/" + project.slug} aria-label={"View " + project.title}>
                      <Image
                        src={project.cover.src}
                        alt={project.cover.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 42vw"
                      />
                    </Link>
                    <div className="home-project__meta">
                      <div>
                        <h3>{project.title}</h3>
                        <span>{project.category}</span>
                      </div>
                      <Link href={"/work/" + project.slug} aria-label={"Open " + project.title}>
                        <ArrowIcon />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="journal-preview journal-preview--quiet page-shell" aria-labelledby="journal-title">
        <div className="section-heading-row">
          <h2 id="journal-title" data-reveal>From the journal</h2>
          <TextLink href="/journal">Read the journal</TextLink>
        </div>
        <div className="journal-preview__grid">
          <article className="article-card journal-preview__feature" data-reveal="image">
            <Link className="article-card__image" href={"/journal/" + articles[0].slug}>
              <Image src={articles[0].image} alt={articles[0].imageAlt} fill sizes="(max-width: 900px) 100vw, 58vw" />
            </Link>
            <div className="article-card__copy">
              <div className="journal-meta"><span>{articles[0].category}</span><time dateTime={articles[0].dateIso}>{articles[0].date}</time></div>
              <h3><Link href={"/journal/" + articles[0].slug}>{articles[0].title}</Link></h3>
              <p>{articles[0].excerpt}</p>
            </div>
          </article>
          <div className="journal-preview__side">
            {articles.slice(1).map((article) => (
              <article className="article-card" key={article.slug} data-reveal>
                <Link className="article-card__image" href={"/journal/" + article.slug}>
                  <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 900px) 100vw, 36vw" />
                </Link>
                <div className="article-card__copy">
                  <div className="journal-meta"><span>{article.category}</span><time dateTime={article.dateIso}>{article.date}</time></div>
                  <h3><Link href={"/journal/" + article.slug}>{article.title}</Link></h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InquiryCta />
    </main>
  );
}
