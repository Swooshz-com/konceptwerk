"use client";

import { useEffect } from "react";

const SECTION_SELECTOR =
  ".home-page > :is(.home-hero, .home-intro, .home-work, .home-services, .home-process, .home-principles, .journal-preview, .inquiry-cta)";
const ASSIST_LOCK_MS = 780;
const CURRENT_SECTION_TOLERANCE_PX = 48;
const INNER_SCROLL_EDGE_TOLERANCE_PX = 2;
const MIN_TARGET_SECTION_HEIGHT_PX = 120;

function isTextEntryActive() {
  const active = document.activeElement;

  return (
    active instanceof HTMLInputElement ||
    active instanceof HTMLTextAreaElement ||
    active instanceof HTMLSelectElement ||
    (active instanceof HTMLElement && active.isContentEditable)
  );
}

function isFormInteractionTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(
      target.closest(
        "form, input, select, textarea, [contenteditable='true'], [role='textbox'], [role='combobox']",
      ),
    )
  );
}

function canScrollInDirection(element: HTMLElement, deltaY: number) {
  if (deltaY > 0) {
    return (
      element.scrollTop + element.clientHeight <
      element.scrollHeight - INNER_SCROLL_EDGE_TOLERANCE_PX
    );
  }

  return element.scrollTop > INNER_SCROLL_EDGE_TOLERANCE_PX;
}

function getScrollableAncestor(target: EventTarget | null, deltaY: number) {
  if (!(target instanceof Element)) return null;

  let element: HTMLElement | null =
    target instanceof HTMLElement ? target : target.parentElement;

  while (element && element !== document.body && element !== document.documentElement) {
    const style = window.getComputedStyle(element);
    const scrollableY =
      style.overflowY === "auto" ||
      style.overflowY === "scroll" ||
      style.overflowY === "overlay";

    if (
      scrollableY &&
      element.scrollHeight > element.clientHeight &&
      canScrollInDirection(element, deltaY)
    ) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

function getHeaderOffset() {
  return document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().height ?? 0;
}

function getMaxScrollTop() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function getSectionTargets() {
  const headerOffset = getHeaderOffset();

  return Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR))
    .flatMap((element) => {
      const rect = element.getBoundingClientRect();

      if (rect.width < 1 || rect.height < MIN_TARGET_SECTION_HEIGHT_PX) return [];

      const targetTop = window.scrollY + rect.top - headerOffset;
      return [{ targetTop: Math.min(Math.max(0, targetTop), getMaxScrollTop()) }];
    })
    .sort((first, second) => first.targetTop - second.targetTop);
}

function getTargetForWheel(deltaY: number) {
  const currentTop = window.scrollY;
  const targets = getSectionTargets();

  if (deltaY > 0) {
    return (
      targets.find(
        ({ targetTop }) => targetTop > currentTop + CURRENT_SECTION_TOLERANCE_PX,
      )?.targetTop ?? null
    );
  }

  return (
    [...targets]
      .reverse()
      .find(
        ({ targetTop }) => targetTop < currentTop - CURRENT_SECTION_TOLERANCE_PX,
      )?.targetTop ?? null
  );
}

export function HomeSectionScrollAssist() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopViewport = window.matchMedia("(min-width: 901px)");
    const wheelListenerOptions: AddEventListenerOptions = { passive: false };
    let unlockTimer: number | undefined;
    let assistLocked = false;

    function clearGlide() {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      unlockTimer = undefined;
      assistLocked = false;
    }

    function glideTo(targetTop: number) {
      if (unlockTimer) window.clearTimeout(unlockTimer);

      const distance = targetTop - window.scrollY;
      if (Math.abs(distance) < 1) {
        clearGlide();
        return;
      }

      assistLocked = true;
      window.scrollTo({ top: targetTop, left: 0, behavior: "smooth" });
      unlockTimer = window.setTimeout(() => {
        assistLocked = false;
        unlockTimer = undefined;
      }, ASSIST_LOCK_MS);
    }

    function handleWheel(event: WheelEvent) {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.defaultPrevented ||
        reducedMotion.matches ||
        !desktopViewport.matches ||
        isTextEntryActive() ||
        isFormInteractionTarget(event.target) ||
        Math.abs(event.deltaY) < 1 ||
        Math.abs(event.deltaY) < Math.abs(event.deltaX) ||
        getScrollableAncestor(event.target, event.deltaY)
      ) {
        return;
      }

      if (assistLocked) {
        event.preventDefault();
        return;
      }

      const targetTop = getTargetForWheel(event.deltaY);
      if (targetTop === null) return;

      event.preventDefault();
      glideTo(targetTop);
    }

    window.addEventListener("wheel", handleWheel, wheelListenerOptions);
    window.addEventListener("touchstart", clearGlide, { passive: true });
    window.addEventListener("keydown", clearGlide);
    reducedMotion.addEventListener("change", clearGlide);
    desktopViewport.addEventListener("change", clearGlide);

    return () => {
      clearGlide();
      window.removeEventListener("wheel", handleWheel, wheelListenerOptions);
      window.removeEventListener("touchstart", clearGlide);
      window.removeEventListener("keydown", clearGlide);
      reducedMotion.removeEventListener("change", clearGlide);
      desktopViewport.removeEventListener("change", clearGlide);
    };
  }, []);

  return null;
}
