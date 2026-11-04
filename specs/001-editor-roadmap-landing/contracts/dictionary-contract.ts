/**
 * Dictionary & Localization Contract
 * File: src/types/dictionary.ts
 * 
 * Type-safe interface ensuring 100% parity between English and Arabic dictionaries.
 */

export interface DictionarySchema {
  common: {
    brandName: string;
    brandTagline: string;
    getRoadmap: string;
    viewRoadmap: string;
    previewStage: string;
    lifetimeAccess: string;
    guaranteeDays: string;
    currencySymbol: string;
    regularPriceLabel: string;
    launchOfferLabel: string;
    switchTheme: string;
    switchLanguage: string;
  };
  navbar: {
    roadmap: string;
    curriculum: string;
    stack: string;
    reviews: string;
    pricing: string;
    faq: string;
    ctaButton: string;
  };
  hero: {
    pillBadge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socialProofSnippet: string;
    scrubberNotice: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    playheadTime: string;
    stageLabel: string;
    dragPrompt: string;
    toolsUsed: string;
    keyDeliverables: string;
    outcomeTitle: string;
  };
  bento: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    notionCard: {
      badge: string;
      title: string;
      description: string;
      item1: string;
      item2: string;
      item3: string;
      item4: string;
      interactiveHint: string;
    };
    techStackCard: {
      badge: string;
      title: string;
      description: string;
      prNode: string;
      aeNode: string;
      aiNode: string;
      liveSyncStatus: string;
    };
    clientBlueprintCard: {
      badge: string;
      title: string;
      description: string;
      contractTemplate: string;
      pricingCalculator: string;
      outreachScript: string;
      metricValue: string;
      metricLabel: string;
    };
  };
  editorsWall: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    verifiedBadge: string;
    hoverHint: string;
  };
  pricing: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    tierBadge: string;
    tierName: string;
    price: string;
    originalPrice: string;
    savingsBadge: string;
    priceSubtext: string;
    ctaButton: string;
    guaranteeHeadline: string;
    guaranteeText: string;
    stackIncludedHeader: string;
  };
  faq: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
  };
  modal: {
    title: string;
    subtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    experienceLabel: string;
    experienceBeginner: string;
    experienceIntermediate: string;
    experienceFreelancer: string;
    submitButton: string;
    submittingButton: string;
    secureNotice: string;
    successTitle: string;
    successMessage: string;
    closeButton: string;
    errorRequired: string;
    errorEmail: string;
  };
  footer: {
    tagline: string;
    rightsReserved: string;
    builtForEditors: string;
    privacy: string;
    terms: string;
  };
}
