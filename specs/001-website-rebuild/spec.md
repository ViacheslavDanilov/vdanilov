# Feature Specification: Website Rebuild

**Feature Branch**: `001-website-rebuild`
**Created**: 2025-11-21
**Status**: Draft
**Input**: User description: "Rebuild website with modern stack (HTML, Tailwind, JS) and multi-page structure"

## User Scenarios & Testing

### User Story 1 - Home Page & Core Navigation (Priority: P1)

As a visitor, I want to land on a professional home page that gives me a quick overview of Viacheslav's profile and allows me to navigate to other sections, so that I can immediately understand his expertise and find relevant information.

**Why this priority**: This is the entry point and establishes the brand. Without this, there is no website.

**Independent Test**: Can be tested by opening `index.html`, verifying the Hero section, Bio, Metrics, and clicking all Navigation links (even if they lead to placeholders initially).

**Acceptance Scenarios**:

1.  **Given** a visitor lands on the root URL, **When** the page loads, **Then** they see the Hero section with name, roles, and "Download CV" CTA.
2.  **Given** the Home page, **When** scrolling down, **Then** the "Numbers Speak" metrics and "Experience Summary" are visible.
3.  **Given** the mobile view, **When** clicking the hamburger menu, **Then** the navigation drawer opens with links to all sections.

---

### User Story 2 - Professional Profile (Experience & Education) (Priority: P2)

As a recruiter or peer, I want to view detailed professional experience and academic background, so that I can evaluate qualifications.

**Why this priority**: Critical for the professional purpose of the site.

**Independent Test**: Verify `experience.html` and `education.html` render correct data structures (timelines, cards) and are responsive.

**Acceptance Scenarios**:

1.  **Given** the Experience page, **When** viewing the timeline, **Then** roles are separated into "Core Roles" and "Visiting Roles".
2.  **Given** a Job Card, **When** viewed, **Then** it displays Company, Dates, Location, and Key Achievements.
3.  **Given** the Education page, **When** viewed, **Then** it lists PhD, MSc, and BSc degrees with institution details.

---

### User Story 3 - Portfolio & Project Showcase (Priority: P2)

As a potential client or collaborator, I want to browse projects and read case studies, so that I can see practical applications of skills.

**Why this priority**: Demonstrates capability beyond titles.

**Independent Test**: Verify `portfolio.html` lists projects and clicking a project leads to a `project-detail.html` (or specific project page).

**Acceptance Scenarios**:

1.  **Given** the Portfolio page, **When** loaded, **Then** a grid/list of Project Cards (Image + Title + Summary) is displayed.
2.  **Given** a Project Card, **When** clicked, **Then** the user is navigated to the detailed project view.
3.  **Given** a Project Detail page, **When** viewed, **Then** it shows Problem, Approach, Results, and visual assets.

---

### User Story 4 - Academic Output (Publications) (Priority: P3)

As a researcher, I want to access a list of publications and citations, so that I can reference or read the work.

**Why this priority**: Important for the academic/research persona but less critical for general industry roles.

**Independent Test**: Verify `publications.html` renders the list with external links.

**Acceptance Scenarios**:

1.  **Given** the Publications page, **When** loaded, **Then** a list of papers with Authors, Year, and Venue is shown.
2.  **Given** a publication entry, **When** clicking "PDF" or "DOI", **Then** the external resource opens in a new tab.

---

### User Story 5 - Engagement (Contact & References) (Priority: P3)

As a visitor, I want to read testimonials and find contact information, so that I can validate reputation and get in touch.

**Why this priority**: Facilitates the final conversion step (contact).

**Independent Test**: Verify `contact.html` form/links and `references.html` testimonials.

**Acceptance Scenarios**:

1.  **Given** the References page, **When** loaded, **Then** testimonial cards with Name, Role, and Quote are displayed.
2.  **Given** the Contact page, **When** submitting the form (or clicking mailto), **Then** the action is initiated (or simulated for static site).

### Edge Cases

- **Mobile Navigation**: What happens if the menu is open and the window is resized to desktop? (Should close/reset).
- **Missing Data**: How do cards render if an optional field (e.g., project image) is missing? (Should have fallback or graceful layout).
- **Broken Links**: How are external link failures handled? (Standard 404 or target=\_blank behavior).

## Requirements

### Functional Requirements

#### Global

- **FR-001**: The site MUST use a responsive Navbar with links: Home, Experience, Education, Portfolio, Publications, References, Contact.
- **FR-002**: The site MUST have a Footer with copyright and social icons.
- **FR-003**: All pages MUST be built with semantic markup and ensure accessibility compliance.

#### Home Page

- **FR-004**: Hero section MUST display Name, Roles, "Download CV" button, and "View Projects" button.
- **FR-005**: "Numbers Speak" section MUST display at least 4 key metrics (e.g., Years Exp, Projects).
- **FR-006**: Experience Summary MUST show a subset (e.g., top 3) of recent roles.

#### Experience Page

- **FR-007**: MUST display a timeline or list of professional roles.
- **FR-008**: MUST categorize roles into "Core" and "Visiting" (or similar distinction).
- **FR-009**: Job cards MUST include: Title, Company, Location, Date Range, Description/Bullets.

#### Education Page

- **FR-010**: MUST list academic degrees in reverse chronological order.
- **FR-011**: Education entries MUST include: Degree Name, Institution, Location, Date Range.

#### Portfolio Page

- **FR-012**: MUST display a grid or list of Project Cards.
- **FR-013**: Project Cards MUST link to individual Project Detail pages.
- **FR-014**: Project Detail pages MUST support: Title, Problem, Approach, Results, Images.

#### Publications Page

- **FR-015**: MUST list research papers with standard citation format.
- **FR-016**: MUST provide external links (PDF, ORCID, ResearchGate) where available.

#### References Page

- **FR-017**: MUST display testimonials with Author Name, Role, and Quote.

#### Contact Page

- **FR-018**: MUST provide direct contact methods (Email, WhatsApp/Messenger links).
- **FR-019**: MAY include a contact form (static implementation or mailto wrapper).

### Key Entities

- **Job Role**: { Title, Company, Location, StartDate, EndDate, Type (Core/Visiting), Description, TechStack }
- **Degree**: { DegreeName, Institution, Location, StartDate, EndDate, Thesis/Details }
- **Project**: { Title, Summary, Problem, Approach, Results, ThumbnailUrl, Images[], CaseStudyUrl }
- **Publication**: { Title, Authors, Year, Venue, Urls[] }
- **Testimonial**: { AuthorName, AuthorRole, Quote, Date }

## Assumptions & Dependencies

- **Content Availability**: All text content, images, and project details will be sourced from the existing website or provided by the user.
- **Hosting**: The site will be hosted on a platform supporting static site deployment (e.g., GitHub Pages, Vercel).
- **Browser Support**: Support is required for the latest 2 major versions of modern browsers (Chrome, Firefox, Safari, Edge).

## Success Criteria

### Measurable Outcomes

- **SC-001**: **Performance**: Lighthouse Performance score > 90 on Desktop and Mobile.
- **SC-002**: **Accessibility**: Lighthouse Accessibility score > 90 (WCAG 2.1 AA compliance).
- **SC-003**: **Responsiveness**: Layout adapts seamlessly to Mobile (375px), Tablet (768px), and Desktop (1024px+) viewports without horizontal scroll.
- **SC-004**: **Completeness**: All 7 defined pages exist and contain the specified sections.
