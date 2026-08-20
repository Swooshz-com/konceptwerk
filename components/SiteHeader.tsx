"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { navigation, site } from "@/lib/site-data";

type SiteHeaderProps = {
  overlay?: boolean;
};

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    const backgroundElements = [document.querySelector("main"), document.querySelector("footer")].filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );
    const previousInertStates = backgroundElements.map((element) => element.inert);

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
    });

    const focusTimer = window.setTimeout(() => {
      menuPanelRef.current?.querySelector<HTMLAnchorElement>(".mobile-menu__link")?.focus({ preventScroll: true });
    }, 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const menuLinks = Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>('a[href]:not([tabindex="-1"])') ?? [],
      );
      const focusable = menuButton ? [menuButton, ...menuLinks] : menuLinks;
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      backgroundElements.forEach((element, index) => {
        element.inert = previousInertStates[index];
      });
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const transparent = (overlay || pathname === "/") && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`site-header ${transparent ? "site-header--overlay" : "site-header--solid"}`}
        style={menuOpen ? { background: "var(--brown-deep)", color: "var(--paper-light)" } : undefined}
      >
        <div className="site-header__inner">
          <Link
            className="site-header__brand"
            href="/"
            aria-label="Koncept Werk home"
            aria-hidden={menuOpen || undefined}
            tabIndex={menuOpen ? -1 : undefined}
          >
            <Image
              className="site-header__logo"
              src="/images/brand/koncept-werk.webp"
              alt="Koncept Werk"
              width={500}
              height={196}
              sizes="(max-width: 640px) 130px, 170px"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation" aria-hidden={menuOpen || undefined}>
            {navigation.map((item) => {
              const itemPath = item.href.split("#")[0];
              const isActive = pathname === itemPath || pathname.startsWith(`${itemPath}/`);
              return (
                <Link
                  key={item.href}
                  className="desktop-nav__link"
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={menuOpen ? -1 : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={menuOpen ? "menu-toggle__icon is-open" : "menu-toggle__icon"} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={menuPanelRef}
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal={menuOpen ? "true" : undefined}
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu__link"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span>{String(index).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__contact">
          <a href={`mailto:${site.email}`} tabIndex={menuOpen ? 0 : -1}>
            {site.email}
          </a>
          <a href={`tel:${site.phone}`} tabIndex={menuOpen ? 0 : -1}>
            {site.phoneDisplay}
          </a>
          <p>{site.address}</p>
        </div>
      </div>
    </>
  );
}
