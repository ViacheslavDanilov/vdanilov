# Footage

The standard and the commands are in `$VIDEO_KIT/templates/record/RECORDING.md`. Read it. This page says how to choose.

## Which kind

1. **A rebuilt UI** (a HyperFrames project that rebuilds the real app as DOM, with a camera and a cursor): the default for the
   Symfa films (Risk Profiler, Insurecast, Insurance Pricing, Claim Assistant). A render at 4K is a 2x supersampled master.
   Native `<select>` menus are drawn by the rebuild, which a screen recording could not capture.
2. **A real UI recording** with `templates/record/rec.cjs`: for a product with no rebuild (CoverLens). Needs the product running
   with fictional data. Check what the first frames show before a long take.

## Rebuilt UI, step by step

1. Find the project in the product repository (`.assets/demo/project`). Read its `SPEC.md` or `REVIEW.md`.
2. Name what must be hidden: the old callouts, leader lines and highlight bands, as CSS selectors. Open `index.html`
   and the app composition to find them.
3. `python3 $VIDEO_KIT/scripts/footage.py hf --project <repo>/.assets/demo/project --out <build> --hide "<selectors>" [--clear-bg "<selectors>"]`.
   It renders a copy, never the repository. About one second of render per second of film.
4. `python3 $VIDEO_KIT/scripts/footage.py pack <build>/frames <film>/footage --name app-4k`, then delete `<build>/frames`.
5. The composition's own time is the source time in `film.json`. Spans that the old film hid under sheets are not used.

## Rules for the edit

- A hold repeats one source index. Never blend frames for a hold.
- A speed-up of a wait skips indices. Never blend.
- A cut inside a take skips indices and crossfades `scene_xfade` when the picture changes.
- A zoom of a real recording is a crop of the 4K frame, at most 2x. A rebuilt UI zooms with its own camera.
- A render of a rebuild is not bit exact between runs: a hold hides that, a run does not. Do not mix two renders in one scene.
- Boxes and callouts only on still frames: place them on a hold.

## Privacy while recording

Hide dev indicators, real logos and hosts with CSS. Never record the login screen. Seed fictional data. Never use a client's data.
After packing, look at a contact sheet (`film.py sheet`) before anything else.
