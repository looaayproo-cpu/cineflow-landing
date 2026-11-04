'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { TimelineScrubber } from '@/components/timeline-scrubber';
import { Sparkles } from 'lucide-react';

export function CurriculumSection() {
  const { copy, direction } = useLanguage();

  return (
    <section
      id="curriculum"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-white/5 bg-gradient-to-b from-transparent via-slate-100/30 to-transparent dark:via-white/[0.02]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[#4338CA] dark:text-[#C7D2FE] shadow-xs mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8] stroke-[1.5]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              {copy.hero.timelineHeader}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            {direction === 'rtl'
              ? 'التايم لاين العملي لمحاور المنهج'
              : 'Interactive Curriculum Timeline'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 font-medium mt-3 max-w-xl text-center"
          >
            {copy.hero.scrubHint}
          </motion.p>
        </div>

        {/* Interactive Scrubbing Video Timeline Component */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full"
        >
          <TimelineScrubber />
        </motion.div>
      </div>
    </section>
  );
}

