# Manas Geotextile — Project Context (Master Continuity Document)

> **Purpose:** Hand off full technical and creative context to future Cursor sessions without breaking architectural or aesthetic consistency.  
> **Stack snapshot:** Next.js 15.5.x, React 19, Tailwind CSS v4, R3F 9.x, Three r184, Framer Motion 12, GSAP 3, Lenis 1.3.

---

## 1. Project Overview

### Purpose

Digital flagship for **Manas Geotextile**: a **cinematic, engineering-credible** web experience that sells **geosynthetics at infrastructure scale** (roads, railways, tunnels, industrial works). The product is not a consumer app—it is **B2B / institutional premium**.

### Visual Philosophy

- **Cinematic industrial luxury:** dark, architectural canvas; restrained metallics (warm brass accent, cold steel neutrals); **scale and silence** over decoration.
- **Motion as engineering, not entertainment:** heavy easing, scrubbed scroll, subtle environmental drift—**confidence**, not flash.

### Emotional Goals

A visitor should feel:

- The organization is **massive, global, and authoritative**
- Technology is **advanced but real-world** (field-tested, spec-driven)
- Attention to **craft** (materials, precision, longevity)

### Brand Perception Goals

- **Premium manufacturer / engineering house** (not a startup landing template)
- **Tesla/Bentley/Apple-adjacent** in restraint and presentation quality—**not** in gimmicks
- **Trust:** infrastructure, standards, traceability (to be reinforced in future content layers)

### Experience Goals

- **Immersive hero** with optional WebGL; flawless **fallback** when GPU or motion preferences disallow it
- **Smooth, premium scroll** (Lenis + GSAP ScrollTrigger bridge)
- **Ultrawide** reads as intentional composition, not stretched UI
- **Mobile** stays luxurious with **reduced complexity**, not reduced dignity

---

## 2. Design Direction

### Visual Identity (Exact Target)

| Axis | Direction |
|------|-----------|
| **Palette** | Near-black bases (`#070708` family), warm paper text (`#f4f2eb`), muted stone secondary, **accent** `#c8a96b` (brass), engineering lines gray-brown |
| **Texture** | Subtle **grain** / grid masks in CSS; **no** noisy neon, **no** rainbow gradients |
| **Typography** | **Clash Display** (display / lockups) via Fontshare CDN; **Inter** (UI/body) via `next/font` |
| **Imagery language** | Architectural viz + industrial product truth: **volume, horizon, fog, grid** |
| **Shape language** | Hairline borders, **2px** radii at most; **inset highlights** suggest machined metal |

### Inspiration References (Non-Literal)

- **Apple:** typographic confidence, pacing, scroll-linked depth  
- **Tesla / Bentley:** engineered matte surfaces, authority, **restrained** motion  
- **Arch-viz:** horizon slabs, fog falloff, scale without clutter  

### Explicit Anti-Patterns

- Cyberpunk, gaming UI, “AI slop” gradients, heavy bloom, SaaS navbar kitsch, playful micro-interactions

---

## 3. Tech Stack

| Technology | Role |
|------------|------|
| **Next.js 15 (App Router)** | SSR/SSG, routing, metadata, `next/font`, Turbopack builds, file-based structure under `src/app` |
| **TypeScript** | Strict typing across components, hooks, 3D props |
| **Tailwind CSS v4** | `@import "tailwindcss"`, `@theme inline` in `globals.css`, utilities + arbitrary values |
| **Framer Motion** | DOM animation: hero reveals, nav/menu, `MotionConfig reducedMotion="user"` |
| **GSAP + ScrollTrigger** | Scroll-scrubbed **hero depth**; registered in `animations/gsap-config.ts`; **scrollerProxy** synced with Lenis in `ScrollTriggerBridge` |
| **Lenis (`lenis/react`)** | `ReactLenis root` smooth scroll; disabled when `prefers-reduced-motion` |
| **Three.js** | WebGL rendering for hero environment |
| **React Three Fiber** | Declarative scene graph, `Canvas`, hooks, performance patterns |
| **Drei** | `Grid`, `Line`, `Environment`, `AdaptiveDpr`, `PerformanceMonitor`, helpers |
| **clsx + tailwind-merge** | `cn()` utility for class composition |

---

## 4. Current Architecture

### Folder Structure (Core)

