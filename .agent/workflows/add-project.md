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

### Header Card

```jsx
className = "mb-16 p-6 rounded-2xl bg-light/[0.03]";
```

### Section Heading

```jsx
<h2 className="text-xl font-semibold text-light mb-4 flex items-center gap-3">
  <span className="w-1 h-6 bg-accent rounded-full"></span>
  Section Title
</h2>
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
