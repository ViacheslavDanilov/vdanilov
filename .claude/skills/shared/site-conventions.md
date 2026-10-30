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

`site-task` writes the confirmed criteria into `BRIEF.md` at the root of the working tree, so a
worker or a later session can read them. See **Brief and status** below. It is never committed.

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

## Model routing

The session that runs `site-task` is the orchestrator. `.claude/settings.json` starts it on
Sonnet at `high` effort. It talks to the owner, writes the brief, makes small edits itself and
commits. The merge happens in `site-review`, as **Pushing** says. Other work goes to the worker in
this table. **Pick the row by what the work is, never by a guess at how hard it is.**

| Work                                                                                      | Worker                                 | Model, effort      |
| ----------------------------------------------------------------------------------------- | -------------------------------------- | ------------------ |
| Dialog, criteria, brief, small edits, commits                                             | the session                            | Sonnet, high       |
| A plan for a structural change: data shape, routing, build or CI config, design tokens    | `site-planner` agent                   | Opus, xhigh        |
| Visual and copy work: layout, components, site copy, project pages; `impeccable critique` | `site-crafter` agent                   | Sonnet, xhigh      |
| Code with no taste in it: tests, data, scripts, accessibility, performance, an exact plan | Codex, `workspace-write`               | gpt-6.1-sol, xhigh |
| `site-review`, first pass or delta                                                        | `site-reviewer` agent                  | Opus, high         |
| `site-review` when the PR touches a high-risk path from its step 2                        | `site-reviewer` agent, `effort: xhigh` | Opus, xhigh        |
| `site-review` trivial or comment-only pass                                                | general-purpose agent, `model: sonnet` | Sonnet, high       |
| The review's fix loop and `qa`                                                            | general-purpose agent, `model: sonnet` | Sonnet, high       |
| Review lenses #2 (bugs) and #7 (second opinion)                                           | Codex, `read-only`                     | gpt-6.1-sol, xhigh |
| Technical and motion audits                                                               | Codex, `read-only`                     | gpt-6.1-sol, xhigh |
| Run `check`, `build`, `test:e2e`; search; count; summarise long output                    | `site-runner` agent                    | Haiku, high        |

This table is the instruction that sets the Agent tool's `model` and `effort` parameters.

- **A small edit stays in the session.** Handing off a one-line change costs more than making
  it, so a brief is for work that is larger, needs another model, or may outlive the session.
- **Codex never decides how something looks or reads.** It gets work with a check that passes
  or fails. Visual and copy work stays with Claude.
- **Codex does not commit.** The session reads its diff, runs the checks and commits per
  `AGENTS.md`.
- **When Codex is missing or fails**, say so and move the work to Claude: code to the session,
  lens #2 to `/code-review`, and record lens #7 as not run.
- The owner can override any row: `/model opus` in a session, or a word in chat.

Run Codex from the working tree, with the report written to a file:

```bash
codex exec -m gpt-6.1-sol -c model_reasoning_effort=xhigh -s read-only -C <worktree> \
  -o <report.md> "<prompt>" < /dev/null
```

End the command with `< /dev/null`. Without it, a `codex exec` run in the background reads
stdin, prints `Reading additional input from stdin...` and waits for input that never comes,
while the agent that started it waits for the report.

Use `-s workspace-write` instead of `read-only` when Codex implements. The prompt carries the
limits in **Delegating** and points at `BRIEF.md`.

### Brief and status

When work goes to a worker, or may outlive the session through a quota limit or a hand-off to
another account, the orchestrator writes `BRIEF.md` at the root of the working tree, and the
worker keeps `STATUS.md` beside it. Both are gitignored and never committed. A worker in another
worktree, such as `site-review`'s, gets both by absolute path from the caller.

- **`BRIEF.md`**, written once: the goal; the acceptance criteria the owner confirmed, word for
  word; what is out of scope; the `AGENTS.md` sections that apply; the files to start from; how
  to verify, with commands and expected output; the limits in **Delegating**.
- **`STATUS.md`**, updated after every step: done, with commit shas; in progress; the next
  step; check results with numbers; blockers and questions for the owner.

Any worker, or a new session on another account, reads both before anything else. A worker
never edits `BRIEF.md`: a change of scope goes back to the owner, who confirms a new brief. A
read-only worker, such as `site-planner`, `site-runner` or a read-only Codex run, reports its
progress in its reply, and the orchestrator records it in `STATUS.md`.

Both files belong to one task. The orchestrator deletes them once the task's pull request merges
or closes, or the task ends without one, so the next session does not pick up a finished task.

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
| Explore several new directions for a piece of UI                              | `/prototype`, typed by the owner only                        | vendored         |
| Stress a component with worst-case data                                       | `break-ui`, see "Design skills" below                        | vendored         |
| Make the site feel native on a phone                                          | `mobile-native`, see "Design skills" below                   | vendored         |
| Find why an animation drops frames, or pick a cheap property to animate       | `animation-performance`                                      | vendored         |
| Polish site copy                                                              | `editor`, `no-ai-slop`                                       | global           |
| Nothing above fits the task                                                   | `find-skills`, see below                                     | global           |