```
src/
  app/                    # App Router: layout.tsx, page.tsx, globals.css
  styles/                 # theme.css (tokens, fluid type, grain)
  components/
    layout/               # Container, Section
    providers/            # AppProviders, AnimationProvider, SmoothScrollProvider, ScrollTriggerBridge
    navigation/           # CinematicNav, overlay, context, links, logo, menu toggle
    footer/               # FooterPlaceholder
    webgl/                # LazyWebGLBadge (optional dev/demo—homepage may omit)
  sections/
    hero/                 # HeroSection, HeroContent, HeroBackdropFallback, motion/useHeroScrollProgress
    home/                 # HomePage, SectionsPlaceholder
  animations/             # gsap-config, framer variants, registry
  3d/
    hero/                 # HeroCanvas, HeroScene, terrain, fog, lighting, lines, particles, camera rig, types
    canvas/               # Shared WebGLCanvas, WebGLDevBadge
    scenes/               # SignatureOrb (legacy badge)
    materials/, shaders/  # Extension stubs
  hooks/                  # useReducedMotion, useMediaQuery, useDeviceCapability, useHeroSceneQuality, useNavScrollCompressed, useLenis re-export
  lib/
    config/site.ts
    constants/layout.ts
    gpu/                  # capabilities, dpr
    performance/mobile.ts
    r3f/constants.ts
  utils/                  # cn, responsive breakpoints, math
```

### Providers (`AppProviders`)

Order (outer → inner):

1. **`MotionConfig reducedMotion="user"`** — Framer respects OS reduced motion  
2. **`NavigationProvider`** — fullscreen menu state, body scroll lock, `data-nav-menu` on `<html>`  
3. **`AnimationProvider`** — GSAP plugin registration, defaults, ScrollTrigger config  
4. **`SmoothScrollProvider`** — `ReactLenis` when motion allowed; children include **`ScrollTriggerBridge`**

### Animation Systems

- **Framer:** page/hero/nav DOM; variants in `animations/variants.ts`, presets in `animations/registry.ts`  
- **GSAP:** ScrollTrigger for **hero scroll progress ref** consumed by R3F `useFrame`  
- **Lenis ↔ ScrollTrigger:** `ScrollTrigger.scrollerProxy(document.documentElement)` + `lenis.on('scroll')` → `ScrollTrigger.update`

### Responsive Systems

- **Breakpoints:** `utils/responsive.ts` (`sm`–`ultra`), `useMediaQuery`  
- **Fluid type:** CSS variables in `theme.css` + `@layer utilities` (`.type-display`, `.type-hero`, etc.) in `globals.css`  
- **Container:** `Container`/`Section` + `--container-max`, `--gutter-x`, `--ultrawide-max`  
- **`scroll-padding-top`** on `html` for fixed nav + in-page anchors

### GPU-Aware Rendering

- **`useDeviceCapability`:** WebGL tier, adaptive DPR, `deferHeavyExperience` (mobile viewport, `saveData`, reduced motion)  
- **`useHeroSceneQuality`:** tiers **0 / 1 / 2** drive segments, particles, fog, lines, DPR cap, shadows, normal refinement, animation flags  
- **`lib/gpu/*`:** capability probe, `getAdaptiveDpr`

### Ultrawide Support

- Wider **max-width** caps in hero content and nav shell (`min-[1800px]`, `min-[2200px]`)  
- **Inset vignettes** on hero (`min-[2000px]` side gradients)  
- **Navigation** max-width and padding track ultra aspect ratios

### Smooth Scrolling Architecture

- **Lenis** root instance; **no** smooth scroll when reduced motion  
- **ScrollTrigger `scrub`** on hero (~0.95) for **heavy**, cinematic linkage

### Fallback Systems

- **No WebGL / reduced motion:** `HeroBackdropFallback` + same `HeroContent`  
- **Navigation:** works without 3D; hero dims via **`useNavigationOptional`** when menu opens

### Mobile Optimization Strategy

- Lower terrain complexity, **no particle motion** on tier 0, fewer lines/particles, **shadows off** on tier 0, capped DPR, `antialias` off on lowest tier in hero canvas

---

## 5. Hero Section Implementation

### `HeroSection` (`sections/hero/HeroSection.tsx`)

- Full viewport **`motion.section`** with `#hero`  
- **`useHeroScrollProgress(heroRef)`** → `scrollProgressRef` for R3F + GSAP  
- **WebGL gate:** `gpu.webgl !== 'none'` && !`useReducedMotion`  
- **Layers:** WebGL or CSS fallback → gradient overlays → side vignettes (ultra) → **`HeroContent`**  
- **Menu integration:** `animate` **filter** (brightness / saturation / slight contrast) when **`menuOpen`**

### `HeroContent` (`sections/hero/HeroContent.tsx`)

- **Framer** stagger + **line reveals** for headline; **useScroll**/`useTransform` for parallax drift  
- **Headline / sub / CTAs** per brand copy; **metallic-industrial CTAs** (inset specular, gradients, restrained hover lift)  
- **Ultrawide** type clamps and max-width rails

