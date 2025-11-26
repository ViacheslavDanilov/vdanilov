# Tasks: Complete Migration from Vite to Next.js

**Input**: Design documents from `/specs/004-vite-to-nextjs/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Tests are NOT included (not requested in feature specification)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1=Dev Environment, US2=Production Build, US3=Code Quality)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Next.js project structure and remove Vite dependencies

- [x] T001 Install Next.js 15.1.8 and remove Vite dependencies from package.json
- [x] T002 [P] Create next.config.mjs with static export and basePath configuration
- [x] T003 [P] Create jsconfig.json for path aliases (`@/` mapping)
- [x] T004 [P] Update postcss.config.mjs for Next.js compatibility
- [x] T005 [P] Update .gitignore to include .next/ and out/ directories
- [x] T006 Create app/ directory structure (layout.jsx, page.jsx, subdirectories)
- [x] T007 Create components/ directory at root level
- [x] T008 Create lib/ directory at root level

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core file migrations and structure changes that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Move src/lib/utils.js to lib/utils.js (no changes to content)
- [x] T010 Move src/index.css to app/globals.css and remove Google Fonts @import
- [x] T011 Create app/layout.jsx with Poppins font configuration using next/font/google
- [x] T012 Import globals.css in app/layout.jsx
- [x] T013 Add metadata export to app/layout.jsx (title, description)
- [x] T014 Update GitHub Actions workflow .github/workflows/deploy.yml to use out/ directory

**Checkpoint**: Foundation ready - component migration can now begin

---

## Phase 3: User Story 1 - Development Environment Setup (Priority: P1) 🎯 MVP

**Goal**: Developer can run `npm install` and `npm run dev` to start local development server with all pages and components working identically to Vite version

**Independent Test**: Run `npm install && npm run dev`, navigate to http://localhost:3000/, verify home page loads with Hero section, navbar works, all navigation links function correctly

### Component Migration for User Story 1

- [x] T015 [P] [US1] Add 'use client' directive to components/ui/flip-words.jsx and update motion import
- [x] T016 [P] [US1] Add 'use client' directive to components/ui/menu-toggle-icon.jsx and update motion import
- [x] T017 [P] [US1] Add 'use client' directive to components/ui/shimmer-button.jsx and update motion import
- [x] T018 [P] [US1] Add 'use client' directive to components/ui/glow-menu.jsx and verify event handlers
- [x] T019 [US1] Move src/components/ to components/ preserving ui/ subdirectory structure
- [x] T020 [US1] Add 'use client' to components/Hero.jsx and update video source path from import.meta.env.BASE_URL to direct /hero.mp4 path
- [x] T021 [US1] Add 'use client' to components/Navbar.jsx, replace React Router imports with next/navigation (useRouter, usePathname), replace useNavigate with router.push, replace useLocation with usePathname, update logo image path
- [x] T022 [US1] Update all component imports in components/Navbar.jsx to use @/ path alias

### Page Migration for User Story 1

- [x] T023 [P] [US1] Create app/page.jsx from src/pages/Home.jsx content (Server Component, no 'use client')
- [x] T024 [P] [US1] Create app/experience/page.jsx from src/pages/Experience.jsx (Server Component)
- [x] T025 [P] [US1] Create app/education/page.jsx from src/pages/Education.jsx (Server Component)
- [x] T026 [P] [US1] Create app/portfolio/page.jsx from src/pages/Portfolio.jsx (Server Component)
- [x] T027 [P] [US1] Create app/publications/page.jsx from src/pages/Publications.jsx (Server Component)
- [x] T028 [P] [US1] Create app/references/page.jsx from src/pages/References.jsx (Server Component)
- [x] T029 [US1] Update all page component imports to use @/ path alias for components

### Cleanup for User Story 1

- [x] T030 [US1] Remove src/App.jsx (routing logic moved to app/layout.jsx)
- [x] T031 [US1] Remove src/main.jsx (entry point handled by Next.js)
- [x] T032 [US1] Remove index.html from root (Next.js generates HTML)
- [x] T033 [US1] Remove index.html.legacy from root
- [x] T034 [US1] Remove vite.config.js
- [x] T035 [US1] Remove src/ directory after confirming all contents moved
- [x] T036 [US1] Remove empty app/experience/, app/education/, app/portfolio/, app/publications/, app/references/ directories (the old ones, not the new page.jsx files)
- [x] T037 [US1] Remove dist/ folder if it exists

### Development Server Validation for User Story 1

- [x] T038 [US1] Start development server with `npm run dev` and verify no errors
- [x] T039 [US1] Test home page loads at http://localhost:3000/
- [x] T040 [US1] Test navigation to all pages (/, /experience, /education, /portfolio, /publications, /references)
- [x] T041 [US1] Test mobile menu toggle works in responsive view
- [x] T042 [US1] Test Hero section animations work (FlipWords, ShimmerButton)
- [x] T043 [US1] Test hot reload by modifying a component and verifying instant update

**Checkpoint**: At this point, User Story 1 (Development Environment) should be fully functional and independently testable

---

## Phase 4: User Story 2 - Production Build and Deployment (Priority: P2)

**Goal**: Developer or CI/CD pipeline can run `npm run build` to create production-ready static export with correct basePath for GitHub Pages deployment

**Independent Test**: Run `npm run build`, verify build completes without errors, examine out/ directory for generated files with /vdanilov basePath

### Production Build Configuration for User Story 2

- [x] T044 [US2] Verify next.config.mjs has output: 'export' and basePath: '/vdanilov' for production
- [x] T045 [US2] Verify next.config.mjs has images.unoptimized: true for static export
- [x] T046 [US2] Verify next.config.mjs has trailingSlash: true for GitHub Pages compatibility

### Production Build Testing for User Story 2

- [x] T047 [US2] Run `npm run build` and verify build completes successfully
- [x] T048 [US2] Verify out/ directory is created with HTML files for all routes
- [x] T049 [US2] Verify all asset paths in out/ include /vdanilov basePath
- [x] T050 [US2] Test production build locally with `npx serve out` at http://localhost:3000/vdanilov/
- [x] T051 [US2] Test all navigation links work with basePath in production build
- [x] T052 [US2] Test assets (logo.png, hero.mp4) load correctly with basePath
- [x] T053 [US2] Verify no console errors in production build

### GitHub Pages Deployment for User Story 2

- [x] T054 [US2] Verify .github/workflows/deploy.yml uses publish_dir: ./out (changed from ./dist)
- [x] T055 [US2] Verify .github/workflows/deploy.yml sets NODE_ENV=production during build
- [ ] T056 [US2] Commit all changes and push to trigger GitHub Actions deployment
- [ ] T057 [US2] Monitor GitHub Actions workflow for successful build and deploy
- [ ] T058 [US2] Verify deployed site is accessible at https://viacheslavdanilov.github.io/vdanilov/
- [ ] T059 [US2] Test all pages load correctly on deployed site
- [ ] T060 [US2] Test navigation works on deployed site
- [ ] T061 [US2] Test mobile responsiveness on deployed site

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently (dev environment and production deployment)

---

## Phase 5: User Story 3 - Code Quality Maintenance (Priority: P3)

**Goal**: Pre-commit hooks automatically format code with Prettier, ensuring consistent code style across Next.js migration

**Independent Test**: Make a file change, attempt to commit, verify Prettier runs automatically and commit succeeds

### Code Quality Configuration for User Story 3

- [ ] T062 [US3] Verify package.json preserves Husky pre-commit hooks
- [ ] T063 [US3] Verify package.json preserves lint-staged configuration
- [ ] T064 [US3] Verify package.json preserves format and check scripts
- [ ] T065 [US3] Verify .prettierignore includes .next/, out/, node_modules/

### Code Quality Testing for User Story 3

- [ ] T066 [US3] Run `npm run format` and verify all files are formatted
- [ ] T067 [US3] Run `npm run check` and verify no formatting issues
- [ ] T068 [US3] Make a minor change to a file (e.g., add a comment)
- [ ] T069 [US3] Run `git add` and `git commit` to test pre-commit hook
- [ ] T070 [US3] Verify Prettier runs automatically during commit
- [ ] T071 [US3] Verify commit succeeds if formatting is acceptable

**Checkpoint**: All user stories should now be independently functional (dev, build, code quality)

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and optimizations affecting multiple user stories

- [ ] T072 [P] Update README.md with Next.js instructions (replace Vite references)
- [ ] T073 [P] Update README.md with new npm scripts (dev, build, preview commands)
- [ ] T074 Verify all Tailwind classes render correctly in production build
- [ ] T075 Verify all FontAwesome icons display correctly
- [ ] T076 Verify all Framer Motion animations work smoothly
- [ ] T077 Test accessibility with keyboard navigation on all pages
- [ ] T078 Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] T079 Run Lighthouse audit and verify scores ≥90 (Performance, Accessibility, Best Practices, SEO)
- [ ] T080 Verify Core Web Vitals meet targets (LCP <2.5s, INP <200ms, CLS <0.1)
- [ ] T081 [P] Run quickstart.md validation steps
- [ ] T082 [P] Update constitution.md if any amendments needed based on migration learnings

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (Phase 1) - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User Story 1 (Dev Environment) can start after Foundational
  - User Story 2 (Production Build) depends on User Story 1 completion
  - User Story 3 (Code Quality) can run in parallel with User Story 2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Dev Environment)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2 - Production Build)**: Depends on User Story 1 completion (needs working dev environment to build)
- **User Story 3 (P3 - Code Quality)**: Can start after Foundational (Phase 2) - Independent of other stories

### Within Each User Story

**User Story 1 (Development Environment):**

- Component migrations (T015-T022) can run in parallel [P]
- Page migrations (T023-T029) can run in parallel [P]
- Cleanup tasks (T030-T037) must run AFTER component/page migrations
- Validation tasks (T038-T043) must run AFTER cleanup

**User Story 2 (Production Build):**

- Configuration verification (T044-T046) can run in parallel [P]
- Build testing (T047-T053) must run sequentially
- Deployment tasks (T054-T061) must run sequentially

**User Story 3 (Code Quality):**

- Configuration verification (T062-T065) can run in parallel [P]
- Testing tasks (T066-T071) must run sequentially

### Parallel Opportunities

- **Phase 1 Setup**: All tasks (T002-T005, T008) can run in parallel after T001
- **Phase 2 Foundational**: Tasks T009-T013 can run in parallel, T014 depends on T002
- **User Story 1 Components**: Tasks T015-T018 can run in parallel (different files)
- **User Story 1 Pages**: Tasks T023-T028 can run in parallel (different files)
- **User Story 1 Cleanup**: Tasks T030-T037 can run in parallel (deleting different files)
- **User Story 2 Config**: Tasks T044-T046 can verify in parallel
- **User Story 3 Config**: Tasks T062-T065 can verify in parallel
- **Phase 6 Polish**: Tasks T072-T073, T081-T082 can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all Client Component updates together (Phase 3, User Story 1):
Task T015: "Add 'use client' to components/ui/flip-words.jsx"
Task T016: "Add 'use client' to components/ui/menu-toggle-icon.jsx"
Task T017: "Add 'use client' to components/ui/shimmer-button.jsx"
Task T018: "Add 'use client' to components/ui/glow-menu.jsx"

# Launch all page migrations together (Phase 3, User Story 1):
Task T023: "Create app/page.jsx from src/pages/Home.jsx"
Task T024: "Create app/experience/page.jsx"
Task T025: "Create app/education/page.jsx"
Task T026: "Create app/portfolio/page.jsx"
Task T027: "Create app/publications/page.jsx"
Task T028: "Create app/references/page.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T008)
2. Complete Phase 2: Foundational (T009-T014) - CRITICAL checkpoint
3. Complete Phase 3: User Story 1 (T015-T043)
4. **STOP and VALIDATE**: Test development server works completely
5. If validation passes, you have a working MVP!

### Incremental Delivery

1. Setup + Foundational → Foundation ready (checkpoint)
2. Add User Story 1 → Test independently → **MVP achieved!** (local dev works)
3. Add User Story 2 → Test independently → **Production deployment works!**
4. Add User Story 3 → Test independently → **Code quality automation works!**
5. Polish phase → **Production-ready migration complete!**

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup (Phase 1) + Foundational (Phase 2) together
2. Once Foundational is done:
   - Developer A: User Story 1 (T015-T043) - Dev environment
   - Developer B: Can prepare User Story 3 configs (T062-T065) in parallel
3. After US1 complete:
   - Developer A: User Story 2 (T044-T061) - Production build
   - Developer B: User Story 3 testing (T066-T071) - Code quality
4. Both converge on Polish phase (T072-T082)

---

## Implementation Notes

### Critical Success Factors

1. **Foundational Phase Completion**: Phase 2 must be 100% complete before starting user stories
2. **'use client' Directive**: Must be first line in all Client Components (before imports)
3. **Path Aliases**: All imports must use `@/` prefix for components and lib
4. **Asset Paths**: Remove all `import.meta.env.BASE_URL` references, use direct `/path` format
5. **Navigation Hooks**: Replace React Router hooks with Next.js navigation hooks
6. **Font Configuration**: Use next/font/google in layout.jsx, not @import in CSS

### Common Pitfalls to Avoid

- ❌ Forgetting 'use client' directive on interactive components
- ❌ Placing 'use client' after imports instead of at the top
- ❌ Using relative paths instead of @/ alias
- ❌ Keeping import.meta.env.BASE_URL references
- ❌ Using React Router hooks instead of next/navigation
- ❌ Not updating GitHub Actions workflow publish_dir
- ❌ Testing only in development without testing production build

### Validation Checkpoints

- ✅ After T008: Directory structure matches target structure in plan.md
- ✅ After T014: Foundation complete, can start user story work
- ✅ After T043: Development server fully functional (MVP achieved)
- ✅ After T061: Production deployment fully functional
- ✅ After T071: Code quality automation fully functional
- ✅ After T082: All polish items complete, migration finalized

---

## Task Count Summary

- **Total Tasks**: 82
- **Phase 1 (Setup)**: 8 tasks
- **Phase 2 (Foundational)**: 6 tasks (BLOCKING)
- **Phase 3 (User Story 1 - P1)**: 29 tasks (MVP)
- **Phase 4 (User Story 2 - P2)**: 18 tasks
- **Phase 5 (User Story 3 - P3)**: 10 tasks
- **Phase 6 (Polish)**: 11 tasks

**Parallel Opportunities**: 29 tasks marked [P] can run in parallel within their phase

**MVP Scope** (Recommended first delivery): Phase 1 + Phase 2 + Phase 3 = 43 tasks

**Estimated Effort**:

- Setup + Foundational: 2-3 hours
- User Story 1 (Dev Environment): 4-6 hours
- User Story 2 (Production Build): 2-3 hours
- User Story 3 (Code Quality): 1-2 hours
- Polish: 2-3 hours
- **Total**: 11-17 hours for complete migration

---

**Task Generation Complete**: November 26, 2025  
**Ready for Implementation**: All 82 tasks defined with clear dependencies and parallel opportunities
