# Contracts: Configuration Files

**Date**: November 26, 2025  
**Feature**: [spec.md](../spec.md) | [plan.md](../plan.md) | [research.md](../research.md)

This directory contains the target configuration files and their schemas for the Next.js migration.

## File Index

1. [next.config.mjs](./next.config.mjs) - Next.js configuration
2. [package.json](./package.json) - Updated dependencies and scripts
3. [postcss.config.mjs](./postcss.config.mjs) - PostCSS configuration
4. [.gitignore](./gitignore) - Updated ignore patterns
5. [jsconfig.json](./jsconfig.json) - Path aliases configuration

## Configuration Overview

### Next.js Config

- Static export enabled
- Base path configured for GitHub Pages
- Image optimization disabled (required for static export)
- Trailing slash enabled for compatibility

### Package.json

- Next.js 15.1.8 added
- Vite and React Router removed
- Scripts updated for Next.js commands
- All existing dependencies preserved

### PostCSS Config

- Tailwind CSS v4 PostCSS plugin
- Autoprefixer for browser compatibility
- No changes from current config

### Path Aliases

- `@/*` maps to root directory
- Enables clean imports: `@/components/Hero`

---

See individual files for detailed configurations.
