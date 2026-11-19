"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { CV_VERSIONS } from "@/lib/cv";
import { cn } from "@/lib/utils";

export default function CvMenu() {
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = useId();

  useLayoutEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const anchor = menu.offsetParent.getBoundingClientRect();
    const room = menu.offsetHeight + 8;
    setAbove(anchor.bottom + room > window.innerHeight && anchor.top >= room);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const outside = (event) => !rootRef.current?.contains(event.target);
    const onPointerDown = (event) => outside(event) && setOpen(false);
    // Safari moves focus to <main> on a click in the menu
    const onFocusIn = (event) =>
      outside(event) &&
      !event.target.contains(rootRef.current) &&
      setOpen(false);
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const [main] = CV_VERSIONS;
  const segment =
    "group/segment relative isolate flex cursor-pointer items-center justify-center outline-none focus-visible:ring-[3px] focus-visible:ring-focus";
  const hoverLayer = (
    <span
      aria-hidden="true"
      data-slot="button-hover"
      className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-accent/10 opacity-0 transition-opacity duration-300 group-hover/segment:opacity-100 group-focus-visible/segment:opacity-100"
    />
  );

  return (
    <div ref={rootRef} className="sm:relative">
      {/* Split button: the link opens the Industry CV, the chevron opens the menu */}
      <div className="inline-flex h-12 items-stretch rounded-full border border-accent/40 bg-accent/15 text-sm font-medium text-strong shadow-liquid backdrop-blur-[12px] transition-transform duration-300 motion-safe:has-[:active]:scale-[0.975]">
        <a
          href={main.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className={cn(
            segment,
            "gap-2 rounded-l-full pl-3 pr-2.5 sm:pl-8 sm:pr-6",
          )}
        >
          {hoverLayer}
          <span className="hidden sm:inline-flex">
            <FontAwesomeIcon icon={faFileArrowDown} className="w-4 h-4" />
          </span>
          Download CV
          <span className="sr-only">
            ({main.label}, {main.pages} pages)
          </span>
        </a>
        <span aria-hidden="true" className="my-3 w-px bg-ink/20" />
        <button
          ref={buttonRef}
          type="button"
          aria-label="Choose CV version"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          onClick={() => setOpen((current) => !current)}
          className={cn(segment, "w-11 rounded-r-full")}
        >
          {hoverLayer}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={cn(
              "w-3 h-3 motion-safe:transition-transform motion-safe:duration-300",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          className={cn(
            "absolute left-1/2 z-[60] w-[min(16rem,calc(100vw-3rem))] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-1.5 text-left shadow-card backdrop-blur-xl",
            above ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {CV_VERSIONS.map((cv) => (
            <li key={cv.id}>
              <a
                href={cv.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  // Close after the click, so the link is still in the page when it opens
                  setTimeout(() => {
                    setOpen(false);
                    buttonRef.current?.focus();
                  })
                }
                className="flex min-h-14 flex-col justify-center rounded-xl px-4 outline-none transition-colors hover:bg-ink/5 focus-visible:ring-[3px] focus-visible:ring-focus"
              >
                <span className="text-sm font-medium text-strong">
                  {cv.label}
                </span>
                <span className="text-xs text-muted">{cv.pages} pages</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
