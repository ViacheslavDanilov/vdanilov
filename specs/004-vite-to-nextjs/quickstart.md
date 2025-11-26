# Quick Start Guide: Next.js Development

**Date**: November 26, 2025  
**Feature**: [spec.md](./spec.md) | [plan.md](./plan.md) | [research.md](./research.md)

This guide provides step-by-step instructions for working with the Next.js version of the personal website after migration.

---

## Prerequisites

- **Node.js**: Version 18.17 or higher
- **npm**: Version 9 or higher (comes with Node.js)
- **Git**: For version control

**Check your versions:**

```bash
node --version   # Should be ≥ 18.17
npm --version    # Should be ≥ 9.0
```

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ViacheslavDanilov/vdanilov.git
cd vdanilov
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Next.js 15.1.8
- React 19.2.0
- Tailwind CSS v4
- Framer Motion (motion)
- FontAwesome icons

### 3. Start Development Server

```bash
npm run dev
```

The site will be available at:

- **http://localhost:3000** (development, no basePath)

**Hot Reload**: The development server supports hot module replacement (HMR). Changes to components, pages, or styles will automatically reflect in the browser.

---

## Project Structure

```
vdanilov/
├── app/                    # Next.js App Router
│   ├── layout.jsx          # Root layout (wraps all pages)
│   ├── page.jsx            # Home page (/)
│   ├── globals.css         # Global styles with Tailwind
│   ├── experience/
│   │   └── page.jsx        # /experience route
│   ├── education/
│   │   └── page.jsx        # /education route
│   ├── portfolio/
│   │   └── page.jsx        # /portfolio route
│   ├── publications/
│   │   └── page.jsx        # /publications route
│   └── references/
│       └── page.jsx        # /references route
├── components/             # Shared components
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   └── ui/                 # UI components
│       ├── flip-words.jsx
│       ├── glow-menu.jsx
│       ├── menu-toggle-icon.jsx
│       └── shimmer-button.jsx
├── lib/                    # Utility functions
│   └── utils.js
├── public/                 # Static assets
│   ├── hero.mp4
│   ├── logo.png
│   └── ...
├── specs/                  # Feature specifications
├── .next/                  # Build output (generated, gitignored)
├── out/                    # Static export (generated, gitignored)
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS/Tailwind config
├── jsconfig.json           # Path aliases
└── package.json            # Dependencies and scripts
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server on http://localhost:3000 with hot reload enabled.

### Production Build

```bash
npm run build
```

Builds the application for production and exports static files to the `out/` directory.

**Output**: `out/` folder containing static HTML, CSS, JS files ready for deployment.

### Production Preview (Local)

```bash
npx serve out
```

Serves the production build locally for testing before deployment.

**Note**: Requires `serve` package. Access at http://localhost:3000/vdanilov/

### Code Formatting

```bash
npm run format
```

Automatically formats all files with Prettier.

```bash
npm run check
```

Checks if files are formatted correctly (useful in CI/CD).

---

## Development Workflow

### Adding a New Page

1. **Create page file:**

   ```bash
   mkdir -p app/about
   touch app/about/page.jsx
   ```

2. **Add page content:**

   ```jsx
   // app/about/page.jsx
   export default function About() {
     return (
       <div className="container mx-auto px-6 py-12">
         <h1 className="text-4xl font-bold">About Me</h1>
         <p className="mt-4 text-gray-400">Content goes here...</p>
       </div>
     );
   }
   ```

3. **Add to navigation** (in `components/Navbar.jsx`):

   ```javascript
   const navItems = [
     // ... existing items
     {
       icon: faUser,
       label: "About",
       href: "/about",
       gradient: GLOW_GRADIENT,
       iconColor: ICON_COLOR,
     },
   ];
   ```

4. **Test**: Navigate to http://localhost:3000/about

---

### Creating a Client Component

**When to use:**

- Component uses React hooks (useState, useEffect, etc.)
- Component has event handlers (onClick, onChange, etc.)
- Component uses browser APIs (window, document, etc.)
- Component uses Framer Motion animations

**Example:**

```jsx
"use client"; // ← Add this directive at the top

import { useState } from "react";
import { motion } from "motion/react";

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <motion.button
      onClick={() => setCount(count + 1)}
      whileHover={{ scale: 1.05 }}
      className="px-4 py-2 bg-accent text-white rounded"
    >
      Clicked {count} times
    </motion.button>
  );
}
```

---

### Creating a Server Component (Default)

**When to use:**

- Static content rendering
- No interactivity needed
- No React hooks or browser APIs

**Example:**

```jsx
// No directive needed - Server Component by default

export default function StaticContent() {
  return (
    <article className="prose">
      <h2>Static Heading</h2>
      <p>This content is rendered at build time with zero JavaScript.</p>
    </article>
  );
}
```

---

### Adding Static Assets

1. **Place file in `public/` directory:**

   ```bash
   cp ~/Downloads/new-image.jpg public/
   ```

2. **Reference in component:**

   ```jsx
   // Correct: Use absolute path from root
   <img src="/new-image.jpg" alt="Description" />;

   // With Next.js Image component
   import Image from "next/image";

   <Image src="/new-image.jpg" alt="Description" width={800} height={600} />;
   ```

**Important**:

- Always use paths starting with `/` (e.g., `/logo.png`)
- basePath (`/vdanilov`) is automatically added in production
- Assets in `public/` are accessible at `/filename`

---

### Styling with Tailwind CSS

**Using utility classes:**

```jsx
<div className="flex items-center justify-between px-6 py-4 bg-dark text-light">
  <h1 className="text-2xl font-bold">Title</h1>
  <button className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
    Click Me
  </button>
