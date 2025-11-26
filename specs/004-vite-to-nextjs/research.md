# Research: Vite + React Router to Next.js 15 App Router Migration

**Branch**: `004-vite-to-nextjs` | **Date**: November 26, 2025 | **Spec**: [spec.md](./spec.md)

This document compiles comprehensive research findings for migrating from Vite + React Router to Next.js 15 App Router with static site generation for GitHub Pages deployment.

---

## Table of Contents

1. [Next.js 15 + React 19 Compatibility](#1-nextjs-15--react-19-compatibility)
2. [Static Export for GitHub Pages](#2-static-export-for-github-pages)
3. [Client vs Server Components](#3-client-vs-server-components)
4. [React Router Migration](#4-react-router-migration)
5. [Tailwind CSS v4 with Next.js](#5-tailwind-css-v4-with-nextjs)
6. [Asset Reference Migration](#6-asset-reference-migration)
7. [Font Optimization](#7-font-optimization)
8. [Image/Video Optimization](#8-imagevideo-optimization)

---

## 1. Next.js 15 + React 19 Compatibility

### Decision

✅ **Next.js 15 is fully compatible with React 19** - no special configuration needed.

### Rationale

- Next.js 15 was designed to work with React 19 and its new features
- The project's current dependencies already use React 19.2.0, which aligns perfectly with Next.js 15.1.8
- React Server Components in Next.js 15 leverage React 19's architecture improvements
- No breaking changes or incompatibility issues documented between these versions

### Alternatives Considered

- **Wait for older React version support**: Not necessary as React 19 is stable and recommended
- **Use Next.js 14**: Would miss performance improvements and modern features

### Implementation Notes

**Current Dependencies (package.json):**

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

**Target Dependencies:**

```json
{
  "next": "^15.1.8",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

**No Compatibility Issues:**

- Server Components work out-of-the-box with React 19
- Framer Motion (`motion` library v12.23.24) is compatible with React 19
- All React hooks (useState, useEffect, useCallback) work without modification
- No migration guides required for React 18 → 19 concerns

**Key Benefits:**

- Next.js 15 includes React 19 optimizations for faster hydration
- Improved Server Component streaming and suspense
- Better performance for transitions and state updates
- Full support for the new `ref` as prop pattern (no need for forwardRef in React 19)

---

## 2. Static Export for GitHub Pages

### Decision

✅ **Use `output: 'export'` in next.config.js with `basePath` configuration** for static site generation compatible with GitHub Pages.

### Rationale

- Static export generates a fully static site that can be hosted on GitHub Pages
- `basePath` ensures all asset paths and links work correctly under `/vdanilov/` subdirectory
- No server-side APIs or dynamic routes needed for this portfolio site
- Maintains fast load times and SEO benefits of SSG

### Alternatives Considered

1. **Server-Side Rendering (SSR)**: Requires Node.js hosting (not available on GitHub Pages)
2. **Client-Only Rendering**: Loses SEO and initial load performance benefits
3. **Custom GitHub Actions with Node server**: Overly complex for static portfolio site

### Implementation Notes

**Next.js Configuration (next.config.js):**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static export
  basePath: process.env.NODE_ENV === "production" ? "/vdanilov" : "",
  images: {
    unoptimized: true, // Required for static export (no Image Optimization API)
  },
  trailingSlash: true, // Optional: ensures paths like /about → /about/
};

module.exports = nextConfig;
```

**Environment Variables (.env.local for development):**

```bash
NODE_ENV=development
```

**Build Commands (package.json):**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build"
  }
}
```

**Output Directory:**

- Build output: `.next/` (internal)
- Static export: `out/` (deploy this to GitHub Pages)

**GitHub Pages Deployment:**

1. Build: `npm run build` (generates `out/` folder)
2. Deploy `out/` folder to GitHub Pages
3. Configure GitHub Pages to serve from `gh-pages` branch or `docs/` folder
4. Site will be available at `https://viacheslavdanilov.github.io/vdanilov/`

**Key Constraints:**

- ❌ No Server Components with dynamic data fetching (API routes, getServerSideProps)
- ✅ Server Components work for build-time rendering (static HTML generation)
- ❌ No Next.js Image Optimization API (must use `unoptimized: true`)
- ✅ All pages pre-rendered at build time
- ✅ Client-side routing works via JavaScript after initial page load

**Asset Path Handling:**

```javascript
// In components, use basePath-aware paths
import { usePathname } from 'next/navigation'

// Public assets automatically get basePath prefix
<img src="/logo.png" /> // → /vdanilov/logo.png in production

// Video sources work the same way
<video src="/hero.mp4" /> // → /vdanilov/hero.mp4 in production
```

**Testing Locally with basePath:**

```bash
# Simulate production basePath in development
NODE_ENV=production npm run dev
```

**Known Issues & Solutions:**

- **404 on page refresh**: Fixed by configuring GitHub Pages to serve `404.html` as fallback (Next.js generates this)
- **Asset 404s**: Resolved by using `basePath` in config and relative paths in public folder
- **Trailing slash mismatches**: Use `trailingSlash: true` for consistent behavior

---

## 3. Client vs Server Components

### Decision

✅ **Default to Server Components; explicitly use `'use client'` directive for interactive components** following Next.js App Router best practices.

### Rationale

- Server Components reduce JavaScript bundle size (rendered at build time for static export)
- Client Components are required for interactivity (state, effects, event handlers, browser APIs)
- Clear separation improves performance and follows Next.js architecture principles
- Aligns with Build Constitution Principle II (Server-First with Client Boundaries)

### When to Use `'use client'` Directive

#### ✅ REQUIRED for Client Components:

1. **React Hooks:**
   - `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`
   - `useReducer`, `useContext`, `useLayoutEffect`

2. **Event Handlers:**
   - `onClick`, `onChange`, `onSubmit`, `onMouseEnter`, etc.
   - Any user interaction that triggers state changes

3. **Browser APIs:**
   - `window`, `document`, `localStorage`, `sessionStorage`
   - `navigator`, `location`, `IntersectionObserver`, etc.

4. **Animation Libraries:**
   - **Framer Motion / Motion library** (uses state and effects internally)
   - Any animation that responds to user interaction or component state

5. **Next.js Navigation Hooks (from `next/navigation`):**
   - `useRouter`, `usePathname`, `useSearchParams`
   - These are client-only hooks

#### ❌ NOT NEEDED for Server Components:

- Static content rendering
- Build-time data fetching (`async` functions in components)
- Component composition and layout
- Props passing to Client Components

### Implementation Patterns

**Pattern 1: Framer Motion Components (Interactive Animations)**

```jsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function AnimatedComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Content
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Pattern 2: Components with useState/useEffect**

```jsx
"use client";

import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**Pattern 3: Components with Browser APIs**

```jsx
"use client";

import { useEffect, useState } from "react";

export function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Browser API access (window) only in useEffect
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      Window: {size.width} x {size.height}
    </div>
  );
}
```

**Pattern 4: Components with Next.js Navigation Hooks**

```jsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function NavigationComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <button onClick={() => router.push("/about")}>Current: {pathname}</button>
  );
}
```

**Pattern 5: Nesting Client Components in Server Components**

```jsx
// app/page.jsx (Server Component - no directive needed)
import ClientCounter from "@/components/ClientCounter";

export default function Page() {
  return (
    <main>
      <h1>Server-rendered heading</h1>
      {/* Client Component nested in Server Component */}
      <ClientCounter />
    </main>
  );
}
```

**Pattern 6: Server Component with Static Content**

```jsx
// No 'use client' needed - this is a Server Component by default
export default function StaticPage() {
  return (
    <main>
      <h1>About Me</h1>
      <p>Static content rendered at build time</p>
    </main>
  );
}
```

### Component Audit for This Project

**MUST USE `'use client'` (Interactive Components):**

- ✅ `components/Navbar.jsx` - uses useState, useEffect, useNavigate, useLocation, Framer Motion
- ✅ `components/Hero.jsx` - uses window.open, FlipWords component with animations
- ✅ `components/ui/flip-words.jsx` - uses useState, useEffect, useCallback, Framer Motion
- ✅ `components/ui/glow-menu.jsx` - likely uses state/events (needs verification)
- ✅ `components/ui/menu-toggle-icon.jsx` - likely animated icon (needs verification)
- ✅ `components/ui/shimmer-button.jsx` - uses onClick events

**CAN REMAIN Server Components (Static Content):**

- ✅ `app/layout.jsx` - wraps children, imports Navbar (which is Client Component)
- ✅ `app/page.jsx` - Home page content (unless interactive)
- ✅ `app/experience/page.jsx` - Static content
- ✅ `app/education/page.jsx` - Static content
- ✅ `app/portfolio/page.jsx` - Static content (unless interactive filters)
- ✅ `app/publications/page.jsx` - Static content
- ✅ `app/references/page.jsx` - Static content

### Best Practices

1. **Push `'use client'` as deep as possible** - only mark components that truly need client features
2. **Compose Server + Client** - wrap Client Components inside Server Components for optimal performance
3. **Avoid unnecessary client boundaries** - don't add `'use client'` to parent components if only child needs it
4. **Use dynamic imports for heavy Client Components** - lazy load when appropriate
5. **Test in production build** - some issues only appear in static export

### Motion Library Optimization for Next.js

**Import Strategy:**

```javascript
// ✅ Recommended: Use motion/react-client for smaller bundle in Client Components
"use client";
import * as motion from "motion/react-client";

// ❌ Avoid: Larger bundle size
import { motion } from "motion/react";
```

**Server-Side Rendering Considerations:**

```javascript
// For animations that should not run on initial load
<motion.div initial={false} animate={{ x: 100 }} />
// Server will output `translateX(100px)` directly
```

---

## 4. React Router Migration

### Decision

✅ **Migrate from React Router to Next.js App Router file-based routing** with Link component and navigation hooks.

### Rationale

- App Router is mandatory per Next.js architecture
- File-based routing eliminates need for route configuration
- Built-in client-side navigation with prefetching
- Server Components compatible with static export

### Migration Mapping

#### Current (React Router):

```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
        </Routes>
      </main>
    </Router>
  );
}
```

#### Target (Next.js App Router):

```
app/
├── layout.jsx          ← Wraps all pages (replaces BrowserRouter)
├── page.jsx            ← Home page (replaces <Route path="/" />)
├── experience/
│   └── page.jsx        ← Experience page
├── education/
│   └── page.jsx        ← Education page
```

```jsx
// app/layout.jsx (Server Component)
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
```

### React Router → Next.js Hook Migration

| React Router              | Next.js Equivalent                         | Usage                    |
| ------------------------- | ------------------------------------------ | ------------------------ |
| `useNavigate()`           | `useRouter()` from `next/navigation`       | Programmatic navigation  |
| `useLocation()`           | `usePathname()` from `next/navigation`     | Get current path         |
| `useSearchParams()`       | `useSearchParams()` from `next/navigation` | Read query params        |
| `useParams()`             | `useParams()` from `next/navigation`       | Get dynamic route params |
| `<Link to="/path">`       | `<Link href="/path">` from `next/link`     | Declarative navigation   |
| `<Navigate to="/path" />` | `redirect('/path')` from `next/navigation` | Server-side redirects    |

### Code Migration Examples

**Example 1: useNavigate → useRouter**

```jsx
// Before (React Router)
import { useNavigate } from "react-router-dom";

function Component() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about");
  };
}

// After (Next.js)
("use client");
import { useRouter } from "next/navigation";

function Component() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about");
  };
}
```

**Example 2: useLocation → usePathname**

```jsx
// Before (React Router)
import { useLocation } from "react-router-dom";

function Component() {
  const location = useLocation();
  const isActive = location.pathname === "/about";
}

// After (Next.js)
("use client");
import { usePathname } from "next/navigation";

function Component() {
  const pathname = usePathname();
  const isActive = pathname === "/about";
}
```

**Example 3: Link Component**

```jsx
// Before (React Router)
import { Link } from "react-router-dom";

<Link to="/about">About</Link>;

// After (Next.js)
import Link from "next/link";

<Link href="/about">About</Link>;
```

**Example 4: Tracking Route Changes**

```jsx
// Before (React Router)
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Component() {
  const location = useLocation();

  useEffect(() => {
    console.log("Route changed:", location.pathname);
  }, [location]);
}

// After (Next.js)
("use client");
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Component() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log("Route changed:", url);
  }, [pathname, searchParams]);
}
```

### Navbar.jsx Specific Migration

**Current Code Analysis:**

```jsx
// Uses React Router hooks
import { useNavigate, useLocation } from "react-router-dom";

const navigate = useNavigate();
const location = useLocation();

// Navigation handler
const handleNavClick = (label, href) => {
  navigate(href); // ← Needs migration
};

// Active section tracking
useEffect(() => {
  const activeItem = navItems.find((item) => item.href === location.pathname);
  if (activeItem) {
    setActiveSection(activeItem.label);
  }
}, [location.pathname]); // ← Needs migration
```

**Migrated Code:**

```jsx
"use client"; // ← Add directive

import { useRouter, usePathname } from "next/navigation"; // ← Update import
import Link from "next/link"; // ← Add for declarative links

const router = useRouter();
const pathname = usePathname();

// Navigation handler
const handleNavClick = (label, href) => {
  router.push(href); // ← Updated method
  setIsMenuOpen(false);
};

// Active section tracking
useEffect(() => {
  const activeItem = navItems.find((item) => item.href === pathname);
  if (activeItem) {
    setActiveSection(activeItem.label);
  }
}, [pathname]); // ← Updated dependency
```

### Key Differences

1. **No basename prop needed** - handled by `basePath` in next.config.js
2. **All navigation hooks require `'use client'`** - they only work in Client Components
3. **`router.push()` vs `navigate()`** - similar API, slightly different method names
4. **`pathname` vs `location.pathname`** - simpler hook in Next.js
5. **Prefetching is automatic** - Next.js Link components prefetch on hover by default

### Best Practices

1. **Use Link component for navigation** - better performance with prefetching
2. **Use router.push() for programmatic navigation** - form submissions, callbacks
3. **Wrap useSearchParams in Suspense** - required for static exports in some cases
4. **Use redirect() for server-side redirects** - in Server Components or Server Actions

---

## 5. Tailwind CSS v4 with Next.js

### Decision

✅ **Tailwind CSS v4 is fully compatible with Next.js using PostCSS configuration** - minimal changes required.

### Rationale

- Current project already uses Tailwind CSS v4 (v4.1.17) with PostCSS
- Next.js has built-in PostCSS support
- Configuration is straightforward and well-documented
- No breaking changes in migration from Vite to Next.js

### Current Configuration (Vite):

```javascript
// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

```css
/* src/index.css */
@import url("https://fonts.googleapis.com/css2?family=Poppins...");
@import "tailwindcss";

@theme {
  --color-dark: #202020;
  --color-light: #f5f5f5;
  --color-accent: #03b1fb;
  /* ... */
}
```

### Target Configuration (Next.js):

**1. PostCSS Configuration (postcss.config.mjs):**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {}, // Optional but recommended
  },
};

export default config;
```

**2. Global Styles (app/globals.css):**

```css
@import "tailwindcss";

@theme {
  --color-dark: #202020;
  --color-light: #f5f5f5;
  --color-accent: #03b1fb;
  --color-selection: #b3d6ff;

  /* Typography System */
  --font-family-sans: var(--font-poppins), system-ui, -apple-system, ...;
  --font-family-mono: ui-monospace, SFMono-Regular, ...;
}

/* Apply centralized typography */
body {
  font-family: var(--font-family-sans);
}

/* Shimmer Button Keyframes */
@keyframes shimmer-slide {
  to {
    translate: calc(100cqw - 100%) 0;
  }
}

@keyframes spin-around {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animation Classes */
@layer utilities {
  .animate-shimmer-slide {
    animation: shimmer-slide var(--speed, 5s) ease-in-out infinite alternate;
  }
  .animate-spin-around {
    animation: spin-around calc(var(--speed, 5s) * 2) infinite linear;
  }
}
```

**3. Import in Root Layout:**

```jsx
// app/layout.jsx
import "./globals.css"; // ← Import global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Key Changes from Vite

1. **No tailwind.config.js file** - Tailwind v4 uses CSS-first configuration via `@theme` directive
2. **PostCSS config remains the same** - just rename to `.mjs` extension if needed
3. **@import "tailwindcss"** replaces individual layer imports
4. **Custom theme in CSS** - use `@theme` directive instead of JS config
5. **Google Fonts import moves to next/font** - see Font Optimization section

### Tailwind CSS v4 Features

**Automatic Features:**

- ✅ CSS-first configuration via `@theme`
- ✅ Native cascade layers support
- ✅ Wide-gamut colors (oklch, lch, etc.)
- ✅ Container queries (`@container`)
- ✅ `@starting-style` for enter animations
- ✅ Popover utilities

**Migration Notes:**

- All existing Tailwind v4 classes work without changes
- Custom utilities and animations preserved
- Mobile-first responsive design maintained
- Dark mode support via `dark:` prefix works as before

### Dependencies

**Required Packages:**

```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.17",
    "tailwindcss": "^4.1.17",
    "postcss": "^8.5.6",
    "autoprefixer": "^10.4.22"
  }
}
```

**Next.js Built-in PostCSS:**

- Next.js includes PostCSS by default
- No additional configuration needed for PostCSS loader
- Automatically processes CSS in `app/` directory

### Validation

**Test Tailwind is Working:**

```jsx
// app/page.jsx
export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline text-accent">
      Hello Tailwind!
    </h1>
  );
}
```

**Build Output:**

- Tailwind classes should compile to CSS in production build
- Unused classes are automatically purged
- Custom theme variables should be available globally

---

## 6. Asset Reference Migration

### Decision

✅ **Use `basePath`-aware paths for public assets** - Next.js automatically handles base path prefixing.

### Rationale

- Next.js automatically prepends `basePath` to all assets in `/public` folder
- No need for `import.meta.env.BASE_URL` equivalents
- Simpler and more reliable than manual path construction
- Works correctly in both development and production

### Migration Patterns

#### Pattern 1: Static Images

```jsx
// Before (Vite)
<img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" />

// After (Next.js)
<img src="/logo.png" alt="Logo" />
// Automatically becomes /vdanilov/logo.png in production
```

#### Pattern 2: Video Sources

```jsx
// Before (Vite)
<video>
  <source src={`${import.meta.env.BASE_URL}hero.mp4`} type="video/mp4" />
</video>

// After (Next.js)
<video>
  <source src="/hero.mp4" type="video/mp4" />
</video>
// Automatically becomes /vdanilov/hero.mp4 in production
```

#### Pattern 3: Background Images in CSS

```css
/* Before (Vite) - would need CSS variable */
.hero {
  background-image: url("/hero.jpg");
}

/* After (Next.js) - works the same */
.hero {
  background-image: url("/hero.jpg");
}
/* Automatically becomes url('/vdanilov/hero.jpg') in production */
```

#### Pattern 4: Dynamic Asset Paths

```jsx
// Before (Vite)
const getAssetUrl = (filename) => `${import.meta.env.BASE_URL}${filename}`

// After (Next.js) - not needed!
// Just use the path directly
<img src="/assets/photo.jpg" alt="Photo" />
```

### How Next.js Handles basePath

**Next.js Configuration:**

```javascript
// next.config.js
module.exports = {
  basePath: process.env.NODE_ENV === "production" ? "/vdanilov" : "",
};
```

**Automatic Transformations:**

- `/logo.png` → `/vdanilov/logo.png` (production)
- `/logo.png` → `/logo.png` (development)
- Works for: `<img>`, `<video>`, `<audio>`, CSS `url()`, etc.

**Link Component:**

```jsx
import Link from "next/link";

// Automatically includes basePath
<Link href="/about">About</Link>;
// Renders: <a href="/vdanilov/about">About</a> in production
```

**Router Navigation:**

```jsx
"use client";
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/contact"); // Automatically becomes /vdanilov/contact
```

### Component Migration Examples

**Hero.jsx Migration:**

```jsx
// Before (Vite)
<video>
  <source
    src={`${import.meta.env.BASE_URL}hero.mp4`}
    type="video/mp4"
  />
</video>

// After (Next.js)
<video>
  <source src="/hero.mp4" type="video/mp4" />
</video>
```

**Navbar.jsx Migration:**

```jsx
// Before (Vite)
<img
  src={`${import.meta.env.BASE_URL}logo.png`}
  alt="Logo"
/>

// After (Next.js)
<img src="/logo.png" alt="Logo" />
```

### Environment Variables

**Vite:**

```javascript
import.meta.env.BASE_URL; // /vdanilov/
import.meta.env.MODE; // development | production
```

**Next.js:**

```javascript
process.env.NODE_ENV; // development | production
// No need for BASE_URL - handled by basePath config
```

**For public env vars in Next.js:**

```javascript
// Use NEXT_PUBLIC_ prefix for client-side access
process.env.NEXT_PUBLIC_API_URL;
```

### Public Folder Structure

**Before (Vite):**

```
public/
├── hero.mp4
├── logo.png
└── [other assets]
```

**After (Next.js) - Same Structure:**

```
public/
├── hero.mp4
├── logo.png
└── [other assets]
```

**No changes needed!** All assets remain in `/public` and are accessible via `/filename`.

### Testing

**Development:**

```bash
npm run dev
# Assets accessible at: http://localhost:3000/logo.png
```

**Production Build:**

```bash
npm run build
# Assets in output: out/vdanilov/logo.png
```

**Local Production Test:**

```bash
npx serve out
# Test at: http://localhost:3000/vdanilov/
```

---

## 7. Font Optimization

### Decision

✅ **Use `next/font/google` to replace Google Fonts @import** for optimal performance and privacy.

### Rationale

- Eliminates external network request to Google Fonts
- Fonts are self-hosted and optimized at build time
- Zero layout shift with automatic font metrics calculation
- Better privacy (no tracking by Google)
- Improved performance (fonts served from same domain)

### Current Implementation (Vite):

```css
/* src/index.css */
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

@theme {
  --font-family-sans: "Poppins", system-ui, -apple-system, ...;
}

body {
  font-family: var(--font-family-sans);
}
```

### Target Implementation (Next.js):

**Option A: Variable Font (Recommended)**

```jsx
// app/layout.jsx
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
```

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-dark: #202020;
  --color-light: #f5f5f5;
  --color-accent: #03b1fb;

  /* Use next/font variable */
  --font-family-sans: var(--font-poppins), system-ui, -apple-system, ...;
}

body {
  font-family: var(--font-family-sans);
}
```

**Option B: Direct className Application**

```jsx
// app/layout.jsx
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Font Configuration Options

**Required Options:**

- `subsets`: Font subsets to include (e.g., `['latin']`, `['latin', 'cyrillic']`)
- `weight`: Font weights (use `['variable']` for variable fonts, or specific weights for non-variable)

**Optional Options:**

- `style`: Font styles (e.g., `['normal', 'italic']`) - default: `['normal']`
- `display`: Font display strategy - default: `'swap'`
  - `'auto'`: Browser default
  - `'block'`: Block text until font loads
  - `'swap'`: Show fallback immediately, swap when loaded (recommended)
  - `'fallback'`: Brief block, then swap or use fallback
  - `'optional'`: Brief block, skip loading if takes too long
- `variable`: CSS variable name for use with Tailwind CSS
- `preload`: Preload font in `<head>` - default: `true`
- `adjustFontFallback`: Adjust fallback metrics - default: `true`

### Integration with Tailwind CSS

**Using CSS Variable (Recommended for Tailwind):**

```jsx
// app/layout.jsx
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',  // ← Creates CSS variable
})

