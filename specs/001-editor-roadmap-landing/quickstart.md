# Quickstart & Verification Guide: Video Editor Roadmap Landing Page

**Feature**: [specs/001-editor-roadmap-landing/spec.md](file:///d:/LoayProject/specs/001-editor-roadmap-landing/spec.md) | **Date**: 2026-10-18

This guide provides setup, run commands, and end-to-end verification procedures for testing the landing page implementation.

---

## 1. Prerequisites

- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `bun`

---

## 2. Setup & Execution

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Production Build Validation
```bash
npm run build
```

---

## 3. End-to-End Visual & Interactive Verification Scenarios

| # | Test Scenario | Steps to Execute | Expected Outcome |
|:---|:---|:---|:---|
| **V-01** | **Bilingual Toggle (AR RTL ↔ EN LTR)** | Click the Language button in the navbar (`العربية` / `English`). | Document `dir` switches between `rtl` and `ltr`, navbar layout mirrors cleanly, typography swaps between Cairo and Plus Jakarta Sans, and all copy translates instantly without page reload. |
| **V-02** | **Studio Theme Switch (Obsidian ↔ Daylight)** | Click the Theme toggle button in the navbar (Sun / Moon icon). | Page background shifts smoothly between `#09090B` (Dark Obsidian) and `#F8FAFC` (Warm Alabaster). All cards, borders, text contrast, and glowing accents adjust without hydration flashing. |
| **V-03** | **Interactive Timeline Scrubber** | In the Hero section, drag the playhead handle or click along the timecode track across stages 1 through 4. | Playhead moves smoothly with sub-16ms latency. The active curriculum stage card highlights dynamically (Pr Foundations → Ae Motion & VFX → AI Acceleration → First Client). |
| **V-04** | **Touch Gestures on Mobile Timeline** | In mobile view or touch emulator, swipe horizontally on the timeline. | Playhead tracks horizontal drag without locking or blocking vertical page scrolling (`touch-action: pan-y`). |
| **V-05** | **Bento Grid Notion Preview** | In the "Inside The Roadmap" section, click tasks inside the Notion card. | Task checkboxes toggle state with micro-animations. Animated SVG beam pulses continuously between Pr, Ae, and AI nodes. |
| **V-06** | **Marquee Pause on Hover** | Hover the cursor over either row of testimonials in "The Editors' Wall". | Marquee translation immediately pauses so quotes and verified client earning badges can be inspected easily. Resume on mouse leave. |
| **V-07** | **Pricing Border Beam & Value Stack** | Scroll to "The Pricing Vault". | A luminous animated beam traces the border of the featured pricing card. Strikethrough value pricing ($197) and launch price ($47) are clearly legible with guaranteed badges. |
| **V-08** | **FAQ Accordion Expansion** | Click any question in the FAQ section. | The accordion smoothly animates open to show the answer, collapsing other open drawers. Keyboard focus rings are prominent. |
| **V-09** | **Checkout Modal Lead Capture** | Click "Get Instant Access" CTA anywhere on the page. Enter Full Name, Email, select experience level, and click Submit. | Focus traps inside modal. Submitting shows a simulated loading state for 1 second, displays instant success confirmation, and outputs structured event log to console (`trackEvent('checkout_lead_submitted', ...)`). |
| **V-10** | **Phase 2 Decoupling Verification** | Inspect `src/lib/analytics.ts` and `src/components/checkout-modal.tsx`. | Verifiable stub interfaces exist with isolated hooks for attaching Phase 2 payment webhooks and telemetry without modifying core UI code. |
