'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import {
  X,
  CheckCircle2,
  Lock,
  Loader2,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Smartphone,
  Upload,
  FileCheck2,
  Trash2,
  Sparkles,
  Receipt,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerSource?: string;
}

export function CheckoutModal({ isOpen, onClose, triggerSource = 'default' }: CheckoutModalProps) {
  const { copy, direction, language } = useLanguage();
  const modalCopy = copy.modal;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [receiptFileName, setReceiptFileName] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'freelancer'>('intermediate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      trackEvent('checkout_modal_opened', { triggerSource });
      setIsSuccess(false);
      setError('');
      // Generate a realistic order confirmation code
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      setGeneratedOrderId(`CTC-2026-${randomCode}`);
    }
  }, [isOpen, triggerSource]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        trackEvent('checkout_modal_closed', {});
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFileName(file.name);
    } else {
      // simulated default file name if cancelled or not chosen
      setReceiptFileName('vodafone_cash_receipt_0921.png');
    }
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveReceipt = () => {
    setReceiptFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError(modalCopy.validationErrors.nameRequired);
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError(modalCopy.validationErrors.emailRequired);
      return;
    }
    if (!paymentPhone.trim()) {
      setError(modalCopy.validationErrors.phoneRequired);
      return;
    }

    setError('');
    setIsSubmitting(true);

    // =========================================================================
    // Phase 2 Gateway Integration Hook:
    // When Phase 2 payment gateway is active (Stripe, LemonSqueezy,
    // or automated Vodafone Cash / InstaPay API), connect request here:
    // const res = await fetch('/api/checkout', { method: 'POST', body: ... });
    // =========================================================================

    // Simulate 850ms network latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const isDarkMode =
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

      trackEvent('checkout_lead_submitted', {
        fullName: fullName.trim(),
        email: email.trim(),
        paymentPhone: paymentPhone.trim(),
        receiptAttached: Boolean(receiptFileName),
        experienceLevel,
        tierId: 'cuttoclient-complete-roadmap',
        submittedLanguage: language,
        submittedTheme: isDarkMode ? 'dark' : 'light',
      });
    }, 850);
  };

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalCardRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121216] p-6 sm:p-8 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/20 text-start my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button on logical end */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-5 end-5 p-2 rounded-full text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5] dark:focus:ring-[#6366F1]"
              aria-label={modalCopy.closeButton}
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <div>
                {/* Header Tag & Pill */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#4F46E5] dark:bg-[#6366F1] animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5] dark:text-[#818CF8]">
                    {modalCopy.badge}
                  </span>
                </div>

                <h2
                  id="modal-title"
                  className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white"
                >
                  {modalCopy.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1 mb-5 font-normal leading-relaxed">
                  {modalCopy.subtitle}
                </p>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                    {error}
                  </div>
                )}

                {/* Lead Capture Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      {modalCopy.nameLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400 dark:text-zinc-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={modalCopy.namePlaceholder}
                        className="w-full ps-10 pe-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#4F46E5] dark:focus:border-[#6366F1] focus:ring-1 focus:ring-[#4F46E5] dark:focus:ring-[#6366F1] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Notion Delivery Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      {modalCopy.emailLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400 dark:text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={modalCopy.emailPlaceholder}
                        className="w-full ps-10 pe-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#4F46E5] dark:focus:border-[#6366F1] focus:ring-1 focus:ring-[#4F46E5] dark:focus:ring-[#6366F1] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Vodafone Cash / InstaPay Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      {modalCopy.phoneLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400 dark:text-zinc-500">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                        placeholder={modalCopy.phonePlaceholder}
                        className="w-full ps-10 pe-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 text-sm focus:outline-none focus:border-[#4F46E5] dark:focus:border-[#6366F1] focus:ring-1 focus:ring-[#4F46E5] dark:focus:ring-[#6366F1] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Simulated Receipt Upload Section */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      {modalCopy.receiptLabel}
                    </label>

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleSimulatedFileUpload}
                      className="hidden"
                    />

                    {!receiptFileName ? (
                      <div className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={handleTriggerFileInput}
                          className="w-full py-2.5 px-4 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-500/40 bg-indigo-50/70 dark:bg-indigo-950/30 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/40 text-[#4338CA] dark:text-[#C7D2FE] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <Upload className="w-4 h-4" />
                          <span>{modalCopy.receiptUploadBtn}</span>
                        </button>
                        <span className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal">
                          {modalCopy.receiptHint}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="truncate font-mono">{receiptFileName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveReceipt}
                          className="p-1 rounded-md text-slate-500 hover:text-rose-500 transition-colors"
                          title={modalCopy.removeReceipt}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Experience Level Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      {modalCopy.experienceLabel}
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value as any)}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#4F46E5] dark:focus:border-[#6366F1] transition-colors"
                    >
                      <option value="beginner" className="bg-white dark:bg-[#181820] text-slate-900 dark:text-white">
                        {modalCopy.experienceOptions.beginner}
                      </option>
                      <option value="intermediate" className="bg-white dark:bg-[#181820] text-slate-900 dark:text-white">
                        {modalCopy.experienceOptions.intermediate}
                      </option>
                      <option value="freelancer" className="bg-white dark:bg-[#181820] text-slate-900 dark:text-white">
                        {modalCopy.experienceOptions.freelancer}
                      </option>
                    </select>
                  </div>

                  {/* Submit Button (Solid Cinema Indigo) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/25 dark:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer border-t border-white/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{modalCopy.submittingButton}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-indigo-200" />
                          <span>{modalCopy.submitButton}</span>
                          <ArrowIcon className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Phase 2 Architecture & Security Notice */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400 text-center pt-2 font-medium">
                    <Lock className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>{modalCopy.paymentNote}</span>
                  </div>
                </form>
              </div>
            ) : (
              /* Sleek Order Success View */
              <div className="text-center py-6 space-y-4">
                <div className="relative w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-9 h-9" />
                  <span className="absolute -inset-1 rounded-full border border-emerald-400/40 animate-ping opacity-30" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {modalCopy.successTitle}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-sm mx-auto">
                  {modalCopy.successMessage}
                </p>

                {/* Simulated Order Reference ID Badge */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 max-w-xs mx-auto">
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400 block font-mono">
                    {modalCopy.orderIdLabel}
                  </span>
                  <span className="text-base font-black font-mono text-[#4F46E5] dark:text-[#818CF8] tracking-wider">
                    {generatedOrderId}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xs mx-auto">
                  {modalCopy.orderDeliveryNotice}
                </p>

                <div className="pt-4">
                  <button
                    onClick={onClose}
                    type="button"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    {modalCopy.closeButton}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