### `HeroCanvas` (`3d/hero/HeroCanvas.tsx`)

- R3F **`Canvas`**: ACES tone mapping, exposure ~0.96, **`shadows={tier > 0}`**, tiered `antialias`  
- **`PerformanceMonitor`** + **`AdaptiveDpr`**; DPR capped by quality tier  
- **Clear color** `#070708`

### `HeroScene` (`3d/hero/HeroScene.tsx`)

- **`HeroFog`**, **`HeroCameraRig`**, **`HeroLighting`**, **`Environment preset="warehouse"`** (intensity scaled by tier)  
- **Group:** engineering **Grid**, **Terrain**, **InfrastructureLines**, **Particles**  
- **Distant slabs:** large dark planes for **horizon / arch-viz depth** (no post stack)

### `HeroTerrain` (`3d/hero/HeroTerrain.tsx`)

- **PlaneGeometry** (42×54), rotated XZ, **vertex displacement**: slow “continental” waves + horizon-weighted envelope + scroll heave (smoothed)  
- **Material:** dark metal-forward standard material, tiered flat vs smooth normals

### `HeroParticles` (`3d/hero/HeroParticles.tsx`)

- **Seeded** distribution; **stratified depth** (more in far field); **additive**, low opacity; **static drift** on low tier

### `HeroLighting` (`3d/hero/HeroLighting.tsx`)

- Ambient + hemisphere + **warm key** + **cool fill** + **low brass rake**; **shadow cast** only when `tier > 0`

### `HeroFog` (`3d/hero/HeroFog.tsx`)

- **`FogExp2`**, cool-dark color; density **modulated** by smoothed scroll + subtle “breathing” (no heavy FX)

### `HeroInfrastructureLines` (`3d/hero/HeroInfrastructureLines.tsx`)

- **Drei `Line`** triple stack: very soft shell + mid + tight core; **muted brass** tones  
- **Smootheed** scroll translation + minimal idle motion on higher tiers

### `HeroCameraRig` (`3d/hero/HeroCameraRig.tsx`)

- **Smoothed** scroll progress (tier-based lerp); **heavy dolly** + look-at; subtle sway on higher tiers

### `HeroEngineeringGrid` (`3d/hero/HeroEngineeringGrid.tsx`)

- **Drei `Grid`**, infinite, fade distance tied to **quality.gridFadeDistance**

### Quality Tiers (`hooks/useHeroSceneQuality.ts`, `3d/hero/hero-scene-types.ts`)

- **Tier 0:** mobile / save-data / basic GPU—minimal particles (static), no shadow maps, lower DPR, simpler grid/fog  
- **Tier 1:** tablet / WebGL basic—more geometry, animated particles optional, conditional normal refinement  
- **Tier 2:** desktop WebGL2—full detail, refined normals, highest counts (still capped vs “unlimited”)

### Scroll Systems

- **`useHeroScrollProgress`:** `ScrollTrigger.create` on hero element, `scrub: 0.95`, updates **`progressRef`**  
- **Lenis bridge** keeps **ScrollTrigger** in sync

### Typography / CTA Systems

- **CSS utility classes** + **Clash/Inter**; hero **clamp** scale  
- **CTAs:** hash links to **`#applications`**, **`#manufacturing`** (sections exist in `SectionsPlaceholder`)

---

## 6. Current Visual Style (Snapshot)

| Element | Current Feel |
|---------|----------------|
| **Terrain** | Dark machined mass; **low-frequency** relief; **horizon-weighted** undulation (not “game bumpiness”) |
| **Lighting** | **Warm/cool separation**; strong key; **matte luxury** |
| **Atmosphere** | **Exponential fog** + **distant slabs** + warehouse IBL (subdued) |
| **Particles** | **Dust / haze** in depth layers; low count on mobile |
| **Infrastructure lines** | **Corridor-like** polylines; **restrained glow** (wide faint + core) |
| **Typography** | Tall display headline; confident spacing; **engineering caption** language |
| **Ultrawide** | Wider rails, side vignettes, nav + hero max-width caps |
| **Mobile fallback** | CSS grid + gradients + vignette; typography stays premium |

---

## 7. Performance Strategy

- **Adaptive DPR** via `getAdaptiveDpr` + **`AdaptiveDpr`** + **`PerformanceMonitor`** drop to DPR 1 on pressure  
- **Tiered** geometry, particles, lines, fog density, shadows  
- **Reduced motion:** no Lenis; **no hero WebGL** (CSS hero); Framer respects **`MotionConfig`**  
- **No heavy postprocessing** (no bloom pipeline, no full-screen blur stacks)  
- **Instanced/simple materials** over exotic shaders in hero baseline

---

