import React from 'react';
import Link from 'next/link';

interface CorridorGridProps {
  currentCorridor?: string;
}

export default function CorridorGrid({ currentCorridor }: CorridorGridProps) {
  const topCorridors = [
    { slug: 'us-to-pt', label: 'US 🇺🇸 to Portugal 🇵🇹', note: '20% Tax / D8 Visa' },
    { slug: 'us-to-es', label: 'US 🇺🇸 to Spain 🇪🇸', note: '24% Beckham Law' },
    { slug: 'us-to-ae', label: 'US 🇺🇸 to Dubai (UAE) 🇦🇪', note: '0% Tax Rate' },
    { slug: 'uk-to-ae', label: 'UK 🇬🇧 to Dubai (UAE) 🇦🇪', note: '0% Expat Tax' },
    { slug: 'uk-to-es', label: 'UK 🇬🇧 to Spain 🇪🇸', note: 'Nomad Visa' },
    { slug: 'de-to-pt', label: 'Germany 🇩🇪 to Portugal 🇵🇹', note: 'EU Freedom' },
    { slug: 'us-to-id', label: 'US 🇺🇸 to Bali (Indonesia) 🇮🇩', note: 'Territorial Tax' },
    { slug: 'us-to-th', label: 'US 🇺🇸 to Thailand 🇹🇭', note: 'DTV 5-Year Visa' },
    { slug: 'us-to-pk', label: 'US 🇺🇸 to Pakistan 🇵🇰', note: '0.25%-1% IT Rebate' },
    { slug: 'us-to-in', label: 'US 🇺🇸 to India 🇮🇳', note: 'Sec 44ADA Relief' },
  ];

  return (
    <section aria-label="Top Nomad Corridors" className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Top Remote & Nomad Corridors
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare tax regimes and take-home savings for top global relocation pairs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {topCorridors.map((c) => {
          const isActive = currentCorridor === c.slug;
          return (
            <Link
              key={c.slug}
              href={`/calculator/${c.slug}`}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200 pointer-events-none'
                  : 'bg-slate-50/70 border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-xs'
              }`}
            >
              <div className="font-bold text-xs text-slate-800 mb-0.5">{c.label}</div>
              <div className="text-[10px] text-indigo-600 font-semibold">{c.note}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
