# Willy's Roofing — Design Spec & Build Contract

**This is the single source of truth.** Every teammate (Beacon, Cedar, Dale, Vega) follows it. Wave 1 (Atlas) has built the foundation against this spec; the foundation builds green. If you need something added to a shared token, component, or data file, **do not edit it yourself in Wave 2** — note it in your final report for Wave 3 integration (see File-Ownership Map at the bottom).

Stack: **Next.js 16.2.9 (App Router, Turbopack default), React 19.2, TypeScript, Tailwind v4.** Canadian English throughout (colour, neighbourhood, fibre, centre).

---

## 1. Brand positioning & voice

**Positioning.** Willy's Roofing is the dependable, straight-talking local roofer for the Greater Hamilton & Niagara region (primary city: **Stoney Creek, ON**). The brand is built on *craft, honesty, and weather-tested competence* — a company that gets on the roof, tells you the truth (including "you only need a repair"), installs the roof as a complete system to manufacturer spec, and cleans up like they were never there. Not a flashy upsell shop; a trades-proud, warranty-backed, neighbour-accountable business.

**Voice.** Plain-spoken, confident, grounded. Talks like an experienced roofer who respects your time and your money. Specific over clever. Explains the *why* (ice dams, ventilation, flashing) without jargon-dumping.

**Tone — do:**
- Lead with the homeowner's problem and the honest answer.
- Use concrete, regional, weather-aware detail ("freeze-thaw winters", "ice dams at the cold eave", "lake-effect snow").
- Be reassuring about risk: licensed, insured, written warranty, free estimate, clean-up.
- Use active voice and real verbs ("We get on the roof", "We trace the leak to its source").

**Tone — don't:**
- No hype or superlatives we can't back ("#1", "best in Ontario", fake urgency).
- **No fabricated specifics** — no invented awards, certifications, exact years in business, review counts, or street address. (Trust signals are honest + editable; see `lib/trust.ts`.)
- No fabricated pricing — always "free estimate / request a quote".
- No emoji in UI copy. No exclamation-mark spam.

---

## 2. The design direction (derived from roofing, NOT a generic default)

The look is derived from a southern-Ontario roof and sky: **weathered architectural-shingle slate**, **copper flashing**, **chalk-line white**, and a **spec-sheet / tape-measure** sensibility. It is deliberately **not** any of the three AI clichés (no warm-cream + high-contrast-serif + terracotta; no near-black + acid accent; no broadsheet hairline-rule newspaper). Our background is a **cool paper-white** (faintly blue-grey, like frost/chalk), our accent is **metallic copper** (golden-warm, not terracotta), our display face is an **industrial grotesque** (not a fashion serif), and we use **restrained radii** (not zero).

---

## 3. Palette

Defined as Tailwind v4 tokens in `app/globals.css` under `@theme`. Use the **CSS variables** (`var(--color-…)`) or the Tailwind classes they generate (`bg-slate-700`, `text-copper-500`, etc.). Semantic aliases exist for the common roles.

| Role | Token (CSS var) | Hex | Usage |
|---|---|---|---|
| **Brand slate (primary)** | `--color-slate-700` | `#28384A` | Primary brand colour, headings ink, dark accents |
| Slate deepest | `--color-slate-900` | `#16222E` | Footer, darkest bands |
| Slate 800 | `--color-slate-800` | `#1D2D3D` | Dark section bands (`tone="slate"`), heading text |
| Slate 500 | `--color-slate-500` | `#51677D` | Secondary/body text on light |
| Slate 400 | `--color-slate-400` | `#7D92A6` | Muted text, captions |
| Slate 100 | `--color-slate-100` | `#E7EDF1` | Hairlines, soft fills, borders |
| **Copper (accent)** | `--color-copper-500` | `#C26B2C` | THE accent — primary CTAs, eyebrows, signature rule, links-on-dark |
| Copper 600 | `--color-copper-600` | `#A85A24` | Hover for copper, eyebrow text |
| Copper 300 | `--color-copper-300` | `#E6A86F` | Copper-on-dark (eyebrows/stats on slate), tints |
| Copper 100 | `--color-copper-100` | `#F4E2D2` | Warm copper wash backgrounds (sparingly) |
| **Chalk bg (page)** | `--color-chalk-100` | `#F4F7F8` | Page background — cool, faintly blue (NOT cream) |
| Chalk surface | `--color-chalk-50` | `#FBFCFD` | Cards, raised surfaces |
| Chalk band | `--color-chalk-200` | `#EAEFF2` | Alternating muted section band (`tone="muted"`) |
| **Ink (text)** | `--color-ink` | `#14202B` | Default body text (near-black graphite, never pure black) |
| Success | `--color-success` | `#2F7D54` | Form success / positive |
| Danger | `--color-danger` | `#B4452F` | Form errors |

