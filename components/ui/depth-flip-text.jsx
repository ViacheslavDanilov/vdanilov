"use client";

import { useEffect, useRef, useState } from "react";

const FLIP_EASE = "power4.inOut";
const CHAR_PERSPECTIVE = 1200;

// Depth Flip Text by Hyperiux (vault.hyperiux.com), ported to JSX without scroll scrubbing
export default function DepthFlipText({
  phrases,
  className,
  holdDuration = 2,
  transitionDuration = 1.1,
  charStagger = 0.02,
}) {
  const [active, setActive] = useState(0);
  const currentRef = useRef(null);
  const nextRef = useRef(null);
  const timeline = useRef(null);
  const hovered = useRef(false);
  const next = (active + 1) % phrases.length;

  useEffect(() => {
    if (phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      await (document.fonts?.ready ?? Promise.resolve());
      const [{ gsap }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
      ]);
      if (cancelled || !currentRef.current || !nextRef.current) return;
      gsap.registerPlugin(SplitText);

      const currentSplit = SplitText.create(currentRef.current, {
        type: "words, chars",
      });
      const nextSplit = SplitText.create(nextRef.current, {
        type: "words, chars",
      });

      // A hinge half a line behind the glyph keeps both faces on their own box at rotation 0
      const faceOffset = currentSplit.chars[0].offsetHeight / 2;
      const face = {
        transformOrigin: `50% 50% ${-faceOffset}px`,
        transformPerspective: CHAR_PERSPECTIVE,
        backfaceVisibility: "hidden",
        force3D: true,
      };
      gsap.set(nextRef.current, { opacity: 1 });
      gsap.set(currentSplit.chars, { ...face, rotationX: 0 });
      gsap.set(nextSplit.chars, { ...face, rotationX: -90 });

      const tl = gsap
        .timeline({
          delay: holdDuration,
          onComplete: () => setActive(next),
        })
        .to(
          currentSplit.chars,
          {
            rotationX: 90,
            duration: transitionDuration,
            ease: FLIP_EASE,
            stagger: charStagger,
          },
          0,
        )
        .to(
          nextSplit.chars,
          {
            rotationX: 0,
            duration: transitionDuration,
            ease: FLIP_EASE,
            stagger: charStagger,
          },
          0,
        );
      if (hovered.current) tl.pause();
      timeline.current = tl;

      cleanup = () => {
        tl.kill();
        timeline.current = null;
        currentSplit.revert();
        nextSplit.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [
    active,
    next,
    phrases.length,
    holdDuration,
    transitionDuration,
    charStagger,
  ]);

  const pause = (paused) => {
    hovered.current = paused;
    // A flip already under way finishes, so it never stops tilted
    if (paused) {
      if (timeline.current?.progress() === 0) timeline.current.pause();
    } else timeline.current?.play();
  };

  return (
    <div
      data-depth-flip
      className={className}
      onMouseEnter={() => pause(true)}
      onMouseLeave={() => pause(false)}
    >
      <span className="sr-only">{phrases.join(", ")}</span>
      <div aria-hidden="true" className="relative motion-reduce:hidden">
        <Phrase
          key={`current-${active}`}
          ref={currentRef}
          text={phrases[active]}
          current
        />
        <Phrase key={`next-${next}`} ref={nextRef} text={phrases[next]} />
      </div>
      <div
        aria-hidden="true"
        className="hidden motion-reduce:block leading-normal"
      >
        {phrases.map((phrase) => (
          <p key={phrase} className="m-0 text-center">
            {phrase}
          </p>
        ))}
      </div>
    </div>
  );
}

const Phrase = ({ ref, text, current = false }) => (
  <p
    ref={ref}
    data-phrase={current ? "current" : "next"}
    className={`m-0 w-full whitespace-nowrap text-center ${current ? "relative" : "absolute inset-0 opacity-0"}`}
  >
    {text}
  </p>
);
