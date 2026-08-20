"use client";

import { useEffect } from "react";

const SECTION_SELECTOR = "#main-content > :is(header, section)";
const WHEEL_DELTA_THRESHOLD = 1;
const CURRENT_SECTION_TOLERANCE_PX = 48;
const INNER_SCROLL_EDGE_TOLERANCE_PX = 2;
const MIN_TARGET_SECTION_HEIGHT_PX = 120;
const WHEEL_IDLE_UNLOCK_MS = 260;
const SCROLL_SETTLE_POLL_MS = 40;
const SCROLL_SETTLE_TOLERANCE_PX = 2;
const MAX_GLIDE_LOCK_MS = 1600;

function isTextEntryActive() {
  const active = document.activeElement;

  if (!active) {
    return false;
  }

  return (
    active instanceof HTMLInputElement ||
    active instanceof HTMLTextAreaElement ||
    active instanceof HTMLSelectElement ||
    (active instanceof HTMLElement && active.isContentEditable)
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
  if (!(target instanceof Element)) {
    return null;
  }

  let element: HTMLElement | null =
    target instanceof HTMLElement ? target : target.parentElement;

  while (
    element &&
    element !== document.body &&
    element !== document.documentElement
  ) {
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
  const header = document.querySelector<HTMLElement>(".site-header");

  return header?.getBoundingClientRect().height ?? 0;
}

function getMaxScrollTop() {
  const page = document.documentElement;

  return Math.max(0, page.scrollHeight - window.innerHeight);
}

function getElementDocumentTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;

  while (current) {
    top += current.offsetTop;
    current = current.offsetParent instanceof HTMLElement ? current.offsetParent : null;
  }

  return top;
}

function getElementTargetTop(
  element: HTMLElement,
  headerOffset: number,
  align: "start" | "center",
) {
  const documentTop = getElementDocumentTop(element);
  const elementHeight = element.offsetHeight;
  const targetTop =
    align === "center"
      ? documentTop +
        elementHeight / 2 -
        (headerOffset + (window.innerHeight - headerOffset) / 2)
      : documentTop - headerOffset;

  return Math.min(Math.max(0, targetTop), getMaxScrollTop());
}

function getSectionTargets() {
  const headerOffset = getHeaderOffset();

  return Array.from(
    document.querySelectorAll<HTMLElement>(SECTION_SELECTOR),
  )
    .flatMap((section) => {
      const projectTargets = section.classList.contains("home-work")
        ? Array.from(section.querySelectorAll<HTMLElement>(".home-project"))
        : [];
      const elements = projectTargets.length > 0 ? projectTargets : [section];

      return elements.flatMap((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.width < 1 || rect.height < MIN_TARGET_SECTION_HEIGHT_PX) {
          return [];
        }

        const align = element.classList.contains("home-project")
          ? "center"
          : "start";

        return [{ targetTop: getElementTargetTop(element, headerOffset, align) }];
      });
    })
    .sort((first, second) => first.targetTop - second.targetTop);
}

function getTargetForWheel(deltaY: number) {
  const currentTop = window.scrollY;
  const targets = getSectionTargets();

  if (deltaY > 0) {
    return (
      targets.find(
        ({ targetTop }) =>
          targetTop > currentTop + CURRENT_SECTION_TOLERANCE_PX,
      )?.targetTop ?? null
    );
  }

  return (
    [...targets]
      .reverse()
      .find(
        ({ targetTop }) =>
          targetTop < currentTop - CURRENT_SECTION_TOLERANCE_PX,
      )?.targetTop ?? null
  );
}

export function SectionScrollAssist() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopViewport = window.matchMedia("(min-width: 901px)");
    const wheelListenerOptions: AddEventListenerOptions = { passive: false };
    let unlockTimer: number | undefined;
    let assistLocked = false;
    let activeTargetTop: number | null = null;
    let lastWheelAt = 0;
    let glideStartedAt = 0;

    function clearGlide() {
      if (unlockTimer !== undefined) {
        window.clearTimeout(unlockTimer);
        unlockTimer = undefined;
      }

      assistLocked = false;
      activeTargetTop = null;
      lastWheelAt = 0;
      glideStartedAt = 0;
    }

    function scheduleUnlock() {
      if (unlockTimer !== undefined) {
        window.clearTimeout(unlockTimer);
      }

      unlockTimer = window.setTimeout(() => {
        const now = performance.now();
        const targetSettled =
          activeTargetTop === null ||
          Math.abs(window.scrollY - activeTargetTop) <= SCROLL_SETTLE_TOLERANCE_PX;
        const wheelQuiet = now - lastWheelAt >= WHEEL_IDLE_UNLOCK_MS;
        const glideTimedOut = now - glideStartedAt >= MAX_GLIDE_LOCK_MS;

        if ((targetSettled || glideTimedOut) && wheelQuiet) {
          assistLocked = false;
          activeTargetTop = null;
          unlockTimer = undefined;
          return;
        }

        scheduleUnlock();
      }, SCROLL_SETTLE_POLL_MS);
    }

    function glideTo(targetTop: number) {
      if (unlockTimer !== undefined) {
        window.clearTimeout(unlockTimer);
        unlockTimer = undefined;
      }

      const startTop = window.scrollY;
      const distance = targetTop - startTop;

      if (Math.abs(distance) < 1) {
        clearGlide();
        return;
      }

      assistLocked = true;
      activeTargetTop = targetTop;
      lastWheelAt = performance.now();
      glideStartedAt = lastWheelAt;
      window.scrollTo({ top: targetTop, left: 0, behavior: "smooth" });
      scheduleUnlock();
    }

    function handleWheel(event: WheelEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
        return;
      }

      if (assistLocked) {
        if (Math.abs(event.deltaY) >= WHEEL_DELTA_THRESHOLD) {
          event.preventDefault();
          lastWheelAt = performance.now();
          scheduleUnlock();
        }
        return;
      }

      if (
        event.defaultPrevented ||
        reducedMotion.matches ||
        !desktopViewport.matches ||
        isTextEntryActive() ||
        Math.abs(event.deltaY) < WHEEL_DELTA_THRESHOLD ||
        Math.abs(event.deltaY) < Math.abs(event.deltaX) ||
        getScrollableAncestor(event.target, event.deltaY)
      ) {
        return;
      }

      const targetTop = getTargetForWheel(event.deltaY);

      if (targetTop === null) {
        return;
      }

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