// Apply to <html> element
<html className={poppins.variable}>
```

```css
/* app/globals.css */
@theme {
  --font-family-sans: var(--font-poppins), system-ui, ...;
}
```

Now Tailwind's `font-sans` utility uses Poppins:

```jsx
<h1 className="font-sans">Uses Poppins</h1>
```

### Multiple Fonts (if needed)

```jsx
// app/layout.jsx
import { Poppins, Roboto_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

```css
/* app/globals.css */
@theme {
  --font-family-sans: var(--font-poppins), system-ui, ...;
  --font-family-mono: var(--font-roboto-mono), monospace;
}
```

### Performance Benefits

1. **Self-Hosted**: Fonts served from same domain (no external requests)
2. **Optimized Loading**: Fonts preloaded in `<head>` with correct priorities
3. **Zero Layout Shift**: Font metrics calculated at build time
4. **Subset Optimization**: Only load required character sets
5. **Automatic Font Display**: Configured with optimal `display: swap`
6. **Better Caching**: Fonts cached with your application assets

### Migration Checklist

- [ ] Remove Google Fonts @import from CSS
- [ ] Import Poppins from `next/font/google` in `app/layout.jsx`
- [ ] Configure font with all required weights and styles
- [ ] Apply font variable to `<html>` element
- [ ] Update Tailwind theme to use CSS variable
- [ ] Test font loading in development
- [ ] Verify font in production build

---

## 8. Image/Video Optimization

### Decision

✅ **Use Next.js Image component for images; keep `<video>` tags for videos** with `unoptimized` config for static export.

### Rationale

- Next.js Image component provides optimization even with `unoptimized: true`
- Video tags are not supported by Next.js Image component
- Static export requires `unoptimized: true` (no Image Optimization API)
- Still get benefits: automatic width/height, lazy loading, responsive images

### Image Optimization

#### Next.js Image Component

**Installation:**

```bash
# Already included with Next.js
```

**Configuration (next.config.js):**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/vdanilov",
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
```

**Usage Patterns:**

**Pattern 1: Local Static Images**

```jsx
import Image from "next/image";

// Option A: Direct path to public folder
<Image src="/logo.png" alt="Logo" width={100} height={100} />;

// Option B: Import image (gets automatic dimensions)
import logo from "@/public/logo.png";

<Image
  src={logo}
  alt="Logo"
  // width/height automatically inferred
/>;
```

**Pattern 2: Responsive Images**

```jsx
import Image from "next/image";

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  style={{
    width: "100%",
    height: "auto",
  }}
/>;
```

**Pattern 3: Images with Priority (Above-the-Fold)**

```jsx
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // Preloads image (for LCP optimization)
/>;
```

**Pattern 4: Images with Lazy Loading (Default)**

```jsx
import Image from "next/image";

<Image
  src="/below-fold.jpg"
  alt="Content"
  width={800}
  height={600}
  loading="lazy" // Default behavior
/>;
```

### Benefits Even with `unoptimized: true`

✅ **Still Provided:**

- Automatic lazy loading
- Prevents layout shift (with width/height)
- Responsive images via `sizes` prop
- Priority loading for above-the-fold images
- Automatic `srcset` generation
- Modern image formats (if using custom loader)

❌ **Not Available in Static Export:**

- Image Optimization API (automatic WebP/AVIF conversion)
- On-demand image resizing
- Automatic quality optimization

### Video Optimization

**Decision:** ✅ Keep using standard `<video>` HTML elements

**Rationale:**

- Next.js Image component does NOT support video
- Standard `<video>` tags work perfectly with static export
- Browser-native lazy loading available via `loading="lazy"`
- Autoplay/loop work as expected

**Current Implementation (Preserved):**

```jsx
// components/Hero.jsx
<video autoPlay muted loop playsInline className="w-full h-full object-cover">
  <source src="/hero.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

**Optimization Tips:**

1. **Use Compressed Videos:**
   - Compress with Handbrake or FFmpeg
   - Target: 1-2 MB for hero videos
   - Use H.264 codec for best compatibility

2. **Add Lazy Loading:**

   ```jsx
   <video
     autoPlay
     muted
     loop
     playsInline
     loading="lazy" // Browser-native lazy loading
   >
     <source src="/hero.mp4" type="video/mp4" />
   </video>
   ```

3. **Preload Critical Videos:**

   ```jsx
   // In <head> for above-the-fold videos
   <link rel="preload" as="video" href="/hero.mp4" />
   ```

4. **Provide Fallback Poster:**

   ```jsx
   <video
     autoPlay
     muted
     loop
     playsInline
     poster="/hero-poster.jpg" // Fallback image
   >
     <source src="/hero.mp4" type="video/mp4" />
   </video>
   ```

5. **Multiple Formats for Compatibility:**
   ```jsx
   <video autoPlay muted loop playsInline>
     <source src="/hero.webm" type="video/webm" />
     <source src="/hero.mp4" type="video/mp4" />
     Your browser does not support the video tag.
   </video>
   ```

### Migration Strategy

**Phase 1: Keep Current Implementation**

- ✅ Keep `<video>` tags as-is
- ✅ Keep `<img>` tags initially (if no issues)

**Phase 2: Gradually Migrate to Image Component**

- Replace critical images (logo, hero image) with `<Image>`
- Add `priority` for above-the-fold images
- Test performance impact

**Phase 3: Optimize**

- Compress images (use next-image-export-optimizer or similar)
- Add responsive images with `sizes` prop
- Lazy load below-the-fold images

### Component Migration Examples

**Logo (Navbar):**

```jsx
// Before
<img src="/logo.png" alt="Logo" className="h-10 w-auto" />

// After (Option 1: Keep as-is if working)
<img src="/logo.png" alt="Logo" className="h-10 w-auto" />

// After (Option 2: Migrate to Image)
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={120}
  height={40}
  className="h-10 w-auto"
/>
```

**Hero Video (Keep as-is):**

```jsx
// No changes needed
<video autoPlay muted loop playsInline className="w-full h-full object-cover">
  <source src="/hero.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

### Static Export Limitations

**What Works:**

- ✅ Local images in `/public`
- ✅ External image URLs (with unoptimized: true)
- ✅ Video elements
- ✅ Manual image optimization

**What Doesn't Work:**

- ❌ Image Optimization API (requires Node.js server)
- ❌ On-demand image resizing
- ❌ Automatic WebP/AVIF conversion at runtime
- ❌ Dynamic image blurring (blur placeholder from external sources)

**Workaround for Advanced Optimization:**
Use third-party services or custom loaders:

```javascript
// next.config.js
module.exports = {
  images: {
    loader: "custom",
    loaderFile: "./my-image-loader.js",
  },
};
```

```javascript
// my-image-loader.js (example: Cloudinary)
export default function cloudinaryLoader({ src, width, quality }) {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
  return `https://res.cloudinary.com/demo/image/upload/${params.join(",")}${src}`;
}
```

---

## Summary

This research document provides comprehensive guidance for migrating from Vite + React Router to Next.js 15 App Router with the following decisions:

1. ✅ **Next.js 15 + React 19**: Fully compatible, no configuration needed
2. ✅ **Static Export**: Use `output: 'export'` with `basePath: '/vdanilov'`
3. ✅ **Client Components**: Use `'use client'` for Framer Motion, hooks, events, browser APIs
4. ✅ **React Router → App Router**: Migrate to file-based routing with `next/navigation` hooks
5. ✅ **Tailwind CSS v4**: Works with PostCSS config, use `@theme` directive
6. ✅ **Asset Paths**: Use direct paths (e.g., `/logo.png`), basePath handled automatically
7. ✅ **Font Optimization**: Use `next/font/google` for Poppins, remove @import
8. ✅ **Images**: Use Next.js Image component with `unoptimized: true`; keep `<video>` tags

All decisions align with the Build Constitution v3.0.0 and maintain performance, accessibility, and developer experience goals.
