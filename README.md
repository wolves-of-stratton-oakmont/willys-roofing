# Willy's Roofing — Website

The marketing website for **Willy's Roofing**, a locally owned roofing company serving Stoney Creek, Hamilton, Burlington and the Niagara region of southern Ontario.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**. This document covers how to run, build and deploy the site, the design system in brief, and — most importantly — the **"Before you launch" checklist** of everything the owner should review or replace.

---

## 1. Before you launch — owner checklist

These are honest placeholders we put in so the site is complete and reviewable. **Please confirm or replace each one before the site goes live.** Nothing here is invented to mislead — they're clearly marked editable defaults.

> Tip: you don't need to be a developer for most of this. Each item says exactly which file to open and what to change. If you'd rather, hand this list to whoever maintains the site.

### A. Your business details — `lib/site.ts`
Open `lib/site.ts` and review the fields marked **`EDIT BEFORE LAUNCH`**:

- [ ] **Email address** (`email`) — currently `info@willysroofing.ca` (a placeholder). Set this to the real inbox where you want enquiries to go. Update both the `display` and the `href` (the `href` is the `mailto:` link).
- [ ] **Business hours** (`hours`) — currently Mon–Fri 7–6, Sat 8–2, Sun closed. Adjust to your actual hours.
- [ ] **Social media links** (`social`) — `facebook`, `instagram`, and `google` are placeholder URLs. Replace with your real profile links, or remove any you don't have.
- [ ] **Website domain** (`url`) — currently `https://www.willysroofing.ca`. Set this to the real domain the site will live on. (This is used for SEO, social-share previews, and the sitemap, so it matters.)
- [ ] **Phone number** (`phone`) — currently **416-414-8452**. This is your real number and is used for the click-to-call buttons everywhere. Only change it if your number changes. (If you do, update `display`, `href`, and `e164`.)

> **No street address is published.** The site intentionally presents a *service region* rather than a storefront address. If you have a real business address you'd like to list (e.g. for Google Business Profile consistency), add it and we can wire it into the footer and local-business SEO data.

