# Koncept Werk website

Owner-review build of the Koncept Werk interior design and build website. The implementation is a statically generated Next.js site with a warm, homeowner-oriented Japandi presentation, real Koncept Werk imagery and verified business content sourced from the existing website.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Validation commands:

```bash
npm run typecheck
npm run lint
npm run build
```

To review the production build locally:

```bash
npm run build
npm run start
```

## Stack

- Next.js App Router and TypeScript for static rendering, metadata, routing, image optimisation, sitemap and robots output.
- React client components only where interaction is required: mobile navigation, project filtering, reveal observation and form state.
- Locally packaged Manrope and Cormorant Garamond fonts; no runtime font request.
- Framework-native `next/image`; no animation or UI framework dependency.

## Routes

- `/` — homepage
- `/work` and `/work/[slug]` — filterable project index and reusable project-detail system
- `/studio` — studio story, verified team and six-stage process
- `/services` — residential, commercial and exhibition services
- `/journal` and `/journal/[slug]` — article index and reusable article layout
- `/careers` — general expression-of-interest experience; no vacancies are invented
- `/contact` — project enquiry experience
- `/fha` — exhibition-service landing page
- `/privacy` and `/terms` — legal pages

Legacy routes from the existing site are redirected in `next.config.ts`.

## Content and projects

Business data, navigation, services, team, projects and articles live in `lib/site-data.ts`. Project entries deliberately support sparse verified metadata: title, category, scope, summary, narrative, cover and a sequence of aspect-aware gallery images. Add real locations, years or client data only after owner verification.

The source record is documented in `docs/content-sources.md`.

## Forms

The repository has no approved form backend. Contact and career forms therefore validate locally and prepare a transparent email handoff to the verified business email address. They do not claim to submit or store information. A production migration should replace that handoff only after the owner selects and authorises a form/email service, spam protection and privacy handling.

## Deployment

No deployment configuration or production infrastructure was changed in this work. Production migration is intentionally out of scope.
