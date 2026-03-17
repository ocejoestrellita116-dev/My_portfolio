# Portfolio Knowledge Base

## Project Overview

This is Grigorii's professional portfolio website - a Next.js 16 application showcasing his expertise as a **Support Systems Operator** with AI automation capabilities. The portfolio demonstrates technical proficiency while presenting case studies from his work at Heapp Games and Mover Bridge.

**Target Audience:**
- Primary: Recruiters (30-second scan)
- Secondary: Hiring managers validating technical depth
- Tertiary: Product leads checking cross-functional signal quality

**Key Value Proposition:** AI-enabled support systems operator for technical support, escalation, and workflow automation with proven metrics (45% ticket reduction, 35% faster response, 70% automation gains).

---

## Technology Stack

### Core Framework
- **Next.js 16** - App Router with React Server Components
- **React 19.2** - Latest stable with concurrent features
- **TypeScript** - Strict mode enabled

### Styling
- **CSS Modules** - Component-scoped styles with `.module.css` files
- **Tailwind CSS 4** - Utility classes for rapid styling
- **CSS Custom Properties** - Design tokens in `globals.css`

### Animation & Motion
- **motion** (v12.36) - Scroll-synced animations, variants, and gestures
- **Lenis** (v1.1) - Smooth scroll provider for buttery scrolling

### 3D & Visual Effects
- **@react-three/fiber** (v9) - React renderer for Three.js
- **@react-three/drei** (v10) - Useful helpers for R3F
- **three** (v0.170) - 3D graphics library

### Testing
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Testing Library** - Component testing utilities

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage with DossierHero
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Design tokens & base styles
│   ├── cases/[slug]/             # Dynamic case study routes
│   └── resume/                   # Resume page
├── components/portfolio/         # Reusable components
│   ├── dossier-hero/             # Main hero with scroll-synced video
│   │   ├── dossier-hero.tsx      # Orchestrator component
│   │   ├── book-sequence-canvas.tsx  # Video scrubbing
│   │   ├── hero-overlay.tsx      # Text overlays
│   │   ├── dossier-hero.config.ts    # All timing/colors/thresholds
│   │   ├── dossier-hero.types.ts     # TypeScript interfaces
│   │   └── hooks/                # Progress & parallax hooks
│   ├── cta-button.tsx            # Primary action button
│   ├── reveal.tsx                # Scroll-reveal wrapper
│   ├── theme-provider.tsx        # Dark/light theme system
│   └── ...                       # Other UI components
├── content/
│   ├── site-content.ts           # ALL content lives here
│   └── types.ts                  # Content type definitions
├── hooks/                        # Shared React hooks
└── lib/                          # Utility functions
```

---

## Content Architecture

### Centralized Content Model
All site content is defined in `src/content/site-content.ts` with full TypeScript typing. This enables:
- Single source of truth for all text
- Type-safe content updates
- Easy localization preparation

### Key Content Types
```typescript
SiteContent = {
  meta: SiteMeta,           // Name, email, social links
  hero: HeroContent,        // Title, description, CTAs
  cases: CasesSection,      // Case studies header
  builds: BuildsSection,    // Technical projects
  strengths: StrengthsSection,
  contact: ContactSection,
  resume: ResumeContent,
  caseStudies: CaseStudy[]  // Full case study data
}
```

### Case Studies
Three documented case studies with Challenge/Method/Impact structure:
1. **Darkest AFK** - 112+ indexed items, bilingual operator tool
2. **Dig Dig Die** - 23 structured priorities from community noise
3. **Vacation Cafe** - Retention hypotheses from player friction

---

## Design System

### Color Palette (Kamaboko-inspired)
```css
/* Primary aesthetic tokens */
--kamaboko-cream: #FBF4E4;      /* Background */
--kamaboko-blush: #EAA1AC;      /* Accent/links */
--kamaboko-charcoal: #323232;   /* Primary text */
--kamaboko-muted: #6a6a78;      /* Secondary text */

/* Dark theme base */
--color-night-900: #0a0a0c;     /* Deepest black */
--color-accent-primary: #e8e4df; /* Warm cream accent */
```

### Typography
- **Display Font:** Montserrat (headings)
- **Body Font:** Space Grotesk (text)
- **Mono Font:** IBM Plex Mono (code/labels)

### Motion Tokens
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--transition-fast: 150ms;
--transition-base: 280ms;
--transition-cinematic: 1400ms;
```

---

## Core Components

### DossierHero
The flagship component - a 500vh scroll-driven experience with:
- **Video scrubbing:** Book opens/closes synced to scroll progress
- **5 stages:** intro → opening → about → works → contact
- **Multi-layer parallax:** Background, book, stage labels, headlines
- **Adaptive topbar:** Collapses during scroll, restores at end
- **Reduced motion support:** Falls back to static content

**Key Files:**
- `dossier-hero.config.ts` - All timing, colors, stage definitions
- `hooks/use-dossier-progress.ts` - Scroll progress calculation
- `hooks/use-pointer-parallax.ts` - Mouse tracking for depth

