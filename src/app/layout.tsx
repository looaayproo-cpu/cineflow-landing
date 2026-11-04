import type { Metadata } from 'next';
import { Cairo, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/context/language-context';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'CineFlow Roadmap | من الصفر إلى أول عميل فيديو مونتاج مدفوع',
  description:
    'خارطة طريق المونتير المحترف الشاملة على Notion: احتراف Premiere Pro وAfter Effects وأدوات الذكاء الاصطناعي مع خطة اكتساب العملاء وعقود العمل.',
  keywords: [
    'video editing',
    'premiere pro roadmap',
    'after effects roadmap',
    'freelance video editor',
    'notion template',
    'مونتاج فيديو',
    'خارطة طريق المونتير',
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
      className={`${cairo.variable} ${plusJakartaSans.variable}`}
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
