# Implementation Plan: CineFlow — Full-Screen Cinematic Particle Hero & Continuous Orbital Interaction

**Branch**: `002-cinematic-minimalist-hero` | **Date**: 2026-11-04 (Refined Architecture - Phases 1 to 5 Complete)  
**Spec**: [specs/002-cinematic-minimalist-hero/spec.md](file:///d:/LoayProject/specs/002-cinematic-minimalist-hero/spec.md)
**Status**: All Phases (1 through 5) Implemented, Audited & Verified

---

## 1. Summary

This plan documents the architectural refinement of the CineFlow Hero section across three critical axes:
1. **RTL / LTR True Bidirectional Positioning**:
   - **Root Cause of Previous Left Bug**: `lg:ms-auto` in an RTL context sets `margin-inline-start: auto` (`margin-right: auto`), which actively pushed the Arabic text container to the far LEFT edge.
   - **Resolution**: Use logical start alignment (`justify-start`, `margin-inline-start: 0`, `margin-inline-end: auto`). In RTL, start is Right; in LTR, start is Left. The text block is anchored on the start side in both languages, while the particle vortex occupies the opposite side.
   - Readability vignette gradient anchored to `start-0` with direction-aware fade (`bg-gradient-to-l` for RTL, `bg-gradient-to-r` for LTR).
2. **Serene, Cinematic Particle Speed Scaling**:
   - Centralized speed tuning (`SPEED_SCALE = 0.45`) reducing angular swirl, radial wave breathing, and depth cycling to deep-space zero-gravity pace.
3. **Continuous Mouse-Centered Orbital Field**:
   - **Removal of Idle Release**: Eliminate the previous 300–500ms timeout that cancelled the orbital effect when the mouse stopped.
   - **Stationary Cursor Orbiting**: As long as the cursor is inside the Hero (`pointer.isInHero === true`), particles continue orbiting and circulating around the stationary cursor indefinitely.
   - **Graceful Exit**: Smooth decay to autonomous vortex flow occurs **only** when the cursor exits the Hero (`pointerleave`) or document visibility changes.

---

## 2. Component Hierarchy & Flow

```
src/app/page.tsx
 ├── Navbar (fixed floating pill)
 ├── HeroSection (src/components/hero-section.tsx) — Full-Screen (100dvh)
 │    ├── Readability Vignette Mask (start-0, direction-aware gradient)
 │    ├── HeroParticleCanvas (Canvas 2D: Continuous Orbiting & 3D Swirling Vortex)
 │    └── Side-Aligned Content Block (max-w-xl, RTL Right / LTR Left)
 │         ├── Eyebrow ("— خريطة طريق 2026 لمونتير الفيديو المحترف")
 │         ├── Editorial Headline with Italic Accent
 │         ├── Short Description
 │         ├── Primary Pill CTA + Circular Play Secondary CTA
 │         └── Downward Scroll Indicator (smooth anchor to #curriculum)
 ├── CurriculumSection (src/components/curriculum-section.tsx)
 │    └── TimelineScrubber (Dedicated full-width interactive video editing preview)
 ├── BentoGrid (#stack)
 ├── EditorsWall (#wall)
 ├── PricingVault (#pricing)
 ├── Footer
 └── CheckoutModal
```

---

## 3. Continuous Orbital Particle Physics Engine

### 3.1 Pointer Tracking & Lifecycle
- `heroElement.addEventListener('pointermove', ...)` updates `pointer.x`, `pointer.y`, and sets `pointer.isInHero = true`.
- `heroElement.addEventListener('pointerenter', ...)` sets `pointer.isInHero = true`.
- `heroElement.addEventListener('pointerleave', ...)` sets `pointer.isInHero = false`.
- Pointer tracking is scoped strictly to the Hero element. Touch pointers are ignored to preserve native gestures and mobile performance.

### 3.2 Smoothed Trailing Center
To create fluid, organic momentum:
$$\text{smoothPointer}.x \leftarrow \text{smoothPointer}.x + (\text{pointer}.x - \text{smoothPointer}.x) \cdot 0.08$$
$$\text{smoothPointer}.y \leftarrow \text{smoothPointer}.y + (\text{pointer}.y - \text{smoothPointer}.y) \cdot 0.08$$
When the cursor stops moving, `smoothPointer` gently settles on the stationary cursor coordinates.

### 3.3 Continuous Circulation around Stationary Cursor
In each animation frame:
- **Angle Advancement**:
  $$p.\text{localOrbitAngle} \leftarrow p.\text{localOrbitAngle} + p.\text{localOrbitSpeed} \cdot \text{speedMultiplier}$$
  Because `p.localOrbitAngle` increases on every single frame regardless of cursor motion, particles **never freeze** when the cursor is stationary.
- **Elliptical Orbital Coordinate**:
  $$r_{\text{orbit}} = p.\text{localOrbitRadius} + \sin(2 \cdot p.\text{localOrbitAngle} + \text{timeWave} + p.\text{radialPhase}) \cdot 12$$
  $$x_{\text{mouse}} = \text{smoothPointer}.x + r_{\text{orbit}} \cdot \cos(p.\text{localOrbitAngle}) \cdot p.\text{eccentricityX}$$
  $$y_{\text{mouse}} = \text{smoothPointer}.y + r_{\text{orbit}} \cdot \sin(p.\text{localOrbitAngle}) \cdot p.\text{eccentricityY}$$
- **Proximity Blend Weight**:
  - Distance $d = \sqrt{(p.x - \text{smoothPointer}.x)^2 + (p.y - \text{smoothPointer}.y)^2}$.
  - When `pointer.isInHero && d < 280\text{px}`:
    $$\text{targetBlend} = \min\left(1, \max\left(0, \left(1 - \frac{d}{280}\right)^{0.7}\right)\right)$$
    $$p.\text{orbitBlend} \leftarrow p.\text{orbitBlend} + (\text{targetBlend} - p.\text{orbitBlend}) \cdot 0.04$$
  - When cursor exits (`!pointer.isInHero`):
    $$p.\text{orbitBlend} \leftarrow \max(0, p.\text{orbitBlend} - 0.012)$$
- **Steering & Tangential Momentum**:
  - Blended target: $x_{\text{target}} = x_{\text{vortex}} \cdot (1 - p.\text{orbitBlend}) + x_{\text{mouse}} \cdot p.\text{orbitBlend}$.
  - Velocity smoothly lerped: $p.vx \leftarrow p.vx \cdot 0.95 + (x_{\text{target}} - p.x) \cdot 0.045 \cdot \text{speedMultiplier}$.
  - When cursor leaves, the particle retains its current orbital tangent momentum and smoothly drifts away back to the cosmic vortex. Zero teleportation!

---

## 4. RTL / LTR Layout Correction Details

1. In `src/components/hero-section.tsx`:
   - Content wrapper:
     ```tsx
     <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-start">
       <div
         className="w-full max-w-xl flex flex-col items-start text-start"
         style={{ marginInlineStart: 0, marginInlineEnd: 'auto' }}
       >
     ```
   - In LTR: `start` is Left $\implies$ text is on Left.
   - In RTL: `start` is Right $\implies$ text is on Right.
2. Readability vignette:
   ```tsx
   <div
     className={`pointer-events-none absolute inset-y-0 start-0 ${
       direction === 'rtl' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
     } from-background/95 via-background/75 to-transparent w-full lg:w-3/5 z-0`}
   />
   ```
   - In LTR: `start-0` is Left, gradient fades to the right (`bg-gradient-to-r`).
   - In RTL: `start-0` is Right, gradient fades to the left (`bg-gradient-to-l`).
