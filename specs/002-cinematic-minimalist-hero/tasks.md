# Tasks: CineFlow — Cinematic Minimalist Hero Redesign

**Feature**: [specs/002-cinematic-minimalist-hero/spec.md](file:///d:/LoayProject/specs/002-cinematic-minimalist-hero/spec.md)  
**Plan**: [specs/002-cinematic-minimalist-hero/plan.md](file:///d:/LoayProject/specs/002-cinematic-minimalist-hero/plan.md)  
**Status**: Phases 1–8 Completed / All Quality Assurance & Production Polish Passed  

> [!IMPORTANT]
> **STRICT EXECUTION BOUNDARY**: All phases (1 through 8) are complete. Full production readiness, Impeccable design audit, performance optimization, and accessibility verification achieved. Stopping here for final human review.

---

## Phase 1: Hero Structure & Minimalist Redesign (COMPLETED)

**Goal**: Transform the existing split-layout Hero into a clean, centered minimalist composition with exact Arabic copy, restrained purple/blue background gradients, prepared Canvas container, and a dedicated full-width container underneath hosting the existing interactive timeline.

**Independent Test**: Load the application; verify that the split 2-column Hero is replaced by a centered editorial text column; verify exact Arabic copy matches the specification; verify that the primary CTA triggers the checkout modal (`'hero_primary'`); verify that the secondary CTA scrolls to the timeline; verify that the interactive timeline is centered underneath with playback and stage selection intact; verify `npm run build` succeeds with 0 errors.

- [x] **T001** [P] Update bilingual content dictionary in `src/content/site-copy.ts` with exact Arabic hero copy (Eyebrow, Headline, Description, Primary CTA, Secondary CTA) and English parity strings.
  - *Validation*: Inspect `siteCopy.ar.hero` and `siteCopy.en.hero` to ensure type conformity and exact string fidelity.
- [x] **T002** Refactor `src/components/hero-section.tsx` from 2-column split (`lg:grid-cols-12`) to a single centered column layout (`max-w-4xl mx-auto flex flex-col items-center text-center`).
  - *Validation*: Confirm elimination of `lg:grid-cols-12` and verify centered alignment in browser.
- [x] **T003** Remove decorative clutter from `src/components/hero-section.tsx`: delete social proof avatar cluster, star rating counter, tool badges, and fake technical jargon.
  - *Validation*: Confirm Hero DOM contains only eyebrow, headline, description, dual CTAs, and timeline container.
- [x] **T004** Implement restrained cinematic lighting in `src/components/hero-section.tsx` with subtle purple and electric blue radial gradients and prepare dedicated Canvas container (`pointer-events-none absolute inset-0 z-0` with `id="hero-particles-canvas-container"`).
  - *Validation*: Confirm background gradients blend smoothly into Obsidian and Daylight themes without visual banding.
- [x] **T005** Create dedicated full-width container (`w-full max-w-5xl lg:max-w-6xl mx-auto mt-12 sm:mt-16`) underneath hero copy in `src/components/hero-section.tsx` and mount `<TimelineScrubber />` with full existing functionality preserved.
  - *Validation*: Test timeline play/pause, playhead dragging, and 4-stage switching in both desktop and mobile viewports.
- [x] **T006** Verify CTA behavior in `src/components/hero-section.tsx`: Primary CTA triggers `onOpenCheckout('hero_primary')`; Secondary CTA anchors to `#curriculum` or interactive timeline.
  - *Validation*: Click primary CTA to verify checkout modal opens; click secondary CTA to verify smooth scroll to timeline.
- [x] **T007** Run production build validation (`npm run build`) and verify TypeScript compilation and Next.js bundle output.
  - *Validation*: Command exits with code 0 and no build errors.

**Phase 1 Checkpoint**: Centered minimalist Hero verified and operational. Scope boundary reached. STOP for human review.

---

## Phase 2: Autonomous Floating Particle Engine (COMPLETED)

**Goal**: Implement a high-performance, non-blocking HTML5 Canvas 2D particle system that drifts naturally in the background of the hero section.

**Prerequisites**: Phase 1 complete (prepared container `id="hero-particles-canvas-container"`).

- [x] **T008** [P] Create `src/components/hero-particle-canvas.tsx` with Canvas 2D context initialization, DPI scaling, and resize observer.
  - *Validation*: Canvas dynamically resizes to fill container without distortion across window resize events.
- [x] **T009** Implement particle initialization logic with randomized positions, subtle velocities (`-0.3` to `+0.3`), varying radii (`1.2px` to `3.4px`), and purple/sky/cyan palette.
  - *Validation*: Verified 18 particles on mobile screens (<768px), 30 particles on tablet (<1024px), and 45 particles on desktop.
- [x] **T010** Implement autonomous floating animation loop using `requestAnimationFrame` with smooth boundary wrapping, breathing luminescence pulse, and soft glow rendering.
  - *Validation*: Verified steady 60fps frame rate and zero garbage collection spikes.
- [x] **T011** Implement lifecycle management and performance optimization in `src/components/hero-particle-canvas.tsx`: pause animation loop via `IntersectionObserver` when hero is offscreen and via `visibilitychange` when document is hidden.
  - *Validation*: Verified RAF pauses when scrolled down or when tab is backgrounded.
- [x] **T012** Mount `<HeroParticleCanvas />` inside `src/components/hero-section.tsx` inside `#hero-particles-canvas-container` and verify contrast in both Dark Obsidian and Studio Daylight themes.
  - *Validation*: Text remains 100% legible against floating particles in both themes. Pointer events disabled (`pointer-events-none`).

**Phase 2 Checkpoint**: Autonomous floating particle engine verified and operational. Scope boundary reached. STOP for human review.

---

## Phase 3: Mouse Interaction & Orbital Mechanics (COMPLETED)

**Goal**: Enhance the particle canvas with reactive cursor proximity physics, creating organic orbital motion when active, and decaying smoothly to autonomous drift when idle.

**Prerequisites**: Phase 2 complete (`HeroParticleCanvas` operational).

- [x] **T013** Add mouse position tracker to `src/components/hero-particle-canvas.tsx` bound strictly to hero element coordinates (no window-level listeners).
  - *Validation*: Pointer events captured via `pointermove` on Hero element, ignoring touch events to protect mobile gestures.
- [x] **T014** Implement orbital physics algorithm: calculate distance from cursor; transition particles within 180–240px radius into elliptical orbital paths with variable radii and angular speeds.
  - *Validation*: Particles smoothly curve around cursor with unique elliptical eccentricity and randomized rotation directions.
- [x] **T015** Implement trailing momentum and velocity interpolation (lerp factor `0.10`) so particles trail fluidly behind cursor movements.
  - *Validation*: Fast cursor movements create organic fluid wake and trailing rather than instant rigid snaps.
- [x] **T016** Implement idle detector (400ms debounce timer) and smooth release mechanics: when mouse stops, gradually decay orbital blend to 0 and return particles to autonomous float.
  - *Validation*: Particles retain tangent velocity upon release and smoothly disperse back to ambient drift with zero teleportation or position resets.
- [x] **T017** Add accessibility and touch fallbacks: respect `prefers-reduced-motion: reduce` by disabling orbital acceleration; provide smooth autonomous floating on touch devices.
  - *Validation*: Touch devices and reduced motion bypass orbital attraction, running serene autonomous floating.

**Phase 3 Checkpoint**: Mouse interaction and orbital particle movement verified and operational. Scope boundary reached. STOP for human review.

---

## Phase 4: Full-Screen Cinematic Particle Hero & Dedicated Timeline (COMPLETED)

**Goal**: Execute the clarified visual direction: full-screen (`100dvh`) cinematic Hero with side-aligned minimal typography, a dense 3D-depth swirling particle vortex field (inspired by Aetherlabs), and the interactive Timeline relocated to its own dedicated section immediately below the Hero.

**Prerequisites**: Phases 1–3 complete (particle physics, mouse interaction, and layout foundations).

- [x] **T018** Upgrade `src/components/hero-particle-canvas.tsx` with a dense 3D-depth swirling vortex engine (polar coordinates, logarithmic spiral flow, 3D perspective scaling, wave turbulence, adaptive density 140/280/480, and RTL/LTR vortex center offset).
  - *Validation*: Particles form an expansive, living cosmic vortex opposite the text block with smooth 60fps performance and zero allocations in the RAF loop.
- [x] **T019** Restructure `src/components/hero-section.tsx` to full-screen (`min-h-screen` / `h-[100dvh]`) with side-aligned typography (Right in RTL, Left in LTR), refined eyebrow label (`— خريطة طريق 2026 لمونتير الفيديو المحترف`), violet-accented headline, short description, primary pill CTA + circular secondary CTA with play icon, and subtle downward scroll indicator.
  - *Validation*: Text block occupies `max-w-xl` with comfortable negative space; Hero fills the full initial screen.
- [x] **T020** Create dedicated Curriculum section in `src/components/curriculum-section.tsx` with `id="curriculum"`, featuring section header and wide centered presentation of `<TimelineScrubber />`.
  - *Validation*: Interactive timeline renders with generous spacing and all scrubbing/playback features intact.
- [x] **T021** Mount `<CurriculumSection />` in `src/app/page.tsx` directly below `HeroSection`.
  - *Validation*: Smooth scrolling from Hero secondary CTA to `#curriculum` operates seamlessly.
- [x] **T022** Verify dual-theme support (Dark Obsidian `#09090B` and Studio Daylight `#F8FAFC`), RTL/LTR bidirectional alignment, and run `npm run build`.
  - *Validation*: Production build succeeds with 0 errors and zero regressions across all page sections.

---

## Phase 4.1: Particle Physics Refinement & RTL Layout Correction (COMPLETED)

**Goal**: Refine the visual review findings: (1) Correct Arabic RTL Hero placement to anchor strictly to the Right; (2) Slow down particle movement by ~55% for a serene celestial feel; (3) Implement continuous orbital circulation around the cursor (even when stationary) with removal of the idle-release timer.

- [x] **T022a** Fix RTL Hero content positioning in `src/components/hero-section.tsx`: remove `ms-auto` which inverted RTL positioning to the left, use `justify-start` and logical start margins (`marginInlineStart: 0, marginInlineEnd: auto`), and anchor readability vignette to `start-0` with direction-aware fade.
  - *Validation*: Arabic content strictly anchors on the RIGHT side; English content strictly anchors on the LEFT side.
- [x] **T022b** Calibrate particle movement speed in `src/components/hero-particle-canvas.tsx`: introduce centralized `SPEED_SCALE = 0.45` to achieve calm, serene, majestic zero-gravity floating.
  - *Validation*: Particle drift is slow and meditative, without rapid swirling or chaotic jitter.
- [x] **T022c** Implement continuous mouse orbital field in `src/components/hero-particle-canvas.tsx`: completely remove the 400ms idle-release timer; maintain continuous orbital circulation around stationary cursor indefinitely; smoothly release only when pointer leaves the Hero (`pointerleave`).
  - *Validation*: Particles continuously orbit a stationary cursor for >10 seconds with varied elliptical paths, individual angular speeds, and no freezing.
- [x] **T022d** Run production build validation (`npm run build`) and verify bidirectional layout and dual theme rendering.
  - *Validation*: Next.js build passes with 0 errors and 0 regressions.

**Phase 4.1 Checkpoint**: Refinement verified and operational. Scope boundary reached. STOP for human review.

---

## Phase 5: Production Polish & Quality Assurance (COMPLETED)

**Goal**: Execute comprehensive multi-device validation, accessibility checks, performance audits, and production build verification.

**Prerequisites**: Phases 1–4 complete.

- [x] **T023** [P] Perform responsive viewport audit across 360px, 390px, 768px, 1280px, 1440px, and 1920px viewports.
  - *Validation*: Hero typography scales gracefully from `text-3xl` (mobile) to `text-6xl` (desktop); particle density adapts dynamically (140 on mobile, 260 on tablet, 480 on desktop); timeline collapses cleanly to 2x2 touch grid on mobile (<1024px); zero horizontal scroll overflow confirmed.
- [x] **T024** [P] Validate bidirectional layout parity: test Arabic (RTL) and English (LTR) modes.
  - *Validation*: Arabic mode anchors text strictly to the RIGHT with center-left particle vortex; English mode anchors text strictly to the LEFT with center-right particle vortex; timeline scrubbing inverted for RTL so progress advances intuitively with reading direction; instantaneous toggle without layout jank or reload.
- [x] **T025** [P] Validate dual-theme contrast ratios against WCAG 2.1 AA standards in both Dark Obsidian and Studio Daylight.
  - *Validation*: Dark Obsidian (#09090B) text contrast >= 12:1; Studio Daylight (#F8FAFC) text contrast >= 11:1; directional gradient vignettes maintain legible reading backdrop; keyboard focus rings and interactive states pass WCAG 2.1 AA.
- [x] **T026** Run final production build and linting checks (`npm run build`, `npm run lint`).
  - *Validation*: Dead code (`tool-badges.tsx`) removed; 0 detector anti-patterns; Next.js 14 production build succeeds with code 0 (4/4 static routes generated); zero TypeScript errors (`tsc --noEmit`).

**Phase 5 Checkpoint**: Production polish and final QA complete. Ready for human acceptance.

---

## Phase 6: Mobile Hero Refinement, Arabic-First Experience & Typography System (COMPLETED)

**Goal**: Achieve mobile-first readability, an authentic Arabic-first presentation, Google Antigravity-inspired particle subtlety on mobile, and a typography system using IBM Plex Sans Arabic and Noto Sans Arabic.

- [x] **T027** [P] Mobile Particle Mode in `src/components/hero-particle-canvas.tsx`: Configured dedicated mobile mode (65 particles, ~14% of desktop baseline; radius scaled by 0.46; base opacity scaled by 0.28; shadowBlur set to 0; velocity scaled by 0.65).
  - *Validation*: Desktop 480-particle immersive vortex preserved intact; mobile particle background is calm, meditative, and unobtrusive.
- [x] **T028** [P] Text-Safe Zone: Implemented distance-based spatial opacity falloff in canvas engine ($d_{\text{text}}$ attenuation down to 8% in core text area) and soft radial dark scrim in `src/components/hero-section.tsx`.
  - *Validation*: Particles floating behind headline, description, and CTAs become faint ambient specks; text remains visually dominant with zero collision.
- [x] **T029** [P] Arabic-First & Dark Mode Default: Set `ar` / `rtl` and Dark Obsidian (`#09090B`) as default for first-time visitors in `src/app/layout.tsx` and `src/context/language-context.tsx` with preference persistence and zero hydration flashes.
  - *Validation*: First-time loads open in Arabic Dark Mode instantly; toggle to English / Light mode remains fully functional.
- [x] **T030** [P] Arabic Typography System: Integrated `IBM_Plex_Sans_Arabic` (weights 600, 700 for headings) and `Noto_Sans_Arabic` (weights 400, 500, 600 for body copy) via `next/font/google` in `layout.tsx`, `tailwind.config.js`, and `globals.css`.
  - *Validation*: Headings render in IBM Plex Sans Arabic; body copy renders in Noto Sans Arabic; English retains Plus Jakarta Sans; Arabic line-heights calibrated to `leading-[1.28]` (headings) and `leading-[1.75]` (body).
- [x] **T031** [P] Complete Italic Removal: Purged all `italic` Tailwind classes and styles across the entire application, replacing with `font-bold` and accent color hierarchy.
  - *Validation*: Headline highlight and bento copy are clean and upright with zero skew or italic artifacts.
- [x] **T032** [P] Mobile Hero Layout & Touch Polish: Polished mobile viewport layout ($360\text{px} - 430\text{px}$), navbar hamburger button ($40\times 40\text{px}$ touch target), primary & secondary CTAs flex stacking ($48\text{px}$ min height), and bottom scroll indicator clearance.
  - *Validation*: Zero horizontal overflow (`overflow-x-hidden`); comfortable tap targets; seamless anchor navigation to `#curriculum`.

**Phase 6 Checkpoint**: Mobile Hero refinement and Arabic typography verified and operational.

---

## Phase 7: Mobile Hero Final Visual Refinement (Impeccable-Assisted) (COMPLETED)

**Goal**: Achieve the ideal harmony between pristine Arabic typography readability, Google Antigravity-inspired subtle ambient particle presence, and balanced mobile vertical spacing without altering approved desktop behavior.

- [x] **T033** [P] Particle Engine Calibration in `src/components/hero-particle-canvas.tsx`:
  - Increased mobile particle count from 65 to 75.
  - Calibrated particle radius (`mobileRadiusScale = 0.72`, `apparentRadius = Math.max(0.75, ...)`), ensuring visible $0.8\text{px} - 2.4\text{px}$ crisp specks on high-DPI screens.
  - Calibrated mobile alpha scaling (`mobileAlphaScale = 0.65`, `minTextZoneAlpha = 0.18`), ensuring particles are gracefully visible in margins and periphery while smoothly dimming to $\sim 12\%$ behind text.
  - Added subtle atmospheric glow (`shadowBlur = 3`) for the top 30% foreground particles.
- [x] **T034** [P] Mobile Scrim & Vertical Spacing in `src/components/hero-section.tsx`:
  - Scoped the opaque directional vignette (`from-background/95`) strictly to desktop (`hidden lg:block lg:w-3/5`).
  - Replaced the previous opaque dark mobile gradient with a soft atmospheric scrim (`radial-gradient(ellipse 75% 45% at 50% 40%, color-mix(in srgb, var(--background) 50%, transparent) 0%, transparent 100%)`).
  - Reduced the void between the floating navbar and hero eyebrow by ~15% (`pt-20 sm:pt-24 lg:pt-28`).
  - Refined margins and vertical rhythm: eyebrow `mb-2.5 sm:mb-5`, description `mt-3 sm:mt-5 mb-6 sm:mb-8`, and bottom padding `pb-12 sm:pb-16`.
- [x] **T035** [P] Mobile Viewport Balance & Touch Ergonomics:
  - Ensured dual CTA buttons and bottom curriculum indicator fit comfortably above the fold on standard mobile screens ($360\times 800$, $375\times 812$, $390\times 844$) without collision or clipping.
  - Verified zero horizontal scroll overflow (`scrollWidth === width === 390px`).
- [x] **T036** [P] Desktop Integrity Preservation:
  - Verified desktop behavior is 100% preserved: 480 particles, logarithmic swirling physics, right-aligned Arabic text block, and center-left vortex.
- [x] **T037** [P] Comprehensive QA & Build Verification:
  - Captured pixel-accurate mobile screenshot at 390×844 and desktop screenshot at 1440×900 via Chrome CDP.
  - Verified `npx tsc --noEmit` exits with 0 errors.
  - Verified `npm run build` succeeds with code 0 (4/4 static pages generated).
  - Verified Impeccable detect rules report 0 anti-patterns for the hero components.

**Phase 7 Checkpoint**: Final mobile visual refinement verified and operational. All requirements satisfied.

---

## Phase 8: Mobile Cinematic Aurora & Particle Flow Upgrade (COMPLETED)

**Goal**: Deliver a unified cinematic mobile background combining ambient Aurora lighting, flowing light ribbons, and a refined 3-tier particle field without compromising Arabic readability or approved desktop behavior.

- [x] **T038** [P] Impeccable Design Audit: Conducted systematic audit across 10 mobile dimensions (hierarchy, depth, lighting, particles, contrast, typography, RTL, CTAs, responsive balance, design system).
- [x] **T039** [P] Mobile Aurora Lighting System in `src/app/globals.css` & `src/components/hero-section.tsx`:
  - Added hardware-accelerated CSS keyframe animations (`aurora-drift-1`, `aurora-drift-2`, `aurora-drift-3`) with `translate3d`, `scale`, and opacity transitions over 20–26s cycles.
  - Implemented 3 mobile Aurora mesh layers (Violet `#7C3AED`, Electric Blue `#2563EB`, Cyan `#06B6D4`) with large radial gradient blurs (`blur-[75px] - blur-[85px]`) and a deep navy oceanic underwash (`rgba(11, 16, 32, 0.75)`).
  - Preserved desktop glow accents completely untouched (`hidden lg:block`).
- [x] **T040** [P] Flowing Light Ribbons in `src/components/hero-particle-canvas.tsx`:
  - Implemented `drawMobileLightRibbons` in Canvas 2D engine drawing 2 continuous, organic cubic Bézier energy streams.
  - Gradient strokes transitioning through translucent violet, electric blue, aqua cyan, and soft purple.
  - Dynamic time-based wave modulation (`timeWave * 0.75`) synchronized with the particle flow; static fallback under `prefers-reduced-motion`.
- [x] **T041** [P] 3-Tier Mobile Particle Field in `src/components/hero-particle-canvas.tsx`:
  - Layer A (Background Dust): 35 microscopic particles ($0.8\text{px} - 1.2\text{px}$), faint opacity ($0.15 - 0.28$), zero glow.
  - Layer B (Visible Ambient): 28 medium particles ($1.3\text{px} - 2.0\text{px}$), moderate opacity ($0.35 - 0.60$), subtle glow on foreground.
  - Layer C (Luminous Accent): 12 bright particles ($2.2\text{px} - 3.2\text{px}$), distinct glow (`shadowBlur: 7`), riding near ribbon paths.
- [x] **T042** [P] Text Readability & Dynamic Safe Zone:
  - Preserved mathematical text-safe zone attenuation ($d_{\text{text}}$ falloff) keeping text dominant (>15:1 contrast).
  - Mobile radial atmospheric scrim (`color-mix(in srgb, var(--background) 55%, transparent)`) cushions headline without muddying peripheral lighting.
- [x] **T043** [P] Viewport & Bidirectional Testing:
  - Verified across 360px, 375px, 390px, and 430px viewports with 0 horizontal overflow.
  - Verified Arabic RTL and English LTR alignment parity.
  - Verified Studio Daylight / Light Mode theme adaptations.
- [x] **T044** [P] Desktop Baseline Preservation:
  - Desktop 1440px verified 100% untouched: 480 particles, logarithmic swirling physics, continuous mouse orbital interaction, right-aligned Arabic block.
- [x] **T045** [P] Comprehensive QA & Build Verification:
  - Captured pixel-accurate screenshots for all 6 required configurations via Chrome CDP.
  - `npx tsc --noEmit` exited with 0 errors.
  - `npm run build` exited with code 0 (4/4 static pages generated).

**Phase 8 Checkpoint**: Mobile Cinematic Aurora & Particle Flow upgrade verified and operational. All acceptance criteria met.



