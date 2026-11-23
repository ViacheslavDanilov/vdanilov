# Writing the cards and the voice

Template: `$VIDEO_KIT/templates/storyboard.md` (card texts with sources, scene table, line table with "rests on", page check)
and `templates/lines.tsv`.

## Facts only

- Every card text and every voice line has a source: a sentence of the project page, a data file of the project, or a frame of
  the film. Write the source in the storyboard before you write the line.
- Make no accuracy, speed or saving claim that the project page does not make. Name no real person or client. No URL on the
  closing card.
- The voice never contradicts the project page. When the page and the product disagree, say so to the owner. Do not pick one.
- American English. No em dash. The product name is written as it is spoken (`Cover Lens`, `Insurecast`).
- Numbers in lines are words ("thirty-six thousand"). The number on screen and the spoken number are the same number.

## The problem card

Two lines of headline in the owner's words for the problem, then one or two bullets: how it is done today, and what a mistake
costs. It names the reader's job, not the product. Caps are in `tokens.json`.

## The solution card

One line of headline ("How <Product> works"), three tiles. Each tile is one verb (digit, title) and two short lines. The three
verbs are the three steps of the film, and the caption step tags in the demo repeat them. A footnote of one line says what makes
the result trustworthy (fixed rules, a source beside every value). It makes no claim the page does not.

## The voice lines

About fourteen lines for 60 to 90 seconds. One idea per line. Plain, short sentences, active voice. Say what the screen shows,
and why it matters, never which button is clicked. Each line has a start and a latest end in `lines.tsv`: the latest end is the
next start minus 0.3 s, or the scene end. About 2.5 words per second at the 0.97 speed.

Fit rule when a clip overruns its window: first lengthen the hold under it (the footage is still there, so a hold costs
nothing), then synthesise at 1.03, then 1.08. Never change the wording to make it fit. Never overlap two clips. Keep 0.3 s
between clips.

## Words Whisper cannot tell apart

Homophones (red and read, four and for) and split product names go into `qa.spoken_aliases` in `film.json`, or the line is
reworded. `qa.py` compares the transcript with the script word for word, numbers as digits.

## Closing card

Name, a three-word motto that repeats the tile verbs ("Upload. Read. Check."), one or two lines that say what each result
carries. The text holds, then fades onto the bare ground.
