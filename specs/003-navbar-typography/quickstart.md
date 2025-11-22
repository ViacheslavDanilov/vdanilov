# Quickstart: Navigation Bar and Typography System

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)  
**Phase**: 1 - Quickstart Guide  
**Date**: November 22, 2025

## Overview

This guide provides setup instructions and usage examples for the centralized typography system and navigation bar with glow-menu animations.

## Setup Instructions

### Prerequisites

Ensure the following dependencies are installed (already present in this project):

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "motion": "^12.23.24",
    "lucide-react": "^0.554.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0"
  }
}
```

**Note**: `motion` is the successor to `framer-motion` with a compatible API.

### Installation (if starting fresh)

```bash
npm install motion lucide-react clsx tailwind-merge
```

## 1. Typography System Usage

### Setup

Typography variables are defined in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-dark: #202020;
  --color-light: #f5f5f5;
  --color-accent: #03b1fb;

  /* Typography */
  --font-family-sans:
    "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji";
  --font-family-mono: ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
}

body {
  font-family: var(--font-family-sans);
}
```

### Usage in Components

**Option 1: Tailwind Classes** (Recommended)

```jsx
// Sans-serif font (default)
<h1 className="font-sans text-4xl">Welcome</h1>

// Monospace font (for code)
<code className="font-mono">const hello = 'world';</code>
```

**Option 2: Direct CSS Variable**

```jsx
<div style={{ fontFamily: "var(--font-family-sans)" }}>Custom styled text</div>
```

### Changing Fonts Globally

To change the entire site's font, edit `src/index.css`:

```css
@theme {
  /* Change primary font to Georgia */
  --font-family-sans: "Georgia", ui-serif, serif;
}
```

All components will automatically use the new font without code changes.

## 2. Navigation Bar Usage

### Basic Integration

**Step 1**: Import and add Navbar to App.jsx

```jsx
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar />

      <main>
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        <section id="experience" className="min-h-screen">
          {/* Content */}
        </section>

        {/* More sections... */}
      </main>
    </div>
  );
}
```

**Step 2**: Ensure sections have IDs matching navigation hrefs

```jsx
<section id="home">...</section>
<section id="experience">...</section>
<section id="education">...</section>
<section id="portfolio">...</section>
<section id="publications">...</section>
<section id="references">...</section>
```

**Step 3**: The Navbar component handles everything automatically:

- ✅ Desktop horizontal menu with glow effects
- ✅ Mobile hamburger menu
- ✅ Smooth scrolling to sections
- ✅ Active section highlighting
- ✅ Logo integration

## 3. Customizing Navigation Items

### Adding a New Navigation Item

Edit `src/components/Navbar.jsx`:

```jsx
import { Home, Briefcase, /* ... */, Star } from "lucide-react";

const navItems = [
  // ... existing items ...
  {
    icon: Star,
    label: "Testimonials",
    href: "#testimonials",
    gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(107,33,168,0) 100%)",
    iconColor: "text-purple-500"
  }
];
```

**Then add the corresponding section**:

```jsx
<section id="testimonials" className="min-h-screen">
  <h2>Testimonials</h2>
</section>
```

### Changing Icon Colors

Update the `iconColor` property:

```jsx
{
  icon: Home,
  label: "Home",
  href: "#home",
  gradient: "...",
  iconColor: "text-accent"  // Uses theme accent color
}
```

### Customizing Gradients

Adjust the radial gradient definition:

```jsx
{
  gradient: "radial-gradient(circle, rgba(3,177,251,0.2) 0%, rgba(2,141,200,0.1) 50%, rgba(1,106,150,0) 100%)";
  // Increased opacity: 0.15 → 0.2, 0.06 → 0.1 for brighter glow
}
```

## 4. Component API Reference

### Navbar Component

```jsx
<Navbar />
```

**Props**: None (self-contained)

**Features**:

- Fixed positioning at top of viewport
- Automatic active section tracking
- Mobile responsive (hamburger menu < 768px)
- Smooth scroll navigation
- Logo integration

### GlowMenu Component (Base UI)

```jsx
import { GlowMenu } from "@/components/ui/glow-menu";

<GlowMenu
  items={navItems}
  activeItem="Home"
  onItemClick={(label, href) => console.log(`Clicked ${label}`)}
  className="custom-class"
/>;
```

**Props**:

- `items: MenuItem[]` - Array of navigation items (required)
- `activeItem?: string` - Label of active item for persistent glow
- `onItemClick?: (label: string, href: string) => void` - Click handler
- `className?: string` - Additional Tailwind CSS classes

## 5. Animation Customization

### Adjusting Animation Speed

Edit `src/components/ui/glow-menu.jsx`:

```javascript
// Faster flip animation
const sharedTransition = {
  type: "spring",
  stiffness: 150, // Increased from 100
  damping: 25, // Increased from 20
  duration: 0.3, // Decreased from 0.5
};

// Slower glow effect
const glowVariants = {
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.8 }, // Increased from 0.5
      scale: { duration: 0.8, type: "spring", stiffness: 200, damping: 30 },
    },
  },
};
```

