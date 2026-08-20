import type { Metadata } from "next";
import Image from "next/image";

import { CareerForm } from "@/components/CareerForm";

export const metadata: Metadata = {
  title: "Careers",
  description: "Share an expression of interest for future opportunities with the Koncept Werk studio.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <main id="main-content" className="page-main">
      <header className="career-hero page-shell section-pad">
        <div>
          <h1>Make thoughtful spaces with us.</h1>
          <p className="prose-large">
            Koncept Werk has not published any current vacancies. The studio welcomes expressions of interest for
            future roles and collaborations.
          </p>
        </div>
        <div className="career-hero__image media-frame" data-reveal="image">
          <Image
            src="/images/projects/residential/bedroom-joinery.webp"
            alt="Detailed custom bedroom joinery from the Koncept Werk portfolio"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </header>

      <section className="career-form-wrap page-shell section-pad" aria-labelledby="career-form-title">
        <h2 id="career-form-title" data-reveal>Introduce yourself</h2>
        <div data-reveal>
          <CareerForm />
        </div>
      </section>
    </main>
  );
}
