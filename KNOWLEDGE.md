# Portfolio v3 - Project Knowledge Base

> Comprehensive onboarding documentation for Grigorii's portfolio project: an editorial-style, cinematic portfolio for an AI-enabled support systems operator.

---

## Project Overview

This is a **B2B-oriented professional portfolio** designed to showcase Grigorii's expertise as a Support Operations / Technical Support Specialist with AI automation and workflow systems leverage. The portfolio presents three detailed case studies demonstrating support systems design, feedback intelligence, and retention analysis work performed in the gaming industry.

### Target Audience

- **Primary**: Hiring managers and recruiters in technical support, customer success, and operations roles
- **Secondary**: Technical leads evaluating operational and automation capabilities
- **Tertiary**: Potential collaborators interested in support tooling and workflow design

### Key Differentiators

- Editorial "dossier" design language inspired by high-end portfolio sites (bokoko33.me, Kamaboko aesthetic)
- Cinematic dark minimalism with smooth scroll-driven animations
- Structured case studies with quantifiable metrics and artifact links
- Built-in resume page for comprehensive professional overview

---

## Technology Stack

### Core Framework
- **Next.js 16** (App Router) - Latest React framework with Turbopack
- **React 19.2** - Latest React with concurrent features
- **TypeScript** - Strict mode enabled for type safety

### Styling
- **Tailwind CSS 4.2** - Utility-first CSS framework
- **CSS Modules** - Scoped component styles with `.module.css` files
- **CSS Custom Properties** - Design tokens for theming

### Animation & Motion
- **Motion (Framer Motion) 12.36** - Scroll-based animations and choreography
- **Lenis 1.1** - Smooth scroll behavior
- **React Three Fiber 9.0** - 3D atmospheric effects (DioramaScene)
- **Three.js 0.170** - WebGL rendering for 3D backgrounds

### Testing
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **Testing Library** - React component testing

---

## Architecture Overview

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── loading.tsx         # Loading state
│   ├── not-found.tsx       # 404 page
│   ├── cases/[slug]/       # Dynamic case study pages
│   └── resume/             # Resume page
├── components/portfolio/   # Reusable UI components
│   ├── dossier-hero/       # Hero section with video sequence
│   ├── index.ts            # Component exports
│   └── [component].tsx     # Individual components
├── content/                # Typed content data
│   ├── site-content.ts     # All site content and case studies
│   └── types.ts            # TypeScript type definitions
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── styles/                 # Shared CSS modules
```

### Content Management

All site content is managed through **typed local content** in `src/content/site-content.ts`:

- Site metadata (name, contact info, URLs)
- Navigation items
- Hero section content
- Case studies (3 detailed studies with metrics, sections, artifacts)
- Builds/projects section
- Strengths section
- Contact information
- Resume content (experience, skills, education)

This approach enables:
- Type safety for all content
- Easy localization expansion
- Single source of truth for content updates
- No external CMS dependency

---

## Key Components

### Layout & Providers

The root layout (`src/app/layout.tsx`) wraps the app with essential providers:

1. **ThemeProvider** - Light/dark theme management with system preference detection
2. **LenisProvider** - Smooth scroll behavior
3. **CustomCursorProvider** - Custom cursor for desktop devices
4. **PreloaderProvider** - Initial loading animation
5. **SmoothScrollProvider** - Scroll-based animation context
6. **SkipLink** - Accessibility skip to main content

### Hero Section (DossierHero)

A sophisticated scroll-driven hero component featuring:

- **Phase-based animation system**: closed → open → flight → close → handoff
- **Video sequence canvas**: Book opening animation on scroll
- **3D atmospheric background**: DioramaScene with pointer parallax
- **Adaptive behavior**: Graceful degradation on mobile/reduced motion

### Motion Components

| Component | Purpose |
|-----------|---------|
| `Reveal` | Viewport-triggered reveal animations (fade, scale, blur-to-crisp) |
| `ChoreographyContainer/Item` | Staggered entrance animations |
| `Parallax` | Scroll-linked depth effects |
| `ScrollProgress` | Scroll position tracking |

### UI Components

| Component | Purpose |
|-----------|---------|
| `CTAButton` | Primary/secondary/ghost call-to-action buttons |
| `Card` system | Composable cards for case studies and projects |
| `ThemeToggle` | Light/dark mode switcher |
| `FloatingThemeToggle` | Fixed-position theme toggle |
| `ScrollToTop` | Scroll-to-top button |
| `Breadcrumbs` | Navigation breadcrumb trail |

---

## Design System

### Color Palette (Dark Theme - Default)

```css
/* Core backgrounds */
--bg-primary: #0a0a0c      /* Deep void black */
--bg-secondary: #0f0f12    /* Elevated surface */
--bg-surface: #141418      /* Card backgrounds */

