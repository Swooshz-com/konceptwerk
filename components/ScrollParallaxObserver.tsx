"use client";

import { useEffect } from "react";

const PARALLAX_SELECTOR = "[data-parallax]";
const MAX_OFFSET_PX = 10;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollParallaxObserver() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR));
    if (!targets.length) return;

    let frame: number | undefined;

    function reset() {
      targets.forEach((target) => target.style.setProperty("--parallax-y", "0px"));
    }

    function update() {
      frame = undefined;
      if (reducedMotion.matches) {
        reset();
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter =
          (elementCenter - viewportCenter) / Math.max(window.innerHeight, 1);
        const offset = clamp(distanceFromCenter * -12, -MAX_OFFSET_PX, MAX_OFFSET_PX);
        target.style.setProperty(`--parallax-y`, `${offset.toFixed(2)}px`);
      });
    }

    function requestUpdate() {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    }

    function handleMotionChange() {
      if (reducedMotion.matches) {
        if (frame !== undefined) window.cancelAnimationFrame(frame);
        frame = undefined;
        reset();
        return;
      }

      requestUpdate();
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    reducedMotion.addEventListener("change", handleMotionChange);
    update();

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", handleMotionChange);
      reset();
    };
  }, []);

  return null;
}
