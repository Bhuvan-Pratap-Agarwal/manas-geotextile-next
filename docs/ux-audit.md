# UI/UX & conversion-psychology audit

_October 2026 · audited against the "God-Tier UI/UX Website Audit Playbook" · production build (`next build && next start`)._

Everything below was **measured** with Lighthouse 12, axe-core 4 (WCAG 2.0/2.1/2.2 A + AA rules) and Playwright scripts, unless marked **untested**. Lab data only — no real-user Core Web Vitals exist until the site is live.

## A. Executive summary

1. **Mobile homepage was slow — fixed.** The hero headline was hidden until JavaScript hydrated, and the animated demo re-rendered ~470 SVG nodes per frame. LCP 3.3 s → **2.2 s**, TBT 550 ms → **50 ms**, Lighthouse performance 78 → **99**.
2. **Muted and accent text failed WCAG contrast — fixed.** Grey labels were 3.8:1 and orange labels 3.5:1 (need 4.5:1). New tokens: muted `#62655f` (5.4:1), `accent-ink` `#b93d0c` (5.2:1); the bright orange is kept for graphics only.
3. **The enquiry form had one fragile path — fixed.** It only opened an email client (absent on many office PCs) with no field errors. Now: WhatsApp (primary in Indian B2B) + email, inline errors, focus on the first error, input preserved, clear "what happens next" state.
4. **Persuasion gaps — partly fixed.** Added audience line, no-obligation risk-reversal, a verifiable press mention, and a 3-step "how ordering works". **Still missing: real proof** — certifications, project case studies, client names, plant photos. This is now the single biggest weakness and needs the client.
5. **Contact page meta description was streamed into `<body>` — fixed.** Reading `searchParams` on the server made the page dynamic; it is now static (SEO 91 → 100).

## B. Measured results (after fixes)

| Page | Device | Perf | A11y | Best pr. | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 99 | 100 | 100 | 100 | 2.2 s | 0 | 50 ms |
| `/` | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms |
| `/products/non-woven-geotextile` | mobile | 98 | 100 | 100 | 100 | 2.4 s | 0 | 30 ms |
| `/tools/geotextile-calculator` | mobile | 98 | 100 | 100 | 100 | 2.4 s | 0 | 50 ms |
| `/contact` | mobile | 99 | 100 | 100 | 100 | 2.2 s | 0 | 60 ms |

Before fixes: `/` mobile 78 / 96 / 100 / 100, LCP 3.3 s, TBT 550 ms. Shared JS 188 kB → **138 kB** (framer-motion removed).

Other automated checks:
- **axe-core:** 0 violations on all 13 routes at 1440 px and 390 px.
- **Overflow sweep:** no horizontal scroll at 320, 375, 430, 768, 1024, 1920, 2560 px on 6 key pages.
- **Touch targets:** none under 24×24 px on mobile (skip link is visually hidden by design).
- **Headings:** exactly one `h1` per page, no skipped levels.
- **Console:** no errors on any route (404 page intentionally returns 404).
- **Keyboard:** logical tab order; visible focus ring everywhere; mobile menu moves focus in, closes on Esc and returns focus to the toggle.
- **Form edge cases:** empty submit → both errors shown, focus on Name; invalid email → error, other input kept; long text (3000 chars) accepted; prefill from calculator (`?product=&area=`) works; valid submit → hand-off + status message.

## C. Defect register

