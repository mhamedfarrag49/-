import { useState } from 'react';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function FutureYou({ onNext }: Props) {
  const [revealed, setRevealed] = useState<number>(3);

  const lines = [
    { text: 'لو أنت بتقرأ الكلام ده في 2031...', en: 'If you are reading this in 2031...' },
    { text: 'فأنت غالبًا نسيت اليوم ده.', en: 'You have probably forgotten this exact day.' },
    { text: 'يمكن نسيت إحنا كنا بنفكر في إيه، أو إيه اللي كان قالقنا وقت أولى بكالوريا.', en: 'Maybe you forgot what we were thinking, or what worried us back in 2026.' },
    { text: 'يمكن حياتك بقت مختلفة تمامًا، وأولوياتك اتبدلت لناس وأماكن جديدة.', en: 'Maybe your life became entirely different, with new dreams and horizons.' },
    { text: 'يمكن حققت حاجات كنا بنعتبرها مستحيلة وإحنا لسه بنبدأ.', en: 'Maybe you achieved things we once thought were nearly impossible.' },
    { text: 'ويمكن لسه بتحاول، ولسه بتعافر.', en: 'And maybe you are still fighting, still striving.' },
    { text: 'وفي الحالتين...', en: 'And in either case...' },
    { text: 'أتمنى تكون لسه بتجري ورا الحاجة اللي نفسك فيها ومستسلمتش.', en: 'I truly hope you are still chasing what sets your soul on fire.', highlight: true },
  ];

  const handleReveal = () => {
    universeAudio.playClick();
    if (revealed < lines.length) {
      setRevealed(prev => prev + 2);
    } else {
      onNext();
    }
  };

  const isCompleted = revealed >= lines.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-2xl w-full universe-glass border border-slate-800 p-6 sm:p-10 space-y-8">
        {/* Stage Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 07 · TIME TRANSMISSION</span>
          </div>
          <span className="text-slate-400">من 2026 إلى 2031</span>
        </div>

        {/* Transmission Subject */}
        <div className="text-center space-y-2">
          <div className="text-xs font-mono-code text-amber-400/80 tracking-[0.3em] uppercase">
            TEMPORAL CAPSULE // 5 YEARS FORWARD
          </div>
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white tracking-wider">
            DEAR MOHAMED — 2031
          </h2>
          <p className="text-xs text-slate-400 font-mono-code">
            ORIGIN: 2026 AD · DESTINATION: 2031 AD
          </p>
        </div>

        {/* Letter Lines */}
        <div className="space-y-5 text-right py-4">
          {lines.slice(0, revealed).map((item, idx) => (
            <div
              key={idx}
              className={`p-3 transition-all duration-500 ${
                item.highlight
                  ? 'border-r-2 border-amber-400 bg-amber-500/10 text-amber-200 text-lg sm:text-xl font-bold'
                  : 'text-slate-200 text-base sm:text-lg font-light'
              }`}
            >
              <p>{item.text}</p>
              <p className="text-xs font-mono-code text-slate-400 mt-1" dir="ltr">
                {item.en}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono-code">
            TRANSMISSION: {Math.min(revealed, lines.length)} / {lines.length}
          </span>
          <button
            onClick={handleReveal}
            className="px-6 py-2.5 text-xs sm:text-sm font-arabic bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>{isCompleted ? 'كتابة ميثاق الـ 5 سنوات ➔' : 'اقرأ بقية الرسالة...'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
