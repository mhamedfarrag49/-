import { universeAudio } from '../../utils/audio';

interface Props {
  onEnter: () => void;
}

export default function AccessScreen({ onEnter }: Props) {
  const handleClick = () => {
    universeAudio.playClick(900);
    universeAudio.startAmbient();
    onEnter();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 select-none">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fadeIn">
        {/* Subtle decorative cosmic line */}
        <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] text-amber-400/70 font-mono-code uppercase">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400/40"></span>
          <span>STAGE 00 · CLASSIFIED</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400/40"></span>
        </div>

        {/* Main Title Lockup */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-sm">
            MOHAMED AWAD
          </h1>
          <p className="text-xs sm:text-sm tracking-[0.5em] font-mono-code text-amber-300/80 uppercase">
            PRIVATE EXPERIENCE
          </p>
        </div>

        {/* Tender note */}
        <div className="py-6 space-y-2">
          <p className="text-lg sm:text-xl text-slate-300 font-light tracking-wide italic">
            "Someone made something for you."
          </p>
          <p className="text-sm sm:text-base text-slate-400 font-arabic font-normal">
            شخصٌ ما قضى وقتاً وصنع شيئاً حقيقياً خصيصاً لأجلك.
          </p>
        </div>

        {/* Enter CTA */}
        <div className="pt-4">
          <button
            onClick={handleClick}
            className="group relative inline-flex items-center justify-center px-10 py-4 text-sm sm:text-base font-mono-code tracking-[0.25em] text-slate-100 transition-all duration-300 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-amber-400/70 rounded-none overflow-hidden cursor-pointer"
          >
            {/* Hover glow line */}
            <span className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="relative flex items-center gap-3">
              <span>[ ENTER ]</span>
              <span className="text-xs text-amber-400/80 font-arabic tracking-normal">ابدأ الرحلة</span>
            </span>
          </button>
        </div>

        <div className="text-[11px] font-mono-code text-slate-400 tracking-wider">
          DESTINATION: 2026 ➔ 2031 · PROTOCOL ACTIVE
        </div>
      </div>
    </div>
  );
}
