# Implementation Research: High-Conversion Video Editor Roadmap Landing Page

**Feature**: [specs/001-editor-roadmap-landing/spec.md](file:///d:/LoayProject/specs/001-editor-roadmap-landing/spec.md) | **Date**: 2026-10-18

This document captures technical evaluations, architecture decisions, and best practices for the Video Editor Roadmap landing page frontend implementation.

---

## 1. Bilingual Architecture & Bidirectional Layout Mirroring (Arabic RTL & English LTR)

### Decision
Implement a client-side `LanguageProvider` with React Context and a typed dictionary system (`src/dictionaries/{en,ar}.ts`). The active language (`'ar'` | `'en'`) dynamically controls the `dir` (`'rtl'` | `'ltr'`) and `lang` attributes on the root document element and loads typography classes accordingly. Layout mirroring is achieved purely through Tailwind CSS logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`, `rtl:`, `ltr:`).

### Rationale
- **Instant Switching Without Page Reload**: Sub-path routing (e.g. `/en` vs `/ar`) or full page reloads disrupt smooth user exploration and break ongoing interactive state (such as the timeline playhead or unsubmitted modal state). React Context enables instant, sub-50ms text and direction swaps.
- **Tailwind CSS Logical Property Support**: Modern Tailwind CSS natively supports CSS Logical Properties. By strictly avoiding directional utilities (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`) in favor of logical ones (`ms-*`, `me-*`, `ps-*`, `pe-*`, `inset-inline-start`, etc.), 100% of layouts mirror automatically without duplicating CSS rules or component trees.
- **Typography Pairing**:
  - English: **Plus Jakarta Sans** (Google Fonts) – clean, high-precision geometric sans-serif that embodies modern SaaS craftsmanship.
  - Arabic: **Cairo** (Google Fonts) – contemporary Arabic geometric typeface with exceptional legibility, balanced counters, and clean matching weights to Plus Jakarta Sans.

### Alternatives Considered
- *Sub-path Routing (`/[lang]/page.tsx`)*: Standard for large content-heavy websites or SEO multi-domain portals. Rejected for this Phase 1 landing page because it forces server reloads/navigation transitions, wiping interactive scrubber state and theme fluidity.
- *Third-party i18n libraries (`next-intl`, `react-i18next`)*: Powerful but introduce significant bundle overhead, complex JSON loading mechanisms, and configuration boilerplate. A lightweight, type-safe TypeScript dictionary pattern provides compile-time key checking with zero extra bundle weight.

---

## 2. Dual Theming System: "Editing Suite Obsidian" vs "Studio Daylight"

### Decision
Use `next-themes` with `attribute="class"`, `defaultTheme="dark"`, and `enableSystem={true}` combined with semantic CSS variables defined in `src/app/globals.css`.

### Color Token Palette

| Token Name | Dark Mode ("Editing Suite Obsidian") | Light Mode ("Studio Daylight / Warm Alabaster") | Purpose |
|:---|:---|:---|:---|
| `--background` | `hsl(240 10% 3.9%)` (`#09090B`) | `hsl(210 40% 98%)` (`#F8FAFC`) | Main page canvas |
| `--surface-card` | `hsl(240 6% 8%)` (`#121215`) | `hsl(0 0% 100%)` (`#FFFFFF`) | Bento cards, timeline panel, modals |
| `--surface-card-hover` | `hsl(240 5% 12%)` (`#1C1C21`) | `hsl(210 20% 96%)` (`#F1F5F9`) | Interactive card hover states |
| `--border-subtle` | `hsl(240 4% 16%)` (`#26262B`) | `hsl(214 32% 91%)` (`#E2E8F0`) | Card outlines, dividers |
| `--border-glow` | `hsl(248 100% 70% / 0.3)` | `hsl(248 90% 55% / 0.2)` | Moving border beam, active focus ring |
| `--text-primary` | `hsl(0 0% 98%)` (`#FAFAFA`) | `hsl(222 47% 11%)` (`#0F172A`) | Primary headlines & values |
| `--text-secondary` | `hsl(240 5% 65%)` (`#A1A1AA`) | `hsl(215 16% 47%)` (`#64748B`) | Subheadings, descriptions |
| `--accent-pr` | `#9999FF` / `#5D5FEF` | `#4B4EFC` | Premiere Pro signature purple |
| `--accent-ae` | `#8B5CF6` / `#7000FF` | `#6366F1` | After Effects signature violet |
| `--accent-ai` | `#06B6D4` / `#10B981` | `#0EA5E9` | AI & Automation emerald/cyan |
| `--spotlight` | `rgba(139, 92, 246, 0.12)` | `rgba(99, 102, 241, 0.08)` | Ambient cursor tracking gradient |

