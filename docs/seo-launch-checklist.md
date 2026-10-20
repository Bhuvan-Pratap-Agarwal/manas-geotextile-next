# SEO launch checklist

The site itself passes a full technical audit (Oct 2026): all 33 pages have unique titles under ~60 characters and descriptions under 160, one H1, canonical URLs on `https://www.manasgeotextile.com`, Open Graph images, valid structured data, no broken links or orphan pages, Lighthouse SEO 100 and mobile performance 92–95.

**None of it counts until the real domain points at this site.** On `*.vercel.app` every page is deliberately `noindex`.

## 1. Go live on the real domain (critical)

1. Vercel → Project → Settings → Domains → add `www.manasgeotextile.com` **and** `manasgeotextile.com`. Make **www the primary** (Google already knows the site as www) and let the bare domain redirect to it.
2. At the domain registrar, set the DNS records Vercel shows.
3. Redeploy. The site switches itself to indexable (robots `index, follow`, sitemap in robots.txt).
4. Check: `https://www.manasgeotextile.com/about-us.html` should redirect to `/about`. Old URLs and old PDF links all redirect, so existing rankings carry over.

## 2. Tell the search engines (day 1)

- **Google Search Console**: add the `https://www.manasgeotextile.com` property (DNS verification), submit `/sitemap.xml`, then use URL Inspection → Request indexing on the home page and the top product pages.
- **Bing Webmaster Tools**: import the site from Search Console. Bing also feeds ChatGPT search and Copilot.
- **IndexNow**: run `npm run indexnow` after each deploy that adds or changes pages.

## 3. Local search ("geotextile manufacturer near me / in Delhi / Haryana")

- **Google Business Profile** for the head office (Vasant Kunj) and the factory (IMT Bawal). Category: "Geotextile supplier" / "Manufacturer". Add photos of the plant, rolls and sites, the same phone numbers and the website link.
- Ask 10–20 happy contractors for Google reviews over the first few months.
- Keep name, address and phone **identical** on IndiaMART, TradeIndia, JustDial, LinkedIn and the website.

## 4. Authority (what moves you up for "geotextile", "PVC geomembrane")

- Links from: Indian Geosynthetics Society / IGS India chapter membership, trade press (World of Technical Textiles already covered Manas), supplier listings on contractor portals (L&T SuFin), and associations (CII, PHD Chamber).
- Ask Patel Engineering / other clients if they will mention or link to Manas in a case study.
- Publish one new guide a month (ideas: geotextile for landfill CQA, geo bag sizes and filling, IS 16391 test methods, PVC vs HDPE membrane for tunnels, Hindi version of "What is geotextile?").

## 5. Watch and improve (monthly)

- Search Console → Performance: which queries show impressions but low clicks → improve those titles.
- Search Console → Page indexing: fix anything "Crawled, not indexed".
- Vercel Speed Insights: keep Core Web Vitals green on mobile.

## Notes

- Product structured data has no price, so Google will list it as "not eligible" for product rich results. That's expected for a quote-based B2B product and doesn't affect ranking.
- FAQ rich results are now only shown for government and health sites; the FAQ markup is still valid and helps AI answers.
- `/llms.txt` gives AI assistants a clean summary of the company, products and pages.
