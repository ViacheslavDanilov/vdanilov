# Quickstart Guide: Hero Section Redesign

**Phase 1: Development Guide**  
**Date**: November 26, 2025

## Overview

This guide walks through implementing the hero section redesign. Follow these steps in order to complete the feature.

---

## Prerequisites

- Node.js 18+ installed
- Repository cloned and dependencies installed (`npm install`)
- Branch `005-hero-redesign` checked out
- Familiarity with React, Next.js, and Tailwind CSS

---

## Step 1: Create AnimatedGradientButton Component

### 1.1 Create the Component File

```bash
touch components/ui/animated-gradient-button.jsx
```

### 1.2 Implement the Component

Copy the following code to `components/ui/animated-gradient-button.jsx`:

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

### 1.3 Test the Component

Create a test page or add to an existing page:

```jsx
import { AnimatedGradientButton } from "@/components/ui/animated-gradient-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

<AnimatedGradientButton href="#" gradient="purple">
  <FontAwesomeIcon icon={faFileArrowDown} className="w-5 h-5 mr-2" />
  Download CV
</AnimatedGradientButton>;
```

---

## Step 2: Modify Hero Component

### 2.1 Open Hero Component

```bash
code components/Hero.jsx
```

### 2.2 Update Imports

Add the new button import at the top:

```jsx
import { AnimatedGradientButton } from "@/components/ui/animated-gradient-button";
```

Remove unused imports (if any):

```jsx
// Remove if ShimmerButton is no longer used elsewhere
// import { ShimmerButton } from '@/components/ui/shimmer-button';
```

### 2.3 Remove "Hi there, I am" Text

**Find**:

```jsx
<p className="text-lg md:text-xl text-accent font-medium">Hi there, I am</p>
```

**Delete** this entire `<p>` element.

### 2.4 Remove Contact Links

**Find**:

```jsx
{/* Contact Info */}
<div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 pt-4">
  <a href="mailto:viacheslav.v.danilov@gmail.com" ...>
    <FontAwesomeIcon icon={faEnvelope} ... />
    Email
  </a>
  <a href="https://wa.me/+34634810041" ...>
    <FontAwesomeIcon icon={faPhone} ... />
    WhatsApp
  </a>
  <a href="https://t.me/ballmaske" ...>
    <FontAwesomeIcon icon={faPaperPlane} ... />
    Telegram
  </a>
</div>
```

**Delete** this entire `<div>` section.

### 2.5 Add Tagline

**After** the `<h2>` with FlipWords, **add**:

```jsx
{
  /* Tagline */
}
<p className="text-base md:text-lg text-gray-300 pt-2 max-w-md mx-auto md:mx-0">
  Science-Driven AI. Engineering-Led Execution. Technically Inspired Leadership.
</p>;
```

### 2.6 Replace CTA Buttons

**Find**:

```jsx
{/* CTA Buttons */}
<div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-6">
  <ShimmerButton ...>
    ...Download CV
  </ShimmerButton>
  <ShimmerButton ...>
    ...View my projects
  </ShimmerButton>
</div>
```

**Replace** with:

```jsx
{
  /* CTA Button */
}
<div className="flex justify-center md:justify-start pt-6">
  <AnimatedGradientButton
    href="https://drive.google.com/file/d/1jYs54eFCYc367ZKhWjH1Xfry4_sFI7Ir/view?usp=drive_link"
    target="_blank"
    gradient="purple"
    ariaLabel="Download CV"
  >
    <FontAwesomeIcon icon={faFileArrowDown} className="w-5 h-5 mr-2" />
    Download CV
  </AnimatedGradientButton>
</div>;
```

### 2.7 Keep Video Element Unchanged

The video section should remain as-is:

```jsx
{/* Video Content */}
<div className="w-full md:w-1/2 flex justify-center md:justify-end">
  <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl bg-dark">
    <video ...>
      <source src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero.mp4`} ... />
      ...
    </video>
  </div>
</div>
```

---

## Step 3: Add Accessibility Support

### 3.1 Verify Focus Styles

Ensure focus ring is visible in `app/globals.css`:

```css
/* If not already present */
@layer base {
  *:focus-visible {
    @apply outline-none ring-2 ring-accent ring-offset-2 ring-offset-gray-950;
  }
}
```

### 3.2 Add Reduced Motion Support

Add to `app/globals.css`:

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-spin,
  .animate-\[spin_2s_linear_infinite\] {
    animation: none !important;
  }
}
```

---

## Step 4: Test Locally

### 4.1 Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 4.2 Visual Verification Checklist

