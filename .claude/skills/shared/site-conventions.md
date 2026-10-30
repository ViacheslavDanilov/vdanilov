# Site agent conventions

Shared by `site-task` and `site-review`. Read this before publishing anything. It is
deliberately thin: the repo already ships an agent guide, and duplicating its rules here
would only let the two drift apart.

## Sources of truth

| Topic                                                                                      | Canonical file                         |
| ------------------------------------------------------------------------------------------ | -------------------------------------- |
| Commits, pull requests, authorship, git workflow, prose, assets, link order, project pages | root `AGENTS.md`                       |
| The commands that verify a change                                                          | root `AGENTS.md`, section **Commands** |
| How CI runs them                                                                           | `.github/workflows/ci.yaml`            |

If this file and `AGENTS.md` disagree, **`AGENTS.md` wins and this file gets fixed.** Never
restate a commit, pull request or prose rule here. Point at `AGENTS.md` instead.

## Language

- **Chat with the user: Russian.** Checkpoints, questions, hand-offs, verdicts.
- **Everything written down: English.** Commits, branches, pull request text, GitHub reviews,
  code, comments, site copy.

Never mix the two inside one artifact.

## Specs and tickets

This repo has no issue tracker and no spec files. The vendored `two-axis-review` was written
for a tracker, so read its wording through this table:

| Upstream says                 | Here it means                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| the originating issue or spec | the acceptance criteria `site-task` got confirmed, passed as a file path, or the pull request's `## What` and `## Why` |
| publish a spec                | none: the confirmed criteria are the spec                                                                              |
| the ticket tracker            | none                                                                                                                   |

`site-task` writes the confirmed criteria to a file in the session's scratchpad directory, so
a subagent can read them. Nothing of that kind is committed.

## Pushing

Pushing, opening and merging a pull request follow "Git workflow" in `AGENTS.md`, and the merge
happens in `site-review`. Force-pushing a feature branch and amending a pushed commit need an
explicit go-ahead.

**Before any push, run `npm run check`, `npm run build` and `npm run test:e2e`.** That holds
for the push that opens a pull request and for the pushes at the end of `site-review`'s fix
loop. CI runs the same three, but a red run costs a round trip that a local run does not.
If another `next dev` for this repo already runs, Playwright cannot start a second one: find
its port with `lsof -nP -iTCP -sTCP:LISTEN`, and run `PORT=<port> npm run test:e2e` against it.
Stop a dev server you started by its PID. A name pattern such as `pkill -f "next dev"` also
stops servers that other projects run on this machine.

**Delegated skills bring their own git habits, and none of them apply here.**

- gstack `document-release` and `document-generate` end with a step that commits with a
  `Co-Authored-By: Claude` trailer, runs a bare `git push` and edits the pull request body.
  Never run that step. Commit what they wrote yourself, per `AGENTS.md`.
- gstack `qa` commits each fix as `fix(qa): ISSUE-NNN: ...` and its tests as `test(qa): ...`.
  Let it: it needs one commit per fix, so that it can revert one that made things worse.
  Before the push, bring each subject to `AGENTS.md` notation with a non-interactive reword,
  since `git rebase -i` needs an editor this harness cannot drive.

On someone else's pull request none of them commits anything: `qa-only` reports, and a doc
pass keeps no edits.

## Delegating

Every prompt to a delegated skill or a subagent states the same limits in the prompt itself.
A skill's own preamble does not know this repo's rules, so the prompt is where they have to
arrive:

- read-only and no commits, unless the calling step owns the edits, as the fix loop owns
  `qa`'s;
- never push;
- never upgrade gstack or any other tool, whatever its preamble offers;
- never touch `AGENTS.md`, never add routing rules to it, and never create a `CLAUDE.md`,
  unless the task is a change to them.

A subagent that runs `site-review` is the exception to the first two: its fix loop commits and
pushes on the owner's branch, and it merges under "Git workflow" in `AGENTS.md`.

## Which skill to reach for

These two skills are rails and repo conventions. **The heavy lifting is delegated.** Do not
reimplement what an installed skill already does. `vendored` means a copy under
`.claude/skills/`; `VENDORED.md` says where each came from and what was changed.

