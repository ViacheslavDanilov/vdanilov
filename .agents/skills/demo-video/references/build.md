# Building a film

Commands run from `$VIDEO_KIT` with `PYTHONDONTWRITEBYTECODE=1`. Paths in `film.json` are relative to its folder.
`$VIDEO_KIT/README.md` is the long form, `templates/film.json` the annotated spec.

## film.json

`slug`, `name`, `spoken_name`, `theme`, `duration`, `footage` (mezzanine and index), `cards` (title, problem, solution, close
with `text_until`), `scenes` (a card with `builds`, or footage with a frame map `[first out frame, last out frame, first source
index, "run" | "hold"]`, `view` for a zoom crop, `xfade_in`), `overlays` per scene (`box`, `caption`, `pill`, `disclaimer`,
`callout`, with times in seconds), `forbidden_src` (source ranges that must never show), `lines`, `voice`, `music`, `encode`
(`keys`), `captions` (text of a cue where the screen shows digits), `qa` (`privacy_words`, `banned_words`, `allowed_words`,
`spoken_aliases`, `pad_min`, `clear_min`, `padding_waive`).

`python3 scripts/film.py lint film.json` checks the frame map, the forbidden frames, that every overlay overlaps its scene
and the rendered width of every text. Fix every FAIL. Understand every warning.

## Voice

Once per machine: `uv venv --python 3.12 kokoro-venv`, `uv pip install --python kokoro-venv/bin/python -r requirements-kokoro.txt`,
`export HYPERFRAMES_PYTHON="$PWD/kokoro-venv/bin/python"`. Then `python3 scripts/tts.py --film film.json --speed 0.97`.
The model SHA-256 is checked; a different file stops the run. Synthesise slower speeds only for the lines that overrun.

## Music

The series uses one bed: `music/bgm0.wav` of the kit (MusicGen, the CoverLens clip). `python3 scripts/make_music.py --film film.json`
joins enough copies with 3 s crossfades for the film (the path is `film.json` `music.bed`). A new bed
(`scripts/music_gen.py`) is the owner's decision. See `music/README.md`.

## Build

```
python3 scripts/film.py build film.json --profile master --out <folder>
python3 scripts/film.py build film.json --profile web    --out <folder> --no-mix
python3 scripts/film.py vtt   film.json --out <folder>
python3 scripts/film.py sheet film.json --every 2 --out sheet.png
```

`build` mixes the sound (`mix.py`: voice bus -18 LUFS, bed -25 LUFS ducked by the voice, final trim to -18 LUFS), renders every frame in Python, encodes once, muxes,
writes the poster and prints the size against the cap. `--remux` replaces only the audio of a finished file.
Profiles: `web` (the site), `web-17`, `web-19` and `web-21` (the size ladder; `web-21` only for films whose dense text needs the size cap), `master` (Drive). Cap for the site: 20 MB and 2.0 Mbit/s.
When `web` is over the cap, the build names the next profile.

`film.py frames film.json --png DIR --at 0,630,...` writes single composed frames; `film.py sheet --mp4 FILE` makes a contact
sheet of a built file.

## Disk

Source frames are cut into `<build>/src1080` and `<build>/src4k` (about 1 GB for 900 frames). All of it is a cache: delete the
build folder when the film is delivered.
