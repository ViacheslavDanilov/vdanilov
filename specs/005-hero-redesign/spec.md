# Feature Specification: Hero Section Redesign

**Feature Branch**: `005-hero-redesign`  
**Created**: November 26, 2025  
**Status**: Draft  
**Input**: User description: "I would like to modify the hero section the following way: Remove 'Hi there, I am', Remove 'Email', 'WhatsApp', 'Telegram', Add a tag line 'Science-Driven AI. Engineering-Led Execution. Technically Inspired Leadership.', Keep one button - 'Download CV', Use animated gradient border button style from 21st.dev"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Simplified Hero Message (Priority: P1)

A visitor lands on the homepage and immediately sees a clean, professional introduction with Viacheslav Danilov's name, role, and a compelling tagline that communicates his professional positioning, without visual clutter from contact methods.

**Why this priority**: The hero section is the first impression and primary value proposition. A clear, focused message increases engagement and reduces cognitive load.

**Independent Test**: Can be fully tested by loading the homepage and verifying the tagline, name, and role are clearly visible without contact links cluttering the view. Delivers immediate professional positioning.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage, **When** they view the hero section, **Then** they see "Viacheslav Danilov, PhD" as the main heading
2. **Given** a visitor lands on the homepage, **When** they view the hero section, **Then** they see the FlipWords animation with roles (Tech Lead, Engineering Manager, Research Scientist)
3. **Given** a visitor lands on the homepage, **When** they view the hero section, **Then** they see the tagline "Science-Driven AI. Engineering-Led Execution. Technically Inspired Leadership." displayed prominently
4. **Given** a visitor lands on the homepage, **When** they view the hero section, **Then** they do NOT see "Hi there, I am" text
5. **Given** a visitor lands on the homepage, **When** they view the hero section, **Then** they do NOT see Email, WhatsApp, or Telegram contact links

---

### User Story 2 - Premium Call-to-Action (Priority: P2)

A visitor wants to download Viacheslav's CV and is drawn to a single, visually striking button with an animated gradient border effect that stands out without being overwhelming.

**Why this priority**: A single, well-designed CTA improves conversion by reducing choice paralysis. The animated effect adds a premium feel matching the professional positioning.

**Independent Test**: Can be tested by observing the Download CV button renders with animated gradient border, is clickable, and successfully opens the CV in a new tab.

**Acceptance Scenarios**:

1. **Given** a visitor views the hero section, **When** they see the call-to-action area, **Then** they see exactly one button labeled "Download CV"
2. **Given** a visitor views the hero section, **When** they observe the Download CV button, **Then** they see an animated gradient border effect (spinning conic gradient with purple/pink colors)
3. **Given** a visitor hovers over the Download CV button, **When** the hover state activates, **Then** they see visual feedback (gradient intensification or other hover effect)
4. **Given** a visitor clicks the Download CV button, **When** the click event fires, **Then** the CV opens in a new browser tab
5. **Given** a visitor views the hero section, **When** they look for other buttons, **Then** they do NOT see the "View my projects" button

---

### Edge Cases

- What happens when the user's browser doesn't support CSS animations for the gradient border? (Fallback: static border with similar styling)
- What happens when the CV link is broken or unavailable? (Current behavior: browser handles broken link)
- How does the button render on mobile devices with smaller screens? (Should remain readable and touchable with proper spacing)
- What happens if JavaScript is disabled? (FlipWords animation won't work, but static role text should be visible)

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST display "Viacheslav Danilov, PhD" as the main heading in the hero section
- **FR-002**: System MUST display the FlipWords animation showing rotating roles (Tech Lead, Engineering Manager, Research Scientist)
- **FR-003**: System MUST display the tagline "Science-Driven AI. Engineering-Led Execution. Technically Inspired Leadership." below the role animation
- **FR-004**: System MUST NOT display the text "Hi there, I am"
- **FR-005**: System MUST NOT display Email, WhatsApp, or Telegram contact links in the hero section
- **FR-006**: System MUST display exactly one call-to-action button labeled "Download CV"
- **FR-007**: System MUST NOT display the "View my projects" button in the hero section
- **FR-008**: The Download CV button MUST implement an animated gradient border effect using a spinning conic gradient
- **FR-009**: The Download CV button MUST open the CV link in a new browser tab when clicked
- **FR-010**: The hero section MUST maintain the existing video element with the circular border on the right side (desktop) or below (mobile)
- **FR-011**: The button animation MUST use a conic gradient with purple-to-pink color scheme matching the 21st.dev reference implementation
- **FR-012**: The button MUST maintain accessibility with proper ARIA labels and keyboard navigation support

### Key Entities

- **Hero Section Component**: The main landing section containing the introduction, tagline, CTA button, and video element
- **Animated Button Component**: A new reusable button component with spinning gradient border effect, potentially extracted for use elsewhere
- **Tagline Text**: Static text element displaying the professional positioning statement

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Hero section loads and displays correctly on all major browsers (Chrome, Firefox, Safari, Edge)
- **SC-002**: Tagline text is clearly readable with appropriate typography and spacing
- **SC-003**: Download CV button has a visible animated gradient border that continuously animates (2-3 second spin cycle)
- **SC-004**: Button click successfully opens CV in new tab 100% of the time
- **SC-005**: Hero section maintains responsive layout on mobile (320px), tablet (768px), and desktop (1024px+) viewports
- **SC-006**: No "Hi there, I am" text is visible in the rendered output
- **SC-007**: No Email, WhatsApp, or Telegram links are visible in the hero section
- **SC-008**: Only one CTA button is present in the hero section
- **SC-009**: Button meets WCAG 2.1 AA accessibility standards for color contrast and interactive elements
- **SC-010**: Page load performance is not degraded by more than 5% compared to current implementation

## Assumptions

- The CV link URL remains unchanged and accessible
- The existing video file (hero.mp4) continues to be used
- The FlipWords component continues to function as-is
- The 21st.dev button style can be adapted to work with the existing Tailwind CSS setup
- The animated gradient border effect is compatible with the target browsers (modern browsers with CSS animation support)
- Contact information will be available elsewhere on the site (footer, contact page, etc.)

## Dependencies

- Existing FlipWords component (`@/components/ui/flip-words`)
- FontAwesome icon library for the download icon
- Tailwind CSS for styling
- Motion/Framer Motion (if used for additional animations)
- Current CV hosting location remains accessible

## Out of Scope

- Creating a new contact page or section
- Updating the CV document itself
- Modifying the video content or source file
- Changing the FlipWords animation behavior or role list
- Implementing analytics tracking for button clicks
- A/B testing different tagline variations
- Creating additional button variants or color schemes
- Modifying other sections of the homepage
