import type { Metadata } from "next";
import Image from "next/image";

import { InquiryCta } from "@/components/InquiryCta";
import { TextLink } from "@/components/TextLink";

export const metadata: Metadata = {
  title: "Exhibition Design & Build",
  description:
    "Custom exhibition booths, 3D visualisation, fabrication, branding, lighting and project management by Koncept Werk.",
  alternates: { canonical: "/fha" },
};

const booths = [
  { name: "Ebara", image: "/images/projects/exhibition/ebara.webp" },
  { name: "Ideku", image: "/images/projects/exhibition/ideku.webp" },
  { name: "Luxury", image: "/images/projects/exhibition/luxury.webp" },
  { name: "Hwee Jan", image: "/images/projects/exhibition/hwee-jan.webp" },
  { name: "Kopi 434", image: "/images/projects/exhibition/kopi-434.webp" },
] as const;

export default function FhaPage() {
  return (
    <main id="main-content" className="page-main">
      <header className="fha-hero">
        <div className="fha-hero__copy">
          <h1>Exhibition spaces built around the brand.</h1>
          <p>
            Custom booth concepts, 3D design and visualisation, fabrication, on-site build, lighting, AV, graphics
            and project management across Asia.
          </p>
          <TextLink href="/contact">Book a design consultation</TextLink>
        </div>
        <div className="fha-hero__image">
          <Image
            src="/images/projects/exhibition/ebara.webp"
            alt="Ebara exhibition booth designed and built by Koncept Werk"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </header>

      <section className="page-shell section-pad" aria-labelledby="booths-title">
        <div className="section-heading-row">
          <h2 id="booths-title">Published booth work</h2>
          <TextLink href="/work/exhibition-environments">View the collection</TextLink>
        </div>
        <div className="booth-grid">
          {booths.map((booth) => (
            <article className="booth-card" key={booth.name} data-reveal="image">
              <div className="booth-card__image">
                <Image src={booth.image} alt={`${booth.name} exhibition booth`} fill sizes="(max-width: 767px) 100vw, 50vw" />
              </div>
              <h3>{booth.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <InquiryCta />
    </main>
  );
}
