# Implementation Plan: Complete Migration from Vite to Next.js

**Branch**: `004-vite-to-nextjs` | **Date**: November 26, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-vite-to-nextjs/spec.md`

## Summary

Migrate the personal website from Vite bundler to Next.js App Router framework while preserving all existing functionality, styling, and animations. The migration will replace React Router with Next.js file-based routing, configure static site generation for GitHub Pages deployment with correct base path, and remove all Vite-specific files and obsolete assets. Components using Framer Motion animations will be marked as Client Components with the `'use client'` directive, while static pages will remain as Server Components by default. The migration aligns with the project's Build Constitution (v3.0.0) which mandates Next.js App Router as the primary framework.

## Technical Context

**Language/Version**: JavaScript (Node.js 18+), JSX syntax  
**Primary Dependencies**: Next.js 15+, React 19, Tailwind CSS v4, Framer Motion, FontAwesome, react-router-dom (to be removed)  
**Storage**: Static files only (images, videos in /public directory)  
**Testing**: Manual testing via development server and production build verification  
**Target Platform**: Static site hosted on GitHub Pages (browser-based)  
**Project Type**: Web application (frontend only, static export)  
**Performance Goals**: LCP <2.5s, INP <200ms, CLS <0.1, First Load JS <100KB  
**Constraints**: Must work with GitHub Pages static hosting, base path `/vdanilov/`, no server-side APIs  
**Scale/Scope**: 6 pages, ~10 components, single user (portfolio site)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ Constitution Compliance Analysis

**Principle I: Next.js App Router Stack**

- ✅ PASS: This migration implements the constitutional mandate to use Next.js (App Router) as the primary framework
- ✅ PASS: Will use file-based routing via `app/` directory (removes React Router)
- ✅ PASS: Tailwind CSS v4 will be preserved (already in use)
- ✅ PASS: Framer Motion will be preserved for animations (21st.dev components)
- ✅ PASS: Will configure static site generation (SSG) for GitHub Pages

**Principle II: Component Architecture: Server-First with Client Boundaries**

- ✅ PASS: Components will default to Server Components
- ✅ PASS: Interactive components (Navbar, Hero with animations) will use `'use client'` directive
- ✅ PASS: Existing component structure is already modular and reusable
- ⚠️ ADVISORY: Need to audit each component for client/server boundaries during migration

**Principle III: Mobile-First, Responsive, and Performance-Optimized**

- ✅ PASS: Existing design is mobile-first with Tailwind responsive prefixes
- ⚠️ TODO: Will need to replace `<img>` and `<video>` tags with Next.js `<Image>` component where applicable
- ⚠️ TODO: Will need to implement `next/font` for Google Fonts (currently imported via @import in CSS)

**Principle IV: Accessibility & Semantics**

- ✅ PASS: Existing code uses semantic HTML and ARIA labels
- ✅ PASS: No changes required for accessibility compliance

**Principle V: Code Quality & Maintainability**

- ⚠️ DEFERRED: TypeScript migration is explicitly out of scope per specification
- ✅ PASS: Prettier formatting will be preserved with Husky pre-commit hooks
- ✅ PASS: Will maintain clean code structure with JSX files

**Performance Metrics**

- ✅ PASS: Next.js automatic code splitting will improve bundle size
- ⚠️ TODO: Need to verify Core Web Vitals after migration
- ⚠️ TODO: Need to configure `@next/bundle-analyzer` to monitor JavaScript bundle size

### Summary

✅ **GATE PASSED** - No blocking constitutional violations. All advisory items are improvements to be addressed during implementation.

## Project Structure

### Documentation (this feature)

```text
specs/004-vite-to-nextjs/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output: Next.js 15 compatibility, migration patterns
├── data-model.md        # Phase 1 output: Component/page inventory and client/server boundaries
├── quickstart.md        # Phase 1 output: Quick start guide for Next.js development
├── contracts/           # Phase 1 output: next.config.js schema, package.json updates
├── checklists/
│   └── requirements.md  # Specification quality checklist (already created)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

**Current Structure (Vite):**

```text
/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── ui/
│   │       ├── flip-words.jsx
│   │       ├── glow-menu.jsx
│   │       ├── menu-toggle-icon.jsx
│   │       └── shimmer-button.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Publications.jsx
│   │   └── References.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   ├── hero.mp4
│   ├── logo.png
│   └── [other static assets]
├── index.html              # Vite entry point (to be removed)
├── vite.config.js          # Vite config (to be removed)
└── package.json
```

