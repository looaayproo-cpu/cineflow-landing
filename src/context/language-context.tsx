'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteCopy, SiteDictionary } from '@/content/site-copy';
import { trackEvent } from '@/lib/analytics';

export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  copy: SiteDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Arabic ('ar') as required by user prompt
  const [language, setLanguageState] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check saved preference in localStorage
    const saved = localStorage.getItem('cineflow-language') as Language | null;
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLanguageState(saved);
      document.documentElement.setAttribute('dir', saved === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', saved);
    } else {
      // Default initial language: Arabic RTL
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    const prev = language;
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cineflow-language', lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', lang);
      trackEvent('language_toggled', { from: prev, to: lang });
    }
  };

  const toggleLanguage = () => {
    const next: Language = language === 'ar' ? 'en' : 'ar';
    setLanguage(next);
  };

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  const copy = siteCopy[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        toggleLanguage,
        setLanguage,
        copy,
      }}
    >
      {/* Set font class dynamically */}
      <div className={language === 'ar' ? 'font-ar' : 'font-en'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
