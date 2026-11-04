# Implementation Plan: High-Conversion Video Editor Roadmap Landing Page

**Branch**: `001-editor-roadmap-landing` | **Date**: 2026-10-18 | **Spec**: [specs/001-editor-roadmap-landing/spec.md](file:///d:/LoayProject/specs/001-editor-roadmap-landing/spec.md)

**Input**: Feature specification from `specs/001-editor-roadmap-landing/spec.md` with technical stack directives: Next.js (App Router), TypeScript, Tailwind CSS, `next-themes`, Framer Motion, Lucide React, type-safe bilingual dictionary (Arabic RTL & English LTR), CSS variables semantic theming ("Editing Suite Obsidian" & "Studio Daylight"), and decoupled service architecture for Phase 2 analytics and checkout.

## Summary

Build an ultra-modern, high-conversion SaaS-style landing page for a professional video editor selling a comprehensive Notion Roadmap ("From Zero to First Video Editing Client"). The architecture prioritizes client-side fluidity (sub-16ms timeline scrubbing, zero-flash dark/light theming, instant RTL/LTR mirroring) powered by Next.js App Router, Tailwind CSS logical properties, Framer Motion animations, and a type-safe bilingual dictionary system. Telemetry and checkout flows are strictly isolated in `src/lib/analytics.ts` and `src/components/checkout-modal.tsx` so Phase 2 backend, payments, and admin tracking can be integrated with zero UI refactoring.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+ / 20+

**Primary Dependencies**:
- Framework: Next.js 14+ (App Router)
- UI & Styling: React 18/19, Tailwind CSS 3.4+, `tailwind-merge`, `clsx`
- Animations & Interactivity: Framer Motion
- Theming: `next-themes` (attribute-based dark/light mode toggle with `suppressHydrationWarning`)
- Icons: `lucide-react`
- Typography: `next/font/google` (Cairo / IBM Plex Sans Arabic for Arabic; Plus Jakarta Sans / Geist for English)

**Storage**:
- Phase 1: Client-side `localStorage` for theme and language preference persistence, in-memory state for timeline scrubbing and modal interactions.
- Phase 2 Ready: Abstracted API endpoints / webhooks for checkout leads, payment confirmation, and analytics ingestion.

**Testing**:
- Component & Unit Testing: Vitest / React Testing Library
- Quality Gates: ESLint, TypeScript `tsc --noEmit`, Lighthouse / Web Vitals audits

**Target Platform**: Modern Evergreen Web Browsers (Chrome, Firefox, Safari, Edge) across Desktop, Tablet, and Mobile devices (touch-enabled).

**Project Type**: Next.js App Router Web Application (Phase 1 Frontend MVP, Phase 2 Backend & Admin Ready).

**Performance Goals**:
- Scrubber latency: < 16ms drag response (60fps animation)
- Language switch: < 100ms bidirectional layout flip without page refresh
- Theme switch: < 150ms instant transition with zero hydration flash
- Core Web Vitals: LCP < 2.0s, FID/INP < 100ms, CLS < 0.05

**Constraints**:
- Full WCAG 2.1 AA accessibility compliance in both Dark and Light modes.
- Strict bi-directionality: layout mirroring must use CSS logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`) without duplicating component trees.
- Zero broken external image links: all badges, mockups, and waveforms rendered via SVG and vector styles.
- Strict architectural decoupling: `src/lib/analytics.ts` and `src/components/checkout-modal.tsx` act as single points of integration for future Phase 2 backend logic.

**Scale/Scope**: Single high-impact landing page featuring 6 modular visual sections (Navbar, Hero with interactive timeline, Bento grid, Testimonial marquee, Pricing vault, FAQ accordion, Footer) plus conversion modal.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I: Self-Contained & Modular**: The frontend application cleanly isolates reusable UI components, language contexts, animation primitives, and mock telemetry contracts.
- **Principle II: Clean Separation of Concerns**: UI components never bind directly to external analytics SDKs or proprietary payment scripts. All external interactions dispatch through `analytics.ts` and `checkout-modal.tsx`.
- **Principle III: Accessible & Impeccable Design Standard**: Color tokens, typography, focus indicators, and reduced-motion fallbacks adhere strictly to the `impeccable` design standard.

**Status**: PASSED. No gates violated.

## Project Structure

### Documentation (this feature)

```text
specs/001-editor-roadmap-landing/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── analytics-contract.ts
│   ├── checkout-contract.ts
│   ├── dictionary-contract.ts
│   └── component-contracts.md
└── checklists/
    └── requirements.md  # Requirements quality checklist
```

### Source Code Structure (Target Layout)

```text
src/
├── app/
│   ├── layout.tsx             # Root layout with font setup & ThemeProvider
│   ├── page.tsx               # Main landing page assembling all sections
│   └── globals.css            # CSS variables for Obsidian Dark & Studio Light themes
├── components/
│   ├── navbar.tsx             # Floating glassmorphic pill navbar
│   ├── hero-section.tsx       # Spotlight, 3D floating tool badges, magnetic CTA
│   ├── timeline-scrubber.tsx  # Interactive scrubbing video timeline mockup
│   ├── bento-grid.tsx         # Asymmetric Bento grid with Notion preview & SVG beam
│   ├── editors-wall.tsx       # Dual-row infinite marquee with pause on hover
│   ├── pricing-vault.tsx      # Moving border beam card, value stack checklist
│   ├── faq-accordion.tsx      # Expandable FAQ drawer
│   ├── checkout-modal.tsx     # Modular conversion modal (Phase 2 payment ready)
│   └── footer.tsx             # Polished footer with credits and localized links
├── context/
│   └── language-context.tsx   # AR/EN provider with dynamic `dir` and persistence
├── dictionaries/
│   ├── en.ts                  # English copy and curriculum content
│   └── ar.ts                  # Arabic copy with localized professional terminology
├── lib/
│   ├── analytics.ts           # Decoupled telemetry dispatcher (Phase 2 ready)
│   └── utils.ts               # Classnames merge (`cn`) and animation helpers
└── types/
    ├── roadmap.ts             # Stage, curriculum, and tool definitions
    └── dictionary.ts          # Type-safe dictionary schema
```

**Structure Decision**: A single cohesive Next.js project with modular components organized by feature sections. Component state is localized where appropriate (e.g., active timeline scrub index, modal open state) while global state (active language, active theme) is handled via clean React context and `next-themes`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| None | N/A | Architecture utilizes direct React patterns without extraneous state managers (Zustand/Redux not needed for single-page interactive landing). |
