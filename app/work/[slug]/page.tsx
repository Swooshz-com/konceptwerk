import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { InquiryCta } from "@/components/InquiryCta";
import { getProject, projects } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | Koncept Werk`,
      description: project.summary,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="main-content" className="project-page page-main">
      <header className="project-intro page-shell">
        <div>
          <h1>{project.title}</h1>
          <div className="project-intro__meta">
            <span>{project.category}</span>
            <span>{project.scope}</span>
          </div>
        </div>
        <p className="project-intro__summary">{project.summary}</p>
      </header>

      <div className="project-hero" data-reveal="image">
        <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="100vw" />
      </div>

      <section className="project-story page-shell section-pad">
        <h2 data-reveal>Designed around how the space lives.</h2>
        <div className="project-story__copy" data-reveal>
          {project.narrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="project-gallery page-shell" aria-label={`${project.title} gallery`}>
        {project.gallery.map((image, index) => (
          <figure
            className={`gallery-item gallery-item--${image.aspect}`}
            key={image.src}
            data-reveal="image"
            style={{ "--delay": `${(index % 2) * 70}ms` } as React.CSSProperties}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={image.aspect === "wide" ? "100vw" : "(max-width: 767px) 100vw, 50vw"}
            />
          </figure>
        ))}
      </section>

      <nav className="project-pagination page-shell" aria-label="Adjacent work">
        <a href={`/work/${previous.slug}`}>
          <span>Previous project</span>
          <strong>{previous.title}</strong>
        </a>
        <a href={`/work/${next.slug}`}>
          <span>Next project</span>
          <strong>{next.title}</strong>
        </a>
      </nav>

      <InquiryCta />
    </main>
  );
}
