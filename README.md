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
- Easiest: open `index.html` in your browser.

- Option 1 — BrowserSync (live reload, recommended)
  - Requires Node.js; npx will download BrowserSync on first run.
  - Start a server that watches all files and reloads on change:

```sh
npx browser-sync start --server --directory --files "**/*"
# then open the URL printed in the terminal (usually http://localhost:3000)
```

- Option 2 — Python built-in server (no live reload)

```sh
python3 -m http.server 8080
# then open http://localhost:8080
```
