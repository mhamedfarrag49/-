import { useState } from 'react';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function TheReason({ onNext }: Props) {
  const paragraphs = [
    {
      text: 'أنا كان ممكن أجيبلك هدية عادية. أجيب حاجة، ألفها، وأقولك كل سنة وأنت طيب.',
      en: 'I could have easily given you an ordinary gift, wrapped it, and said Happy Birthday.',
    },
    {
      text: 'بس حسيت إن ده مش كفاية.',
      en: 'But somehow, that simply didn’t feel enough.',
      highlight: true,
    },
    {
      text: 'فقررت أعمل حاجة مش هتقدر تحطها على رف...',
      en: 'So I decided to create something you could never place on a shelf...',
    },
    {
      text: 'حاجة تفتحها.',
      en: 'Something you open and experience.',
    },
    {
      text: 'حاجة تفضل موجودة على الإنترنت وتفكرك بيوم من أيام 2026.',
      en: 'Something that stays immortal on the internet to remind you of a day in 2026.',
      highlight: true,
    },
    {
      text: 'الحاجة دي اتعملت مخصوص ليك.',
      en: 'This universe was crafted specifically for you.',
    },
  ];

  const [revealedCount, setRevealedCount] = useState<number>(2);

  const handleRevealMore = () => {
    universeAudio.playClick();
    if (revealedCount < paragraphs.length) {
      setRevealedCount(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const isAllRevealed = revealedCount >= paragraphs.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-2xl w-full universe-glass border border-slate-800 p-8 sm:p-12 space-y-8">
        {/* Stage Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400/80 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 02 · THE REASON</span>
          </div>
          <span className="text-slate-400">الدافع وراء هذه التجربة</span>
        </div>

        {/* Message Body */}
        <div className="space-y-6 text-right leading-relaxed">
          {paragraphs.slice(0, revealedCount).map((p, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 transform translate-y-0 opacity-100 ${
                p.highlight
                  ? 'text-amber-200 font-semibold text-lg sm:text-xl border-r-2 border-amber-400 pr-3 py-1'
                  : 'text-slate-300 text-base sm:text-lg font-light'
              }`}
            >
              <p>{p.text}</p>
              <p className="text-xs font-mono-code text-slate-400 font-normal mt-1 tracking-wide" dir="ltr">
                {p.en}
              </p>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs font-mono-code text-slate-400">
            {revealedCount} / {paragraphs.length} PARAGRAPHS
          </span>

          <button
            onClick={handleRevealMore}
            className="px-6 py-2.5 text-xs sm:text-sm font-arabic bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>{isAllRevealed ? 'اكتشف من هو محمد عوض ➔' : 'اقرأ المزيد...'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
