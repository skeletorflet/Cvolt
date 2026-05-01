# Cvolt

Cvolt is a free, open source CV builder designed to help anyone create a professional resume in minutes.

It includes a visual editor, live preview, modern templates, color and typography customization, PDF export, and multilingual support.

## Features

- Visual section editor (personal info, experience, education, skills, projects, languages, certifications).
- Live preview with zoom and layout controls.
- Multiple professional and creative templates.
- Color and font customization.
- Section reordering.
- PDF export.
- Spanish and English UI support.
- Optional global usage counter via serverless endpoint (`/api/counter`).

## Tech Stack

- React 19 + TypeScript
- Vite 7
- TanStack Router
- Zustand
- Tailwind CSS 4
- Radix UI
- html2canvas + jsPDF
- Netlify Functions (optional counter)

## Requirements

- Node.js 20+
- npm 10+ (recommended for Netlify deployment)

Optional:

- Bun (if you prefer local workflow using `bun.lockb`)

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## Production build

```bash
npm run build
```

## Local preview

```bash
npm run preview
```

## Netlify build (SPA)

```bash
npm run build:netlify
```

This generates `dist-netlify/`.

## Project structure

```text
src/
  components/
  data/
  hooks/
  i18n/
  lib/
  routes/
  store/
netlify/functions/
public/
```

## Deployment

### Netlify

This repo already includes `netlify.toml` and a function at `netlify/functions/counter.ts`.

For automatic production deploy on every push to `main`, this repo includes
`.github/workflows/deploy-netlify.yml`.
You only need to add these repository secrets in GitHub:

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

Relevant values:

- Build command: `npm run build:netlify`
- Publish directory: `dist-netlify`
- Functions directory: `netlify/functions`

### Cloudflare/Vite Start

Configuration for a Vite/TanStack Start flow is also present (`vite.config.ts`, `wrangler.jsonc`) if you want to deploy with Workers.

## Available scripts

- `npm run dev`: local development.
- `npm run build`: main build.
- `npm run build:dev`: development-mode build.
- `npm run preview`: serve local build.
- `npm run build:netlify`: Netlify SPA build.
- `npm run lint`: lint project.
- `npm run format`: format with Prettier.

## Contributing

Please read [CONTRIBUTING.en.md](CONTRIBUTING.en.md) (or [CONTRIBUTING.md](CONTRIBUTING.md) in Spanish).

## Mission

Cvolt aims to stay open, practical, and free so more people can build polished CVs without technical friction.

If you find it useful, please star the repository and share feedback.

## License

MIT. See [LICENSE](LICENSE).
