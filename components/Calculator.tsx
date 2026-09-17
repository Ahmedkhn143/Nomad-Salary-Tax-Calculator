'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Country } from '@/lib/countries';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Building, 
  MapPin, 
  Info,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface CalculatorProps {
  origin: Country;
  destination: Country;
  allCountries: Record<string, Country>;
}

export default function Calculator({ origin, destination, allCountries }: CalculatorProps) {
  const router = useRouter();
  const [salary, setSalary] = useState<number>(95000);

  // Dynamic calculations based on current slider value and destination tax & cost
  const stats = useMemo(() => {
    const grossAnnual = salary;
    const taxAnnual = grossAnnual * destination.flatTaxRate;
    const netAnnual = grossAnnual - taxAnnual;
    const netMonthly = netAnnual / 12;

    const livingCostAnnual = destination.avgMonthlyCostUSD * 12;
    const disposableAnnual = netAnnual - livingCostAnnual;
    const disposableMonthly = disposableAnnual / 12;
    const savingsRate = grossAnnual > 0 ? (disposableAnnual / grossAnnual) * 100 : 0;

    return {
      grossAnnual,
      grossMonthly: grossAnnual / 12,
      taxAnnual,
      taxMonthly: taxAnnual / 12,
      netAnnual,
      netMonthly,
      livingCostAnnual,
      livingCostMonthly: destination.avgMonthlyCostUSD,
      disposableAnnual,
      disposableMonthly,
      savingsRate: Math.max(0, savingsRate).toFixed(1),
      effectiveTaxPercent: (destination.flatTaxRate * 100).toFixed(0),
    };
  }, [salary, destination]);

  // Chart data for Recharts Pie/Donut
  const chartData = useMemo(() => {
    return [
      { name: 'Estimated Tax', value: Math.round(stats.taxAnnual), color: '#f43f5e' },
      { name: 'Living Expenses', value: Math.round(stats.livingCostAnnual), color: '#f59e0b' },
      { 
        name: 'Disposable Savings', 
        value: stats.disposableAnnual > 0 ? Math.round(stats.disposableAnnual) : 0, 
        color: '#10b981' 
      },
    ];
  }, [stats]);

  const handleCountryChange = (newOriginSlug: string, newDestSlug: string) => {
    if (newOriginSlug && newDestSlug && newOriginSlug !== newDestSlug) {
      router.push(`/calculator/${newOriginSlug}-to-${newDestSlug}`);
    }
  };

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Origin & Destination Selector Matrix */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Corridor Configuration
          </h2>
          <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-1 rounded-full">
            Live Route Simulation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Origin Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              Employing Company Location (Origin)
            </label>
            <div className="relative">
              <select
                aria-label="Employing Company Location"
                value={origin.slug}
                onChange={(e) => handleCountryChange(e.target.value, destination.slug)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer appearance-none"
              >
                {Object.values(allCountries).map((c) => (
                  <option key={`origin-${c.slug}`} value={c.slug}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Destination Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              Where You Will Live (Destination)
            </label>
            <div className="relative">
              <select
                aria-label="Your Nomad Residence"
                value={destination.slug}
                onChange={(e) => handleCountryChange(origin.slug, e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer appearance-none"
              >
                {Object.values(allCountries).map((c) => (
                  <option key={`dest-${c.slug}`} value={c.slug}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Salary Slider & Input */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-indigo-600" />
              Annual Base Salary (USD Equivalent)
            </span>
            <span className="text-xs text-slate-500">
              Contract gross value paid by {origin.name} employer
            </span>
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min={10000}
              max={500000}
              step={1000}
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              aria-label="Base Salary Number Input"
              className="w-full sm:w-44 pl-8 pr-3 py-2 text-right font-extrabold text-xl text-indigo-600 bg-indigo-50/50 border border-indigo-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <input
          type="range"
          min={20000}
          max={300000}
          step={2000}
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          aria-label="Salary Slider"
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />

        <div className="flex justify-between text-xs font-semibold text-slate-400">
          <span>$20,000</span>
          <span>$100,000</span>
          <span>$200,000</span>
          <span>$300,000+</span>
        </div>
      </div>

      {/* 3. Top Key Performance Indicators (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Local Tax */}
        <div className="bg-gradient-to-b from-rose-50/70 to-white p-5 rounded-2xl border border-rose-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-rose-600 mb-1">
              <span>Local Tax ({stats.effectiveTaxPercent}%)</span>
              <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                Est.
              </span>
            </div>
            <div className="text-2xl font-extrabold text-rose-700">
              -{formatUSD(stats.taxAnnual)}
            </div>
          </div>
          <div className="text-[11px] text-rose-500 mt-2">
            -{formatUSD(stats.taxMonthly)} / month in {destination.name}
          </div>
        </div>

        {/* Net Take-Home Pay */}
        <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-md ring-4 ring-indigo-600/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-100 mb-1">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Net Take-Home
              </span>
              <span className="bg-indigo-500/40 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                After Tax
              </span>
            </div>
            <div className="text-3xl font-extrabold tracking-tight">
              {formatUSD(stats.netAnnual)}
            </div>
          </div>
          <div className="text-xs text-indigo-200 mt-2">
            {formatUSD(stats.netMonthly)} / month
          </div>
        </div>

        {/* Retained Disposable Income / Savings */}
        <div className="bg-gradient-to-b from-emerald-50/70 to-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 mb-1">
              <span>Net Savings Potential</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {stats.savingsRate}%
              </span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-700">
              {formatUSD(stats.disposableAnnual)}
            </div>
          </div>
          <div className="text-[11px] text-emerald-600 mt-2">
            {formatUSD(stats.disposableMonthly)} / month after living costs
          </div>
        </div>

      </div>

      {/* 4. Financial Allocation: Recharts Donut & Breakdown Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Income Allocation: Living in {destination.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of Gross Annual Salary into Taxes, Living Expenses, and Savings.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            {destination.nomadVisaAvailable ? 'Digital Nomad Visa' : 'Standard Expat Rules'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Recharts Donut Chart */}
          <div className="md:col-span-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: number) => [formatUSD(val), 'Annual Amount']} 
                  contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px', fontWeight: 600 }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown Items */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                Estimated Local Tax ({stats.effectiveTaxPercent}%)
              </span>
              <span className="text-sm font-bold text-rose-600">
                {formatUSD(stats.taxAnnual)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-yellow-50/60 border border-yellow-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <div>
                  <div className="text-xs font-semibold text-amber-900">
                    Est. Living Costs ({destination.name})
                  </div>
                  <div className="text-[10px] text-amber-700">
                    ~{formatUSD(destination.avgMonthlyCostUSD)} / month baseline
                  </div>
                </div>
              </div>
              <span className="text-sm font-bold text-amber-800">
                {formatUSD(stats.livingCostAnnual)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <div>
                  <div className="text-xs font-semibold text-emerald-900">
                    Disposable Savings Potential
                  </div>
                  <div className="text-[10px] text-emerald-700">
                    {stats.savingsRate}% of total gross salary retained
                  </div>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-700">
                {formatUSD(stats.disposableAnnual)}
              </span>
            </div>

            {stats.disposableAnnual < 0 && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Estimated living expenses exceed your net earnings for this salary bracket in {destination.name}.</span>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
