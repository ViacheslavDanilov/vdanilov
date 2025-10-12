# Personal Website

> Status: Under construction. The current version is live at:
>
> https://viacheslavdanilov.github.io/vdanilov/

## What’s here

- Static site using HTML + Tailwind (via CDN) + vanilla JS
- No Node.js build tooling required at this stage
- Minimal project structure:
  - `index.html`, `content/`, `css/`, `js/`

## Install

1. Clone the repo:

```sh
git clone https://github.com/ViacheslavDanilov/vdanilov.git
cd vdanilov
```

2. Install Node.js:

https://nodejs.org/

3. Install project dependencies:

```sh
npm ci
```

## Preview locally

- Easiest: open `index.html` in your browser
- Recommended: BrowserSync (live reload). Start a server that watches all files and reloads on change:

```sh
npx browser-sync start --server --directory --files "**/*"
```
