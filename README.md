# Portfolio

[![CI/CD](https://github.com/kebintong/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/kebintong/portfolio/actions/workflows/ci.yml)

Personal developer portfolio for Kebin Tong: side projects, games and small tools, each with its own case-study page.

**Live:** https://kebintong.github.io/portfolio/

Built with React 19, Vite, Tailwind CSS v4 and Motion. Tested with Vitest, linted with ESLint, formatted with Prettier, and deployed to GitHub Pages by
GitHub Actions.

## Projects on the site

| Project         | What it is                                                    | Source                                                | Live                                                          |
| --------------- | ------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| Out of Context  | 3D rage platformer dressed up as a game show (Unity, Windows) | [repo](https://github.com/kebintong/Out-of-context)   | [site](https://kebintong.github.io/Out-of-context/)           |
| Presentia       | Face-check attendance for online classes                      | [repo](https://github.com/kebintong/Presentia)        | [student sign-up](https://presentia.venki050524.workers.dev/) |
| CUlink          | Chat, notes and file tools for Cebu university students       | [repo](https://github.com/Kebinnnnn1/CUlink)          | [culink.me](https://www.culink.me/)                           |
| The Gas Station | Unity WebGL game                                              | [repo](https://github.com/Kebinnnnn1/The-Gas-Station) | [play](https://kebinnnnn1.github.io/The-Gas-Station/)         |

## Getting started

Requires Node 22 (see `.nvmrc`).

```sh
git clone https://github.com/kebintong/portfolio.git
cd portfolio
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command                | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Dev server with hot reload                                     |
| `npm run build`        | Production build into `dist/`, served under `/portfolio/`      |
| `npm run preview`      | Serve the production build locally                             |
| `npm run typecheck`    | TypeScript type check                                          |
| `npm run lint`         | ESLint                                                         |
| `npm run format`       | Format every file with Prettier                                |
| `npm run format:check` | Check formatting without changing files                        |
| `npm test`             | Run the tests once (`npm run test:watch` to keep them running) |
| `npm run check`        | Everything CI runs: typecheck, lint, formatting, tests, build  |

Run `npm run check` before pushing; if it passes locally, CI will pass too.

## CI/CD

One workflow, `.github/workflows/ci.yml`:

- **CI.** Every pull request and every push runs **Checks**: install, typecheck, lint, formatting, tests and build. A failing step stops the run and
  shows a red ✗ on the commit or pull request.
- **CD.** When a push to `main` passes Checks, the **Deploy to GitHub Pages** job publishes `dist/`. Pull requests are checked but never deployed.
- **Dependabot** (`.github/dependabot.yml`) opens a weekly pull request with dependency updates, and a monthly one for GitHub Actions. CI checks them
  like any other change.

To republish without changing anything: **Actions → CI/CD → Run workflow**.

### Development flow

```sh
git switch -c my-change      # work on a branch, not main
# …edit…
npm run check
git add -A
git commit -m "Describe the change"
git push -u origin my-change
```

Open a pull request on GitHub, wait for the green ✓, then merge. Merging to `main` deploys.

### Repository settings

- **Settings → Pages → Source:** GitHub Actions.
- **Settings → Rules → Rulesets → New branch ruleset** for `main`: require a pull request before merging, and require the **Checks** status check to
  pass. That stops broken changes from reaching the live site.

## Editing content

- All text, projects and links live in **`src/data/site.ts`**. Most updates only touch this file.
- To add a project, put its cover image in `public/screenshots/` and add an entry to `projects` with `cover: asset('screenshots/<file>.png')`.
- `coverPosition` picks which part of the cover stays visible when a card crops it (for example `'left center'`).
- `src/data/site.test.ts` checks the data: unique slugs, required fields, cover images that exist, and https links. If you add a project with a
  missing image, the tests fail before it reaches the live site.

## Working from an iPhone

Use [a-Shell](https://apps.apple.com/us/app/1473805438) (free). Its git command is `lg2`. GitHub does the checks and the build, so you only need to
edit, commit and push.

**One-time setup**

1. Create a token on github.com: **Settings → Developer settings → Personal access tokens → Fine-grained tokens**. Under Repository access, pick only
   `portfolio`. Under Repository permissions, set **Contents** to **Read and write** (and **Workflows** too if you want to edit `.github/workflows`).
2. In a-Shell:

   ```sh
   lg2 clone https://github.com/kebintong/portfolio
   cd portfolio
   lg2 config user.name "kebintong"
   lg2 config user.email "311342044+kebintong@users.noreply.github.com"
   lg2 remote set-url origin https://kebintong@github.com/kebintong/portfolio.git
   ```

**Each update**

```sh
cd portfolio
lg2 pull
# edit files (a-Shell's `vim`, or open the folder in the Files app)
lg2 add .
lg2 commit -m "Describe the change"
lg2 push        # at Password:, paste the token
```

If `main` requires pull requests (see Repository settings), make phone edits on github.com instead: edit a file, choose **Create a new branch and
start a pull request**, then merge once Checks passes.

**If something goes wrong:**

- `Error creating signature`: set `user.name` and `user.email`, as in setup.
- `Password:` keeps repeating: GitHub doesn't accept your account password here. Paste the token.
- `403`: the token can't write to this repo. Edit it so Contents is set to Read and write and `portfolio` is selected.
- `No staged changes`: nothing has changed since the last commit.

## Project layout

```
.github/
  workflows/ci.yml   CI checks + deploy to GitHub Pages
  dependabot.yml     automatic dependency update PRs
public/              files copied as-is into the build
  screenshots/       project cover images
src/
  data/site.ts       all site content: name, intro, socials, projects
  data/site.test.ts  tests for the site content
  app/pages/         Home, Work (case study), About
  app/components/    Nav, Footer, Preloader, WorkCard, motion helpers
  app/lib/           small helpers (class names, local time)
  styles.css         design tokens and global styles
eslint.config.js     lint rules
.prettierrc.json     formatting rules
vite.config.ts       build config (base path, 404 fallback)
```

Motion respects `prefers-reduced-motion`, and the preloader runs once per tab.
