# boxoffice-site

Hub vetrina: home con i miei progetti, dashboard live del box office italiano, blog.
Astro, statico, nessun backend.

## Struttura

- `/` — hub, tile progetti, link a portfolio e YouTube
- `/projects/boxoffice` — dashboard (KPI + 2 grafici) da `src/data/boxoffice.json`
- `/blog` — articoli in `src/content/blog/*.md` (frontmatter: `title`, `pubDate`, `description?`)

`src/data/boxoffice.json` è generato dalla pipeline del progetto
[`NewBoxofficeProject`](https://github.com/Marco967a/NewBoxofficeProject) (`scripts/export_site_data.py`)
e viene sovrascritto a ogni pubblicazione settimanale — non modificarlo a mano.

## Comandi

```sh
npm install
npm run dev       # localhost:4321
npm run build     # ./dist
```
test
