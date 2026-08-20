import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { InquiryCta } from "@/components/InquiryCta";
import { TextLink } from "@/components/TextLink";
import { articles, getArticle } from "@/lib/site-data";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.dateIso,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main id="main-content" className="article-page page-main">
      <header className="article-page__header page-shell">
        <div className="journal-meta">
          <span>{article.category}</span>
          <time dateTime={article.dateIso}>{article.date}</time>
        </div>
        <h1>{article.title}</h1>
        <p className="prose-large">{article.excerpt}</p>
      </header>

      <div className="article-hero" data-reveal="image">
        <Image src={article.image} alt={article.imageAlt} fill priority sizes="100vw" />
      </div>

      <article className="article-body page-shell section-pad">
        {article.sections.map((section) => (
          <section className="article-section" key={section.heading} data-reveal>
            <h2>{section.heading}</h2>
            <div className="article-section__copy">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
        <TextLink href="/journal" direction="left">Back to journal</TextLink>
      </article>

      <InquiryCta />
    </main>
  );
}
