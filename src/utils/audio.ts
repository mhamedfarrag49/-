// Web Audio API Synthesizer for ambient music and interactive SFX
// Completely self-contained, no external assets needed

class UniverseAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.08, (this.ctx?.currentTime || 0), 0.1);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Futuristic gentle tick / click sound
  public playClick(freq = 800) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // AudioContext policy safe catch
    }
  }

  // Chime / unlock sound
  public playChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = this.ctx!.currentTime + idx * 0.09;
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {
      // safe
    }
  }

  // Grand celebratory birthday arpeggio
  public playCelebration() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      // Happy birthday arpeggio chord progression
      const melody = [
        { f: 261.63, d: 0.25 }, // C4
        { f: 261.63, d: 0.25 }, // C4
        { f: 293.66, d: 0.4 },  // D4
        { f: 261.63, d: 0.4 },  // C4
        { f: 349.23, d: 0.4 },  // F4
        { f: 329.63, d: 0.8 },  // E4
        { f: 392.00, d: 0.4 },  // G4
        { f: 523.25, d: 0.8 },  // C5
        { f: 659.25, d: 1.0 },  // E5
      ];

      let time = this.ctx.currentTime + 0.05;
      melody.forEach(note => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, time);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + note.d * 0.9);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
        osc.stop(time + note.d);

        time += note.d * 0.8;
      });
    } catch {
      // safe
    }
  }

  // Deep ambient cosmic drone/pad
  public startAmbient() {
    if (this.isAmbientPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      // Low peaceful chords: C2 (65.41), G2 (98.0), E3 (164.81), B3 (246.94)
      const baseFreqs = [65.41, 98.0, 164.81, 196.0];
      this.ambientOscillators = baseFreqs.map(f => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);
        osc.connect(this.ambientGain!);
        osc.start();
        return osc;
      });

      this.isAmbientPlaying = true;
    } catch {
      // safe
    }
  }
}

export const universeAudio = new UniverseAudio();
