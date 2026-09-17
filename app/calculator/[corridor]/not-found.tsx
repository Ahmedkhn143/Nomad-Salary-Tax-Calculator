import React from 'react';
import Link from 'next/link';
import { Globe2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-indigo-600 text-white p-3 rounded-2xl mb-4 shadow-lg shadow-indigo-200">
        <Globe2 className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Corridor Not Found</h1>
      <p className="text-slate-600 max-w-md mb-6 text-sm">
        The requested country comparison corridor is either not supported or invalid. Select from our available top relocation corridors.
      </p>
      <Link
        href="/calculator/us-to-pt"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Go to US to Portugal Calculator
      </Link>
    </div>
  );
}
