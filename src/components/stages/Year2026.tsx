import { useState } from 'react';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function Year2026({ onNext }: Props) {
  const [activeNode, setActiveNode] = useState<number>(0);

  const timelineNodes = [
    {
      title: 'أولى بكالوريا',
      en: '1st Baccalaureate — The Crucible',
      desc: 'سنة التأسيس والمذاكرة والتركيز. التعب اللي بيبني شخصيتك الحقيقية وبيحدد ملامح بكرة.',
      tag: 'THE MILESTONE',
    },
    {
      title: 'بداية مرحلة جديدة',
      en: 'A Fresh Horizon',
      desc: 'الخروج من مرحلة الطفولة إلى بدايات الشباب الواعي اللي بيتحمل مسؤولية اختياراته وطموحه.',
      tag: 'NEW CHAPTER',
    },
    {
      title: 'أحلام لسه بتتكوّن',
      en: 'Dreams in Formation',
      desc: 'الأفكار اللي بتجيلك بالليل وأنت سهران بتفكر في مستقبلك، واللي هتتحول لواقع بخطواتك الجاية.',
      tag: 'THE VISION',
    },
    {
      title: 'ولسه القصة طويلة...',
      en: 'And the Story is Just Beginning',
      desc: 'مهما كانت صعوبة الطريق أو غموض المستقبل، إحنا لسه بنفتح أول صفحة في المشوار الكبير.',
      tag: 'HORIZON',
    },
  ];

  const handleNodeClick = (index: number) => {
    universeAudio.playClick(650 + index * 90);
    setActiveNode(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-3xl w-full universe-glass border border-slate-800 p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 04 · CHRONO ANCHOR 2026</span>
          </div>
          <span className="text-slate-400">محطة 2026 — أولى بكالوريا</span>
        </div>

        {/* Tree Timeline Lockup */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Timeline Tree Visualization */}
          <div className="md:col-span-6 bg-slate-950/60 p-5 border border-slate-800/80 font-mono-code text-right" dir="ltr">
            <div className="text-amber-300 font-bold text-lg mb-4 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-normal">CHRONICLE TREE</span>
              <span>2026</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm pl-2">
              {timelineNodes.map((node, idx) => {
                const isSelected = activeNode === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleNodeClick(idx)}
                    className={`cursor-pointer group flex items-start gap-3 p-2.5 transition-all duration-200 border-l-2 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                        : 'border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-amber-500/70 font-semibold">{idx === 3 ? '└──' : '├──'}</span>
                    <div className="text-left flex-1">
                      <div className="font-arabic font-semibold text-sm text-slate-100 flex items-center justify-between">
                        <span>{node.title}</span>
                        <span className="text-[10px] text-amber-400/80 font-mono-code">{node.tag}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono-code">{node.en}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Node Detail Card */}
          <div className="md:col-span-6 space-y-4 text-right">
            <div className="p-5 border border-amber-400/30 bg-slate-900/50 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono-code text-amber-400">
                  {timelineNodes[activeNode].tag}
                </span>
                <span className="text-sm font-bold text-white font-arabic">
                  {timelineNodes[activeNode].title}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-arabic">
                {timelineNodes[activeNode].desc}
              </p>
            </div>

            {/* Deep Reflection Box */}
            <div className="p-5 border border-slate-800 bg-slate-950/40 space-y-3 text-right">
              <div className="text-xs font-mono-code text-slate-400">
                // REFLECTION ON 2026
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-arabic">
                يمكن دلوقتي إحنا مش عارفين بعد كام سنة هنكون فين.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-arabic">
                ممكن حياتنا تتغير. ممكن أهدافنا تتغير. ممكن كل واحد فينا يمشي في طريق مختلف.
              </p>
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-amber-200 font-semibold text-sm sm:text-base font-arabic">
                  لكن فيه حاجة واحدة مؤكدة: إحنا دلوقتي في بداية القصة.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono-code">
            CURRENT ANCHOR: 2026 AD
          </span>
          <button
            onClick={() => {
              universeAudio.playClick();
              onNext();
            }}
            className="px-6 py-2.5 text-xs sm:text-sm font-arabic bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>الذكريات التي لا تحتاج صوراً ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
