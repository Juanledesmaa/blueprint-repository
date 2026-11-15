# Blueprint Repository

Personal Factorio lookup site with four tabs:

- **Blueprints** — search, category chips, sorting, and one-click copy of blueprint strings.
- **Logistics** — the logistic network: robots, roboports, chests, requests, groups, space logistics.
- **Combinators** — the circuit network: wires, signals, the four combinators, building blocks and ready-to-build circuits with wiring diagrams.
- **Custom** — blueprints generated on request, each checked in the Factorio Blueprint Editor.

Every blueprint string on the Blueprints and Custom tabs has an **Editor ↗** button. It opens the string in the hosted [Factorio Blueprint Editor](https://fbe.factorygamefan.com/) (`https://fbe.factorygamefan.com/#source=<string>`), where it can be viewed and edited.

The two guide tabs have search, section chips, a type filter (Explainer / Reference / How-to / Fix) and two views: a **cheat sheet** of picture cards and a **full guide** with screenshots, wiring diagrams, steps and the longer explanation folded under "More detail". Each topic has its own link, e.g. `#combinators/sr-latch`.

## Sources

- Blueprint data and images: [autosaved.org/factorio/blueprints](https://autosaved.org/factorio/blueprints) (images are hotlinked from their S3 bucket, not stored here).
- Guide content: researched from the [official Factorio Wiki](https://wiki.factorio.com/) (CC BY-NC-SA 3.0) and rewritten; checked against game version 2.1, base game + Space Age. Every topic lists the wiki pages it is based on.
- Guide pictures: in-game screenshots, animations and item icons hotlinked from the wiki's image server (`wiki.factorio.com/images/…`), not stored here.

## Structure

- `index.html` — the whole app (vanilla HTML/CSS/JS, no build step)
- `data.js` — extracted blueprint data (184 blueprints, 428 blueprint strings)
- `guide-logistics.js` — Logistics tab content (42 topics)
- `guide-combinators.js` — Combinators tab content (49 topics, 17 wiring diagrams)
- `custom.js` — Custom tab content, newest first; pictures in `custom/`
- `tools/` — scripts that build and check custom blueprints (not part of the site)

### Adding a guide topic

Append an object to `entries` in one of the guide files:

```js
{
  id: 'my-topic',            // used in the link: #logistics/my-topic
  title: 'My topic',
  category: 'Chests',        // section chip; add its colour to `colors` if new
  type: 'How-to',            // Explainer | Reference | How-to | Fix
  sum: 'One-sentence summary.',
  facts: [['Label', 'Value']],          // cheat sheet: key facts
  cheat: ['Short bullet'],              // cheat sheet: bullets
  body: `<p>Full explanation…</p>`,     // full guide
  steps: ['First do this'],             // optional numbered steps
  table: { head: ['A', 'B'], rows: [['1', '2']] },  // optional; add wide: true for a full-width card
  img: [{ f: 'Roboport gui.png', cap: 'Caption' }],  // wiki file names; the first one is the card picture
  icons: ['Roboport', 'Logistic robot'],             // or: a strip of item icons on the card
  flow: ['Requester chest', 'Inserter', 'Assembling machine 2|Assembler'],  // or: an icon chain
  src: ['Wiki page title'],             // links to wiki.factorio.com
  kw: 'extra search words',
}
```

Pictures: `f` is the file name as on the wiki (`File:Roboport gui.png` → `'Roboport gui.png'`). Optional extras: `w` / `h` (pixel size, avoids layout jumps), `tw` (width of a wiki thumbnail to show instead of the full file; GIFs then show a still on cards and animate when opened; falls back to the full file if the thumbnail does not exist), `fit: 'cover'` (crop to fill the card).

Text shorthand: `{SA}` Space Age badge, `{2.1}` version badge, `{red}` / `{green}` coloured wire names, `{i:Steel plate}` inline item icon (the wiki's icon file name without `.png`), `[[logistics/roboport|Roboport]]` link to another topic.

## Generating a custom blueprint

1. Write a generator in `tools/` on top of `tools/blueprint.py` (see `tools/mining_outpost.py`). It places entities by top-left tile and encodes the blueprint string.
2. Run it. `Blueprint.check()` reports overlapping entities, machines outside every pole's supply area, wires that are too long, poles cut off from the rest, and drills that do not drop onto a belt. It must come back empty.
3. Render it in the real editor: `node tools/render.js <file with the string> <out.png> 2`. This needs Playwright and network access to `fbe.factorygamefan.com`. Look at the picture.
4. Save a 1600×1000 picture in `custom/` and add an entry at the top of `custom.js`:

```js
{
  title: 'Mining outpost: 28 drills on one yellow belt',
  category: 'Mining',                    // chip; colours are in BP_COLORS in index.html
  image: 'custom/mining-outpost.webp',
  stats: ['28 drills', '14 ore/s'],      // short facts shown as pills
  desc: '<p>What it does and how to place it.</p>',
  blueprints: [{ label: '28 drills, belt out east', string: '0eNq…' }],
}
```

These checks cover layout, power and the editor's rendering. Nothing here runs the game, so a new blueprint is untested in-game until someone places it.

## Deploy

It's a static site: point Netlify at the repo root with no build command and `/` as the publish directory.