**Target Structure (Next.js):**

```text
/
├── app/                    # Next.js App Router directory
│   ├── layout.jsx          # Root layout (replaces App.jsx)
│   ├── page.jsx            # Home page (from pages/Home.jsx)
│   ├── experience/
│   │   └── page.jsx
│   ├── education/
│   │   └── page.jsx
│   ├── portfolio/
│   │   └── page.jsx
│   ├── publications/
│   │   └── page.jsx
│   ├── references/
│   │   └── page.jsx
│   └── globals.css         # Global styles (from src/index.css)
├── components/             # Shared components (moved from src/components)
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   └── ui/
│       ├── flip-words.jsx
│       ├── glow-menu.jsx
│       ├── menu-toggle-icon.jsx
│       └── shimmer-button.jsx
├── lib/                    # Utility functions (moved from src/lib)
│   └── utils.js
├── public/                 # Static assets (unchanged)
│   ├── hero.mp4
│   ├── logo.png
│   └── [other static assets]
├── next.config.js          # Next.js configuration (new)
├── postcss.config.js       # PostCSS config (preserved)
└── package.json            # Updated dependencies
```

**Structure Decision**:

- **Chosen**: Next.js App Router structure (file-based routing)
- **Rationale**:
  - App Router is required by Build Constitution v3.0.0
  - File-based routing eliminates need for React Router
  - Server Components by default improve performance
  - Static export via `output: 'export'` supports GitHub Pages hosting
- **Migration Path**:
  - Move `src/pages/*.jsx` → `app/*/page.jsx` (except Home → `app/page.jsx`)
  - Move `src/components/` → `components/`
  - Move `src/lib/` → `lib/`
  - Convert `src/App.jsx` routing logic → `app/layout.jsx` with Navbar
  - Delete `src/main.jsx` (entry point handled by Next.js)
  - Move `src/index.css` → `app/globals.css`

**Files to Remove:**

- `index.html` (Next.js generates HTML)
- `index.html.legacy` (obsolete)
- `vite.config.js` (replaced by next.config.js)
- `src/` directory (contents moved to app/ and root-level directories)
- `dist/` folder (build output, will use `.next/` and `out/`)
- `app/experience/`, `app/education/`, etc. empty directories (currently exist but empty)

## Complexity Tracking

> **No constitutional violations requiring justification.**

The migration introduces zero new complexity or constitutional violations. All changes align with or improve adherence to the Build Constitution v3.0.0, which explicitly mandates Next.js App Router usage.

---

## Post-Phase 1 Constitution Re-evaluation

_After completing Phase 0 (Research) and Phase 1 (Data Model, Contracts, Quickstart)_

### ✅ Constitutional Compliance - FINAL ASSESSMENT

**Principle I: Next.js App Router Stack**

- ✅ **FULLY COMPLIANT**: All configuration files prepared for Next.js 15 with App Router
- ✅ **FULLY COMPLIANT**: Static export configured with `output: 'export'` in next.config.mjs
- ✅ **FULLY COMPLIANT**: File-based routing structure documented in data-model.md
- ✅ **FULLY COMPLIANT**: Tailwind CSS v4 PostCSS configuration preserved
- ✅ **FULLY COMPLIANT**: Font optimization configured with `next/font/google` for Poppins
- ✅ **ENHANCED**: Image optimization strategy defined (Next.js Image component with unoptimized mode)
- ✅ **ENHANCED**: basePath configuration for GitHub Pages deployment

**Principle II: Component Architecture: Server-First with Client Boundaries**

- ✅ **FULLY COMPLIANT**: Component audit completed in data-model.md
- ✅ **FULLY COMPLIANT**: 6 Client Components identified (Navbar, Hero, FlipWords, GlowMenu, MenuToggleIcon, ShimmerButton)
- ✅ **FULLY COMPLIANT**: 7 Server Components identified (Layout + 6 pages)
- ✅ **FULLY COMPLIANT**: Clear client/server boundary documentation with rationale
- ✅ **FULLY COMPLIANT**: Component dependency graph created showing Server → Client composition

**Principle III: Mobile-First, Responsive, and Performance-Optimized**

