/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Starfield from './components/Starfield';
import Navigation from './components/Navigation';
import AccessScreen from './components/stages/AccessScreen';
import SystemInit from './components/stages/SystemInit';
import TheReason from './components/stages/TheReason';
import WhoIsMohamed from './components/stages/WhoIsMohamed';
import Year2026 from './components/stages/Year2026';
import NoPhotosRequired from './components/stages/NoPhotosRequired';
import FriendshipFile from './components/stages/FriendshipFile';
import FutureYou from './components/stages/FutureYou';
import FiveYearContract from './components/stages/FiveYearContract';
import SecretRoom from './components/stages/SecretRoom';
import TheGift from './components/stages/TheGift';
import TheBirthday from './components/stages/TheBirthday';
import FinalScreen from './components/stages/FinalScreen';
import { StageId, UserProfileAnswers, FiveYearContractData } from './types';

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageId>(0);

  const [answers, setAnswers] = useState<UserProfileAnswers>({
    goalApproach: 'أبدأ فورًا',
    biggestDream: 'أبني حاجة عظيمة الكل يفتخر بيها وأسيب أثر حقيقي',
    fiveYearsLocation: 'في مكان يليق بكل التعب والمحاولات اللي عشتها',
  });

  const [contractData, setContractData] = useState<FiveYearContractData>({
    letterToSelf: 'يا محمد، أتمنى تكون فخور بالخطوات اللي خدناها، وتكون حافظت على طيبة قلبك وروح التحدي.',
    wantToAchieve: 'التفوق والتخرج بأعلى مراتب الشرف وبناء مكانتي المستقلة.',
    neverBecome: 'شخص فاقد للأمل أو مستسلم لضغوط الحياة وناسي مبادئه.',
    onePromise: 'ألا أستسلم أبداً وأن أظل وفياً للبدايات ولأصحابي الحقيقيين.',
    timestamp: '2026',
    signature: 'MOHAMED AWAD',
  });

  const handleNextStage = () => {
    setCurrentStage((prev) => (Math.min(prev + 1, 12) as StageId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAnswers = (updated: Partial<UserProfileAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateContract = (updated: Partial<FiveYearContractData>) => {
    setContractData((prev) => ({ ...prev, ...updated }));
  };

  const handleRestart = () => {
    setCurrentStage(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030407] text-slate-100 relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Dynamic Cosmic Starfield & Nebula Canvas */}
      <Starfield />

      {/* Persistent Global Top Bar (except stage 00 where it shows subtle controls or on demand) */}
      {currentStage > 0 && (
        <Navigation
          currentStage={currentStage}
          onSelectStage={(stage) => {
            setCurrentStage(stage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Main Stage Content */}
      <main className={`relative z-10 transition-opacity duration-500 ${currentStage > 0 ? 'pt-16 pb-12' : ''}`}>
        {currentStage === 0 && (
          <AccessScreen onEnter={handleNextStage} />
        )}

        {currentStage === 1 && (
          <SystemInit onNext={handleNextStage} />
        )}

        {currentStage === 2 && (
          <TheReason onNext={handleNextStage} />
        )}

        {currentStage === 3 && (
          <WhoIsMohamed
            answers={answers}
            onUpdateAnswers={handleUpdateAnswers}
            onNext={handleNextStage}
          />
        )}

        {currentStage === 4 && (
          <Year2026 onNext={handleNextStage} />
        )}

        {currentStage === 5 && (
          <NoPhotosRequired onNext={handleNextStage} />
        )}

        {currentStage === 6 && (
          <FriendshipFile onNext={handleNextStage} />
        )}

        {currentStage === 7 && (
          <FutureYou onNext={handleNextStage} />
        )}

        {currentStage === 8 && (
          <FiveYearContract
            contractData={contractData}
            onUpdateContract={handleUpdateContract}
            onNext={handleNextStage}
          />
        )}

        {currentStage === 9 && (
          <SecretRoom onNext={handleNextStage} />
        )}

        {currentStage === 10 && (
          <TheGift onNext={handleNextStage} />
        )}

        {currentStage === 11 && (
          <TheBirthday onNext={handleNextStage} />
        )}

        {currentStage === 12 && (
          <FinalScreen
            contractData={contractData}
            onNavigateToStage={(stage) => {
              setCurrentStage(stage);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}
