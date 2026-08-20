import Image from "next/image";

import { TextLink } from "@/components/TextLink";

export function InquiryCta() {
  return (
    <section className="inquiry-cta">
      <div className="inquiry-cta__image" data-reveal="image" data-parallax>
        <Image
          src="/images/projects/hospitality/bar-warm.webp"
          alt="Warm commercial interior by Koncept Werk"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="inquiry-cta__content" data-reveal>
        <h2>Have a space in mind? Let&apos;s shape it together.</h2>
        <TextLink href="/contact">Start a project</TextLink>
      </div>
    </section>
  );
}
