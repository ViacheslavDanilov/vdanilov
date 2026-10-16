# Vendored skills

Three skills here are copies of [mattpocock/skills](https://github.com/mattpocock/skills) at
commit `49dd158` (2026-10-09), copied rather than installed so they can be adapted to this
repo and so every session loads the same version. The same three are vendored in
`video-bokeh`.

| Here               | Upstream                              |
| ------------------ | ------------------------------------- |
| `grilling/`        | `skills/productivity/grilling/`       |
| `two-axis-review/` | `skills/engineering/code-review/`     |
| `diagnosing-bugs/` | `skills/engineering/diagnosing-bugs/` |

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
- The three folders are listed in `.prettierignore`, so Prettier does not reformat them and
  they stay diffable against upstream.

## Updating

Clone upstream, copy the three folders over these, then re-apply the edits above. `git diff`
shows exactly what upstream changed.

## License

MIT License

Copyright (c) 2026 Matt Pocock

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
