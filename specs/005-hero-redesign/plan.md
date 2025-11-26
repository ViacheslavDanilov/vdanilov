# Implementation Plan: Hero Section Redesign

**Branch**: `005-hero-redesign` | **Date**: November 26, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-hero-redesign/spec.md`

## Summary

This feature redesigns the hero section to present a cleaner, more focused professional introduction. The main changes include: removing the "Hi there, I am" greeting and contact links (Email, WhatsApp, Telegram), adding a prominent tagline "Science-Driven AI. Engineering-Led Execution. Technically Inspired Leadership.", and replacing two CTA buttons with a single "Download CV" button featuring an animated gradient border effect inspired by 21st.dev components.

**Technical Approach**: Modify the existing `Hero.jsx` Client Component to remove unnecessary elements, add the tagline with appropriate typography, and either replace the `ShimmerButton` with a custom animated gradient border button or create a new reusable button component matching the 21st.dev reference design (spinning conic gradient with purple-to-pink color scheme).

## Technical Context

**Language/Version**: JavaScript (ES2024+) with JSX, Node.js 18+  
**Primary Dependencies**: Next.js 15.1.8, React 19.2.0, Tailwind CSS v4, FontAwesome, Motion/Framer Motion  
**Storage**: N/A (static content only)  
**Testing**: Manual browser testing (Chrome, Firefox, Safari, Edge), Lighthouse for accessibility/performance  
**Target Platform**: Web (static site export for GitHub Pages)  
**Project Type**: Single-page web application (Next.js App Router)  
**Performance Goals**: Lighthouse score ≥90, Core Web Vitals passing, <5% performance degradation  
**Constraints**: Must maintain WCAG 2.1 AA accessibility, responsive design (320px-1920px+), CSS animation support with fallback  
**Scale/Scope**: Single component modification (~100 lines), one new button component (~50-100 lines)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ Compliance Summary

All constitutional principles are satisfied:

- **✅ Principle I (Next.js Stack)**: Using existing Next.js 15.1.8 setup with App Router, Tailwind CSS, Framer Motion
- **✅ Principle II (Component Architecture)**: Hero.jsx is already a Client Component (`'use client'`); modifications maintain this pattern
- **✅ Principle III (Mobile-First)**: Existing responsive design maintained; button animations gracefully degrade on unsupported browsers
- **✅ Principle IV (Accessibility)**: Button will include proper ARIA labels, keyboard navigation; removing text doesn't affect accessibility
- **✅ Principle V (Code Quality)**: Using JavaScript (existing pattern); maintaining clean, readable code with meaningful names

### No Violations

No complexity exceptions required. This is a straightforward UI modification within existing component architecture.

### Post-Design Re-check

Will verify after Phase 1 that:

- Button component maintains accessibility standards
- Animation performance doesn't degrade Core Web Vitals
- Responsive design works across all breakpoints

## Project Structure

### Documentation (this feature)

```text
specs/005-hero-redesign/
├── plan.md              # This file (implementation plan)
├── spec.md              # Feature specification (complete)
├── research.md          # Phase 0: Button animation patterns, accessibility considerations
├── data-model.md        # Phase 1: Component structure, props interface
├── quickstart.md        # Phase 1: Development guide for button component
├── contracts/           # Phase 1: Component API contracts (if needed)
├── tasks.md             # Phase 2: Task breakdown (created by /speckit.tasks)
└── checklists/
    └── requirements.md  # Quality checklist (complete)
```

### Source Code (repository root)

```text
components/
├── Hero.jsx                    # Modified: Remove greeting, contacts, "View projects" button; add tagline
└── ui/
    ├── animated-gradient-button.jsx  # New: Reusable button with spinning conic gradient border
    ├── flip-words.jsx          # Existing: Used in Hero
    ├── shimmer-button.jsx      # Existing: May be replaced or kept as fallback
    ├── glow-menu.jsx           # Existing: Used in Navbar
    ├── menu-toggle-icon.jsx    # Existing: Used in Navbar
    └── [other UI components]