**If a listed skill is not installed, say so out loud and continue by hand.** Never skip the
step silently, and never pretend a delegated pass ran.

**Do not confuse four similar names:** `review` (gstack, generic pre-landing review, not used
here), `/code-review` (built-in, finds bugs), `two-axis-review` (vendored, rules and criteria)
and `site-review` (this repo's full pre-merge flow, which calls `two-axis-review`, and
`/code-review` as a fallback).

### Design skills

`impeccable` owns how a page looks. Four Emil Kowalski skills own motion: `animate`,
`review-animations`, `improve-animations` and `animation-performance`, so use `animate` rather
than `impeccable animate`. Three more cover jobs outside motion: `prototype` explores new UI,
`break-ui` tests a component against worst-case data, and `mobile-native` fixes what makes the
site feel like a website on a phone.

Every design skill keeps two decisions the owner made: body text stays justified, and links
are underlined only on hover. Where an Emil skill names a skill this repo leaves out, read
`emil-design-eng` as `impeccable critique` and `find-animation-opportunities` as
`improve-animations`, and treat `pick-ui-library` and `animate-expo` as out of scope.

- `PRODUCT.md` at the repo root records who the site is for and what it must keep true. The
  repo has no `DESIGN.md`, so Impeccable's narrow commands (`critique`, `audit`, `polish`,
  `quieter`, `typeset`, `layout`) treat the code as the design authority. `document`, `shape`
  and any redesign write new files or replace the look, so they are tasks of their own, never
  a step inside another one. A change to `PRODUCT.md` needs the owner's approval.
- Impeccable's "finish the job" never widens a task. The confirmed criteria set the scope, and
  its own rule "refinement preserves" applies.
- The design hook in `.claude/settings.json` runs Impeccable's detector after every edit to a UI
  file, and a deeper pass when the session stops. It never blocks an edit, stays quiet on a clean
  file, and uses no model quota. Fix what it reports. A false positive is silenced only with
  `impeccable hooks ignore-value`; `ignore-file` and `ignore-rule` need the owner's go-ahead. A
  worker without the hook, such as Codex, runs
  `.claude/skills/impeccable/scripts/impeccable detect --json <changed files>` once at the end of
  UI work. `app/` and `components/` scanned clean on 2026-10-29.
- Impeccable's four agents, `impeccable-*` in `.claude/agents/`, inherit the session's model and
  keep the effort upstream ships. `impeccable-finish-reviewer` runs at `high`. The other three
  run at `medium`, an exception to the two levels in **Model routing**.
- `impeccable generate-image` bills the owner's OpenAI key, so it needs the owner's go-ahead.
- `impeccable live` and its helper server may run without asking. The helper listens on port 8400. When a dev server has to be started for it, use a port other than 3000, which the owner
  keeps for their own `npm run dev`.
- `impeccable critique` ends by asking the user what to fix. In a subagent nobody can answer,
  so it lists the questions in its report and does not wait. Its snapshots under
  `.impeccable/critique/` are ignored by git.
- To change an element that is already on a page, use `impeccable live`. A new piece of UI in
  several directions is `/prototype`, which only the owner starts: an agent never routes to it.
  Never commit its picker or harness, even when the owner keeps a variant.
- `break-ui` adds a worst-case toggle and fixtures. Keep them out of the pull request: commit
  only the fixes the owner chose.
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
- **The other nine Emil Kowalski skills**:
  - `emil-design-eng`: general design advice that Impeccable already covers.
  - `apple-design`: Apple-style design and gesture-driven spring motion for touch interfaces.
    Impeccable covers the design and `animate` the motion on this site.
  - `find-animation-opportunities`: `improve-animations` already lists the missed openings.
  - `remove-animations`: `improve-animations` plans what to cut, and the site has little motion
    to remove.
  - `animation-vocabulary`: a glossary for people who write prompts, not a task.
  - `pick-ui-library`: the stack is settled, and a new dependency is a task of its own.
  - `ask-sonner`: the site uses no Sonner toasts.
  - `animate-expo` and `write-swift`: React Native and Swift.
- **`frontend-design`, `ui-ux-pro-max`, `framer-motion-animator`, Leon's taste-skill**: each is
  another general design voice. Impeccable started from `frontend-design`, and several voices on
  one page give conflicting advice.

## Adding a skill to these rails

A skill earns a row when this project asks the question it answers. An unused row costs more
than it looks: a long skill file is followed less closely.
