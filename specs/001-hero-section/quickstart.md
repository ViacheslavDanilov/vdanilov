# Quickstart: Hero Section

## Prerequisites

- Existing `001-website-rebuild` setup (Tailwind, HTML).

## Integration Steps

1.  **Add Video Asset**:
    Ensure `content/viacheslav-danilov-1.mp4` exists in the project assets folder.

2.  **Include HTML**:
    Copy the Hero section HTML into `index.html` (inside `<main>`).

3.  **Initialize Script**:
    Import and run the `initTypewriter()` function in your main JS entry point.

    ```javascript
    import { initTypewriter } from './js/hero.js';

    document.addEventListener('DOMContentLoaded', () => {
      initTypewriter(['ML Engineer', 'Data Scientist', ...]);
    });
    ```

## Testing

- Open `index.html` in a browser.
- Verify video plays automatically.
- Verify text rotates.
