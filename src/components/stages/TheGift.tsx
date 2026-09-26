import { useState } from 'react';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function TheGift({ onNext }: Props) {
  const [revealed, setRevealed] = useState<number>(1);

  const sections = [
    {
      titleEn: 'So... what did Mohammed Farrag actually give me?',
      titleAr: 'إذن... إيه اللي محمد فراج قدمهولي هنا بالظبط؟',
      type: 'question',
    },
    {
      items: [
        'Nothing you can hold.',
        'Nothing you can wear.',
        'Nothing you can put in a drawer.',
      ],
      itemsAr: [
        'ولا حاجة تقدر تمسكها بإيدك.',
        'ولا حاجة تقدر تلبسها.',
        'ولا حاجة ممكن تحطها جوه درج أو على رف.',
      ],
      type: 'negation',
    },
    {
      highlight: 'Just a moment. A moment made specifically for you.',
      highlightAr: 'مجرد لحظة. لحظة تم تصميمها وكتابتها وبرمجتها فقط لأجلك.',
      type: 'core',
    },
    {
      finalQuote: "Because sometimes the best gift isn't an object. It's knowing that someone took the time to make something for you.",
      finalQuoteAr: 'لأن أحياناً أفضل هدية مش بتكون شيء مادي... بل معرفتك إن فيه حد استقطع من وقته وطاقته عشان يبني حاجة تفرحك وتليق بيك.',
      type: 'philosophy',
    },
  ];

  const handleNextReveal = () => {
    universeAudio.playClick();
    if (revealed < sections.length) {
      setRevealed(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const isAll = revealed >= sections.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-2xl w-full universe-glass border border-slate-800 p-6 sm:p-12 space-y-8">
        {/* Stage Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 10 · THE ESSENCE</span>
          </div>
          <span className="text-slate-400">حقيقة الهدية</span>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-right">
          {revealed >= 1 && (
            <div className="space-y-2 animate-fadeIn">
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wide" dir="ltr">
                So... what did Mohammed Farrag actually give me?
              </h2>
              <p className="text-sm text-amber-300 font-semibold">
                إذن... إيه اللي محمد فراج قدمهولي هنا بالظبط؟
              </p>
            </div>
          )}

          {revealed >= 2 && (
            <div className="space-y-2.5 p-4 bg-slate-900/40 border-r-2 border-slate-600 animate-fadeIn">
              <div className="space-y-1 font-mono-code text-xs text-slate-400" dir="ltr">
                <div>• Nothing you can hold.</div>
                <div>• Nothing you can wear.</div>
                <div>• Nothing you can put in a drawer.</div>
              </div>
              <div className="space-y-1 text-sm text-slate-300 pt-1 font-arabic">
                <div>ولا حاجة تقدر تمسكها بإيدك.</div>
                <div>ولا حاجة تقدر تلبسها.</div>
                <div>ولا حاجة ممكن تركنها في درج أو على رف.</div>
              </div>
            </div>
          )}

          {revealed >= 3 && (
            <div className="p-4 bg-amber-500/10 border-r-2 border-amber-400 space-y-2 animate-fadeIn">
              <div className="text-base sm:text-lg font-cinzel font-bold text-amber-200" dir="ltr">
                Just a moment. A moment made specifically for you.
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-bold">
                مجرد لحظة. لحظة تم تصميمها وتطويرها مخصوص ليك.
              </p>
            </div>
          )}

          {revealed >= 4 && (
            <div className="p-6 bg-slate-950/70 border border-slate-800 space-y-3 animate-fadeIn">
              <blockquote className="text-sm sm:text-base font-cinzel text-slate-200 italic" dir="ltr">
                "Because sometimes the best gift isn't an object. It's knowing that someone took the time to make something for you."
              </blockquote>
              <p className="text-sm sm:text-base text-amber-300 font-arabic font-medium">
                لأن أحياناً أفضل هدية مش مجرد شيء يُشترى... بل إحساسك بأن شخصاً ما قرر أن يعطيك وقتاً من عمره ليصنع لك تجربة لن ينساها الزمن.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono-code">
            REVELATION: {revealed} / {sections.length}
          </span>
          <button
            onClick={handleNextReveal}
            className="px-6 py-2.5 text-xs sm:text-sm font-arabic bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>{isAll ? 'الاحتفال بعيد الميلاد 🎂 ➔' : 'تابع القراءة...'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
