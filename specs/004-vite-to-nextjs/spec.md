# Feature Specification: Complete Migration from Vite to Next.js

**Feature Branch**: `004-vite-to-nextjs`  
**Created**: November 26, 2025  
**Status**: Draft  
**Input**: User description: "I would like you to help me completely migrate from Vite to Next.js. Also, if there are some old and unneeded folders or files, please remove them to keep the repo clean and minimalistic."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Development Environment Setup (Priority: P1)

A developer clones the repository, installs dependencies, and starts the local development server. The application should load successfully with all existing pages and components functioning identically to the Vite version, but powered by Next.js infrastructure.

**Why this priority**: This is the foundation for all development work. Without a working development environment, no further development or testing can occur.

**Independent Test**: Can be fully tested by running `npm install` and `npm run dev`, navigating to localhost, and verifying that the home page loads with the Hero section, navbar, and all navigation links work correctly.

**Acceptance Scenarios**:

1. **Given** a fresh clone of the repository, **When** developer runs `npm install` and `npm run dev`, **Then** the development server starts without errors and the application is accessible at localhost
2. **Given** the development server is running, **When** developer modifies a React component, **Then** the changes appear immediately without manual refresh (hot reload works)
3. **Given** the application is running, **When** developer navigates to any page (/, /experience, /education, /portfolio, /publications, /references), **Then** all pages load correctly with their existing content and styling

---

### User Story 2 - Production Build and Deployment (Priority: P2)

A developer or CI/CD pipeline builds the application for production deployment. The build process should complete successfully, generate optimized static assets, and the deployed site should be accessible at the GitHub Pages URL with all functionality intact.

**Why this priority**: Production deployment is critical for delivering the site to end users. It must work reliably but can be tested after the development environment is confirmed working.

**Independent Test**: Can be fully tested by running `npm run build`, examining the output directory for generated files, and verifying that the build completes without errors.

**Acceptance Scenarios**:

1. **Given** a configured Next.js project, **When** developer runs `npm run build`, **Then** the build completes successfully without errors and generates optimized production files
2. **Given** a production build is complete, **When** the static export is deployed to GitHub Pages, **Then** the site is accessible at the correct URL and all pages render correctly
3. **Given** the production site is deployed, **When** users navigate between pages, **Then** all navigation works correctly and assets load properly with the correct base path configuration

---

### User Story 3 - Code Quality Maintenance (Priority: P3)

A developer commits changes to the repository. Pre-commit hooks should automatically format code and verify quality standards are met, ensuring consistent code style across the Next.js migration.

**Why this priority**: Code quality tools are important for maintainability but are not blocking for initial functionality testing.

**Independent Test**: Can be fully tested by making a file change, attempting to commit it, and verifying that Prettier formatting runs automatically.

**Acceptance Scenarios**:

1. **Given** a developer has modified files, **When** they attempt to commit changes, **Then** Prettier automatically formats the files and the commit succeeds if formatting is acceptable
2. **Given** the repository is configured, **When** developer runs `npm run format`, **Then** all project files are formatted consistently according to Prettier rules

---

### Edge Cases

- What happens when the base path for GitHub Pages changes?
- How does the system handle navigation to non-existent routes?
- What happens if a page component fails to load or throws an error?
- How does the application behave when JavaScript is disabled in the browser?
- What happens during the build process if there are TypeScript errors in JSX files?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST use Next.js App Router as the primary routing mechanism, replacing React Router
- **FR-002**: System MUST preserve all existing pages (Home, Experience, Education, Portfolio, Publications, References) with identical functionality
- **FR-003**: System MUST maintain the existing component structure (Hero, Navbar, and all UI components)
- **FR-004**: System MUST support static site generation (SSG) for deployment to GitHub Pages
- **FR-005**: System MUST configure the correct base path for GitHub Pages deployment (`/vdanilov/`)
- **FR-006**: System MUST maintain all existing styling with Tailwind CSS v4
- **FR-007**: System MUST preserve hot module replacement (HMR) functionality during development
- **FR-008**: System MUST maintain path aliases (`@/` for src directory) for consistent imports
- **FR-009**: System MUST remove all Vite-specific configuration files and dependencies
- **FR-010**: System MUST remove obsolete files (index.html.legacy, empty app directories, dist folder)
- **FR-011**: System MUST preserve Husky pre-commit hooks with Prettier integration
- **FR-012**: System MUST maintain all existing dependencies (React 19, Framer Motion, FontAwesome, etc.)
- **FR-013**: System MUST provide equivalent npm scripts for development, build, and preview commands
- **FR-014**: System MUST preserve animations using Framer Motion (motion library)
- **FR-015**: System MUST maintain responsive design and mobile-first approach

### Key Entities

- **Page Components**: Six primary page components (Home, Experience, Education, Portfolio, Publications, References) that serve as top-level route handlers
- **UI Components**: Reusable components (Hero, Navbar, flip-words, glow-menu, menu-toggle-icon, shimmer-button) that provide visual and interactive elements
- **Static Assets**: Files in the public directory including images, fonts, and other resources
- **Configuration**: Build and development configuration including Tailwind, PostCSS, and Next.js settings
- **Dependencies**: Node packages required for React, routing, styling, animations, and development tooling

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Developer can start local development environment in under 30 seconds after running `npm install` and `npm run dev`
- **SC-002**: All six existing pages (Home, Experience, Education, Portfolio, Publications, References) are accessible and display identically to the Vite version
- **SC-003**: Production build completes in under 2 minutes without errors or warnings
- **SC-004**: Deployed site on GitHub Pages loads in under 3 seconds on a standard broadband connection
- **SC-005**: Hot reload during development reflects component changes within 1 second
- **SC-006**: Repository size is reduced by at least 20% through removal of obsolete files and dependencies
- **SC-007**: All Prettier formatting rules pass on all project files
- **SC-008**: Zero Vite-specific files remain in the repository (vite.config.js, index.html at root, Vite dependencies)

## Assumptions

- The GitHub Pages deployment uses the repository name as the base path (`/vdanilov/`)
- Static site generation (SSG) is sufficient for all pages (no server-side rendering or API routes needed)
- All existing pages are presentational and do not require dynamic data fetching at build time
- The current Tailwind CSS v4 configuration is compatible with Next.js
- The motion library (Framer Motion) works seamlessly with Next.js App Router
- React 19 is fully compatible with the latest stable Next.js version
- The existing component architecture does not require restructuring beyond file location changes
- Git history and existing feature specs should be preserved during migration

## Dependencies

- Existing feature specifications in specs/001, 002, 003 directories should remain unchanged
- Current GitHub Pages deployment workflow must be updated to work with Next.js static export
- All developers must upgrade local Node.js version to 18+ if not already installed
- The .specify directory and scripts must continue to function with the new structure

## Scope

### In Scope

- Complete migration from Vite to Next.js with App Router
- Removal of all Vite-specific files and dependencies
- Removal of obsolete files (index.html.legacy, empty app directories, dist folder)
- Configuration of Next.js for static export and GitHub Pages deployment
- Preservation of all existing functionality, styling, and animations
- Update of npm scripts for Next.js commands
- Verification that all existing pages and components work identically

### Out of Scope

- Adding new features or pages beyond the existing six pages
- Redesigning the UI or changing styling
- Adding server-side rendering (SSR) or API routes
- Implementing TypeScript migration (keeping JSX files as-is)
- Changing the repository hosting or deployment target
- Modifying the existing component logic or behavior
- Adding new dependencies beyond what Next.js requires
- Restructuring the component architecture beyond necessary file moves
