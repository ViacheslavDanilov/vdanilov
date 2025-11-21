# Implementation Plan: Hero Section with Video

**Branch**: `001-hero-section` | **Date**: 2025-11-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-hero-section/spec.md`

## Summary

Implement the Hero section of the home page featuring a video portrait, dynamic "typewriter" text for roles, and key call-to-action buttons. This section serves as the primary introduction to the visitor.

## Technical Context

**Language/Version**: HTML5, JavaScript (ES6+), CSS3
**Primary Dependencies**: Tailwind CSS (v3.x)
**Storage**: N/A (Static content)
**Testing**: Manual visual verification
**Target Platform**: Web (Modern Browsers)
**Project Type**: Web (Static Site)
**Performance Goals**: Video must load instantly (muted, playsinline), no layout shift (CLS < 0.1).
**Constraints**: Mobile-first design, responsive layout.
**Scale/Scope**: Single section component.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. Modern & Performant

- **Compliance**: ✅ Using standard HTML5 `<video>` and Tailwind.
- **Plan**: Ensure video is optimized (mp4/webm) and properly sized.

### II. Component-Driven Architecture

- **Compliance**: ✅ Hero section will be built as a distinct component structure.
- **Plan**: Isolate Hero HTML/CSS/JS logic.

### III. Mobile-First & Responsive

- **Compliance**: ✅ Design starts with mobile stack (text over video) and expands to desktop row.
- **Plan**: Use Tailwind `flex-col` for mobile and `md:flex-row` for desktop.

### IV. Accessibility & Semantics

- **Compliance**: ✅ Semantic `<section>`, `<h1>`.
- **Plan**: Ensure video has no audio (or controls if needed), text has sufficient contrast.

### V. Code Quality & Maintainability

- **Compliance**: ✅ Clean code, no magic numbers.
- **Plan**: Use Tailwind config for colors/spacing.

## Project Structure

### Documentation (this feature)

```text
specs/001-hero-section/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── assets/
│   └── content/
│       └── viacheslav-danilov-1.mp4
├── components/
│   └── hero.html        # Hero section markup (conceptual or actual partial)
├── js/
│   └── hero.js          # Typewriter logic
└── index.html           # Main entry point
```

**Structure Decision**: Integrating into the existing static site structure defined in `001-website-rebuild`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       |            |                                      |
