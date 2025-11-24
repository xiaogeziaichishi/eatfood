
let audioCtx: AudioContext | null = null;

export const initAudio = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

const createOscillator = (ctx: AudioContext, type: OscillatorType, freq: number, startTime: number, duration: number) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  return { osc, gain };
};

export const playClickSound = (time?: number) => {
  const ctx = initAudio();
  if (!ctx) return;
  
  const t = time || ctx.currentTime;
  
  // Mechanical click: high pitch, very short decay
  // Simulates the plastic flapper hitting a peg
  const { osc, gain } = createOscillator(ctx, 'triangle', 600, t, 0.05);
  
  // Frequency drop for "thud" feel
  osc.frequency.exponentialRampToValueAtTime(100, t + 0.04);
  
  gain.gain.setValueAtTime(0.15, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  
  osc.start(t);
  osc.stop(t + 0.05);
};

export const playStartSound = () => {
  const ctx = initAudio();
  if (!ctx) return;
  const now = ctx.currentTime;
  
  // A "whoosh" or spring release sound
  const { osc, gain } = createOscillator(ctx, 'sine', 200, now, 0.3);
  
  osc.frequency.linearRampToValueAtTime(400, now + 0.1);
  
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.linearRampToValueAtTime(0, now + 0.3);
  
  osc.start(now);
  osc.stop(now + 0.3);
};

export const playSpinSound = (durationMs: number) => {
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = durationMs / 1000;
  
  // 1. Initial release sound
  playStartSound();

  // 2. Rhythmic ticking that slows down
  // We simulate the wheel passing pegs.
  // The visual animation is a cubic-bezier ease-out.
  // We distribute clicks such that they are dense at the start and sparse at the end.
  // Using a power function to map index to time approximates this deceleration.
  
  const totalClicks = 35; 
  
  for (let i = 0; i < totalClicks; i++) {
    const progress = i / totalClicks;
    
    // t = duration * (progress ^ 3) 
    // This creates a distribution where time intervals increase as i increases (slowing down)
    const offset = duration * Math.pow(progress, 2.8); 
    
    const clickTime = now + offset;
    
    if (offset < duration) {
      playClickSound(clickTime);
    }
  }
};

export const playWinSound = () => {
  const ctx = initAudio();
  if (!ctx) return;
  const now = ctx.currentTime;
  
  // Victory Chime: C Major Arpeggio (C4, E4, G4, C5)
  const notes = [523.25, 659.25, 783.99, 1046.50]; 
  
  notes.forEach((freq, i) => {
    const { osc, gain } = createOscillator(ctx, 'triangle', freq, now, 2.0);
    
    const startTime = now + i * 0.1; // Staggered entry
    const stopTime = startTime + 1.5;

    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05); // Attack
    gain.gain.exponentialRampToValueAtTime(0.001, stopTime); // Decay
    
    osc.start(startTime);
    osc.stop(stopTime);
  });

  // Sparkle effect (High sine waves)
  const { osc, gain } = createOscillator(ctx, 'sine', 1200, now, 0.6);
  osc.frequency.exponentialRampToValueAtTime(2000, now + 0.4);
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
  osc.start(now);
  osc.stop(now + 0.6);
};
