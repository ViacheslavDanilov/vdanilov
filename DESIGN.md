---
name: Viacheslav Danilov Portfolio
description: A dark, glass-and-glow professional record for a researcher and engineering lead.
colors:
  ink: "#0a0e14"
  card-slate: "#151a1f"
  paper-light: "#f5f5f5"
  signal-cyan: "#03b1fb"
  text-soft: "#d1d5db"
  text-muted: "#9ca3af"
  badge-blue: "#51a2ff"
  badge-violet: "#a684ff"
  badge-teal: "#00d5be"
  badge-cyan: "#00d3f2"
  badge-sky: "#00bcff"
typography:
  display:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
  title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  lg: "8px"
  xl: "12px"
  "2xl": "16px"
  "3xl": "24px"
  glow: "14px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "96px"
components:
  nav-pill:
    backgroundColor: "rgba(255,255,255,0.10)"
    textColor: "{colors.text-soft}"
    rounded: "{rounded.full}"
    height: "56px"
  nav-link-active:
    backgroundColor: "rgba(3,177,251,0.15)"
    textColor: "{colors.signal-cyan}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  button-glass:
    backgroundColor: "transparent"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.full}"
    height: "56px"
    padding: "0 40px"
  glow-card:
    backgroundColor: "rgba(153,153,153,0.06)"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.2xl}"
    padding: "20px"
  badge:
    backgroundColor: "rgba(21,93,252,0.20)"
    textColor: "{colors.badge-blue}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  keyword-highlight:
    backgroundColor: "rgba(3,177,251,0.10)"
    textColor: "{colors.signal-cyan}"
    rounded: "{rounded.3xl}"
    padding: "0 16px"
  tab-selected:
    backgroundColor: "rgba(3,177,251,0.20)"
    rounded: "{rounded.full}"
    padding: "8px 16px"
---

# Design System: Viacheslav Danilov Portfolio

## Overview

**Creative North Star: "The Night Ledger"**

A near-black page with one cool cyan signal. Content sits on faint glass panels that light up under the pointer, the way a ledger page answers a finger running down it. The site is dark-only today; a light theme is planned beside it, so colour roles below are named by role, not by "dark".

The tone is calm and exact. Text is dense and factual, because readers come to check a record: publications, roles, references. Decoration is limited to glass, a soft glow, and one accent. Nothing competes with the facts.

**Key Characteristics:**

- One accent (signal cyan) on a near-black ground, with soft grey text tiers.
- Glass surfaces: translucent fills, hairline borders, backdrop blur.
- Pill shapes for controls, 16px rounding for cards.
- Pointer-following glow on cards, desktop only.
- Poppins throughout, one family.

## Colors

A restrained dark palette: ink ground, slate cards, one cyan accent, and a cool badge set for category tags.

### Primary