### Stage Configuration
```typescript
STAGES = [
  { id: "intro",   range: [0.00, 0.08], content: { greeting: true } },
  { id: "opening", range: [0.08, 0.30], content: { title: true } },
  { id: "about",   range: [0.30, 0.55], content: { bio: true } },
  { id: "works",   range: [0.55, 0.80], content: { signals: true } },
  { id: "contact", range: [0.80, 1.00], content: { evidence: true } },
]
```

### CTAButton
Motion-enhanced button with variants:
- `primary` - Solid background with glow
- `secondary` - Alternative accent
- `ghost` - Transparent with border on hover
- `outline` - Border with subtle glow

### Reveal
Scroll-triggered reveal wrapper using Intersection Observer with preset animations:
- `fadeUp`, `fadeDown`, `fadeScale`
- `slideLeft`, `slideRight`
- `staggerContainer` for children

---

## Theming

### Theme Provider
Located in `src/components/portfolio/theme-provider.tsx`:
- SSR-safe with `themeScript` for preventing flash
- Persists preference to localStorage
- Respects `prefers-color-scheme` by default

### Theme Toggle
Floating button with sun/moon icons:
- Position: bottom-right (configurable)
- Smooth icon transition animation
- Keyboard accessible (Enter/Space)

### CSS Variables
All theme colors use CSS custom properties:
```css
/* Dark theme */
[data-theme="dark"] {
  --bg-primary: var(--color-night-900);
  --text-primary: var(--color-white);
}

/* Light theme */
[data-theme="light"] {
  --bg-primary: var(--color-warm-100);
  --text-primary: #0a0a0c;
}
```

---

## Key Implementation Patterns

### Scroll-Synced Animations
```typescript
// In hooks/use-dossier-progress.ts
const progress = useMotionValue(0);
const { scrollY } = useScroll();

// Map scroll position to 0-1 progress
useMotionValueEvent(scrollY, "change", () => {
  const newProgress = calculateProgress(containerRef);
  progress.set(newProgress);
});
```

### Video Scrubbing
```typescript
// In book-sequence-canvas.tsx
useEffect(() => {
  if (videoReady && videoDuration > 0) {
    video.currentTime = progress * videoDuration;
  }
}, [progress, videoReady, videoDuration]);
```

### Reduced Motion
```typescript
// Custom hook to detect without motion library warnings
function useReducedMotionSafe(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    // Listen for changes
  }, []);
  return prefers;
}
```

---

## Routes

| Route | Purpose | Key Component |
|-------|---------|---------------|
| `/` | Homepage | `DossierHero`, sections |
| `/cases/[slug]` | Case study detail | Dynamic from `caseStudies` |
| `/resume` | Printable resume | Structured from `resume` content |
| `/robots.txt` | SEO crawl rules | Generated |
| `/sitemap.xml` | SEO sitemap | Generated |

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO | Yes (prod) |

---

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint check
npm run typecheck    # TypeScript check
npm run test         # Unit tests (Vitest)
npm run test:e2e     # E2E tests (Playwright)
```

---

## Testing Strategy

### Unit Tests (`tests/`)
- Content utilities
- URL helpers
- Pure functions

### E2E Tests (`e2e/`)
- `accessibility.spec.ts` - WCAG compliance
- `navigation.spec.ts` - Route transitions
- `theme.spec.ts` - Theme toggle functionality
- `responsive.spec.ts` - Breakpoint behavior

---

## Performance Considerations

1. **Video optimization:** Book sequence video is pre-rendered, not runtime
2. **Lazy loading:** Components below fold use dynamic imports
3. **CSS containment:** Heavy animation layers use `contain: layout`
4. **Reduced motion:** Full fallback for accessibility preference
5. **Image optimization:** Next.js Image component for all images

---

## Known Constraints

1. **Video scrubbing:** Requires desktop viewport (>1024px) for full experience
2. **Mobile:** Simplified experience with autoplay loop instead of scrub
3. **Browser support:** Modern browsers only (no IE11)
4. **Print:** Resume page optimized for print with forced light theme

---

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel Dashboard
3. Set `NEXT_PUBLIC_SITE_URL`
4. Deploy

### Pre-Deploy Checklist
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] All routes render correctly
- [ ] Theme toggle works
- [ ] Mobile responsive

---

## Architecture Decisions

### Why CSS Modules over Tailwind-only?
- Complex animations need cascade control
- Design tokens in CSS variables
- Better tooling for motion keyframes

### Why motion over GSAP?
- React-first API with hooks
- Smaller bundle size
- Better Next.js RSC compatibility

### Why Lenis for scroll?
- Consistent cross-browser smooth scroll
- Better scroll-synced animation control
- Mobile-aware with native fallback

### Why centralized content?
- Single source of truth
- Type-safe updates
- Preparation for CMS migration

---

## Upgrade Plan Summary

From `docs/PORTFOLIO_UPGRADE_PLAN.md`:

**Priorities:**
1. Outcome-focused case study titles
2. Simplified mobile hero
3. Direct email visibility
4. Reduced visual density

**Hiring Read Score:** 7.5/10
**Target:** Improve recruiter scan path efficiency

---

## Contact

- **Email:** grigorii584@gmail.com
- **GitHub:** github.com/CodeAvd
- **Location:** Russia (Remote-ready)
