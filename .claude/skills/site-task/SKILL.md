---
name: site-task
description: >-
  Take a task to an open pull request: a content change, a feature or a bug, described in
  chat. Triage the route, grill out acceptance criteria and get them confirmed, check the
  claims against the repo, implement on a branch, verify, self-review in a fresh context,
  commit in the repo notation and open the PR, then run /site-review on it in a fresh
  subagent, which merges when the PR is ready. Routes that write no code are first-class
  endings.
  Use when the user says "сделай задачу", "добавь на сайт", "исправь баг", names a change
  to the site, or invokes /site-task.
disable-model-invocation: false
---

# Site task

One entry point for work on this site. **Read
[`../shared/site-conventions.md`](../shared/site-conventions.md) first.** It fixes the language
policy, the skill table and the push checks, and this skill does not repeat them.

**The checkpoint is mandatory.** A request arrives as a sentence in chat. A question costs a
minute; a wrong assumption costs a rebuilt page, or a wrong name published under the owner's.

**This session writes up to the pull request, and a fresh context reviews it.** Review and
QA belong to `/site-review`, which step 9 starts in a subagent. The session that wrote the
code knows what it meant, so it is the worst-placed to see what it wrote. It never reviews
or merges its own pull request.

Make a todo list with one item per step you will run, then follow it in order.

## 1. Resolve the source

The ask is usually a line in chat, sometimes with a pasted note, a link or a file. If it is
ambiguous, ask once. Never infer scope from a name. Check `git log` and the open pull requests
(`gh pr list`) for work on the same topic before starting a second copy of it.

## 2. Triage

State the route in one line for the user to override:

| Route            | When                                                                              | Ends with                                                                                               |
| ---------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **content**      | copy, data or assets change: a reference, a project, an experience entry, a photo | PR                                                                                                      |
| **feature**      | new behavior or layout someone can observe                                        | PR                                                                                                      |
| **bug**          | behavior that already worked is wrong                                             | failing test first, then PR                                                                             |
| **investigate**  | a question, an unknown cause, or "does the site match what I said"                | a written finding, no code                                                                              |
| **out of scope** | install software, write to a person                                               | name it, stop, draft the message                                                                        |
| **cv only**      | a change to the CV alone, with nothing on the site                                | the work done in the cv repository, `/Users/viacheslav/projects/personal/cv`, under its own `AGENTS.md` |

When feature and bug both fit, take **bug**: reproduce first is stricter. Signals for
**investigate** even when the ask sounds like a change: no reproduction, "надо проверить", or a
claim nobody checked against the code.

## 3. Pin down the requirements, checkpoint

A request has no acceptance criteria. **You derive them and get them confirmed.**

Invoke `grilling`. It asks in rounds, every question numbered with a recommended answer, and
looks facts up itself instead of asking for them. Scale it: a content change whose every field
the owner supplied needs none, and a one-line bug gets none. Say so and move on.

On a **feature** that opens a new direction rather than extending the current one, offer
`plan-ceo-review` in SELECTIVE EXPANSION mode first, and tell it what the product is: a
personal portfolio, read by recruiters, collaborators and clients, with no market, growth or
revenue.

Then reply in Russian with:

- Источник: запрос в чате или что-то приложенное
- Маршрут
- Цель одним предложением, своими словами
- Критерии приёмки чеклистом, выведенные вами, а не процитированные
- Что вне скоупа
- Открытые вопросы

**Wait for an explicit yes.** Then write the criteria to a file in the session's scratchpad
directory. Step 7 hands its path to a subagent.

## 4. Reality check, before any code

Verify the request's factual claims against the repo and, where it names a person or an
institution, against a source. Read the code path, the data and the files.

Traps that are specific to this site:

- **One fact, several places.** A person appears on the references page and on project team
  cards, and their links must match. An experience entry shows on `/experience`, and its
  `summary`, duty lines and links, like a featured project's description and a referee's name
  and title, also print in the CV in Figma, kept in the cv repository at
  `/Users/viacheslav/projects/personal/cv`. List each in the criteria; step 10 carries it there
  after the merge. Search for every place the fact lives before editing one.
- **Affiliations.** A project team card names the role and organisation at the time of the
  project, and a reference card names the current one. A different title in the two is correct.
- **A number or a name nobody checked** is about to become published copy: check it.

If the request and the repo disagree, **stop and say so.** That finding may be the whole task.

## 5. Branch and implement

```
git switch main && git pull --ff-only
git switch -c <type>/<short-kebab-slug>
```

