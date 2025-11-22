# Data Model: Navigation Bar and Typography System

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)  
**Phase**: 1 - Design & Data Model  
**Date**: November 22, 2025

## Overview

This document defines the data structures, CSS variables, component interfaces, and animation configurations for the typography system and navigation bar.

## 1. Typography Theme Variables

### CSS Custom Properties

**Location**: `src/index.css` (in @theme block)

```css
@theme {
  /* Existing color variables */
  --color-dark: #202020;
  --color-light: #f5f5f5;
  --color-accent: #03b1fb;
  --color-selection: #b3d6ff;

  /* NEW: Typography variables */
  --font-family-sans:
    "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-mono:
    ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas,
    "DejaVu Sans Mono", monospace;
}
```

### Application

```css
/* Apply default font to body */
body {
  font-family: var(--font-family-sans);
}

/* Monospace font for code elements (if needed) */
code,
pre,
kbd,
samp {
  font-family: var(--font-family-mono);
}
```

### Usage in Components

**Tailwind CSS Classes** (auto-generated from theme):

- `font-sans` → uses `var(--font-family-sans)`
- `font-mono` → uses `var(--font-family-mono)`

**Direct CSS Variable Reference**:

```css
.custom-element {
  font-family: var(--font-family-sans);
}
```

## 2. Navigation Items Data Structure

### MenuItem Interface

```javascript
{
  icon: LucideIcon,        // React component from lucide-react
  label: string,           // Display text (e.g., "Home", "Experience")
  href: string,            // Section anchor (e.g., "#home", "#experience")
  gradient: string,        // CSS radial-gradient for glow effect
  iconColor: string        // Tailwind CSS class (e.g., "text-blue-500")
}
```

### Navigation Items Array

**Location**: `src/components/Navbar.jsx` (const navItems)

```javascript
import {
  Home,
  Briefcase,
  GraduationCap,
  FolderGit2,
  BookOpen,
  Users,
} from "lucide-react";

const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "#home",
    gradient:
      "radial-gradient(circle, rgba(3,177,251,0.15) 0%, rgba(2,141,200,0.06) 50%, rgba(1,106,150,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: Briefcase,
    label: "Experience",
    href: "#experience",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: GraduationCap,
    label: "Education",
    href: "#education",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: FolderGit2,
    label: "Portfolio",
    href: "#portfolio",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: BookOpen,
    label: "Publications",
    href: "#publications",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
  {
    icon: Users,
    label: "References",
    href: "#references",
    gradient:
      "radial-gradient(circle, rgba(234,179,8,0.15) 0%, rgba(202,138,4,0.06) 50%, rgba(161,98,7,0) 100%)",
    iconColor: "text-yellow-500",
  },
];
```

**Rationale**:

- **Icons**: Semantic representation of each section
- **Gradients**: Subtle color-matched glows for each section
- **iconColor**: Tailwind classes for consistency with design system

## 3. Animation Variants (Framer Motion)

### Motion Animation Configurations

**Location**: `src/components/ui/glow-menu.jsx`

```javascript
// 3D Flip Animation - Front face
const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

// 3D Flip Animation - Back face
const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

// Radial Glow Effect
const glowVariants = {
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

// Navigation Container Glow
const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Shared Spring Transition
const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

// Mobile Menu Overlay
const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
```

### Animation Performance Targets

- **3D Flip**: 500ms total (spring physics)
- **Glow Scale**: 500ms (spring: stiffness 300, damping 25)
- **Opacity**: 500ms (cubic-bezier easing)
- **Frame Rate**: 60fps (no jank)
- **Mobile Menu**: 300ms open, 200ms close

## 4. Component Interfaces

### Navbar Component

**Location**: `src/components/Navbar.jsx`

```javascript
function Navbar() {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Methods
  const handleNavClick = (href) => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    // Smooth scroll to section
    const sectionId = href.replace("#", "");
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Scroll spy (Intersection Observer)
  useEffect(() => {
    // Track active section based on scroll position
    const sections = navItems.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -50% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-accent/20">
      {/* Desktop: Logo + GlowMenu */}
      {/* Mobile: Logo + Hamburger + Overlay Menu */}
    </nav>
  );
}
```

**Props**: None (self-contained)

**State**:

- `isMenuOpen: boolean` - Mobile menu visibility
- `activeSection: string` - Current active section ID

**Events**:

- `handleNavClick(href: string)` - Navigate to section and close mobile menu

