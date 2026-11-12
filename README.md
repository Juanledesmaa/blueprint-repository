# Blueprint Repository

Personal lookup site for Factorio blueprints, with search, category tabs, sorting, and one-click copy of blueprint strings.

All blueprint data and images come from [autosaved.org/factorio/blueprints](https://autosaved.org/factorio/blueprints) (images are hotlinked from their S3 bucket, not stored here).

## Structure

- `index.html` — the whole app (vanilla HTML/CSS/JS, no build step)
- `data.js` — extracted blueprint data (184 blueprints, 428 blueprint strings)

## Deploy

It's a static site: point Netlify at the repo root with no build command and `/` as the publish directory.
