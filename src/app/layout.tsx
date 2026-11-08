import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic, Noto_Sans_Arabic, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/context/language-context';

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-heading-ar',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-body-ar',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'CutToClient | طريقك من الصفر لمونتير معاه بورتفوليو وعملاء جاهزين',
  description:
    'خطة CutToClient: دليلك الشامل من الصفر حتى أول عميل. وفر شهور من التوهان في شروحات اليوتيوب بملف نوشن تفاعلي واحترافي.',
  keywords: [
    'CutToClient',
    'video editing',
    'premiere pro roadmap',
    'after effects roadmap',
    'freelance video editor',
    'notion template',
    'مونتاج فيديو',
    'خريطة طريق المونتير',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${ibmPlexSansArabic.variable} ${notoSansArabic.variable} ${plusJakartaSans.variable}`}
    >
      <body className="antialiased selection:bg-[#4F46E5]/15 selection:text-[#4F46E5] dark:selection:bg-[#6366F1]/30 dark:selection:text-[#C7D2FE]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
