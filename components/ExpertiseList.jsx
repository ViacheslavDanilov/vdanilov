"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const DESKTOP = "(min-width: 1024px)";

// The active row is the one on the screen's middle line, or under the pointer or focus
export default function ExpertiseList({ items }) {
  const [active, setActive] = useState(0);
  const rows = useRef([]);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    let observer;
    const watch = () => {
      observer?.disconnect();
      if (!desktop.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive(rows.current.indexOf(entry.target));
            }
          }
        },
        { rootMargin: "-45% 0px -45% 0px" },
      );
      rows.current.forEach((row) => observer.observe(row));
    };
    watch();
    desktop.addEventListener("change", watch);
    return () => {
      desktop.removeEventListener("change", watch);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div
        aria-hidden="true"
        data-testid="expertise-picture"
        className="hidden lg:block lg:sticky lg:top-[max(6rem,calc(50svh-9rem))] lg:self-start"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-card">
          {items.map((item, index) => (
            <Image
              key={item.title}
              src={item.image}
              alt=""
              fill
              sizes="40vw"
              quality={85}
              data-active={index === active}
              className="object-cover opacity-0 data-[active=true]:opacity-100 motion-safe:transition-opacity motion-safe:duration-500"
            />
          ))}
        </div>
      </div>

      <ol className="flex flex-col gap-12 lg:gap-16">
        {items.map((item, index) => (
          <li
            key={item.title}
            ref={(node) => {
              rows.current[index] = node;
            }}
            data-active={index === active}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onFocus={() => setActive(index)}
            className="flex flex-col gap-4 lg:border-l-2 lg:border-white/10 lg:pl-6 lg:opacity-75 lg:data-[active=true]:border-accent lg:data-[active=true]:opacity-100 motion-safe:lg:transition-[opacity,border-color] motion-safe:lg:duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-card lg:hidden">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="100vw"
                quality={85}
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <FontAwesomeIcon
                icon={item.icon}
                className="h-3.5 w-3.5"
                style={{
                  width: "0.875rem",
                  height: "0.875rem",
                  display: "inline-block",
                }}
              />
              <span className="text-xs uppercase tracking-wide">
                {item.label}
              </span>
            </div>
            <h3 className="text-lg font-bold text-light">{item.title}</h3>
            <p className="text-sm leading-relaxed text-light/80 text-justify">
              {item.parts.map((part) =>
                part.highlight ? (
                  <span key={part.key} className="font-semibold text-light/90">
                    {part.text}
                  </span>
                ) : (
                  <span key={part.key}>{part.text}</span>
                ),
              )}
            </p>
            {item.link && (
              <Link
                href={item.link.href}
                className="group/link relative after:absolute after:-inset-y-3 after:inset-x-0 focus-visible:after:hidden inline-flex w-fit items-center gap-2 rounded text-sm font-medium text-accent outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-accent"
              >
                {item.link.label}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-3 w-3 motion-safe:transition-transform motion-safe:group-hover/link:translate-x-0.5"
                  style={{
                    width: "0.75rem",
                    height: "0.75rem",
                    display: "inline-block",
                  }}
                />
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
