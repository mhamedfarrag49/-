import { useState } from 'react';
import confetti from 'canvas-confetti';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function TheBirthday({ onNext }: Props) {
  const [wished, setWished] = useState<boolean>(false);
  const [candleBlown, setCandleBlown] = useState<boolean>(false);

  const handleMakeWish = () => {
    setWished(true);
    setCandleBlown(true);

    // Audio celebratory melody & chimes
    universeAudio.playCelebration();

    // Multistage Confetti fireworks
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#fbbf24', '#38bdf8', '#a855f7', '#ec4899', '#ffffff'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#fbbf24', '#38bdf8', '#a855f7', '#ec4899', '#ffffff'],
      });
    }, 250);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-3xl w-full universe-glass border border-amber-500/40 p-6 sm:p-12 space-y-8 text-center relative overflow-hidden shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>

        {/* Top Tag */}
        <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] text-amber-400 font-mono-code uppercase">
          <span className="w-12 h-px bg-amber-400/40"></span>
          <span>STAGE 11 · CELEBRATION PROTOCOL</span>
          <span className="w-12 h-px bg-amber-400/40"></span>
        </div>

        {/* Cake / Candle Visual */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative cursor-pointer group" onClick={!wished ? handleMakeWish : undefined}>
            {/* Candle Flame */}
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white transition-all duration-700 ${
                  candleBlown
                    ? 'opacity-0 scale-50 -translate-y-2'
                    : 'animate-pulse shadow-lg shadow-amber-500/80 scale-100'
                }`}
              ></div>
              <div className="w-1 h-3 bg-slate-300"></div>
              {/* Cake base */}
              <div className="text-5xl sm:text-6xl drop-shadow-md">
                🎂
              </div>
            </div>
          </div>
          <div className="text-xs font-mono-code text-amber-300/80 mt-2">
            {!candleBlown ? 'اضغط على الشمعة أو الزر أدناه لتمني أمنية' : '✨ طارت الأمنية إلى النجوم'}
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-mono-code tracking-[0.4em] text-amber-400 uppercase">
            HAPPY BIRTHDAY
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-white to-amber-400">
            MOHAMED AWAD
          </h1>
        </div>

        {/* The Exact Beautiful Arabic Message Requested */}
        <div className="max-w-xl mx-auto p-6 bg-slate-950/80 border border-amber-400/30 text-right space-y-4 shadow-xl">
          <p className="text-lg sm:text-xl text-slate-100 font-bold leading-relaxed">
            كل سنة وأنت طيب يا محمد عوض ❤️🎂
          </p>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            وعقبال مليون سنة يا صاحبي، وإن شاء الله السنة الجديدة تكون كلها فرحة ونجاح وتحقيق لكل اللي نفسك فيه ❤️🔥
          </p>
          <p className="text-base sm:text-lg text-amber-300 font-semibold leading-relaxed">
            عيد ميلاد سعيد يا صاحبي 🎉🥳
          </p>
        </div>

        {/* Make A Wish Button */}
        <div className="pt-2 flex flex-col items-center gap-4">
          <button
            onClick={handleMakeWish}
            className="group relative px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base tracking-widest uppercase transition-all duration-300 shadow-xl shadow-amber-500/25 cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <span>MAKE A WISH ✨</span>
              <span className="text-xs font-arabic font-normal">(اتمنَّ أمنيتك الآن)</span>
            </span>
          </button>

          {wished && (
            <button
              onClick={() => {
                universeAudio.playClick();
                onNext();
              }}
              className="mt-4 px-6 py-2.5 text-xs sm:text-sm font-arabic bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>المحطة الأخيرة: الفصل الأول ➔</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
