# Personal Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vdanilov.vercel.app)

> Live at: **https://vdanilov.vercel.app**

## What's here

- Modern React application built with Next.js 16
- Tailwind CSS v4 for styling
- Framer Motion for animations
- Responsive design with mobile-first approach
- Deployed on Vercel with automatic preview deployments

## Install

1. Clone the repo:

```sh
git clone https://github.com/ViacheslavDanilov/vdanilov.git
cd vdanilov
```

2. Install Node.js (version 18+):

https://nodejs.org/

3. Install project dependencies:

```sh
npm install
```

## Development

Start the development server with hot reload:

```sh
npm run dev
```

The site will be available at `http://localhost:3000`

## Build

Build for production:

```sh
npm run build
```

Start production server locally:

```sh
npm start
```

## Deployment

The site is automatically deployed to Vercel:

- **Production**: Pushes to `main` branch deploy to production
- **Preview**: Pull requests get automatic preview deployments with unique URLs
- **CI/CD**: Vercel handles build, optimization, and deployment automatically

## Code Quality

Format code with Prettier:

```sh
npm run format
```

Check code formatting:

```sh
npm run check
```

Pre-commit hooks automatically format staged files before each commit.

## Testing

End-to-end testing with Playwright across 13 configurations (Chromium, Firefox, WebKit, Chrome + 9 mobile devices).

Run all tests:

```sh
npm run test:e2e
```

Run with interactive UI:

```sh
npm run test:e2e:ui
```

View test report:

```sh
npx playwright show-report
```

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion, GSAP
- **Icons**: Font Awesome
- **Deployment**: Vercel
- **Testing**: Playwright
- **Code Quality**: Prettier, Husky, lint-staged
