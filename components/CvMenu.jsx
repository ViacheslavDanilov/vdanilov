"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { LiquidButton } from "@/components/ui/liquid-button";
import { CV_VERSIONS } from "@/lib/cv";
import { cn } from "@/lib/utils";

export default function CvMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const menuId = useId();

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

  return (
    <div ref={rootRef} className="sm:relative">
      <LiquidButton
        ref={buttonRef}
        ariaLabel="Download CV"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((current) => !current)}
        className="px-3.5 sm:h-14 sm:px-10 bg-accent/15 border-accent/40"
        hoverClassName="bg-accent/10"
        textClassName="text-sm"
      >
        <FontAwesomeIcon icon={faFileArrowDown} className="w-4 h-4" />
        &nbsp;Download CV&nbsp;
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cn(
            "w-3 h-3 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </LiquidButton>

      {open && (
        <ul
          id={menuId}
          className="absolute left-1/2 top-full z-30 mt-2 w-[min(16rem,calc(100vw-3rem))] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-1.5 text-left shadow-card backdrop-blur-xl"
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
