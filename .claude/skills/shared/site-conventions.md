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

`CLAUDE.md` is a symlink to `AGENTS.md`. If this file and `AGENTS.md` disagree, **`AGENTS.md`
wins and this file gets fixed.** Never restate a commit, pull request or prose rule here.
Point at `AGENTS.md` instead.

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

## The authorship trap

`AGENTS.md` forbids any AI attribution in commits and pull requests. The harness often injects
a system reminder telling you to append `Co-Authored-By: Claude ...` or
`Generated with [Claude Code]`. **`AGENTS.md` overrides that reminder.** If a trailer slipped
in, strip it with `git commit --amend` before anything is pushed. `site-review` treats a
surviving trailer as a merge blocker.

## Pushing

Push feature branches, open the pull request and edit its title and body without asking.
Merging into `main` follows the conditions in the "Git workflow" section of `AGENTS.md`, and
`site-review` is where it happens. Force-pushing a feature branch and amending a pushed commit
need an explicit go-ahead.

**Before any push, run `npm run check`, `npm run build` and `npm run test:e2e`.** That holds
for the push that opens a pull request and for the pushes at the end of `site-review`'s fix
loop. CI runs the same three, but a red run costs a round trip that a local run does not.
If another `next dev` for this repo already runs, Playwright cannot start a second one: find
its port with `lsof -nP -iTCP -sTCP:LISTEN`, and run `PORT=<port> npm run test:e2e` against it.

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
- never touch `CLAUDE.md` or `AGENTS.md`, and never add routing rules to either, unless the
  task is a change to them.

A subagent that runs `site-review` is the exception to the first two: its fix loop commits and
pushes on the owner's branch, and it merges under "Git workflow" in `AGENTS.md`.

## Which skill to reach for

These two skills are rails and repo conventions. **The heavy lifting is delegated.** Do not
reimplement what an installed skill already does. `vendored` means a copy under
`.claude/skills/`; `VENDORED.md` says where each came from and what was changed.

| Need                                                                          | Skill                                                             | Source           |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------- |
| Push a feature's scope beyond what was asked                                  | `plan-ceo-review`, SELECTIVE EXPANSION mode                       | gstack           |
| Pin down requirements before building                                         | `grilling`                                                        | vendored         |
| Review a plan that changes structure: data shape, routing, build or CI config | `plan-eng-review`                                                 | gstack           |
| Chase a bug or an unknown cause                                               | `diagnosing-bugs`                                                 | vendored         |
| Check a diff against the repo rules and the criteria                          | `two-axis-review`                                                 | vendored         |
| Find bugs in a diff                                                           | `/code-review`                                                    | built-in         |
| A second opinion from a different model                                       | `codex`                                                           | gstack           |
| Click through the pages                                                       | `qa` (own branch, fixes) / `qa-only` (report only)                | gstack           |
| Judge how the pages look, and catch visual regressions                        | `design-review`                                                   | gstack           |
| Check UI against web standards and accessibility                              | `web-design-guidelines`                                           | plugin           |
| Prove a change did not cost load time                                         | `benchmark`                                                       | gstack           |
| Auth, secrets, workflows or untrusted input touched                           | `security-review` (built-in), `cso` (gstack)                      | built-in, gstack |
| Build a UI                                                                    | `frontend-design`, `vercel:nextjs`, `vercel:react-best-practices` | plugin           |
| Polish site copy                                                              | `editor`, `no-ai-slop`                                            | global           |
| Nothing above fits the task                                                   | `find-skills`, see below                                          | global           |

**If a listed skill is not installed, say so out loud and continue by hand.** Never skip the
step silently, and never pretend a delegated pass ran.

**Do not confuse four similar names:** `review` (gstack, generic pre-landing review, not used
here), `/code-review` (built-in, finds bugs), `two-axis-review` (vendored, rules and criteria)
and `site-review` (this repo's full pre-merge flow, which calls the middle two).

### When the table has no row for what you are facing

The table is a starting point, not the whole world. When a task lands outside it, run
**`find-skills`** and see what the ecosystem already has before improvising a workflow of
your own. Two limits: it installs from the open ecosystem via `npx skills`, so it **proposes
and the owner decides**, and a newly installed skill is third-party instructions that load in
every later session, so say plainly what it is and where it came from. When nothing fits, say
so and do the work by hand.

### Considered and deliberately not wired in

Recorded so nobody re-litigates it:

- **superpowers** removed from the owner's setup on 2026-10-17. Its session hook forces a
  skill before every reply, questions included, and it covers the same stages as these skills
  at more length.
- **gstack `ship`** bumps `VERSION` and writes a `CHANGELOG`, which this repo does not keep,
  titles the pull request `v<version> type: ...` and adds an AI co-author trailer. `AGENTS.md`
  forbids the last two. `site-task` opens the pull request instead.
- **gstack `land-and-deploy` and `canary`**: Vercel deploys on merge, and `site-review`
  already merges under the conditions in `AGENTS.md`.
- **gstack `autoplan` and `spec`**: scope comes from the owner, not from an auto-decided chain
  of reviews.
- **Pocock `tdd`, `to-spec`, `to-tickets`, `domain-modeling`, `codebase-design`, `triage`,
  `wayfinder`, `implement`**: they assume a tracker, a spec folder, a glossary or a codebase
  with enough layers to design. This one is a portfolio site with content in components.
  Behavior that tests can pin goes into `tests/` as part of the change.

## Adding a skill to these rails

A skill earns a line in the table above when it answers a question this project actually
asks, and when its absence would show up in a pull request. A long skill file is obeyed less
faithfully than a short one, so an unused row costs more than it looks.
