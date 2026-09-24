---
description: Add a new portfolio project page
---

# Add Portfolio Project

Creates a new portfolio project page following the established structure.

## Input Required

1. **Project URL**: `https://vdanilov.com/portfolio/[project-name]`
2. **Media files** placed in:
   - `public/portfolio/previews/[slug].jpg` - Hero/preview image (2400x1260, also the social preview)
   - `public/portfolio/[slug]/` - Project-specific images and videos
   - `public/people/` - New team member photos (if any)
   - **Note**: If a team member photo is not available, use placeholder photos:
     - `/people/jane-doe.webp` for female team members
     - `/people/john-doe.webp` for male team members

---

## Process

// turbo-all

### Step 1: Fetch Content

1. Read the provided URL using `read_url_content`
2. Extract: title, description, sections, team, resources

### Step 2: Suggest Title & Slug

1. Based on the fetched content, propose **3-5 title options** that are:
   - Telegraphic (2-3 words max)
   - Attractive and memorable
   - Consistent with existing projects (e.g., "HyperVision Ablation", "Coronary Insight", "Deep BrainWatch")
2. For each title, suggest a corresponding slug (lowercase, hyphenated)
3. **STOP and wait for user approval** before proceeding to implementation

### Step 3: Create Project Page

1. Create `app/portfolio/[slug]/page.jsx`
2. Use `coronary-insight/page.jsx` as the reference structure
3. **CRITICAL - Discover and integrate images:**
   - List images from `public/portfolio/[slug]/` directory
   - Add figures with proper captions in relevant sections (Data, Methods, Results)
   - Add in-text figure references linking to the figures
   - Use ImageLightbox component for all images, with the file's real `width` and `height`
4. Include all standard parts in order:
   - Metadata export built with `pageMetadata` from `@/lib/metadata`
   - Data constants (HIGHLIGHTS_ITEMS, TEAM_MEMBERS, RESOURCES, TECH_STACK)
   - `ProjectPage` component that renders `ProjectHeader`, `Highlights`, `CoreTeam` and one `Section` per content section
5. **CRITICAL - Section names must be EXACTLY:**
   - "Highlights" (rendered by `Highlights`)
   - "Core Team" (rendered by `CoreTeam`, if applicable)
   - "Overview" (NOT "Summary" - this is the project context section)
   - "Data" (if applicable)
   - "Methods" (if applicable)
   - "Results" (if applicable)
   - "Conclusion"

### Step 4: Add to Portfolio Listing

1. Edit `app/portfolio/PortfolioClient.jsx`
2. Add entry to `PROJECTS_DATA` array

### Step 5: Verify

1. Run `npm run dev`
2. Navigate to the new project page
3. Check for errors in console

---

## Page Structure Checklist

- [ ] **Metadata** - title, description
- [ ] **Project Header** - title, description, client, tech stack, resources
- [ ] **Highlights** - STAR format (Situation, Task, Action, Result)
- [ ] **Core Team** - TeamMemberCard grid (if applicable)
- [ ] **Overview** - Project context and significance
- [ ] **Data** - Dataset description (if applicable)
- [ ] **Methods** - Technical approach (if applicable)
- [ ] **Results** - Metrics and visualizations (if applicable)
- [ ] **Conclusion** - Key takeaways, future work
- [ ] **Figure captions** - All images have Figure N. captions
- [ ] **Figure citations** - In-text references link to figures
- [ ] **Text justified** - All paragraphs and lists use text-justify

---

## Styling Reference

The shared parts of a project page live in `components/project/`. Pages pass data to them and keep only the prose and figures inline.

### Page Skeleton

```jsx
export const metadata = pageMetadata({
  title: "Project Title",
  description: "One-sentence description.",
  path: "/portfolio/[slug]/",
  image: {
    url: "/portfolio/previews/[slug].jpg",
    alt: "Project Title - short description",
  },
});

export default function ProjectPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        <ProjectHeader
          title="Project Title"
          subtitle="Subtitle shown under the title"
          banner={{
            image: "/portfolio/previews/[slug].jpg",
            alt: "Project Title - longer banner description",
          }}
          client={{
            name: "Client Name",
            url: "https://client.example/",
            location: "City · Country 🏳️",
          }}
          techStack={TECH_STACK}
          resources={RESOURCES}
        />

        {/* Content Sections */}
        <div className="space-y-16">
          <Highlights items={HIGHLIGHTS_ITEMS} />
          <CoreTeam members={TEAM_MEMBERS} />

          {/* Overview */}
          <Section title="Overview">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4 text-justify">
                ...
              </p>
            </div>
          </Section>
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </div>
  );
}
```

### Data Shapes

- `HIGHLIGHTS_ITEMS`: `[{ icon, label, text }]`, four STAR items with `faSearch`, `faBullseye`, `faCogs`, `faChartLine`
- `TEAM_MEMBERS`: `[{ name, role, organization, location, photo, links }]`; `links` keys are `linkedin`, `github`, `gitlab`, `researchgate`, `google`, `orcid`, `kaggle`, `facebook`, `globe`, `email` (the email value is the bare address)
- `RESOURCES`: `[{ label, url }]`
- `TECH_STACK`: `["Python", "PyTorch", ...]`

### Figure with Caption

```jsx
<figure id="figure-N" className="scroll-mt-24">
  <ImageLightbox src="..." alt="..." width={W} height={H} maxWidth="..." />
  <figcaption className="text-center text-sm text-gray-400 mt-3">
    <span className="text-gray-300">Figure N.</span> Description...
  </figcaption>
</figure>
```

`maxWidth` is one of `md`, `lg`, `xl`, `2xl`, `3xl`, `full`. Figures inside a multi-column grid also pass `sizes`.

### In-text Figure Reference

```jsx
<a href="#figure-N" className="text-accent hover:underline">
  Figure N
</a>
```

### Paragraph

```jsx
<p className="text-gray-300 leading-relaxed mb-4 text-justify">
```

### Bullet List

```jsx
<ul className="space-y-2 text-gray-300 mb-6 text-justify">
  <li className="flex items-start gap-2">
    <span className="text-accent mt-1">•</span>
    <span>
      <strong className="text-gray-200">Label:</strong> Description
    </span>
  </li>
</ul>
```

### Video with Caption

`AutoplayVideo` is a muted, looping video that plays only near the viewport and respects reduced motion.

```jsx
<figure id="figure-N" className="scroll-mt-24">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="rounded-xl overflow-hidden border border-white/10">
      <AutoplayVideo
        src="/portfolio/[slug]/video-file.mp4"
        controls
        className="w-full h-auto"
      />
    </div>
  </div>
  <figcaption className="text-center text-sm text-gray-400 mt-3">
    <span className="text-gray-300">Figure N.</span> Description...
  </figcaption>
</figure>
```

Encode videos as H.264 at about twice their displayed width, without an audio track, with `-movflags +faststart`.

---

## Reference Implementation

See: `app/portfolio/coronary-insight/page.jsx`
