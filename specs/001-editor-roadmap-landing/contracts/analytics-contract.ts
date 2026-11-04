/**
 * Telemetry & Analytics Contract
 * File: src/lib/analytics.ts (Interface specification)
 * 
 * Strict architectural abstraction for Phase 1 telemetry event dispatch.
 * In Phase 2, connect PostHog, Google Analytics, or backend ingestion endpoints
 * strictly within the implementation of this contract without modifying UI components.
 */

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

export interface EventPropertiesMap {
  page_viewed: { path: string; referrer?: string };
  language_toggled: { from: 'en' | 'ar'; to: 'en' | 'ar' };
  theme_toggled: { from: 'dark' | 'light'; to: 'dark' | 'light' };
  hero_cta_clicked: { ctaLocation: 'hero_primary' };
  timeline_scrubbed: { stageId: string; stageIndex: number; progressPercentage: number };
  bento_checklist_toggled: { itemId: string; completed: boolean };
  pricing_cta_clicked: { tierId: string; launchPrice: number };
  faq_item_expanded: { faqId: string };
  checkout_modal_opened: { triggerSource: string };
  checkout_modal_closed: { timeSpentSeconds: number };
  checkout_lead_submitted: {
    fullName: string;
    email: string;
    experienceLevel: string;
    tierId: string;
    submittedLanguage: 'en' | 'ar';
    submittedTheme: 'dark' | 'light';
  };
}

export interface AnalyticsDispatcher {
  track<E extends AnalyticsEventType>(
    event: E,
    properties: EventPropertiesMap[E]
  ): void;
}
