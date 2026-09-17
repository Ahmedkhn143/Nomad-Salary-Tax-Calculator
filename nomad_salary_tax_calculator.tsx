import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Wallet, 
  MapPin, 
  Briefcase, 
  ArrowRight, 
  Globe2,
  TrendingUp,
  ShieldCheck,
  Building,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// In a real 2026 app, this would be fetched from your MongoDB backend
const COUNTRY_DATA = {
  US: { name: 'United States', code: 'US', taxRate: 0.28, monthlyCost: 3500, currency: '$', flag: '🇺🇸' },
  UK: { name: 'United Kingdom', code: 'UK', taxRate: 0.22, monthlyCost: 2800, currency: '£', flag: '🇬🇧' },
  AE: { name: 'United Arab Emirates', code: 'AE', taxRate: 0.00, monthlyCost: 3200, currency: 'AED', flag: '🇦🇪' },
  PT: { name: 'Portugal', code: 'PT', taxRate: 0.20, monthlyCost: 1500, currency: '€', flag: '🇵🇹' },
  PK: { name: 'Pakistan', code: 'PK', taxRate: 0.15, monthlyCost: 600, currency: 'Rs', flag: '🇵🇰' },
  IN: { name: 'India', code: 'IN', taxRate: 0.18, monthlyCost: 700, currency: '₹', flag: '🇮🇳' },
  ID: { name: 'Indonesia (Bali)', code: 'ID', taxRate: 0.10, monthlyCost: 1100, currency: 'Rp', flag: '🇮🇩' },
};

