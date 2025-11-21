# Research: Hero Section

**Feature**: Hero Section with Video
**Date**: 2025-11-21
**Status**: Complete

## Decisions

### 1. Typewriter Effect Implementation

- **Decision**: Custom vanilla JS implementation.
- **Rationale**: Lightweight (< 1KB), no external dependencies needed for simple text rotation.
- **Alternatives Considered**:
  - _TypeIt.js / Typed.js_: Good libraries but add unnecessary weight for a simple effect.
  - _CSS-only_: Possible with `steps()` animation but harder to handle variable length strings dynamically.

### 2. Video Handling

- **Decision**: Use HTML5 `<video>` tag with `autoplay muted loop playsinline`.
- **Rationale**: Standard way to ensure auto-play on mobile (requires `muted` and `playsinline`).
- **Alternatives Considered**:
  - _GIF_: Too large file size, poor quality.
  - _Canvas_: Overkill.

### 3. Layout Strategy

- **Decision**: Flexbox with `flex-col-reverse` on mobile (Video top/Text bottom or vice versa depending on design preference) and `flex-row` on desktop.
- **Rationale**: Tailwind's flex utilities make this trivial.
- **Note**: User requested "Video instead of picture". Usually, portrait videos are tall. We need to ensure it doesn't take up too much vertical space on mobile.

## Unknowns & Clarifications

- **Resolved**: Video path is `content/viacheslav-danilov-1.mp4`.
- **Resolved**: Roles list is provided in spec.
