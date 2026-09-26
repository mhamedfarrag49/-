import { useState } from 'react';
import { UserProfileAnswers } from '../../types';
import { universeAudio } from '../../utils/audio';

interface Props {
  answers: UserProfileAnswers;
  onUpdateAnswers: (updated: Partial<UserProfileAnswers>) => void;
  onNext: () => void;
}

export default function WhoIsMohamed({ answers, onUpdateAnswers, onNext }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const goalOptions = [
    { label: 'أبدأ فورًا', desc: 'روح المبادرة والشجاعة بدون تردد' },
    { label: 'أفكر كتير الأول', desc: 'حساب كل خطوة بدقة وهدوء' },
    { label: 'أبدأ وبعدين أظبط الطريق', desc: 'المرونة والتعلم أثناء الحركة' },
    { label: 'لسه بدور على هدفي', desc: 'البحث عن الشغف الحقيقي والأصيل' },
  ];

  const dreamPresets = [
    'أبني حاجة عظيمة الكل يفتخر بيها وأسيب أثر حقيقي',
    'أحقق استقلاليتي ونجاحي المهني والشخصي بالكامل',
    'أكون في أعلى قمة في مجالي وألهم الناس اللي حواليّا',
    'أعيش حياة مليانة راحة بال وإنجازات بدون ندم',
  ];

  const locationPresets = [
    'في مكان يليق بكل التعب والمحاولات اللي عشتها',
    'مهندس / قائد مشروع ناجح ومعترف بتميزي عالمياً',
    'مسافر وواقف على أرض صلبة ومحقق أحلامي الكبيرة',
    'حواليا ناس بيحبوني وبفتخر بالشخص اللي بقيت عليه',
  ];

  const handleSelectGoal = (val: string) => {
    universeAudio.playClick(750);
    onUpdateAnswers({ goalApproach: val });
  };

  const handleSelectDream = (val: string) => {
    universeAudio.playClick(800);
    onUpdateAnswers({ biggestDream: val });
  };

  const handleSelectLocation = (val: string) => {
    universeAudio.playClick(850);
    onUpdateAnswers({ fiveYearsLocation: val });
  };

  const handleGenerateProfile = () => {
    universeAudio.playChime();
    setIsGenerated(true);
  };

  // Determine Archetype based on selected options
  const getArchetype = () => {
    if (answers.goalApproach.includes('فورًا')) {
      return { title: 'THE RELENTLESS PIONEER', arabic: 'المبادر الجسور', motto: 'من يبدأ أولاً يكتب التاريخ.' };
    }
    if (answers.goalApproach.includes('أفكر كتير')) {
      return { title: 'THE MASTER STRATEGIST', arabic: 'المخطط الاستراتيجي', motto: 'العمق في الرؤية يصنع ثبات الأثر.' };
    }
    if (answers.goalApproach.includes('أظبط الطريق')) {
      return { title: 'THE ADAPTIVE ARCHITECT', arabic: 'المهندس المرن', motto: 'الشجاعة في السير، والذكاء في المسار.' };
    }
    return { title: 'THE DEEP SEEKER', arabic: 'الباحث عن المعنى', motto: 'كل خطوة بحث هي بناء لهدف أعظم.' };
  };

  const archetype = getArchetype();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10 font-arabic">
      <div className="max-w-2xl w-full universe-glass border border-slate-800 p-6 sm:p-10 space-y-8">
        {/* Stage Header */}
        <div className="flex items-center justify-between text-xs font-mono-code text-amber-400 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>STAGE 03 · IDENTITY MATRIX</span>
          </div>
          <span className="text-slate-400">من هو محمد عوض؟</span>
        </div>

        {!isGenerated ? (
          <div className="space-y-8">
            {/* Step 1: Goal approach */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2 text-right">
                  <span className="text-xs font-mono-code text-amber-400/90 tracking-widest uppercase">
                    QUESTION 01 / 03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                    لما يكون عندك هدف، بتعمل إيه؟
                  </h3>
                  <p className="text-xs text-slate-400">اختار الإجابة الأقرب لطبيعتك وتفكيرك الحقيقي:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {goalOptions.map((opt, idx) => {
                    const isSelected = answers.goalApproach === opt.label;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectGoal(opt.label)}
                        className={`p-4 text-right border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-sm'
                            : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                          </span>
                          <span className="font-semibold text-sm sm:text-base">{opt.label}</span>
                        </div>
                        <span className="text-xs text-slate-400 mt-2">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    disabled={!answers.goalApproach}
                    onClick={() => {
                      universeAudio.playClick();
                      setCurrentStep(2);
                    }}
                    className={`px-6 py-2.5 text-xs sm:text-sm border transition-all flex items-center gap-2 cursor-pointer ${
                      answers.goalApproach
                        ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 hover:bg-amber-500/30'
                        : 'opacity-40 border-slate-800 cursor-not-allowed text-slate-400'
                    }`}
                  >
                    <span>السؤال التالي</span>
                    <span className="font-mono-code">&gt;&gt;</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Biggest Dream */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2 text-right">
                  <span className="text-xs font-mono-code text-amber-400/90 tracking-widest uppercase">
                    QUESTION 02 / 03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                    أكتر حاجة نفسك تحققها؟
                  </h3>
                  <p className="text-xs text-slate-400">حدد أكبر طموح نفسك تفتخر بيه:</p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {dreamPresets.map((preset, idx) => {
                    const isSelected = answers.biggestDream === preset;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectDream(preset)}
                        className={`w-full p-3.5 text-right border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-amber-200'
                            : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}></span>
                        <span className="text-sm font-medium mr-3">{preset}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom write-in */}
                <div className="pt-2 text-right">
                  <label className="text-xs text-slate-400 block mb-1">أو اكتب طموحك بكلماتك الخاصة:</label>
                  <input
                    type="text"
                    value={answers.biggestDream}
                    onChange={(e) => onUpdateAnswers({ biggestDream: e.target.value })}
                    placeholder="اكتب هنا..."
                    className="w-full bg-slate-900/80 border border-slate-800 px-3.5 py-2.5 text-sm text-slate-200 text-right focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => {
                      universeAudio.playClick();
                      setCurrentStep(1);
                    }}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    السابق
                  </button>
                  <button
                    disabled={!answers.biggestDream}
                    onClick={() => {
                      universeAudio.playClick();
                      setCurrentStep(3);
                    }}
                    className={`px-6 py-2.5 text-xs sm:text-sm border transition-all flex items-center gap-2 cursor-pointer ${
                      answers.biggestDream
                        ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 hover:bg-amber-500/30'
                        : 'opacity-40 border-slate-800 cursor-not-allowed text-slate-400'
                    }`}
                  >
                    <span>السؤال الأخير</span>
                    <span className="font-mono-code">&gt;&gt;</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Where in 5 years? */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2 text-right">
                  <span className="text-xs font-mono-code text-amber-400/90 tracking-widest uppercase">
                    QUESTION 03 / 03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                    بعد 5 سنين تتمنى تكون فين؟
                  </h3>
                  <p className="text-xs text-slate-400">في 2031، أين ترى نسختك القادمة؟</p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {locationPresets.map((preset, idx) => {
                    const isSelected = answers.fiveYearsLocation === preset;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectLocation(preset)}
                        className={`w-full p-3.5 text-right border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-amber-200'
                            : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}></span>
                        <span className="text-sm font-medium mr-3">{preset}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom write-in */}
                <div className="pt-2 text-right">
                  <label className="text-xs text-slate-400 block mb-1">أو اكتب المكان بأسلوبك:</label>
                  <input
                    type="text"
                    value={answers.fiveYearsLocation}
                    onChange={(e) => onUpdateAnswers({ fiveYearsLocation: e.target.value })}
                    placeholder="اكتب هنا..."
                    className="w-full bg-slate-900/80 border border-slate-800 px-3.5 py-2.5 text-sm text-slate-200 text-right focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => {
                      universeAudio.playClick();
                      setCurrentStep(2);
                    }}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    السابق
                  </button>
                  <button
                    disabled={!answers.fiveYearsLocation}
                    onClick={handleGenerateProfile}
                    className={`px-6 py-2.5 text-xs sm:text-sm border transition-all flex items-center gap-2 cursor-pointer ${
                      answers.fiveYearsLocation
                        ? 'bg-amber-500/25 text-amber-200 border-amber-400 shadow-md hover:bg-amber-500/35'
                        : 'opacity-40 border-slate-800 cursor-not-allowed text-slate-400'
                    }`}
                  >
                    <span>توليد بروفايل محمد عوض</span>
                    <span className="font-mono-code">⚡</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Profile Generated Screen */
          <div className="space-y-6 animate-fadeIn text-right">
            <div className="border border-amber-400/40 bg-slate-950/80 p-6 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

              {/* Profile Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-[11px] font-mono-code text-amber-400 tracking-wider">
                  MOHAMED AWAD · IDENTITY MATRIX 2026
                </span>
                <span className="text-[11px] font-mono-code text-slate-400">ID: AWAD-77</span>
              </div>

              {/* Archetype */}
              <div className="space-y-1">
                <div className="text-xs font-mono-code text-amber-400/80 uppercase tracking-widest">
                  CORE ARCHETYPE
                </div>
                <div className="text-2xl font-cinzel font-bold text-white tracking-wide">
                  {archetype.title}
                </div>
                <div className="text-sm font-semibold text-amber-300">
                  {archetype.arabic} · "{archetype.motto}"
                </div>
              </div>

              {/* Data points */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="p-3 bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <span className="text-slate-400 text-xs block">طريقة التعامل مع الأهداف:</span>
                  <span className="text-slate-200 font-medium">{answers.goalApproach}</span>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <span className="text-slate-400 text-xs block">أكبر طموح:</span>
                  <span className="text-amber-200 font-medium">{answers.biggestDream}</span>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <span className="text-slate-400 text-xs block">الرؤية بعد 5 سنين (2031):</span>
                  <span className="text-slate-200 font-medium">{answers.fiveYearsLocation}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-mono-code text-center pt-2">
                "الهدية دي مش مجرد كلام، دي مرآة حقيقية لطاقتك وطموحك."
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  universeAudio.playClick();
                  setIsGenerated(false);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                تعديل الإجابات
              </button>

              <button
                onClick={() => {
                  universeAudio.playClick();
                  onNext();
                }}
                className="px-6 py-2.5 text-xs sm:text-sm bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>الانتقال إلى محطة 2026</span>
                <span className="font-mono-code">&gt;&gt;</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