| # | Pri | Issue | Evidence | Fix | Status |
|---|---|---|---|---|---|
| 1 | P1 | Hero LCP gated on JS | Lighthouse LCP 3.3 s; LCP element `h1` inside opacity-0 motion wrapper | CSS-only entrance for above-the-fold (`Reveal immediate`) | Fixed |
| 2 | P1 | Main-thread blocking from demo + framer | TBT 550 ms; 1.8 s script eval | Particles drawn as 2 `<path>`s, rAF quantised, autoplay after idle; framer-motion removed | Fixed |
| 3 | P1 | Text contrast < 4.5:1 | axe/Lighthouse `color-contrast` (3.82, 3.54, 3.61) | New `muted`, `accent-ink` tokens; calculator note 60% opacity | Fixed |
| 4 | P1 | Form: single fragile channel, no errors | Code review + Playwright | WhatsApp + email, inline errors, `aria-invalid`, focus mgmt, success state | Fixed |
| 5 | P1 | Contact meta description not in `<head>` | Lighthouse SEO `meta-description` fail | Page made static; params read client-side | Fixed |
| 6 | P2 | Logo accessible name ≠ visible text | Lighthouse `label-content-name-mismatch` | Removed override `aria-label` | Fixed |
| 7 | P2 | Slider track 2 px tall | Touch-target script | 32 px hit area, styled track, `aria-valuetext` | Fixed |
| 8 | P2 | Footer/breadcrumb links 18–23 px tall | Touch-target script | Padding to ≥ 24 px | Fixed |
| 9 | P2 | No active state in nav | Manual | `aria-current` + accent dot | Fixed |
| 10 | P2 | CTA label inconsistency ("Request" vs "Get a quote") | Manual | Unified to "Get a quote" | Fixed |
| 11 | P2 | No privacy information near form | Playbook §15–16 | `/privacy` + note under form | Fixed |
| 12 | P1 | **No proof: certifications, projects, clients, photos** | Content review | Needs client material | **Open — client** |
| 13 | P1 | **Leads not captured server-side** | Form hands off to WhatsApp/email | Add Resend/Formspree/CRM endpoint | **Open — needs account** |
| 14 | P2 | No real photography | Content review | Plant, rolls, installation photos (AVIF/WebP, sized) | **Open — client** |
| 15 | P3 | Hero right column has spare height on large desktops | Screenshot | Revisit once photography exists | Open |

## D. Scorecard (1–5)

| Category | Weight | Score | Basis |
|---|---|---|---|
| Visual hierarchy & aesthetics | 12% | 4 | Screenshots; loses a point for no real imagery |
| UX clarity & task completion | 15% | 4 | Scripted tasks pass; untested with real users |
| Navigation & IA | 8% | 5 | 5-item nav, breadcrumbs, footer mesh, active state |
| Typography, spacing, consistency | 10% | 5 | Single type family, token scale, unified components |
| Responsive behaviour | 10% | 5 | 320–2560 px sweep, no overflow |
| Performance & CWV (lab) | 12% | 5 | 98–100 mobile; field data **untested** |
| Accessibility | 10% | 4 | 0 axe violations, keyboard ok; **screen-reader pass untested** |
| Content, trust & conversion | 10% | 3 | Strong copy and tools; proof missing |
| Interaction states & errors | 8% | 4 | Form states complete; no server-side capture |
| SEO, security & reliability | 5% | 5 | 100 SEO, static, structured data, redirects |
| **Weighted** | | **4.4 / 5** | Prioritisation aid only |

Untested: real-user task tests, screen readers (NVDA/VoiceOver), Safari/Firefox, real low-end Android on 3G, field Core Web Vitals.

## E. Conversion-psychology review

| Principle | Where it's applied | Status |
|---|---|---|
| 5-second clarity | H1 states the outcome ("keeps roads from failing"); eyebrow states category, country, age | ✅ |
| Loss aversion | Hero demo shows what you *lose* without geotextile (−38% base) | ✅ |
| Show, don't tell | Interactive cross-section instead of claims | ✅ |
| Reciprocity | Free calculator + 6 guides before asking for anything | ✅ |
| Foot-in-the-door | Calculator → one-click pre-filled quote | ✅ |
| Hick's law / cognitive load | 5 nav items, 1 primary + 1 secondary CTA per screen | ✅ |
| Risk reversal | "No-obligation quote" at the primary CTA; privacy note at the form | ✅ |
| Ambiguity aversion | 3-step "how ordering works"; success state says exactly what happens next | ✅ |
| Channel fit | WhatsApp first — how Indian contractors actually buy | ✅ |
| Specificity | 150–1500 GSM, 5 m, IS codes, real addresses, CIN | ✅ |
| Authority | Standards guides; verifiable trade-press profile | ⚠️ add BIS licence & ISO certificates |
| Social proof | — | ❌ needs real projects/clients — **never fabricate** |
| Peak-end rule | Satisfying demo (peak) + clear confirmation (end) | ✅ |

Deliberately **not** used: fake urgency, countdowns, invented testimonials or client logos, pop-ups.

## F. Next steps (in order)

1. Client supplies: BIS licence no., ISO certificate, 3–5 project references with photos, plant photography.
2. Connect the form to a backend (Resend or Formspree) so every lead is stored, then keep WhatsApp as the fast path.
3. After launch: Search Console + PageSpeed field data; Microsoft Clarity (with consent) to watch real sessions.
4. One moderated usability test: "find the right GSM for a road and request a quote".
