# Manas Geotextile — website

SEO-first, minimal site for Manas Geo Tech India Pvt. Ltd. (manasgeotextile.com).

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Geist · hosted on **Vercel** · enquiries in **Supabase** · optional **Resend** email alerts.

**Go-live guide:** [`docs/deploy.md`](docs/deploy.md)

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
| `src/app/api/enquiry/route.ts` | Enquiry endpoint → Supabase (+ Resend) |
| `src/lib/enquiry.ts` | Shared validation for form and server |
| `supabase/migrations/` | Database schema (run in Supabase SQL editor) |
| `.env.example` | Environment variables |
| `docs/market-research-and-seo.md` | Research, keyword map, launch checklist |
| `docs/ux-audit.md` | Measured UI/UX audit and scorecard |

Add a product, application or guide by adding an entry to the matching file — routes, sitemap, OG image and structured data are generated automatically.

## Before launch

- [ ] Confirm contacts/addresses in `src/lib/site.ts`
- [ ] Confirm woven geotextile, geogrid, geocell are really supplied (else delete from `products.ts`)
- [ ] Add datasheet test values per grade, BIS licence and ISO certificates
- [ ] Plant photos, project case studies, client logos
- [ ] Create Supabase project, run the migration, set env vars on Vercel ([guide](docs/deploy.md))
- [ ] Google Search Console token in `src/app/layout.tsx`; submit sitemap
- [ ] Google Business Profile for head office and factory
