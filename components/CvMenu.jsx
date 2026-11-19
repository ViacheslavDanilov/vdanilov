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
    "flex items-center justify-center outline-none transition-colors duration-300 hover:bg-accent/10 focus-visible:ring-[3px] focus-visible:ring-focus";

  return (
    <div ref={rootRef} className="sm:relative">
      {/* Split button: the left part downloads the default CV, the right part opens the choice */}
      <div className="inline-flex h-12 items-stretch rounded-full border border-accent/40 bg-accent/15 text-sm font-medium text-strong shadow-liquid backdrop-blur-[12px] sm:h-14">
        <a
          href={main.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            segment,
            "gap-2 rounded-l-full pl-2.5 pr-2 sm:pl-8 sm:pr-6",
          )}
        >
          <span className="hidden sm:inline-flex">
            <FontAwesomeIcon icon={faFileArrowDown} className="w-4 h-4" />
          </span>
          Download CV
          <span className="sr-only">
            ({main.label}, {main.pages} pages)
          </span>
        </a>
        <button
          ref={buttonRef}
          type="button"
          aria-label="Choose CV version"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          onClick={() => setOpen((current) => !current)}
          className={cn(
            segment,
            "w-11 rounded-r-full border-l border-accent/40 sm:w-12",
          )}
        >
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
            "absolute left-1/2 z-30 w-[min(16rem,calc(100vw-3rem))] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-1.5 text-left shadow-card backdrop-blur-xl",
            above ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {CV_VERSIONS.map((cv) => (
            <li key={cv.id}>
              <a
                href={cv.url}
                target="_blank"
                rel="noopener noreferrer"
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
