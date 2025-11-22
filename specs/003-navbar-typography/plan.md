# Implementation Plan: Navigation Bar and Typography System

**Branch**: `003-navbar-typography` | **Date**: November 22, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-navbar-typography/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a centralized typography system using CSS custom properties and create a modern navigation bar with 21st.dev glow-menu animations (3D flip effects, radial gradient glows). The navigation will feature logo integration, six page links (Home, Experience, Education, Portfolio, Publications, References), responsive mobile hamburger menu, and smooth scrolling to placeholder sections.

## Technical Context

**Language/Version**: JavaScript (ES2024), React 19.2.0  
**Primary Dependencies**: React, ReactDOM, Vite 7.2.4, Motion 12.23.24 (Framer Motion successor), Tailwind CSS 4.1.17, Lucide React 0.554.0, clsx 2.1.1, tailwind-merge 3.4.0  
**Storage**: N/A (static site, no backend)  
**Testing**: Manual testing in dev server (no test framework currently configured)  
**Target Platform**: Web browsers (modern Chrome, Firefox, Safari, Edge), mobile-first responsive design  
**Project Type**: Single-page React application (SPA) with Vite build tool  
**Performance Goals**: 60fps animations, <500ms 3D flip transitions, Lighthouse score >90, bundle size <500KB  
**Constraints**: <200ms interaction response, smooth 3D animations on mobile devices, accessible keyboard navigation  
**Scale/Scope**: Single portfolio website, 6 navigation items, ~10 components total

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

✅ **Core Principle I - Modern React Stack**: Using React 19.2, Vite 7.2, Tailwind CSS 4.1, Motion (Framer Motion successor), clsx, tailwind-merge

✅ **Core Principle II - Component-Driven (21st.dev)**: Using 21st.dev glow-menu component as the foundation for navigation

✅ **Core Principle III - Mobile-First & Responsive**: Implementing hamburger menu for mobile with maintained visual style, desktop horizontal layout

✅ **Core Principle IV - Accessibility & Semantics**: Keyboard navigation support, semantic HTML, ARIA labels for mobile menu toggle

✅ **Core Principle V - Code Quality**: Following existing code style (Prettier enforced), extracting reusable components

**Gate Status**: ✅ PASS - All constitution principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/003-navbar-typography/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (component analysis, best practices)
├── data-model.md        # Phase 1 output (navigation items structure, theme variables)
├── quickstart.md        # Phase 1 output (setup instructions, usage examples)
├── contracts/           # Phase 1 output (N/A - no API contracts for this feature)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Single-page React application structure
src/
├── components/
│   ├── Hero.jsx                    # Existing hero component
│   ├── Navbar.jsx                  # NEW: Main navigation component (glow-menu based)
│   └── ui/
│       ├── flip-words.jsx          # Existing UI component
│       ├── shimmer-button.jsx      # Existing UI component
│       └── glow-menu.jsx           # NEW: 21st.dev glow-menu adapted for navigation
├── lib/
│   └── utils.js                    # Existing utility functions (cn helper)
├── index.css                       # MODIFY: Add typography CSS custom properties
├── App.jsx                         # MODIFY: Integrate Navbar component
└── main.jsx                        # Entry point (no changes)

content/
└── logo.avif                       # Existing logo asset

public/                             # NEW: For section anchors (placeholder pages)
index.html                          # MODIFY: Add section anchor divs
vite.config.js                      # Existing Vite configuration
package.json                        # MODIFY: Ensure motion package is listed
```

**Structure Decision**: Single-project structure is appropriate for this portfolio SPA. Navigation component will be placed in `src/components/` at the top level (peer to Hero), while the base glow-menu UI component goes in `src/components/ui/` following the existing pattern (shimmer-button, flip-words). Typography system will extend the existing theme in `src/index.css` where colors are already defined.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - No constitution violations. All principles satisfied.

## Implementation Phases

### Phase 0: Research & Analysis

**Goal**: Analyze 21st.dev glow-menu component, determine typography best practices, and plan mobile adaptation strategy.

**Deliverable**: [research.md](./research.md)

**Tasks**:

1. Analyze 21st.dev glow-menu component structure and dependencies
2. Document Motion (Framer Motion) animation patterns used (rotateX, opacity, scale transitions)
3. Research best practices for centralizing typography in Tailwind CSS 4.x with @theme
4. Determine mobile adaptation strategy for glow-menu (hamburger menu integration while maintaining visual style)
5. Identify icon selection strategy for navigation items (Lucide React)
6. Document smooth scroll implementation approaches for React

### Phase 1: Design & Data Model

**Goal**: Define typography system structure, navigation data model, and component contracts.

**Deliverables**:

- [data-model.md](./data-model.md) - Typography variables, navigation item structure, animation variants
- [quickstart.md](./quickstart.md) - Setup and usage instructions
- No contracts/ needed (no API)

**Tasks**:

1. Define typography CSS custom properties structure (font-family-sans, font-family-mono)
2. Define navigation items data structure (name, href, icon, gradient, iconColor)
3. Design Navbar component props interface
4. Design glow-menu component adaptation for navigation use case
5. Define responsive breakpoints and mobile menu behavior
6. Document Framer Motion animation variant configurations
7. Create quickstart with component usage examples

### Phase 2: Implementation (Not part of /speckit.plan)

This phase is handled by `/speckit.tasks` command which will generate [tasks.md](./tasks.md) with specific implementation tasks.

## Notes

- **Motion vs Framer Motion**: Project uses `motion` (v12.23.24) which is the successor to Framer Motion. API is compatible.
- **Tailwind CSS 4.x**: Using new @theme directive instead of theme() function
- **No TypeScript**: Project uses JavaScript with JSX, not TypeScript
- **No testing framework**: Manual testing in dev server currently
- **Placeholder sections**: Actual content for Experience, Education, etc. will be implemented in future features
