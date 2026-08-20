import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { InquiryCta } from "@/components/InquiryCta";
import { TextLink } from "@/components/TextLink";
import { articles } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from Koncept Werk on space-saving homes, commercial interiors and the design-to-build journey.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [featured, ...rest] = articles;

  return (
    <main id="main-content" className="page-main">
      <header className="page-intro page-shell">
        <h1>Journal</h1>
        <div className="page-intro__copy">
          <p>Ideas about living well, building clearly and making every part of a space count.</p>
        </div>
      </header>

      <article className="journal-featured">
        <Link className="journal-featured__image" href={`/journal/${featured.slug}`}>
          <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 62vw" />
        </Link>
        <div className="journal-featured__copy">
          <div className="journal-meta">
            <span>{featured.category}</span>
            <time dateTime={featured.dateIso}>{featured.date}</time>
          </div>
          <h2><Link href={`/journal/${featured.slug}`}>{featured.title}</Link></h2>
          <p>{featured.excerpt}</p>
          <TextLink href={`/journal/${featured.slug}`}>Read article</TextLink>
        </div>
      </article>

      <section className="page-shell section-pad" aria-labelledby="more-stories-title">
        <div className="section-heading-row">
          <h2 id="more-stories-title">More stories</h2>
        </div>
        <div className="article-index">
          {rest.map((article) => (
            <article className="article-card" key={article.slug} data-reveal="image">
              <Link className="article-card__image" href={`/journal/${article.slug}`}>
                <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" />
              </Link>
              <div className="article-card__copy">
                <div className="journal-meta">
                  <span>{article.category}</span>
                  <time dateTime={article.dateIso}>{article.date}</time>
                </div>
                <h3><Link href={`/journal/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <InquiryCta />
    </main>
  );
}
