# Portfolio v3

Editorial portfolio rebuild for Grigorii: a hybrid operator / builder profile with three public case studies, typed local content, and a Vercel-ready Next.js App Router setup.

## Stack

- Next.js 16 App Router
- TypeScript
- `motion` for scroll/load animation
- CSS Modules + global design tokens
- Local typed content in `src/content/site-content.ts`

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev
npm run lint
npm run lint:fix
npm run typecheck
npm run build
```

## Content and structure

- Home page: `src/app/page.tsx`
- Case study routes: `src/app/cases/[slug]/page.tsx`
- Content model: `src/content/site-content.ts`
- Shared motion/UI pieces: `src/components/portfolio`
- Static case visuals: `public/images/cases`

## Deployment on Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` in Vercel to the final production URL.
   Example: `https://your-domain.com`
4. Run the first production deploy.
5. If you attach a custom domain later, update `NEXT_PUBLIC_SITE_URL` and redeploy.

The app also falls back to Vercel system URLs for previews, but the production domain should still be set explicitly through `NEXT_PUBLIC_SITE_URL`.

## Push checklist

```bash
git add .
git commit -m "feat: launch portfolio v3"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Pre-deploy QA

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Check `/`
- Check `/cases/darkest-afk`
- Check `/cases/dig-dig-die`
- Check `/cases/vacation-cafe`
- Check `/robots.txt` and `/sitemap.xml`

## Notes

- Canonical metadata, `robots.txt`, and `sitemap.xml` are generated from the configured site URL.
- Root Open Graph and Twitter images are generated with Next.js metadata file conventions.
- English is the shipped locale in v1, but the content shape is ready to expand later.