### Rationale
- `next-themes` eliminates the common flash of unstyled content (FOUC) and hydration warning errors in Next.js App Router by executing an ultra-fast inline script before React hydration.
- The "Editing Suite Obsidian" dark mode creates an authentic, focused atmosphere reminiscent of professional video editing NLEs (Non-Linear Editors like Premiere & After Effects).
- The "Studio Daylight" mode maintains professional editorial standards with subtle warm slate undertones and soft diffused shadows rather than sterile stark white.

### Alternatives Considered
- *Custom React state for theme*: Prone to hydration mismatches (`server: dark`, `client: light`), leading to visible flickering on initial page load.
- *Pure CSS `prefers-color-scheme`*: Removes user agency; visitors cannot override their OS setting to preview the landing page in their preferred creative lighting.

---

## 3. Interactive Hero Timeline Scrubber & Mouse Spotlight

### Decision
- **Timeline Scrubber**: Build a pure React + Framer Motion interactive timeline mockup mimicking an NLE timeline ruler and track layer. Dragging or clicking along the timecode track updates a normalized progress percentage (`0.0` to `1.0`), which activates the corresponding roadmap milestone (Stage 1: 0–25%, Stage 2: 25–50%, Stage 3: 50–75%, Stage 4: 75–100%). Touch gestures utilize `touch-action: pan-y` to allow horizontal playhead scrubbing without capturing the user's vertical page scrolling.
- **Ambient Spotlight**: A subtle radial gradient attached to mouse coordinates using a smoothed Framer Motion spring (`useMotionValue` + `useSpring`) to track cursor movement across the hero section without degrading frame rates.

### Rationale
- Standard landing pages use passive static graphics. Giving video editors a tactile, scrubbing timeline immediately hooks their interest with familiar software paradigms (playhead, cuts, keyframes, timecodes).
- Framer Motion provides high-performance GPU-accelerated motion transforms (`transform: translate3d`) that run at 60fps on both desktop and mobile devices.

### Alternatives Considered
- *Embedded HTML5 video or Canvas element*: Heavy video assets increase initial page payload by megabytes, suffer buffering latency, and cannot be cleanly localized into Arabic and English. A DOM-based motion mockup is lightweight (<15KB code), instantly localized, and crisp at all retina resolutions.

---

## 4. Bento Grid & The Editors' Wall Marquee

### Decision
- **Asymmetric Bento Grid**: CSS Grid with responsive column spans (`col-span-12 md:col-span-7`, `col-span-12 md:col-span-5`).
  - Card 1: Interactive Notion UI checklist preview with toggleable checkboxes.
  - Card 2: Connected editing tech stack featuring an SVG path with an animated linear gradient stroke (`stroke-dasharray`, `stroke-dashoffset`) simulating signal flow between Premiere, After Effects, and AI tools.
  - Card 3: First Client Blueprint visual showing client retainer calculations and outreach templates.
- **The Editors' Wall**: A two-row infinite horizontal marquee where row 1 translates start-to-end and row 2 translates end-to-start. Framer Motion handles continuous translation with `repeat: Infinity, ease: "linear"`. Hovering anywhere on either row temporarily sets animation playback speed to `0` or uses CSS `animation-play-state: paused`, allowing users to comfortably read quotes and inspect verified results.

### Rationale
- Bento grids are the gold standard of modern SaaS UI for modular visual hierarchy.
- Marquees communicate high social proof density without cluttering the screen. Audio waveform cards immediately resonate with audio/video creators.

### Alternatives Considered
- *Standard static 3-column review cards*: Takes up excessive vertical space and feels pedestrian compared to an infinite social proof stream.

---

## 5. Phase 2 Future-Proofing: Decoupled Telemetry & Checkout Flow

### Decision
- **Telemetry (`src/lib/analytics.ts`)**: Export a singleton/functional API `trackEvent(name: AnalyticsEventName, properties?: Record<string, unknown>)`. In Phase 1, `trackEvent` prints structured JSON logs to the console and records events in a temporary session memory store. When Phase 2 begins, the developer connects PostHog, Google Analytics, or a backend ingestion API by modifying *only* the interior of `src/lib/analytics.ts`.
- **Checkout Modal (`src/components/checkout-modal.tsx`)**: An accessible dialog (with focus trapping and escape-key handling) triggered by any CTA button on the page. In Phase 1, it captures visitor data (Full Name, Email, Editing Level), simulates processing with an animated loader, displays confirmation feedback, and triggers `trackEvent('checkout_lead_submitted', {...})`. In Phase 2, the `handleSubmit` function simply calls the backend checkout API (Stripe Session or Lemon Squeezy link) without altering modal markup or UI aesthetics.

### Rationale
- Completely fulfills the prompt requirement: "structure the codebase with clean service/analytics abstractions and modular state so Phase 2... can be plugged in later without refactoring the UI."
- Eliminates technical debt and prevents tight coupling between UI components and vendor APIs.
