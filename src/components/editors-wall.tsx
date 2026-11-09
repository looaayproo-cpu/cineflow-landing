'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { TestimonialCard } from '@/components/testimonial-card';
import {
  Mic,
  ChevronLeft,
  ChevronRight,
  Headphones,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function EditorsWall() {
  const { copy, direction } = useLanguage();
  const isRtl = direction === 'rtl';
  const wallCopy = copy.editorsWall;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [canScrollStart, setCanScrollStart] = useState<boolean>(false);
  const [canScrollEnd, setCanScrollEnd] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const testimonials = wallCopy.testimonials;

  // Toggle play/pause for a specific card, pausing all others
  const handleTogglePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  // Update scroll states
  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (isRtl) {
      // In RTL, scrollLeft can be negative or positive depending on browser implementation
      const absScroll = Math.abs(scrollLeft);
      setCanScrollStart(absScroll > 10);
      setCanScrollEnd(absScroll < maxScroll - 10);
    } else {
      setCanScrollStart(scrollLeft > 10);
      setCanScrollEnd(scrollLeft < maxScroll - 10);
    }

    // Estimate active card index
    const cardWidth = 380;
    const currentScroll = Math.abs(scrollLeft);
    const index = Math.min(
      testimonials.length - 1,
      Math.max(0, Math.round(currentScroll / cardWidth))
    );
    setActiveIndex(index);
  }, [isRtl, testimonials.length]);

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [checkScrollState]);

  // Navigate carousel
  const scroll = (dir: 'next' | 'prev') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = 400; // Average card width + gap
    let delta = dir === 'next' ? scrollAmount : -scrollAmount;

    // In RTL, standard scroll direction is reversed
    if (isRtl) {
      delta = -delta;
    }

    el.scrollBy({ left: delta, behavior: 'smooth' });
    setTimeout(checkScrollState, 350);
  };

  return (
    <section id="wall" className="relative py-20 lg:py-28 overflow-hidden">
      <div id="proof" className="absolute -top-24" aria-hidden="true" />

      {/* Decorative ambient gradients (Cinema Indigo) */}
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[#6366F1]/5 dark:bg-[#6366F1]/10 blur-[140px] rounded-full -z-10" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-10 sm:mb-14">
        {/* Cinema Indigo Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/5 shadow-xs mb-4"
        >
          <Mic className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8] stroke-[1.5]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#4338CA] dark:text-[#C7D2FE]">
            {wallCopy.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
        >
          {wallCopy.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-zinc-400 font-normal leading-relaxed mt-4 max-w-2xl"
        >
          {wallCopy.subtitle}
        </motion.p>

        {/* Audio Carousel Controls & Status Header Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center sm:justify-between w-full max-w-3xl gap-3 p-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/70 dark:bg-[#121217]/80 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md"
        >
          {/* Audio Spec indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-zinc-300">
            <Headphones className="w-4 h-4 text-[#0EA5E9]" />
            <span>{wallCopy.voiceNoteBadge}</span>
          </div>

          {/* Navigation Controls (Prev / Next & Card Counter) */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'text-xs font-bold text-slate-500 dark:text-zinc-400',
                isRtl ? 'font-sans' : 'font-mono'
              )}
            >
              <span className="lg:hidden tabular-nums" dir="ltr">
                {activeIndex + 1} / {testimonials.length}
              </span>
              <span className="hidden lg:inline">
                {testimonials.length} {isRtl ? 'تسجيلات حصرية' : 'Exclusive Notes'}
              </span>
            </span>

            <div className="flex items-center gap-1.5 lg:hidden" dir="ltr">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => scroll(isRtl ? 'next' : 'prev')}
                disabled={!canScrollStart && !isRtl}
                aria-label={wallCopy.prevButton}
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                  'bg-white dark:bg-[#181820] border-slate-200 dark:border-zinc-700/80 text-slate-700 dark:text-zinc-200',
                  'hover:border-indigo-400 hover:text-[#4F46E5] dark:hover:border-indigo-500 dark:hover:text-[#818CF8] active:scale-95',
                  'disabled:opacity-40 disabled:pointer-events-none'
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => scroll(isRtl ? 'prev' : 'next')}
                disabled={!canScrollEnd && !isRtl}
                aria-label={wallCopy.nextButton}
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                  'bg-white dark:bg-[#181820] border-slate-200 dark:border-zinc-700/80 text-slate-700 dark:text-zinc-200',
                  'hover:border-indigo-400 hover:text-[#4F46E5] dark:hover:border-indigo-500 dark:hover:text-[#818CF8] active:scale-95',
                  'disabled:opacity-40 disabled:pointer-events-none'
                )}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Single-Row Interactive Horizontal Carousel on Mobile/Tablet -> 3-Column Grid on Desktop */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Left & Right Edge Gradient Fades for SaaS Polish - Mobile/Tablet Only */}
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 start-0 w-8 sm:w-16 bg-gradient-to-r rtl:bg-gradient-to-l from-background to-transparent z-20 transition-opacity duration-300 lg:hidden',
            canScrollStart ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 end-0 w-8 sm:w-16 bg-gradient-to-l rtl:bg-gradient-to-r from-background to-transparent z-20 transition-opacity duration-300 lg:hidden',
            canScrollEnd ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Scroll Container with Mandatory Snap & Mouse/Touch Dragging */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollState}
          dir={direction}
          className="flex lg:grid lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible py-4 px-2 sm:px-4 lg:px-0 snap-x snap-mandatory scroll-smooth no-scrollbar select-none items-stretch"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isPlaying={playingId === testimonial.id}
              onTogglePlay={() => handleTogglePlay(testimonial.id)}
            />
          ))}
        </div>

        {/* Carousel Progress Indicator Dots - Mobile/Tablet only */}
        <div className="flex items-center justify-center gap-1.5 mt-4 lg:hidden">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const el = scrollContainerRef.current;
                if (!el) return;
                const cardWidth = 340;
                const targetScroll = idx * cardWidth;
                el.scrollTo({
                  left: isRtl ? -targetScroll : targetScroll,
                  behavior: 'smooth',
                });
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                activeIndex === idx
                  ? 'w-7 bg-[#4F46E5] dark:bg-[#6366F1]'
                  : 'w-2 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
