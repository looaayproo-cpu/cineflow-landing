# Feature Specification: CineFlow — Full-Screen Cinematic Particle Hero & Continuous Orbital Interaction

**Feature Branch**: `002-cinematic-minimalist-hero`  
**Created**: 2026-11-04 (Refined with Continuous Orbiting & RTL Alignment Correction)  
**Status**: In Progress (Refinement Active)  
**Input**: Visual review feedback: (1) Correct Arabic RTL Hero placement to anchor strictly to the Right; (2) Slow down particle movement by 50% for a calm, cinematic celestial feel; (3) Redesign mouse interaction to maintain a continuous, living orbital field as long as the cursor is in the Hero, eliminating the 400ms idle release and keeping particles circulating around a stationary cursor indefinitely.

---

## 1. Feature Objectives & Clarified Interaction Model

Transform the CineFlow landing page Hero into an immersive digital cosmos inspired by the Aetherlabs and Google Antigravity references:
1. **Full-Screen Canvas Hero (`min-h-screen` / `100dvh`)**: The initial screen is dedicated entirely to the union of minimal side-aligned typography and an expansive, dense particle vortex field.
2. **Corrected Bidirectional Layout (RTL & LTR)**:
   - **Arabic (RTL)**: Positioned strictly on the **RIGHT** side of the viewport (`start` side in RTL: `text-start`, `items-start`, `margin-inline-end: auto`, `margin-inline-start: 0`).
   - **English (LTR)**: Positioned strictly on the **LEFT** side of the viewport (`start` side in LTR: `text-start`, `items-start`, `margin-inline-end: auto`, `margin-inline-start: 0`).
   - Content block is narrow (`max-w-xl`), preserving expansive negative space for the particle vortex opposite the text.
3. **Calibrated Serene Particle Speed**:
   - Particle velocities and wave frequencies reduced by ~55% to resemble slow, majestic celestial matter floating in deep space.
   - Smooth 60fps rendering maintained via `requestAnimationFrame` with zero frame dropping.
4. **Continuous Mouse-Centered Orbital Field (No Idle Release)**:
   - As long as the cursor remains inside the Hero boundary, particles within influence radius ($280\text{px}$) remain in an **active orbital state**.
   - **Stationary Cursor Behavior**: When the cursor stops moving, particles **DO NOT** release or freeze. They continue to orbit, drift, and circulate around the stationary cursor indefinitely with independent velocities, varying radii, and non-rigid eccentricities.
   - The previous 300–500ms idle-release behavior is **completely removed**.
   - **Cursor Exit**: Only when the pointer exits the Hero boundary (`pointerleave`) does the orbital influence smoothly decay, allowing particles to disperse along their current orbital tangents back into the background vortex with zero teleportation.
5. **Dedicated Interactive Timeline Section**:
   - Positioned in its own uncrowded, wide centerpiece section immediately below the Hero (`#curriculum`).
   - Preserves 100% of existing Timeline scrubbing, audio synthesis, and stage data.

---

## 2. User Scenarios & Acceptance Criteria

### User Story 1 — True Bidirectional Hero Layout (Priority: P1)

As a visitor viewing CineFlow in either Arabic or English,  
I want the Hero content anchored to my reading start side (Right for Arabic, Left for English),  
So that the typography and visual hierarchy feel culturally authentic and leave the opposite area open for the particle vortex.

**Acceptance Scenarios**:
1. **Given** Arabic (RTL) mode is active, **When** viewed on desktop or tablet, **Then** the text block is anchored on the RIGHT side, and the particle vortex center is situated on the center-left.
2. **Given** English (LTR) mode is active, **When** viewed on desktop or tablet, **Then** the text block is anchored on the LEFT side, and the particle vortex center is situated on the center-right.
3. **Given** the user toggles between English and Arabic, **When** toggled, **Then** the layout updates immediately without page reload, and with zero layout jumping or horizontal overflow.

---

### User Story 2 — Slower, Calmer Particle Movement (Priority: P1)

As a visitor exploring the Hero,  
I want particles to move at a slow, serene, cinematic pace,  
So that the background feels premium, organic, and meditative rather than fast or chaotic.

**Acceptance Scenarios**:
1. **Given** the Hero renders, **When** observing particle motion, **Then** particles drift at ~45% of the previous velocity, resembling objects floating in zero-gravity.
2. **Given** 60fps animation loop, **When** running, **Then** movement is smooth, continuous, and free of stuttering or sudden speed shifts.

---

### User Story 3 — Continuous Orbital Field around Cursor (Priority: P1) 🎯 Critical

As a visitor interacting with the Hero via cursor,  
I want particles to continuously orbit around my cursor even when I stop moving it,  
So that my cursor feels like an interactive gravitational anchor floating in a living field of digital matter.

**Acceptance Scenarios**:
1. **Given** cursor enters the Hero, **When** moving, **Then** nearby particles smoothly deflect into loose elliptical orbits around the cursor with fluid trailing momentum.
2. **Given** the cursor becomes completely stationary inside the Hero for >10 seconds, **When** observed, **Then** particles **continue orbiting and circulating indefinitely** without decaying to autonomous drift or freezing.
3. **Given** cursor moves to a new position, **When** moved, **Then** the orbital swarm follows with natural fluid inertia.
4. **Given** cursor exits the Hero (`pointerleave`), **When** exiting, **Then** orbital influence gradually decays over ~1.2s, letting particles disperse naturally back into the cosmic vortex with zero position resets.

---

## 3. Requirements & Constraints

- **FR-001**: Arabic Hero content MUST be on the RIGHT side; English Hero content MUST be on the LEFT side.
- **FR-002**: Particle movement speed MUST be calibrated to a calm, slow celestial pace (40–60% of baseline).
- **FR-003**: Cursor interaction MUST remain continuously active while the cursor is inside the Hero, regardless of whether it is moving or stationary.
- **FR-004**: The previous 300–500ms idle-decay timeout is strictly REMOVED.
- **FR-005**: Cursor exit (`pointerleave`) MUST trigger smooth, tangential release without teleportation.
- **FR-006**: Touch devices MUST preserve serene autonomous floating without touch interference.
- **FR-007**: Reduced motion settings (`prefers-reduced-motion`) MUST reduce speed and bypass orbital acceleration.
- **FR-008**: Dual themes (Dark Obsidian `#09090B` and Studio Daylight `#F8FAFC`) MUST be supported with high contrast.
