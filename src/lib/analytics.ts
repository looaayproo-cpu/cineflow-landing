/**
 * Telemetry & Analytics Dispatcher Stub
 * File: src/lib/analytics.ts
 *
 * Phase 1: In-memory logging and developer console dispatch.
 * Phase 2: Plug in PostHog, Google Analytics, Meta Pixel, or custom backend API
 * directly inside the `dispatchToBackend` function below with ZERO UI refactoring.
 */

export type AnalyticsEventType =
  | 'page_viewed'
  | 'language_toggled'
  | 'theme_toggled'
  | 'hero_cta_clicked'
  | 'timeline_scrubbed'
  | 'bento_checklist_toggled'
  | 'bento_pillar_selected'
  | 'outreach_script_copied'
  | 'retainer_calculator_adjusted'
  | 'pricing_cta_clicked'
  | 'faq_item_expanded'
  | 'checkout_modal_opened'
  | 'checkout_modal_closed'
  | 'checkout_lead_submitted';

export interface EventPayloads {
  page_viewed: { path: string; referrer?: string };
  language_toggled: { from: 'en' | 'ar'; to: 'en' | 'ar' };
  theme_toggled: { from: 'dark' | 'light'; to: 'dark' | 'light' };
  hero_cta_clicked: { ctaLocation: 'hero_primary' | 'hero_secondary' };
  timeline_scrubbed: { stageId: string; stageIndex: number; progress: number };
  bento_checklist_toggled: { itemId: string; pillarId?: string; completed: boolean };
  bento_pillar_selected: { pillarId: string; pillarNumber: number };
  outreach_script_copied: { language: 'en' | 'ar' };
  retainer_calculator_adjusted: { clientCount: number };
  pricing_cta_clicked: { tierId: string; price: number };
  faq_item_expanded: { faqId: string };
  checkout_modal_opened: { triggerSource: string };
  checkout_modal_closed: { timeSpentSeconds?: number };
  checkout_lead_submitted: {
    fullName: string;
    email: string;
    paymentPhone?: string;
    receiptAttached?: boolean;
    experienceLevel: string;
    tierId: string;
    submittedLanguage: 'en' | 'ar';
    submittedTheme: 'dark' | 'light';
  };
}

// In-memory event log for session inspection / Phase 1 verification
const sessionEvents: Array<{ event: AnalyticsEventType; properties: unknown; timestamp: number }> = [];

export function trackEvent<E extends AnalyticsEventType>(
  event: E,
  properties?: EventPayloads[E]
): void {
  const timestamp = Date.now();
  const record = { event, properties, timestamp };
  sessionEvents.push(record);

  if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
    // Beautiful developer console telemetry log
    console.log(
      `%c[Telemetry] %c${event}`,
      'color: #6366F1; font-weight: bold;',
      'color: #0EA5E9; font-weight: bold;',
      properties || {}
    );
  }

  // Phase 2 Integration Hook:
  // e.g.:
  // if (typeof window !== 'undefined' && window.posthog) {
  //   window.posthog.capture(event, properties);
  // }
}

export function getSessionEvents() {
  return [...sessionEvents];
}
