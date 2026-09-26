import { useState } from 'react';
import { StageId, STAGES } from '../types';
import { universeAudio } from '../utils/audio';

interface Props {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
}

export default function Navigation({ currentStage, onSelectStage }: Props) {
  const [isMuted, setIsMuted] = useState<boolean>(universeAudio.getMuted());
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleToggleSound = () => {
    const muted = universeAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      universeAudio.startAmbient();
      universeAudio.playClick(880);
    }
  };

  const handleSelect = (id: StageId) => {
    universeAudio.playClick();
    onSelectStage(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 bg-[#050608]/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between select-none">
      {/* Brand Zone (Single element) */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleSelect(0)}
          className="text-xs sm:text-sm font-cinzel font-bold tracking-widest text-slate-100 hover:text-amber-300 transition-colors uppercase cursor-pointer"
        >
          MOHAMED AWAD
        </button>
        <span className="hidden sm:inline-block text-[10px] font-mono-code text-slate-400">
          / 2026 EXP
        </span>
      </div>

      {/* Middle Progress Zone: Active stage & tracker */}
      <div className="flex items-center gap-2 font-mono-code text-xs">
        <span className="text-amber-400 font-semibold">
          {STAGES[currentStage].code}
        </span>
        <span className="text-slate-400">/</span>
        <span className="text-slate-400">12</span>
        <span className="hidden md:inline-block text-slate-400 font-arabic text-[11px] mr-2">
          · {STAGES[currentStage].titleAr}
        </span>
      </div>

      {/* Action Zone: Audio Toggle & Stage Directory Menu */}
      <div className="flex items-center gap-2">
        {/* Audio Toggle */}
        <button
          onClick={handleToggleSound}
          className="p-2 text-xs font-mono-code text-slate-400 hover:text-amber-300 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
          title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
        >
          <span>{isMuted ? '🔇' : '🔊'}</span>
          <span className="hidden sm:inline text-[10px] uppercase">
            {isMuted ? 'MUTED' : 'AUDIO ON'}
          </span>
        </button>

        {/* Stages Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-1.5 text-xs font-mono-code text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 bg-slate-900/60 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>STAGES</span>
            <span className="text-[10px] text-amber-400">▼</span>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#0a0e17] border border-slate-700 shadow-2xl py-2 z-50 max-h-[80vh] overflow-y-auto">
              <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono-code text-slate-400 uppercase tracking-widest">
                SELECT STAGE // قائمة المراحل:
              </div>
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s.id)}
                  className={`w-full px-3 py-2 text-right flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    currentStage === s.id
                      ? 'bg-amber-500/20 text-amber-200 border-r-2 border-amber-400'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <span className="font-mono-code text-[10px] text-slate-400">{s.code}</span>
                  <span className="font-arabic font-medium">{s.titleAr}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
