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
  badge-blue: "#60a5fa"
  badge-violet: "#a78bfa"
  badge-teal: "#2dd4bf"
  badge-cyan: "#22d3ee"
  badge-sky: "#38bdf8"
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
    lineHeight: 1.5
  label:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
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
  section: "144px"
components:
  nav-pill:
    backgroundColor: "rgba(255,255,255,0.10)"
    textColor: "{colors.text-soft}"
    rounded: "{rounded.full}"
    height: "56px"
  nav-link-active:
    backgroundColor: "rgba(3,177,251,0.20)"
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
    textColor: "{colors.text-soft}"
    rounded: "{rounded.2xl}"
    padding: "16px"
  badge:
    backgroundColor: "rgba(37,99,235,0.20)"
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
    textColor: "{colors.paper-light}"
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
- Glass surfaces: translucent white fills, thin white borders, backdrop blur.
- Pill shapes for controls, 16px rounding for cards.
- Pointer-following glow on cards, desktop only.
- Poppins throughout, one family.

## Colors

A restrained dark palette: ink ground, slate cards, one cyan accent, and a cool badge set for category tags.

### Primary

- **Signal Cyan** (#03b1fb): active nav item, bullets, keyword highlights, link hover, the accent bar before section headings, tab selection. It is the only action colour.

### Secondary

- **Badge hues** (blue, violet, teal, cyan, sky at the 400 step): category badges only, each on a 20% tint of its 600 step (500 for sky) with a 40% border. They sort content and never signal action.

### Neutral

- **Ink** (#0a0e14): page background.
- **Card Slate** (#151a1f): card and logo-tile fill, often at 30% or 50% opacity.
- **Paper Light** (#f5f5f5): primary text, headings, button text.
- **Text Soft** (#d1d5db): inactive nav, tagline. Body copy mostly uses the Tailwind 200 and 300 greys.
- **Text Muted** (#9ca3af): dates, locations, secondary lines.
- **Glass lines**: white at 10% (card and tile borders), 20% (nav border).

### Named Rules

**The One Signal Rule.** Cyan is the only accent for state and emphasis. A new surface does not introduce a second action colour.
**The Role Tint Rule.** Accent fills are tints (10% highlight, 20% active, 30% border), never solid cyan blocks.

## Typography

**Display Font:** Poppins (system-ui fallback)
**Body Font:** Poppins
**Label/Mono Font:** none; labels are Poppins in uppercase.

**Character:** Geometric and friendly, kept firm by heavy weights on titles and tight tracking on the page title.

### Hierarchy

- **Display** (600, 2.25rem to 3rem, tight tracking): the page name in the home hero.
- **Headline** (700, 1.875rem to 2.25rem): home section headings.
- **Title** (600, 1.25rem): project page section headings, with the accent bar.
- **Body** (400, 0.875rem to 1rem): card and prose text in the grey tiers. Prose blocks cap at max-w-5xl or narrower.
- **Label** (600 to 700, 0.75rem to 0.875rem, 0.05em, uppercase): footer column heads, button text. Experience and education card titles are bold uppercase at 1rem.

### Named Rules

**The Weight Carries Rank Rule.** Hierarchy comes from weight and colour (light vs grey), with few size steps.

## Layout

Centred containers: max-w-7xl for the home sections and the list pages (experience, education, publications, references, portfolio), max-w-5xl for project pages, 24px side padding. Home sections stack with a 144px gap. Card grids are one column on phones and two from lg. Gaps are 32px on experience, education and publications, and 24px on references, portfolio and the home project row. The hero is a text and portrait row from md, stacked on phones. Mobile centres card text; md and up left-aligns it. Breakpoints are Tailwind defaults (md 768px, lg 1024px). Body text is justified by owner decision.

## Elevation & Depth

Depth is mostly tonal and translucent: glass fills, blur, and hairline borders. Real shadows are few.

### Shadow Vocabulary

- **Card lift** (`box-shadow: 0 0.5rem 1rem -0.5rem rgba(0,0,0,0.3)`): glow cards.
- **Nav and menu** (`shadow-lg`): floating pill and mobile menu.
- **Portrait** (`shadow-2xl`): hero portrait.
- **Glass button inset stack**: layered inset white highlights (see sidecar).

### Named Rules

**The Glass Rule.** Floating chrome (nav, mobile menu, glow cards) uses blur plus a white hairline, not an opaque fill.

## Shapes

Pills for anything clickable and small (nav, buttons, badges, tabs, accent bar). Cards use 16px (14px for the glow border). Logo tiles 16px, highlight ends 24px, menu items 12px. Borders are 1px hairlines at 10 to 20% white; the portrait has a 4px cyan 20% ring.

## Components

### Buttons

- **Shape:** full pill, 56px tall at the main size.
- **Primary (glass):** transparent fill, white 10% border, blur 12px, inset highlight shadows, light text at 14px.
- **Hover / Focus:** scale to 0.99, active 0.975, 300ms; focus ring 3px cyan at 50%.

### Chips

- **Badge:** 12px text, weight 500, pill, tinted fill plus border in one of five hues, optional 12px icon.
- **Keyword highlight:** cyan 10% fill, cyan text, weight 600. Each word is its own inline block. The first word has 16px left padding and a 24px left radius, the last has 16px right padding and a 24px right radius, and words between have neither. Experience summaries use a compact form of the same chip: 8px by 3px padding and a 12px radius.

### Cards / Containers

- **Glow card:** 16px radius, 6% grey fill, 1.5px border, 2px blur, 16px padding. On desktop a radial spotlight follows the pointer across fill and border. Off below 768px.
- **Logo tile:** 64px square, 16px radius, slate 50% fill, white 10% border, hover scale 1.03 and cyan 30% border.

### Navigation

- Floating glass pill, 56px tall, max 896px wide, 16px from top. Hides when scrolling down, returns on scroll up or focus. Links are pills; active is cyan text on cyan 20%. Under lg, a menu toggle opens a blurred panel with 12px-radius items.

### Tabs

- Pill buttons; the selected one gets a cyan 20% pill with a 30% border that slides between tabs (spring, 0.4s).

## Do's and Don'ts

### Do:

- **Do** use Signal Cyan (#03b1fb) as the only accent, as a tint.
- **Do** build floating surfaces from translucent white, blur and a 10 to 20% white hairline.
- **Do** make small controls full pills and cards 16px.
- **Do** keep grey tiers: Paper Light for headings, Text Soft or 200 to 300 for body, Text Muted for metadata.
- **Do** disable pointer glow below 768px and keep touch panning intact.
- **Do** keep the page usable with one dark theme now and a light theme later: reference colour roles, not literal values, in new components.

### Don't:

- **Don't** add a second accent hue outside the badge set.
- **Don't** use solid cyan blocks or opaque light panels on the dark ground.
- **Don't** introduce a new typeface; Poppins only.
- **Don't** rely on hover alone for meaning; phones are a main reader.
