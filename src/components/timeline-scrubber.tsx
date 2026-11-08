'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export function TimelineScrubber() {
  const { copy, direction } = useLanguage();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [progress, setProgress] = useState(0.125); // 0.0 to 1.0 (defaults in middle of stage 0)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const stages = copy.stages;
  const currentStage = stages[activeStageIndex] || stages[0];

  // Helper color map for the 4 Core Pillars
  const getStageColor = (idx: number) => {
    switch (idx) {
      case 0:
        return '#4F46E5';
      case 1:
        return '#0EA5E9';
      case 2:
        return '#6366F1';
      case 3:
        return '#38BDF8';
      default:
        return '#6366F1';
    }
  };

  // Map progress (0.0 - 1.0) to active stage index (0 - 3)
  const updateStageFromProgress = useCallback(
    (p: number) => {
      let idx = 0;
      if (p < 0.25) idx = 0;
      else if (p < 0.5) idx = 1;
      else if (p < 0.75) idx = 2;
      else idx = 3;

      if (idx !== activeStageIndex) {
        setActiveStageIndex(idx);
        trackEvent('timeline_scrubbed', {
          stageId: stages[idx].id,
          stageIndex: idx,
          progress: Math.round(p * 100),
        });
      }
    },
    [activeStageIndex, stages]
  );

  // Jump to specific stage
  const jumpToStage = (idx: number) => {
    const centerPoint = (idx + 0.5) / 4;
    setProgress(centerPoint);
    setActiveStageIndex(idx);
    trackEvent('timeline_scrubbed', {
      stageId: stages[idx].id,
      stageIndex: idx,
      progress: Math.round(centerPoint * 100),
    });
  };

  // Autoplay simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.004;
          if (next >= 1.0) {
            setIsPlaying(false);
            return 1.0;
          }
          updateStageFromProgress(next);
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, updateStageFromProgress]);

  // Scrub calculation from pointer event
  const calculateProgressFromPointer = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let relativeX = clientX - rect.left;

    // If RTL, flip coordinates so scrubbing follows reading direction
    if (direction === 'rtl') {
      relativeX = rect.right - clientX;
    }

    const clampedX = Math.max(0, Math.min(relativeX, rect.width));
    const newProgress = clampedX / rect.width;
    setProgress(newProgress);
    updateStageFromProgress(newProgress);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsPlaying(false);
    calculateProgressFromPointer(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    calculateProgressFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if already released
    }
  };

  // Accessible keyboard scrubber handler (WCAG 2.1 AA)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    let delta = 0;
    if (e.key === 'ArrowRight') delta = direction === 'rtl' ? -0.05 : 0.05;
    else if (e.key === 'ArrowLeft') delta = direction === 'rtl' ? 0.05 : -0.05;
    else if (e.key === 'Home') {
      e.preventDefault();
      setProgress(0);
      updateStageFromProgress(0);
      return;
    } else if (e.key === 'End') {
      e.preventDefault();
      setProgress(1);
      updateStageFromProgress(1);
      return;
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsPlaying((prev) => !prev);
      return;
    }

    if (delta !== 0) {
      e.preventDefault();
      setProgress((prev) => {
        const next = Math.max(0, Math.min(1, prev + delta));
        updateStageFromProgress(next);
        return next;
      });
    }
  };

  // Virtual timecode formatter (0 to 1 min 15 sec)
  const formatTimecode = (p: number) => {
    const totalFrames = Math.floor(p * 2400);
    const mins = Math.floor(totalFrames / (24 * 60));
    const secs = Math.floor((totalFrames % (24 * 60)) / 24);
    const frames = totalFrames % 24;
    return `00:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  // Clean, human-crafted labels for mobile 2x2 grid
  const mobilePillLabelsAr = [
    'المحور 1: الأدوات والأساسيات',
    'المحور 2: التغذية والبورتفوليو',
    'المحور 3: استراتيجيات صيد العملاء',
    'المحور 4: صندوق أدوات المونتير',
  ];
  const mobilePillLabelsEn = [
    'Phase 1: Tools & Foundations',
    'Phase 2: Taste & Portfolio',
    'Phase 3: Client Acquisition',
    'Phase 4: Editor Toolkit',
  ];

  return (
    <div
      id="timeline-scrubber"
      className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0e0e13] shadow-lg shadow-black/[0.03] dark:shadow-none overflow-hidden transition-colors duration-300"
    >
      {/* ========================================================
          DESKTOP VIEW (lg and above):
          - Clean Titlebar with Timecode & Controls
          - Desktop Quick Stage Navigation Tabs
          - Multi-Track Scrubber Canvas
         ======================================================== */}

      {/* 1. Desktop Window Titlebar & Controls */}
      <div className="hidden lg:flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-[#14141a] border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700 inline-block" />
          </div>
          <span className="text-xs font-medium text-slate-700 dark:text-zinc-300 ms-3">
            {copy.hero.timelineHeader}
          </span>
        </div>

        {/* Center Digital LCD Timecode */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 dark:bg-black/60 border border-slate-800 dark:border-white/10 font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-[#0EA5E9] stroke-[1.5]" />
          <span className="text-[#0EA5E9] tracking-wider font-semibold">
            {formatTimecode(progress)}
          </span>
          <span className="text-[10px] text-zinc-500 hidden xl:inline">24 FPS</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => jumpToStage(Math.max(0, activeStageIndex - 1))}
            className="p-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            title="Previous Stage"
            aria-label="Previous Stage"
          >
            <SkipBack className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white transition-colors text-xs font-medium shadow-sm"
            title={isPlaying ? 'Pause' : 'Play Timeline'}
            aria-label={isPlaying ? 'Pause' : 'Play Timeline'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span className="text-[11px] hidden sm:inline">
              {isPlaying ? 'إيقاف' : 'معاينة'}
            </span>
          </button>
          <button
            onClick={() => jumpToStage(Math.min(3, activeStageIndex + 1))}
            className="p-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            title="Next Stage"
            aria-label="Next Stage"
          >
            <SkipForward className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* 2. Desktop Quick Stage Navigation Tabs */}
      <div className="hidden lg:grid grid-cols-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-[#111117]">
        {stages.map((stg, idx) => {
          const isActive = idx === activeStageIndex;
          const stageColor = getStageColor(idx);

          return (
            <button
              key={stg.id}
              onClick={() => jumpToStage(idx)}
              className={cn(
                'relative flex flex-col text-start px-3.5 py-3 transition-all border-e border-slate-200/80 dark:border-white/10 last:border-e-0',
                isActive
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/30 text-[#4F46E5] dark:text-[#818CF8]'
                  : 'hover:bg-slate-100/70 dark:hover:bg-white/5 text-slate-600 dark:text-zinc-400'
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                  {direction === 'rtl' ? `المحور ${idx + 1}` : `Pillar ${idx + 1}`}
                </span>
                <span
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    isActive ? 'shadow-sm' : 'bg-slate-300 dark:bg-zinc-600'
                  )}
                  style={
                    isActive
                      ? {
                          backgroundColor: stageColor,
                          boxShadow: `0 0 6px ${stageColor}80`,
                        }
                      : undefined
                  }
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold truncate mt-0.5">
                {stg.title.split(':')[1]?.trim() || stg.title}
              </span>
              {isActive && (
                <motion.div
                  layoutId="active-stage-indicator"
                  className="absolute bottom-0 inset-x-0 h-0.5"
                  style={{ backgroundColor: stageColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Desktop Scrubbing Track Canvas with Multi-Track Bars */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className="hidden lg:block relative px-4 py-4 select-none cursor-ew-resize touch-none overflow-hidden bg-slate-100/60 dark:bg-[#0c0c10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] dark:focus-visible:ring-[#818CF8] focus-visible:ring-inset"
        style={{ touchAction: 'pan-y' }}
        role="slider"
        aria-label="Video Editing Sequence Scrubber"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
      >
        {/* Ruler frame markings */}
        <div className="flex justify-between items-end h-5 mb-2 font-mono text-[9px] text-slate-500 dark:text-zinc-500 border-b border-slate-300/80 dark:border-white/10 pb-1">
          <span>00:00:00</span>
          <span>00:00:15</span>
          <span>00:00:30</span>
          <span>00:00:45</span>
          <span>00:01:00</span>
        </div>

        {/* Track Layers (V2, V1, A1, A2) */}
        <div className="space-y-2 relative">
          {/* Layer V2: Motion & Hooks */}
          <div className="flex items-center gap-2">
            <span className="w-8 text-[10px] font-mono text-slate-500 dark:text-zinc-500 text-end font-semibold">V2</span>
            <div className="flex-1 h-7 rounded-lg bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/10 flex items-center px-1 gap-1 relative overflow-hidden shadow-xs">
              <div
                className={cn(
                  'h-5 rounded px-2 flex items-center text-[10px] font-semibold text-white transition-all',
                  activeStageIndex === 1
                    ? 'bg-[#0EA5E9]'
                    : 'bg-sky-500/70 dark:bg-sky-500/40 text-[#E0F2FE]'
                )}
                style={{ width: '25%', marginInlineStart: '25%' }}
              >
                <Layers className="w-3 h-3 me-1 text-[#E0F2FE] stroke-[1.5]" />
                <span className="truncate">MOTION_GRAPHICS.aep</span>
              </div>
              <div
                className={cn(
                  'h-5 rounded px-2 flex items-center text-[10px] font-semibold text-white transition-all',
                  activeStageIndex === 2
                    ? 'bg-[#6366F1]'
                    : 'bg-indigo-500/70 dark:bg-indigo-500/40 text-[#EEF2FF]'
                )}
                style={{ width: '25%' }}
              >
                <Sparkles className="w-3 h-3 me-1 text-[#EEF2FF] stroke-[1.5]" />
                <span className="truncate">VIRAL_HOOKS.mogrt</span>
              </div>
              <div
                className={cn(
                  'h-5 rounded px-2 flex items-center text-[10px] font-semibold text-white transition-all',
                  activeStageIndex === 3
                    ? 'bg-[#38BDF8] text-slate-900'
                    : 'bg-sky-400/70 dark:bg-sky-400/40 text-slate-900 dark:text-[#E0F2FE]'
                )}
                style={{ width: '24%' }}
              >
                <span className="truncate">CLIENT_STACK.xml</span>
              </div>
            </div>
          </div>

          {/* Layer V1: Core Pillars */}
          <div className="flex items-center gap-2">
            <span className="w-8 text-[10px] font-mono text-slate-500 dark:text-zinc-500 text-end font-semibold">V1</span>
            <div className="flex-1 h-7 rounded-lg bg-white dark:bg-[#181822] border border-slate-200/80 dark:border-white/10 flex items-center px-1 gap-1 relative overflow-hidden shadow-xs">
              <div
                className={cn(
                  'h-5 rounded px-2 flex items-center text-[10px] font-semibold text-white transition-all',
                  activeStageIndex === 0
                    ? 'bg-[#4F46E5]'
                    : 'bg-indigo-600/70 dark:bg-indigo-600/40 text-[#EEF2FF]'
                )}
                style={{ width: '25%' }}
              >
                <span className="truncate">TOOLS_BASICS</span>
              </div>
              <div
                className={cn(
                  'h-5 rounded px-2 flex items-center text-[10px] font-semibold text-white transition-all',
                  activeStageIndex === 1
                    ? 'bg-[#0EA5E9]'
                    : 'bg-sky-500/70 dark:bg-sky-500/40 text-[#E0F2FE]'
                )}
                style={{ width: '25%' }}
              >
                <span className="truncate">FEEDING_PORTFOLIO</span>
              </div>
              <div
                className={cn(
                  'h-5 rounded px-2 flex items-center text-[10px] font-semibold text-white transition-all',
                  activeStageIndex === 2
                    ? 'bg-[#6366F1]'
                    : 'bg-indigo-500/70 dark:bg-indigo-500/40 text-[#EEF2FF]'
                )}
                style={{ width: '25%' }}
              >
                <span className="truncate">CLIENT_STRATEGY</span>
              </div>
              <div
                className={cn(
                  'h-5 rounded px-2 flex items-center text-[10px] font-semibold text-white transition-all',
                  activeStageIndex === 3
                    ? 'bg-[#38BDF8] text-slate-900'
                    : 'bg-sky-400/70 dark:bg-sky-400/40 text-slate-900 dark:text-[#E0F2FE]'
                )}
                style={{ width: '24%' }}
              >
                <span className="truncate">TOOLKIT_VAULT</span>
              </div>
            </div>
          </div>

          {/* Layer A1: Dialogue */}
          <div className="flex items-center gap-2">
            <span className="w-8 text-[10px] font-mono text-slate-500 dark:text-zinc-500 text-end font-semibold">A1</span>
            <div className="flex-1 h-6 rounded-lg bg-white dark:bg-[#14141c] border border-slate-200/80 dark:border-white/10 flex items-center px-3 relative overflow-hidden shadow-xs">
              <div className="flex items-center gap-0.5 w-full h-full opacity-60">
                {Array.from({ length: 48 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#0EA5E9] rounded-full"
                    style={{
                      height: `${Math.sin(i * 0.4) * 40 + 50}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Layer A2: SFX */}
          <div className="flex items-center gap-2">
            <span className="w-8 text-[10px] font-mono text-slate-500 dark:text-zinc-500 text-end font-semibold">A2</span>
            <div className="flex-1 h-6 rounded-lg bg-white dark:bg-[#14141c] border border-slate-200/80 dark:border-white/10 flex items-center px-3 relative overflow-hidden shadow-xs">
              <div className="flex items-center gap-0.5 w-full h-full opacity-50">
                {Array.from({ length: 48 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#6366F1] rounded-full"
                    style={{
                      height: `${(i % 5 === 0 ? 80 : 20)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Laser Playhead Needle */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-20"
            style={{
              [direction === 'rtl' ? 'right' : 'left']: `${progress * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="relative flex flex-col items-center -top-6">
              <div className="w-3.5 h-3.5 bg-[#6366F1] text-white rounded-xs flex items-center justify-center rotate-45 shadow-sm" />
              <div className="w-0.5 h-[140px] bg-[#6366F1]" />
            </div>
          </div>
        </div>

        {/* Visual scrubber hint */}
        <p className="text-[11px] text-slate-500 dark:text-zinc-400 text-center mt-3 font-medium">
          {copy.hero.scrubHint}
        </p>
      </div>

      {/* ========================================================
          MOBILE VIEW (below lg):
          - Clean, unsquished header
          - Touch-Friendly 2x2 Grid of Stage Pill Buttons
         ======================================================== */}

      {/* 1. Mobile Title Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-[#14141a] border-b border-slate-200/80 dark:border-white/10 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-zinc-700 inline-block" />
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-zinc-700 inline-block" />
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-zinc-700 inline-block" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 ms-1.5">
            {direction === 'rtl' ? 'التايم لاين التفاعلي للمنهج' : 'Interactive Curriculum'}
          </span>
        </div>
      </div>

      {/* 2. Mobile Touch-Friendly 2x2 Grid of Pill Buttons */}
      <div className="grid grid-cols-2 gap-2 p-3 sm:p-4 bg-slate-50/70 dark:bg-[#111117] border-b border-slate-200/80 dark:border-white/10 lg:hidden">
        {stages.map((stg, idx) => {
          const isActive = idx === activeStageIndex;
          const stageColor = getStageColor(idx);
          const pillLabel =
            direction === 'rtl' ? mobilePillLabelsAr[idx] : mobilePillLabelsEn[idx];

          return (
            <button
              key={stg.id}
              onClick={() => jumpToStage(idx)}
              type="button"
              className={cn(
                'relative flex items-center gap-2 p-2.5 sm:p-3 rounded-xl border text-start transition-all min-h-[48px]',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-500/40 text-[#4F46E5] dark:text-[#818CF8] font-semibold shadow-xs'
                  : 'bg-white dark:bg-[#14141c] border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 font-medium'
              )}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: stageColor,
                  boxShadow: isActive ? `0 0 6px ${stageColor}` : undefined,
                }}
              />
              <span className="text-xs font-medium leading-snug flex-1">
                {pillLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          ACTIVE STAGE SUMMARY CARD:
          - Quiet, focused educational content
          - 1 subtle pill badge maximum
          - No fake sci-fi / raw timecodes
         ======================================================== */}
      <div className="p-5 sm:p-7 bg-white dark:bg-[#121217]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Single Subtle Pill Badge Header */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/5 text-[#4F46E5] dark:text-[#818CF8] border border-slate-200/80 dark:border-white/10">
                {currentStage.badge}
              </span>
            </div>

            {/* Stage Title & Descriptions */}
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                {currentStage.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#4F46E5] dark:text-[#818CF8]">
                {currentStage.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal pt-1">
                {currentStage.description}
              </p>
            </div>

            {/* Actionable Milestones Checklist */}
            {currentStage.milestones && currentStage.milestones.length > 0 && (
              <div className="space-y-2 pt-1">
                {currentStage.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5 stroke-[1.5]" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-normal leading-relaxed">
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Clean Educational Outcome Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 mt-3">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-zinc-400 text-xs font-medium mb-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8] stroke-[1.5]" />
                <span>{direction === 'rtl' ? 'النتيجة العملية للمحور' : 'Expected Outcome'}</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#4F46E5] dark:text-[#818CF8]">
                {currentStage.metric.value}
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                {currentStage.metric.label}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
