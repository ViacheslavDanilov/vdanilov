# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Viacheslav himself.** The site is the first source for his professional record. He links
  it from his CV, LinkedIn and other profiles, and the CV is adapted from the site, not the
  other way round.
- **People hiring for leadership roles**: recruiters and managers looking for a Tech Lead,
  Engineering Manager or Research Scientist, the roles the home page names.
- **Academic colleagues**: researchers, co-authors and universities looking at publications,
  research projects and possible collaboration.
- **Former and current colleagues**, who check projects, roles and references.
- **Companies looking for AI and ML help** in insurance, medicine and pharma.

He works in both academia and industry, so one project may be shown to an academic reader
and to a business reader. Neither audience comes first.

## Product Purpose

A personal portfolio and professional record of Viacheslav Danilov, PhD in Computer Science,
who works across ML research, engineering and leadership. It shows his projects, experience,
education, publications and references in one place.

Success has no single action. Depending on the reader, it is a job offer in academia or
industry, a downloaded CV, a collaboration, or a reader who explored the projects and judged
the work. All of these count.

## Positioning

The same person carries a project from research (publications, PhD supervision, posts at
European universities) through engineering (production ML systems) to leadership (teams and
departments). The site shows that whole arc, with project pages that name the institutions,
the team and the outcome.

## Operating Context

- Readers often arrive from a link in a CV, a LinkedIn profile or an email, and may be on a
  phone.
- Pages: home, `/experience`, `/portfolio` with one page per project, `/education`,
  `/publications`, `/references`.
- The CV (designed in Figma, exported to PDF) prints the same experience text, links and
  referees as the site. See "Experience summaries" and "Experience link order" in `AGENTS.md`.

## Capabilities and Constraints

- Next.js on Vercel, static pages, no accounts or backend features.
- The site is dark-only today. A light theme is planned as a choice next to the dark one, not
  a replacement.
- Copy rules (prose, abbreviations, affiliations, link order) live in `AGENTS.md`.

## Evidence on Hand

- Project pages under `app/portfolio/`, with figures, teams and institutions.
- Publications in `app/publications/`, references in `app/references/`.
- Reference letters and certificates in `public/documents/`.
- Client and institution logos in `public/clients/`.

Some results and figures on the site are real but have no public document or link behind
them. That is acceptable, and future work must not remove them for lacking a source. Future
work must never add testimonials, clients, numbers or results that did not happen.

## Product Principles

1. The site is the source of truth. A change to a fact here may need the same change in the CV.
2. Serve both readers. Academic and business visitors should each find their evidence without
   the page choosing one over the other.
3. Real facts only. Nothing invented, and nothing real removed only because it has no link.
4. Depth is reachable. Every summary leads to a project, a paper or a document that backs it.
