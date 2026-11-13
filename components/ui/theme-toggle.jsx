"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_THEME,
  THEME_KEY,
  applyThemeColor,
  currentTheme,
} from "@/lib/theme";

const Sun = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="size-4 hidden light:block text-[#d97706]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4.2" fill="#fbbf24" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="size-4 light:hidden text-[#2563eb]"
    fill="#93c5fd"
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
    window.addEventListener("storage", onStorage);
    return () => {
      head.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const switchTheme = (next) => {
    const root = document.documentElement;
    // One frame without transitions, so every colour changes together
    root.classList.add("theme-switching");
    try {
      if (next === DEFAULT_THEME) {
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
        const { clientX, clientY, button, ctrlKey, metaKey, shiftKey, altKey } =
          event;
        fade.skipTransition();
        fade.finished.then(() =>
          document.elementFromPoint(clientX, clientY)?.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              clientX,
              clientY,
              button,
              ctrlKey,
              metaKey,
              shiftKey,
              altKey,
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
      className="group/theme flex h-11 w-[3.25rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none"
    >
      <span className="relative block h-7 w-[3.25rem] rounded-full border border-ink/30 bg-gradient-to-br from-[#0e1b36] to-[#1d3566] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] group-focus-visible/theme:outline-2 group-focus-visible/theme:outline-offset-2 group-focus-visible/theme:outline-focus light:border-[#3b8fd9] light:from-[#d3ebff] light:to-[#8ccaff] light:shadow-[inset_0_1px_3px_rgba(0,60,120,0.25)]">
        {/* The same 8% ink layer on hover and 10% on press in both themes */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-ink opacity-0 transition-opacity duration-150 group-hover/theme:opacity-[0.08] group-active/theme:opacity-10 motion-reduce:transition-none"
        />
        <span
          ref={thumb}
          data-keep-motion
          className="absolute top-px left-px flex size-6 translate-x-6 items-center justify-center rounded-full bg-[#e8f1ff] bg-[image:radial-gradient(120%_140%_at_30%_0%,#fff,transparent_60%)] shadow-[inset_0_1px_1px_#fff,0_2px_5px_rgba(0,20,60,0.45)] motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-active/theme:scale-95 light:translate-x-0 light:bg-surface"
        >
          <Sun />
          <Moon />
        </span>
      </span>
    </button>
  );
}
