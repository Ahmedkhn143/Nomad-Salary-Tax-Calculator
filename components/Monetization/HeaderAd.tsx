import React from 'react';

export default function HeaderAd() {
  return (
    <aside aria-label="Advertisement" className="w-full bg-slate-100/90 border-b border-slate-200 py-2 px-4 flex flex-col items-center justify-center">
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
        Advertisement
      </span>
      {/* 728x90 Desktop Leaderboard / 320x50 Mobile */}
      <div className="w-full max-w-[728px] h-[50px] sm:h-[90px] bg-slate-200/80 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-500 text-xs font-medium transition-all hover:bg-slate-200">
        <span className="flex items-center gap-2">
          <span>Google AdSense Header Leaderboard [728x90]</span>
        </span>
      </div>
    </aside>
  );
}
