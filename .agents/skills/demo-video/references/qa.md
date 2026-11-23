# QA

`python3 $VIDEO_KIT/scripts/qa.py --film film.json --mp4 <web file> --build <build> [--out qa]` writes `qa/qa.md` and sheets. Read the
docstring of `scripts/qa.py` for every option. `CHECKLIST.md` lists the rows a film must tick.

Results: `pass`, `warn` (understand it), `FAIL` (fix it), `EYES` (a sheet for a person to look at), `SKIPPED` (the section could
not run: say why in the report; it never passes).

| Section    | Measures                                                                                          | Read                                                           |
| ---------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| file       | size, frame count, CFR, High level 4.1, four colour tags, AAC 48 kHz, moov first, key frames, cap | the table                                                      |
| audio      | -18 LUFS +- 0.5, true peak, voice over bed, voice ends 0.6 s early, silent tail, fade-in start    | the table and the mix report                                   |
| transcript | Whisper of every line against `lines.tsv`, numbers as digits                                      | a FAIL names the word; homophones go to `qa.spoken_aliases`    |
| frames     | contact sheet of the decoded file every 2 s                                                       | `frames-sheet.png`: soft, clipped, blinking?                   |
| names      | em dash, hosts, banned and private words, capitalised words in the voice                          | the table                                                      |
| caps       | rendered widths against the caps (`film.py lint`)                                                 | warnings are character counts                                  |
| padding    | free ring inside every spotlight box, no text at the stroke; 1080p frame and 2x crop of the 4K    | `padding-2x.png`: red edge, orange ring limit, blue outer ring |
| clearance  | gap between every stroke and every pill, caption, disclaimer and panel shown together             | the table                                                      |
| safe       | text inside graphics safe; strokes and panels inside action safe                                  | a warn is a stroke close to the edge                           |
| banding    | flat card pixels against the decoded ground; 5x sheet of the encode error                         | `banding5x.png`: mid-grey is no error, look for steps          |
| loop       | frame 0 is the title card; the last 3 frames are its ground                                       | the table                                                      |
| privacy    | OCR of every used source frame (every 0.5 s) and every card                                       | each hit has a crop; OCR can miss text                         |
| fit        | each clip against its start, latest end and the next line (0.3 s gap)                             | the table                                                      |
| seams      | 1:1 and 4x crops at every crossfade midpoint and hold start and end                               | `seams-N.png`: double text, blink, soft edge?                  |

A padding finding that is a design decision (the box surrounds an element's own border) is written into `film.json`
`qa.padding_waive` with a reason. The reason is printed in the report, so the reviewer reads it. Do not waive to silence a check.

Then run `demo-video-review` in a fresh subagent. Fix its must-fix items. Run `qa.py` again. A second review round only for
a must-fix that changed the film.