### B. Customer reviews — `lib/testimonials.ts`  ⚠️ important
- [ ] **Replace the placeholder reviews with real ones.** The reviews currently on the site are realistic **placeholders** — they are **not** real customers. Open `lib/testimonials.ts` and swap them for genuine reviews (for example, copied from your Google, HomeStars or Facebook reviews, with the customer's permission). The file format is shown at the top, and there's a prominent comment reminding you. **Do not publish the placeholders as if they were real.**

### C. Contact form delivery — `app/api/contact/route.ts`
- [ ] **Connect the contact form to your email or CRM.** When a visitor submits the "Free estimate / Contact" form, it is received by the site, but the step that **emails it to you (or pushes it to a CRM)** is left as a clearly commented stub so you can plug in your preferred provider. Open `app/api/contact/route.ts` and follow the comments to connect an email service (e.g. Resend, SendGrid, Postmark, or an SMTP relay) or your CRM. Until this is connected, **test the form after launch** to make sure enquiries reach you.

### D. Photo credits — `IMAGE_CREDITS.md`
- [ ] **Review the image credits.** The site currently uses licensed stock photography (from Pexels) as placeholders for roofs, crews and projects. Attribution is recorded in `IMAGE_CREDITS.md`. For the most authentic result, **replace these with real photos of your own completed roofs and crew** when you can — it makes a big difference to credibility. If you keep any stock photos, leave their credits in place.

### E. Logo & branding — `public/` + `components/Logo.tsx`
- [ ] If you have an official logo, it can replace the one in the site (`public/logo.svg` and `components/Logo.tsx`). The current logo is a clean, on-brand mark designed for the site; swap it for your registered logo if you have one.

### F. Honest claims — already safe, but confirm
The site avoids any invented specifics (no made-up awards, "X years in business", exact review counts, or fake certifications). The trust statements it **does** make are: *licensed & insured, free no-obligation estimates, written workmanship warranty, locally owned & operated, 24/7 emergency response.* 
- [ ] Confirm these are all accurate for your business. If you have real specifics you'd like to add (e.g. a manufacturer certification, an exact founding year, your Google star rating), they can be added — they were left out only because we won't state them without your confirmation. See `lib/trust.ts`.

---

## 2. Running the site locally

You'll need [Node.js](https://nodejs.org) **20.9 or newer** installed.

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser. The site reloads automatically as files change.

To stop the server, press `Ctrl + C` in the terminal.

---

## 3. Building & deploying

```bash
# Create an optimized production build
npm run build

# Run the production build locally to preview it
npm run start
```

The site is a standard Next.js app and deploys cleanly to **[Vercel](https://vercel.com)** (the easiest option — connect the repository and it builds automatically), or to any host that supports Next.js (Netlify, AWS Amplify, a Node server, etc.).

**Before the first deploy**, make sure you've set the real domain in `lib/site.ts` (`url`) — see the checklist above.

### Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start the local development server (hot-reloading). |
| `npm run build` | Build the optimized production site. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | Check the code for problems. |

---

## 4. Where things live (project map)

```
website/
├─ app/                     # The pages (each folder is a URL)
│  ├─ page.tsx              # Home (/)
│  ├─ about/                # /about
│  ├─ services/             # /services and /services/[each-service]
│  ├─ gallery/              # /gallery
│  ├─ reviews/              # /reviews
│  ├─ service-areas/        # /service-areas
│  ├─ faq/                  # /faq
│  ├─ contact/              # /contact  (+ app/api/contact for the form)
│  ├─ layout.tsx            # Site-wide shell: header, footer, fonts, SEO
│  ├─ not-found.tsx         # Friendly 404 page
│  └─ global-error.tsx      # Fallback shown if something breaks badly
│
├─ components/              # Reusable building blocks (buttons, header, etc.)
│
├─ lib/                     # The site's CONTENT & SETTINGS — edit these:
│  ├─ site.ts               #   business details, phone, hours, social, domain
│  ├─ services.ts           #   the list of roofing services + their copy
│  ├─ serviceAreas.ts       #   the towns you serve
│  ├─ testimonials.ts       #   customer reviews  (replace placeholders!)
│  ├─ faqs.ts               #   frequently asked questions
│  ├─ process.ts            #   the "how we work" steps
│  └─ trust.ts              #   trust signals (licensed, insured, warranty…)
│
├─ public/images/           # All photos used on the site
├─ DESIGN_SPEC.md           # The full design system & build spec (for developers)
├─ IMAGE_CREDITS.md         # Photo attributions
└─ README.md                # This file
```

**Most content changes — service descriptions, the towns you serve, FAQs, reviews — are made by editing the files in `lib/`.** You don't need to touch the page layouts to update wording.

---

## 5. The design system in brief — "The Ridgeline"

The look is derived from roofing in southern Ontario, not a generic template. The full specification for developers is in **`DESIGN_SPEC.md`**; here's the short version:

- **Colours.** A deep, weathered **slate blue-grey** (`#28384A`) as the anchor, a warm **copper** (`#C26B2C`) as the single accent (think copper flashing and the low Ontario sun on a roof), a cool **chalk-white** background (`#F4F7F8`, like a frosty sky — deliberately not a warm cream), and a near-black graphite for text.
- **Type.** *Archivo* for bold, structural headings (an industrial, signage-like face); *Public Sans* for clean, dependable body text; and *IBM Plex Mono* for small labels and figures (a "spec-sheet / tape-measure" feel).
- **The signature.** A single roof-**pitch** angle and a copper "**course rule**" (a ticked line, like the courses of shingles or a tape measure) are used as the memorable, recurring brand device — on the hero, section labels, and dividers. It's used sparingly on purpose.
- **Principles.** Calm, generous spacing; one bold element (the copper + the ridgeline) and everything else quiet; subtle, restrained motion; fully responsive to mobile; accessible (keyboard focus is always visible, and animations are disabled for visitors who prefer reduced motion).

---

## 6. Pages on the site

`/` Home · `/about` About · `/services` Services (with a page for each service) · `/gallery` Project gallery · `/reviews` Reviews · `/service-areas` Service areas · `/faq` FAQ · `/contact` Contact & free estimate.

The phone number (**416-414-8452**) is a tap-to-call button on every page.

---

## 7. Questions?

Technical details for developers are in `DESIGN_SPEC.md`. For anything about the content or the launch checklist above, start with the files in `lib/` — they're written to be readable and are commented throughout.
