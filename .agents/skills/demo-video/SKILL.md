---
name: demo-video
description: >-
  Make, remake or update a narrated product demo film in the house paper look: plan the problem and
  solution cards and the voice script from the product repository, get footage at 4K (re-render a
  HyperFrames rebuild or record the real UI), build it with the video kit, run QA, and deliver to
  Drive and the site. Use when the user asks to make a demo video, a new film for a project, a product
  film, a walkthrough video, a narrated demo, or to redo or restyle an existing demo film. For
  reviewing a finished film use demo-video-review.
disable-model-invocation: false
---

# Demo video

Source: `_video-kit/skills/demo-video/` on Google Drive. Edit there, never in a copy. A copy in a
repository is replaced by `scripts/sync_skills.py`.

One kit makes every film: the paper look (flat ground, one blue accent), footage at 4K, the structure
title, problem, solution, demo, closing card, a narration, one calm music bed, no sound effects. A small Python
editor draws the look and cuts the footage. One `film.json` per film drives it.

## The kit

`$VIDEO_KIT` is the folder `_video-kit/` of the portfolio Drive. Default:
`/Users/viacheslav/Library/CloudStorage/GoogleDrive-viacheslav.v.danilov@gmail.com/My Drive/Personal website (vdanilov)/portfolio/_video-kit`.

Read `$VIDEO_KIT/README.md`, `CHECKLIST.md` and `paper/README.md` first. Run the scripts from there with
`PYTHONDONTWRITEBYTECODE=1`, so nothing is written into the kit. Film files go to a work folder outside the
kit and outside the product repository: `<work>/<slug>/` with `film.json`, `storyboard.md`, `voice/`, `footage/`,
`music/`, `build/`.

## Phases

Each phase ends in a gate. Do not start the next phase before the gate is passed.

1. **Research.** Read the product repository: README, docs, `.assets/demo/`, the site page
   (`app/portfolio/<slug>/page.jsx`). Find how the current footage was made. Write `storyboard.md` from
   `templates/storyboard.md`: card texts, scene table, voice lines, each with its source.
   Gate: the owner approves the card texts and the voice outline.
2. **Board, cards.** `film.json` from `templates/film.json` with the card texts. Run
   `python3 $VIDEO_KIT/paper/boards/board.py --film film.json --out boards`, and open the image for the owner.
   Gate: the owner approves the cards, the theme and the callout variant.
3. **Footage.** A rebuilt UI: `scripts/footage.py hf`, then `pack`. A real UI: `templates/record/rec.cjs`, then `pack`.
   Delete the PNG frames after packing. See `references/recording.md`.
4. **Edit and board, frames.** Fill the frame map, boxes, captions and callouts in `film.json`, write the voice lines with
   their windows. Run `film.py lint`, then `board.py --film film.json --at <two moments>`.
   Gate: the owner approves the board with two footage frames and their overlays, before the build.
5. **Voice and music.** `scripts/tts.py`, `scripts/make_music.py`, the fit rule. See `references/build.md`.
6. **Build.** `film.py lint`, `film.py build --profile master`, `--profile web`, `film.py vtt`.
7. **QA.** `scripts/qa.py`, then `demo-video-review` in a fresh subagent. Fix, run again once. See `references/qa.md`.
   Gate: no FAIL, every warning understood, the owner's ears and eyes (checklist rows 18 and 8).
8. **Deliver.** The Drive archive by `templates/archive-README.md` (`cp` only, hash check) and a site pull request.
   See `references/deliver.md`. Run `scripts/sync_skills.py --check` against the site's skills first and stop on drift.

## Hard rules

- 4K footage, 3840 x 2160, lossless mezzanine. One lossy encode, from lossless frames.
- The look comes from `paper/tokens.json` only. Never write a colour, size, position or cap into a film, a composition or a
  document by hand: name the token. A new look is the owner's decision with a new board, not a builder change.
- Text caps are measured by `film.py lint` on the rendered width. A text that does not fit is shortened, never shrunk.
- No invented facts. Every card text and every voice line has a source in the storyboard. No accuracy, speed or saving
  claim that the project page does not make. Numbers are spoken as words and match the frame.
- Privacy: fictional data only; no real person, client, host, key or e-mail on any frame, card or line. The
  OCR scan of `qa.py` runs on every film, and a person reads the contact sheet too.
- Loudness -18 LUFS integrated, true peak at most -1.5 dBTP, voice 8 to 12 dB over the bed. No sound effects.
- No burned-in subtitles. Captions are the sidecar `.vtt` that `film.py vtt` writes.
- File names carry no version label: `demo-<slug>-web.mp4`, never `-v2`. A site file keeps its name and is overwritten. The site caches
  media for a week, so say in the pull request that a browser needs a hard reload.
- No em dash anywhere: cards, lines, storyboard, comments, commit messages, pull request text.
- No text about where the data or the model comes from (public, synthetic, fictional, fake, "trained on ..."): not in cards, captions, callouts, pills or the voice. A disclaimer pill is at most a neutral label such as "Sample claim form".
- Product repositories are read only: render and edit on copies. Never run a product's production stack.
- Never write to the Drive kit from a film task. A kit change is its own task, with an entry in `CHANGELOG.md`.
- Check the disk before a render (`df -h`): a 4K PNG render takes about 1.5 GB per 2000 frames. One film at a time.
- Commits and pull requests follow the repository's `AGENTS.md`. No AI attribution anywhere.
- Inside the site repository, `shared/site-conventions.md` sets the language: chat in Russian, everything written down in English.

## References (load on demand)

| Reference                 | Holds                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `references/look.md`      | which card, theme and callout variant to use; caps; safe areas; spotlight and pill rules        |
| `references/recording.md` | rebuilt UI against real recording, the 4K rules, hide selectors, holds and cuts, native selects |
| `references/script.md`    | how to write the problem and solution cards and the voice lines: facts, sources, plain words    |
| `references/build.md`     | `film.json` fields, the editor, voice, music, mix and encode commands, the size ladder          |
| `references/qa.md`        | what each QA section measures and how to read its sheets                                        |
| `references/deliver.md`   | Drive layout and names, the site files and the cache rule, the CV and page checks               |