Semantic aliases: `--color-background` → chalk-100, `--color-surface` → chalk-50, `--color-foreground` → ink, `--color-accent` → copper-500, `--color-brand` → slate-700.

**Usage discipline:** Copper is the ONE bold colour — spend it on the primary action and the signature element. Everything else is slate/chalk/ink and quiet. Don't introduce new hues.

---

## 4. Typography

Loaded via `next/font/google` in `app/layout.tsx`; exposed as `--font-display`, `--font-sans`, `--font-mono` and as Tailwind `font-display` / `font-sans` / `font-mono`.

- **Display — Archivo** (variable, `wght` 100–900 + `wdth` 62–125 axis). Industrial grotesque; structural, blunt, signage-like. Used for all headings (`h1`–`h4` default to it), big numbers/stats. Headings are weight **800**, tight tracking (`-0.015em`), line-height **1.04**, `text-wrap: balance`. For an extra-characterful hero word you may push the `wdth` axis slightly (the axis is loaded) and weight to 900.
- **Body — Public Sans** (variable). Civic, dependable, highly legible — sets the "licensed & trustworthy" tone and contrasts the blunt display. Body is **400**, line-height **1.65**.
- **Utility/data — IBM Plex Mono** (weights 400/500/600). The "spec sheet / tape measure" voice. Used for **eyebrows, labels, stat captions, the course-tick rule, hours, and small structural metadata**. Always uppercase with wide tracking for eyebrows (`0.22em`); tabular + slashed-zero numerals enabled.

**Type scale** (fluid `clamp()` tokens; use the Tailwind `text-*` classes):

| Token | Size | Typical use |
|---|---|---|
| `text-xs` | 0.75rem | Eyebrows, captions, legal |
| `text-sm` | 0.875rem | Secondary text, labels, nav |
| `text-base` | 1rem | Body |
| `text-lg` | 1.125rem | Lead paragraphs, intros |
| `text-xl` | 1.25rem | Small headings, card titles |
| `text-2xl` | clamp 1.45→1.75rem | Subsection headings |
| `text-3xl` | clamp 1.8→2.25rem | Section headings (`SectionHeader` default) |
| `text-4xl` | clamp 2.15→3rem | Page titles, large section heads |
| `text-5xl` | clamp 2.6→4rem | Hero headline (desktop) |
| `text-6xl` | clamp 3→5.25rem | Hero hero-word (use sparingly) |

**Pairing rationale (deliberate, non-default):** blunt industrial display + clean civic body + engineered mono — a trio rooted in roofing/fabrication, chosen against the generic "fashion serif + Inter" default.

---

## 5. Spacing, radius, shadow, layout

**Layout containers** (use the `Container` / `Section` primitives, never hand-rolled max-widths):
- `--container-site` = **75rem (1200px)** — primary content width (default).
- `--container-wide` = 84rem — wide/near-bleed sections.
- `--container-prose` = 44rem — long-form reading (article bodies, FAQ answers).
- Horizontal padding is owned by `Container` (`px-5 sm:px-8`). **Section owns vertical padding; Container owns horizontal** — they never set the same axis, so specificity never collides.

**Section vertical rhythm** (via `Section` `spacing` prop): `sm` = `py-12 sm:py-16`, `md` = `py-16 sm:py-24` (default), `lg` = `py-20 sm:py-32`.

**Radius** (restrained / architectural — NOT zero, NOT pill): `--radius-xs` 2px, `--radius-sm` **4px** (buttons, inputs, chips), `--radius-md` 8px (small cards), `--radius-lg` **14px** (feature cards, image frames), `--radius-xl` 20px.

