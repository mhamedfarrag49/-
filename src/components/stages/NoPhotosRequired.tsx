import { useState } from 'react';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function NoPhotosRequired({ onNext }: Props) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      titleEn: 'THE TALKS',
      titleAr: 'الكلام اللي اتقال ومحدش صوره',
      icon: '💬',
      desc: 'المحادثات الطويلة، الضحك اللي طلع من القلب في الشارع أو بعد درس، الحوارات عن المستقبل والمخاوف اللي محدش بيفهمها غير صاحب حقيقي. دي حاجات عمر ما كاميرا تقدر تلقطها.',
      quote: 'الصوت أعمق من الصورة.',
    },
    {
      titleEn: 'THE DAYS',
      titleAr: 'الأيام العادية اللي مكنتش تستاهل صورة وقتها',
      icon: '⏳',
      desc: 'اليوم اللي كان عادي جداً في 2026، اللي مشينا فيه ومكنش في مناسبة ولا عيد. الأيام دي تحديداً هي اللي بتبني الصداقات الحقيقية، مش الاحتفالات الرسمية فقط.',
      quote: 'العادي هو أثمن ما نملك بعد سنين.',
    },
    {
      titleEn: 'THE MOMENTS',
      titleAr: 'لحظات بسيطة يمكن نسينا تفاصيلها',
      icon: '✨',
      desc: 'نظرة تشجيع، وقفة جدعنة سريعة، إيفيه اتكرر ميت مرة ومحدش بيفهمه غيرنا. تفاصيل صغيرة بتدوب في الزحمة لكنها بتسيب طمأنينة جوانا.',
      quote: 'المشاعر بتفضل حتى لو الذاكرة نسيت.',
    },
    {
      titleEn: 'THE FUTURE',
      titleAr: 'الحاجات اللي لسه محصلتش أصلًا',
      icon: '🚀',
      desc: 'النجاحات الجاية، يوم ما تتخرج وتوصل لأعلى مكان، التحديات اللي هنتقابل ونفتكر قد إيه كنا بنحلم بيها في 2026. الألبوم ده مفتوح للمستقبل.',
      quote: 'أجمل صورنا هي اللي لسه هنرسمها.',
    },
  ];

  const handleCardClick = (idx: number) => {
    universeAudio.playClick(700 + idx * 80);
    setActiveCard(activeCard === idx ? null : idx);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-4xl w-full universe-glass border border-slate-800 p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 05 · INVISIBLE ARCHIVE</span>
          </div>
          <span className="text-slate-400">معرض بلا صور</span>
        </div>

        {/* Section Title */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-white tracking-wider">
            THINGS WE DON'T HAVE PHOTOS OF
          </h2>
          <p className="text-base sm:text-lg text-amber-200/90 font-arabic">
            "مش كل الذكريات محتاجة صورة عشان تكون موجودة."
          </p>
          <p className="text-xs text-slate-400 font-mono-code">
            [ اضغط على أي بطاقة لتكريم الذكرى الغائبة عن العدسات ]
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c, idx) => {
            const isOpen = activeCard === idx;
            return (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                className={`p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between text-right ${
                  isOpen
                    ? 'bg-slate-900/90 border-amber-400 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-950/50 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                    <span className="text-xl">{c.icon}</span>
                    <span className="text-xs font-mono-code text-amber-400 tracking-wider font-semibold">
                      {c.titleEn}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2 font-arabic">
                    {c.titleAr}
                  </h3>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-arabic animate-fadeIn mt-3 pt-3 border-t border-slate-800/80">
                      {c.desc}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono-code">
                  <span>{isOpen ? '✕ إغلاق' : '+ قراءة التفاصيل'}</span>
                  <span className="italic text-amber-300/80 font-arabic">"{c.quote}"</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono-code">
            UNCAPTURED MEMORIES // VALIDATED
          </span>
          <button
            onClick={() => {
              universeAudio.playClick();
              onNext();
            }}
            className="px-6 py-2.5 text-xs sm:text-sm font-arabic bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>ملف الصداقة السري ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