- **Signal Cyan** (#03b1fb): active nav item, bullets, keyword highlights, link hover, the accent bar before section headings, tab selection. It is the only action colour.

### Secondary

- **Badge hues** (blue, violet, teal, cyan, sky at the 400 step): category badges only, each on a 20% tint of its 600 step (500 for sky) with a 40% border. They sort content and never signal action. The hex values here are approximations of the Tailwind v4 OKLCH palette. A sixth variant, `teal-blur`, sits on portfolio card images: Ink at 30% with backdrop blur, teal 400 text and a teal 500 30% border.

### Neutral

- **Ink** (#0a0e14): page background.
- **Card Slate** (#151a1f): card and logo-tile fill, often at 30% or 50% opacity.
- **Paper Light** (#f5f5f5): primary text, headings, button text.
- **Text Soft** (#d1d5db): inactive nav, tagline. Body copy mostly uses the Tailwind 200 and 300 greys.
- **Text Muted** (#9ca3af): dates, locations, secondary lines.
- **Glass lines**: the glow card border is 1.5px in the same 6% grey as its fill. Logo tiles and tab rails use Paper Light at 10%, the mobile menu white at 10%, and the nav pill white at 20%.

### Named Rules

**The One Signal Rule.** Cyan is the only accent for state and emphasis. A new surface does not introduce a second action colour.
**The Role Tint Rule.** Accent fills behind text are tints (10% highlight, 15 to 20% active, 30% border, 60% on the selected tab). Solid cyan is for small marks (list bullets, the section accent bar), the glass button focus ring and the single 404 home button, which carries dark text.

## Typography

**Display Font:** Poppins (system-ui fallback)
**Body Font:** Poppins
**Label/Mono Font:** none; labels are Poppins in uppercase.

**Character:** Geometric and friendly, kept firm by heavy weights on titles and tight tracking on the page title.

### Hierarchy

- **Display** (600, 2.25rem to 3rem, tight tracking): the page name in the home hero.
- **Headline** (700, 1.875rem to 2.25rem): home section headings.
- **Title** (600, 1.25rem): project page section headings, with the accent bar.
- **Body** (400, 0.875rem to 1rem, line height 1.625): card and prose text in the grey tiers. Most body copy uses `leading-relaxed`, so 1.625 is the recorded value. Prose blocks cap at max-w-5xl or narrower.
- **Label** (600, 0.75rem, 0.05em, uppercase): footer column heads. Experience and education card titles are bold uppercase with 0.05em tracking. Company names are 0.875rem, 500, uppercase. Glass button text is 0.875rem, 500, in normal case.

### Named Rules

**The Weight Carries Rank Rule.** Hierarchy comes from weight and colour (light vs grey), with few size steps.

## Layout

Centred containers: max-w-7xl for the home sections (max-w-5xl for the client logos) and the list pages (experience, education, publications, references, portfolio), max-w-5xl for project pages, 24px side padding. Home sections have 48px of padding above and below and no gap between them, so below lg the content of neighbours sits 96px apart. From lg each home screen is at least one screen tall (`svh`, capped at 72rem so a very tall screen is not left empty) with its content centred. The hero is shorter by the page's 96px top padding, so it fills the first screen under the navbar. The client logos sit in a bordered grid with plus marks at the inner corners: four columns from md, two on phones, in cells 112px tall (96px on phones) with logos at most 52px tall. They are white monochrome files (`public/clients/*-mono.svg`) at `brightness-[.96]`, the same near-white as the section heading (`#f5f5f5`), with no hover change beyond the cell tint. A light theme should use the colour files beside them, with the white parts of the BIDMC, Huawei, VHIR and IHU logos redrawn dark (they were drawn for a dark page and nearly vanish on a light one), and should swap them by a theme attribute, not by the system setting. Card grids are one column on phones. Experience, education, publications and the home project row go to two columns from lg. References, portfolio and home expertise go to two from md and three from lg. Education certificates go to two from lg and three from xl. Gaps are 32px on experience, education and publications, and 24px on references, portfolio, certificates and the home grids. The hero is a text and portrait row from md, stacked on phones. Experience, education and certificate cards centre their text on phones and left-align it from md. Reference and team cards stay centred at every width, and home project cards switch at sm. Breakpoints are Tailwind defaults (sm 640px, md 768px, lg 1024px, xl 1280px). Body text is justified by owner decision.

## Elevation & Depth

Depth is mostly tonal and translucent: glass fills, blur, and hairline borders. Real shadows are few.

### Shadow Vocabulary

- **Card lift** (`box-shadow: 0 0.5rem 1rem -0.5rem rgba(0,0,0,0.3)`): glow cards.
- **Nav and menu** (`shadow-lg`): floating pill and mobile menu.
- **Portrait** (`shadow-2xl`): hero portrait.
- **Glass button inset stack**: layered inset white highlights (see sidecar).

### Named Rules

**The Glass Rule.** Floating chrome (nav, mobile menu, glow cards) uses blur, a translucent fill and a hairline border, not an opaque fill. The portfolio card is the one exception, because it carries a full-width image.

## Shapes

Pills for anything clickable and small (nav, buttons, badges, tabs, accent bar). Cards use 16px (14px for the glow border). Logo tiles 16px, highlight ends 24px, menu items 12px. Borders are 1px hairlines at 10 to 20% white or Paper Light, except the 1.5px glow card border; the portrait has a 4px cyan 20% ring.

## Components

### Buttons

- **Shape:** full pill, 56px tall at the main size.
- **Primary (glass):** transparent fill, white 10% border, blur 12px, inset highlight shadows, light text at 14px, weight 500.
- **Hover / Focus:** scale to 0.99, active 0.975, 300ms; focus ring 3px solid cyan.

### Chips

- **Badge:** 12px text, weight 500, pill, tinted fill plus border in one of five hues, optional 12px icon.
- **Keyword highlight:** cyan 10% fill, cyan text, weight 600. Each word is its own inline block. The first word has 16px left padding and a 24px left radius, the last has 16px right padding and a 24px right radius, and words between have neither. `highlightKeywords` renders a compact form of the same chip in responsibility lines and education content: 8px by 3px padding and a 12px radius. Experience summaries are plain Tailwind 300 grey text with a 2px cyan 40% left border and 12px of left padding.

### Cards / Containers

- **Glow card:** 16px radius, 6% grey fill, 1.5px border in the same grey, 2px blur. Padding is 20px on list and project cards and 24px on home cards (40px from md on the statistics cards). The call-to-action card keeps the 16px default and pads its own content inside. On desktop a radial spotlight follows the pointer across fill and border. Off below 768px.
- **Portfolio card:** an opaque card fill with a 1px white 10% border and no pointer glow or blur, because it carries a full-width image. On hover the border turns cyan 30% and a faint cyan shadow appears. It is the one card that is not glass. Pressing it scales it to 0.99.
- **Logo tile:** 64px square, 16px radius, slate 50% fill, Paper Light 10% border. From md, hover scales it to 1.03 and turns the border cyan 30%.

### Navigation

- Floating glass pill, 56px tall, max 896px wide, 16px from top. Hides when scrolling down, returns on scroll up or focus. A skip link sits top left, visible only while focused. Links are pills; active is cyan text on cyan 15% (20% in the mobile menu). Under lg, a menu toggle opens a panel of Ink at 60% with a blur, a white 10% border and 12px-radius items.

### Tabs

- Pill buttons; the selected one gets a cyan 20% pill with a 60% border that slides between tabs (spring, 0.4s). Pressing a tab scales it to 0.95.
- **Filter chips** (Portfolio, Publications, References) are the same pill with a 1px white 20% border and a white 5% fill at rest, brighter on hover. The border is about 1.5:1 on the page, so the label carries the contrast. Each chip is 44px tall with the 36px pill inset 4px.
- Below md the chips sit in one row that scrolls sideways, with a 2rem fade at each edge that still has chips beyond it, and the selected chip is scrolled to the middle. From md they wrap on a 48rem measure, centred, so no chip is left alone on a row.
- The accordion tabs on Experience and Education cards keep the plain look: no border or fill at rest.

### Footer

- The three parts sit on a grid from lg, but the link columns are placed by eye, not by geometry. Quick Links and Connect hold labels of very different length (Home against ResearchGate), so they sit where the visual weight looks centred. Do not move them to the page grid.

## Do's and Don'ts

### Do:

- **Do** use Signal Cyan (#03b1fb) as the only accent, as a tint for fills behind text.
- **Do** build floating surfaces from a translucent fill, blur and a hairline border: white at 10 to 20%, or the fill's own grey on glow cards.
- **Do** make small controls full pills and cards 16px.
- **Do** keep grey tiers: Paper Light for headings, Text Soft or 200 to 300 for body, Text Muted for metadata.
- **Do** disable pointer glow below 768px and keep touch panning and pinch zoom intact.
- **Do** wrap every hover, focus or press effect that moves, scales or turns in `motion-safe:`, so a visitor who asks for less motion keeps the colour change and loses the movement. `npm run check` fails on one that is not wrapped.
- **Do** give every link and button a 44px tap target at 360px, except links inside running text, the link lists in an Experience card's Links tab, and the skip link. Where neighbours sit closer than 44px (icon rows, footer lists) the areas share the space. The visible size stays small: the extra area is padding offset by a negative margin, or a pseudo-element where a parent's spacing would clash.
- **Do** size the home sections from the screen, not from fixed pixels: from lg, `lg:min-h-[min(100svh,72rem)]` with content centred (`lg:min-h-[min(calc(100svh-6rem),66rem)]` on the hero, to allow for the page's top padding), and 48px of padding on every section.
- **Do** keep the page usable with one dark theme now and a light theme later: reference colour roles, not literal values, in new components.

### Don't:

- **Don't** add a second accent hue outside the badge set.
- **Don't** fill areas behind text with solid cyan, beyond the 404 home button, or use opaque light panels on the dark ground.
- **Don't** introduce a new typeface; Poppins only.
- **Don't** rely on hover alone for meaning; phones are a main reader.
