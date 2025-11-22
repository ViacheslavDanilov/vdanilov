# Research: Navigation Bar and Typography System

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)  
**Phase**: 0 - Research & Analysis  
**Date**: November 22, 2025

## Overview

This document contains research findings for implementing a centralized typography system and a navigation bar based on the 21st.dev glow-menu component with mobile responsiveness.

## 1. 21st.dev Glow-Menu Component Analysis

### Component Structure

**Source**: https://21st.dev/community/components/spoonyvu/glow-menu

**Core Features**:

- 3D flip animation on hover (rotateX: 0° → -90° → 90° → 0°)
- Radial gradient glow effects per menu item
- Framer Motion (Motion) animation library
- Responsive navigation bar with glassmorphism (backdrop-blur)
- Active item state with persistent glow

**Dependencies Identified**:

- `motion` (or `framer-motion`) - Animation library
- `lucide-react` - Icon library
- `next-themes` - Theme management (dark/light mode) - **NOT NEEDED** (we use Tailwind CSS variables)
- `@/lib/utils` - cn() utility function - **ALREADY EXISTS** in our project

### Animation Patterns

**1. 3D Flip Animation** (itemVariants/backVariants):

```javascript
itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};
```

**2. Glow Effect** (glowVariants):

```javascript
glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};
```

**3. Navigation Glow** (navGlowVariants):

```javascript
navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
```

### Adaptations Needed

**For Our Use Case**:

1. **Remove `useTheme` dependency** - Use Tailwind CSS custom properties instead
2. **Add logo integration** - Logo component/image on the left side, separate from menu items
3. **Mobile hamburger menu** - Hide menu items on mobile, show hamburger icon
4. **Mobile menu overlay** - Vertical stacked menu with maintained glow effects
5. **Smooth scroll** - Add onClick handlers for section navigation
6. **Active section tracking** - Implement scroll spy to detect current section

**Decision**: Adapt the glow-menu component rather than use it as-is. Create `src/components/ui/glow-menu.jsx` as base, then build `src/components/Navbar.jsx` wrapper with our specific requirements.

## 2. Typography Best Practices (Tailwind CSS 4.x)

### Centralized Font System

**Tailwind CSS 4.x @theme Directive**:

```css
@import "tailwindcss";

@theme {
  /* Colors (already defined) */
  --color-dark: #202020;
  --color-light: #f5f5f5;
  --color-accent: #03b1fb;

  /* Typography - NEW */
  --font-family-sans:
    "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-mono:
    ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas,
    "DejaVu Sans Mono", monospace;
}

/* Apply default font */
body {
  font-family: var(--font-family-sans);
}
```

**Rationale**:

- Matches existing color system pattern
- Single source of truth for fonts
- Easy to override for different font choices
- Supports system font fallbacks
- No external font loading needed (uses system fonts)

**Alternative Considered**: Google Fonts (Inter) - Rejected because:

- Adds network dependency and load time
- Privacy concerns (Google Fonts CDN tracking)
- System fonts provide good quality with zero latency

**Decision**: Use system font stack with Inter as preferred font (if installed locally), fallback to system-ui.

## 3. Mobile Adaptation Strategy

### Hamburger Menu Integration

**Approach**:

- **Desktop (≥768px)**: Horizontal glow-menu with all items visible
- **Mobile (<768px)**: Hamburger icon + logo, expandable overlay menu

**Mobile Menu Design**:

```
┌─────────────────────────┐
│ [Logo]         [☰ Menu] │  ← Fixed navbar
└─────────────────────────┘
        ↓ (tap menu)
┌─────────────────────────┐
│ [Logo]          [✕]     │
├─────────────────────────┤
│                         │
│  [Icon] Home      [glow]│
│  [Icon] Experience      │
│  [Icon] Education       │
│  [Icon] Portfolio       │
│  [Icon] Publications    │
│  [Icon] References      │
│                         │
└─────────────────────────┘
```

**Maintained Visual Elements**:

- Radial gradient glow on tap/hold
- Same icon + label layout
- Backdrop blur background
- Smooth animations

**Implementation Strategy**:

1. Use CSS media queries to hide/show hamburger vs full menu
2. React state for mobile menu open/close
3. Framer Motion AnimatePresence for mobile menu transitions
4. Touch event handlers for glow effect on mobile