- ✅ **FULLY COMPLIANT**: Existing mobile-first design preserved
- ✅ **RESOLVED**: Font optimization strategy documented (next/font/google replaces @import)
- ✅ **RESOLVED**: Image optimization strategy documented (Next.js Image + unoptimized for static export)
- ✅ **ENHANCED**: Video optimization best practices documented in research.md
- ✅ **ENHANCED**: Performance metrics tracked (LCP, INP, CLS targets defined)

**Principle IV: Accessibility & Semantics**

- ✅ **FULLY COMPLIANT**: No changes to existing semantic HTML and ARIA implementations
- ✅ **MAINTAINED**: Keyboard navigation preserved
- ✅ **MAINTAINED**: Screen reader compatibility maintained

**Principle V: Code Quality & Maintainability**

- ✅ **FULLY COMPLIANT**: JSX code structure maintained (TypeScript deferred per spec)
- ✅ **FULLY COMPLIANT**: Prettier + Husky pre-commit hooks preserved in package.json
- ✅ **FULLY COMPLIANT**: ESLint configuration included in next.config.mjs
- ✅ **ENHANCED**: Path aliases configured in jsconfig.json for clean imports (`@/`)
- ✅ **ENHANCED**: Code organization documented in quickstart.md

**Performance Metrics**

- ✅ **ENHANCED**: Bundle splitting strategy documented (automatic per-route splitting)
- ✅ **ENHANCED**: Core Web Vitals targets defined (LCP <2.5s, INP <200ms, CLS <0.1)
- ✅ **ENHANCED**: First Load JS target defined (<100KB)
- ✅ **PLANNED**: @next/bundle-analyzer recommendation documented for monitoring

### Improvements Over Current Implementation

1. **Zero JavaScript for Static Content**: Server Components eliminate JS for pages without interactivity
2. **Automatic Code Splitting**: Next.js splits by route automatically (vs. manual in Vite)
3. **Font Optimization**: Self-hosted Poppins with zero layout shift (vs. external Google Fonts)
4. **Asset Path Simplification**: basePath handled automatically (vs. manual env var concatenation)
5. **Better Developer Experience**: Hot reload, file-based routing, TypeScript-ready
6. **Improved SEO**: Static export with proper meta tags via Metadata API
7. **Enhanced Performance**: Smaller bundle sizes with Server Components

### Advisory Items Resolution

| Original Advisory                             | Status              | Resolution                                                      |
| --------------------------------------------- | ------------------- | --------------------------------------------------------------- |
| Audit components for client/server boundaries | ✅ COMPLETE         | Documented in data-model.md with 13 components audited          |
| Replace `<img>` tags with Next.js Image       | ✅ STRATEGY DEFINED | Implementation plan in research.md (phased approach)            |
| Implement next/font for Google Fonts          | ✅ STRATEGY DEFINED | Configuration in contracts/next.config.mjs, usage in layout.jsx |
| Verify Core Web Vitals after migration        | ✅ METRICS DEFINED  | Targets set, testing plan in quickstart.md                      |
| Configure @next/bundle-analyzer               | ✅ DOCUMENTED       | Installation and usage steps in quickstart.md                   |

### Final Gate Assessment

✅ **GATE PASSED - READY FOR IMPLEMENTATION**

**Summary**: All constitutional principles are fully satisfied or enhanced. The migration plan includes:

- ✅ Complete configuration files ready for immediate use
- ✅ Comprehensive component audit with client/server boundaries defined
- ✅ Detailed migration patterns for all technologies
- ✅ Clear implementation guidance in quickstart.md
- ✅ No blocking issues or constitutional violations

**Confidence Level**: HIGH - All research complete, all decisions documented, no unknowns remain.

**Recommendation**: Proceed to `/speckit.tasks` to generate detailed implementation tasks.

---

## Phase Completion Summary

### Phase 0: Research ✅ COMPLETE

- [research.md](./research.md) created with 8 research topics fully documented
- All technical decisions made with rationale and alternatives documented
- No blocking issues found

### Phase 1: Design & Contracts ✅ COMPLETE

- [data-model.md](./data-model.md) created with complete component inventory
- [contracts/](./contracts/) directory created with 6 configuration files
- [quickstart.md](./quickstart.md) created with comprehensive developer guide
- Agent context updated via update-agent-context.sh script

### Phase 2: Implementation Tasks ⏸️ PENDING

- Run `/speckit.tasks` command to generate tasks.md
- Tasks will be broken down by priority and phase
- Implementation can begin after task generation

---

**Planning Complete**: November 26, 2025  
**Next Command**: `/speckit.tasks` to generate implementation checklist
