# Data Model: Hero Section Redesign

**Phase 1: Design & Contracts**  
**Date**: November 26, 2025

## Component Structure

### 1. Hero Component (Modified)

**File**: `components/Hero.jsx`  
**Type**: Client Component (`'use client'`)

#### Current Structure

```jsx
const Hero = () => {
  const roles = ["Tech Lead", "Engineering Manager", "Research Scientist"];

  return (
    <section id="hero">
      {/* Two-column layout: text + video */}
      <div>
        {/* Left: Text content */}
        <div>
          <p>Hi there, I am</p>  {/* ❌ REMOVE */}
          <h1>Viacheslav Danilov, PhD</h1>
          <h2><FlipWords words={roles} /></h2>

          {/* Contact links */}  {/* ❌ REMOVE ALL */}
          <div>
            <a href="mailto:...">Email</a>
            <a href="https://wa.me/...">WhatsApp</a>
            <a href="https://t.me/...">Telegram</a>
          </div>

          {/* CTA Buttons */}
          <div>
            <ShimmerButton onClick={...}>Download CV</ShimmerButton>
            <ShimmerButton onClick={...}>View my projects</ShimmerButton>  {/* ❌ REMOVE */}
          </div>
        </div>

        {/* Right: Video */}
        <div>
          <video>...</video>
        </div>
      </div>
    </section>
  );
};
```

#### New Structure

```jsx
const Hero = () => {
  const roles = ["Tech Lead", "Engineering Manager", "Research Scientist"];

  return (
    <section id="hero" className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Text content */}
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold text-light tracking-tight">
            Viacheslav Danilov, PhD
          </h1>

          <h2 className="text-2xl md:text-3xl text-gray-400 min-h-[2.0em] flex items-center justify-center md:justify-start">
            <FlipWords words={roles} className="text-light" />
          </h2>

          {/* ✅ NEW: Tagline */}
          <p className="text-base md:text-lg text-gray-300 pt-2 max-w-md mx-auto md:mx-0">
            Science-Driven AI. Engineering-Led Execution. Technically Inspired
            Leadership.
          </p>

          {/* ✅ MODIFIED: Single CTA button */}
          <div className="flex justify-center md:justify-start pt-6">
            <AnimatedGradientButton
              href="https://drive.google.com/file/d/1jYs54eFCYc367ZKhWjH1Xfry4_sFI7Ir/view?usp=drive_link"
              target="_blank"
              gradient="purple"
            >
              <FontAwesomeIcon
                icon={faFileArrowDown}
                className="w-5 h-5 mr-2"
              />
              Download CV
            </AnimatedGradientButton>
          </div>
        </div>

        {/* Right: Video (unchanged) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl bg-dark">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

#### Changes Summary

| Element                                   | Action     | Reason                                             |
| ----------------------------------------- | ---------- | -------------------------------------------------- |
| `"Hi there, I am"`                        | ❌ Remove  | FR-004: Cleaner, more professional intro           |
| Contact links (Email, WhatsApp, Telegram) | ❌ Remove  | FR-005: Reduce visual clutter                      |
| Tagline paragraph                         | ✅ Add     | FR-003: Professional positioning statement         |
| "Download CV" button                      | ✅ Replace | FR-006, FR-008: Single CTA with gradient animation |
| "View my projects" button                 | ❌ Remove  | FR-007: Focus on single conversion goal            |
| Video element                             | ✅ Keep    | FR-010: Maintain visual identity                   |
| FlipWords animation                       | ✅ Keep    | FR-002: Dynamic role presentation                  |

---

### 2. AnimatedGradientButton Component (New)

**File**: `components/ui/animated-gradient-button.jsx`  
**Type**: Client Component (uses browser APIs, interactive)

#### Component Interface

```typescript
interface AnimatedGradientButtonProps {
  // Required: Link destination
  href: string;

  // Optional: Link target (_blank, _self, etc.)
  target?: string;

  // Optional: Additional Tailwind classes
  className?: string;

  // Optional: Gradient color scheme
  gradient?: "blue" | "purple" | "pink";

  // Optional: Animation duration (default: "2s")
  duration?: string;

  // Optional: ARIA label (default: derived from children)
  ariaLabel?: string;

  // Button content (text, icons, etc.)
  children: React.ReactNode;
}
```

#### Implementation

```jsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

const gradients = {
  blue: "bg-[conic-gradient(from_90deg_at_50%_50%,#60a5fa_0%,#3b82f6_50%,#60a5fa_100%)]",
  purple:
    "bg-[conic-gradient(from_90deg_at_50%_50%,#e879f9_0%,#a855f7_50%,#e879f9_100%)]",
  pink: "bg-[conic-gradient(from_90deg_at_50%_50%,#fda4af_0%,#f43f5e_50%,#fda4af_100%)]",
};

