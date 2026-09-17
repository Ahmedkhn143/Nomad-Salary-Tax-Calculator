import React from 'react';

export default function InResultAd() {
  return (
    <aside aria-label="Sponsored Recommendation" className="w-full bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col items-center justify-center my-6">
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">
        Sponsored Recommendation
      </span>
      {/* 300x250 or 728x90 In-Result Display Slot */}
      <div className="w-full max-w-[728px] h-[100px] sm:h-[90px] bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-500 text-xs font-medium">
        <span>In-Result AdSense Placement [300x250 or 728x90 High CTR Slot]</span>
      </div>
    </aside>
  );
}
