# Implementation Plan: Hero React Migration

**Branch**: `002-hero-react-migration` | **Date**: 2025-11-22 | **Spec**: [specs/002-hero-react-migration/spec.md](specs/002-hero-react-migration/spec.md)
**Input**: Feature specification from `/specs/002-hero-react-migration/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Migrate the existing static Hero section to a modern React implementation using Vite. This involves setting up the React infrastructure, installing Tailwind CSS and Framer Motion (via `motion` package), and implementing the "Flip Words" component from 21st.dev (Aceternity UI). The goal is to replace the vanilla JS "Typewriter" effect with a polished React component while maintaining the existing content and design.

## Technical Context

**Language/Version**: JavaScript (ES Modules), React 18+
**Primary Dependencies**: `vite`, `react`, `react-dom`, `tailwindcss`, `motion` (Framer Motion), `clsx`, `tailwind-merge`, `lucide-react`
**Storage**: N/A (Static Site)
**Testing**: Manual verification (Visual & Functional)
**Target Platform**: Modern Web Browsers
**Project Type**: Single Page Application (SPA)
**Performance Goals**: Lighthouse Performance > 90
**Constraints**: Mobile-first design, preserve existing assets in `content/`
**Scale/Scope**: Single Hero component migration (initial step of full site migration)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Modern React Stack**: Plan establishes Vite + React + Tailwind. (Pass)
- **II. Component-Driven Architecture**: Introduces `Hero` and `FlipWords` components. (Pass)
- **III. Mobile-First**: Tailwind utility classes will ensure responsiveness. (Pass)
- **IV. Accessibility**: Semantic HTML and ARIA labels where necessary. (Pass)
- **V. Code Quality**: Modular component structure (`src/components`). (Pass)

## Project Structure

### Documentation (this feature)

```text
specs/002-hero-react-migration/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for this feature)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/
│   │   └── flip-words.jsx  # Aceternity Component
│   └── Hero.jsx            # Main Hero Section
├── lib/
│   └── utils.js            # cn() helper
├── App.jsx                 # Main Application Component
├── main.jsx                # Entry Point
└── index.css               # Tailwind Directives

# Root Configs
vite.config.js
tailwind.config.js
postcss.config.js
index.html                  # New Entry Point
```

**Structure Decision**: Standard Vite + React project structure in the root.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       |            |                                      |
