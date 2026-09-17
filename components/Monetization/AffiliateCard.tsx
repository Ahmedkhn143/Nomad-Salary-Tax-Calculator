import React from 'react';
import { Country } from '@/lib/countries';
import { ShieldCheck, ArrowRight, Zap, Check } from 'lucide-react';

interface AffiliateCardProps {
  origin: Country;
  destination: Country;
}

export default function AffiliateCard({ origin, destination }: AffiliateCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 shadow-xl border border-indigo-800/40">
      {/* Glow decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-extrabold uppercase tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          Sponsored Partner
        </span>
        <span className="text-[11px] font-semibold text-slate-400">Wise / Deel Banking</span>
      </div>

      <h4 className="text-lg font-bold leading-snug mb-2 text-white">
        Getting paid in {origin.currency} while living in {destination.name}?
      </h4>

      <p className="text-xs text-slate-300 mb-5 leading-relaxed">
        Traditional high-street banks levy up to <strong className="text-white">3.5% – 5% in hidden currency conversion markups</strong> when exchanging salary to {destination.currency}. Open a multi-currency account and receive payments with real mid-market exchange rates.
      </p>

      <ul className="text-xs text-indigo-200 space-y-2 mb-6">
        <li className="flex items-center gap-2">
          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/30 flex items-center justify-center text-indigo-300">
            <Check className="w-2.5 h-2.5" />
          </span>
          Guaranteed mid-market exchange rate
        </li>
        <li className="flex items-center gap-2">
          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/30 flex items-center justify-center text-indigo-300">
            <Check className="w-2.5 h-2.5" />
          </span>
          Receive payments with domestic account details ({origin.currency})
        </li>
        <li className="flex items-center gap-2">
          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/30 flex items-center justify-center text-indigo-300">
            <Check className="w-2.5 h-2.5" />
          </span>
          Zero foreign transaction debit card in {destination.name}
        </li>
      </ul>

      <a
        href="https://wise.com"
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
      >
        <span>Open Multi-Currency Account Free</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>

      <p className="text-[10px] text-center text-slate-400 mt-3">
        Affiliate disclosure: We may receive compensation at zero extra cost to you.
      </p>
    </div>
  );
}
