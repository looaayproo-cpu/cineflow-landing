'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { Check, ShieldCheck, Sparkles, ArrowRight, ArrowLeft, Gift } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  onOpenCheckout: (triggerSource: string) => void;
}

export function PricingCard({ onOpenCheckout }: PricingCardProps) {
  const { copy, direction, language } = useLanguage();
  const pricingData = copy.pricing;

  const handleCtaClick = () => {
    trackEvent('pricing_cta_clicked', {
      tierId: 'cineflow-complete-os',
      price: language === 'ar' ? 499 : 47,
    });
    onOpenCheckout('pricing_card');
  };

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Outer Glow Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#6366F1]/20 via-[#4F46E5]/15 to-[#0EA5E9]/20 blur-2xl dark:blur-3xl opacity-60 dark:opacity-40 transition-opacity duration-500"
      />

      {/* Luminous Moving Border Beam Wrapper */}
      <div
        className={cn(
          'relative p-[2.5px] rounded-[2rem] overflow-hidden transition-all duration-500',
          'shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/20',
          'bg-gradient-to-b from-slate-200 to-slate-300 dark:from-white/10 dark:to-white/5'
        )}
      >
        {/* Continuous Rotating Neon Beam (Dark: Neon Cinema Indigo & Sky Glow, Light: High-Contrast Indigo-Sky Gradient) */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -inset-[150%] animate-[spin_5s_linear_infinite] motion-reduce:animate-none opacity-100',
            // Light mode: High-contrast rich indigo, royal blue, studio sky
            '[background:conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_260deg,#3730a3_295deg,#4338ca_325deg,#4f46e5_345deg,#0ea5e9_360deg)]',
            // Dark mode: Radiant neon cinema indigo, vibrant violet-indigo, soft studio sky
            'dark:[background:conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_260deg,#312e81_295deg,#4f46e5_330deg,#6366f1_355deg,#38bdf8_360deg)]'
          )}
        />

        {/* Diffuse Neon Glow Underlay for extra luminance in dark mode */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -inset-[150%] animate-[spin_5s_linear_infinite] motion-reduce:animate-none',
            'opacity-60 blur-md dark:opacity-80 dark:blur-lg',
            '[background:conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_260deg,#4f46e5_310deg,#6366f1_345deg,#38bdf8_360deg)]'
          )}
        />

        {/* Inner Card Content */}
        <div className="relative z-10 w-full rounded-[calc(2rem-2.5px)] bg-white dark:bg-[#111116] p-6 sm:p-10 md:p-12 text-start transition-colors duration-300">
          {/* Top Pill: Maximum 1 subtle badge */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-[#4F46E5] dark:text-[#818CF8] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5] dark:bg-[#6366F1]" />
              <span>{pricingData.badge}</span>
            </span>
          </div>

          {/* Tier Name & Subtitle */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-tight">
            {pricingData.tierName}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mb-8 leading-relaxed">
            {pricingData.tierSubtitle}
          </p>

          {/* Pricing Row */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
                  {pricingData.launchPrice}
                </span>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg text-slate-400 dark:text-zinc-500 line-through font-mono font-medium">
                    {pricingData.originalPrice}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    {pricingData.period}
                  </span>
                </div>
              </div>

              {/* Discount Badge */}
              <div className="self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-zinc-300 text-xs font-semibold">
                  {pricingData.discountBadge}
                </span>
              </div>
            </div>

            {/* Total Real Value Anchor Bar */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              <span className="font-medium">{pricingData.totalValueLabel}</span>
              <span className="font-mono font-bold text-[#4F46E5] dark:text-[#818CF8] text-sm">
                {pricingData.totalValue}
              </span>
            </div>
          </div>

          {/* High-Converting Primary Magnetic CTA Button (Solid Cinema Indigo) */}
          <button
            onClick={handleCtaClick}
            type="button"
            className="w-full relative group overflow-hidden rounded-2xl p-[1px] font-bold text-base sm:text-lg transition-transform active:scale-[0.99] shadow-xl shadow-indigo-600/20 dark:shadow-indigo-500/25 mb-6"
          >
            <span className="relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white transition-colors duration-200 font-bold border-t border-white/20">
              <Sparkles className="w-5 h-5 text-indigo-200 animate-pulse" />
              <span>{pricingData.ctaButton}</span>
              <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </span>
          </button>

          {/* Guarantee Details Subtext */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-8">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p>{pricingData.guaranteeDetails}</p>
          </div>

          {/* Value Stack Itemized Checklist */}
          <div>
            <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
              {pricingData.stackHeader}
            </h4>

            <ul className="space-y-3.5" role="list">
              {pricingData.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border',
                        item.isBonus
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/60 dark:border-indigo-500/30 text-[#4F46E5] dark:text-[#818CF8]'
                          : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/60 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      )}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          {item.title}
                        </span>
                        {item.isBonus && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-[#4F46E5] dark:text-[#A5B4FC]">
                            <Gift className="w-2.5 h-2.5" />
                            {pricingData.bonusBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-zinc-400 px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 shrink-0">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
