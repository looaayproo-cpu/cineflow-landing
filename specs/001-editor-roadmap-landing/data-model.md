# Data Models: High-Conversion Video Editor Roadmap Landing Page

**Feature**: [specs/001-editor-roadmap-landing/spec.md](file:///d:/LoayProject/specs/001-editor-roadmap-landing/spec.md) | **Date**: 2026-10-18

This document defines the TypeScript data schemas, entities, validation rules, and state machines governing the Video Editor Roadmap landing page.

---

## 1. Curriculum & Roadmap Entities

### `RoadmapStage`
Represents one of the 4 milestone stages of the curriculum scrubbed in the hero timeline.

```typescript
export interface RoadmapTool {
  name: string;
  badge: string; // e.g., 'Pr', 'Ae', 'AI', 'Notion'
  color: string; // hex or CSS var for accent
}

export interface RoadmapStage {
  id: string; // 'stage-1', 'stage-2', 'stage-3', 'stage-4'
  index: number; // 0, 1, 2, 3
  timecode: string; // '00:00:15:00', '00:00:30:00', etc.
  durationEstimate: Record<'en' | 'ar', string>; // e.g. { en: 'Week 1-2', ar: 'الأسبوع 1-2' }
  title: Record<'en' | 'ar', string>;
  headline: Record<'en' | 'ar', string>;
  description: Record<'en' | 'ar', string>;
  tools: RoadmapTool[];
  milestones: Record<'en' | 'ar', string[]>;
  outcomeMetric: Record<'en' | 'ar', { label: string; value: string }>;
}
```

**State Transitions**:
- `activeStage`: Derived from timeline playhead progress percentage ($P \in [0.0, 1.0]$):
  - $0.00 \le P < 0.25 \implies$ `stage-1` (Premiere Pro Foundations)
  - $0.25 \le P < 0.50 \implies$ `stage-2` (After Effects Motion & VFX)
  - $0.50 \le P < 0.75 \implies$ `stage-3` (AI Workflows & Acceleration)
  - $0.75 \le P \le 1.00 \implies$ `stage-4` (First Client Acquisition)

---

## 2. Bento Grid & Tech Stack Entities

### `BentoCard`
Defines cards inside the "Inside The Roadmap" asymmetric grid.

```typescript
export interface NotionChecklistItem {
  id: string;
  title: Record<'en' | 'ar', string>;
  completed: boolean;
  category: 'workflow' | 'template' | 'client-asset';
}

export interface BentoCard {
  id: 'notion-interactive' | 'stack-pipeline' | 'client-blueprint';
  badge: Record<'en' | 'ar', string>;
  title: Record<'en' | 'ar', string>;
  description: Record<'en' | 'ar', string>;
  gridSpanClass: string; // e.g., 'col-span-12 lg:col-span-7'
  checklistItems?: NotionChecklistItem[];
  pipelineNodes?: Array<{
    id: string;
    label: string;
    icon: string;
    description: Record<'en' | 'ar', string>;
  }>;
}
```

---

## 3. Social Proof Entities

### `TestimonialClip`
Structured representation of editors featured on "The Editors' Wall".

```typescript
export interface TestimonialClip {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string; // SVG initials or profile path
  verifiedResult: Record<'en' | 'ar', string>; // e.g., '$2,800 Client Retainer' / 'أول عميل بقيمة 2800$'
  quote: Record<'en' | 'ar', string>;
  waveformBars: number[]; // 16 normalized values [0.2, 0.8, 0.5, ...] for visual audio waveform
  rowNumber: 1 | 2; // Upper vs lower marquee track
}
```

---

## 4. Value Stack & Pricing Entities

### `ValueStackItem`
Individual deliverables included in the Notion Roadmap package.

```typescript
export interface ValueStackItem {
  id: string;
  title: Record<'en' | 'ar', string>;
  description: Record<'en' | 'ar', string>;
  estimatedValueUsd: number; // For value anchoring (e.g. $197)
  isBonus: boolean;
  category: 'curriculum' | 'templates' | 'scripts' | 'presets';
}

export interface PricingPlan {
  id: string;
  tierName: Record<'en' | 'ar', string>;
  regularPrice: number; // e.g. 197
  launchPrice: number; // e.g. 47
  currencySymbol: string; // '$'
  billingInterval: 'lifetime';
  items: ValueStackItem[];
  guaranteeText: Record<'en' | 'ar', string>;
}
```

---

## 5. FAQ Entities

### `FAQItem`
```typescript
export interface FAQItem {
  id: string;
  question: Record<'en' | 'ar', string>;
  answer: Record<'en' | 'ar', string>;
  category: 'roadmap' | 'software' | 'client' | 'refund';
}
```

---

## 6. Checkout Intent & Form Lead Entity

### `CheckoutLeadSubmission`
The payload collected when a visitor clicks "Get Instant Access" and fills the conversion modal.

```typescript
export type ExperienceLevel = 'beginner' | 'intermediate' | 'scaling_freelancer';

export interface CheckoutLeadSubmission {
  id: string; // Generated client-side UUID
  fullName: string;
  email: string;
  experienceLevel: ExperienceLevel;
  selectedTier: string;
  submittedLanguage: 'en' | 'ar';
  submittedTheme: 'dark' | 'light';
  timestamp: number; // Unix epoch ms
  status: 'idle' | 'submitting' | 'confirmed' | 'error';
}
```

### Validation Rules
- `fullName`: Required, trimmed length $\ge 2$ characters, no script injection tags.
- `email`: Required, valid RFC 5322 email regex format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- `experienceLevel`: Required, must be one of `'beginner'`, `'intermediate'`, `'scaling_freelancer'`.

### State Machine for Modal Submission
```text
[IDLE / MODAL OPEN]
       │
       ▼ (User clicks "Complete Order" / "إتمام الطلب")
[VALIDATING]
       ├─► Invalid ──► [SHOW INLINE ERRORS]
       │
       ▼ Valid
[SUBMITTING / PROCESSING (Simulated Spinner 1000ms)]
       │
       ├─► Success ──► [CONFIRMED STATE + TELEMETRY DISPATCH]
       │
       └─► Error   ──► [SHOW RECOVERY ERROR TOAST]
```

---

## 7. Analytics & Telemetry Contract Entities

```typescript
export type AnalyticsEventType =
  | 'page_viewed'
  | 'language_toggled'
  | 'theme_toggled'
  | 'hero_cta_clicked'
  | 'timeline_scrubbed'
  | 'bento_checklist_toggled'
  | 'pricing_cta_clicked'
  | 'faq_item_expanded'
  | 'checkout_modal_opened'
  | 'checkout_modal_closed'
  | 'checkout_lead_submitted';

export interface AnalyticsEvent<T = Record<string, unknown>> {
  event: AnalyticsEventType;
  timestamp: number;
  properties?: T;
}
```
