'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { Sparkles } from 'lucide-react';
import { NotionPreviewCard } from '@/components/bento/notion-preview-card';

export function BentoGrid() {
  const { copy } = useLanguage();
  const bentoCopy = copy.bento;

  return (
    <section id="stack" className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative ambient gradients (Cinema Indigo) */}
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#6366F1]/5 dark:bg-[#6366F1]/10 blur-[140px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/5 shadow-xs mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8] stroke-[1.5]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#4338CA] dark:text-[#C7D2FE]">
              {bentoCopy.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
          >
            {bentoCopy.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-zinc-400 font-normal leading-relaxed mt-4"
          >
            {bentoCopy.subtitle}
          </motion.p>
        </div>

        {/* Sole, Spacious Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full flex flex-col"
        >
          <NotionPreviewCard />
        </motion.div>
      </div>
    </section>
  );
}