</div>
```

**Using custom theme colors:**

```jsx
// Colors defined in app/globals.css under @theme
<div className="bg-dark text-light">
  <span className="text-accent">Accent color</span>
</div>
```

**Responsive design:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

---

### Working with Navigation

**Declarative navigation with Link:**

```jsx
import Link from "next/link";

<Link href="/about" className="text-accent hover:underline">
  About Me
</Link>;
```

**Programmatic navigation:**

```jsx
"use client";

import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact");
  };

  return <button onClick={handleClick}>Go to Contact</button>;
}
```

**Get current path:**

```jsx
"use client";

import { usePathname } from "next/navigation";

export default function Component() {
  const pathname = usePathname();
  const isActive = pathname === "/about";

  return (
    <div>
      Current path: {pathname}
      {isActive && <span>✓ Active</span>}
    </div>
  );
}
```

---

## Building for Production

### 1. Create Production Build

```bash
npm run build
```

**What happens:**

- Next.js compiles and optimizes all pages
- Generates static HTML, CSS, JS files
- Exports to `out/` directory
- Applies basePath `/vdanilov` to all paths

### 2. Test Production Build Locally

```bash
npx serve out
```

**Access at**: http://localhost:3000/vdanilov/

**Testing Checklist:**

- [ ] All pages load correctly
- [ ] Navigation works (internal links)
- [ ] Assets load (images, videos, fonts)
- [ ] Mobile menu works
- [ ] Animations run smoothly
- [ ] External links work (CV download, portfolio link)

### 3. Deploy to GitHub Pages

**Automatic Deployment (via GitHub Actions):**

- Push to `main` branch triggers deployment
- GitHub Actions runs `npm run build`
- Deploys `out/` folder to `deploy` branch
- Site updates at https://viacheslavdanilov.github.io/vdanilov/

**Manual Deployment:**

```bash
# Build
npm run build

# Deploy (using gh-pages package)
npx gh-pages -d out -b deploy
```

---

## Common Tasks

### Update Dependencies

```bash
npm update
```

Check for outdated packages:

```bash
npm outdated
```

### Clear Build Cache

```bash
rm -rf .next out
npm run build
```

### Format All Files

```bash
npm run format
```

### Add New Font Weight

```jsx
// app/layout.jsx
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ], // ← Add new weight
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});
```

### Debug Build Issues

```bash
# Enable verbose logging
npm run build -- --debug

# Check for TypeScript errors (if migrating to TS later)
npx tsc --noEmit

# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
```

---

## Troubleshooting

### Issue: Module not found error

**Solution:** Check import paths use `@/` prefix:

```jsx
// ✅ Correct
import Hero from "@/components/Hero";

// ❌ Wrong
import Hero from "../components/Hero";
```

### Issue: "use client" directive not working

**Solution:** Ensure it's the first line (before imports):

```jsx
"use client"; // ← Must be first line

import { useState } from "react";
```

### Issue: Assets not loading in production

**Solution:** Use absolute paths starting with `/`:

```jsx
// ✅ Correct
<img src="/logo.png" alt="Logo" />

// ❌ Wrong
<img src="logo.png" alt="Logo" />
<img src="./logo.png" alt="Logo" />
```

### Issue: 404 on page refresh (production)

**Solution:** Already configured with `trailingSlash: true` in next.config.mjs. If still occurring, check GitHub Pages settings.

### Issue: Styles not applying

**Solution:**

1. Check `app/globals.css` is imported in `app/layout.jsx`
2. Restart dev server: `npm run dev`
3. Clear Next.js cache: `rm -rf .next`

### Issue: Hot reload not working

**Solution:**

1. Restart dev server
2. Check file is saved
3. Ensure file extension is correct (`.jsx` for components)

---

## Best Practices

### Component Organization

```
components/
├── layout/           # Layout components (Header, Footer, etc.)
├── ui/              # Reusable UI components (Buttons, Inputs, etc.)
├── features/        # Feature-specific components
└── [ComponentName].jsx
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Pages**: lowercase (e.g., `page.jsx`, `layout.jsx`)

### Import Order

```jsx
// 1. React and Next.js imports
import { useState } from 'react';
import Link from 'next/link';

// 2. Third-party libraries
import { motion } from 'motion/react';

// 3. Local components
import Hero from '@/components/Hero';
import Button from '@/components/ui/Button';

// 4. Utilities and helpers
import { cn } from '@/lib/utils';

// 5. Types (if using TypeScript)
import type { ButtonProps } from '@/types';

// 6. Assets and styles
import './styles.css';
```

### Performance Tips

1. **Use Server Components by default** - Only add `'use client'` when necessary
2. **Lazy load heavy components** - Use dynamic imports for large Client Components
3. **Optimize images** - Use Next.js Image component with appropriate sizes
4. **Minimize Client Component size** - Extract static parts into Server Components
5. **Use priority loading** - Add `priority` prop to above-the-fold images

---

## Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Project-Specific

- [Feature Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Research Document](./research.md)
- [Data Model](./data-model.md)
- [Build Constitution](../.specify/memory/constitution.md)

### Community

- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Tailwind CSS Discord](https://discord.gg/tailwindcss)
- [React Community](https://react.dev/community)

---

## Getting Help

1. **Check Documentation**: Start with Next.js docs for API reference
2. **Review Research**: Check [research.md](./research.md) for migration patterns
3. **Search Issues**: Look for similar problems in Next.js GitHub issues
4. **Ask the Community**: Post in Next.js discussions or Stack Overflow

---

**Happy coding! 🚀**
