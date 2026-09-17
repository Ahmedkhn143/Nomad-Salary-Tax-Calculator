import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';
import HeaderAd from '@/components/Monetization/HeaderAd';
import { 
  Globe2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Coins, 
  Sparkles,
  MapPin,
  Building
} from 'lucide-react';

export default function HomePage() {
  const topCorridors = [
    { slug: 'us-to-pt', origin: 'us', dest: 'pt', title: 'US to Portugal', highlight: '20% Flat / D8 Nomad Visa' },
    { slug: 'us-to-es', origin: 'us', dest: 'es', title: 'US to Spain', highlight: '24% Beckham Law' },
    { slug: 'us-to-ae', origin: 'us', dest: 'ae', title: 'US to Dubai (UAE)', highlight: '0% Income Tax' },
    { slug: 'uk-to-ae', origin: 'uk', dest: 'ae', title: 'UK to Dubai (UAE)', highlight: '0% Tax & High Savings' },
    { slug: 'uk-to-es', origin: 'uk', dest: 'es', title: 'UK to Spain', highlight: 'Spanish Digital Nomad Visa' },
    { slug: 'de-to-pt', origin: 'de', dest: 'pt', title: 'Germany to Portugal', highlight: 'EU Free Movement' },
    { slug: 'us-to-id', origin: 'us', dest: 'id', title: 'US to Bali (Indonesia)', highlight: 'Territorial Tax & Low Costs' },
    { slug: 'us-to-th', origin: 'us', dest: 'th', title: 'US to Thailand', highlight: 'DTV 5-Year Nomad Visa' },
    { slug: 'us-to-pk', origin: 'us', dest: 'pk', title: 'US to Pakistan', highlight: '0.25%-1% PSEB Export Rebate' },
    { slug: 'us-to-in', origin: 'us', dest: 'in', title: 'US to India', highlight: 'Sec 44ADA Relief' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <HeaderAd />

      {/* Header / Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-100">
              <Globe2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Nomad<span className="text-indigo-600">Calc</span>{' '}
              <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100 ml-1">
                Pro
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/calculator/us-to-pt"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Launch Calculator
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Programmatic SEO & Global Nomad Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Calculate Your <span className="text-indigo-600">Real Take-Home Pay</span> Anywhere on Earth
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Compare statutory taxes, living expenses, and monthly savings when working for a company abroad while living as a remote worker or digital nomad.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/calculator/us-to-pt"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center gap-2 transition-all hover:gap-3"
            >
              <span>Explore US to Portugal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculator/us-to-ae"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-xs transition-all"
            >
              Explore 0% Tax in Dubai 🇦🇪
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto w-full">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 font-bold mb-3">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Local Tax Simulation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Programmatic tax estimations tailored to remote worker visas, presumptive schemes, and flat-tax regimes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Living Cost Arbitrage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates local cost of living indices to display your true monthly disposable savings potential.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Nomad Visa Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discover legal digital nomad pathways, from Portugal D8 to Spain’s Beckham Law and UAE Virtual Work.
            </p>
          </div>
        </div>

        {/* All Top Corridors Grid */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs max-w-5xl mx-auto w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Trending Relocation Corridors</h2>
              <p className="text-xs text-slate-500">Select any corridor for real-time tax and salary simulation.</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full self-start sm:self-auto">
              90+ Pre-Calculated Routes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCorridors.map((c) => {
              const originData = COUNTRIES[c.origin];
              const destData = COUNTRIES[c.dest];
              return (
                <Link
                  key={c.slug}
                  href={`/calculator/${c.slug}`}
                  className="group p-4 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                      <span>{originData.flag}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span>{destData.flag}</span>
                      <span>{c.title}</span>
                    </div>
                    <div className="text-xs text-indigo-600 font-semibold">{c.highlight}</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Tax: ~{(destData.flatTaxRate * 100).toFixed(0)}%</span>
                    <span>Cost: ~${destData.avgMonthlyCostUSD}/mo</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-2">
          <p>© {new Date().getFullYear()} NomadCalc Pro. Designed for digital nomads and global remote teams.</p>
          <p className="text-slate-500">Estimates and calculations are for programmatic benchmarking.</p>
        </div>
      </footer>
    </div>
  );
}
