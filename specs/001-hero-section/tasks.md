# Tasks: Hero Section with Video

**Feature**: Hero Section
**Status**: Pending
**Spec**: [spec.md](./spec.md)

## Phase 1: Setup

_Goal: Initialize project structure and assets for the Hero section._

- [x] T001 Create `src/js` directory structure (if not present) to match plan.
- [x] T002 Create empty `src/js/hero.js` for typewriter logic.
- [x] T003 Verify `content/viacheslav-danilov-1.mp4` exists and is accessible.

## Phase 2: Foundational

_Goal: Establish the base HTML structure and ensure build tools are ready._

- [x] T004 Add `<section id="hero">` container to `index.html` within the `<main>` tag.
- [x] T005 Ensure `tailwind.config.js` includes `index.html` and `src/js/**/*.js` in content sources.

## Phase 3: User Story 1 - Hero Introduction

_Goal: Display Name, Video, and Dynamic Roles._
_Priority: P1_

**Independent Test**: Open `index.html`. Verify "Viacheslav Danilov, PhD" is visible. Verify video plays muted. Verify roles cycle through "ML Engineer", "Data Scientist", etc.

- [x] T006 [US1] Implement responsive Flexbox layout (mobile: col, desktop: row) in `index.html`.
- [x] T007 [US1] Add HTML5 `<video>` tag with `autoplay muted loop playsinline` pointing to `content/viacheslav-danilov-1.mp4`.
- [x] T008 [US1] Add static typography (Pre-title "Hi there, I am", Name "Viacheslav Danilov, PhD") in `index.html`.
- [x] T009 [US1] Implement `Typewriter` class/function in `src/js/hero.js` to rotate text strings.
- [x] T010 [US1] Connect `src/js/hero.js` to `index.html` (via `<script type="module">`) and initialize with roles list.

## Phase 4: User Story 2 - Quick Actions & Contact

_Goal: Add Contact Info and CTA Buttons._
_Priority: P2_

**Independent Test**: Click "Download CV" (check link). Click "View my projects". Verify contact details are displayed.

- [x] T011 [US2] Add Contact list (Email, Phone, Telegram) with icons in `index.html`.
- [x] T012 [US2] Add primary "Download CV" button and secondary "View my projects" button in `index.html`.
- [x] T013 [US2] Apply Tailwind hover states and transitions to buttons and links.

## Final Phase: Polish

_Goal: Ensure responsiveness and accessibility._

- [x] T014 Verify mobile layout (375px): Video and text should stack vertically without overflow.
- [x] T015 Verify desktop layout (1440px): Video and text should be side-by-side.
- [x] T016 Add `aria-label` to buttons and ensure video has a fallback background color.

## Dependencies

1.  **T001-T005** (Setup/Foundational) must be done first.
2.  **T006-T010** (US1) can be done sequentially.
3.  **T011-T013** (US2) depends on T006 (Layout).

## Implementation Strategy

Start by getting the video and static text on screen (MVP). Then add the JS interactivity (Typewriter). Finally, add the CTA buttons and polish the styling.