**Shadows** (low, cool, slate-tinted — never pure black): `--shadow-xs/sm/md/lg` and `--shadow-copper` (for the primary copper CTA). Prefer `shadow-sm`/`shadow-md`; reserve `shadow-lg` for floating/hover.

**Borders/hairlines:** 1px in `--color-slate-100` (light) or `white/10` (on slate). Default `*` border-color is slate-100.

**Grid:** 12-col mental model; use CSS grid/flex. Cards typically 1 → 2 → 3 columns (mobile → tablet → desktop). Keep generous whitespace; this is a calm, disciplined layout with boldness reserved for the signature + copper.

---

## 6. THE SIGNATURE ELEMENT — "The Ridgeline"

One memorable idea, expressed through a shared vocabulary of **roof geometry + measurement**. Spend boldness here; keep everything else quiet.

It has two coordinated parts, both already implemented as CSS utilities in `globals.css`:

**(a) The roof-pitch edge.** A single shallow roof pitch — **`--pitch-deg: 14deg`** (~a 3:12 slope), rise **`--pitch-rise: 2.6rem`** — defined once and reused so the page carries a subtle pitched-roof rhythm. Utilities:
- `.roofline-bottom` — clips a block's **bottom** edge into a centred gable/ridge (the block reads as "the roof"; content below sits "under" it). **Primary use: the home hero image block.**
- `.roofline-top` — clips a block's **top** edge into a ridge (a section that sits *under* a roof).
- `.roofline-slope` — a single eave→ridge diagonal (for accent panels/dividers).

Use the roofline edge **once or twice per page at most** (typically the hero, optionally one CTA band). Overusing it cheapens it. When you place a `.roofline-bottom` image, add a few rem of extra bottom padding so the gable cut doesn't crop content.

**(b) The copper "course rule".** Sampled from how shingles lay in measured courses / a tape measure. Two forms:
- `.course-rule` — a horizontal copper divider of repeating ticks (used as the Footer cap; use as a section delimiter / accent line).
- `.eyebrow` — the spec-sheet label (mono, uppercase, copper) with a **course-tick lead-in** drawn before the text (a short ruled line with measure ticks). **Every section eyebrow uses this** (via the `Eyebrow` / `SectionHeader` components). On dark bands pass `tone="onDark"`.

Optional supporting texture: `.blueprint-grid` — a faint slate measure-grid for the interior of dark slate bands (use subtly, e.g. behind a stats or process band).

**Why it's meaningful (not decoration):** a roof is literally built in measured courses from eave to ridge; the pitch and the course-tick encode the craft. The numbered process (01–05) is the *only* place numbered markers appear, because that content genuinely is a sequence.

---

## 7. Component inventory (shared UI kit — built by Atlas, in `components/`)

Import from `@/components/<Name>`. **Do not restyle these globally in Wave 2.** Page-specific components live in your own `components/<area>/` namespace.

| Component | Props (key ones) | Notes |
|---|---|---|
| `Container` | `width?: "prose"\|"site"\|"wide"` (default `site`), `as?`, `className` | Horizontal rhythm authority. |
| `Section` | `tone?: "default"\|"muted"\|"slate"\|"copper"`, `spacing?: "sm"\|"md"\|"lg"`, `contained?` (default true), `width?`, `id`, `innerClassName`, `as?` | Owns section bg + vertical padding. Wraps children in a `Container` unless `contained={false}`. |
| `SectionHeader` | `eyebrow?`, `title`, `intro?`, `align?: "left"\|"center"`, `tone?: "default"\|"onDark"`, `as?: "h1"\|"h2"\|"h3"` (default h2), `maxWidth?` | Eyebrow + heading + intro. Use on every section. |
| `Eyebrow` | `tone?: "default"\|"onDark"`, `className` | The signature course-tick label (also used internally by `SectionHeader`). |
| `Button` | `variant?: "primary"\|"secondary"\|"outline"\|"ghost"\|"onDark"` (default primary=copper), `size?: "sm"\|"md"\|"lg"`, `block?`, `href?` (→ renders `next/link` `<a>`; else `<button>`), `external?` | THE CTA primitive. Use for every action so they're identical. Primary = copper (the one bold action). `onDark` = light fill for slate bands. |
| `Icon` | `name: string` (lucide PascalCase, see registry), `size?` (24), `strokeWidth?` (1.75), `className`, `aria-hidden?` (true) | Renders a registered icon by string name. Data files store icon names; render them through this. Includes inline Facebook/Instagram (lucide dropped brand icons). **Add new icons to `components/Icon.tsx`'s registry if a data field needs one.** |
| `Reveal` | `delay?` (ms), `as?`, `once?` (true), `className` | Scroll-triggered fade-and-rise (client). Transition + reduced-motion live in `globals.css` `[data-reveal]`. Use to reveal section blocks/cards — **not every element.** |
| `Stat` | `value: string`, `label: string`, `tone?: "default"\|"onDark"` | One honest "by the numbers" figure (display face). No fabricated counts — see `lib/trust.ts`. |
| `Logo` | `variant?: "onLight"\|"onDark"`, `full?` (true), `className` | **PLACEHOLDER — Beacon replaces this file.** Don't depend on internal markup. |
| `Header` | — | Sticky, responsive nav + utility bar + prominent phone CTA + mobile menu. Client component. |
| `Footer` | — | Final CTA + brand/contact + nav + services + service-areas + hours + legal. |
| `PageStub` | `eyebrow`, `title`, `intro`, `owner`, `children?` | Wave-1 stub scaffold. Wave 2 owners replace page contents; usages disappear naturally. |

