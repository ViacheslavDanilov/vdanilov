---
description: Add a new portfolio project page
---

# Add Portfolio Project

Creates a new portfolio project page following the established structure.

## Input Required

1. **Project URL**: `https://vdanilov.com/portfolio/[project-name]`
2. **Media files** placed in:
   - `public/portfolio/previews/[slug].webp` - Hero/preview image
   - `public/portfolio/[slug]/` - Project-specific images
   - `public/portfolio/team/` - New team member photos (if any)

---

## Process

// turbo-all

### Step 1: Fetch Content

1. Read the provided URL using `read_url_content`
2. Extract: title, description, sections, team, resources

### Step 2: Create Project Page

1. Create `app/portfolio/[slug]/page.jsx`
2. Use `ai-dissects-arterial-risk/page.jsx` as the reference structure
3. Include all standard sections in order:
   - Metadata export
   - Data constants (HIGHLIGHTS_ITEMS, TEAM_MEMBERS, RESOURCES, TECH_STACK)
   - TeamMemberCard component
   - ProjectPage component

### Step 3: Add to Portfolio Listing

1. Edit `app/portfolio/page.jsx`
2. Add entry to `PROJECTS_DATA` array

### Step 4: Verify

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

### Main Container

**Opening:**

```jsx
<main className="min-h-screen pt-24">
  <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
```

**Closing (with bottom spacing before footer):**

```jsx
        </div>
      </div>
      {/* Bottom spacing before footer */}
      <div className="pb-24" />
    </main>
```

### Header Card

```jsx
className = "mb-16 p-6 rounded-2xl bg-light/[0.03]";
```

### Client Info

```jsx
<div className="text-sm text-gray-400">
  <span className="text-gray-400 font-medium">Client: </span>
  <a href="..." className="text-accent hover:underline">
    Client Name
  </a>
  <span className="text-gray-400"> · City · Country 🏳️</span>
</div>
```

### Section Headings

**Highlights & Core Team sections use `mb-6`:**

```jsx
<h2 className="text-xl font-semibold text-light mb-6 flex items-center gap-3">
  <span className="w-1 h-6 bg-accent rounded-full"></span>
  Highlights / Core Team
</h2>
```

**Content sections (Overview, Data, Methods, Results, Conclusion) use `mb-4`:**

```jsx
<h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
  <span className="w-1 h-6 bg-accent rounded-full"></span>
  Section Title
</h2>
```

### Highlights Section (Individual GlowCards)

**CRITICAL: Each highlight item must be a separate GlowCard, NOT wrapped in a single card.**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {HIGHLIGHTS_ITEMS.map((item, index) => (
    <GlowCard
      key={item.label}
      glowColor="blue"
      customSize={true}
      className="group w-full h-full p-5"
      enableSpotlight={true}
      enableBorderGlow={true}
      spotlightSize={240}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={item.icon}
            className="w-3.5 h-3.5 text-white/70 transition-colors duration-300 group-hover:text-accent"
            style={{
              width: "0.875rem",
              height: "0.875rem",
              display: "inline-block",
            }}
          />
          <span className="text-xs uppercase tracking-wider text-light transition-colors duration-300 group-hover:text-accent font-semibold">
            {item.label}
          </span>
        </div>
        <p className="text-sm text-light/80 leading-relaxed text-justify">
          {item.text}
        </p>
      </div>
    </GlowCard>
  ))}
</div>
```

### TeamMemberCard Component

**CRITICAL: Must use GlowCard with centered vertical layout.**

```jsx
function TeamMemberCard({ member }) {
  const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    gitlab: faGitlab,
    researchgate: faResearchgate,
    google: faGoogleScholar,
    orcid: faOrcid,
    globe: faGlobe,
    email: faEnvelope,
  };

  return (
    <GlowCard
      glowColor="blue"
      customSize={true}
      className="w-full h-full p-5"
      enableSpotlight={true}
      enableBorderGlow={true}
      spotlightSize={240}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg bg-dark mb-4">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <h4 className="text-base font-bold text-light mb-1.5">{member.name}</h4>
        <p className="text-sm font-medium text-accent mb-2">{member.role}</p>
        <p className="text-sm text-gray-300 mb-2">{member.organization}</p>
        <p className="text-sm text-gray-500 mb-4">{member.location}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-auto">
          {Object.entries(member.links).map(([key, url]) => (
            <a
              key={key}
              href={key === "email" ? `mailto:${url}` : url}
              target={key === "email" ? undefined : "_blank"}
              className="text-gray-400 hover:text-light transition-all duration-300 transform hover:scale-110"
            >
              <FontAwesomeIcon
                icon={iconMap[key]}
                style={{ width: "1rem", height: "1rem", display: "block" }}
              />
            </a>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}
```

### Core Team Grid

**Use 3-column layout on medium screens:**

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {TEAM_MEMBERS.map((member) => (
    <TeamMemberCard key={member.name} member={member} />
  ))}
</div>
```

### Figure with Caption

```jsx
<figure id="figure-N" className="scroll-mt-24">
  <ImageLightbox src="..." alt="..." width={W} height={H} maxWidth="..." />
  <figcaption className="text-center text-sm text-gray-400 mt-3">
    <span className="text-gray-300">Figure N.</span> Description...
  </figcaption>
</figure>
```

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

---

## Reference Implementation

See: `app/portfolio/ai-dissects-arterial-risk/page.jsx`
