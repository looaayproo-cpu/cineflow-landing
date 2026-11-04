'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';
import { Activity, Cpu, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TechStackCard() {
  const { copy, direction } = useLanguage();
  const stackData = copy.bento.stackCard;
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);

  return (
    <div className="relative flex flex-col justify-between h-full p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-border-subtle shadow-xl shadow-slate-200/50 dark:shadow-indigo-500/5 transition-all duration-300 hover:border-indigo-400/40 dark:hover:border-border-highlight overflow-hidden group">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -bottom-24 -start-24 w-64 h-64 bg-[#0EA5E9]/10 dark:bg-[#0EA5E9]/15 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />

      {/* Top Header & Metadata */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-slate-200/80 dark:border-white/10 text-[#0284C7] dark:text-[#38BDF8] text-xs font-semibold">
            <span>{stackData.badge}</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-2 leading-snug">
          {stackData.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium leading-relaxed mb-5">
          {stackData.description}
        </p>

        {/* Connected Vertical Pipeline Frame */}
        <div className="relative rounded-2xl border border-slate-200 dark:border-border-subtle bg-slate-50/80 dark:bg-[#0c0c10] p-4 sm:p-5 backdrop-blur-md overflow-hidden">
          {/* Animated Connecting Vertical Signal Rail */}
          <div className="absolute top-8 bottom-8 start-9 w-6 pointer-events-none z-0">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 24 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="verticalBeamLight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>

                <linearGradient id="verticalBeamDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>

                <filter id="verticalGlow" x="-50%" y="-20%" width="200%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Base background dashed track */}
              <line
                x1="12"
                y1="10"
                x2="12"
                y2="230"
                className="stroke-slate-300 dark:stroke-white/15"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Pulsing Signal Beam in Dark Mode */}
              <line
                x1="12"
                y1="10"
                x2="12"
                y2="230"
                stroke="url(#verticalBeamDark)"
                strokeWidth="3.5"
                className="hidden dark:block animate-pulse"
                filter="url(#verticalGlow)"
                strokeDasharray="50 150"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="200"
                  to="-200"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Pulsing Signal Beam in Light Mode */}
              <line
                x1="12"
                y1="10"
                x2="12"
                y2="230"
                stroke="url(#verticalBeamLight)"
                strokeWidth="3.5"
                className="block dark:hidden"
                strokeDasharray="50 150"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="200"
                  to="-200"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          </div>

          {/* Connected Tool Nodes List */}
          <div className="relative z-10 space-y-3">
            {stackData.pipelineNodes.map((node, index) => {
              const isHovered = activeNodeIndex === index;
              return (
                <motion.div
                  key={node.name}
                  onMouseEnter={() => setActiveNodeIndex(index)}
                  onMouseLeave={() => setActiveNodeIndex(null)}
                  whileHover={{ x: direction === 'rtl' ? -4 : 4, transition: { duration: 0.2 } }}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border',
                    'bg-white dark:bg-[#15151c]',
                    isHovered
                      ? 'border-[#4F46E5] dark:border-[#6366F1]/50 shadow-md shadow-indigo-500/10'
                      : 'border-slate-200 dark:border-border-subtle shadow-sm'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Tool Badge Logo */}
                    <div
                      className="relative w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm text-white shadow-md shrink-0"
                      style={{ backgroundColor: node.color }}
                    >
                      <span>{node.badge}</span>
                      <span
                        className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#15151c] animate-ping"
                        style={{ backgroundColor: node.color }}
                      />
                    </div>

                    {/* Node Name and Description */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {node.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium truncate">
                        {node.role}
                      </span>
                    </div>
                  </div>

                  {/* Flow stage index */}
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-zinc-500 ms-2 shrink-0">
                    0{index + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Pipeline Status Notice */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-border-subtle flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            <span className="font-semibold">{stackData.status}</span>
            <div className="flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] font-bold shrink-0">
              <Sparkles className="w-3 h-3 text-[#0EA5E9] animate-spin" style={{ animationDuration: '6s' }} />
              <span>SYNCED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Bottom Tag */}
      <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-medium">
        <span className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-[#0EA5E9]" />
          <span>Zero Latency Creative Flow</span>
        </span>
        <span className="text-[#4F46E5] dark:text-[#818CF8] font-mono text-[11px] font-bold">
          4 INTEGRATIONS
        </span>
      </div>
    </div>
  );
}
