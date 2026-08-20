import Image from "next/image";
import Link from "next/link";

import { navigation, site } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top page-shell">
        <div className="site-footer__brand">
          <Image
            src="/images/brand/koncept-werk.webp"
            alt="Koncept Werk"
            width={500}
            height={196}
            sizes="(max-width: 768px) 52vw, 240px"
          />
          <p>Interior design, construction and project delivery, brought together.</p>
        </div>
        <div className="site-footer__column">
          <p className="footer-label">Quick links</p>
          <Link href="/">Home</Link>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/work">Portfolio</Link>
        </div>
        <div className="site-footer__column">
          <p className="footer-label">Talk to us</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          <p>{site.address}</p>
        </div>
        <div className="site-footer__column">
          <p className="footer-label">Working hours</p>
          {site.hours.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <div className="site-footer__base page-shell">
        <p>© {new Date().getFullYear()} {site.name}. {site.legalName}.</p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
