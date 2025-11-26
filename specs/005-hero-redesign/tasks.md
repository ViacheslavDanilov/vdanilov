# Tasks: Hero Section Redesign

**Input**: Design documents from `/specs/005-hero-redesign/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Feature**: Redesign hero section to remove clutter, add tagline, and implement animated gradient button

**Organization**: Tasks are grouped by user story (US1: Simplified Hero Message, US2: Premium Call-to-Action) to enable independent implementation and testing.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- All file paths are absolute from repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No setup required - using existing Next.js project

✅ **SKIPPED**: Project already configured with Next.js 15, React 19, Tailwind CSS v4

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create reusable AnimatedGradientButton component needed by both user stories

**⚠️ CRITICAL**: US2 tasks depend on this foundation being complete

- [x] T001 [P] Create components/ui/animated-gradient-button.jsx file
- [x] T002 Implement AnimatedGradientButton component with gradient animation (conic-gradient, spin animation)
- [x] T003 [P] Add reduced motion support in app/globals.css for prefers-reduced-motion media query
- [x] T004 Test AnimatedGradientButton renders with spinning gradient border in isolation

**Checkpoint**: AnimatedGradientButton component is ready - can now modify Hero.jsx

---

## Phase 3: User Story 1 - Simplified Hero Message (Priority: P1) 🎯 MVP

**Goal**: Remove visual clutter (greeting, contact links) and add professional tagline

**Independent Test**: Load homepage → verify tagline visible, no "Hi there, I am", no contact links

### Implementation for User Story 1

- [x] T005 [US1] Remove "Hi there, I am" paragraph from components/Hero.jsx (line ~23)
- [x] T006 [US1] Remove Email, WhatsApp, Telegram contact links section from components/Hero.jsx (lines ~35-58)
- [x] T007 [US1] Add tagline paragraph "Science-Driven AI. Engineering-Led Execution. Technically Inspired Leadership." after FlipWords in components/Hero.jsx
- [x] T008 [US1] Adjust spacing and typography for tagline (text-base md:text-lg, text-gray-300, max-w-md)

### Validation for User Story 1

- [x] T009 [US1] Start dev server (npm run dev) and verify hero section renders correctly
- [x] T010 [US1] Verify "Hi there, I am" text is not visible in browser
- [x] T011 [US1] Verify Email, WhatsApp, Telegram links are not visible
- [x] T012 [US1] Verify tagline displays with correct text and styling
- [x] T013 [US1] Verify responsive layout on mobile (375px), tablet (768px), desktop (1024px)

**Checkpoint**: User Story 1 complete - Hero section has clean intro with tagline

---

## Phase 4: User Story 2 - Premium Call-to-Action (Priority: P2)

**Goal**: Replace two CTA buttons with single animated gradient "Download CV" button

**Independent Test**: Observe Download CV button → verify animated gradient border, clickable, opens CV

### Implementation for User Story 2

- [x] T014 [US2] Update imports in components/Hero.jsx: add AnimatedGradientButton, remove unused ShimmerButton import (if no longer used)
- [x] T015 [US2] Remove "View my projects" ShimmerButton from CTA section in components/Hero.jsx
- [x] T016 [US2] Replace "Download CV" ShimmerButton with AnimatedGradientButton in components/Hero.jsx
- [x] T017 [US2] Configure AnimatedGradientButton props: href (CV link), target="\_blank", gradient="purple", ariaLabel="Download CV"
- [x] T018 [US2] Add FontAwesomeIcon (faFileArrowDown) inside AnimatedGradientButton with proper styling

### Validation for User Story 2

- [x] T019 [US2] Verify only one button ("Download CV") is visible in hero section
- [x] T020 [US2] Verify button displays animated gradient border (spinning conic gradient)
- [x] T021 [US2] Test button click opens CV in new tab (https://drive.google.com/file/d/1jYs54eFCYc367ZKhWjH1Xfry4_sFI7Ir/view?usp=drive_link)
- [x] T022 [US2] Test button hover state shows visual feedback (gradient intensification)
- [x] T023 [US2] Verify "View my projects" button is not visible
- [x] T024 [US2] Test keyboard navigation: Tab to button, Enter key activates link
- [x] T025 [US2] Test button on mobile devices (touch target ≥44x44px)

**Checkpoint**: User Story 2 complete - Single premium animated button in hero section

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, cross-browser testing, performance checks

### Accessibility Validation

- [ ] T026 Run Lighthouse accessibility audit (target ≥90 score)
- [ ] T027 Verify button meets WCAG 2.1 AA color contrast requirements (≥4.5:1)
- [ ] T028 Test with prefers-reduced-motion enabled (animation should stop)
- [ ] T029 Test with screen reader (NVDA/VoiceOver) - button announced correctly
- [ ] T030 Verify focus indicator is visible on keyboard navigation

### Cross-Browser Testing

- [ ] T031 Test on Chrome latest (dev mode + production build)
- [ ] T032 Test on Firefox latest (dev mode + production build)
- [ ] T033 Test on Safari latest (dev mode + production build)
- [ ] T034 Test on Edge latest (dev mode + production build)

### Performance Validation

- [ ] T035 Run Lighthouse performance audit (target ≥90 score)
- [ ] T036 Verify Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
- [ ] T037 Verify no performance degradation vs baseline (<5% regression)
- [ ] T038 Check animation runs at 60fps (Chrome DevTools Performance tab)

### Production Build

- [ ] T039 Run npm run build and verify no errors
- [ ] T040 Run npm run serve and test production build at http://localhost:3000
- [ ] T041 Verify all US1 and US2 acceptance criteria in production build

### Code Quality

- [ ] T042 Run Prettier to format all modified files (npm run format)
- [ ] T043 Verify no console errors in browser DevTools
- [ ] T044 Review code for any unused imports or variables

### Documentation

- [ ] T045 Update README.md if component usage needs documentation (optional)
- [ ] T046 Add inline JSDoc comments to AnimatedGradientButton props (optional)

---

## Dependencies Between Tasks

### Critical Path (Must be done in order)

```
T001-T002-T003-T004 (Foundation: AnimatedGradientButton)
  │
  ├─> T005-T006-T007-T008 (US1: Content changes)
  │     │
  │     └─> T009-T010-T011-T012-T013 (US1: Validation)
  │
  └─> T014-T015-T016-T017-T018 (US2: Button replacement)
        │
        └─> T019-T020-T021-T022-T023-T024-T025 (US2: Validation)
              │
              └─> T026-T044 (Polish: Final validation)
                    │
                    └─> T045-T046 (Documentation)
