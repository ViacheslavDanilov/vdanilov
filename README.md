# Personal Website

> Status: Under construction. The current version is live at:
>
> https://viacheslavdanilov.github.io/vdanilov/

## What’s here

- Static site using HTML + Tailwind (via CDN) + vanilla JS
- No Node.js build tooling required at this stage
- Minimal project structure:
  - `index.html`, `content/`, `css/`, `js/`

## Preview locally

- Easiest: open `index.html` in your browser
- Recommended: BrowserSync (live reload)
  - Requires Node.js; npx will download BrowserSync on first run.
  - Start a server that watches all files and reloads on change:

```sh
npx browser-sync start --server --directory --files "**/*"
# then open the URL printed in the terminal (usually http://localhost:3000)
```

## Quick setup

Install Node packages and set up git hooks (Prettier + Husky + lint-staged).

```sh
# install dependencies defined in package.json
npm ci

# install husky hooks (run once locally)
npm run prepare

# check formatting
npm run format:check
```

To format all files:

```sh
npm run format
```

````
# then open http://localhost:8080
```
````