app/
├── globals.css                 # May need animation keyframes for gradient spin
├── layout.jsx                  # Existing: Root layout
├── page.jsx                    # Existing: Home page (imports Hero)
└── [other routes]

public/
├── hero.mp4                    # Existing: Video for Hero section
├── logo.png                    # Existing: Logo
└── [other assets]

lib/
└── utils.js                    # Existing: cn() utility for className merging
```

**Structure Decision**: Single Next.js project with App Router. New button component will be created in `components/ui/` alongside existing UI components, following the established pattern. Hero.jsx modification is in-place; no restructuring needed.

## Complexity Tracking

> No violations to justify. This feature adheres to all constitutional principles.

---

## Implementation Phases

### Phase 0: Outline & Research ✅ COMPLETE

**Objective**: Research button animation patterns and accessibility considerations.

**Deliverable**: [research.md](./research.md)

**Status**: ✅ Complete

**Key Findings**:

- CSS-based spinning conic gradient with double-wrapper pattern
- Purple-pink gradient (#e879f9 → #a855f7) or blue gradient (#60a5fa → #3b82f6)
- WCAG 2.1 AA compliant with `prefers-reduced-motion` support
- Universal browser support (Chrome 119+, Firefox 122+, Safari 17+, Edge 119+)
- No performance impact (pure CSS animation on compositor thread)

---

### Phase 1: Design & Contracts ✅ COMPLETE

**Objective**: Define component structure, props interface, and development guide.

**Deliverables**:

- [data-model.md](./data-model.md) - Component structure and API design
- [quickstart.md](./quickstart.md) - Step-by-step implementation guide

**Status**: ✅ Complete

**Key Artifacts**:

- `AnimatedGradientButton` component interface with TypeScript types
- Hero.jsx modification plan with before/after code
- Accessibility checklist (keyboard nav, ARIA, reduced motion)
- Testing checklist (rendering, interaction, responsive, performance)

**Post-Design Constitution Re-check**: ✅ PASS

- Button maintains accessibility standards (WCAG 2.1 AA)
- Animation performance verified (CSS-only, no main thread blocking)
- Responsive design maintained (mobile-first, touch targets ≥44px)

---

### Phase 2: Task Breakdown ✅ COMPLETE

**Objective**: Break down implementation into atomic tasks for `/speckit.implement`.

**Deliverable**: [tasks.md](./tasks.md)

**Status**: ✅ Complete

**Task Summary**:

- **Total Tasks**: 46 tasks
- **Foundation**: 4 tasks (AnimatedGradientButton component)
- **User Story 1** (P1 - Simplified Hero): 9 tasks (remove clutter, add tagline)
- **User Story 2** (P2 - Premium CTA): 12 tasks (animated gradient button)
- **Polish & Validation**: 21 tasks (accessibility, cross-browser, performance)
- **Parallelizable**: 8 tasks marked with [P]
- **Estimated Time**: 2-3 hours total

**Key Features**:

- Tasks organized by user story for independent implementation
- Clear dependencies and critical path defined
- Parallel execution opportunities identified
- Acceptance criteria mapped to validation tasks
- MVP path: Foundation + US1 (13 tasks, ~1 hour)

---

## Next Steps

1. **Run `/speckit.implement`** ✅ READY - Execute tasks and build the feature
2. **Test locally**: npm run dev → verify changes
3. **Build for production**: npm run build
4. **Create Pull Request**: Merge 005-hero-redesign → main
5. **Deploy**: GitHub Actions will deploy to GitHub Pages

---

## Estimated Effort

- **Phase 0 (Research)**: ✅ Complete (1 hour)
- **Phase 1 (Design)**: ✅ Complete (1 hour)
- **Phase 2 (Tasks)**: ⏳ Pending (15 minutes - automated)
- **Implementation**: 1-1.5 hours (developer time)
- **Testing**: 30 minutes
- **Total**: ~3-4 hours

---
