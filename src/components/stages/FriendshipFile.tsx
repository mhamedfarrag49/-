import { useState } from 'react';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function FriendshipFile({ onNext }: Props) {
  const [isStamped, setIsStamped] = useState<boolean>(false);

  const handleStamp = () => {
    universeAudio.playChime();
    setIsStamped(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-2xl w-full universe-glass border border-slate-800 p-6 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Stage Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 06 · CLASSIFIED DOSSIER</span>
          </div>
          <span className="text-slate-400">ملف استخباراتي رسمي</span>
        </div>

        {/* Dossier Document Container */}
        <div className="bg-[#0b0e14] border border-slate-700/80 p-6 sm:p-8 relative shadow-2xl space-y-6">
          {/* Top Dossier Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1 text-left" dir="ltr">
              <div className="text-xs font-mono-code text-amber-400 tracking-widest uppercase">
                SECURITY LEVEL: TOP SECRET // ALPHA-ONE
              </div>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wider">
                FRIENDSHIP FILE
              </h2>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-[11px] font-mono-code bg-red-500/10 text-red-400 border border-red-500/30 tracking-widest uppercase">
                RESTRICTED
              </span>
            </div>
          </div>

          {/* Dossier Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono-code">
            <div className="p-3.5 bg-slate-900/70 border border-slate-800 space-y-1 text-left" dir="ltr">
              <span className="text-slate-400 text-[10px] tracking-wider uppercase block">SUBJECT</span>
              <span className="text-base font-bold text-white">MOHAMED AWAD</span>
            </div>

            <div className="p-3.5 bg-slate-900/70 border border-slate-800 space-y-1 text-left" dir="ltr">
              <span className="text-slate-400 text-[10px] tracking-wider uppercase block">KNOWN SINCE</span>
              <span className="text-base font-bold text-amber-300">2026 // BACCALAUREATE ERA</span>
            </div>

            <div className="p-3.5 bg-slate-900/70 border border-slate-800 space-y-1 text-left" dir="ltr">
              <span className="text-slate-400 text-[10px] tracking-wider uppercase block">STATUS</span>
              <span className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                ACTIVE & UNBREAKABLE
              </span>
            </div>

            <div className="p-3.5 bg-slate-900/70 border border-slate-800 space-y-1 text-left" dir="ltr">
              <span className="text-slate-400 text-[10px] tracking-wider uppercase block">PHOTOS TOGETHER</span>
              <span className="text-base font-bold text-slate-300">0</span>
            </div>

            <div className="p-3.5 bg-slate-900/70 border border-slate-800 space-y-1 text-left" dir="ltr">
              <span className="text-slate-400 text-[10px] tracking-wider uppercase block">MEMORIES</span>
              <span className="text-base font-bold text-amber-300">UNCOUNTABLE (∞)</span>
            </div>

            <div className="p-3.5 bg-slate-900/70 border border-slate-800 space-y-1 text-left" dir="ltr">
              <span className="text-slate-400 text-[10px] tracking-wider uppercase block">VALUE</span>
              <span className="text-base font-bold text-amber-400">CLASSIFIED // PRICELESS</span>
            </div>
          </div>

          {/* Dossier Explanatory Note */}
          <div className="p-4 bg-slate-950/80 border-r-2 border-amber-400 text-right space-y-2">
            <h4 className="text-xs font-mono-code text-amber-300 uppercase tracking-widest">
              ملاحظة المحقق والموثّق:
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic">
              لاحظ السطر قبل الأخير: <strong className="text-amber-300">MEMORIES: UNCOUNTABLE</strong>.
              مش معناها إننا بنختلق مواقف، بل المقصود إن قيمة الصداقة مش متقاسة بعدد الصور في الكاميرا، لكنها متقاسة بالمعنى والاحترام اللي بيعيش جوانا.
            </p>
          </div>

          {/* Stamp Action / Verified Stamp */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            {isStamped ? (
              <div className="inline-flex items-center gap-3 border-2 border-emerald-500/80 px-4 py-2 text-emerald-400 font-mono-code text-xs uppercase tracking-widest rotate-[-2deg] animate-scaleIn">
                <span className="text-lg">✓</span>
                <span>AUTHENTICATED BY MOHAMED FARRAG</span>
              </div>
            ) : (
              <button
                onClick={handleStamp}
                className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono-code tracking-wider uppercase cursor-pointer"
              >
                [ ختم وتوثيق الملف ]
              </button>
            )}

            <span className="text-[11px] text-slate-400 font-mono-code">
              ARCHIVE_HASH: #AWAD-2026-ETERNAL
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono-code">
            DOSSIER STATE: VERIFIED
          </span>
          <button
            onClick={() => {
              universeAudio.playClick();
              onNext();
            }}
            className="px-6 py-2.5 text-xs sm:text-sm font-arabic bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>رسالة إلى محمد في 2031 ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
