# Research: Hero React Migration

**Feature**: `002-hero-react-migration`
**Status**: In Progress

## Unknowns & Clarifications

1. **Aceternity Flip Words Requirements**:
   - What are the exact dependencies? (Likely `framer-motion`)
   - Does it require specific `tailwind.config.js` plugins? (e.g., `addVariablesForColors`, `flattenColorPalette`)
   - What is the exact component code structure?

2. **Vite Migration Strategy**:
   - How to cleanly replace the existing `index.html` without losing the current asset references until the switch is complete?
   - Strategy: Move current `index.html` to `index.html.bak` or similar, and let Vite generate the new one? Or overwrite?
   - Decision: We will overwrite `index.html` but keep the `content/` folder intact.

## Research Findings

### 1. Aceternity Flip Words Requirements

- **Dependencies**: `motion` (Framer Motion v12+), `clsx`, `tailwind-merge`.
- **Component Code**: Single file `FlipWords` component.
- **Utils**: Requires a `cn` utility function (standard `clsx` + `tailwind-merge`).
- **Tailwind Config**: No specific plugins mentioned for this component, but standard Tailwind setup is required.

### 2. Vite Migration Strategy

- **Approach**:
  1. Initialize Vite in the root (or a temp folder and move).
  2. Rename existing `index.html` to `index.html.legacy`.
  3. Create new `index.html` (Vite entry point).
  4. Create `src/` directory for React code.
  5. Configure `vite.config.js`.
  6. Ensure `content/` folder is served as static assets (Vite serves root by default, so `content/` should be accessible).
