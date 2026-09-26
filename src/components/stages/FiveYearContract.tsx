import { useState, useRef } from 'react';
import { FiveYearContractData } from '../../types';
import { universeAudio } from '../../utils/audio';

interface Props {
  contractData: FiveYearContractData;
  onUpdateContract: (updated: Partial<FiveYearContractData>) => void;
  onNext: () => void;
}

export default function FiveYearContract({ contractData, onUpdateContract, onNext }: Props) {
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleGenerate = () => {
    universeAudio.playChime();
    onUpdateContract({
      timestamp: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
      signature: 'MOHAMED AWAD',
    });
    setIsGenerated(true);
  };

  const handleCopyCardText = () => {
    universeAudio.playClick();
    const text = `📜 ميثاق الخمس سنوات — محمد عوض (2026 ➔ 2031)
━━━━━━━━━━━━━━━━━━━━
✉️ رسالتي لنفسي:
"${contractData.letterToSelf || 'أن أظل وفياً لأحلامي ومبادئي.'}"

🎯 إنجاز أريد تحقيقه:
"${contractData.wantToAchieve || 'بناء نجاح مستقل ومؤثر.'}"

🛡️ شيء لا أريد أن أتحول إليه:
"${contractData.neverBecome || 'شخص مستسلم أو فاقد للشغف.'}"

🤝 وعدي لنفسي:
"${contractData.onePromise || 'ألا أنسى بداياتي وأن أكمل حتى النهاية.'}"
━━━━━━━━━━━━━━━━━━━━
صُنع خصيصاً لمحمد عوض بواسطة محمد فراج.`;

    navigator.clipboard.writeText(text);
    alert('تم نسخ الميثاق بنجاح! يمكنك الاحتفاظ به أو مشاركته.');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-3xl w-full universe-glass border border-slate-800 p-6 sm:p-10 space-y-8">
        {/* Stage Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 08 · THE 5 YEAR CONTRACT</span>
          </div>
          <span className="text-slate-400">ميثاق الخمس سنوات</span>
        </div>

        {!isGenerated ? (
          <div className="space-y-6 text-right animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                عقدك الرسمي مع نفسك (2026 – 2031)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                اكتب الكلمات اللي هترجع تقرأها بعد 5 سنين لما تكون في مكان جديد خالص.
              </p>
            </div>

            {/* Prompt 1 */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-amber-300 block">
                1. اكتب رسالة لنفسك في 2031:
              </label>
              <textarea
                rows={2}
                value={contractData.letterToSelf}
                onChange={(e) => onUpdateContract({ letterToSelf: e.target.value })}
                placeholder="مثال: يا محمد، أتمنى تكون فخور بالطريق اللي مشيناه، وتكون حافظت على طيبة قلبك وضحكتك..."
                className="w-full bg-slate-900/80 border border-slate-800 p-3 text-sm text-slate-200 text-right focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>

            {/* Prompt 2 */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-amber-300 block">
                2. What do you want to achieve? (إيه أهم إنجاز نفسك تحققه؟)
              </label>
              <input
                type="text"
                value={contractData.wantToAchieve}
                onChange={(e) => onUpdateContract({ wantToAchieve: e.target.value })}
                placeholder="مثال: التخرج بامتياز وتأسيس مشروعي الخاص والاستقلال المالي"
                className="w-full bg-slate-900/80 border border-slate-800 p-3 text-sm text-slate-200 text-right focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Prompt 3 */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-amber-300 block">
                3. What do you never want to become? (إيه الشيء اللي عمرك ما تحب تتحول ليه؟)
              </label>
              <input
                type="text"
                value={contractData.neverBecome}
                onChange={(e) => onUpdateContract({ neverBecome: e.target.value })}
                placeholder="مثال: شخص بارد المشاعر أو مستسلم للظروف وناسي مبادئه"
                className="w-full bg-slate-900/80 border border-slate-800 p-3 text-sm text-slate-200 text-right focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Prompt 4 */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-amber-300 block">
                4. What is one promise you make to yourself? (وعد واحد بتقطعه لنفسك؟)
              </label>
              <input
                type="text"
                value={contractData.onePromise}
                onChange={(e) => onUpdateContract({ onePromise: e.target.value })}
                placeholder="مثال: أن أستمر في المحاولة ولا أسمح لأي عثرة أن توقفني"
                className="w-full bg-slate-900/80 border border-slate-800 p-3 text-sm text-slate-200 text-right focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleGenerate}
                className="px-8 py-3 bg-gradient-to-r from-amber-500/30 to-amber-600/30 hover:from-amber-500/40 hover:to-amber-600/40 text-amber-200 border border-amber-400 text-xs sm:text-sm tracking-wider font-bold transition-all shadow-lg shadow-amber-500/10 cursor-pointer flex items-center gap-2"
              >
                <span>GENERATE MY 2031 CARD ➔</span>
                <span className="font-arabic font-normal text-xs">(توليد البطاقة التذكارية)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Digital Card Generated Screen */
          <div className="space-y-6 animate-fadeIn">
            {/* The Holographic Card */}
            <div
              ref={cardRef}
              className="relative p-6 sm:p-8 bg-gradient-to-br from-[#0c1017] via-[#080b12] to-[#04060a] border-2 border-amber-400/50 shadow-2xl space-y-6 text-right overflow-hidden"
            >
              {/* Luxury gold top banner */}
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-4">
                <div className="text-left" dir="ltr">
                  <div className="text-[10px] font-mono-code text-amber-400 tracking-[0.3em] uppercase">
                    OFFICIAL 5-YEAR PACT
                  </div>
                  <div className="text-xl sm:text-2xl font-cinzel font-black text-white">
                    MOHAMED AWAD
                  </div>
                  <div className="text-xs font-mono-code text-amber-300">
                    2031 EDITION · CERTIFIED
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full border border-amber-400/40 flex items-center justify-center bg-amber-400/5 text-amber-300 font-cinzel text-lg">
                  2031
                </div>
              </div>

              {/* Card Contents */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono-code text-amber-400 block">
                    ✉️ DEAR FUTURE SELF // رسالة لنفسي:
                  </span>
                  <p className="text-slate-100 font-arabic italic">
                    "{contractData.letterToSelf || 'أن أظل وفياً لأحلامي ومبادئي وألا أنسى البدايات.'}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono-code text-amber-400 block">
                      🎯 GOAL // الإنجاز المنشود:
                    </span>
                    <p className="text-slate-200 font-arabic">
                      {contractData.wantToAchieve || 'بناء نجاح مستقل ومؤثر في مجالي.'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono-code text-amber-400 block">
                      🛡️ BOUNDARY // ما لن أتحول إليه:
                    </span>
                    <p className="text-slate-200 font-arabic">
                      {contractData.neverBecome || 'شخص مستسلم أو فاقد للشغف.'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-500/10 border border-amber-400/30 space-y-1">
                  <span className="text-[11px] font-mono-code text-amber-300 block">
                    🤝 SACRED PROMISE // الوعد الشخصي:
                  </span>
                  <p className="text-amber-100 font-arabic font-semibold">
                    "{contractData.onePromise || 'ألا أستسلم مهما بلغت التحديات وأن استمر في المحاولة.'}"
                  </p>
                </div>
              </div>

              {/* Card Footer Signature & Timestamp */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                <div>DATE: 2026 // BACCALAUREATE</div>
                <div className="text-amber-300 font-cinzel">ISSUED FOR: MOHAMED AWAD</div>
              </div>
            </div>

            {/* Actions for Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyCardText}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-arabic cursor-pointer"
                >
                  📋 نسخ نص الميثاق
                </button>
                <button
                  onClick={() => setIsGenerated(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  تعديل الميثاق
                </button>
              </div>

              <button
                onClick={() => {
                  universeAudio.playClick();
                  onNext();
                }}
                className="px-6 py-2.5 text-xs sm:text-sm font-arabic bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>دخول الغرفة السرية 🔐 ➔</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