/* Text hierarchy */
--text-primary: #ffffff    /* Primary text */
--text-secondary: rgba(255,255,255,0.7)  /* Secondary text */
--text-disabled: rgba(255,255,255,0.5)   /* Muted text */

/* Accents */
--accent-primary: #e8e4df  /* Warm cream accent */
--accent-blush: #EAA1AC    /* Kamaboko blush pink */
```

### Typography

Three font families loaded via Next.js font optimization:

1. **Space Grotesk** (`--font-sans`) - Primary body text
2. **Montserrat** (`--font-display`) - Display headings
3. **IBM Plex Mono** (`--font-mono`) - Code and technical text

Typography scale follows Cuberto-inspired sizing:
- `10xl` (90px): Hero headlines
- `6xl` (36px): Section titles
- `base` (14px): Body text

### Motion Tokens

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)
--transition-fast: 150ms
--transition-base: 280ms
--transition-slow: 600ms
--transition-cinematic: 1400ms
```

---

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, case studies, builds, strengths, contact |
| `/cases/[slug]` | Individual case study pages |
| `/resume` | Full resume page |
| `/robots.txt` | SEO robots file (generated) |
| `/sitemap.xml` | SEO sitemap (generated) |

### Case Study Slugs

- `/cases/darkest-afk` - Support systems design case
- `/cases/dig-dig-die` - Feedback intelligence case
- `/cases/vacation-cafe` - Retention analysis case

---

## Content Types

### Case Study Structure

```typescript
type CaseStudy = {
  slug: string;              // URL slug
  number: string;            // Display number (01, 02, 03)
  eyebrow: string;           // Category label
  title: string;             // Full title with metric
  summary: string;           // Brief description
  outcome: string;           // Result statement
  previewImage: string;      // Preview image path
  tags: string[];            // Highlight tags
  meta: {
    role: string;            // Job role
    environment: string;     // Company/platform context
    artifactType: string;    // Type of deliverable
  };
  metrics: CaseStudyMetric[];  // Quantifiable results
  sections: CaseStudySection[]; // Content sections
  artifacts: ArtifactLink[];   // External links to work samples
};
```

### Proof Levels

Skills and projects use a three-tier proof system:

- `"core"` - Primary professional competencies
- `"shipped"` - Demonstrated through shipped projects
- `"working-knowledge"` - Functional familiarity

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | Production site URL for SEO/metadata | Yes (production) |

The app falls back to Vercel system URLs for previews but requires explicit configuration for production canonical URLs.

---

