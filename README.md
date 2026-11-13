# Blueprint Repository

Personal Factorio lookup site with three tabs:

- **Blueprints** — search, category chips, sorting, and one-click copy of blueprint strings.
- **Logistics** — the logistic network: robots, roboports, chests, requests, groups, space logistics.
- **Combinators** — the circuit network: wires, signals, the four combinators, building blocks and ready-to-build circuits with wiring diagrams.

The two guide tabs have search, section chips, a type filter (Explainer / Reference / How-to / Fix) and two views: a **cheat sheet** of compact cards and a **full guide** with the complete explanation of every topic. Each topic has its own link, e.g. `#combinators/sr-latch`.

## Sources

- Blueprint data and images: [autosaved.org/factorio/blueprints](https://autosaved.org/factorio/blueprints) (images are hotlinked from their S3 bucket, not stored here).
- Guide content: researched from the [official Factorio Wiki](https://wiki.factorio.com/) (CC BY-NC-SA 3.0) and rewritten; checked against game version 2.1, base game + Space Age. Every topic lists the wiki pages it is based on.

## Structure

- `index.html` — the whole app (vanilla HTML/CSS/JS, no build step)
- `data.js` — extracted blueprint data (184 blueprints, 428 blueprint strings)
- `guide-logistics.js` — Logistics tab content (42 topics)
- `guide-combinators.js` — Combinators tab content (49 topics, 17 wiring diagrams)

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
  src: ['Wiki page title'],             // links to wiki.factorio.com
  kw: 'extra search words',
}
```

Text shorthand: `{SA}` Space Age badge, `{2.1}` version badge, `{red}` / `{green}` coloured wire names, `[[logistics/roboport|Roboport]]` link to another topic.

## Deploy

It's a static site: point Netlify at the repo root with no build command and `/` as the publish directory.
