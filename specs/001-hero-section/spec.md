# Feature Specification: Hero Section with Video

**Feature Branch**: `001-hero-section`
**Created**: 2025-11-21
**Status**: Draft
**Input**: User description: "Implement the first block in the home page with the main information about a hero. Position is the changing text with several positions specified. Also, I have a video instead of picture. Use content/viacheslav-danilov-1.mp4 for that video."

## Clarifications

### Session 2025-11-21

- Q: What are the specific links for contact info and buttons? → A: Email: `mailto:viacheslav.v.danilov@gmail.com`, Phone: `https://wa.me/+34634810041`, Telegram: `https://t.me/ballmaske`, CV: `https://drive.google.com/file/d/1jYs54eFCYc367ZKhWjH1Xfry4_sFI7Ir/view?usp=drive_link`, Projects: `https://vdanilov.com/portfolio/`.

## User Scenarios & Testing

### User Story 1 - Hero Introduction (Priority: P1)

As a visitor, I want to see a compelling introduction with Viacheslav's name, dynamic roles, and a video portrait, so that I get an immediate professional impression.

**Why this priority**: First thing the user sees; establishes identity.

**Independent Test**: Open `index.html`. Verify name is visible. Verify "ML Engineer" text changes/types out other roles. Verify video is playing.

**Acceptance Scenarios**:

1.  **Given** the home page loads, **When** the Hero section appears, **Then** "Viacheslav Danilov, PhD" is clearly visible.
2.  **Given** the role text, **When** observed for a few seconds, **Then** it cycles through different positions (e.g., "ML Engineer", "Researcher").
3.  **Given** the visual area, **When** page loads, **Then** `viacheslav-danilov-1.mp4` plays automatically on loop without sound.

---

### User Story 2 - Quick Actions & Contact (Priority: P2)

As a visitor, I want to easily access contact info and key actions (CV, Projects), so that I can connect or learn more.

**Why this priority**: Conversion points.

**Independent Test**: Click "Download CV" and "View my projects". Check social links.

**Acceptance Scenarios**:

1.  **Given** the CTA buttons, **When** "Download CV" is clicked, **Then** the CV file opens/downloads.
2.  **Given** the contact details, **When** clicking the email or phone, **Then** the appropriate system app opens (mailto/tel).

### Edge Cases

- **Video Load Failure**: If video fails, should show a fallback image or background color? (Assume fallback color/image for now).
- **Reduced Motion**: If user has `prefers-reduced-motion`, disable the typing animation? (Nice to have).
- **Mobile View**: Video and text should stack vertically.

## Requirements

### Functional Requirements

- **FR-001**: Display pre-title "Hi there, I am".
- **FR-002**: Display Name "Viacheslav Danilov, PhD" as H1.
- **FR-003**: Implement a "Typewriter" or "Rotating Text" effect for roles: "ML Engineer", "Data Scientist", "Researcher", "Engineering Manager", "MLOps".
- **FR-004**: Display contact list: Email, Phone, Telegram/Social handle.
- **FR-005**: Display primary button "Download CV" (with icon) and secondary button "View my projects" (with icon).
- **FR-006**: Render a video element using `content/viacheslav-danilov-1.mp4`.
- **FR-007**: Video MUST be muted, autoplay, and loop.
- **FR-008**: Layout MUST be responsive: Single column on mobile, Two columns on desktop (Text left, Video right).

### Key Entities

- **Hero Data**: { Name, Roles[], Contacts[], VideoSource }

## Success Criteria

### Measurable Outcomes

- **SC-001**: **Visual Stability**: No layout shift when text changes (min-height reserved).
- **SC-002**: **Performance**: Video loads without blocking the main thread (use `<video muted playsinline>`).
- **SC-003**: **Responsiveness**: Looks good on 375px (mobile) and 1440px (desktop).
