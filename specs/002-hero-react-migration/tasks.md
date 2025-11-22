---
description: "Task list for Hero React Migration"
---

# Tasks: Hero React Migration

**Input**: Design documents from `/specs/002-hero-react-migration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Tests are OPTIONAL and not explicitly requested in the spec, so manual verification is assumed.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize project dependencies (react, vite, tailwindcss, motion, etc.) in `package.json`
- [x] T002 [P] Create Vite configuration in `vite.config.js`
- [x] T003 [P] Create Tailwind and PostCSS configuration in `tailwind.config.js` and `postcss.config.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 [P] Create utility helper for class merging in `src/lib/utils.js`
- [ ] T005 [P] Create global CSS with Tailwind directives in `src/index.css`
- [ ] T006 Create Vite entry point HTML in `index.html` (replacing existing)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - React Infrastructure Setup (Priority: P1) 🎯 MVP

**Goal**: Configure Vite, React, and Tailwind CSS so that I can build modern components.

**Independent Test**: Run `npm run dev`. Verify the development server starts and serves a React application.

### Implementation for User Story 1

- [ ] T007 [US1] Create React entry point in `src/main.jsx`
- [ ] T008 [US1] Create root App component in `src/App.jsx`
- [ ] T009 [US1] Add build and dev scripts to `package.json`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (React app runs)

---

## Phase 4: User Story 2 - Hero Section Implementation (Priority: P2)

**Goal**: Hero section with video, name, and contacts implemented using modern React components.

**Independent Test**: Open the home page. Verify the Hero section looks identical (or better) than the previous version but is rendered via React.

### Implementation for User Story 2

- [ ] T010 [P] [US2] Create Flip Words component in `src/components/ui/flip-words.jsx`
- [ ] T011 [US2] Create Hero component in `src/components/Hero.jsx`
- [ ] T012 [US2] Integrate Hero component into App in `src/App.jsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T013 Clean up legacy files (e.g., old JS files if unused) in `js/`
- [ ] T014 Verify responsive layout on mobile in `src/components/Hero.jsx`
- [ ] T015 Verify video playback and fallback in `src/components/Hero.jsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for the App structure to mount into.

### Parallel Opportunities

- T002 and T003 can run in parallel.
- T004 and T005 can run in parallel.
- T010 (Flip Words) and T011 (Hero) can be started in parallel, though Hero depends on Flip Words for final integration.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Ensure `npm run dev` shows a working React page.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → React App Running
3. Add User Story 2 → Test independently → Hero Section Visible