**Helper:** `cn(...)` from `@/lib/cn` (clsx wrapper) for conditional classes.

---

## 8. Page-by-page section breakdown

Route list (final): `/`, `/about`, `/services`, `/services/[slug]`, `/gallery`, `/reviews`, `/service-areas`, `/faq`, `/contact`.

Builders RENDER `lib/*` data — don't invent divergent copy. Image paths below are the canonical `/public` paths from the Image Manifest (§10).

### `/` — Home (CEDAR)
1. **Hero** — *thesis: a real Ontario roof against the sky, with the brand promise + phone + free-estimate CTA + trust badges.* Use the **`.roofline-bottom`** signature on the hero image. Image: `hero/main.jpg` (+ optional `hero/secondary.jpg`). Pull `site.tagline`, `site.description`, `trustBadges`.
2. **Trust strip** — compact row of `trustBadges` (licensed/insured, free estimates, warranty, local). No image.
3. **Services overview** — `SectionHeader` + grid of `featuredServices` (or all `services`) as cards (icon + title + tagline + short desc + "Learn more"). Images: each service's `image`.
4. **Why choose us** — `trustSignals` (4 pillars) on a `tone="muted"` or `slate` band; optionally `.blueprint-grid`. Image: `about/craftsmanship.jpg` optional.
5. **Process** — the 01–05 `processSteps` (the one place numbered markers belong). Image: `process/installation.jpg` optional.
6. **Honest stats band** — `honestStats` via `Stat` on a slate band. (Honest values, not fabricated counts.)
7. **Featured gallery teaser** — 3–6 images from `gallery/*` with a "View all" link to `/gallery`.
8. **Reviews teaser** — 2–3 `testimonials` + link to `/reviews`.
9. **Service-area teaser** — primary city + nearby towns chips, link to `/service-areas`. Image: `areas/region.jpg` optional.
10. **Final CTA band** — copper or slate; phone + free estimate. (Footer already has a CTA; keep this distinct or rely on Footer.)

### `/services` — Services index (CEDAR)
1. Page header (slate) — eyebrow + title + intro.
2. Services grid — all `services` as rich cards (image `image`, icon, title, tagline, short desc, features peek, "Learn more" → `/services/[slug]`).
3. Process strip (reuse `processSteps`) or a "how we work" teaser.
4. CTA band.

### `/services/[slug]` — Service detail (CEDAR)
*(Atlas built a correct async-params + `generateStaticParams` + `notFound()` stub; keep that contract.)*
1. Service hero (slate or image) — `service.title`, `tagline`, `shortDescription`, CTA. Image: `service.heroImage`.
2. Long description — `service.longDescription[]` in a prose container.
3. Features/inclusions — `service.features[]` as a checked list.
4. Related: process steps and/or other services rail.
5. CTA band (phone + free estimate).

