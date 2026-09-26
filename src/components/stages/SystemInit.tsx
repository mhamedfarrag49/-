import { useState, useEffect } from 'react';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function SystemInit({ onNext }: Props) {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const delays = [600, 1400, 2400, 3400, 4400];
    const timers: NodeJS.Timeout[] = [];

    delays.forEach((delay, index) => {
      const timer = setTimeout(() => {
        setStep(index + 1);
        if (index + 1 === 4) {
          universeAudio.playChime();
        } else {
          universeAudio.playClick(600 + index * 120);
        }
      }, delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleContinue = () => {
    universeAudio.playClick();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 font-mono-code">
      <div className="max-w-xl w-full universe-glass border border-slate-800/80 p-6 sm:p-10 space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse"></span>
            <span>SYSTEM BOOT · AWAD_OS</span>
          </div>
          <span>STAGE 01 / 12</span>
        </div>

        {/* Terminal Logs */}
        <div className="space-y-4 text-xs sm:text-sm min-h-[180px]">
          {step >= 1 && (
            <div className="text-slate-400 flex items-center gap-2">
              <span className="text-amber-500">&gt;</span>
              <span>INITIALIZING DIGITAL UNIVERSE...</span>
              <span className="text-emerald-400 text-xs">[DONE]</span>
            </div>
          )}

          {step >= 2 && (
            <div className="text-slate-400 flex items-center gap-2">
              <span className="text-amber-500">&gt;</span>
              <span>IDENTIFYING USER PROFILE...</span>
              <span className="text-emerald-400 text-xs">[LOCATED]</span>
            </div>
          )}

          {step >= 3 && (
            <div className="text-amber-300 font-semibold flex items-center gap-2 text-sm sm:text-base">
              <span className="text-amber-500">&gt;</span>
              <span>USER FOUND:</span>
              <span className="text-white tracking-widest bg-slate-800/80 px-2 py-0.5 border border-amber-500/30">
                MOHAMED AWAD
              </span>
            </div>
          )}

          {step >= 4 && (
            <div className="text-emerald-400 font-medium flex items-center gap-2">
              <span className="text-emerald-500">&gt;</span>
              <span>STATUS:</span>
              <span className="text-amber-300 tracking-wider">BIRTHDAY MODE — ACTIVATED</span>
            </div>
          )}

          {step >= 5 && (
            <div className="pt-4 border-t border-slate-800/80 text-center animate-fadeIn space-y-2">
              <div className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-200 tracking-wider">
                Happy Birthday, Mohamed. 🎂
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-arabic">
                تم تهيئة العالم الرقمي بنجاح. النظام جاهز الآن لك.
              </p>
            </div>
          )}
        </div>

        {/* Progress or Button */}
        <div className="pt-4 flex justify-end">
          {step >= 5 ? (
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs sm:text-sm tracking-widest border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer font-sans"
            >
              <span>المتابعة إلى السبب</span>
              <span className="font-mono-code">&gt;&gt;</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>CALIBRATING PROTOCOL...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
