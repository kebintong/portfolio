# Portfolio

Personal developer portfolio for Kebin Tong. Built with React, Vite and
Tailwind, served by a small Cloudflare Worker (Hono).

## Work

| Project | Source | Live demo |
|---|---|---|
| Out of Context | https://github.com/kebintong/Out-of-context | https://kebintong.github.io/Out-of-context/ |
| Presentia | https://github.com/kebintong/Presentia | https://presentia.venki050524.workers.dev/ |
| CUlink | https://github.com/Kebinnnnn1/CUlink | https://www.culink.me/ |
| The Gas Station | https://github.com/Kebinnnnn1/The-Gas-Station | https://kebinnnnn1.github.io/The-Gas-Station/ |

## Run it

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/client (static assets) + dist/portfolio (Worker)
npm run preview    # preview the production build with the Worker
npm start          # serve dist/client as a plain static site (port 3000)
npm run deploy     # build and deploy to Cloudflare with wrangler
```

## Project layout

```
public/              static files copied as-is into the build
  screenshots/       project cover images
src/
  data/site.ts       all site content: name, intro, socials, projects
  app/pages/         Home, Work (case study), About
  app/components/    Nav, Footer, Preloader, WorkCard, motion helpers
  styles.css         design tokens and global styles
  worker/index.ts    Cloudflare Worker: /api routes, then static assets
scripts/
  local-serve.mjs    tiny static server for dist/client
wrangler.jsonc       Worker config
```

## Editing content

- Text, projects and links all live in `src/data/site.ts`.
- To add a project, drop its cover into `public/screenshots/` and add an
  entry to `projects` with `cover: '/screenshots/<file>.png'`.

Motion respects `prefers-reduced-motion`, and the preloader runs once per tab.