### `/about` — About (DALE)
1. Page header (slate).
2. Story / who we are — brand voice; honest (locally owned, licensed, insured, warranty). Image: `about/team.jpg` or `about/owner.jpg`.
3. Craftsmanship / how we work — `processSteps` or values. Image: `about/craftsmanship.jpg`, `about/hands.jpg`.
4. Trust signals — `trustSignals`.
5. Service-area mention + CTA.

### `/gallery` — Project gallery (DALE)
1. Page header.
2. Gallery grid/masonry — 8–12 `gallery/*` images with descriptive alt; optional lightbox. Keep it the visual centrepiece.
3. CTA band.

### `/reviews` — Reviews (DALE)
1. Page header.
2. Reviews grid — all `testimonials` (quote, name, city, star rating). **Render the replace-before-launch note awareness; do not present as verified.**
3. Optional honest stats / trust band.
4. CTA band.

### `/service-areas` — Service areas (DALE)
1. Page header.
2. Primary area highlight — `primaryArea` (Stoney Creek). Image: `areas/region.jpg` or `areas/stoney-creek.jpg`.
3. Nearby areas grid — `nearbyAreas` cards (name + blurb).
4. "Don't see your town?" + CTA.

### `/faq` — FAQ (DALE)
1. Page header.
2. FAQ accordion grouped by `faqCategories`, rendering `faqs`. Add **FAQPage** structured data (JSON-LD) if feasible.
3. CTA band.

### `/contact` — Contact (VEGA)
1. Page header.
2. Two-column: **contact/quote form** (name, email, phone, city [from `serviceAreaNames`], service [from `services`], message) + **contact rail** (phone click-to-call, email, hours, service region). Image optional: `contact/contact.jpg`.
3. Form posts to `app/api/contact/route.ts` (Vega). Validate with `zod`. Honest success/empty/error states (see frontend-design writing guidance).
4. Optional map/area chips.

---

## 9. Motion guidelines

Restrained and purposeful. The mechanics live in `globals.css`; the trigger is the `Reveal` component.

