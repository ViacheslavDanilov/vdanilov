"use client";

import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useCallback, useEffect, useRef } from "react";

/**
 * Animated counter component with spring physics and viewport detection
 * @param {Object} props - Component props
 * @param {number} props.to - Target number to count to
 * @param {number} [props.from=0] - Starting number
 * @param {number} [props.delay=0] - Delay before animation starts (seconds)
 * @param {number} [props.duration=2] - Animation duration (seconds)
 * @param {string} [props.className=""] - Additional CSS classes
 */
export default function CountUp({
  to,
  from = 0,
  delay = 0,
  duration = 2,
  className = "",
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });
  const prefersReducedMotion = useReducedMotion();

  const getDecimalPlaces = (num) => {
    const str = num.toString();

    if (str.includes(".")) {
      const decimals = str.split(".")[1];

      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }

    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest) => {
      const hasDecimals = maxDecimals > 0;

      const options = {
        useGrouping: false,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };

      return Intl.NumberFormat("en-US", options).format(latest);
    },
    [maxDecimals],
  );

  useEffect(() => {
    if (ref.current && !prefersReducedMotion) {
      ref.current.textContent = formatValue(from);
    }
  }, [from, formatValue, prefersReducedMotion]);

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      const timeoutId = setTimeout(() => motionValue.set(to), delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, motionValue, to, delay, prefersReducedMotion]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  // Server HTML shows the final number; the effect above resets it before counting unless motion is reduced
  return (
    <span className={className} ref={ref}>
      {formatValue(to)}
    </span>
  );
}