export default function NomadCalculator() {
  // State Management
  const [baseSalary, setBaseSalary] = useState(85000); // USD Default
  const [originCountry, setOriginCountry] = useState('US');
  const [destCountry, setDestCountry] = useState('PT'); // Default Nomad Destination
  
  // Financial Calculations (Memoized for performance)
  const calculations = useMemo(() => {
    const dest = COUNTRY_DATA[destCountry];
    const origin = COUNTRY_DATA[originCountry];
    
    // We assume the salary is entered in USD equivalent for simplicity in this demo
    const grossAnnual = baseSalary;
    const taxAnnual = grossAnnual * dest.taxRate;
    const netAnnual = grossAnnual - taxAnnual;
    const netMonthly = netAnnual / 12;
    
    const livingCostAnnual = dest.monthlyCost * 12;
    const disposableAnnual = netAnnual - livingCostAnnual;
    const disposableMonthly = disposableAnnual / 12;

    return {
      destInfo: dest,
      originInfo: origin,
      grossAnnual,
      taxAnnual,
      netAnnual,
      netMonthly,
      livingCostAnnual,
      livingCostMonthly: dest.monthlyCost,
      disposableAnnual,
      disposableMonthly,
      effectiveTaxRate: dest.taxRate * 100
    };
  }, [baseSalary, originCountry, destCountry]);

  // Chart Data
  const breakdownData = [
    { name: 'Income Breakdown', Tax: calculations.taxAnnual, 'Living Costs': calculations.livingCostAnnual, 'Savings': calculations.disposableAnnual }
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981']; // Red(Tax), Yellow(Living), Green(Savings)

  const pieData = [
    { name: 'Tax', value: calculations.taxAnnual },
    { name: 'Living Expenses', value: calculations.livingCostAnnual },
    { name: 'Disposable Income', value: calculations.disposableAnnual >= 0 ? calculations.disposableAnnual : 0 }
  ];

  // Currency Formatter
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. HEADER AD SPACE (High Visibility) */}
      <div className="bg-slate-200 text-slate-500 text-xs text-center py-2 border-b border-slate-300">
        <span className="opacity-70">ADVERTISEMENT [728x90 LEADERBOARD] - Space for Google AdSense</span>
      </div>

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Globe2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                NomadCalc Pro
              </span>
            </div>
            <div className="hidden sm:flex gap-4 text-sm font-medium text-slate-500">
              <button className="hover:text-indigo-600 transition-colors">Tools</button>
              <button className="hover:text-indigo-600 transition-colors">Tax Guides</button>
              <button className="hover:text-indigo-600 transition-colors">Blog</button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* SEO / H1 Section (Programmatic SEO Target) */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Salary & Tax Calculator: <br className="hidden sm:block"/>
            <span className="text-indigo-600">Working in {calculations.destInfo.name}</span> for a company in {calculations.originInfo.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Calculate your actual take-home pay, local taxes, and estimated living costs as a remote worker or digital nomad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: INPUTS (Interactive Panel) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Input Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-slate-800">
                <Briefcase className="w-5 h-5 text-indigo-500" />
                Your Job Details
              </h2>

              {/* Origin Country Dropdown */}
              <div className="space-y-2 mb-5">
                <label className="text-sm font-semibold text-slate-600">Company Location (Origin)</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={originCountry}
                    onChange={(e) => setOriginCountry(e.target.value)}
                  >
                    {Object.entries(COUNTRY_DATA).map(([code, data]) => (
                      <option key={code} value={code}>{data.flag} {data.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Destination Country Dropdown */}
              <div className="space-y-2 mb-5">
                <label className="text-sm font-semibold text-slate-600">Where will you live? (Destination)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={destCountry}
                    onChange={(e) => setDestCountry(e.target.value)}
                  >
                    {Object.entries(COUNTRY_DATA).map(([code, data]) => (
                      <option key={code} value={code}>{data.flag} {data.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Salary Range Slider */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-semibold text-slate-600">Base Salary (USD)</label>
                  <span className="text-xl font-bold text-indigo-600">{formatCurrency(baseSalary)}</span>
                </div>
                <input 
                  type="range" 
                  min="20000" 
                  max="250000" 
                  step="1000"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>$20k</span>
                  <span>$250k+</span>
                </div>
              </div>
            </div>

            {/* AFFILIATE / NATIVE AD (Hybrid Monetization) */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-24 h-24" />
              </div>
              <span className="bg-blue-500/30 text-blue-100 text-xs font-bold px-2 py-1 rounded mb-3 inline-block">SPONSORED</span>
              <h3 className="text-xl font-bold mb-2">Getting paid in {calculations.originInfo.currency}?</h3>
              <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
                Save up to 4% on currency conversion fees when receiving your salary in {calculations.destInfo.name} with a multi-currency account.
              </p>
              <button className="bg-white text-indigo-900 font-bold py-2.5 px-4 rounded-xl text-sm w-full hover:bg-slate-50 transition-colors flex justify-center items-center gap-2">
                Open Free Account <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: RESULTS & DATA */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Result KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Gross Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1">
                  <Wallet className="w-4 h-4" /> Gross Pay
                </div>
                <div className="text-2xl font-bold text-slate-800">{formatCurrency(calculations.grossAnnual)}</div>
                <div className="text-xs text-slate-400 mt-1">/ year before taxes</div>
              </div>

              {/* Tax Card */}
              <div className="bg-red-50 p-5 rounded-2xl border border-red-100 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium mb-1">
                  <LineChart className="w-4 h-4" /> Total Tax ({calculations.effectiveTaxRate}%)
                </div>
                <div className="text-2xl font-bold text-red-700">-{formatCurrency(calculations.taxAnnual)}</div>
                <div className="text-xs text-red-400 mt-1">Est. local tax in {calculations.destInfo.name}</div>
              </div>

              {/* Net Card */}
              <div className="bg-indigo-600 p-5 rounded-2xl shadow-md flex flex-col justify-center text-white ring-4 ring-indigo-600/20">
                <div className="flex items-center gap-2 text-indigo-200 text-sm font-medium mb-1">
                  <TrendingUp className="w-4 h-4" /> Net Take-Home
                </div>
                <div className="text-3xl font-extrabold">{formatCurrency(calculations.netAnnual)}</div>
                <div className="text-sm text-indigo-200 mt-1">{formatCurrency(calculations.netMonthly)} / month</div>
              </div>

            </div>

            {/* 2. IN-RESULT AD SPACE (High CTR) */}
            <div className="bg-slate-200 w-full h-[100px] sm:h-[90px] rounded-xl flex items-center justify-center text-slate-500 text-xs border border-slate-300">
               <span className="opacity-70">ADVERTISEMENT [728x90 or 300x250] - High CTR Zone</span>
            </div>

            {/* Detailed Breakdown Section */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800">Financial Breakdown: Living in {calculations.destInfo.name}</h3>
                <p className="text-sm text-slate-500 mt-1">Visualizing where your money goes based on local estimates.</p>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Cost List */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                    <span className="text-sm font-medium text-slate-600">Net Monthly Salary</span>
                    <span className="font-bold text-slate-800">{formatCurrency(calculations.netMonthly)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <span className="text-sm font-medium text-yellow-800">Est. Living Costs</span>
                      <Info className="w-3 h-3 text-yellow-600" />
                    </div>
                    <span className="font-bold text-yellow-800">-{formatCurrency(calculations.livingCostMonthly)}/mo</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-green-800">Disposable Income / Savings</span>
                    </div>
                    <span className="font-bold text-green-700">{formatCurrency(calculations.disposableMonthly)}/mo</span>
                  </div>
                  
                  {calculations.disposableMonthly < 0 && (
                     <div className="text-xs text-red-500 mt-2 p-2 bg-red-50 rounded border border-red-100">
                       Warning: Your estimated living costs exceed your net income in {calculations.destInfo.name}.
                     </div>
                  )}
                </div>

                {/* Recharts Visualization */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

              </div>
            </div>

            {/* Bottom SEO Text Content (crucial for ranking) */}
            <div className="prose prose-slate max-w-none p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-sm">
              <h3 className="text-lg font-bold">Why use this {calculations.originInfo.name} to {calculations.destInfo.name} Calculator?</h3>
              <p>
                When working remotely for a company based in <strong>{calculations.originInfo.name}</strong> while living as an expat or digital nomad in <strong>{calculations.destInfo.name}</strong>, your financial situation changes dramatically. This tool helps you simulate your exact take-home pay by factoring in the {calculations.effectiveTaxRate}% local tax rate in {calculations.destInfo.name}.
              </p>
              <p className="mt-2">
                Moreover, knowing that the average monthly cost of living is roughly {formatCurrency(calculations.livingCostMonthly)}, you can instantly calculate your disposable income to see if this relocation makes financial sense for your career.
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© 2026 NomadCalc Pro. Designed for digital nomads.</p>
          <p className="mt-2">Disclaimer: Tax laws change frequently. This tool provides estimates only and should not be used as official financial or legal advice.</p>
        </div>
      </footer>

    </div>
  );
}