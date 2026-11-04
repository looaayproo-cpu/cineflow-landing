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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

  const totalDuration = testimonial.durationSeconds || 28;
  const audioSource = (testimonial.audioSrc || testimonial.audioUrl || '').trim();

  // Generate initials from name
  const initials = testimonial.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  // Format seconds to mm:ss
  const formatTime = (timeInSec: number) => {
    const clamped = Math.max(0, Math.min(totalDuration, timeInSec));
    const mins = Math.floor(clamped / 60);
    const secs = Math.floor(clamped % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Safe Web Audio API initialization
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Studio Sound Effects: Start Chime
  const playStudioChime = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft D5 -> A5 tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // AudioContext fallback grace
    }
  }, [getAudioContext]);

  // Studio Sound Effects: Subtle Studio Pulse Tick
  const playStudioPulse = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(392, now); // G4 soft acoustic tone

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // AudioContext fallback grace
    }
  }, [getAudioContext]);

  // Handle native HTML5 Audio ONLY when audioSource is actually provided
  useEffect(() => {
    if (!audioSource) {
      audioRef.current = null;
      return;
    }

    const audio = new Audio(audioSource);
    audioRef.current = audio;
    audio.preload = 'none';
    audio.playbackRate = playbackSpeed;

    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      setCurrentTime(0);
      if (isPlaying) {
        onTogglePlay();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, [audioSource, isPlaying, onTogglePlay, playbackSpeed]);

  // Sync playback rate with real audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Simulation loop callback for smooth 60fps waveform playback when mp3 is missing
  const simulationStep = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      const deltaSec = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + deltaSec * playbackSpeed;
        if (next >= totalDuration) {
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
          if (pulseIntervalRef.current) {
            clearInterval(pulseIntervalRef.current);
            pulseIntervalRef.current = null;
          }
          lastTimeRef.current = null;
          // Trigger stop on parent
          setTimeout(() => {
            onTogglePlay();
          }, 0);
          return 0;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(simulationStep);
    },
    [playbackSpeed, totalDuration, onTogglePlay]
  );

  // Play / Pause Coordinator
  useEffect(() => {
    if (isPlaying) {
      if (audioSource && audioRef.current) {
        // Native HTML5 Audio
        audioRef.current.currentTime = currentTime;
        audioRef.current.play().catch(() => {
          // In case real file errors, fallback to simulation
          playStudioChime();
          lastTimeRef.current = null;
          animFrameRef.current = requestAnimationFrame(simulationStep);
        });
      } else {
        // Built-in Studio Fallback (Zero network requests, zero 404s!)
        playStudioChime();

        // Start periodic subtle studio pulses synchronized with playback speed
        if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
        pulseIntervalRef.current = setInterval(() => {
          playStudioPulse();
        }, Math.max(250, Math.round(600 / playbackSpeed)));

        lastTimeRef.current = null;
        animFrameRef.current = requestAnimationFrame(simulationStep);
      }
    } else {
      // Pause native audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Cancel simulation & studio pulses
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
        pulseIntervalRef.current = null;
      }
      lastTimeRef.current = null;
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
        pulseIntervalRef.current = null;
      }
    };
  }, [isPlaying, audioSource, simulationStep, playStudioChime, playStudioPulse, playbackSpeed, currentTime]);

  // Handle Scrubbing (Clicking on waveform)
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSeconds = progress * totalDuration;

    setCurrentTime(targetSeconds);

    if (audioRef.current && audioSource) {
      audioRef.current.currentTime = targetSeconds;
    }
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
        'group relative flex flex-col justify-between w-[320px] sm:w-[410px] min-h-[310px] p-5 sm:p-6 rounded-3xl shrink-0 select-none transition-all duration-300 snap-center',
        'bg-white dark:bg-[#121217] border border-slate-200/80 dark:border-white/10 shadow-md shadow-black/[0.03] dark:shadow-none',
        isPlaying
          ? 'border-[#4F46E5] shadow-lg shadow-indigo-500/10 dark:border-[#6366F1]'
          : 'hover:border-indigo-400/40 dark:hover:border-white/20 hover:shadow-lg hover:shadow-black/[0.04]'
      )}
    >
      {/* Top Ambient Highlight on Active/Hover */}
      <div
        className={cn(
          'pointer-events-none absolute -top-10 -inset-x-0 h-24 bg-gradient-to-b from-[#6366F1]/15 to-transparent rounded-t-3xl blur-xl transition-opacity duration-300',
          isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}
      />

      {/* 1. Header: Avatar, Name, Handle & Retainer Milestone Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Stylized Avatar Pill (Cinema Indigo) */}
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white bg-[#4F46E5] dark:bg-[#6366F1] shadow-md shadow-indigo-500/25 shrink-0">
              {initials}
              {isPlaying && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white dark:border-[#121217] animate-ping" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {testimonial.name}
                </h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              </div>
              <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 truncate">
                {testimonial.handle}
              </p>
            </div>
          </div>

          {/* Revenue / Milestone Proof Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold shrink-0 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="truncate max-w-[130px] sm:max-w-none">
              {testimonial.badge}
            </span>
          </div>
        </div>

        {/* 2. WhatsApp / Studio Voice Caption Bubble */}
        <div className="relative my-2.5 px-3.5 py-2 rounded-2xl bg-slate-50/80 dark:bg-[#181820] border border-slate-200/70 dark:border-zinc-800 flex items-start gap-2 shadow-xs">
          <Mic className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200 leading-snug line-clamp-2">
            &ldquo;{testimonial.voiceCaption || testimonial.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* 3. Authentic Studio Voice Note Console */}
      <div className="mt-2 pt-3 border-t border-slate-100 dark:border-border-subtle">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0a0a0f] border border-slate-200/80 dark:border-border-subtle flex flex-col gap-2.5">
          {/* Top Row: Play/Pause button + 28-Bar Waveform */}
          <div className="flex items-center gap-3">
            {/* Circular Play / Pause Button (Cinema Indigo) */}
            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
              className={cn(
                'relative w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold transition-all duration-200 shadow-md',
                'bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] hover:scale-105 active:scale-95 shadow-indigo-500/25',
                isPlaying && 'ring-4 ring-indigo-500/25 ring-offset-1 dark:ring-offset-[#0a0a0f]'
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
              className="flex-1 h-9 px-2 py-1 rounded-xl bg-white/70 dark:bg-[#121217] border border-slate-200/70 dark:border-zinc-800/80 flex items-center justify-between gap-1 cursor-pointer select-none group/wave hover:border-indigo-400/50 transition-colors"
              title="Click anywhere to scrub playback"
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
                          ? 'bg-[#4F46E5] dark:bg-[#6366F1] shadow-xs'
                          : 'bg-slate-300/80 dark:bg-zinc-700/60 group-hover/wave:bg-slate-400 dark:group-hover/wave:bg-zinc-600'
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
          <div className="flex items-center justify-between px-1 text-[11px] font-mono font-medium text-slate-500 dark:text-zinc-400">
            {/* Live elapsed / total timer */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-900 dark:text-white font-semibold tabular-nums">
                {formatTime(currentTime)}
              </span>
              <span className="text-slate-400 dark:text-zinc-600">/</span>
              <span className="tabular-nums">{formatTime(totalDuration)}</span>
            </div>

            {/* Playback speed toggle */}
            <button
              type="button"
              onClick={handleCycleSpeed}
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#181820] text-slate-700 dark:text-zinc-300 hover:text-[#4F46E5] dark:hover:text-[#818CF8] transition-colors"
              title="Toggle audio playback speed"
            >
              {playbackSpeed}x
            </button>
          </div>
        </div>

        {/* 4. Footer: Verified Student & 5 Stars */}
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
            <span>{isRtl ? 'مراجعة موثقة' : 'Verified Review'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
