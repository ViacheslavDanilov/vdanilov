<!--
SYNC IMPACT REPORT
===================
Version: 0.0.0 -> 1.0.0
Changes:
- Defined Core Principles I through V (Modern & Performant, Component-Driven, Mobile-First, Accessibility, Code Quality).
- Added Quality Standards section (Performance Metrics, Testing Strategy).
- Defined Governance section.

Templates Checked:
- .specify/templates/plan-template.md: ✅ Compatible
- .specify/templates/spec-template.md: ✅ Compatible
- .specify/templates/tasks-template.md: ✅ Compatible

Follow-up:
- None.
-->

# vdanilov.com Rebuild Constitution

## Core Principles

### I. Modern & Performant

The website must be built using a modern static stack (HTML, Tailwind CSS, JavaScript). Performance is paramount: aim for near-instant load times, minimal layout shifts (CLS), and optimized assets. Avoid heavy client-side frameworks unless necessary for specific interactivity.

### II. Component-Driven Architecture

UI development follows a component-driven approach. Components should be modular, reusable, and encapsulated. Inspiration is drawn from shadcn-ui and 21st.dev. Styles are utility-first (Tailwind), ensuring consistency and ease of maintenance.

### III. Mobile-First & Responsive

All designs and implementations must prioritize mobile devices first. The experience should be seamless across all viewport sizes, from mobile phones to large desktop screens. Touch targets must be accessible.

### IV. Accessibility & Semantics

Code must be semantically correct HTML5. Accessibility is non-negotiable: maintain high contrast ratios, proper ARIA labels where needed, and keyboard navigability. Target WCAG 2.1 AA compliance.

### V. Code Quality & Maintainability

Code must be clean, readable, and self-documenting. Use consistent naming conventions. Prettier and linters must be used to enforce style. No "magic numbers" or hardcoded strings where constants or configuration would be better.

## Quality Standards

### Performance Metrics

- **Lighthouse Scores**: Target > 90 across Performance, Accessibility, Best Practices, and SEO.
- **Core Web Vitals**: Pass all Core Web Vitals (LCP, FID/INP, CLS).

### Testing Strategy

- **Static Analysis**: Linting and formatting checks on commit.
- **Visual Verification**: Components must be verified across breakpoints.
- **Cross-Browser**: Ensure compatibility with modern versions of Chrome, Firefox, Safari, and Edge.

## Governance

- **Constitution Supremacy**: This document guides all architectural and design decisions.
- **Amendments**: Changes to the stack or core principles require explicit documentation and justification.
- **Review**: All code changes should be reviewed for adherence to these principles before merging.

**Version**: 1.0.0 | **Ratified**: 2025-11-21 | **Last Amended**: 2025-11-21
