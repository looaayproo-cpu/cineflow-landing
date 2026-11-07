'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/context/language-context';
import { Sun, Moon, Globe, Sparkles, Film, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface NavbarProps {
  onOpenCheckout: (triggerSource: string) => void;
}

export function Navbar({ onOpenCheckout }: NavbarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { toggleLanguage, copy, direction } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme = mounted ? (resolvedTheme || theme || 'dark') : 'dark';

  const handleThemeToggle = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    trackEvent('theme_toggled', { from: currentTheme as 'dark' | 'light', to: nextTheme });
  };

  const navLinks = [
    { href: '#curriculum', label: copy.navbar.curriculum },
    { href: '#stack', label: copy.navbar.stack },
    { href: '#wall', label: copy.navbar.wall },
    { href: '#pricing', label: copy.navbar.pricing },
    { href: '#faq', label: copy.navbar.faq },
  ];

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={cn(
          'pointer-events-auto w-full max-w-5xl transition-all duration-300',
          'rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5',
          'flex items-center justify-between',
          'border border-border-subtle backdrop-blur-xl shadow-xl shadow-black/10',
          'bg-white/90 dark:bg-[#121216]/85',
          scrolled && 'border-border-highlight shadow-2xl scale-[0.99]'
        )}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="CineFlow Home"
        >
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-md shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
            <Film className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
            <div className="absolute -inset-0.5 rounded-xl bg-[#6366F1] opacity-0 group-hover:opacity-30 blur transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              CineFlow
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            </span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 -mt-0.5 hidden sm:inline font-medium">
              Notion Roadmap
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-[#4F46E5] dark:hover:text-[#6366F1] transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop-only Language Switcher */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-[#4F46E5] dark:hover:text-[#6366F1] hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-border-subtle"
            title={copy.navbar.switchLang}
            aria-label={copy.navbar.switchLang}
          >
            <Globe className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>{copy.navbar.switchLang}</span>
          </button>

          {/* Desktop-only Theme Switcher */}
          {mounted ? (
            <button
              onClick={handleThemeToggle}
              type="button"
              className="hidden lg:flex p-1.5 sm:p-2 rounded-full text-slate-700 dark:text-zinc-300 hover:text-[#4F46E5] dark:hover:text-[#6366F1] hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-border-subtle"
              title={copy.navbar.switchTheme}
              aria-label={copy.navbar.switchTheme}
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#818CF8] hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4F46E5] hover:-rotate-12 transition-transform" />
              )}
            </button>
          ) : (
            <div className="hidden lg:block w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-border-subtle opacity-0" />
          )}

          {/* Primary Navbar CTA (Always visible on all screen sizes) */}
          <button
            onClick={() => onOpenCheckout('navbar')}
            type="button"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3 h-3 text-indigo-200" />
            <span>{copy.navbar.cta}</span>
          </button>

          {/* Mobile menu toggle (Visible below lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-full text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu (Cleanly contains Nav Links, Language Toggle, and Theme Toggle) */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 inset-x-3 sm:inset-x-6 max-w-lg mx-auto bg-white/95 dark:bg-[#121216]/95 border border-border-subtle rounded-2xl p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-2.5 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Clean Mobile Divider */}
          <div className="border-t border-slate-200 dark:border-border-subtle my-1" />

          {/* Language & Theme toggles row inside mobile dropdown */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-border-subtle bg-slate-50 dark:bg-white/5 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-[#4F46E5] dark:hover:text-[#6366F1] active:bg-slate-100 dark:active:bg-white/10 transition-all min-h-[44px]"
              aria-label={copy.navbar.switchLang}
            >
              <Globe className="w-4 h-4 text-[#0EA5E9]" />
              <span>{copy.navbar.switchLang}</span>
            </button>

            {mounted && (
              <button
                onClick={handleThemeToggle}
                type="button"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-border-subtle bg-slate-50 dark:bg-white/5 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-[#4F46E5] dark:hover:text-[#6366F1] active:bg-slate-100 dark:active:bg-white/10 transition-all min-h-[44px]"
                aria-label={copy.navbar.switchTheme}
              >
                {currentTheme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-[#818CF8]" />
                    <span>{direction === 'rtl' ? 'الوضع النهاري' : 'Light Mode'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#4F46E5]" />
                    <span>{direction === 'rtl' ? 'الوضع الليلي' : 'Dark Mode'}</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Mobile Primary Checkout CTA */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCheckout('mobile_nav');
            }}
            type="button"
            className="w-full mt-1 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white text-sm font-bold shadow-lg shadow-indigo-500/25 text-center flex items-center justify-center gap-2 transition-all active:scale-[0.99] min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>{copy.brand.ctaButton}</span>
          </button>
        </div>
      )}
    </header>
  );
}
