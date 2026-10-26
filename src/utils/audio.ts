// Web Audio API Synthesizer for discreet presentation tactile feedback
// Completely offline, zero asset dependencies, projector-friendly

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTick(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Graceful fallback
  }
}

export function playSlideTransition(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Graceful fallback
  }
}

export function playChime(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    [587.33, 880, 1174.66].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      
      gain.gain.setValueAtTime(0.04, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.25);
    });
  } catch {
    // Graceful fallback
  }
}

export function playSuccess(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Graceful fallback
  }
}

let celebrationAudio: HTMLAudioElement | null = null;

export function stopCelebrationAudio() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
  if (celebrationAudio) {
    try {
      celebrationAudio.pause();
      celebrationAudio.currentTime = 0;
    } catch {
      // ignore
    }
  }
}

/**
 * Triumphant "¡Hala Madrid!" celebration anthem
 * Plays the actual music track (/music.mp3) with Web Audio fanfare fallback
 */
export function playHalaMadridAnthem(enabled = true) {
  if (!enabled) return;

  // Stop any previous playback first
  stopCelebrationAudio();

  // 1. Try playing the actual audio file (/music.mp3)
  if (typeof window !== 'undefined') {
    try {
      if (!celebrationAudio) {
        celebrationAudio = new Audio('/music.mp3');
      }
      celebrationAudio.currentTime = 0;
      celebrationAudio.volume = 0.9;
      
      const playPromise = celebrationAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Audio element autoplay failed, falling back to Web Audio synth:', error);
          playFallbackSynthAnthem();
        });
      }
      return;
    } catch (e) {
      console.warn('Could not initialize Audio element, falling back to synth:', e);
    }
  }

  // Fallback to Web Audio synthesiser if Audio element fails
  playFallbackSynthAnthem();
}

function playFallbackSynthAnthem() {
  // 1. Spoken chant via SpeechSynthesis
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('¡Hala Madrid! ¡Hala Madrid y nada más!');
      utterance.lang = 'es-ES';
      utterance.rate = 1.05;
      utterance.pitch = 1.25;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find(v => v.lang.startsWith('es') || v.lang.includes('ES'));
      if (esVoice) {
        utterance.voice = esVoice;
      }
      
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 500);
    } catch {
      // SpeechSynthesis fallback
    }
  }

  // 2. Synthesized Triumphant Stadium Fanfare (C-Major Fanfare Anthem)
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes: [number, number, number][] = [
      [392.00, 0.00, 0.22],
      [523.25, 0.24, 0.28],
      [659.25, 0.54, 0.28],
      [783.99, 0.84, 0.45],
      [698.46, 1.32, 0.24],
      [659.25, 1.58, 0.24],
      [587.33, 1.84, 0.32],
      [523.25, 2.18, 0.90],
    ];

    notes.forEach(([freq, offset, dur]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const oscHarmonic = ctx.createOscillator();
      const gainHarmonic = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + offset);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 0.5, now + offset);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now + offset);

      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.linearRampToValueAtTime(0.07, now + offset + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + dur);

      gainHarmonic.gain.setValueAtTime(0.001, now + offset);
      gainHarmonic.gain.linearRampToValueAtTime(0.04, now + offset + 0.03);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.001, now + offset + dur);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + dur);
      oscHarmonic.start(now + offset);
      oscHarmonic.stop(now + offset + dur);
    });

    const chordNotes = [523.25, 659.25, 783.99, 1046.50];
    chordNotes.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + 2.18);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now + 2.18);

      gain.gain.setValueAtTime(0.001, now + 2.18);
      gain.gain.linearRampToValueAtTime(0.06, now + 2.22);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + 2.18);
      osc.stop(now + 3.6);
    });
  } catch {
    // Graceful fallback
  }
}