### GlowMenu Component (UI Base)

**Location**: `src/components/ui/glow-menu.jsx`

```javascript
interface GlowMenuProps {
  items: MenuItem[];          // Navigation items array
  activeItem?: string;        // Current active item label
  onItemClick?: (label: string, href: string) => void;  // Click handler
  className?: string;         // Additional Tailwind classes
}

function GlowMenu({ items, activeItem, onItemClick, className }: GlowMenuProps) {
  return (
    <motion.nav
      className={cn(
        "p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40",
        "backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden",
        className
      )}
      initial="initial"
      whileHover="hover"
    >
      {/* Navigation glow overlay */}
      <motion.div variants={navGlowVariants} className="absolute -inset-2 ..." />

      {/* Menu items */}
      <ul className="flex items-center gap-2 relative z-10">
        {items.map((item) => (
          <MenuItem
            key={item.label}
            item={item}
            isActive={item.label === activeItem}
            onClick={() => onItemClick?.(item.label, item.href)}
          />
        ))}
      </ul>
    </motion.nav>
  );
}
```

**Props**:

- `items: MenuItem[]` - Array of navigation items
- `activeItem?: string` - Label of active item (shows persistent glow)
- `onItemClick?: (label: string, href: string) => void` - Click callback
- `className?: string` - Additional styling

## 5. Responsive Breakpoints

### Screen Size Definitions

```javascript
// Tailwind CSS default breakpoints (used in project)
{
  'sm': '640px',   // Small devices
  'md': '768px',   // Medium devices (tablets) - NAVIGATION BREAKPOINT
  'lg': '1024px',  // Large devices (desktops)
  'xl': '1280px',  // Extra large devices
  '2xl': '1536px'  // 2X extra large devices
}
```

### Navigation Behavior by Breakpoint

| Breakpoint        | Navbar Layout              | Menu Display                     | Logo Position            |
| ----------------- | -------------------------- | -------------------------------- | ------------------------ |
| < 768px (mobile)  | Logo + Hamburger           | Hidden, shows on hamburger click | Left                     |
| ≥ 768px (desktop) | Logo + Horizontal GlowMenu | Visible, horizontal layout       | Left, separate from menu |

### CSS Media Query Strategy

```css
/* Mobile: Hide desktop menu, show hamburger */
@media (max-width: 767px) {
  .desktop-menu {
    display: none;
  }
  .mobile-menu-button {
    display: block;
  }
}

/* Desktop: Hide hamburger, show desktop menu */
@media (min-width: 768px) {
  .desktop-menu {
    display: flex;
  }
  .mobile-menu-button {
    display: none;
  }
  .mobile-menu-overlay {
    display: none;
  }
}
```

**Implementation**: Use Tailwind's `md:` prefix for responsive classes.

## 6. Placeholder Sections Structure

### Section Divs

**Location**: `src/App.jsx`

```javascript
function App() {
  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar />

      <main>
        <section
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <Hero />
        </section>

        <section
          id="experience"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <h2 className="text-4xl font-bold">Experience (Coming Soon)</h2>
        </section>

        <section
          id="education"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <h2 className="text-4xl font-bold">Education (Coming Soon)</h2>
        </section>

        <section
          id="portfolio"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <h2 className="text-4xl font-bold">Portfolio (Coming Soon)</h2>
        </section>

        <section
          id="publications"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <h2 className="text-4xl font-bold">Publications (Coming Soon)</h2>
        </section>

        <section
          id="references"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <h2 className="text-4xl font-bold">References (Coming Soon)</h2>
        </section>
      </main>
    </div>
  );
}
```

**Attributes**:

- `id`: Section identifier for anchor links
- `className`: Tailwind classes for layout (min-h-screen, flex, etc.)

### Scroll Offset Consideration

The navbar is fixed at the top (height ~64px). When scrolling to sections, the Intersection Observer `rootMargin` accounts for this offset to activate the correct navigation item.

## Summary

This data model defines:

1. ✅ Typography CSS custom properties (`--font-family-sans`, `--font-family-mono`)
2. ✅ Navigation items structure with icons, gradients, and colors
3. ✅ Framer Motion animation variants for 3D flip and glow effects
4. ✅ Component interfaces (Navbar, GlowMenu)
5. ✅ Responsive breakpoints and behavior
6. ✅ Placeholder section structure

All structures are ready for implementation in Phase 2.
