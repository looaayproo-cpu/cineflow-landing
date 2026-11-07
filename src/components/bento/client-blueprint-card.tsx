'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import {
  CheckCircle2,
  DollarSign,
  TrendingUp,
  FileCheck,
  Send,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export function ClientBlueprintCard() {
  const { copy, language } = useLanguage();
  const blueprintData = copy.bento.blueprintCard;

  // Interactive client tier selection for the Retainer Calculator
  const [selectedClients, setSelectedClients] = useState<number>(2);
  const [copiedScript, setCopiedScript] = useState(false);

  // Dynamic calculation based on standard retainer rate (12,500 EGP / $1,250 per client)
  const clientMultiplier = selectedClients;
  const calculatedEarnings =
    language === 'ar'
      ? `${(clientMultiplier * 12500).toLocaleString('en-US')} ج.م/شهر`
      : `$${(clientMultiplier * 1250).toLocaleString()}/mo`;

  const handleCopyScript = () => {
    setCopiedScript(true);
    trackEvent('outreach_script_copied', { language });
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const tiers = [
    { count: 1, label: language === 'ar' ? 'عميل 1' : '1 Client' },
    { count: 2, label: language === 'ar' ? 'عميلين (الافتراضي)' : '2 Clients (Default)' },
    { count: 4, label: language === 'ar' ? '4 عملاء (طاقتك الكاملة)' : '4 Clients (Full)' },
  ];

  return (
    <div className="relative flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-border-subtle shadow-xl shadow-slate-200/50 dark:shadow-[#10B981]/10 transition-all duration-300 hover:border-emerald-300 dark:hover:border-border-highlight overflow-hidden group">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -bottom-24 -end-24 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />

      {/* Left / Start Content: Information & Features */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{blueprintData.badge}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 font-semibold">
              ACQUISITION ENGINE
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
            {blueprintData.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium leading-relaxed mb-6">
            {blueprintData.description}
          </p>

          {/* Features List */}
          <div className="space-y-2.5 mb-6">
            {blueprintData.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-semibold">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cold DM Script Preview Chip */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-[#0c0c10] border border-slate-200 dark:border-border-subtle">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-zinc-300">
              <Send className="w-3.5 h-3.5 text-[#10B981]" />
              <span>
                {language === 'ar' ? 'نموذج الرسالة المباشرة' : 'Direct Outreach Script'}
              </span>
            </div>
            <button
              onClick={handleCopyScript}
              type="button"
              className="flex items-center gap-1 text-[11px] font-semibold text-[#4F46E5] dark:text-[#6366F1] hover:opacity-80 transition-opacity"
            >
              {copiedScript ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {language === 'ar' ? 'تم النسخ!' : 'Copied!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'نسخ السكريبت' : 'Copy Pitch'}</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {language === 'ar'
              ? '«مرحبًا [الاسم]، لاحظت أن الفيديوهات الأخيرة ممتازة في المضمون، لكن الهوك الأول يفقد 40% من المشاهدين. جهزت لك عينة 15 ثانية معدلة بأسلوب سينمائي مجانًا...»'
              : '"Hey [Creator], loved your latest breakdown. Noticed the first 3 seconds drop ~40% retention. I rebuilt a kinetic 15-second visual hook for you free of charge..."'}
          </p>
        </div>
      </div>

      {/* Right / End Content: Interactive Retainer Calculator Box */}
      <div className="w-full lg:w-96 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white dark:from-emerald-950/30 dark:via-[#131b18] dark:to-[#121216] border border-emerald-200 dark:border-emerald-500/30 shadow-md">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>{language === 'ar' ? 'حاسبة دخل الريتينر' : 'Retainer ROI Calculator'}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              RECURRING
            </span>
          </div>

          {/* Client tier buttons */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-black/40 border border-slate-300 dark:border-white/10 mb-5">
            {tiers.map((t) => (
              <button
                key={t.count}
                onClick={() => {
                  setSelectedClients(t.count);
                  trackEvent('retainer_calculator_adjusted', { clientCount: t.count });
                }}
                type="button"
                className={cn(
                  'py-1.5 text-xs font-bold rounded-lg transition-all text-center',
                  selectedClients === t.count
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                {t.count} {language === 'ar' ? 'عميل' : 'Client'}
              </button>
            ))}
          </div>

          {/* Dynamic Calculated Amount */}
          <div className="text-center py-4 px-2 rounded-xl bg-white/80 dark:bg-[#0c0c10]/80 border border-emerald-100 dark:border-emerald-500/20 shadow-inner">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-emerald-700 dark:text-emerald-400">
              {calculatedEarnings}
            </span>
            <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium mt-1.5">
              {selectedClients === 2
                ? blueprintData.calculatorLabel
                : language === 'ar'
                ? `متوسط دخل ريتينر لـ ${selectedClients} عملاء (4 فيديوهات أسبوعيًا لكل عميل)`
                : `Estimated recurring retainer from ${selectedClients} clients (4 videos/week each)`}
            </p>
          </div>
        </div>

        {/* Security & Agreement assurance */}
        <div className="mt-5 pt-3 border-t border-emerald-200/80 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'ar' ? 'عقود رسمية ودفعات مسبقة' : 'Milestone Contracts'}</span>
          </span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-[11px]">
            100% PROTECTED
          </span>
        </div>
      </div>
    </div>
  );
}
