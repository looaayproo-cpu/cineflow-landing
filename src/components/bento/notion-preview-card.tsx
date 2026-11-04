'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import {
  Square,
  Check,
  ChevronRight,
  CheckCircle2,
  Film,
  Sparkles,
  Smartphone,
  Briefcase,
  BookOpen,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import type { NotionPillar } from '@/content/site-copy';

export function NotionPreviewCard() {
  const { copy, language, direction } = useLanguage();
  const cardData = copy.bento.notionCard;
  const pillars = cardData.pillars;

  // Active pillar index (0 to 3)
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  // Global state map for all 8 step checkboxes: stepId -> boolean
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    const initialMap: Record<string, boolean> = {};
    pillars.forEach((p) => {
      p.steps.forEach((s) => {
        initialMap[s.id] = s.done;
      });
    });
    return initialMap;
  });

  // Preserve user checked states when language changes
  useEffect(() => {
    setCompletedSteps((prev) => {
      const nextMap: Record<string, boolean> = {};
      pillars.forEach((p) => {
        p.steps.forEach((s) => {
          nextMap[s.id] = prev[s.id] !== undefined ? prev[s.id] : s.done;
        });
      });
      return nextMap;
    });
  }, [pillars]);

  const activePillar = pillars[activePillarIndex] || pillars[0];

  // Toggle individual step checkbox
  const toggleStep = (stepId: string, pillarId: string) => {
    setCompletedSteps((prev) => {
      const nextDone = !prev[stepId];
      trackEvent('bento_checklist_toggled', {
        itemId: stepId,
        pillarId,
        completed: nextDone,
      });
      return {
        ...prev,
        [stepId]: nextDone,
      };
    });
  };

  // Calculate total completed out of 8 modules
  const allStepIds = pillars.flatMap((p) => p.steps.map((s) => s.id));
  const totalStepsCount = allStepIds.length || 8;
  const totalCompletedCount = allStepIds.filter((id) => completedSteps[id]).length;
  const totalProgressPercent = Math.round((totalCompletedCount / totalStepsCount) * 100);

  // Helper for pillar-level progress
  const getPillarProgress = (pillar: NotionPillar) => {
    const completed = pillar.steps.filter((s) => completedSteps[s.id]).length;
    const total = pillar.steps.length;
    const isAllDone = total > 0 && completed === total;
    return { completed, total, isAllDone };
  };

  // Minimal clean pillar icon
  const renderPillarIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Film className="w-3.5 h-3.5 stroke-[1.5]" />;
      case 2:
        return <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />;
      case 3:
        return <Smartphone className="w-3.5 h-3.5 stroke-[1.5]" />;
      case 4:
        return <Briefcase className="w-3.5 h-3.5 stroke-[1.5]" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />;
    }
  };

  return (
    <div className="relative flex flex-col justify-between h-full p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/[0.02] dark:shadow-none transition-all duration-300 overflow-hidden">
      {/* Top Header & Metadata */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-[#4F46E5] dark:text-[#818CF8] text-xs font-medium">
            {cardData.badge}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-snug">
          {cardData.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-normal leading-relaxed mb-6 max-w-3xl">
          {cardData.description}
        </p>

        {/* Notion Database Workspace Frame */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-[#0c0c10] p-3.5 sm:p-5">
          {/* Workspace Breadcrumb & Progress */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2 text-slate-800 dark:text-zinc-200 text-xs sm:text-sm font-semibold">
              <BookOpen className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8] stroke-[1.5]" />
              <span>
                {language === 'ar' ? '4 محاور رئيسية • 8 محطات عملية' : '4 Core Pillars • 8 Actionable Modules'}
              </span>
            </div>

            {/* Total Completion Percentage Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-slate-600 dark:text-zinc-400">
                {totalCompletedCount}/{totalStepsCount} ({totalProgressPercent}%)
              </span>
              <div className="w-16 sm:w-24 h-1.5 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full bg-[#4F46E5] dark:bg-[#6366F1] rounded-full"
                  initial={false}
                  animate={{ width: `${totalProgressPercent}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Split: Clean 2-column on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* 1. Start Column: 4 Pillars Category List (Span 5 on md) */}
            <div className="md:col-span-5 flex flex-col space-y-2">
              <div className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium px-1 flex items-center justify-between">
                <span>{language === 'ar' ? 'المحاور الرئيسية' : 'Core Pillars'}</span>
                <span className="text-[10px] bg-slate-200/80 dark:bg-white/10 px-1.5 py-0.5 rounded text-slate-600 dark:text-zinc-300">
                  4
                </span>
              </div>

              {pillars.map((pillar, idx) => {
                const isActive = idx === activePillarIndex;
                const { completed, total, isAllDone } = getPillarProgress(pillar);

                return (
                  <button
                    key={pillar.id}
                    onClick={() => {
                      setActivePillarIndex(idx);
                      trackEvent('bento_pillar_selected', {
                        pillarId: pillar.id,
                        pillarNumber: pillar.pillarNumber,
                      });
                    }}
                    type="button"
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-xl border transition-all text-start cursor-pointer select-none',
                      isActive
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-500/40 shadow-xs ring-1 ring-indigo-500/10'
                        : 'bg-white dark:bg-[#14141c] border-slate-200/80 dark:border-white/10 hover:bg-slate-100/60 dark:hover:bg-white/5'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span
                        className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold shrink-0 text-white shadow-xs"
                        style={{ backgroundColor: pillar.color }}
                      >
                        {renderPillarIcon(pillar.pillarNumber)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100 truncate">
                            {pillar.shortTitle || pillar.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-normal block truncate">
                          {pillar.stepsCountBadge}
                        </span>
                      </div>
                    </div>

                    {/* Progress fraction & status */}
                    <div className="flex items-center gap-1.5 ms-2 shrink-0">
                      <span
                        className={cn(
                          'text-[10px] font-mono px-1.5 py-0.5 rounded font-medium',
                          isAllDone
                            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                        )}
                      >
                        {completed}/{total}
                      </span>
                      {isAllDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[1.5]" />
                      ) : (
                        <ChevronRight
                          className={cn(
                            'w-3.5 h-3.5 text-slate-400 transition-transform stroke-[1.5]',
                            direction === 'rtl' ? 'rotate-180' : '',
                            isActive ? 'text-[#4F46E5] dark:text-[#818CF8]' : ''
                          )}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 2. End Column: Document Detail Panel (Span 7 on md) */}
            <div className="md:col-span-7 flex flex-col justify-between rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#15151e] p-4 sm:p-5 shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, x: direction === 'rtl' ? -6 : 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 'rtl' ? 6 : -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3.5"
                >
                  {/* Document Header */}
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold text-white shrink-0"
                        style={{ backgroundColor: activePillar.color }}
                      >
                        {renderPillarIcon(activePillar.pillarNumber)}
                      </span>
                      <div>
                        <span className="text-[10px] text-[#4F46E5] dark:text-[#818CF8] font-semibold uppercase tracking-wider block">
                          {language === 'ar'
                            ? `المحور ${activePillar.pillarNumber} من 4`
                            : `Pillar ${activePillar.pillarNumber} of 4`}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {activePillar.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Clean Description Callout */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-zinc-300">
                    <div className="flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8] stroke-[1.5] shrink-0 mt-0.5" />
                      <p className="text-xs leading-relaxed font-normal">
                        {activePillar.quote || activePillar.description}
                      </p>
                    </div>
                  </div>

                  {/* Actionable Sub-Steps Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 block mb-1">
                      {cardData.actionableModulesLabel ||
                        (language === 'ar' ? 'المحطات والخطوات المشمولة:' : 'Included Actionable Modules:')}
                    </span>

                    {activePillar.steps.map((step) => {
                      const isDone = !!completedSteps[step.id];

                      return (
                        <button
                          key={step.id}
                          onClick={() => toggleStep(step.id, activePillar.id)}
                          type="button"
                          className={cn(
                            'w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-start cursor-pointer select-none',
                            isDone
                              ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/30'
                              : 'bg-white dark:bg-[#1a1a24] border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                          )}
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {/* Checkbox Icon */}
                            <div
                              className={cn(
                                'w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0',
                                isDone
                                  ? 'bg-[#10B981] text-white'
                                  : 'border border-slate-300 dark:border-zinc-600 bg-white dark:bg-black/30'
                              )}
                            >
                              {isDone ? (
                                <Check className="w-3 h-3 stroke-[2.5]" />
                              ) : (
                                <Square className="w-2.5 h-2.5 opacity-0" />
                              )}
                            </div>

                            <span
                              className={cn(
                                'text-xs truncate transition-all',
                                isDone
                                  ? 'line-through text-slate-400 dark:text-zinc-500'
                                  : 'text-slate-800 dark:text-zinc-200 font-medium'
                              )}
                            >
                              {step.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Side Peek Footer Helper */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] stroke-[1.5]" />
                  <span>
                    {language === 'ar'
                      ? `${activePillar.steps.filter((s) => completedSteps[s.id]).length} من ${activePillar.steps.length} مكتملة`
                      : `${activePillar.steps.filter((s) => completedSteps[s.id]).length} of ${activePillar.steps.length} Done`}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Status */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-medium">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] stroke-[1.5]" />
          <span>
            {language === 'ar'
              ? `${totalCompletedCount} من ${totalStepsCount} محطات عملية مكتملة (${totalProgressPercent}%)`
              : `${totalCompletedCount} of ${totalStepsCount} Actionable Modules Completed (${totalProgressPercent}%)`}
          </span>
        </span>
      </div>
    </div>
  );
}
