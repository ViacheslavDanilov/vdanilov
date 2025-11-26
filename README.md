# Personal Website

> Status: Under construction. The current version is live at:
>
> https://viacheslavdanilov.github.io/vdanilov/

## What's here

- Modern React application built with Next.js 15
- Tailwind CSS v4 for styling
- Framer Motion for animations
- Responsive design with mobile-first approach
- Static site generation for GitHub Pages

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

Build for production (static export):

```sh
npm run build
```

The production build will be output to the `out/` directory.

Preview production build locally:

```sh
npx serve out
```

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