```

### Parallel Execution Opportunities

**After Foundation Complete (T001-T004)**:

- **Parallel Track 1**: T005-T013 (US1 implementation + validation)
- **Parallel Track 2**: T014-T025 (US2 implementation + validation)

**Note**: In practice, US2 depends on US1 being merged into the same file (Hero.jsx), so sequential execution is recommended to avoid merge conflicts.

**After Implementation Complete**:

- T026-T029 (Accessibility) can run in parallel with T031-T034 (Cross-browser)
- T035-T038 (Performance) can run in parallel with T042-T044 (Code quality)

---

## Parallel Execution by User Story

### User Story 1 (Simplified Hero Message)

**Can execute independently**: Yes (after Foundation)
**Tasks**: T005-T013 (9 tasks)
**Estimated time**: 30 minutes

### User Story 2 (Premium Call-to-Action)

**Can execute independently**: Partially (depends on AnimatedGradientButton from Foundation)
**Tasks**: T014-T025 (12 tasks)
**Estimated time**: 45 minutes

**Suggested MVP**: Complete Foundation + US1 (T001-T013) for a minimal viable hero section with clean messaging. US2 adds the premium button as an enhancement.

---

## Implementation Strategy

### Approach: Incremental Delivery

1. **Phase 2 (Foundation)**: T001-T004 → AnimatedGradientButton ready
2. **Phase 3 (US1 MVP)**: T005-T013 → Clean hero message with tagline
3. **Phase 4 (US2 Enhancement)**: T014-T025 → Premium animated button
4. **Phase 5 (Polish)**: T026-T046 → Production-ready quality

### Testing Strategy

- **During Implementation**: Test after each phase (T004, T013, T025)
- **Before Polish**: Verify both user stories work together (T009-T025)
- **Before Commit**: Run full test suite (T026-T044)

### Rollback Plan

If issues arise:

- **After T013**: Can commit US1 changes alone (tagline without button)
- **After T025**: Can commit US1+US2 together (full feature)
- **Revert**: Git revert if critical bugs found in production

---

## Acceptance Criteria Mapping

### User Story 1 Acceptance Scenarios → Tasks

| Acceptance Scenario                                   | Validated By                  |
| ----------------------------------------------------- | ----------------------------- |
| AS1.1: Main heading "Viacheslav Danilov, PhD" visible | T009 (existing, not modified) |
| AS1.2: FlipWords animation with roles visible         | T009 (existing, not modified) |
| AS1.3: Tagline displayed prominently                  | T012                          |
| AS1.4: "Hi there, I am" NOT visible                   | T010                          |
| AS1.5: Contact links NOT visible                      | T011                          |

### User Story 2 Acceptance Scenarios → Tasks

| Acceptance Scenario                          | Validated By |
| -------------------------------------------- | ------------ |
| AS2.1: Exactly one "Download CV" button      | T019         |
| AS2.2: Animated gradient border visible      | T020         |
| AS2.3: Hover shows visual feedback           | T022         |
| AS2.4: Click opens CV in new tab             | T021         |
| AS2.5: "View my projects" button NOT visible | T023         |

---

## Task Summary

- **Total Tasks**: 46
- **Foundation**: 4 tasks (T001-T004)
- **User Story 1**: 9 tasks (T005-T013)
- **User Story 2**: 12 tasks (T014-T025)
- **Polish**: 21 tasks (T026-T046)
- **Parallelizable**: 8 tasks marked with [P]
- **Estimated Total Time**: 2-3 hours

---

## Next Steps

1. Execute tasks sequentially or use parallel execution opportunities
2. After each phase, commit work with descriptive message
3. After all tasks complete, create Pull Request to merge into main
4. Deploy via GitHub Actions to GitHub Pages
5. Monitor user feedback and conversion metrics

**Ready to implement**: All design documents complete, tasks defined, acceptance criteria mapped.
