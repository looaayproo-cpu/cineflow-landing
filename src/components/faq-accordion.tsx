'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface FAQAccordionProps {
  className?: string;
}

export function FAQAccordion({ className }: FAQAccordionProps) {
  const { copy } = useLanguage();
  const faqData = copy.faq;
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const handleToggle = (id: string) => {
    const nextState = openId === id ? null : id;
    setOpenId(nextState);
    if (nextState) {
      trackEvent('faq_item_expanded', { faqId: id });
    }
  };

  return (
    <div className={cn('w-full max-w-3xl mx-auto space-y-3.5', className)}>
      {faqData.items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `faq-trigger-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              'rounded-2xl transition-all duration-300 border text-start overflow-hidden',
              isOpen
                ? 'bg-white dark:bg-[#14141a] border-indigo-200 dark:border-indigo-500/30 shadow-md shadow-indigo-500/5 dark:shadow-none'
                : 'bg-white/80 dark:bg-[#121216]/80 hover:bg-white dark:hover:bg-[#14141a] border-slate-200/80 dark:border-white/10 shadow-xs'
            )}
          >
            <h3>
              <button
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(item.id)}
                type="button"
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] dark:focus-visible:ring-[#6366F1] rounded-2xl group"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex items-center justify-center w-6 h-6 rounded-full text-xs font-mono font-bold shrink-0 transition-colors',
                      isOpen
                        ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white'
                        : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-400 group-hover:text-[#4F46E5] dark:group-hover:text-[#818CF8]'
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      'text-sm sm:text-base font-bold transition-colors leading-snug',
                      isOpen
                        ? 'text-[#4F46E5] dark:text-[#818CF8]'
                        : 'text-slate-900 dark:text-zinc-200 group-hover:text-[#4F46E5] dark:group-hover:text-[#818CF8]'
                    )}
                  >
                    {item.question}
                  </span>
                </div>

                <div
                  className={cn(
                    'p-1.5 rounded-full shrink-0 transition-all duration-300 ms-auto',
                    isOpen
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-[#4F46E5] dark:text-[#818CF8] rotate-180'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-400 group-hover:bg-slate-200 dark:group-hover:bg-white/10'
                  )}
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                </div>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                      opacity: { duration: 0.25, delay: 0.05 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed border-t border-slate-100 dark:border-white/5">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Support Help Banner */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-500/30 text-center sm:text-start">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#0EA5E9] dark:text-[#38BDF8] shrink-0" />
          <span className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-medium">
            {faqData.helpNotice}
          </span>
        </div>

        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1c1c24] border border-sky-200 dark:border-white/10 text-[#0284C7] dark:text-[#38BDF8] text-xs font-bold hover:bg-sky-50 dark:hover:bg-white/10 transition-colors shadow-sm shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{faqData.contactButton}</span>
        </a>
      </div>
    </div>
  );
}
