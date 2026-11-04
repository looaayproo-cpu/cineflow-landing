'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { ArrowRight, ArrowLeft, Play, ChevronDown } from 'lucide-react';
import { HeroParticleCanvas } from '@/components/hero-particle-canvas';
import { trackEvent } from '@/lib/analytics';

interface HeroSectionProps {
  onOpenCheckout: (triggerSource: string) => void;
}

export function HeroSection({ onOpenCheckout }: HeroSectionProps) {
  const { copy, direction } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current || !spotlightRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(750px circle at ${x}px ${y}px, var(--spotlight), transparent 80%)`;
  };

  const handlePrimaryCtaClick = () => {
    trackEvent('hero_cta_clicked', { ctaLocation: 'hero_primary' });
    onOpenCheckout('hero_primary');
  };

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen lg:h-[100dvh] w-full pt-28 pb-16 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden flex items-center justify-between"
    >
      {/* 1. Full-Screen 3D Swirling Particle Vortex Canvas (Phase 2, 3 & 4) */}
      <div
        id="hero-particles-canvas-container"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <HeroParticleCanvas />
      </div>

      {/* 2. Antigravity Mouse-Tracking Spotlight Wash */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-60"
        style={{
          background: 'radial-gradient(750px circle at 500px 300px, var(--spotlight), transparent 80%)',
        }}
      />

      {/* 3. Restrained Ambient Glow Accents */}
      <div className="pointer-events-none absolute -top-40 start-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#6366F1]/10 dark:bg-[#6366F1]/15 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 start-1/4 -translate-y-1/2 w-[480px] h-[360px] bg-[#0EA5E9]/10 dark:bg-[#0EA5E9]/15 blur-[130px] rounded-full" />

      {/* 4. Directional Readability Vignette Gradient on the Text Side */}
      <div
        className={`pointer-events-none absolute inset-y-0 start-0 ${
          direction === 'rtl' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
        } from-background/95 via-background/75 to-transparent w-full lg:w-3/5 z-0`}
      />

      {/* 5. Side-Aligned Minimalist Editorial Content Block (Aetherlabs Reference Composition) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-start">
        <div
          className="w-full max-w-xl flex flex-col items-start text-start"
          style={{
            marginInlineStart: 0,
            marginInlineEnd: 'auto',
          }}
        >
          {/* Minimal Eyebrow Label with Leading Line Dash */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wider text-[#4F46E5] dark:text-[#C084FC] uppercase mb-4 sm:mb-5"
          >
            <span className="w-5 h-[1.5px] bg-current opacity-70" />
            <span>{copy.hero.eyebrow || copy.hero.pillBadge}</span>
          </motion.div>

          {/* Prominent Editorial Headline with Italic Violet Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-slate-900 dark:text-white"
          >
            {copy.hero.headlinePart1}{' '}
            <span className="text-[#6366F1] dark:text-[#C084FC] font-serif italic font-normal">
              {copy.hero.headlineHighlight}
            </span>
            {copy.hero.headlinePart2 ? ` ${copy.hero.headlinePart2}` : ''}
          </motion.h1>

          {/* Restrained 2-3 Line Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-zinc-400 font-medium leading-relaxed mt-4 sm:mt-5 mb-8 max-w-lg"
          >
            {copy.hero.description || copy.hero.subheadline}
          </motion.p>

          {/* Dual CTAs (Pill Primary Button + Circular Play Secondary Anchor) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary Pill Button */}
            <button
              onClick={handlePrimaryCtaClick}
              type="button"
              className="relative group px-7 py-3.5 sm:py-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] dark:focus-visible:ring-[#818CF8] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
            >
              <span>{copy.hero.ctaPrimary}</span>
              <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            {/* Circular Secondary Play Button with Pill Label */}
            <a
              href="#curriculum"
              className="inline-flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm transition-all backdrop-blur-md shadow-xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] dark:focus-visible:ring-[#818CF8]"
            >
              <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center bg-slate-100 dark:bg-white/10 group-hover:scale-105 group-hover:bg-[#4F46E5] group-hover:text-white dark:group-hover:bg-[#818CF8] dark:group-hover:text-black transition-all">
                <Play className="w-3.5 h-3.5 fill-current ms-0.5 text-slate-700 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
              </div>
              <span className="pe-2">{copy.hero.ctaSecondary}</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* 6. Subtle Bottom Scroll Indicator to the Timeline Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-5 sm:bottom-7 inset-x-0 z-20 flex justify-center pointer-events-none"
      >
        <a
          href="#curriculum"
          className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white transition-colors bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-slate-200/50 dark:border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] dark:focus-visible:ring-[#818CF8]"
        >
          <span>{direction === 'rtl' ? 'التايم لاين العملي بالأسفل' : 'Curriculum Timeline Below'}</span>
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="inline-flex items-center justify-center"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