## 8. Design Rules (Hard Constraints)

1. **No cyberpunk / neon arcade / gaming HUD** aesthetics  
2. **No** aggressive bloom, chromatic gimmicks, or particle fireworks  
3. **No** generic **glassmorphism** or startup-gradient hero clichés  
4. **Luxury = restraint:** fewer, sharper decisions  
5. **Engineering truth:** visuals should feel **plausible** next to infrastructure photography (when added later)  
6. Motion: **heavy ease**, **scrubbed** environmental links—avoid bouncy playful defaults  

---

## 9. Current Project Status

### Completed (Production-Oriented)

- Next 15 App Router shell, TS, Tailwind v4 theme tokens, fonts,**Lenis + GSAP ScrollTrigger bridge**  
- **GPU tiering** + hero **WebGL scene** (terrain, grid, fog, lines, particles, camera rig, lighting, environment)  
- **Hero content** + **CTAs** + **scroll-linked 3D**  
- **Cinematic navigation:** floating **`CinematicNav`**, **`NavigationProvider`**, **fullscreen `FullscreenNavOverlay`**, desktop **Index** control, mobile **MenuToggle**, **`NavLogo`**, **`NavDesktopLinks`** (7 links), **scroll-compressed** nav shell  
- **SectionsPlaceholder** with ids: `about`, `applications`, `products`, `manufacturing`, `case-studies`, `contact`  
- **Build passes** (`npm run build`)

### Production-Ready vs Content-Ready

- **Engineering / UX scaffolding:** strong  
- **Copy, photography, CMS, forms, SEO depth, analytics:** placeholders—**not** final editorial  
- **Routes:** single homepage route with hash sections; **no** dedicated `/about` pages yet (links use `/#…`)

### Refinement Candidates

- Active states for **hash routes** (currently neutral on `/` for `#` links)  
- **Focus trap** / roving tabindex inside fullscreen menu (basic focus + Escape today)  
- **Footer** and **inner pages** to match nav structure  
- Optional removal of **WebGLDevBadge** if unused  
- **Self-hosted** Clash Display vs Fontshare CDN for strict CSP deployments  

---

## 10. Next Development Phase

> **Note:** The **cinematic navigation system is already implemented**. Treat the following as the **next** phase—not a duplicate of current work.

### Recommended Next Phase Goals

1. **`SiteLayout` abstraction:** move **`CinematicNav`** (+ future footer) into `app/layout.tsx` or a `(marketing)/layout.tsx` so **all routes** share the same navigation chrome  
2. **Real pages:** `about`, `products`, `case-studies`, `contact` as App Router segments (with **canonical URLs**) while preserving **hash fallbacks** or redirects  
3. **Footer:** premium industrial parity with nav (columns, legal, certifications placeholders)  
4. **Section content:** replace placeholders with real narratives, spec tables, imagery  
5. **Micro-refinement:** nav **active hash** detection (client `hashchange`), optional **`prefetch`** strategy  
6. **Performance pass:** route-level **dynamic import** for below-fold WebGL (if added on other pages)  
7. **Accessibility audit:** menu roving focus, `aria-current`, skip links  

---

## 11. Important Development Philosophy

- **Restraint first:** every effect must earn its place  
- **Cinematic confidence:** long durations, scrubbed motion, **weight**  
- **Environmental storytelling:** fog, horizon, grid, depth—not text walls alone  
- **Perceived scale:** wide composition, deep field, **mass** in terrain and type  
- **Performance as luxury:** steady FPS and **no jank** read as quality  
- **Architectural composition:** align to grid, hairlines, disciplined spacing  
- **Premium motion:** ease curves like `[0.22, 1, 0.36, 1]`, stagger discipline, no wobble  

---

## 12. Quick Reference — Key Files

| Concern | File(s) |
|---------|---------|
| Root layout + fonts | `src/app/layout.tsx` |
| Global CSS + Tailwind theme | `src/app/globals.css`, `src/styles/theme.css` |
| Providers | `src/components/providers/AppProviders.tsx` |
| Nav | `src/components/navigation/CinematicNav.tsx`, `NavigationContext.tsx`, `FullscreenNavOverlay.tsx` |
| Hero shell | `src/sections/hero/HeroSection.tsx`, `HeroContent.tsx` |
| Hero 3D | `src/3d/hero/*` |
| Scroll depth | `src/sections/hero/motion/useHeroScrollProgress.ts` |
| Quality | `src/hooks/useHeroSceneQuality.ts`, `src/3d/hero/hero-scene-types.ts` |
| Home composition | `src/sections/home/HomePage.tsx` |
| Site copy config | `src/lib/config/site.ts` |

---

*End of master context — keep this document updated as the architecture evolves.*
