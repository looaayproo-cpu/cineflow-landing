/**
 * Checkout & Payment Integration Contract
 * File: src/components/checkout-modal.tsx & src/lib/checkout.ts (Interface specification)
 * 
 * Provides strict decoupling between the user-facing modal UI and Phase 2 checkout backends
 * (Stripe Checkout Session, Lemon Squeezy Overlay, Tap Payments, or Webhook auto-fulfillment).
 */

export type ExperienceLevel = 'beginner' | 'intermediate' | 'scaling_freelancer';

export interface CheckoutPayload {
  fullName: string;
  email: string;
  experienceLevel: ExperienceLevel;
  tierId: string;
  language: 'en' | 'ar';
  theme: 'dark' | 'light';
  timestamp: number;
}

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  redirectUrl?: string; // Phase 2: Stripe/LemonSqueezy checkout URL if redirected
  notionAccessGranted?: boolean;
  message?: string;
}

export interface CheckoutService {
  /**
   * Process a checkout submission.
   * In Phase 1: Simulates order creation and returns instant mock success.
   * In Phase 2: Dispatches POST /api/checkout or triggers payment SDK.
   */
  processCheckout(payload: CheckoutPayload): Promise<CheckoutResult>;
}
