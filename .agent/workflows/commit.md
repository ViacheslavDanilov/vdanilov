---
description: Generate a commit message for staged changes
---

# Commit Message Generation

Follow these steps to generate a commit message:

## 1. Check Staged Files

Run `git status` to see which files are staged for commit.

## 2. Get Staged Changes

Run `git diff --cached` to see the actual content of staged changes.

- **Important**: Use `--cached` to only see staged changes, not unstaged ones.
- If the diff is too large, run `git diff --cached --stat` for a summary first.

## 3. Generate the Message

Create a commit message using conventional commit format:

- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`
- Keep subject line under 72 characters
- Use imperative mood ("add feature" not "added feature")

## 4. Present to User

Show the generated commit message and ask if they want to commit with it.

## Troubleshooting

- If context seems wrong, explicitly run `git diff --cached`
- For large diffs, output to file: `git diff --cached > /tmp/changes.txt`
- For binary files, focus on file names rather than content
