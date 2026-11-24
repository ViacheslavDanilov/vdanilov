---
name: demo-video-review
description: >-
  Review a built demo film in a fresh context: check every card and voice line against its source in
  the product repository and the site page, run the kit's QA, look at the frame sheets and crops, and
  list must-fix and should-fix items with the file and time of each. Use when the user asks to review,
  check or QA a demo video or product film, or after demo-video finishes a build.
disable-model-invocation: false
---

# Demo video review

Source: `_video-kit/skills/demo-video-review/` on Google Drive. Edit there, never in a copy.

Review a finished film the way a producer who did not make it would. Work in a session or a subagent that did not build the
film: a reviewer that shares the builder's context confirms the builder's view. Read the files, not the builder's summary.

`$VIDEO_KIT` is the kit folder (`demo-video` SKILL.md gives the default path). This skill reuses
`../demo-video/references/look.md` and `../demo-video/references/qa.md`. Read both before you start.

## Inputs

The film folder: `film.json`, `storyboard.md`, `voice/lines.tsv`, the built web mp4 (and master), the QA folder if one exists.
The product repository and the site page named in the storyboard. If something is missing, say so and stop.

## Steps

1. **Facts against sources.** For every card text and every voice line, open its source in the storyboard (the page sentence,
   the data file, the frame) and check it says that. Check every number the voice or a caption says against the frame it plays over.
   Look for any claim the page does not make: accuracy, speed, saving, a name, a client, a comparison. Check that the voice never
   contradicts the page.
2. **QA.** Run `python3 $VIDEO_KIT/scripts/qa.py --film film.json --mp4 <web file> --build <build> --out <qa>` (or read the report
   if one is fresh). Read `qa.md` fully, not only the summary. For each warn, decide if it matters. A SKIPPED section is a finding.
3. **Frames.** Open `frames-sheet.png`. Make your own sheet at the moments that matter: `film.py sheet film.json --mp4 <file> --at <times>`
   and `film.py frames film.json --png <dir> --at <frames>`. Look at 1:1 and at 4x (`seams-N.png`, `padding-2x.png`, `banding5x.png`):
   soft or jagged edges, double text in a crossfade, a blink at a hold, a box that clips content or sits tight, a pill over
   something the voice talks about, text outside the safe area, a host, a key or a real name on any frame.
4. **Sound and words.** Read `lines.tsv` aloud against the transcript in `qa.md`. Check the product name as spoken, the numbers as
   words, the line lengths against the scenes. List what only ears can judge for the owner (row 18 of `CHECKLIST.md`).
5. **Rules.** The hard rules of `demo-video` SKILL.md: no text about where the data or the model comes from (public, synthetic, fictional, fake, "trained on"; a disclaimer pill is only a neutral label; finding it is a must-fix), tokens only, caps, no em dash (scan every text file of the film folder),
   no `-v2` names, file and encode profile, size cap, the archive layout.
6. **Loop.** Frame 0 is the finished title card, the last frames are its ground, the last 0.1 s is silent.

## Output

Write one file, `review.md`, in the film folder, with three lists. Every item has the time (seconds and frame), the file or the
section of `qa.md`, what is wrong, and the fix.

- **Must-fix:** a false or unsourced claim, a privacy hit, a failed QA row, a text over its cap, a wrong number, a broken loop.
- **Should-fix:** tight padding, a long caption, a weak line, a warning that has a cheap fix.
- **Owner's ears and eyes:** what only a person can judge.

End with one line: ready, or not ready with the count of must-fix items. Do not edit the film. The builder fixes and runs the
review again once. No em dash, no AI attribution, in the review or anywhere else.
