<!--
SYNC IMPACT REPORT
===================
Version: 2.0.0 -> 3.0.0
Changes:
- MAJOR: Replaced Vite with Next.js (App Router) as the primary framework and build system.
- Principle I: Updated to Next.js stack with SSR, SSG, RSC, file-based routing, and built-in optimizations.
- Principle II: Added Server Components vs Client Components distinction with explicit usage rules.
- Principle III: Enhanced with Next.js Image optimization and Metadata API.
- Performance Metrics: Updated to reflect Next.js-specific optimizations (zero-JS server components, automatic code splitting, image optimization, caching).
- Technology Stack: Next.js replaces Vite; added support for API Routes, Server Actions, and React Server Components.

Templates Checked:
- .specify/templates/plan-template.md: ✅ Compatible (generic React structure applies)
- .specify/templates/spec-template.md: ✅ Compatible
- .specify/templates/tasks-template.md: ✅ Compatible
-->

# vdanilov.com Build Constitution

## Core Principles

### I. Next.js App Router Stack

The website MUST be built using **Next.js (App Router)** as the primary framework and runtime. Next.js provides production-ready features including SSR, SSG, RSC, automatic optimizations, and file-based routing.

- **Core Framework**: Next.js 14+ (App Router), React, ReactDOM.
- **Styling**: Tailwind CSS (utility-first, with Next.js integration).
- **Animation**: Framer Motion (standard for 21st.dev components).
- **Utils**: `clsx` and `tailwind-merge` for class management.
- **Routing**: File-based routing via `app/` directory (no client-side router libraries).
- **Image Optimization**: Next.js `<Image>` component MUST be used for all images.
- **Metadata**: Next.js Metadata API MUST be used for SEO (no manual head management).
- **API Layer**: API Routes (`app/api/`) and Server Actions for backend logic.

**Rationale**: Next.js provides a cohesive, production-optimized foundation that eliminates the need for separate build tools and manual configuration, while enabling advanced rendering strategies (SSR, SSG, ISR) and zero-JS server components.

### II. Component Architecture: Server-First with Client Boundaries

UI development follows a **component-driven architecture** with a clear distinction between Server Components (default) and Client Components.

- **Primary Source**: Components MUST be sourced or inspired by **21st.dev** to ensure high-quality, animated, and modern design.
- **Server Components (Default)**: All components are Server Components by default. Use for data fetching, static content, and non-interactive UI. Benefits: zero client-side JavaScript, direct database/API access, automatic code splitting.
- **Client Components**: Mark with `'use client'` directive ONLY when required for:
  - Interactive UI (event handlers, hooks like `useState`, `useEffect`).
  - Browser-only APIs (localStorage, window, etc.).
  - Third-party libraries requiring client-side execution (e.g., Framer Motion animations).
- **Composition Rules**:
  - Server Components can import and render Client Components.
  - Client Components CANNOT import Server Components (pass as children/props instead).
  - Keep Client Components small and focused; extract static parts into Server Components.
- **Structure**: Components MUST be modular, reusable, and organized by feature or UI category.

**Rationale**: Server Components reduce bundle size and improve performance by default. Client Components should be used judiciously for interactivity, maintaining a clear boundary between server and client logic.

### III. Mobile-First, Responsive, and Performance-Optimized

All designs and implementations MUST prioritize mobile devices first, with seamless experiences across all viewport sizes and optimal performance.

- **Responsive Design**: Use Tailwind's responsive prefixes (`md:`, `lg:`, `xl:`) to adapt layouts.
- **Touch Targets**: Ensure interactive elements are touch-friendly (minimum 44×44px).
- **Image Optimization**: Use Next.js `<Image>` with `priority` for above-the-fold images, lazy loading for below-the-fold content.
- **Font Optimization**: Use `next/font` for automatic font optimization and self-hosting.
- **Zero-JS Pages**: Maximize use of Server Components to serve pages with zero or minimal JavaScript.

**Rationale**: Mobile-first design ensures accessibility on all devices, while Next.js built-in optimizations (image, font, automatic code splitting) deliver superior performance without manual configuration.

### IV. Accessibility & Semantics

Code MUST be semantically correct HTML5 (via JSX/TSX). Accessibility is non-negotiable.

- **Compliance**: Target WCAG 2.1 AA compliance minimum.
- **Tooling**: Use `eslint-plugin-jsx-a11y` to catch accessibility issues during development.
- **Keyboard Navigation**: Ensure full keyboard navigability for all interactive components.
- **ARIA**: Use ARIA attributes appropriately (only when semantic HTML is insufficient).
- **Testing**: Validate with automated tools (Lighthouse, axe DevTools) and manual keyboard/screen reader testing.

**Rationale**: Accessibility is a legal and ethical requirement. Semantic HTML and ARIA improve usability for all users, including those with disabilities.

### V. Code Quality & Maintainability

Code MUST be clean, readable, self-documenting, and type-safe.

- **TypeScript**: REQUIRED for all new code. Enforce strict mode (`strict: true` in `tsconfig.json`).
- **Linting & Formatting**: Enforce via ESLint (Next.js recommended config + React Hooks + jsx-a11y) and Prettier.
- **Best Practices**:
  - Avoid "magic numbers" and strings; use named constants.
  - Extract complex logic into custom hooks or utility functions.
  - Prefer Server Components unless interactivity is required.
  - Use Server Actions for form submissions and mutations.
