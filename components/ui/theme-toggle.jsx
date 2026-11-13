"use client";

import { useEffect, useRef, useState } from "react";
import {
  THEME_KEY,
  applyThemeColor,
  currentTheme,
  systemTheme,
} from "@/lib/theme";

const Sun = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="size-3.5 hidden light:block"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="size-3.5 light:hidden"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

// The thumb position comes from CSS alone, so the first paint is right before any script runs
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const pending = useRef(null);
  const thumb = useRef(null);
  const fading = useRef(0);

  useEffect(() => {
    const sync = () => {
      setIsDark(currentTheme() === "dark");
      applyThemeColor(document.documentElement.dataset.theme ?? null);
    };
    sync();
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onStorage = (event) => {
      if (event.key !== THEME_KEY) return;
      const stored = event.newValue;
      if (stored === "light" || stored === "dark") {
        document.documentElement.dataset.theme = stored;
      } else {
        delete document.documentElement.dataset.theme;
      }
      sync();
    };
    // Client navigation swaps the theme-color tags back to their defaults
    const head = new MutationObserver(() =>
      applyThemeColor(document.documentElement.dataset.theme ?? null),
    );
    head.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["content"],
    });
    media.addEventListener("change", sync);
    window.addEventListener("storage", onStorage);
    return () => {
      head.disconnect();
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const switchTheme = (next) => {
    const root = document.documentElement;
    // One frame without transitions, so every colour changes together
    root.classList.add("theme-switching");
    try {
      if (next === systemTheme()) {
        delete root.dataset.theme;
        localStorage.removeItem(THEME_KEY);
      } else {
        root.dataset.theme = next;
        localStorage.setItem(THEME_KEY, next);
      }
    } catch {
      root.dataset.theme = next;
    }
    applyThemeColor(root.dataset.theme ?? null);
    if (pending.current === next) pending.current = null;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("theme-switching")),
    );
  };

  // A short cross-fade where the browser has view transitions and motion is welcome
  const toggle = () => {
    // A second click before the fade ends flips the theme it asked for, not the one on screen
    const next =
      (pending.current ?? currentTheme()) === "dark" ? "light" : "dark";
    pending.current = next;
    setIsDark(next === "dark");
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      switchTheme(next);
    } else {
      // The thumb slides in its own layer, named only while a fade runs
      thumb.current.style.viewTransitionName = "theme-thumb";
      fading.current += 1;
      const fade = document.startViewTransition(() => switchTheme(next));
      // A second flip skips this fade, which rejects its ready promise
      fade.ready.catch(() => {});
      // During the fade every click lands on the page root: end the fade and pass the click on
      const passOn = (event) => {
        if (event.target !== document.documentElement) return;
        event.preventDefault();
        event.stopPropagation();
        const { clientX, clientY } = event;
        fade.skipTransition();
        fade.finished.then(() =>
          document.elementFromPoint(clientX, clientY)?.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              clientX,
              clientY,
              view: window,
            }),
          ),
        );
      };
      document.addEventListener("click", passOn, true);
      fade.finished
        .finally(() => {
          document.removeEventListener("click", passOn, true);
          fading.current -= 1;
          if (!fading.current) thumb.current.style.viewTransitionName = "";
        })
        .catch(() => {});
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      onClick={toggle}
      className="group/theme flex h-11 w-[3.25rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus"
    >
      <span className="relative block h-7 w-[3.25rem] rounded-full border border-ink/20 bg-ink/10 transition-colors group-hover/theme:bg-ink/20">
        <span
          ref={thumb}
          data-keep-motion
          className="absolute top-px left-px flex size-6 translate-x-6 items-center justify-center rounded-full bg-strong text-page motion-safe:transition-transform motion-safe:duration-200 light:translate-x-0"
        >
          <Sun />
          <Moon />
        </span>
      </span>
    </button>
  );
}
