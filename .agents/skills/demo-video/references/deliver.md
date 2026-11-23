# Delivering a film

## Drive

Root: `/Users/viacheslav/Library/CloudStorage/GoogleDrive-viacheslav.v.danilov@gmail.com/My Drive/Personal website (vdanilov)/portfolio/<slug>/video/`.
Read `portfolio/README.md` there first. Layout from `$VIDEO_KIT/templates/archive-README.md`:

- `demo-<slug>-master.mp4`, `demo-<slug>-web.mp4`, `demo-<slug>-poster.png`, `demo-<slug>.en.vtt`
- `sources/`: `film.json`, `storyboard.md`, `voice/`, `music/`, `footage/` (the mezzanine when under 300 MB, otherwise the project
  and the exact `footage.py hf` command), `project/` (a rebuilt UI), `mix/` (mix report and QA report), `README.md` from the template
- Write with `cp`, additive only. Check each copy by its SHA-256. Never move, rename or delete a file the owner shares by link.
- The README rebuild steps name the kit version (the `CHANGELOG.md` date). Fill the hash table.

## The site

A site pull request follows the site's own `AGENTS.md`: branch, one logical change per commit, the `## What`, `## Why`,
`## Verified` body, `npm run check` and the other checks, no AI attribution.

- The site file keeps its name and is overwritten: `public/portfolio/<slug>/demo-<slug>.mp4` and `demo-<slug>-poster.webp`, from the
  `web` build. Never a `-v2` name. The site serves `public/` with a week of cache, so the pull request says that a browser needs
  a hard reload to see the new film.
- Update `page.jsx` only when the film's length, poster or text on the page changes. The page says nothing the film does not.
- Captions: the `.vtt` is delivered to Drive. A `<track>` on the site is an owner decision and its own pull request.
- Run `scripts/sync_skills.py --check <site>/.agents/skills` first and stop on drift.

## The CV and the page

A film is not finished until the project page text, the CV and Drive agree with it: the product name as spoken, the numbers, the
claims. Check the project page against every card and line once more after the last edit.

## Clean up

When the pull request is merged: delete the build folder, the PNG frames, scratch renders and the work folder's scratch output.
Keep what Drive's archive does not hold. Never delete anything under `public/` or on Drive.