- **File Organization**: Group by feature or route; co-locate related files (components, styles, tests).

**Rationale**: TypeScript prevents runtime errors, improves developer experience, and serves as inline documentation. Consistent code style and structure reduce cognitive load and maintenance costs.

## Technology Stack

### Required Dependencies

- **Framework**: `next` (14+), `react`, `react-dom`
- **Styling**: `tailwindcss`, `postcss`, `autoprefixer`
- **Animation**: `framer-motion` (for client components requiring animation)
- **Utilities**: `clsx`, `tailwind-merge`
- **TypeScript**: `typescript`, `@types/react`, `@types/node`

### Next.js Features to Leverage

- **Rendering Strategies**: SSR (default), SSG (`generateStaticParams`), ISR (`revalidate`).
- **React Server Components (RSC)**: Default for all components; enables zero-JS pages.
- **File-Based Routing**: `app/` directory structure defines routes automatically.
- **API Routes**: `app/api/` for backend endpoints.
- **Server Actions**: For form handling and server-side mutations (`'use server'`).
- **Image Optimization**: `next/image` with automatic WebP/AVIF conversion, responsive sizes.
- **Font Optimization**: `next/font` for Google Fonts or custom fonts.
- **Metadata API**: `metadata` export or `generateMetadata` for SEO.
- **Caching**: Automatic caching for `fetch` requests; control via `cache` and `revalidate` options.

### Development Tools

- **Linting**: `eslint` with `eslint-config-next`
- **Formatting**: `prettier` with `prettier-plugin-tailwindcss`
- **Type Checking**: `tsc --noEmit` in CI/CD pipeline
- **Testing** (optional): Vitest or Jest for unit/integration tests; Playwright for E2E.

## Quality Standards

### Performance Metrics

- **Lighthouse Scores**: Target ≥90 for Performance, Accessibility, Best Practices, SEO.
- **Core Web Vitals**: MUST pass all thresholds:
  - **LCP (Largest Contentful Paint)**: <2.5s
  - **INP (Interaction to Next Paint)**: <200ms
  - **CLS (Cumulative Layout Shift)**: <0.1
- **Next.js-Specific Optimizations**:
  - **Zero-JS Server Components**: Maximize pages rendered as Server Components to eliminate unnecessary client-side JavaScript.
  - **Automatic Code Splitting**: Next.js splits code by route automatically; no manual `React.lazy` needed.
  - **Image Optimization**: All images MUST use `next/image`; target ≥90% modern format (WebP/AVIF) delivery.
  - **Caching Strategy**: Leverage Next.js caching (`fetch` with `revalidate`, route segment config) to minimize redundant data fetching.
- **Bundle Analysis**: Use `@next/bundle-analyzer` to monitor client-side JavaScript; aim for <200KB initial JS.
- **First Load JS**: Target <100KB for initial page load (excluding framework overhead).

**Rationale**: Next.js provides built-in optimizations that eliminate manual performance tuning. Monitoring ensures these optimizations are effectively utilized.

### Testing Strategy

- **Static Analysis**: ESLint + TypeScript checks on commit (pre-commit hook or CI).
- **Component Testing**: Unit tests for complex logic; integration tests for critical user flows (optional).
- **Accessibility Testing**: Automated checks via Lighthouse + `eslint-plugin-jsx-a11y`; manual keyboard and screen reader testing for critical paths.
- **Cross-Browser**: Ensure compatibility with latest versions of Chrome, Firefox, Safari, Edge (desktop and mobile).
- **Visual Regression** (optional): Playwright or Chromatic for visual diffs.

**Rationale**: Automated testing catches regressions early. Accessibility testing ensures compliance. Cross-browser testing ensures broad compatibility.

## Governance

### Amendment Process

- **Constitution Supremacy**: This document is the authoritative source for all architectural and design decisions.
- **Amendment Procedure**:
  1. Proposal: Document the change, rationale, and impact in a Pull Request or design doc.
  2. Review: Core maintainers review for alignment with project goals and quality standards.
  3. Version Bump: Increment version per semantic versioning:
     - **MAJOR**: Backward-incompatible changes (e.g., framework migration, principle removal).
     - **MINOR**: New principles, sections, or material expansions.
     - **PATCH**: Clarifications, wording, typo fixes.
  4. Sync Impact Report: Update the report at the top of this file, listing affected templates and follow-up tasks.
  5. Template Propagation: Update `.specify/templates/` files to reflect constitutional changes.
  6. Merge: Merge after approval and template updates.

### Compliance Review

- **Pre-Development**: Validate feature designs against constitutional principles before implementation.
- **Code Review**: All Pull Requests MUST be reviewed for adherence to this constitution.
- **Continuous Monitoring**: Track Lighthouse scores, Core Web Vitals, and bundle size in CI/CD pipeline.
- **Periodic Audits**: Quarterly reviews to ensure codebase remains aligned with constitutional standards.

### Enforcement

- **Blocking Issues**: Violations of MUST requirements block Pull Request approval.
- **Advisory Issues**: Violations of SHOULD requirements trigger discussion but may be approved with justification.
- **Tooling**: Automated checks (ESLint, TypeScript, Lighthouse CI) enforce standards where possible.

**Rationale**: Clear governance ensures consistency, maintainability, and alignment with project goals over time.

---

**Version**: 3.0.0  
**Ratified**: 2025-11-21  
**Last Amended**: 2025-11-26
