# Vendored skills

The skills below are copies, not installs, so every session loads the same version and a later
upstream copy can be diffed against them.

| Here                  | Upstream                                                                                        | At                                  |
| --------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------- |
| `grilling/`           | [mattpocock/skills](https://github.com/mattpocock/skills) `skills/productivity/grilling/`       | `49dd158` (2026-10-09)              |
| `two-axis-review/`    | [mattpocock/skills](https://github.com/mattpocock/skills) `skills/engineering/code-review/`     | `49dd158` (2026-10-09)              |
| `diagnosing-bugs/`    | [mattpocock/skills](https://github.com/mattpocock/skills) `skills/engineering/diagnosing-bugs/` | `49dd158` (2026-10-09)              |
| `impeccable/`         | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) `.claude/skills/impeccable/`        | `3930843` (2026-10-30), skill 4.8.0 |
| `animate/`            | [emilkowalski/skills](https://github.com/emilkowalski/skills) `skills/animate/`                 | `a81dbca` (2026-10-28)              |
| `review-animations/`  | [emilkowalski/skills](https://github.com/emilkowalski/skills) `skills/review-animations/`       | `a81dbca` (2026-10-28)              |
| `improve-animations/` | [emilkowalski/skills](https://github.com/emilkowalski/skills) `skills/improve-animations/`      | `a81dbca` (2026-10-28)              |

The three Pocock skills are also vendored in `video-bokeh`.

## Local edits

Kept to the minimum, so a later upstream copy can be diffed against these files:

- `code-review` is renamed `two-axis-review`, because Claude Code ships a built-in
  `code-review` and the two would share a name.
- In `two-axis-review`, three passages change because this repo has no issue tracker and no
  spec folder. The note about the tracker and `/setup-matt-pocock-skills` becomes a pointer to
  the **Specs and tickets** section of `shared/site-conventions.md`. The step on issue
  references says there usually are none. The spec-file item, which named `docs/`, `specs/` and
  `.scratch/`, becomes the pull request's `## What` and `## Why`.
- The `agents/openai.yaml` files are dropped. They configure Codex, not Claude Code.
- `impeccable/` is the upstream Claude Code build, copied by hand rather than with
  `npx impeccable install`. That leaves out the design hook and the four `impeccable-*`
  subagents; the skill falls back to its `reference/degraded/` playbooks. Upstream `LICENSE` and
  `NOTICE.md` are copied into the folder, as Apache 2.0 requires. The launcher in
  `impeccable/scripts/` downloads its engine binary once into `~/.impeccable/bin/` and checks it
  against `engine-checksums.txt`.
- The Emil Kowalski skills are unchanged.
- Every vendored folder is listed in `.prettierignore`, so Prettier does not reformat it and it
  stays diffable against upstream.

## Updating

Clone upstream, copy the folders over these, then re-apply the edits above. `git diff` shows
exactly what upstream changed. For `impeccable/`, copy `.claude/skills/impeccable/` from the
repo root, which is the Claude Code build, and update the `.gitignore` block from its README.

## Licenses

`impeccable/` is under the Apache License 2.0; its text is in `impeccable/LICENSE`. The Pocock
and Emil Kowalski skills are under the MIT License, with the same text for both:

MIT License

Copyright (c) 2026 Matt Pocock
Copyright (c) 2026 Emil Kowalski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
