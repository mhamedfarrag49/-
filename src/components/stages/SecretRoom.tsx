import { useState } from 'react';
import { universeAudio } from '../../utils/audio';

interface Props {
  onNext: () => void;
}

export default function SecretRoom({ onNext }: Props) {
  const [nodes, setNodes] = useState<{ [key: string]: boolean }>({
    trust: false,
    ambition: false,
    loyalty: false,
  });
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const toggleNode = (key: 'trust' | 'ambition' | 'loyalty') => {
    universeAudio.playClick(600 + Object.values(nodes).filter(Boolean).length * 150);
    const updated = { ...nodes, [key]: !nodes[key] };
    setNodes(updated);

    if (updated.trust && updated.ambition && updated.loyalty) {
      setTimeout(() => {
        universeAudio.playChime();
        setIsUnlocked(true);
      }, 350);
    }
  };

  const allConnected = nodes.trust && nodes.ambition && nodes.loyalty;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-2xl w-full universe-glass border border-slate-800 p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 09 · VAULT PROTOCOL</span>
          </div>
          <span className="text-slate-400">الغرفة السرية 🔐</span>
        </div>

        {!isUnlocked ? (
          <div className="text-center space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-3xl">🔐</span>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wider">
                THERE IS ONE MORE THING.
              </h2>
              <p className="text-sm text-slate-300 font-arabic">
                هناك رسالة سرية مشفرة لم تُعرض في أي مرحلة سابقة.
              </p>
              <p className="text-xs text-amber-300/80 font-mono-code">
                [ قم بتفعيل ركائز الصداقة الثلاثة لفك التشفير ]
              </p>
            </div>

            {/* Puzzle Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <button
                onClick={() => toggleNode('trust')}
                className={`p-4 border transition-all duration-300 cursor-pointer text-center space-y-1 ${
                  nodes.trust
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-lg">{nodes.trust ? '⚡' : '○'}</div>
                <div className="font-bold text-sm">الجدعنة والثقة</div>
                <div className="text-[10px] font-mono-code text-slate-400">PILLAR // 01</div>
              </button>

              <button
                onClick={() => toggleNode('ambition')}
                className={`p-4 border transition-all duration-300 cursor-pointer text-center space-y-1 ${
                  nodes.ambition
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-lg">{nodes.ambition ? '⚡' : '○'}</div>
                <div className="font-bold text-sm">الطموح المشترك</div>
                <div className="text-[10px] font-mono-code text-slate-400">PILLAR // 02</div>
              </button>

              <button
                onClick={() => toggleNode('loyalty')}
                className={`p-4 border transition-all duration-300 cursor-pointer text-center space-y-1 ${
                  nodes.loyalty
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-lg">{nodes.loyalty ? '⚡' : '○'}</div>
                <div className="font-bold text-sm">المساندة الصادقة</div>
                <div className="text-[10px] font-mono-code text-slate-400">PILLAR // 03</div>
              </button>
            </div>

            <div className="text-xs font-mono-code text-slate-400">
              {allConnected ? 'CIPHER SOLVED — UNLOCKING...' : 'LOCK STATUS: ENCRYPTED'}
            </div>
          </div>
        ) : (
          /* Secret Message Unlocked */
          <div className="space-y-6 text-right animate-fadeIn">
            <div className="flex items-center justify-between border-b border-amber-400/40 pb-3">
              <span className="text-xs font-mono-code text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                🔓 SECRET MESSAGE UNLOCKED
              </span>
              <span className="text-xs font-mono-code text-amber-300">CONFIDENTIAL DISPATCH</span>
            </div>

            <div className="bg-slate-950/80 border-r-2 border-amber-400 p-6 space-y-4 shadow-xl">
              <div className="text-xs font-mono-code text-slate-400">
                FROM: MOHAMED FARRAG // TO: MOHAMED AWAD
              </div>

              <div className="space-y-3 text-slate-200 text-base sm:text-lg leading-relaxed font-arabic">
                <p>
                  يا محمد، وسط زحمة الأيام ومشاغل الدنيا، قليل لما تلاقي حد بيقف جنبك بجد، بيتمنالك الخير من غير حساب، وبيفرح لنجاحك كأنه نجاحه بالظبط.
                </p>
                <p>
                  وجودك في حياتي وفي مرحلة زي أولى بكالوريا وفي المشوار ده كله مش صدفة، أنت مش مجرد صاحب عابر؛ أنت أخ وسند وضهر حقيقي يُعتمد عليه.
                </p>
                <p className="text-amber-200 font-semibold">
                  التجربة دي اتصممت علشان كل ما الأيام تضغطك أو تحس بلحظة تردد، تفتح اللينك ده وتفتكر إن فيه حد هنا بيآمن بيك، وعارف إن معدنك أصيل وإنك هتطلع من كل اختبار أقوى.
                </p>
                <p className="text-sm text-slate-400">
                  شكراً على وجودك يا صاحبي، وخلي السطر ده حلقة في ودنك: إحنا مكملين سوا لحد ما نوصل.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-left font-mono-code text-xs text-amber-400" dir="ltr">
                — Mohamed Farrag, 2026
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  universeAudio.playClick();
                  onNext();
                }}
                className="px-6 py-2.5 text-xs sm:text-sm font-arabic bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>حقيقة الهدية ➔</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
