# Implementation Plan: CineFlow — Full-Screen Cinematic Particle Hero & Continuous Orbital Interaction

**Branch**: `002-cinematic-minimalist-hero` | **Date**: 2026-11-04 (Refined Architecture - Phases 1 to 5 Complete)  
**Spec**: [specs/002-cinematic-minimalist-hero/spec.md](file:///d:/LoayProject/specs/002-cinematic-minimalist-hero/spec.md)
**Status**: All Phases (1 through 8) Implemented, Audited & Verified

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

---

## 5. Mobile Hero Final Visual Refinement & Arabic Typography System

1. **Arabic-First Default & Typography System**:
   - `IBM Plex Sans Arabic` (weights 600, 700) for editorial headings.
   - `Noto Sans Arabic` (weights 400, 500, 600) for comfortable body copy.
   - All italic styles completely eliminated across Arabic text.
   - First-time visitors default to Arabic (`ar`/`rtl`) and Dark Obsidian theme (`#09090B`).

2. **Mobile Ambient Particle Experience (Google Antigravity Parity)**:
   - Target count: 75 particles on mobile (<768px).
   - Particle sizing: `mobileRadiusScale = 0.72` with `apparentRadius = Math.max(0.75, ...)` generating crisp 0.8px–2.4px specks.
   - Particle opacity: `mobileAlphaScale = 0.65` with dynamic text-safe zone attenuation ($d_{\text{text}}$ falloff down to $\sim 12\%$ behind text).
   - Foreground glow: Restrained glow (`shadowBlur = 3`) for the top 30% foreground particles (`p.z > 0.4`).

3. **Vertical Spacing & Mobile Scrim Balance**:
   - Opaque directional vignette scoped strictly to desktop (`hidden lg:block lg:w-3/5`).
   - Mobile subtle atmospheric scrim: `radial-gradient(ellipse 75% 45% at 50% 40%, color-mix(in srgb, var(--background) 50%, transparent) 0%, transparent 100%)`.
   - Reduced top void between floating navbar and eyebrow by ~15% (`pt-20 sm:pt-24 lg:pt-28`).
   - Refined vertical rhythm: Eyebrow `mb-2.5 sm:mb-5`, description `mt-3 sm:mt-5 mb-6 sm:mb-8`, bottom padding `pb-12 sm:pb-16`.
   - Bottom curriculum indicator sits comfortably above the fold with zero overlap.
   - Verified 0 horizontal overflow across all mobile widths ($360\text{px} - 430\text{px}$).

---

## 6. Mobile Cinematic Aurora & Particle Flow Architecture

1. **Ambient Aurora Lighting**:
   - 3 mobile atmospheric Aurora meshes (`animate-aurora-1`, `animate-aurora-2`, `animate-aurora-3`) with GPU-composited CSS transforms (`translate3d`, `scale`, `opacity`) over 20–26s cycles.
   - Colors: Upper Violet (`#7C3AED` / `#A855F7`), Opposite Mid Electric Blue (`#2563EB` / `#0EA5E9`), and Lower Cyan (`#06B6D4`).
   - Deep oceanic underwash (`rgba(11, 16, 32, 0.75)`) replacing pitch-black void with celestial depth.
   - Opaque desktop lighting kept 100% separate via responsive utilities (`hidden lg:block` vs `block lg:hidden`).

2. **Flowing Light Ribbons (Canvas 2D)**:
   - Dedicated `drawMobileLightRibbons` function inside existing Canvas 2D engine.
   - Draws 2 continuous, organic cubic Bézier energy streams framing upper and lower mobile viewport regions.
   - Linear gradient strokes with soft shadow blur (`shadowBlur: 12-14px`) synchronized with particle time cycle (`timeWave * 0.75`).
   - Zero extra DOM nodes; static curves when `prefers-reduced-motion` is active.

3. **3-Tier Mobile Particle Field**:
   - **Layer A (Background Dust, 35 particles)**: $0.8\text{px} - 1.2\text{px}$, faint opacity ($0.15 - 0.28$), zero blur, slow drift.
   - **Layer B (Visible Ambient, 28 particles)**: $1.3\text{px} - 2.0\text{px}$, moderate opacity ($0.35 - 0.60$), subtle glow on foreground.
   - **Layer C (Luminous Accent, 12 particles)**: $2.2\text{px} - 3.2\text{px}$, high opacity ($0.65 - 0.90$), distinct glow (`shadowBlur: 7`), riding near ribbon paths.
   - Mathematical text-safe zone attenuation ($d_{\text{text}}$ falloff) guarantees crisp readability (>15:1 contrast).

4. **Desktop Absolute Preservation**:
   - Desktop viewports ($\ge 1024\text{px}$) run the 480-particle logarithmic vortex, side-aligned typography, directional vignette, and continuous mouse orbital field with zero modifications.
