# Tasks: Navigation Bar and Typography System

**Input**: Design documents from `/specs/003-navbar-typography/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify all required dependencies are installed (motion, lucide-react, clsx, tailwind-merge)
- [ ] T002 Create `src/components/ui/` directory if it doesn't exist
- [ ] T003 [P] Review project structure matches plan.md expectations

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Add typography CSS custom properties to `src/index.css` @theme block (--font-family-sans, --font-family-mono)
- [ ] T005 Apply default font-family to body element in `src/index.css`
- [ ] T006 [P] Define navigation items data structure in preparation for Navbar component (icons, labels, hrefs, gradients, colors)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Centralized Typography Control (Priority: P1) 🎯 MVP

**Goal**: Implement centralized font system where changing one CSS variable updates fonts site-wide

**Independent Test**: Change --font-family-sans value in src/index.css and verify all text updates immediately

### Implementation for User Story 1

- [ ] T007 [US1] Define --font-family-sans CSS custom property in `src/index.css` @theme block with system font stack
- [ ] T008 [US1] Define --font-family-mono CSS custom property in `src/index.css` @theme block for code elements
- [ ] T009 [US1] Apply font-family: var(--font-family-sans) to body element in `src/index.css`
- [ ] T010 [US1] Verify Hero component and existing components use the centralized font automatically
- [ ] T011 [US1] Test by changing font variable and confirming site-wide font update

**Checkpoint**: Typography system complete and testable - verify by changing font variable

---

## Phase 4: User Story 2 - Desktop Navigation (Priority: P2)

**Goal**: Implement desktop navigation with 21st.dev glow-menu animations, logo, and smooth scrolling

**Independent Test**: Open site on desktop (≥768px), verify horizontal menu with 3D flip animations, logo clickable, smooth scroll works

### Implementation for User Story 2

- [ ] T012 [P] [US2] Create `src/components/ui/glow-menu.jsx` with 21st.dev base component (Motion animation variants, 3D flip, glow effects)
- [ ] T013 [P] [US2] Define navigation items array in `src/components/Navbar.jsx` with icons from lucide-react (Home, Briefcase, GraduationCap, FolderGit2, BookOpen, Users)
- [ ] T014 [US2] Create `src/components/Navbar.jsx` skeleton with fixed positioning and glassmorphism styling
- [ ] T015 [US2] Integrate logo into Navbar (left side, separate from menu items) in `src/components/Navbar.jsx`
- [ ] T016 [US2] Integrate GlowMenu component for desktop layout (hidden on mobile) in `src/components/Navbar.jsx`
- [ ] T017 [US2] Implement smooth scroll onClick handler using native scrollIntoView API in `src/components/Navbar.jsx`
- [ ] T018 [US2] Implement Intersection Observer scroll spy for active section tracking in `src/components/Navbar.jsx`
- [ ] T019 [US2] Add placeholder sections to `src/App.jsx` (id="home", "experience", "education", "portfolio", "publications", "references")
- [ ] T020 [US2] Integrate Navbar component into `src/App.jsx` at the top level
- [ ] T021 [US2] Test desktop navigation: hover animations, smooth scroll, active section highlighting, logo click to home

**Checkpoint**: Desktop navigation fully functional with animations and smooth scrolling

---

## Phase 5: User Story 3 - Mobile Navigation (Priority: P2)

**Goal**: Implement responsive mobile menu with hamburger icon and overlay, maintaining glow-menu visual style

**Independent Test**: Open site on mobile (<768px), verify hamburger menu, tap to expand/collapse, glow effects maintained

### Implementation for User Story 3

- [ ] T022 [P] [US3] Add mobile menu state (isMenuOpen useState) to `src/components/Navbar.jsx`
- [ ] T023 [P] [US3] Create hamburger menu button with Menu/X icons from lucide-react in `src/components/Navbar.jsx`
- [ ] T024 [US3] Implement responsive breakpoint logic (hide desktop menu, show hamburger on <768px) using Tailwind md: prefix in `src/components/Navbar.jsx`
- [ ] T025 [US3] Create mobile menu overlay component with AnimatePresence from Motion in `src/components/Navbar.jsx`
- [ ] T026 [US3] Render navigation items vertically in mobile menu with maintained glow styling in `src/components/Navbar.jsx`
- [ ] T027 [US3] Implement mobile menu close on navigation link click in `src/components/Navbar.jsx`
- [ ] T028 [US3] Implement mobile menu close on outside click (overlay background click) in `src/components/Navbar.jsx`
- [ ] T029 [US3] Add touch event handlers for glow effect on mobile menu items in `src/components/Navbar.jsx`
- [ ] T030 [US3] Test mobile navigation: hamburger toggle, vertical menu, glow effects on tap, menu closes after link click

**Checkpoint**: Mobile navigation fully functional with maintained visual style

---

## Phase 6: User Story 4 - Visual Consistency (Priority: P3)

**Goal**: Ensure navbar uses centralized theme colors and fonts for cohesive design

**Independent Test**: Verify navbar uses only --color-dark, --color-light, --color-accent from theme and --font-family-sans for text

### Implementation for User Story 4

- [ ] T031 [US4] Replace any hardcoded colors in `src/components/Navbar.jsx` with Tailwind theme classes (bg-dark, text-light, text-accent)
- [ ] T032 [US4] Replace any hardcoded colors in `src/components/ui/glow-menu.jsx` with Tailwind theme classes
- [ ] T033 [US4] Verify navigation text uses font-sans class (default from centralized typography) in `src/components/Navbar.jsx`
- [ ] T034 [US4] Ensure hover/active state transitions use smooth duration (300ms) in `src/components/ui/glow-menu.jsx`
- [ ] T035 [US4] Test visual consistency: all colors from theme, all fonts from centralized system, smooth transitions

**Checkpoint**: Visual consistency verified across all navbar elements

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements, accessibility, performance optimization

- [ ] T036 [P] Add ARIA labels to mobile menu button for accessibility in `src/components/Navbar.jsx`
- [ ] T037 [P] Add ARIA label to logo link in `src/components/Navbar.jsx`
- [ ] T038 [P] Ensure keyboard navigation works (Tab, Enter) for all menu items in `src/components/Navbar.jsx`
- [ ] T039 Test navbar with keyboard only navigation (no mouse)
- [ ] T040 Test navbar on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] T041 [P] Verify 60fps animation performance using browser DevTools Performance tab
- [ ] T042 [P] Check bundle size impact of Motion library (should be reasonable given existing dependency)
- [ ] T043 Test responsive behavior at various breakpoints (320px, 768px, 1024px, 1920px)
- [ ] T044 Verify navbar behavior on print (@media print - should hide or minimize)
- [ ] T045 Test with reduced motion preference (prefers-reduced-motion: reduce)

---

## Dependencies (User Story Completion Order)

```
US1 (Typography)
  ↓