**Decision**: Create separate mobile menu component within Navbar that shares the same MenuItem components but renders them vertically in an overlay.

## 4. Icon Selection (Lucide React)

**Navigation Icons** (already installed: lucide-react v0.554.0):

| Section      | Icon Component  | Rationale                                  |
| ------------ | --------------- | ------------------------------------------ |
| Home         | `Home`          | Standard home icon, universally recognized |
| Experience   | `Briefcase`     | Represents professional work/career        |
| Education    | `GraduationCap` | Academic achievement symbol                |
| Portfolio    | `FolderGit2`    | Projects/code repository                   |
| Publications | `BookOpen`      | Research papers/articles                   |
| References   | `Users`         | People/contacts                            |

**Icon Colors** (following 21st.dev pattern):

- Home: `text-blue-500` (matches site accent color)
- Experience: `text-purple-500`
- Education: `text-green-500`
- Portfolio: `text-orange-500`
- Publications: `text-red-500`
- References: `text-yellow-500`

**Gradient Definitions** (for glow effects):

```javascript
{
  Home: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
  Experience: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
  // ... etc
}
```

**Decision**: Use Lucide React icons with color-coded gradients to create visual distinction between sections while maintaining cohesive design.

## 5. Smooth Scroll Implementation

### React Smooth Scroll Approaches

**Option A: Native CSS `scroll-behavior: smooth`**:

```css
html {
  scroll-behavior: smooth;
}
```

- Pros: Simple, no JavaScript needed
- Cons: Limited control, no callbacks, not supported in Safari (fully)

**Option B: JavaScript scrollIntoView with behavior**:

```javascript
const scrollToSection = (sectionId) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
```

- Pros: Good browser support, native API
- Cons: No precise control over duration/easing

**Option C: React-scroll library**:

- Pros: Full control, offset support, callbacks
- Cons: Additional dependency

**Option D: Motion scroll utilities**:

```javascript
import { scroll } from "motion";

scroll(elementOrSelector, {
  offset: ["start start", "end start"],
  target: document.getElementById(targetId),
});
```

- Pros: Integrates with existing Motion library, smooth animations
- Cons: Requires learning Motion scroll API

**Decision**: Use **Option B** (native scrollIntoView) for simplicity and zero additional dependencies. Can enhance with Motion later if needed.

### Placeholder Sections

Add section divs in App.jsx or index.html:

```html
<div id="home">...</div>
<div id="experience">...</div>
<div id="education">...</div>
<div id="portfolio">...</div>
<div id="publications">...</div>
<div id="references">...</div>
```

Navigation hrefs will be: `#home`, `#experience`, etc.

## 6. Active Section Tracking (Scroll Spy)

### Implementation Approach

**Use Intersection Observer API**:

```javascript
useEffect(() => {
  const sections = document.querySelectorAll('[id^="section-"]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.5 }, // 50% of section visible
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, []);
```

**Alternative**: Manual scroll event listener - Rejected due to performance concerns (requires throttling).

**Decision**: Implement Intersection Observer-based scroll spy in Navbar component to track active section and update glow state.

## Summary of Decisions

| Topic                    | Decision                                         | Rationale                                              |
| ------------------------ | ------------------------------------------------ | ------------------------------------------------------ |
| **Glow-Menu Adaptation** | Adapt 21st.dev component, not use as-is          | Need logo integration and mobile responsiveness        |
| **Typography System**    | CSS custom properties in @theme block            | Matches existing color pattern, centralized control    |
| **Font Choice**          | System font stack (Inter preferred)              | Zero latency, no privacy concerns, good quality        |
| **Mobile Menu**          | Hamburger + overlay with maintained glow effects | Responsive while preserving premium visual experience  |
| **Icons**                | Lucide React with color-coded gradients          | Already installed, good variety, matches design system |
| **Smooth Scroll**        | Native scrollIntoView API                        | Simple, no dependencies, good browser support          |
| **Active Section**       | Intersection Observer API                        | Performance-friendly, standard web API                 |

## Next Steps

Proceed to **Phase 1** to define:

1. Typography CSS custom properties structure (data-model.md)
2. Navigation items data model with icons and gradients (data-model.md)
3. Component contracts and usage examples (quickstart.md)
