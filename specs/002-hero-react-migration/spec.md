# Feature Specification: Hero React Migration

**Feature Branch**: `002-hero-react-migration`
**Created**: 2025-11-22
**Status**: Draft
**Input**: User description: "I would like you to help me modify the initial hero block in the home page where my video, name and contacts are. I want you to use components from 21st.dev and take into account the updated constituiton based on React components (Radix UI + Tailwind CSS)"

## User Scenarios & Testing

### User Story 1 - React Infrastructure Setup (Priority: P1)

As a developer, I want the project to be configured with Vite, React, and Tailwind CSS, so that I can build modern components as per the new Constitution.

**Why this priority**: Prerequisite for any React component development.

**Independent Test**: Run `npm run dev`. Verify the development server starts and serves a React application (even if empty).

**Acceptance Scenarios**:

1. **Given** the project root, **When** `npm install` is run, **Then** React, ReactDOM, Vite, and Tailwind dependencies are installed.
2. **Given** the development server is running, **When** accessing `localhost`, **Then** the React entry point loads successfully.
3. **Given** the build command, **When** `npm run build` is executed, **Then** a production-ready bundle is generated in `dist/`.

---

### User Story 2 - Hero Section Implementation (Priority: P2)

As a visitor, I want to see the Hero section with my video, name, and contacts implemented using modern React components, so that the site feels interactive and professional.

**Why this priority**: Core visual feature requested by the user.

**Independent Test**: Open the home page. Verify the Hero section looks identical (or better) than the previous version but is rendered via React.

**Acceptance Scenarios**:

1. **Given** the Hero section, **When** the page loads, **Then** the "Typewriter" effect (or equivalent 21st.dev component) displays the roles.
2. **Given** the video element, **When** the page loads, **Then** it plays automatically, muted, and looped.
3. **Given** the contact links, **When** clicked, **Then** they perform the correct actions (mailto, tel, external links).
4. **Given** the layout, **When** resized to mobile, **Then** it stacks vertically (responsive).

### Edge Cases

- **Video Load Failure**: If the video fails to load, a fallback background should be displayed.
- **JS Disabled**: The site will likely not render (SPA nature), but a `<noscript>` tag should provide basic info.

## Requirements

### Functional Requirements

- **FR-001**: Initialize a Vite + React project structure (`src/main.jsx`, `src/App.jsx`).
- **FR-002**: Configure Tailwind CSS to work with the new React structure.
- **FR-003**: Install `framer-motion`, `clsx`, `tailwind-merge`, and `lucide-react` (for icons) as per Constitution/21st.dev needs.
- **FR-004**: Implement a `Hero` React component.
- **FR-005**: Integrate the **Flip Words** component from Aceternity (via 21st.dev) to replace the custom vanilla JS implementation. (Source: `https://21st.dev/community/components/aceternity/flip-words/default`)
- **FR-006**: Migrate existing content (Video: `content/viacheslav-danilov-1.mp4`, Name: "Viacheslav Danilov, PhD", Contacts) to the React component.
- **FR-007**: Ensure the application mounts into a root DOM node in `index.html`.

### Key Entities

- **HeroProps**: { name: string, roles: string[], videoSrc: string, contacts: Contact[] }

## Success Criteria

### Measurable Outcomes

- **SC-001**: **Modern Stack**: Project successfully builds with Vite and React.
- **SC-002**: **Visual Parity**: The React implementation matches the previous design's layout and content.
- **SC-003**: **Performance**: Lighthouse Performance score > 90 (verifying React hydration doesn't kill perf).
- **SC-004**: **Maintainability**: Hero logic is encapsulated in a single React component file.
