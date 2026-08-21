"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HOMEPAGE_PATH = "/";
const SECTION_SELECTOR = "#main-content > :is(header, section)";
const WHEEL_INTENT_THRESHOLD_PX = 72;
const WHEEL_INTENT_IDLE_RESET_MS = 180;
const OPPOSITE_DIRECTION_THRESHOLD_PX = 14;
const CURRENT_SECTION_TOLERANCE_PX = 48;
const TARGET_DEDUPLICATION_TOLERANCE_PX = 80;
const INNER_SCROLL_EDGE_TOLERANCE_PX = 2;
const MIN_TARGET_SECTION_HEIGHT_PX = 120;
const SCROLL_QUIET_UNLOCK_MS = 130;
const SCROLL_SETTLE_TOLERANCE_PX = 8;
const MAX_GLIDE_LOCK_MS = 1000;

type ScrollTarget = {
  targetTop: number;
  height: number;
};

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

function getElementTargetTop(element: HTMLElement, headerOffset: number) {
  const documentTop = element.getBoundingClientRect().top + window.scrollY;

  return Math.min(
    Math.max(0, documentTop - headerOffset),
    getMaxScrollTop(),
  );
}

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

function getSectionTargets() {
  const headerOffset = getHeaderOffset();
  const rawTargets = Array.from(
    document.querySelectorAll<HTMLElement>(SECTION_SELECTOR),
  ).flatMap((section) => {
    const elements = section.classList.contains("home-work")
      ? Array.from(section.querySelectorAll<HTMLElement>(".home-work-row"))
      : [section];

    return elements.flatMap((element) => {
      const rect = element.getBoundingClientRect();

      if (rect.width < 1 || rect.height < MIN_TARGET_SECTION_HEIGHT_PX) {
        return [];
      }

      return [
        {
          targetTop: getElementTargetTop(element, headerOffset),
          height: rect.height,
        },
      ];
    });
  });

  return rawTargets
    .sort((first, second) => first.targetTop - second.targetTop)
    .filter(
      (target, index, targets) =>
        index === 0 ||
        target.targetTop - targets[index - 1].targetTop >=
          TARGET_DEDUPLICATION_TOLERANCE_PX,
    );
}

function shouldAllowNativeMovement(target: ScrollTarget, deltaY: number) {
  const usableViewport = Math.max(window.innerHeight - getHeaderOffset(), 1);

  if (target.height <= usableViewport + getHeaderOffset()) {
    return false;
  }

  if (deltaY > 0) {
    const nativeEdge = target.targetTop + target.height - usableViewport;

    return window.scrollY < nativeEdge - CURRENT_SECTION_TOLERANCE_PX;
  }

  return window.scrollY > target.targetTop + CURRENT_SECTION_TOLERANCE_PX;
}

function getTargetForWheel(deltaY: number) {
  const currentTop = window.scrollY;
  const targets = getSectionTargets();
  const currentTarget = [...targets]
    .reverse()
    .find(({ targetTop }) => targetTop <= currentTop + CURRENT_SECTION_TOLERANCE_PX);

  if (currentTarget && shouldAllowNativeMovement(currentTarget, deltaY)) {
    return null;
  }

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
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== HOMEPAGE_PATH) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopViewport = window.matchMedia("(min-width: 901px)");
    const wheelListenerOptions: AddEventListenerOptions = { passive: false };
    let unlockTimer: number | undefined;
    let assistLocked = false;
    let activeTargetTop: number | null = null;
    let glideDirection = 0;
    let wheelIntent = 0;
    let lastIntentAt = 0;
    let lastScrollAt = 0;
    let glideStartedAt = 0;

    function resetIntent() {
      wheelIntent = 0;
      lastIntentAt = 0;
    }

    function clearGlide() {
      if (unlockTimer !== undefined) {
        window.clearTimeout(unlockTimer);
        unlockTimer = undefined;
      }

      assistLocked = false;
      activeTargetTop = null;
      glideDirection = 0;
      lastScrollAt = 0;
      glideStartedAt = 0;
      resetIntent();
    }

    function cancelGlide() {
      if (assistLocked) {
        window.scrollTo({ top: window.scrollY, left: 0, behavior: "auto" });
      }

      clearGlide();
    }

    function finishGlide() {
      clearGlide();
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
        const scrollQuiet = now - lastScrollAt >= SCROLL_QUIET_UNLOCK_MS;
        const glideTimedOut = now - glideStartedAt >= MAX_GLIDE_LOCK_MS;

        if ((targetSettled || glideTimedOut) && scrollQuiet) {
          finishGlide();
          return;
        }

        scheduleUnlock();
      }, SCROLL_QUIET_UNLOCK_MS);
    }

    function glideTo(targetTop: number, direction: number) {
      const startTop = window.scrollY;
      const distance = targetTop - startTop;

      if (Math.abs(distance) < 1) {
        clearGlide();
        return;
      }

      assistLocked = true;
      activeTargetTop = targetTop;
      glideDirection = direction;
      glideStartedAt = performance.now();
      lastScrollAt = glideStartedAt;
      resetIntent();
      window.scrollTo({ top: targetTop, left: 0, behavior: "smooth" });
      scheduleUnlock();
    }

    function handleWheel(event: WheelEvent) {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.defaultPrevented
      ) {
        return;
      }

      const deltaY = normalizeWheelDelta(event);
      const direction = Math.sign(deltaY);

      if (!direction || Math.abs(deltaY) < Math.abs(event.deltaX)) {
        return;
      }

      if (assistLocked) {
        if (
          direction !== glideDirection &&
          Math.abs(deltaY) >= OPPOSITE_DIRECTION_THRESHOLD_PX
        ) {
          cancelGlide();
          return;
        }

        event.preventDefault();
        return;
      }

      if (
        reducedMotion.matches ||
        !desktopViewport.matches ||
        isTextEntryActive() ||
        getScrollableAncestor(event.target, deltaY)
      ) {
        resetIntent();
        return;
      }

      const now = performance.now();

      if (
        now - lastIntentAt > WHEEL_INTENT_IDLE_RESET_MS ||
        (wheelIntent !== 0 && Math.sign(wheelIntent) !== direction)
      ) {
        wheelIntent = 0;
      }

      wheelIntent += deltaY;
      lastIntentAt = now;

      if (Math.abs(wheelIntent) < WHEEL_INTENT_THRESHOLD_PX) {
        return;
      }

      const targetTop = getTargetForWheel(direction);

      if (targetTop === null) {
        resetIntent();
        return;
      }

      event.preventDefault();
      glideTo(targetTop, direction);
    }

    function handleScroll() {
      if (!assistLocked) {
        return;
      }

      lastScrollAt = performance.now();
      scheduleUnlock();
    }

    function handleScrollEnd() {
      if (assistLocked) {
        finishGlide();
      }
    }

    window.addEventListener("wheel", handleWheel, wheelListenerOptions);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd as EventListener);
    window.addEventListener("touchstart", cancelGlide, { passive: true });
    window.addEventListener("keydown", cancelGlide);
    reducedMotion.addEventListener("change", cancelGlide);
    desktopViewport.addEventListener("change", cancelGlide);

    return () => {
      cancelGlide();
      window.removeEventListener("wheel", handleWheel, wheelListenerOptions);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd as EventListener);
      window.removeEventListener("touchstart", cancelGlide);
      window.removeEventListener("keydown", cancelGlide);
      reducedMotion.removeEventListener("change", cancelGlide);
      desktopViewport.removeEventListener("change", cancelGlide);
    };
  }, [pathname]);

  return null;
}
