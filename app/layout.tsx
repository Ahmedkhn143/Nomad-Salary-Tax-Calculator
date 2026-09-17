import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nomadcalcpro.com'),
  title: {
    default: 'NomadCalc Pro | Global Remote Worker Salary & Tax Calculator',
    template: '%s | NomadCalc Pro'
  },
  description: 'Programmatic salary, local taxes, cost of living, and net disposable income calculator for digital nomads and global remote workers.',
  keywords: [
    'nomad tax calculator',
    'remote salary calculator',
    'expat tax rates',
    'digital nomad visa',
    'cost of living comparison',
    'take home pay remote'
  ],
  authors: [{ name: 'NomadCalc Pro' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        {/* Google AdSense Script Placeholder */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
