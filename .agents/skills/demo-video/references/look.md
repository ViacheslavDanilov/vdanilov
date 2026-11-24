# The paper look

Source of the numbers: `$VIDEO_KIT/paper/tokens.json`. This page names tokens and never repeats a value. Read
`$VIDEO_KIT/paper/README.md` for the layout of every card and overlay. Look at `paper/boards/board.py` output to see it.

## Theme

- `paper` (light ground) is the default and fits light footage. All four Symfa apps are light.
- `ink` (dark ground) is for dark footage, when its median luminance is below 0.35. The theme is per film, cards included,
  so a card to footage crossfade never flashes from light to dark. Set `"theme"` in `film.json`.
- Ink changes the scrim, the caption pill (light), the callout panel, the spotlight stroke and the chip text. It is drawn
  by the same code; `board.py --theme ink` shows it.

## Cards

| Card     | Holds                                                                          | Notes                                                                                        |
| -------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| title    | name, two-line subtitle, audience line                                         | frame 0 is the finished card and the poster                                                  |
| problem  | kicker, two-line headline, one or two bullets (one or two lines each)          | three builds: headline, bullet 1, bullet 2                                                   |
| solution | kicker, one-line headline, three tiles (digit, title, two-line body), footnote | the only approved layout has three tiles. Four tiles is an owner decision with a new mock-up |
| close    | name, motto, one or two lines                                                  | same composition as the title card. No URL, no credit line, no presenter, no client name     |

Caps: `caps_chars` (the owner's character caps) and `caps_px` (rendered widths) in `tokens.json`. The count is a proxy, the
width is the limit. `film.py lint` fails on the width and warns on the count. A tile title that is over its width (for
example `Summarize`) becomes a shorter word (`Report`).

### Title and closing card

Both cards have three tiers in the same three styles. Tier 1 is the name (`title`, 160 px bold, ink). Tier 2 is `subtitle` (56 px Regular, slate
`text`): the two-line subtitle on the title card, the motto (one line, on the first subtitle line) on the closing card. Tier 3 is `audience` (40 px
Regular, muted): the audience line on the title card, the one or two description lines on the closing card.

The name and the accent rule (`layout.title.rule`, 52 px under the name's flat letters) sit at the same place on every film and on both cards.
Every gap between neighbouring blocks is one value, `Paper.rule_gap` (the ink gap from the name to the rule, 52 px; 54 for a name that ends in flat
letters, as Risk Profiler). Name to rule is set by the rule's position. Rule to tier 2 is `Paper.equal_gap_dy`: the rule bottom to the highest ink of
the first line. Tier 2 to tier 3 is `Paper.next_block_baseline`: the lowest ink of the last line of tier 2 to the highest ink of the first line of
tier 3 (both over the whole line). Tier 3 on the closing card has the pitch `layout.close.lines_pitch` (54 px). Every line
is centred on its ink (`Paper.ink_x`), not on its advance box. Check by pixels, not by tokens.

## Overlays

- **Spotlight** (`box`): one scrim for all boxes of a scene. Boxes only on still frames: a box does not follow a camera move.
  Keep `spot.pad_min` of free ground inside the box, and `spot.clear_min` between a stroke and any pill or panel.
- **Caption pill**: bottom edge at `caption.bottom`, optional step tag that repeats a solution tile, optional note line.
  A caption summarises, it does not transcribe the voice.
- **Callout panel**: variant `status` (red and green only when the product itself shows a pass or fail state), `neutral` (no
  pass or fail: the third build is an accent bar and a line), `single` (one row and a line, a shorter panel). Anchor `left`,
  or `right` when the footage under the left panel matters. Red and green never mean anything else. The accent never colours a value.
- **Disclaimer pill**: at most one neutral label, once, at the start of the demo chapter (for example "Sample claim form"). Never a pill about where the data or the model comes from: no "public data", "synthetic data", "fictional data", "fake" or "trained on ..." anywhere in a film, in a card, a caption, a callout or the voice. The owner decided this: it only adds noise.
- **Label pill**: `"N  Word"` with two spaces draws the digit in the digit colour.

## Safe areas

Text inside graphics safe (`safe.graphics`), panels, pills and strokes inside action safe (`safe.action`), after SMPTE ST 2046-1
and EBU R 95. `qa.py safe` fails text outside graphics safe and warns on a stroke or panel outside action safe.

## Timing

Crossfades: card to footage and footage to the closing card `timing.card_xfade`, scene to scene `timing.scene_xfade`, builds
`timing.build_xfade`. Frame 0 is the title card. The closing text holds, then fades onto the bare ground, and the last frames
are that ground, so the loop restarts on an identical picture.
