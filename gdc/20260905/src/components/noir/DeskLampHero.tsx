'use client';

import { motion } from 'framer-motion';

/**
 * DeskLampHero
 * Noir hero: a brass gooseneck desk lamp (SVG) casts a flickering cone of warm
 * amber light onto the title. Volumetric dust motes drift through the beam.
 */

// Deterministic pseudo-random motes (stable between server & client to avoid
// hydration mismatches). Seeded by index using a sine-based PRNG, rounded to
// 2 decimals so SSR and client serialize identical style strings.
const round2 = (n: number) => Math.round(n * 100) / 100;
const MOTES = Array.from({ length: 18 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 99.13 + n * 17.7) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: round2(55 + r(1) * 38),
    delay: round2(r(2) * 8),
    dur: round2(9 + r(3) * 8),
    size: round2(1.5 + r(4) * 2.5),
  };
});

export default function DeskLampHero() {
  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
      aria-label="The Marlowe Affair — hero"
    >
      {/* Deep noir backdrop with subtle desk photo */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
        style={{ backgroundImage: 'url(/noir/hero-desk.png)' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 90% at 70% 35%, rgba(245,185,66,0.10), transparent 55%), linear-gradient(180deg, #0c0a08 0%, #0a0806 60%, #060504 100%)',
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* ===== The desk lamp (right side) ===== */}
      <div
        className="pointer-events-none absolute right-[6%] top-0 h-full w-[42%] max-w-[640px] select-none md:right-[8%]"
        aria-hidden
      >
        {/* Volumetric light cone (flickers) */}
        <div
          className="lamp-flicker absolute left-1/2 top-[120px] h-[80%] w-[70%] -translate-x-1/2 origin-top"
          style={{
            background:
              'linear-gradient(180deg, rgba(245,185,66,0.55) 0%, rgba(245,185,66,0.28) 30%, rgba(245,185,66,0.08) 70%, transparent 100%)',
            clipPath: 'polygon(46% 0, 54% 0, 100% 100%, 0% 100%)',
            filter: 'blur(2px)',
            mixBlendMode: 'screen',
            opacity: 0.9,
          }}
        />
        {/* Bulb glow (pulses softly + flickers via parent) */}
        <div
          className="lamp-pulse absolute left-1/2 top-[112px] h-32 w-32 -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,225,150,0.95) 0%, rgba(245,185,66,0.55) 35%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Lamp SVG */}
        <svg
          viewBox="0 0 400 600"
          className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3a2a12" />
              <stop offset="35%" stopColor="#8a6a2a" />
              <stop offset="55%" stopColor="#c79a3e" />
              <stop offset="75%" stopColor="#8a6a2a" />
              <stop offset="100%" stopColor="#2a1d0a" />
            </linearGradient>
            <linearGradient id="brassDark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a1208" />
              <stop offset="50%" stopColor="#5a431d" />
              <stop offset="100%" stopColor="#1a1208" />
            </linearGradient>
            <radialGradient id="bulb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff4cc" />
              <stop offset="60%" stopColor="#ffd98a" />
              <stop offset="100%" stopColor="rgba(245,185,66,0)" />
            </radialGradient>
          </defs>

          {/* base */}
          <ellipse cx="200" cy="572" rx="120" ry="20" fill="#1a1208" opacity="0.6" />
          <path d="M120 565 Q200 540 280 565 L268 575 Q200 555 132 575 Z" fill="url(#brassDark)" />
          <rect x="150" y="540" width="100" height="28" rx="6" fill="url(#brass)" />

          {/* vertical stem */}
          <rect x="194" y="300" width="12" height="245" fill="url(#brass)" />
          {/* stem joint */}
          <circle cx="200" cy="300" r="13" fill="url(#brassDark)" />
          <circle cx="200" cy="300" r="6" fill="#1a1208" />

          {/* gooseneck arm to shade */}
          <path
            d="M200 300 C 200 250, 250 220, 300 200 C 330 188, 350 175, 348 150"
            stroke="url(#brass)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          {/* shade joint */}
          <circle cx="348" cy="150" r="10" fill="url(#brassDark)" />

          {/* lamp shade (cone) */}
          <path
            d="M300 110 L396 150 L360 215 L264 175 Z"
            fill="url(#brass)"
            stroke="#2a1d0a"
            strokeWidth="2"
          />
          <path
            d="M300 110 L396 150 L360 215 L264 175 Z"
            fill="url(#brassDark)"
            opacity="0.25"
          />
          {/* shade opening (where light comes out) */}
          <ellipse cx="330" cy="192" rx="50" ry="12" fill="#1a1208" />
          {/* bulb glow inside shade opening */}
          <ellipse cx="330" cy="192" rx="40" ry="9" fill="url(#bulb)" />

          {/* cord */}
          <path
            d="M150 568 C 90 580, 60 620, 40 660"
            stroke="#0c0a08"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* ===== Drifting dust motes ===== */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden>
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-amber-200/60"
            style={{
              left: `${m.left}%`,
              bottom: '-10px',
              width: `${m.size}px`,
              height: `${m.size}px`,
              animation: `mote-drift ${m.dur}s linear ${m.delay}s infinite`,
              boxShadow: '0 0 6px rgba(245,185,66,0.7)',
            }}
          />
        ))}
      </div>

      {/* ===== Hero text content ===== */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-28 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Case file tag */}
          <div className="mb-6 inline-flex items-center gap-3 border border-blood/40 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blood" />
            <span className="font-type text-xs uppercase tracking-[0.35em] text-blood">
              Case File No. 1947-M
            </span>
          </div>

          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-paper sm:text-6xl md:text-7xl lg:text-8xl">
            The{' '}
            <span className="italic text-lamp drop-shadow-[0_0_25px_rgba(245,185,66,0.45)]">
              Marlowe
            </span>
            <br />
            Affair
          </h1>

          <p className="mt-7 max-w-xl font-type text-sm leading-relaxed text-paper/70 sm:text-base">
            A candle went out in the library at 11:47&nbsp;PM. By midnight, the
            industrialist Sir Edmund Marlowe was dead — and every guest at the
            estate had a reason to want him gone. Book your seat at the table.
            Find the killer before the lamp goes cold.
          </p>

          {/* Quick facts row */}
          <div className="mt-9 grid max-w-lg grid-cols-3 gap-4">
            {[
              { k: 'Duration', v: '2 hrs' },
              { k: 'Players', v: '6–12' },
              { k: 'Setting', v: '1947 noir' },
            ].map((f) => (
              <div
                key={f.k}
                className="border-l-2 border-lamp/40 pl-3"
              >
                <div className="font-type text-[10px] uppercase tracking-[0.25em] text-paper/50">
                  {f.k}
                </div>
                <div className="font-display text-lg text-paper">{f.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-6 hidden items-center gap-3 md:flex"
        >
          <span className="font-type text-[10px] uppercase tracking-[0.3em] text-paper/40">
            Examine the evidence
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-lamp/60 to-transparent" />
        </motion.div>
      </div>

      {/* film grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0" aria-hidden />
    </section>
  );
}
