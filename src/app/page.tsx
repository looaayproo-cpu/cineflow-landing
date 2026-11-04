'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { CurriculumSection } from '@/components/curriculum-section';
import { BentoGrid } from '@/components/bento-grid';
import { EditorsWall } from '@/components/editors-wall';
import { PricingVault } from '@/components/pricing-vault';
import { Footer } from '@/components/footer';
import { CheckoutModal } from '@/components/checkout-modal';

export default function HomePage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [triggerSource, setTriggerSource] = useState('hero');

  const handleOpenCheckout = (source: string) => {
    setTriggerSource(source);
    setCheckoutOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      {/* Floating Glassmorphic Pill Navbar */}
      <Navbar onOpenCheckout={handleOpenCheckout} />

      {/* Full-Screen Cinematic Particle Hero with Side-Aligned Typography */}
      <HeroSection onOpenCheckout={handleOpenCheckout} />

      {/* Dedicated Interactive Curriculum Timeline Section */}
      <CurriculumSection />

      {/* Inside The Roadmap Bento Grid Section (Curriculum & Toolchain Showcase) */}
      <BentoGrid />

      {/* The Editors' Wall Testimonials Infinite Marquee */}
      <EditorsWall />

      {/* The Pricing Vault (Centerpiece Moving Border Beam Card & Smooth FAQ Accordion) */}
      <PricingVault onOpenCheckout={handleOpenCheckout} />

      {/* Localized Impeccable Footer */}
      <Footer />

      {/* Conversion & Checkout Intent Modal (Phase 2 Ready) */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        triggerSource={triggerSource}
      />
    </main>
  );
}