export const AnimatedGradientButton = React.forwardRef(
  (
    {
      href,
      target = "_blank",
      className,
      gradient = "purple",
      duration = "2s",
      ariaLabel,
      children,
      ...props
    },
    ref,
  ) => {
    const gradientClass = gradients[gradient] || gradients.purple;

    return (
      <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
        {/* Animated gradient border */}
        <span
          className={cn(
            "absolute inset-[-1000%] animate-[spin_2s_linear_infinite]",
            gradientClass,
          )}
          style={{ animationDuration: duration }}
          aria-hidden="true"
        />

        {/* Button background */}
        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950">
          <a
            ref={ref}
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={ariaLabel}
            className={cn(
              "inline-flex rounded-full text-center group items-center justify-center",
              "bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent",
              "dark:from-zinc-300/5 dark:via-purple-400/20",
              "text-gray-900 dark:text-white",
              "border-input border-[1px]",
              "hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent",
              "dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30",
              "transition-all duration-300",
              "py-4 px-10",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-950",
              className,
            )}
            {...props}
          >
            {children}
          </a>
        </div>
      </span>
    );
  },
);

AnimatedGradientButton.displayName = "AnimatedGradientButton";
```

#### Accessibility Features

1. **Keyboard Navigation**: Native `<a>` element is focusable
2. **Focus Indicator**: Visible focus ring (`focus:ring-2 focus:ring-accent`)
3. **ARIA**: Optional `aria-label` prop; `aria-hidden="true"` on decorative gradient
4. **Security**: `rel="noopener noreferrer"` for external links
5. **Screen Readers**: Gradient animation is hidden from assistive tech

#### Responsive Behavior

- **Mobile**: Full-width button (`w-full` applied in parent)
- **Desktop**: Auto-width button centered/aligned
- **Touch**: Large touch target (44x44px minimum via `py-4 px-10`)

---

### 3. CSS Animations

**File**: `app/globals.css`

#### Keyframe Definition (if not using Tailwind's built-in `spin`)

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-spin,
  .animate-\[spin_2s_linear_infinite\] {
    animation: none !important;
  }
}
```

**Note**: Tailwind CSS includes `animate-spin` by default. The arbitrary value `animate-[spin_2s_linear_infinite]` can be used directly without custom CSS.

---

## Data Flow

### Hero Component Data Flow

```
User loads homepage
  └─> Next.js renders page.jsx
      └─> Imports Hero.jsx (Client Component)
          ├─> Renders heading with name
          ├─> Renders FlipWords with roles array
          ├─> Renders tagline (static text)
          ├─> Renders AnimatedGradientButton
          │   ├─> href prop: CV link
          │   ├─> children: Icon + "Download CV" text
          │   └─> Animated gradient border (CSS)
          └─> Renders video element (autoplay, loop)
```

### Button Interaction Flow

```
User clicks button
  └─> Browser follows <a> href
      └─> Opens CV in new tab (_blank)
          └─> Google Drive displays PDF

User hovers button
  └─> CSS hover state activates
      └─> Gradient intensifies (via hover: classes)

User tabs to button (keyboard)
  └─> Focus ring appears
      └─> User presses Enter
          └─> Browser follows href (same as click)
```

---

## Props & State

### Hero Component

**Props**: None (self-contained)

**State**: None (stateless)

**Constants**:

- `roles`: Array of strings for FlipWords animation

### AnimatedGradientButton Component

**Props**: See interface above

**State**: None (stateless)

**Derived Values**:

- `gradientClass`: Selected gradient CSS class based on `gradient` prop
- `animationDuration`: CSS animation-duration style based on `duration` prop

---

## Dependencies

### New Dependencies

None. All features use existing dependencies:

- React (component rendering)
- Tailwind CSS (styling, animations)
- FontAwesome (icon)
- `@/lib/utils` (cn() for className merging)

### Modified Dependencies

None. No version bumps required.

---

## Testing Checklist

### Component Rendering

- [ ] Hero component renders without "Hi there, I am" text
- [ ] Hero component renders without contact links
- [ ] Hero component displays tagline with correct text
- [ ] Hero component displays single button (Download CV)
- [ ] Hero component does NOT display "View my projects" button
- [ ] Video element continues to play and loop

### Button Functionality

- [ ] Button renders with animated gradient border
- [ ] Button link opens CV in new tab
- [ ] Button displays icon and text correctly
- [ ] Button is keyboard accessible (focusable, Enter key works)
- [ ] Button focus indicator is visible

### Responsive Design

- [ ] Layout adapts correctly on mobile (320px)
- [ ] Layout adapts correctly on tablet (768px)
- [ ] Layout adapts correctly on desktop (1024px+)
- [ ] Button touch target is adequate (≥44x44px)

### Accessibility

- [ ] Button passes keyboard navigation test
- [ ] Button passes screen reader test (NVDA/JAWS)
- [ ] Focus indicator has sufficient contrast
- [ ] Animation respects prefers-reduced-motion
- [ ] Color contrast meets WCAG 2.1 AA (≥4.5:1)

### Performance

- [ ] Lighthouse score ≥90 (all categories)
- [ ] Core Web Vitals pass (LCP, INP, CLS)
- [ ] No layout shift on button render
- [ ] Animation runs smoothly (60fps)

### Cross-Browser

- [ ] Chrome 119+ ✅
- [ ] Firefox 122+ ✅
- [ ] Safari 17+ ✅
- [ ] Edge 119+ ✅

---

## Summary

Two components modified/created:

1. **Hero.jsx** (Modified): Remove greeting, contacts, "View projects" button; add tagline; replace button with AnimatedGradientButton
2. **AnimatedGradientButton.jsx** (New): Reusable button with spinning conic gradient border, full accessibility support

No database changes, API modifications, or external dependencies required. Pure UI modification with CSS animations.
