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
      className="relative min-h-screen lg:h-[100dvh] w-full pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 px-5 sm:px-10 lg:px-16 xl:px-24 overflow-hidden flex items-center justify-between"
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

      {/* 3. Restrained Ambient Glow Accents (Desktop/Tablet) */}
      <div className="pointer-events-none absolute -top-40 start-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#6366F1]/10 dark:bg-[#6366F1]/15 blur-[140px] rounded-full hidden lg:block" />
      <div className="pointer-events-none absolute top-1/2 start-1/4 -translate-y-1/2 w-[480px] h-[360px] bg-[#0EA5E9]/10 dark:bg-[#0EA5E9]/15 blur-[130px] rounded-full hidden lg:block" />

      {/* 3b. Mobile Cinematic Aurora Lighting System (Balanced Atmospheric Depth) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden block lg:hidden">
        {/* Deep Oceanic Underwash (Lifts blackness to deep cinematic space) */}
        <div
          className="absolute inset-0 opacity-80 dark:opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 95% 75% at 50% 25%, rgba(11, 16, 32, 0.75) 0%, rgba(9, 9, 11, 0.2) 65%, transparent 100%)',
          }}
        />

        {/* Aurora Mesh 1: Upper-Lateral Violet / Purple Atmosphere */}
        <div
          className="absolute -top-12 start-[-10%] w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full blur-[80px] animate-aurora-1 opacity-70 dark:opacity-80"
          style={{
            background:
              'radial-gradient(circle at center, rgba(124, 58, 237, 0.32) 0%, rgba(168, 85, 247, 0.16) 45%, transparent 75%)',
          }}
        />

        {/* Aurora Mesh 2: Mid-Lateral Electric Blue Energy Glow (Opposite Side) */}
        <div
          className="absolute top-[32%] end-[-15%] w-[320px] h-[360px] sm:w-[400px] sm:h-[440px] rounded-full blur-[85px] animate-aurora-2 opacity-65 dark:opacity-75"
          style={{
            background:
              'radial-gradient(circle at center, rgba(37, 99, 235, 0.28) 0%, rgba(14, 165, 233, 0.14) 50%, transparent 75%)',
          }}
        />

        {/* Aurora Mesh 3: Lower Subtle Cyan Atmospheric Accent */}
        <div
          className="absolute bottom-[-5%] start-[20%] w-[300px] h-[260px] rounded-full blur-[75px] animate-aurora-3 opacity-55 dark:opacity-65"
          style={{
            background:
              'radial-gradient(circle at center, rgba(6, 182, 212, 0.22) 0%, rgba(56, 189, 248, 0.10) 45%, transparent 70%)',
          }}
        />
      </div>

      {/* 4. Directional Readability Vignette Gradient on the Text Side (Desktop/Tablet) */}
      <div
        className={`pointer-events-none absolute inset-y-0 start-0 ${
          direction === 'rtl' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
        } from-background/95 via-background/75 to-transparent hidden lg:block lg:w-3/5 z-0`}
      />

      {/* 4b. Mobile Subtle Atmospheric Text Scrim (Preserves Crisp Copy & Atmospheric Depth) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 lg:hidden"
        style={{
          background:
            'radial-gradient(ellipse 72% 42% at 50% 40%, color-mix(in srgb, var(--background) 55%, transparent) 0%, transparent 100%)',
        }}
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
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#4F46E5] dark:text-[#C084FC] uppercase mb-2.5 sm:mb-5"
          >
            <span className="w-4 sm:w-5 h-[1.5px] bg-current opacity-70" />
            <span>{copy.hero.eyebrow || copy.hero.pillBadge}</span>
          </motion.div>

          {/* Prominent Editorial Headline with Violet Accent (Clean Non-Italic Typography) */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.26] sm:leading-[1.18] lg:leading-[1.12] text-slate-900 dark:text-white"
          >
            {copy.hero.headlinePart1}{' '}
            <span className="text-[#6366F1] dark:text-[#C084FC] font-bold">
              {copy.hero.headlineHighlight}
            </span>
            {copy.hero.headlinePart2 ? ` ${copy.hero.headlinePart2}` : ''}
          </motion.h1>

          {/* Restrained 2-3 Line Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[0.9375rem] sm:text-base lg:text-lg text-slate-600 dark:text-zinc-400 font-normal leading-[1.75] sm:leading-relaxed mt-3 sm:mt-5 mb-6 sm:mb-8 max-w-lg"
          >
            {copy.hero.description || copy.hero.subheadline}
          </motion.p>

          {/* Dual CTAs (Pill Primary Button + Circular Play Secondary Anchor) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary Pill Button */}
            <button
              onClick={handlePrimaryCtaClick}
              type="button"
              className="relative group px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] dark:focus-visible:ring-[#818CF8] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black min-h-[48px]"
            >
              <span>{copy.hero.ctaPrimary}</span>
              <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            {/* Circular Secondary Play Button with Pill Label */}
            <a
              href="#curriculum"
              className="inline-flex items-center justify-center sm:justify-start gap-3 px-4 py-3 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm transition-all backdrop-blur-md shadow-xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] dark:focus-visible:ring-[#818CF8] min-h-[48px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center bg-slate-100 dark:bg-white/10 group-hover:scale-105 group-hover:bg-[#4F46E5] group-hover:text-white dark:group-hover:bg-[#818CF8] dark:group-hover:text-black transition-all shrink-0">
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ms-0.5 text-slate-700 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
              </div>
              <span className="pe-1 sm:pe-2">{copy.hero.ctaSecondary}</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* 6. Subtle Bottom Scroll Indicator to the Timeline Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-3 sm:bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none"
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
