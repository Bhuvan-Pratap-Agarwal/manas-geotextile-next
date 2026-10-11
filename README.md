# Manas Geotextile — website

SEO-first, minimal site for Manas Geo Tech India Pvt. Ltd. (manasgeotextile.com).

**Stack:** Next.js 15 (App Router, fully static) · TypeScript · Tailwind CSS v4 · Framer Motion · Geist.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `src/lib/site.ts` | Company name, contacts, addresses, nav |
| `src/lib/products.ts` | Products, specs, grades, FAQs, SEO titles |
| `src/lib/applications.ts` | Application pages + cross-section layers |
| `src/lib/guides.ts` | Knowledge-hub articles (blocks: p, h2, list, table, callout) |
| `src/lib/schema.ts` | JSON-LD structured data |
| `next.config.ts` | 301s from old `.html` URLs |
| `docs/market-research-and-seo.md` | Research, keyword map, launch checklist |

Add a product, application or guide by adding an entry to the matching file — routes, sitemap, OG image and structured data are generated automatically.

## Before launch

- [ ] Confirm contacts/addresses in `src/lib/site.ts`
- [ ] Confirm woven geotextile, geogrid, geocell are really supplied (else delete from `products.ts`)
- [ ] Add datasheet test values per grade, BIS licence and ISO certificates
- [ ] Plant photos, project case studies, client logos
- [ ] Wire the enquiry form to a real endpoint (currently opens a pre-filled email)
- [ ] Google Search Console token in `src/app/layout.tsx`; submit sitemap
- [ ] Google Business Profile for head office and factory
