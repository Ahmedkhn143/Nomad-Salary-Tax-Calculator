import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  COUNTRIES, 
  getAllCorridorPairs, 
  parseCorridor 
} from '@/lib/countries';
import Calculator from '@/components/Calculator';
import HeaderAd from '@/components/Monetization/HeaderAd';
import InResultAd from '@/components/Monetization/InResultAd';
import AffiliateCard from '@/components/Monetization/AffiliateCard';
import CorridorGrid from '@/components/CorridorGrid';
import { 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface PageProps {
  params: { corridor: string };
}

// 1. Programmatic SEO: Pre-generate all corridors at build time
export async function generateStaticParams() {
  return getAllCorridorPairs();
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const corridorData = parseCorridor(params.corridor);
  if (!corridorData) return {};

  const { origin, destination } = corridorData;
  const title = `Tax & Salary Calculator: Working in ${destination.name} for a ${origin.name} Company`;
  const description = `Calculate your net take-home salary, estimated ${(destination.flatTaxRate * 100).toFixed(0)}% tax rate, and $${destination.avgMonthlyCostUSD}/mo living costs when working remotely in ${destination.name} for a ${origin.name} employer.`;
  const canonicalUrl = `https://nomadcalcpro.com/calculator/${origin.slug}-to-${destination.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'NomadCalc Pro',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function CorridorPage({ params }: PageProps) {
  const corridorData = parseCorridor(params.corridor);
  if (!corridorData) {
    notFound();
  }

  const { origin, destination } = corridorData;

  // Rich JSON-LD Schemas: SoftwareApplication + FAQPage + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: `Nomad Tax & Salary Calculator: ${origin.name} to ${destination.name}`,
        operatingSystem: 'Any',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: `Interactive salary calculator simulating local taxes, living costs, and disposable savings for remote workers living in ${destination.name} with employers based in ${origin.name}.`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nomadcalcpro.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `${origin.name} to ${destination.name} Tax Calculator`,
            item: `https://nomadcalcpro.com/calculator/${origin.slug}-to-${destination.slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the estimated remote income tax in ${destination.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The estimated effective tax rate for digital nomads and remote professionals residing in ${destination.name} is approximately ${(destination.flatTaxRate * 100).toFixed(0)}%. ${destination.taxNotes}`,
            },
          },
          {
            '@type': 'Question',
            name: `How much are average living expenses in ${destination.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Average monthly living costs for expats and digital nomads in ${destination.name} hover around $${destination.avgMonthlyCostUSD} USD per month, covering rent, utilities, food, and coworking amenities.`,
            },
          },
          {
            '@type': 'Question',
            name: `Can I legally work remotely in ${destination.name} for a ${origin.name} company?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: destination.nomadVisaAvailable
                ? `${destination.name} currently offers an official Digital Nomad Visa or Remote Worker pathway specifically designed for location-independent employees and contractors.`
                : `${destination.name} does not yet have a dedicated digital nomad visa, but remote workers often utilize self-employment, residence permits, or bilateral treaties. Consult a licensed immigration advisor.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Structured Data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Header Ad Monetization ($5k/mo target: Above the Fold Leaderboard) */}
      <HeaderAd />

      {/* Modern Glassmorphic Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-indigo-600 group-hover:bg-indigo-700 text-white p-2 rounded-xl transition-all shadow-md shadow-indigo-100">
              <Globe2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Nomad<span className="text-indigo-600">Calc</span>{' '}
              <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100 ml-1">
                Pro
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              All Corridors
            </Link>
            <a href="#analysis" className="hover:text-indigo-600 transition-colors hidden sm:inline">
              Tax Analysis
            </a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors hidden sm:inline">
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{origin.code} to {destination.code}</span>
        </nav>

        {/* Hero Section / Programmatic H1 */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3">
            <span>{origin.flag} {origin.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <span>{destination.flag} {destination.name}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Tax & Salary Calculator: <br className="hidden sm:inline" />
            <span className="text-indigo-600">Working in {destination.name}</span> for a {origin.name} Company
          </h1>
          
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl">
            Simulate your take-home pay, estimated {(destination.flatTaxRate * 100).toFixed(0)}% local tax rate, and baseline living costs of ${destination.avgMonthlyCostUSD.toLocaleString()}/mo to evaluate your financial runway.
          </p>
        </div>

        {/* Dynamic 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content & Interactive Calculator (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* The Client-Side Interactive Calculator */}
            <Calculator 
              origin={origin} 
              destination={destination} 
              allCountries={COUNTRIES} 
            />

            {/* In-Result High-CTR Display Banner (Monetization Requirement) */}
            <InResultAd />

            {/* Programmatic SEO Tax & Relocation Analysis Guide */}
            <article id="analysis" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                Comprehensive Tax & Living Analysis: {origin.name} to {destination.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Local Tax Regime
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {destination.taxNotes} With an effective rate modeled at roughly {(destination.flatTaxRate * 100).toFixed(0)}%, remote earners can project their net income accurately.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    Visa & Legal Residence
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {destination.nomadVisaAvailable
                      ? `${destination.name} facilitates a dedicated digital nomad visa for location-independent professionals.`
                      : `${destination.name} utilizes conventional residence permits or bilateral tax treaties for foreign contract workers.`}
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-600 space-y-3 pt-2 leading-relaxed">
                <p>
                  When earning a salary in <strong>{origin.currency}</strong> from an employer in <strong>{origin.name}</strong> and maintaining residency in <strong>{destination.name}</strong>, exchange fees and cross-border tax treatment are the primary financial drivers.
                </p>
                <p>
                  With an estimated monthly cost of living of <strong>${destination.avgMonthlyCostUSD.toLocaleString()} USD</strong>, expats often achieve a substantial increase in disposable discretionary savings compared to high-cost Western hubs.
                </p>
              </div>

              {/* FAQ Section */}
              <div id="faq" className="border-t border-slate-100 pt-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  Frequently Asked Questions
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-xs text-slate-800 mb-1">
                      How accurate is the {(destination.flatTaxRate * 100).toFixed(0)}% estimated tax rate?
                    </h4>
                    <p className="text-xs text-slate-600">
                      Our calculation utilizes average effective rates for non-resident freelance and foreign-sourced contract work in {destination.name}. Exact brackets may vary based on itemized deductions and local municipal rules.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-xs text-slate-800 mb-1">
                      Do I also need to pay income tax in {origin.name}?
                    </h4>
                    <p className="text-xs text-slate-600">
                      Most countries adhere to tax residency rules (183-day rule). However, citizens of the United States are subject to worldwide taxation, often offset by the Foreign Earned Income Exclusion (FEIE) or Foreign Tax Credit (FTC).
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Internal Linking Corridor Grid for pSEO Link Equity */}
            <CorridorGrid currentCorridor={`${origin.slug}-to-${destination.slug}`} />

          </div>

          {/* Sidebar Area: Affiliate Monetization + Expat Alerts (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Sponsored Multi-Currency Affiliate Box */}
            <AffiliateCard origin={origin} destination={destination} />

            {/* Expat Compliance Alert */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 text-amber-950 text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Legal & Tax Residency Disclaimer
              </div>
              <p>
                This simulator is designed strictly for financial benchmarking and programmatic modeling. Tax legislation and double-taxation agreements change frequently. Always consult a qualified cross-border tax specialist before relocating.
              </p>
            </div>
          </aside>

        </div>
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-3">
          <div className="flex justify-center items-center gap-2 font-bold text-slate-300 text-sm">
            <Globe2 className="w-4 h-4 text-indigo-400" />
            NomadCalc Pro
          </div>
          <p>© {new Date().getFullYear()} NomadCalc Pro. Designed for digital nomads, expats, and distributed remote teams.</p>
          <p className="text-slate-500 max-w-xl mx-auto">
            Calculations are programmatic simulations based on publicly available data indices and statutory estimates.
          </p>
        </div>
      </footer>
    </>
  );
}