## Development Workflow

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run typecheck    # TypeScript type checking
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)
```

### Pre-Deploy Checklist

1. `npm run lint` - No linting errors
2. `npm run typecheck` - No type errors
3. `npm run build` - Successful production build
4. Manual check: `/`, `/cases/darkest-afk`, `/cases/dig-dig-die`, `/cases/vacation-cafe`
5. Verify `/robots.txt` and `/sitemap.xml`

---

## Accessibility

The portfolio implements comprehensive accessibility features:

- **Skip link** for keyboard navigation to main content
- **Semantic HTML** with proper heading hierarchy
- **ARIA labels** on interactive elements
- **Reduced motion support** - All animations respect `prefers-reduced-motion`
- **Theme persistence** - Anti-flash script prevents FOUC
- **Color contrast** - WCAG AA compliant throughout
- **Focus indicators** - Visible focus states on all interactive elements

---

## SEO & Metadata

### Implemented Features

- Dynamic metadata per page via Next.js Metadata API
- Open Graph and Twitter card images (generated)
- Canonical URLs with proper `metadataBase`
- Structured `robots.ts` and `sitemap.ts`
- Semantic HTML structure
- Proper heading hierarchy

### Keywords Focus

Technical support, support operations, workflow automation, escalation management, incident handling, AI automation, customer success, product-facing operations, support systems, customer feedback, case studies

---

## Performance Considerations

1. **Image Optimization** - All images use Next.js `<Image>` with `sizes` prop
2. **Font Loading** - Google Fonts with preconnect hints
3. **Code Splitting** - Automatic via Next.js App Router
4. **Turbopack** - Faster development builds
5. **CSS Modules** - Scoped styles with minimal runtime
6. **Conditional 3D** - DioramaScene only loads on desktop with sufficient capability
7. **Video Optimization** - Scroll-driven video sequences for hero animation

---

## Testing Strategy

### Unit Tests (Vitest)

Located in `tests/` directory:
- `tests/lib/content-utils.test.ts` - Content utility functions
- `tests/lib/url-utils.test.ts` - URL handling utilities

### E2E Tests (Playwright)

Located in `e2e/` directory:
- `accessibility.spec.ts` - Accessibility checks
- `case-studies.spec.ts` - Case study page functionality
- `navigation.spec.ts` - Navigation and routing
- `not-found.spec.ts` - 404 page handling
- `responsive.spec.ts` - Responsive design
- `theme.spec.ts` - Theme switching

---

## Deployment

### Vercel Deployment

1. Push repository to GitHub
2. Import repo into Vercel
3. Set `NEXT_PUBLIC_SITE_URL` environment variable
4. Deploy

### Domain Configuration

After attaching a custom domain:
1. Update `NEXT_PUBLIC_SITE_URL` in Vercel
2. Redeploy for canonical URL updates

---

## File Naming Conventions

- **Components**: PascalCase (`CTAButton.tsx`)
- **CSS Modules**: kebab-case (`page.module.css`)
- **Utilities**: kebab-case (`content-utils.ts`)
- **Types**: PascalCase types, kebab-case files (`types.ts`)
- **Tests**: match source file name with `.test.ts` or `.spec.ts` suffix

---

## Extending the Portfolio

### Adding a New Case Study

1. Add case data to `caseStudies` array in `src/content/site-content.ts`
2. Add preview image to `public/images/cases/`
3. The dynamic route `src/app/cases/[slug]/page.tsx` handles rendering automatically

### Adding a New Build/Project

1. Add project data to `technicalProofs` array in `src/content/site-content.ts`
2. Include: title, eyebrow, summary, impact, href, linkLabel, stack, level

### Creating New Components

1. Create component in `src/components/portfolio/`
2. Export from `src/components/portfolio/index.ts`
3. Follow existing patterns for theming and motion
4. Add CSS module if needed (`[component].module.css`)

---

## External References

- **Legacy Portfolio**: https://codeavd.github.io/Portfolio/
- **GitHub Profile**: https://github.com/CodeAvd
- **Portfolio Repository**: https://github.com/Remgesuu/portfolio_new

---

## Support & Troubleshooting

### Motion Not Working?

1. Ensure component is wrapped in `SmoothScrollProvider` (in layout)
2. Check browser console for errors
3. Verify `motion/react` imports are correct

### Theme Colors Not Applying?

1. Confirm `ThemeProvider` wraps the app
2. Check CSS variable names in `globals.css`
3. Verify Tailwind config includes extended colors

### Build Failing?

1. Run `npm run typecheck` to identify type errors
2. Run `npm run lint` to find linting issues
3. Check for missing dependencies in `package.json`

---

## Version History

- **v3** (Current) - Next.js 16 + React 19 rebuild with cinematic design
- **v2** - Previous portfolio iteration
- **v1** - Initial GitHub Pages portfolio

---

*Last updated: March 2026*
