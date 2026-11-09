'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import type { TestimonialItem } from '@/content/site-copy';
import {
  CheckCircle2,
  Play,
  Pause,
  Mic,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function TestimonialCard({
  testimonial,
  isPlaying,
  onTogglePlay,
}: TestimonialCardProps) {
  const { direction } = useLanguage();
  const isRtl = direction === 'rtl';

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [actualDuration, setActualDuration] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const onTogglePlayRef = useRef(onTogglePlay);

  useEffect(() => {
    onTogglePlayRef.current = onTogglePlay;
  }, [onTogglePlay]);

  const totalDuration = actualDuration || testimonial.durationSeconds || 28;
  const audioSource = (testimonial.audioSrc || testimonial.audioUrl || '').trim();

  // Clean name by stripping common prefixes (e.g., 'أ/', 'م/', 'Eng.') to generate dignified initials
  const cleanName = testimonial.name
    .replace(/^(أ|م|د|مهندس|أستاذ|دكتور|Eng\.|Dr\.)\/?\s*/i, '')
    .trim();
  const initials = cleanName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join(isRtl ? ' ' : '');

  // Format seconds to mm:ss
  const formatTime = (timeInSec: number) => {
    const clamped = Math.max(0, Math.min(totalDuration, timeInSec));
    const mins = Math.floor(clamped / 60);
    const secs = Math.floor(clamped % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Play / Pause Native Audio cleanly (NEVER re-seeks or loops)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSource) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio playback error:', err);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, audioSource]);

  // Sync playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Smooth UI progress loop while playing (reads audio.currentTime without touching or resetting it)
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    const tick = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused && !audio.ended) {
        setCurrentTime(audio.currentTime);
        animId = requestAnimationFrame(tick);
      }
    };
    animId = requestAnimationFrame(tick);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  // Audio Event Handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      if (dur && isFinite(dur) && dur > 0) {
        setActualDuration(Math.round(dur));
      }
    }
  };

  const handleEnded = () => {
    setCurrentTime(0);
    if (isPlaying) {
      onTogglePlayRef.current();
    }
  };

  // Handle Scrubbing (Clicking on waveform) - user initiated seek ONLY
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current || !audioRef.current) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const rawFraction = isRtl
      ? (rect.width - clickX) / rect.width
      : clickX / rect.width;
    const progress = Math.max(0, Math.min(1, rawFraction));
    const targetSeconds = progress * totalDuration;

    audioRef.current.currentTime = targetSeconds;
    setCurrentTime(targetSeconds);
  };

  // Speed Toggle
  const handleCycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaybackSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
  };

  const progressFraction = Math.max(0, Math.min(1, currentTime / totalDuration));

  return (
    <div
      dir={direction}
      className={cn(
        'group relative flex flex-col justify-between w-[86vw] max-w-[340px] sm:max-w-none sm:w-[380px] lg:w-auto h-full p-5 sm:p-6 rounded-3xl shrink-0 select-none transition-all duration-300 snap-center',
        'bg-white dark:bg-[#121217] border border-slate-200/80 dark:border-white/10 shadow-sm shadow-black/[0.03]',
        isPlaying
          ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-md shadow-black/5'
          : 'hover:border-slate-300 dark:hover:border-zinc-700/80 hover:shadow-md hover:shadow-black/5'
      )}
    >
      {/* Hidden Native Audio Element */}
      {audioSource && (
        <audio
          ref={audioRef}
          src={audioSource}
          preload="metadata"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      {/* Top Body Section: Profile Header -> Achievement Badge -> Quote */}
      <div className="flex flex-col flex-1">
        {/* 1. Profile Header: Avatar + Full Name + Verification + Username */}
        <div className="flex items-center gap-3.5 mb-3">
          {/* Avatar Pill */}
          <div className="relative w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white bg-indigo-600 dark:bg-indigo-600 shadow-sm shrink-0">
            {initials}
            {isPlaying && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121217]" />
            )}
          </div>

          {/* User Name & Handle */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {testimonial.name}
              </h3>
              <CheckCircle2
                className="w-4 h-4 text-emerald-500 shrink-0"
                aria-label={isRtl ? 'حساب موثق' : 'Verified Student'}
              />
            </div>
            <p
              className="text-xs text-slate-500 dark:text-zinc-400 font-mono truncate mt-0.5 rtl:text-right ltr:text-left"
              dir="ltr"
            >
              {testimonial.handle}
            </p>
          </div>
        </div>

        {/* 2. Achievement / Milestone Badge (Dedicated row, full width breathing room) */}
        <div className="mb-3.5">
          <div
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-xs max-w-full',
              isRtl ? 'font-sans' : 'font-mono'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="leading-snug break-words">
              {testimonial.badge}
            </span>
          </div>
        </div>

        {/* 3. WhatsApp / Studio Voice Caption Bubble */}
        <div className="relative mb-4 px-3.5 py-3 rounded-2xl bg-slate-50/90 dark:bg-[#181820] border border-slate-200/70 dark:border-zinc-800/80 flex items-start gap-2.5 shadow-xs flex-1">
          <Mic className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-[13px] font-medium text-slate-800 dark:text-zinc-200 leading-relaxed">
            &ldquo;{testimonial.voiceCaption || testimonial.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom Section: Audio Player Console + Footer */}
      <div className="mt-auto">
        {/* 4. Authentic Studio Voice Note Console */}
        <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex flex-col gap-2.5">
          {/* Top Row: Play/Pause button + 28-Bar Waveform */}
          <div className="flex items-center gap-3">
            {/* Circular Play / Pause Button */}
            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={
                isPlaying
                  ? isRtl
                    ? 'إيقاف مؤقت للتسجيل الصوتي'
                    : 'Pause voice note'
                  : isRtl
                  ? 'تشغيل التسجيل الصوتي'
                  : 'Play voice note'
              }
              className={cn(
                'relative w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold transition-all duration-200 shadow-sm',
                'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                isPlaying && 'ring-4 ring-indigo-500/25 ring-offset-1 dark:ring-offset-[#121217]'
              )}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white text-white" />
              ) : (
                <Play
                  className={cn(
                    'w-4 h-4 fill-white text-white',
                    isRtl ? '-scale-x-100 translate-x-0.5' : 'translate-x-0.5'
                  )}
                />
              )}
            </button>

            {/* Scrubbable 28-Bar Waveform Container */}
            <div
              ref={waveformRef}
              onClick={handleScrub}
              role="slider"
              tabIndex={0}
              aria-label={isRtl ? 'مؤشر تقدم التسجيل الصوتي' : 'Voice note progress'}
              aria-valuenow={Math.round(currentTime)}
              aria-valuemin={0}
              aria-valuemax={totalDuration}
              className="flex-1 h-11 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0c0c10] border border-slate-200/80 dark:border-zinc-800 flex items-center justify-between gap-1 cursor-pointer select-none group/wave hover:border-indigo-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title={isRtl ? 'انقر في أي مكان للتخطي' : 'Click anywhere to scrub playback'}
            >
              {testimonial.waveformBars.map((heightFactor, idx) => {
                const barFraction = (idx + 1) / testimonial.waveformBars.length;
                const isPassed = barFraction <= progressFraction;
                const heightPercent = Math.max(
                  18,
                  Math.min(100, Math.round(heightFactor * 100))
                );

                return (
                  <div
                    key={idx}
                    className="flex-1 h-full flex items-center justify-center"
                  >
                    <motion.div
                      className={cn(
                        'w-full max-w-[4px] rounded-full transition-all duration-150',
                        isPassed
                          ? 'bg-indigo-600 dark:bg-indigo-500'
                          : 'bg-slate-300 dark:bg-zinc-700/70 group-hover/wave:bg-slate-400 dark:group-hover/wave:bg-zinc-600'
                      )}
                      style={{
                        height: `${heightPercent}%`,
                      }}
                      animate={
                        isPlaying && isPassed
                          ? {
                              scaleY: [1, 1.2, 0.9, 1],
                            }
                          : { scaleY: 1 }
                      }
                      transition={
                        isPlaying && isPassed
                          ? {
                              repeat: Infinity,
                              duration: 0.6,
                              delay: (idx % 4) * 0.1,
                            }
                          : undefined
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Timer & Speed Toggle */}
          <div className="flex items-center justify-between px-1 text-xs font-mono font-medium text-slate-500 dark:text-zinc-400">
            {/* Live elapsed / total timer - forced LTR so 0:00 is on left and total on right */}
            <div className="flex items-center gap-1.5 tabular-nums text-xs" dir="ltr">
              <span className="text-slate-900 dark:text-white font-semibold">
                {formatTime(currentTime)}
              </span>
              <span className="text-slate-400 dark:text-zinc-600">/</span>
              <span className="text-slate-500 dark:text-zinc-400">
                {formatTime(totalDuration)}
              </span>
            </div>

            {/* Playback speed toggle */}
            <button
              type="button"
              onClick={handleCycleSpeed}
              aria-label={
                isRtl
                  ? `سرعة تشغيل الصوت ${playbackSpeed} ضعف`
                  : `Playback speed ${playbackSpeed}x`
              }
              className="px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#181820] text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
              title={isRtl ? 'تغيير سرعة الصوت' : 'Toggle audio playback speed'}
            >
              {playbackSpeed}x
            </button>
          </div>
        </div>

        {/* 5. Footer: Verified Student & 5 Stars */}
        <div className="flex items-center justify-between mt-4 px-1 pt-3 border-t border-slate-100/80 dark:border-zinc-800/50">
          <div
            className="flex items-center gap-1 text-amber-400"
            aria-label="5 out of 5 stars"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{isRtl ? 'مراجعة موثقة' : 'Verified Review'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
