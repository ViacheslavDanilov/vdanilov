# Design System

Minimal design system with only the tokens actually used in the codebase.

## File

- **`/app/globals.css`** - All design tokens (141 lines)

That's it! No separate JavaScript files needed.

## What's Included

### Core Colors (in `@theme` - generates Tailwind classes)

- `--color-dark` (#0a0e14) - Background
- `--color-light` (#f5f5f5) - Text
- `--color-accent` (#03b1fb) - Primary accent
- `--color-selection` (#b3d6ff) - Text selection
- `--color-card` (#151a1f) - Card background
- `--color-card-hover` (#1a2027) - Card hover state

### Font

- `--font-family-sans` - Poppins + system fallbacks

### Text Colors (in `:root` - reference only)

- `--color-gray-300` (#d1d5db) - Light gray text
- `--color-gray-400` (#9ca3af) - Medium gray text

### Component Variables

- **Bento Grid**: `--glow-x`, `--glow-y`, `--glow-intensity`, `--glow-radius`, `--glow-color`, `--border-color`, `--background-dark`, `--white`
- **Cybernetic Card**: `--mouse-x`, `--mouse-y`

## How to Use

### Tailwind Classes (Most Common)

```jsx
<div className="bg-card text-light hover:bg-card-hover">
  <h1 className="text-accent">Title</h1>
  <p className="text-gray-400">Description</p>
</div>
```

### CSS Variables (When Needed)

```jsx
<div style={{ color: "var(--color-accent)" }}>Content</div>
```

## How to Change Design

Want to change the accent color?

1. Open `/app/globals.css`
2. Find `--color-accent: #03b1fb;`
3. Change to your color (e.g., `#8b5cf6` for purple)
4. Save - all components update automatically! ✅

## Philosophy

**Keep it simple.** Only include what you actually use.

- ✅ One file (`globals.css`)
- ✅ 8 color tokens
- ✅ Component-specific variables where needed
- ✅ No unnecessary abstractions

Everything is in CSS where it belongs. No JavaScript files needed for design tokens.