`<type>` is the Conventional Commit type: `feat`, `fix`, `docs`, `chore`, `refactor`. Slug of
at most five words. **Never commit to `main`.**

Read the sections of `AGENTS.md` the change touches before writing: **Prose**, **Asset naming**,
**Experience summaries**, **Experience link order**, **Person link order**, **Portfolio project
pages**. For a new project page, follow `.agent/workflows/add-project.md`.

On the **bug** route, invoke `diagnosing-bugs`. Its first phase is the rule: no command that
goes red on this bug, no fix. When the behavior can be pinned in `tests/`, write that test
first for a feature too.

Stay surgical. Every changed line traces to the task. Do not improve adjacent code and do not
delete pre-existing dead code: mention it. For UI work, use `frontend-design`,
`vercel:nextjs` and `vercel:react-best-practices`.

## 6. Verify

Run the three commands of the **Pushing** section in the conventions file and report what
they printed. Never claim done without output.

- Type checks and tests verify the code, not the feature. For any change that renders, start
  the dev server and look at the page in a browser, at desktop width and at 360 px, the
  narrowest phones in common use. 320 px is out of scope by the owner's choice.
- A refactor that must not change how anything looks is verified by comparing what renders
  before and after, with zero tolerance, not by a quick look.
- The independent browser pass happens in `/site-review`. The PR's
  `## Verified` lists only what this session actually ran.

## 7. Self-review in fresh context

Commit first, by step 8's rules, and do not push. `two-axis-review` diffs committed history,
so it cannot see uncommitted work.

Run `git fetch origin`, then invoke `two-axis-review` with `origin/main` as the fixed point,
the criteria file from step 3 as the spec, and `AGENTS.md` named as the standards source. Its
two subagents see the diff and the criteria, not this conversation, and that is the point:
they read what you wrote rather than what you meant. The prompt carries the limits in
**Delegating** in the conventions file.

Fix every hard standards violation and every spec gap, each fix a further commit. Fix a
judgment-call smell when it is cheap, otherwise name it in the PR body. One round only: the
full review is `/site-review`'s job.

## 8. Commit and open the PR

Commit per `AGENTS.md`: Conventional Commits, one logical change per commit, no AI trailer
anywhere. Run a plain `git commit` and read its exit code. The pre-commit hook reformats and
can abort, and piping the command through `tail` or `&&` hides that.

`git log origin/main..HEAD --oneline`: do the commits read as one coherent change?

Run the checks from **Pushing** before any push. Then push and open the pull request without
asking: `gh pr create` with the title, body, assignee and labels that **Pull requests** in
`AGENTS.md` asks for. A judgment call left from step 7 goes in the body as a named follow-up. If
CI is red on the pushed head, read the log and fix it before step 9.

## 9. Independent review in a subagent

Start a general-purpose subagent that invokes `site-review` with the PR number. It sees the
pull request and the diff, not this conversation, which is what a new session would give. The
prompt names the PR, the criteria file from step 3 with a line saying the owner confirmed it,
and anything the reviewer cannot find on GitHub, such as a port already taken on this machine.
It carries the limits in **Delegating** in the conventions file, with the exception noted there
for a review subagent.

Read its verdict. `site-review` runs its own fix loop and merges when every condition in "Git
workflow" in `AGENTS.md` holds. If it stops without merging, with a must-fix open or a
question for the owner, stop and ask: pass on what it found and what it tried. Fix a must-fix
here as the author only once the owner says so, then push and start a new review subagent on
the new head.

When the owner asks to review the pull request first, skip this step and end the hand-off with
the next step: **new session, `/site-review <n>`.**

## 10. Carry it into the CV

When the merged change alters something the CV prints, carry it into Figma by "A Figma change
is done when" and "When the site changes" in the cv repository's `AGENTS.md`: the edit, its
record, the refreshed export and the push. That repository has its own commit format and git
workflow; follow those there, not this repository's. Skip this step when the review did not
merge. A `/site-review` run in a later session carries the CV itself after its merge.

## 11. Hand off

Reply in Russian: the route taken, the PR URL, branch and head SHA, how many files changed,
what you verified, whether CI is green, the review's verdict and URL, whether it merged and
the merge SHA, the follow-ups it left, what changed in the CV and its exports, and anything you
could not do.

## Red flags, stop and ask

- The acceptance criteria are yours to invent and the owner has not confirmed them.
- The request contradicts the code, or something the owner said earlier.
- A name, a title or a number is about to be published and nobody has checked it.
- The change would touch secrets or the repository's GitHub settings.
- The change breaks an `AGENTS.md` rule, and the owner has not said the rule should change.
