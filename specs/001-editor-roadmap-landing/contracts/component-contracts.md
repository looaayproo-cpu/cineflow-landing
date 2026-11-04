# UI Component Contracts: High-Conversion Video Editor Roadmap Landing Page

**Feature**: [specs/001-editor-roadmap-landing/spec.md](file:///d:/LoayProject/specs/001-editor-roadmap-landing/spec.md) | **Date**: 2026-10-18

This document outlines the props, behavioral expectations, and ARIA roles for the primary frontend components.

---

## 1. `Navbar` (`src/components/navbar.tsx`)
Floating glassmorphic pill sticky navbar.

### Props
```typescript
export interface NavbarProps {
  onOpenCheckout: (triggerSource: string) => void;
}
```
### Behavior & ARIA
- Sticky centered pill (`top-4 z-50 fixed mx-auto`).
- Glassmorphic backdrop (`backdrop-blur-md bg-surface/75 border border-border-subtle shadow-lg`).
- Contains: Brand mark, Nav Links (`#curriculum`, `#stack`, `#proof`, `#pricing`, `#faq`), `LanguageToggle`, `ThemeToggle`, and primary CTA button.
- ARIA: `<nav role="navigation" aria-label="Main Navigation">`.

---

## 2. `HeroSection` (`src/components/hero-section.tsx`)
Ambient spotlight, 3D floating tool badges, high-impact headline, magnetic CTA button.

### Props
```typescript
export interface HeroSectionProps {
  onOpenCheckout: (triggerSource: string) => void;
}
```
### Behavior & Motion
- Tracks mouse coordinates with spring interpolation to render a radial spotlight overlay (`var(--spotlight)`).
- 3D parallax badges for Premiere Pro, After Effects, Notion, and AI tools with floating floating keyframes.
- Magnetic primary button: subtle cursor attraction using Framer Motion springs.
- Embeds `<TimelineScrubber />` as its centerpiece interactive showcase.

---

## 3. `TimelineScrubber` (`src/components/timeline-scrubber.tsx`)
Interactive video editing timeline mockup representing the 4 transformation stages.

### Props
```typescript
export interface TimelineScrubberProps {
  initialStageIndex?: number;
}
```
### Behavior & Motion
- Drag or click along ruler to update playhead position `progress` (0.0 to 1.0).
- Maps progress to active `RoadmapStage` (0: Premiere Foundations, 1: Motion & VFX, 2: AI Workflows, 3: First Client).
- Touch drag enabled with `touch-action: pan-y` so horizontal scrubbing does not block vertical viewport scroll.
- Active stage card transitions with smooth opacity and height animation.
- ARIA: `<div role="slider" aria-label="Roadmap Curriculum Timeline" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress * 100} tabindex={0}>`.

---

## 4. `BentoGrid` (`src/components/bento-grid.tsx`)
Asymmetric Bento grid showcasing curriculum depth.

### Props
```typescript
export interface BentoGridProps {
  onOpenCheckout: (triggerSource: string) => void;
}
```
### Key Sub-Cards
1. **Interactive Notion Checklist Card**: Clickable tasks that toggle local completion checkmarks with celebratory sound/glow micro-interaction.
2. **Integrated Tech Stack Card**: Animated SVG connection beam connecting Premiere Pro, After Effects, and AI tool icons with animated gradient pulses.
3. **First Client Blueprint Card**: Visual contract checklist, retainer pricing calculator preview, and outreach response script cards.

---

## 5. `EditorsWall` (`src/components/editors-wall.tsx`)
Dual-row infinite marquee with audio waveform cards.

### Props
```typescript
export interface EditorsWallProps {
  // Uses built-in testimonial dataset
}
```
### Behavior & Motion
- Row 1 translates `0% -> -50%`, Row 2 translates `-50% -> 0%`.
- Hovering over either row sets `animation-play-state: paused` or Framer Motion speed to 0.
- Each card features: editor avatar, verified client earning badge, custom SVG audio waveform graphic, and review quote.

---

## 6. `PricingVault` (`src/components/pricing-vault.tsx`)
Centerpiece pricing card with animated border beam.

### Props
```typescript
export interface PricingVaultProps {
  onOpenCheckout: (tierId: string) => void;
}
```
### Behavior & Visual Craft
- Animated border beam: continuous luminous gradient tracing the perimeter of the pricing card.
- Comprehensive value stack checklist with strikethrough regular price ($197) vs launch price ($47).
- 30-day money-back guarantee badge.

---

## 7. `CheckoutModal` (`src/components/checkout-modal.tsx`)
Accessible conversion modal ready for Phase 2 payment connection.

### Props
```typescript
export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerSource?: string;
}
```
### Behavior & Accessibility
- Trap focus within modal while open (`Tab` cycles through form fields).
- Close on `Escape` key and outside click.
- Validates Full Name and Email before submission.
- Simulates processing state with loading indicator, then presents success confirmation.
- Dispatches event to `trackEvent('checkout_lead_submitted', {...})`.
- Single clean hook `handlePhase2PaymentSubmission()` ready for Phase 2 Stripe/LemonSqueezy redirect or Notion auto-invite webhook.
