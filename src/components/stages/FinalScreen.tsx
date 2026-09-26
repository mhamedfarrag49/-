import { useState } from 'react';
import { StageId, STAGES, FiveYearContractData } from '../../types';
import { universeAudio } from '../../utils/audio';

interface Props {
  contractData: FiveYearContractData;
  onNavigateToStage: (stage: StageId) => void;
  onRestart: () => void;
}

export default function FinalScreen({ contractData, onNavigateToStage, onRestart }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    universeAudio.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-3xl w-full universe-glass border border-slate-800 p-8 sm:p-14 space-y-10 text-center relative overflow-hidden">
        {/* Subtle Ambient Cosmic Line */}
        <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] text-amber-400/70 font-mono-code uppercase">
          <span className="w-12 h-px bg-amber-400/40"></span>
          <span>STAGE 12 · THE HORIZON</span>
          <span className="w-12 h-px bg-amber-400/40"></span>
        </div>

        {/* The Chapter 1 Announcement */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-cinzel font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            THIS IS ONLY CHAPTER 1.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-arabic">
            هذه ليست النهاية، بل افتتاحية رحلة طويلة تنتظر أن نكتبها معاً.
          </p>
        </div>

        {/* 2026 START -> 2031 TO BE CONTINUED */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 font-mono-code">
          {/* 2026 */}
          <div className="space-y-2 text-center w-36">
            <div className="text-3xl sm:text-4xl font-bold text-amber-300">2026</div>
            <div className="w-full h-px bg-slate-700"></div>
            <div className="text-xs tracking-[0.3em] text-slate-400 uppercase">START</div>
            <div className="text-[11px] font-arabic text-slate-400">أولى بكالوريا</div>
          </div>

          <div className="text-amber-400/60 text-xl font-bold">➔</div>

          {/* 2031 */}
          <div className="space-y-2 text-center w-36">
            <div className="text-3xl sm:text-4xl font-bold text-slate-100">2031</div>
            <div className="w-full h-px bg-slate-700"></div>
            <div className="text-xs tracking-[0.3em] text-amber-400 uppercase">TO BE CONTINUED...</div>
            <div className="text-[11px] font-arabic text-slate-400">المستقبل المنتظر</div>
          </div>
        </div>

        {/* Contract Quick Preview if filled */}
        {contractData.wantToAchieve && (
          <div className="p-4 bg-slate-950/70 border border-slate-800 text-right text-xs sm:text-sm space-y-1.5 max-w-lg mx-auto">
            <span className="text-[11px] font-mono-code text-amber-400 block">
              📌 تذكير ميثاقك لـ 2031:
            </span>
            <p className="text-slate-200 font-arabic">
              "{contractData.wantToAchieve}"
            </p>
            <p className="text-[11px] text-slate-400 italic">
              وعدك: "{contractData.onePromise || 'أن تستمر حتى النهاية'}"
            </p>
          </div>
        )}

        {/* Stage Quick Navigation Drawer */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="text-xs font-mono-code text-slate-400 uppercase tracking-widest">
            EXPLORE ANY STAGE AGAIN // إعادة زيارة أي مرحلة:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {STAGES.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  universeAudio.playClick(600 + s.id * 30);
                  onNavigateToStage(s.id);
                }}
                className="px-2.5 py-1 text-[11px] font-mono-code bg-slate-900/60 hover:bg-amber-500/20 text-slate-300 hover:text-amber-200 border border-slate-800 hover:border-amber-400/50 transition-colors cursor-pointer"
                title={`${s.code} — ${s.titleEn}`}
              >
                {s.code} {s.titleAr}
              </button>
            ))}
          </div>
        </div>

        {/* The Exact Footer Credit Requested */}
        <div className="pt-8 border-t border-slate-800/80 space-y-2">
          <p className="text-xs font-mono-code text-slate-400 tracking-wider">
            Made for <span className="text-slate-100 font-semibold">Mohamed Awad</span>
          </p>
          <p className="text-sm font-cinzel font-bold text-amber-300 tracking-widest uppercase">
            by Mohamed Farrag
          </p>
          <p className="text-[11px] text-slate-400 font-arabic">
            صُنع بحب وإخلاص وتمني بكل الخير والنجاح الدائم.
          </p>
        </div>

        {/* Bottom Utility Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 text-xs font-arabic bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
          >
            {copied ? '✓ تم نسخ الرابط' : '🔗 نسخ رابط التجربة'}
          </button>
          <button
            onClick={() => {
              universeAudio.playClick();
              onRestart();
            }}
            className="px-4 py-2 text-xs font-arabic bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-400 transition-colors cursor-pointer"
          >
            ↺ إعادة التجربة من البداية
          </button>
        </div>
      </div>
    </div>
  );
}
