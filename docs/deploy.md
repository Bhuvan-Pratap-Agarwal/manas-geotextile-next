# Going live — Vercel + Supabase

The site is a static Next.js app on **Vercel**. Enquiries from the contact form go to `/api/enquiry`, which stores them in **Supabase** (Postgres) and can optionally email sales through **Resend**. Every push to `main` redeploys automatically.

```
Visitor ──▶ Vercel (pages, CDN, /api/enquiry) ──▶ Supabase table `enquiries`
                                         └──▶ Resend email to sales (optional)
```

Until the Supabase variables are set, the form falls back to the old behaviour (opens WhatsApp with the enquiry written out), so the site is safe to use at every step.

---

## 1. Vercel (done)

The project is imported from GitHub and deploys `main`. Preview URL: `https://<project>.vercel.app`.

## 2. Supabase — store every enquiry (≈5 min)

1. Go to <https://supabase.com/dashboard> → **New project**.
   - Name: `manas-geotextile`
   - Region: **South Asia (Mumbai)** — closest to customers and to Vercel's `bom1` region.
   - Save the database password somewhere safe (you won't need it for the website).
2. Open **SQL Editor** → **New query**, paste the whole of [`supabase/migrations/0001_enquiries.sql`](../supabase/migrations/0001_enquiries.sql), click **Run**. You should see "Success. No rows returned".
3. Open **Project Settings → API** (or **API Keys**) and copy:
   - **Project URL** → `https://xxxx.supabase.co`
   - **service_role** key (legacy tab) **or** a **Secret key** (`sb_secret_…`). Never the anon/publishable key.

> ⚠️ The service role / secret key bypasses all security. Only paste it into Vercel's environment variables. Never commit it — this repo is public.

## 3. Vercel environment variables

Vercel → your project → **Settings → Environment Variables**. Add for **Production** and **Preview**:

| Name | Value |
|---|---|
| `SUPABASE_URL` | Project URL from step 2.3 |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role / secret key from step 2.3 |

Then **Deployments → ⋯ on the latest → Redeploy** (env vars only apply to new deployments).

## 4. Test it

1. Open `https://<project>.vercel.app/contact`, fill name + phone, click **Send enquiry**.
2. You should see **"Thank you — your enquiry has reached our sales team"** with a reference code.
3. In Supabase → **Table Editor → enquiries**, the row is there.

If you see "Our enquiry system didn't respond", check Vercel → **Logs** for lines starting `enquiry:`.

## 5. Working the leads

Supabase → **Table Editor → enquiries**:
- Sort by `created_at` (newest first).
- Change `status` as you go: `new → contacted → quoted → won / lost` (or `spam`). Add your own `notes`.
- Invite the sales team: **Organization → Team → Invite** (they log in to the dashboard; the public can never read this table).
- Export: **⋯ → Export to CSV** for Excel.

## 6. Optional — email alert for every enquiry (Resend)

1. Sign up at <https://resend.com>, create an **API key**.
2. Add to Vercel env vars:
   - `RESEND_API_KEY` = the key
   - `ENQUIRY_NOTIFY_TO` = `sales@manasgeotextile.com` (comma-separate several)
   - `ENQUIRY_NOTIFY_FROM` = `Manas Website <onboarding@resend.dev>` for testing
3. Redeploy. Note: `onboarding@resend.dev` only delivers to the Resend account owner's email. Once the domain is connected (step 8), verify `manasgeotextile.com` in Resend and switch to e.g. `Website <web@manasgeotextile.com>`.

Replying to the alert email replies straight to the customer (`reply_to` is their address).

## 7. Analytics & real-world speed (free)

Vercel → project → **Analytics** → **Enable**, and **Speed Insights** → **Enable**. Both are cookie-free; the code is already in the site. Speed Insights gives the *real-user* Core Web Vitals that the audit could not measure.

## 8. Later — the real domain

When the client approves:
1. Vercel → **Settings → Domains** → add `manasgeotextile.com` and `www.manasgeotextile.com` (set one to redirect to the other).
2. At the domain registrar, set the DNS records Vercel shows (usually an `A` record to `76.76.21.21` and a `CNAME` for `www` to `cname.vercel-dns.com`).
3. HTTPS is issued automatically. The old `.html` URLs already 301 to the new pages.
4. Then: Google Search Console → add property → submit `https://manasgeotextile.com/sitemap.xml`; create Google Business Profiles for the office and factory (see `docs/market-research-and-seo.md`).

## Local development

```bash
cp .env.example .env.local   # fill in values, or leave blank to use the WhatsApp fallback
npm install
npm run dev
```