- **What animates:** section blocks and cards fade-and-rise once on scroll-in (`Reveal`, ~620ms, soft ease, optional stagger via `delay`). Buttons lift slightly on hover (`-translate-y-0.5`) + colour shift. Nav active-underline. The mobile menu open/close. Optionally one orchestrated hero entrance on the home page (subtle; don't overdo).
- **How:** use tokens `--dur-fast/mid/slow` and `--ease-out-soft`/`--ease-in-out-soft`. Prefer transform/opacity (GPU-friendly). Stagger groups with small incremental `delay` (e.g. 0/80/160ms).
- **Don't:** parallax everything, animate on every element, autoplay loud motion, or add scattered effects — that reads AI-generated. Boldness goes to the signature, not motion.
- **Reduced motion (required):** `globals.css` already disables transitions/animations and forces `[data-reveal]` visible under `prefers-reduced-motion: reduce`. `Reveal` also short-circuits to visible. Any new motion you add MUST be wrapped so it's gated by this — never ship motion that ignores the preference. framer-motion is installed if you need orchestration; still respect reduced motion.

---

## 10. IMAGE MANIFEST

**Convention (everyone follows):** reference images as **string paths to `/public`** (e.g. `<Image src="/images/hero/main.jpg" width={1600} height={1000} alt="…" />` or with `fill`), **never** static `import`, so the build stays green before Beacon downloads assets. Always provide meaningful `alt` (the suggested alt below is a starting point — refine for context). Use Next `<Image>` with explicit `width`/`height` or `fill` + `sizes`.

**Beacon downloads** the actual files to these exact paths using the Pexels API (key provided out-of-band; never commit it). Suggested Pexels photo IDs are starting candidates Atlas verified during recon — Beacon may choose better frames but should keep paths and subjects. Prefer `src.large2x`/`src.original`, landscape unless noted. Record attributions in `IMAGE_CREDITS.md`.

> Photographer note: many roofing stock photos are US/Texas/Mediterranean. Prefer frames with **asphalt architectural shingles on detached homes**, neutral/grey/brown roofs, and overcast or blue Ontario-like skies. Avoid obvious terracotta-Mediterranean tile, palm trees, and US-flag/Texas cues for primary/hero imagery. Several verified Ontario-specific options exist (Toronto, Markham, Kingston, Niagara) and are noted.

### Hero / brand
| Path | Pexels search terms | Cand. IDs | Orient | Used on | Alt (starting point) |
|---|---|---|---|---|---|
| `/images/hero/main.jpg` | "roof house blue sky residential", "gable roof house" | 28460169, 16587704 | landscape | Home hero (`.roofline-bottom`) | Newly shingled gable roof of a two-storey home against a clear sky |
| `/images/hero/secondary.jpg` | "roofer working on rooftop", "roofers shingle installation" | 38028508, 37677476 | landscape | Home hero secondary / about | Roofers installing asphalt shingles on a residential roof |

### Services (one card `image` + one wide `heroImage` each)
| Path | Pexels terms | Cand. IDs | Orient | Used on | Alt |
|---|---|---|---|---|---|
| `/images/services/asphalt-shingles.jpg` | "asphalt shingle roof close up" | 237907 | landscape | Asphalt service card / home | Close-up of layered asphalt architectural shingles |
| `/images/services/asphalt-shingles-hero.jpg` | "roofer nail gun shingle installation" | 33404248, 37677394 | landscape | Asphalt service hero | Roofer fastening asphalt shingles with a nail gun |
| `/images/services/roof-repair.jpg` | "roof repair worker hands" | 9431615, 37677394 | landscape | Repair card | Roofer repairing a section of shingles by hand |
| `/images/services/roof-repair-hero.jpg` | "roof repair worker rooftop" | 34524716, 15964928 | landscape | Repair hero | Worker carrying out a targeted roof repair |
| `/images/services/flat-roof.jpg` | "flat commercial roof membrane", "low slope roof" | 12005129, 27793722 | landscape | Flat-roof card | Flat low-slope roof membrane on a building |
| `/images/services/flat-roof-hero.jpg` | "flat roof membrane rooftop" | 8811591, 27793722 | landscape | Flat-roof hero | Membrane-covered flat roof with rooftop details |
| `/images/services/eavestrough.jpg` | "rain gutter house exterior", "eavestrough downspout" | 2663254 | landscape | Eavestrough card | Rainwater running off a roof into an eavestrough |
| `/images/services/eavestrough-hero.jpg` | "gutter downspout house" | 2663254, 5667308 | landscape | Eavestrough hero | Aluminum eavestrough and downspout on a home |
| `/images/services/skylight.jpg` | "skylight roof window" | 4482822, 233267 | landscape | Skylight card | Skylight set into a sloped roof, sky visible through it |
| `/images/services/skylight-hero.jpg` | "skylight roof interior light" | 8082327, 4482822 | landscape | Skylight hero | Daylight pouring through a roof skylight |
| `/images/services/attic-ventilation.jpg` | "attic insulation", "roof ventilation ridge vent" | 6124239 | landscape | Vent/insulation card | Attic insulation and roof ventilation detail |
| `/images/services/attic-ventilation-hero.jpg` | "attic insulation worker", "ridge vent roof" | 6124239, 18335689 | landscape | Vent/insulation hero | Worker improving attic insulation and ventilation |
| `/images/services/emergency-repair.jpg` | "storm damaged roof", "roof tarp emergency" | 9899096 | landscape | Emergency card | Storm-damaged roof awaiting emergency repair |
| `/images/services/emergency-repair-hero.jpg` | "storm damage house roof" | 9899096, 4170461 | landscape | Emergency hero | Roof damaged after a severe storm |

### About / team / craftsmanship
| Path | Pexels terms | Cand. IDs | Orient | Used on | Alt |
|---|---|---|---|---|---|
| `/images/about/team.jpg` | "construction workers team rooftop", "small business team outdoors" | 37636256, 36729527 | landscape | About story / home why-us | The roofing crew on a job site |
| `/images/about/craftsmanship.jpg` | "hands hammer nail roof", "roofer hands shingles" | 8447781, 37677394 | landscape | About craftsmanship / home | Hands carefully fastening roofing material |
| `/images/about/hands.jpg` | "worker gloves roofing hands" | 8487769, 8487768 | landscape | About / craftsmanship | Gloved hands working on a roof |
| `/images/about/owner.jpg` | "construction worker portrait hard hat" | 34670926, 12357629 | **portrait** | About (owner/lead) | Portrait of a roofing professional in safety gear |

### Process
| Path | Pexels terms | Cand. IDs | Orient | Used on | Alt |
|---|---|---|---|---|---|
| `/images/process/inspection.jpg` | "roof inspection ladder", "worker inspecting roof" | 16647524 | landscape | Process step 01 / about | Roofer inspecting a roof from a ladder |
| `/images/process/installation.jpg` | "roofers installing shingles home" | 38028508, 33404981 | landscape | Process / home | Crew installing a new shingle roof |

### Gallery (8–12; mix of finished roofs, details, homes, seasons)
| Path | Pexels terms | Cand. IDs | Orient | Alt |
|---|---|---|---|---|
| `/images/gallery/project-01.jpg` | "new shingle roof house" | 4469150 | landscape | Completed asphalt shingle roof on a detached home |
| `/images/gallery/project-02.jpg` | "roofers working shingle install" | 37677476 | landscape | Roofing crew completing a shingle installation |
| `/images/gallery/project-03.jpg` | "house dormer window roof" | 36491092 | landscape | Roof with dormer detailing |
| `/images/gallery/project-04.jpg` | "brick chimney roof flashing" | 11210095 | landscape | Re-flashed chimney on a finished roof |
| `/images/gallery/project-05.jpg` | "two storey house gable roof" | 164558, 14509975 | landscape | Two-storey home with a new gable roof |
| `/images/gallery/project-06.jpg` | "snow on roof winter house ontario" | 11258665, 30731294 | landscape | Snow-covered roof in winter |
| `/images/gallery/project-07.jpg` | "asphalt shingle roof close up texture" | 237907 | landscape | Detail of fresh architectural shingles |
| `/images/gallery/project-08.jpg` | "suburban house exterior ontario" | 21637753, 1029599 | landscape | Suburban Ontario home exterior |
| `/images/gallery/project-09.jpg` | "house roof golden hour sunset" | 4370095, 29256934 | landscape | Finished roof at golden hour |
| `/images/gallery/project-10.jpg` | "flat roof membrane building" | 12005129 | landscape | Completed low-slope membrane roof |
| `/images/gallery/project-11.jpg` | "skylight roof window" | 233267 | landscape | Skylight installed in a new roof |
| `/images/gallery/project-12.jpg` | "metal roof house grey" | 48784, 35539402 | landscape | Standing-seam / metal roof detail |

### Service area / region
| Path | Pexels terms | Cand. IDs | Orient | Used on | Alt |
|---|---|---|---|---|---|
| `/images/areas/region.jpg` | "aerial residential neighbourhood rooftops" | 7937293, 7937274 | landscape | Service-areas / home teaser | Aerial view of a residential neighbourhood's rooftops |
| `/images/areas/stoney-creek.jpg` | "niagara ontario town", "suburban toronto street homes" | 2035406, 21637753 | landscape | Service-areas primary | Tree-lined Ontario residential street |

### Contact + OG
| Path | Pexels terms | Cand. IDs | Orient | Used on | Alt |
|---|---|---|---|---|---|
| `/images/contact/contact.jpg` | "contractor handshake homeowner", "roofer ladder house" | 8486896, 7578896 | landscape | Contact page | Roofer meeting a homeowner about their roof |
| `/images/og/willys-roofing-og.jpg` | derive from hero (1200×630) | from hero set | landscape 1200×630 | OpenGraph (`lib/site.ts` `ogImage`, layout metadata) | Willy's Roofing — licensed, insured roofing in the Hamilton–Niagara region |

**Total: ~32 images.** Beacon: also produce `public/logo.svg` (+ on-dark variant), the favicon/app icon, the OG image, the final `components/Logo.tsx`, and `IMAGE_CREDITS.md`. Keep all paths above exactly.

---

## 11. Data files (`lib/`) — built by Atlas; render these, don't diverge

| File | Exports | Contents |
|---|---|---|
| `lib/site.ts` | `site`, `navLinks`, `footerLegalLinks`, `NavLink` | Company facts, real phone (`416-414-8452` / `tel:+14164148452`), placeholder email/social/hours (marked EDIT BEFORE LAUNCH), primary city = Stoney Creek, `serviceRegion`, `url` (metadataBase), `ogImage`. |
| `lib/services.ts` | `services`, `serviceSlugs`, `getService(slug)`, `featuredServices`, `Service` | 7 services (asphalt-shingle-roofing, roof-repair, flat-roofing, eavestrough-and-gutters, skylights, attic-ventilation-and-insulation, emergency-roof-repair). Each: slug, title, tagline, short + long (paragraph array) descriptions, features[], lucide `icon`, `image`, `heroImage`, `featured`. |
| `lib/serviceAreas.ts` | `serviceAreas`, `primaryArea`, `nearbyAreas`, `serviceAreaNames`, `ServiceArea` | Stoney Creek (primary) + 11 nearby towns, each with a `blurb`. |
| `lib/process.ts` | `processSteps`, `ProcessStep` | 5 ordered steps (01–05) with icon. The only legitimate numbered sequence. |
| `lib/trust.ts` | `trustSignals`, `trustBadges`, `honestStats`, `TrustSignal` | Honest, editable signals (licensed & insured, written workmanship warranty, free estimates, locally owned). **No fabricated numbers.** |
| `lib/testimonials.ts` | `testimonials`, `averageRating`, `Testimonial` | 8 realistic **PLACEHOLDER** reviews (first name + last initial + city + rating). Carries a prominent replace-before-launch comment. |
| `lib/faqs.ts` | `faqs`, `faqCategories`, `Faq` | 10 real Ontario-roofing FAQs grouped into 4 categories. |
| `lib/cn.ts` | `cn(...)` | clsx wrapper. |

If you need a new field on any of these, **don't edit them in Wave 2** — list it in your final report for Wave 3.

---

## 12. FILE-OWNERSHIP MAP (Wave 2 — obey strictly)

- **ATLAS (Wave 1, done):** root config (`next.config.ts`, `eslint.config.mjs`, `tsconfig`, `package.json`), `app/layout.tsx`, `app/globals.css`, all `components/` shared primitives (`Container`, `Section`, `SectionHeader`/`Eyebrow`, `Button`, `Icon`, `Reveal`, `Stat`, `Header`, `Footer`, `PageStub`), `components/Logo.tsx` (placeholder), all `lib/*` data, and the route **stubs**.
- **BEACON:** `public/images/**`, `public/logo.svg` (+ variants), `components/Logo.tsx` (**FINAL — overwrites the placeholder**), favicon/app icon, `app/opengraph-image` or the `/public` OG image, `IMAGE_CREDITS.md`. Beacon does **not** edit pages or lib.
- **CEDAR:** `app/page.tsx` (home), `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `components/home/**`, `components/services/**`.
- **DALE:** `app/about/page.tsx`, `app/gallery/page.tsx`, `app/reviews/page.tsx`, `app/service-areas/page.tsx`, `app/faq/page.tsx`, and `components/about|gallery|reviews|areas|faq/**`.
- **VEGA:** `app/contact/page.tsx`, `app/api/contact/route.ts`, `components/contact/**`, `app/sitemap.ts`, `app/robots.ts`, plus Wave 3 integration.

**Wave 2 rule:** only edit files in your zone. Do **NOT** edit `layout.tsx`, `globals.css`, Tailwind/`@theme` tokens, `package.json`, or `lib/*`. If you need a shared token/component/data field added, note it in your final report for Wave 3 integration. Page-specific components go in your own `components/<area>/` namespace.

---

## 13. Quality floor (non-negotiable, applies to every page)

- **Responsive to mobile** (test ~360–390px up). Use the `Container`/`Section` system; don't break the horizontal rhythm.
- **Visible keyboard focus** — never remove the copper focus ring (`:focus-visible` is set globally).
- **`prefers-reduced-motion` respected** — already enforced globally; don't add motion that ignores it.
- **Semantic headings** — one `h1` per page (use `SectionHeader as="h1"` on the page header); logical order after.
- **Real `alt` text** on every meaningful image; `aria-hidden` decorative icons.
- **Click-to-call everywhere** — phone uses `site.phone.href`.
- **Canadian English** spelling.
- **Build green + lint clean** before you hand off. Run `npm run build` and `npx eslint .` from `website/`.

Engineering notes (Next 16): `params` is a **Promise** (await it) in pages / `generateMetadata` / route handlers — see the `[slug]` stub for the pattern. Turbopack is the default builder. Use `next/image` with local string `src` (not `import`). next/font is already configured in `layout.tsx` — don't re-add fonts.
