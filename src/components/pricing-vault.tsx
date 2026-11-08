'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { Sparkles, HelpCircle } from 'lucide-react';
import { PricingCard } from '@/components/pricing-card';
import { FAQAccordion } from '@/components/faq-accordion';

interface PricingVaultProps {
  onOpenCheckout: (triggerSource: string) => void;
}

export function PricingVault({ onOpenCheckout }: PricingVaultProps) {
  const { copy } = useLanguage();
  const pricingData = copy.pricing;
  const faqData = copy.faq;

  return (
    <section id="pricing" className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative ambient gradients (Cinema Indigo & Studio Sky) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#6366F1]/5 dark:bg-[#6366F1]/10 blur-[140px] rounded-full -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/3 end-10 w-[500px] h-[350px] bg-[#0EA5E9]/5 dark:bg-[#0EA5E9]/10 blur-[130px] rounded-full -z-10"
      />

      <div className="max-w-6xl mx-auto space-y-24 sm:space-y-28">
        {/* ================================================================= */}
        {/* 1. Pricing Vault Centerpiece Card                                */}
        {/* ================================================================= */}
        <div>
          {/* Centerpiece Pricing Card with Luminous Border Beam */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <PricingCard onOpenCheckout={onOpenCheckout} />
          </motion.div>
        </div>

        {/* ================================================================= */}
        {/* 2. FAQ Sub-Section with Framer Motion Accordion                    */}
        {/* ================================================================= */}
        <div id="faq" className="pt-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/5 shadow-xs mb-4"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#0EA5E9] dark:text-[#38BDF8] stroke-[1.5]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#0284C7] dark:text-[#38BDF8]">
                {faqData.badge}
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
            >
              {faqData.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400 font-normal leading-relaxed"
            >
              {faqData.subtitle}
            </motion.p>
          </div>

          {/* Smooth Accessible Accordion Drawer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FAQAccordion />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
