# Manas Geotextile — website rebuild

A clean, minimal, modern site for Manas Geotextile, replacing manasgeotextile.com.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Geist fonts.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  app/            # routes: /, /products, /products/[slug], /applications, /about, /contact, sitemap, robots
  components/     # Header, Footer, Reveal, ButtonLink, SectionHead, PageHero, StrataVisual, EnquiryForm, CtaBand
  lib/site.ts     # brand + contact details
  lib/content.ts  # products, applications, stats, process
```

All copy lives in `src/lib/` — edit there, not in components.

## Before launch (TODO)

- [ ] Real contact details, address and WhatsApp number in `src/lib/site.ts`
- [ ] Real product grades and datasheet values in `src/lib/content.ts` (current specs are typical industry ranges)
- [ ] Confirm stats (years, projects, certifications)
- [ ] Real company story, certifications and client logos on `/about`
- [ ] Project photography / case studies
- [ ] Wire the enquiry form to a real endpoint (currently opens a pre-filled email)
- [ ] Logo, favicon and Open Graph image
