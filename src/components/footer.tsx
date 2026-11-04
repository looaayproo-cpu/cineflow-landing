'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import {
  Film,
  ArrowUp,
  ShieldCheck,
  Heart,
  Youtube,
  Twitter,
  Instagram,
  Send,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const { copy, direction } = useLanguage();
  const footerCopy = copy.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
    { name: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    { name: 'Telegram', href: 'https://t.me', icon: Send },
    { name: 'Discord', href: 'https://discord.com', icon: MessageSquare },
  ];

  return (
    <footer className="relative bg-slate-50 dark:bg-[#0c0c10] border-t border-slate-200 dark:border-white/5 pt-16 pb-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-200 dark:border-white/10 text-start">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 group cursor-pointer"
              aria-label="CineFlow Home"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-md shadow-indigo-500/25 border-t border-white/20">
                <Film className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                CineFlow
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              </span>
            </a>

            <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-md leading-relaxed">
              {footerCopy.tagline}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 dark:text-zinc-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{footerCopy.refundGuarantee}</span>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-3 pt-2" aria-label={footerCopy.socialTitle}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-[#4F46E5] dark:hover:text-[#818CF8] hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {footerCopy.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
              {footerCopy.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#4F46E5] dark:hover:text-[#818CF8] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {footerCopy.legalTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
              <li>
                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {footerCopy.refundGuarantee}
                </span>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#4F46E5] dark:hover:text-[#818CF8] transition-colors">
                  {footerCopy.privacy}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#4F46E5] dark:hover:text-[#818CF8] transition-colors">
                  {footerCopy.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright & Back-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-start">
            <span>{footerCopy.copyright}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <span>{footerCopy.builtFor}</span>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 font-medium transition-colors cursor-pointer"
          >
            <span>{footerCopy.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
