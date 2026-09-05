'use client';

import { useCallback, useRef } from 'react';

/**
 * usePaperRustle
 * Synthesises a realistic "paper rustle / flip" sound using the Web Audio API.
 * No external audio files required. The AudioContext is created lazily on the
 * first call (which must happen inside a user gesture, e.g. a click).
 *
 * Returns:
 *   - play(intensity?): trigger a rustle burst. intensity 0..1 controls
 *     loudness and length.
 *   - ensure(): resume/create the AudioContext (call on first interaction).
 */
export function usePaperRustle() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const ensure = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      const ctx = new AC();
      const master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    if (ctxRef.current.state === 'suspended') {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (intensity = 0.7) => {
      const ctx = ensure();
      const master = masterRef.current;
      if (!ctx || !master) return;

      const now = ctx.currentTime;
      const duration = 0.18 + intensity * 0.22; // 0.18s .. 0.40s

      // Build a short white-noise buffer.
      const sampleRate = ctx.sampleRate;
      const length = Math.floor(sampleRate * duration);
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      // Fractal-ish noise: combine a couple of random walks for a "crinkle" feel.
      let a = 0;
      let b = 0;
      for (let i = 0; i < length; i++) {
        a += (Math.random() * 2 - 1) * 0.5;
        b += (Math.random() * 2 - 1) * 0.25;
        a *= 0.96;
        b *= 0.985;
        data[i] = (a + b) * 0.6;
      }

      const src = ctx.createBufferSource();
      src.buffer = buffer;

      // Paper rustle lives mostly in the 1.5kHz - 9kHz band.
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 3200 + Math.random() * 2600;
      bandpass.Q.value = 0.8;

      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 900;

      // Amplitude envelope: quick attack, noisy decay with little spikes.
      const gain = ctx.createGain();
      const peak = 0.25 * intensity;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(peak * 0.4, now + duration * 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      src.connect(highpass);
      highpass.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(master);

      src.start(now);
      src.stop(now + duration + 0.02);

      // A second, softer layer for "page turning" body.
      const src2 = ctx.createBufferSource();
      const len2 = Math.floor(sampleRate * (duration * 1.3));
      const buf2 = ctx.createBuffer(1, len2, sampleRate);
      const d2 = buf2.getChannelData(0);
      let c = 0;
      for (let i = 0; i < len2; i++) {
        c += (Math.random() * 2 - 1) * 0.3;
        c *= 0.94;
        d2[i] = c;
      }
      src2.buffer = buf2;
      const bp2 = ctx.createBiquadFilter();
      bp2.type = 'bandpass';
      bp2.frequency.value = 1800;
      bp2.Q.value = 0.6;
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.0001, now);
      g2.gain.exponentialRampToValueAtTime(peak * 0.35, now + 0.05);
      g2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.3);
      src2.connect(bp2);
      bp2.connect(g2);
      g2.connect(master);
      src2.start(now + 0.03);
      src2.stop(now + duration * 1.35);
    },
    [ensure],
  );

  return { play, ensure };
}
