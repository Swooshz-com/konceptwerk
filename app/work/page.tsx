import type { Metadata } from "next";

import { InquiryCta } from "@/components/InquiryCta";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Explore selected Koncept Werk residential, commercial, food and beverage, and exhibition interiors.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main-content" className="page-main">
      <header className="page-intro page-shell">
        <h1>Selected work</h1>
        <div className="page-intro__copy">
          <p>
            A selection of residential, commercial and exhibition environments, shaped from concept through
            execution.
          </p>
        </div>
      </header>
      <section className="page-shell" aria-label="Project index">
        <ProjectGrid />
      </section>
      <InquiryCta />
    </main>
  );
}