US2 (Desktop Nav) & US3 (Mobile Nav) - Can be implemented in parallel
  ↓
US4 (Visual Consistency)
  ↓
Polish
```

**MVP Scope**: User Story 1 (Typography) → Delivers centralized font system, testable independently

**Phase 2 MVP**: User Stories 1 + 2 (Typography + Desktop Nav) → Delivers functional desktop navigation

**Full Feature**: All user stories → Complete navigation system with mobile support

---

## Parallel Execution Opportunities

### User Story 2 (Desktop Navigation)

Can work in parallel on:

- T012 (glow-menu.jsx)
- T013 (navigation items array)
- T019 (placeholder sections in App.jsx)

### User Story 3 (Mobile Navigation)

Can work in parallel on:

- T022 (mobile state)
- T023 (hamburger button)

### User Story 4 (Visual Consistency)

Can work in parallel on:

- T031 (Navbar.jsx color fixes)
- T032 (glow-menu.jsx color fixes)

### Polish Phase

Most polish tasks (T036-T045) can be executed in parallel as they are independent validation/testing tasks.

---

## Implementation Strategy

1. **Start with US1** (Typography) - Quick MVP, foundational for everything else
2. **Implement US2** (Desktop Nav) - Core navigation functionality
3. **Add US3** (Mobile Nav) - Mobile responsiveness
4. **Apply US4** (Visual Consistency) - Theme integration
5. **Polish** - Accessibility, performance, cross-browser testing

**Estimated Time**: 4-6 hours total

- US1: 30 minutes
- US2: 2 hours
- US3: 1.5 hours
- US4: 30 minutes
- Polish: 1 hour

---

## Notes

- **Motion vs Framer Motion**: Project uses `motion` package (v12.23.24) which is Framer Motion's successor with compatible API
- **No TypeScript**: Project uses JavaScript with JSX, not TypeScript (no .tsx files)
- **No Tests Required**: No test tasks included as not requested in spec
- **Placeholder Content**: Sections show "Coming Soon" - actual content will be implemented in future features
- **Logo**: Existing logo.avif in /content/ directory
- **Existing Components**: Hero.jsx, shimmer-button.jsx, flip-words.jsx already exist and should not be modified
