# Data Model: Hero React Migration

## Entities

### Hero Component

The `Hero` component is the primary visual element.

**Props Interface**:

```typescript
interface HeroProps {
  /** The name to display (e.g., "Viacheslav Danilov, PhD") */
  name: string;

  /** List of roles to cycle through in the Flip Words component */
  roles: string[];

  /** Path to the background video file */
  videoSrc: string;

  /** List of contact methods */
  contacts: Contact[];
}

interface Contact {
  /** The label or icon name for the contact method */
  label: string;

  /** The URL or action (mailto:, tel:) */
  href: string;

  /** Icon component name (from Lucide React) */
  iconName: string;
}
```

### Flip Words Component

**Props Interface**:

```typescript
interface FlipWordsProps {
  /** Array of words to flip through */
  words: string[];

  /** Duration in ms for each word */
  duration?: number; // Default: 3000

  /** Additional CSS classes */
  className?: string;
}
```