| Need                                                                          | Skill                                                        | Source           |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------- |
| Push a feature's scope beyond what was asked                                  | `plan-ceo-review`, SELECTIVE EXPANSION mode                  | gstack           |
| Pin down requirements before building                                         | `grilling`                                                   | vendored         |
| Review a plan that changes structure: data shape, routing, build or CI config | `plan-eng-review`                                            | gstack           |
| Chase a bug or an unknown cause                                               | `diagnosing-bugs`                                            | vendored         |
| Check a diff against the repo rules and the criteria                          | `two-axis-review`                                            | vendored         |
| Find bugs in a diff                                                           | `/code-review`                                               | built-in         |
| A second opinion from a different model                                       | `codex`                                                      | gstack           |
| Click through the pages                                                       | `qa` (own branch, fixes) / `qa-only` (report only)           | gstack           |
| Critique a page's design: hierarchy, layout, type, color                      | `impeccable` `critique`, `audit`                             | vendored         |
| Catch visual regressions in the browser                                       | `design-review`                                              | gstack           |
| Check UI against web standards and accessibility                              | `web-design-guidelines`                                      | plugin           |
| Prove a change did not cost load time                                         | `benchmark`                                                  | gstack           |
| Auth, secrets, workflows or untrusted input touched                           | `security-review` (built-in), `cso` (gstack)                 | built-in, gstack |
| Build or refine a UI                                                          | `impeccable`, `vercel:nextjs`, `vercel:react-best-practices` | vendored, plugin |
| Build or change an animation                                                  | `animate`                                                    | vendored         |
| Review the motion in a diff                                                   | `review-animations`, see "Design skills" below               | vendored         |
| Audit the motion across the whole site                                        | `improve-animations`                                         | vendored         |
| Polish site copy                                                              | `editor`, `no-ai-slop`                                       | global           |
| Nothing above fits the task                                                   | `find-skills`, see below                                     | global           |

**If a listed skill is not installed, say so out loud and continue by hand.** Never skip the
step silently, and never pretend a delegated pass ran.

**Do not confuse four similar names:** `review` (gstack, generic pre-landing review, not used
here), `/code-review` (built-in, finds bugs), `two-axis-review` (vendored, rules and criteria)
and `site-review` (this repo's full pre-merge flow, which calls the middle two).

### Design skills

`impeccable` owns how a page looks. The three Emil Kowalski skills own motion, so use `animate`
rather than `impeccable animate`.

- The repo has no `PRODUCT.md` or `DESIGN.md`. Impeccable's narrow commands (`critique`,
  `audit`, `polish`, `quieter`, `typeset`, `layout`) treat the code as the design authority
  and run without them. `init`, `document`, `shape` and any redesign write new files at the
  repo root and widen scope, so they are tasks of their own, never a step inside another one.
- Impeccable's "finish the job" never widens a task. The confirmed criteria set the scope, and
  its own rule "refinement preserves" applies.
- After a UI edit, run `.claude/skills/impeccable/scripts/impeccable detect --json <changed files>`
  once. `app/` and `components/` scanned clean on 2026-10-29, so any finding is new.
- `impeccable generate-image` bills the owner's OpenAI key, and `impeccable live` starts a
  server. Run neither without the owner's go-ahead.
- `impeccable critique` ends by asking the user what to fix, saves a snapshot under
  `.impeccable/critique/`, and may start `impeccable live-server` for a browser overlay. Inside
  `site-review`, which often runs in a subagent, skip all three: end the critique with
  `Questions skipped: run inside site-review`, write no snapshot, and take plain screenshots
  instead of the overlay. Its priority issues go into the review.
- `review-animations` runs only when a user types it. To use it from a skill or a subagent,
  read `.claude/skills/review-animations/SKILL.md` and its `STANDARDS.md` and follow them.

### When the table has no row for what you are facing

Run **`find-skills`** before improvising a workflow. It installs third-party skills that load in
every later session, so it **proposes and the owner decides**. When nothing fits, say so and
do the work by hand.

### Considered and deliberately not wired in

- **superpowers**: removed from the owner's setup on 2026-10-17. Its hook forced a skill before
  every reply, and it covers the same stages as these skills at more length.
- **gstack `ship`**: bumps `VERSION`, writes a `CHANGELOG`, prefixes the title and adds an AI
  trailer. `site-task` opens the pull request instead.
- **gstack `land-and-deploy`, `canary`**: Vercel deploys on merge, and `site-review` merges.
- **gstack `autoplan`, `spec`**: scope comes from the owner.
- **Pocock `tdd`, `to-spec`, `to-tickets`, `domain-modeling`, `codebase-design`, `triage`,
  `wayfinder`, `implement`**: they assume a tracker, a spec folder or a layered codebase.
- **Impeccable design hook**: runs the engine after every edit and again on stop, outside model
  approval. Most edits here are content, and the one `detect` run above covers UI edits.
- **Emil Kowalski `emil-design-eng` and his other skills**: `emil-design-eng` gives general
  design advice that Impeccable already covers. The rest target other platforms or tasks this
  site does not have.
- **`frontend-design`, `ui-ux-pro-max`, `framer-motion-animator`, Leon's taste-skill**: each is
  another general design voice. Impeccable started from `frontend-design`, and several voices on
  one page give conflicting advice.

## Adding a skill to these rails

A skill earns a row when this project asks the question it answers. An unused row costs more
than it looks: a long skill file is followed less closely.
