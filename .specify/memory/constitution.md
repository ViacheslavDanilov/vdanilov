<!--
SYNC IMPACT REPORT
===================
Version: 1.0.0 -> 2.0.0
Changes:
- Principle I: Changed stack from Vanilla HTML/JS to React (Vite) to support modern component libraries.
- Principle II: Explicitly designated 21st.dev as the primary design system/component source.
- Tech Stack: Added requirements for React, Framer Motion, clsx, and tailwind-merge.

Templates Checked:
- .specify/templates/plan-template.md: ⚠ Pending (Ensure React-specific steps are supported)
- .specify/templates/spec-template.md: ✅ Compatible
- .specify/templates/tasks-template.md: ⚠ Pending (Task categories might need React specific linting/testing)

Follow-up:
- Migration of existing `index.html` and `hero.js` to React components.
-->

# vdanilov.com Build Constitution

## Core Principles

### I. Modern React Stack

The website must be built using a modern React-based stack powered by Vite. This enables the use of advanced component libraries and rich interactivity.

- **Core**: React, ReactDOM, Vite.
- **Styling**: Tailwind CSS (Utility-first).
- **Animation**: Framer Motion (Standard for 21st.dev components).
- **Utils**: `clsx` and `tailwind-merge` for class management.

### II. Component-Driven Architecture (21st.dev)

UI development follows a strict component-driven approach.

- **Primary Source**: Components MUST be sourced or inspired by **21st.dev** to ensure a high-quality, animated, and modern aesthetic.
- **Structure**: Components should be modular, reusable, and encapsulated in their own directories.
- **Composition**: Prefer composition over inheritance. Use functional components and Hooks.

### III. Mobile-First & Responsive

All designs and implementations must prioritize mobile devices first. The experience should be seamless across all viewport sizes.

- **Responsive Design**: Use Tailwind's responsive prefixes (`md:`, `lg:`) to adapt layouts.
- **Touch Targets**: Ensure interactive elements are touch-friendly on mobile.

### IV. Accessibility & Semantics

Code must be semantically correct HTML5 (JSX). Accessibility is non-negotiable.

- **Compliance**: Target WCAG 2.1 AA compliance.
- **Tooling**: Use `eslint-plugin-jsx-a11y` to catch issues early.
- **Navigation**: Ensure full keyboard navigability for all interactive components.

### V. Code Quality & Maintainability

Code must be clean, readable, and self-documenting.

- **Style**: Enforce consistency via Prettier and ESLint (React recommended config).
- **Best Practices**: Avoid "magic numbers". Extract complex logic into custom hooks.
- **Type Safety**: Prefer TypeScript (or strict JSDoc typing) for component props.

## Quality Standards

### Performance Metrics

- **Lighthouse Scores**: Target > 90 across Performance, Accessibility, Best Practices, and SEO.
- **Core Web Vitals**: Pass all Core Web Vitals (LCP, FID/INP, CLS).
- **Bundle Size**: Monitor bundle size; use code splitting (React.lazy) where appropriate.

### Testing Strategy

- **Static Analysis**: Linting and formatting checks on commit.
- **Component Testing**: Verify individual components for rendering and interaction.
- **Cross-Browser**: Ensure compatibility with modern versions of Chrome, Firefox, Safari, and Edge.

## Governance

- **Constitution Supremacy**: This document guides all architectural and design decisions.
- **Amendments**: Changes to the stack or core principles require explicit documentation and justification.
- **Review**: All code changes should be reviewed for adherence to these principles before merging.

**Version**: 2.0.0 | **Ratified**: 2025-11-21 | **Last Amended**: 2025-11-22