- [ ] "Hi there, I am" text is removed
- [ ] Email, WhatsApp, Telegram links are removed
- [ ] Tagline displays: "Science-Driven AI. Engineering-Led Execution. Technically Inspired Leadership."
- [ ] Single "Download CV" button is visible
- [ ] Button has animated gradient border (spinning)
- [ ] "View my projects" button is removed
- [ ] Video continues to play and loop
- [ ] Layout is responsive (test at 375px, 768px, 1024px widths)

### 4.3 Interaction Testing

- [ ] Click button → CV opens in new tab
- [ ] Hover button → Gradient intensifies
- [ ] Tab to button (keyboard) → Focus ring appears
- [ ] Press Enter on button → CV opens

### 4.4 Accessibility Testing

**Keyboard Navigation**:

```
Tab → Should focus on button
Enter → Should activate link
```

**Screen Reader** (if available):

```
Use NVDA (Windows) or VoiceOver (Mac)
Verify button is announced as "Download CV, link"
```

**Browser DevTools**:

```
Chrome DevTools → Lighthouse → Run audit
Verify Accessibility score ≥90
```

---

## Step 5: Build and Preview Production

### 5.1 Build for Production

```bash
npm run build
```

Verify no errors.

### 5.2 Preview Production Build

```bash
npm run serve
```

Open http://localhost:3000

Test same checklist as Step 4.2-4.4.

---

## Step 6: Cross-Browser Testing

Test on multiple browsers:

- [ ] **Chrome** (latest): Dev server + production build
- [ ] **Firefox** (latest): Dev server + production build
- [ ] **Safari** (latest): Dev server + production build
- [ ] **Edge** (latest): Dev server + production build

---

## Step 7: Performance Validation

### 7.1 Run Lighthouse Audit

```bash
# In Chrome DevTools
Right-click page → Inspect → Lighthouse tab
Categories: Performance, Accessibility, Best Practices, SEO
Device: Mobile & Desktop
Click "Analyze page load"
```

**Target Scores**:

- Performance: ≥90
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

### 7.2 Check Core Web Vitals

In Lighthouse report, verify:

- **LCP** (Largest Contentful Paint): <2.5s ✅
- **INP** (Interaction to Next Paint): <200ms ✅
- **CLS** (Cumulative Layout Shift): <0.1 ✅

---

## Step 8: Commit Changes

### 8.1 Stage Files

```bash
git add components/Hero.jsx
git add components/ui/animated-gradient-button.jsx
git add app/globals.css  # if modified
```

### 8.2 Commit

```bash
git commit -m "feat: redesign hero section with animated gradient button

- Remove 'Hi there, I am' greeting
- Remove Email, WhatsApp, Telegram contact links
- Add tagline: Science-Driven AI. Engineering-Led Execution. Technically Inspired Leadership.
- Replace two CTA buttons with single 'Download CV' button
- Implement AnimatedGradientButton with spinning conic gradient border
- Maintain accessibility (WCAG 2.1 AA, keyboard nav, reduced motion)
- Maintain responsive design and video element

Refs: #005-hero-redesign"
```

### 8.3 Push to Remote

```bash
git push origin 005-hero-redesign
```

---

## Troubleshooting

### Button gradient not animating

**Cause**: Tailwind arbitrary values not working  
**Solution**: Verify Tailwind config includes arbitrary value support (default in v3+)

### Focus ring not visible

**Cause**: Global CSS overriding focus styles  
**Solution**: Add `!important` to focus-visible styles or check CSS specificity

### Button not accessible via keyboard

**Cause**: Using `<div>` instead of `<a>`  
**Solution**: Ensure using semantic `<a>` element inside AnimatedGradientButton

### Animation causing motion sickness

**Cause**: User has `prefers-reduced-motion` enabled  
**Solution**: Verify CSS media query is present in globals.css

### Gradient colors don't match design

**Cause**: Incorrect hex values in gradients object  
**Solution**: Adjust colors in `animated-gradient-button.jsx`:

```jsx
const gradients = {
  purple:
    "bg-[conic-gradient(from_90deg_at_50%_50%,#YOUR_COLOR_0%,#YOUR_COLOR_50%,#YOUR_COLOR_100%)]",
};
```

---

## Next Steps

After completing this implementation:

1. Create Pull Request to merge `005-hero-redesign` into `main`
2. Request code review
3. Merge after approval
4. Deploy to GitHub Pages
5. Monitor analytics for conversion rate changes

---

## Additional Resources

- [Tailwind CSS Gradients](https://tailwindcss.com/docs/gradient-color-stops)
- [CSS Conic Gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Framer Motion Accessibility](https://www.framer.com/motion/accessibility/)

---

**Estimated Time**: 30-45 minutes for implementation + 15-30 minutes for testing = **1-1.5 hours total**