### Disabling Animations (Reduced Motion)

Add media query support:

```jsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const itemVariants = prefersReducedMotion
  ? { initial: {}, hover: {} } // No animation
  : {
      initial: { rotateX: 0, opacity: 1 },
      hover: { rotateX: -90, opacity: 0 },
    };
```

## 6. Responsive Behavior

### Breakpoint Behavior

| Screen Size       | Navbar Layout          | Menu Type           | Logo |
| ----------------- | ---------------------- | ------------------- | ---- |
| Mobile (< 768px)  | Logo + Hamburger       | Overlay (vertical)  | Left |
| Desktop (≥ 768px) | Logo + Horizontal Menu | Inline (horizontal) | Left |

### Customizing Breakpoint

Change the breakpoint in Navbar.jsx:

```jsx
// Change from md:flex (768px) to lg:flex (1024px)
<div className="hidden lg:flex items-center">
  <GlowMenu ... />
</div>

<button className="lg:hidden ...">
  {/* Hamburger */}
</button>
```

## 7. Styling Customization

### Navbar Background

Edit Navbar component:

```jsx
<nav className="
  fixed top-0 left-0 right-0 z-50
  bg-dark/95                    // Semi-transparent dark background
  backdrop-blur-sm              // Blur effect
  border-b border-accent/20     // Bottom border
">
```

**Variants**:

- Fully transparent: `bg-transparent`
- Solid background: `bg-dark`
- More blur: `backdrop-blur-md` or `backdrop-blur-lg`
- Different border: `border-b-2 border-light/10`

### Logo Size and Position

```jsx
<img
  src="/content/logo.avif"
  alt="Logo"
  className="h-10 w-10 rounded-full" // Adjust h-10 and w-10
/>
```

### Mobile Menu Styling

```jsx
<div
  className="
  md:hidden                           // Hide on desktop
  bg-dark                             // Background color
  border-t border-accent/20           // Top border
"
>
  <div className="px-6 py-4 space-y-3">
    {" "}
    // Adjust padding/spacing
    {/* Menu items */}
  </div>
</div>
```

## 8. Troubleshooting

### Smooth Scroll Not Working

**Problem**: Clicking navigation items doesn't scroll smoothly.

**Solution**: Ensure sections have correct IDs:

```jsx
// Check IDs match href without '#'
<section id="home">  // Not id="#home"
```

### Active Section Not Highlighting

**Problem**: Navigation items don't show active state.

**Solution**: Verify Intersection Observer threshold and rootMargin:

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    /* ... */
  },
  {
    threshold: 0.5, // 50% of section visible
    rootMargin: "-100px 0px -50% 0px", // Account for navbar height
  },
);
```

### Mobile Menu Not Closing

**Problem**: Menu stays open after clicking a link.

**Solution**: Ensure `handleNavClick` calls `setIsMenuOpen(false)`:

```javascript
const handleNavClick = (href) => {
  setIsMenuOpen(false); // Close menu
  document.getElementById(href.replace("#", ""))?.scrollIntoView({
    behavior: "smooth",
  });
};
```

### Animations Laggy on Mobile

**Problem**: 3D flip animations stutter on mobile devices.

**Solutions**:

1. Reduce animation complexity:

   ```javascript
   const itemVariants = {
     hover: { rotateX: -45, opacity: 0.5 }, // Less rotation
   };
   ```

2. Disable 3D transforms on mobile:
   ```javascript
   const isMobile = window.innerWidth < 768;
   const itemVariants = isMobile
     ? { hover: { opacity: 0.7 } } // Simple opacity
     : { hover: { rotateX: -90, opacity: 0 } }; // Full 3D
   ```

## 9. Examples

### Example 1: Basic Setup

```jsx
// App.jsx
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="min-h-screen">
          Home Content
        </section>
        <section id="about" className="min-h-screen">
          About Content
        </section>
      </main>
    </>
  );
}
```

### Example 2: Custom Navigation Items

```jsx
// Navbar.jsx
const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "#home",
    gradient: "radial-gradient(...)",
    iconColor: "text-blue-500",
  },
  {
    icon: Info,
    label: "About",
    href: "#about",
    gradient: "radial-gradient(...)",
    iconColor: "text-green-500",
  },
];
```

### Example 3: Typography in Component

```jsx
// Using centralized fonts
<div className="font-sans">
  <h1 className="text-4xl font-bold">Heading</h1>
  <p className="text-base">Body text</p>
  <code className="font-mono">Code snippet</code>
</div>
```

## Next Steps

After setup:

1. ✅ Test navigation on desktop (hover effects, clicking)
2. ✅ Test navigation on mobile (hamburger menu, touch events)
3. ✅ Verify smooth scrolling works
4. ✅ Check active section highlighting
5. ✅ Test typography changes by modifying CSS variables

For implementation tasks, see [tasks.md](./tasks.md) (generated by `/speckit.tasks`).
