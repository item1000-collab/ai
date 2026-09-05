'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePaperRustle } from './usePaperRustle';

function nextSaturdays(count: number): Date[] {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(20, 0, 0, 0);
  // advance to next Saturday
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const add = (6 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + add);
  for (let i = 0; i < count; i++) {
    out.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return out;
}

function fmt(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function PressStampCTA() {
  const rustle = usePaperRustle();
  const [phase, setPhase] = useState<'idle' | 'stamped' | 'sealed'>('idle');
  const [slamKey, setSlamKey] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', night: '', party: '2' });
  const [caseNo] = useState(
    () => 'M-' + Math.floor(1000 + Math.random() * 9000),
  );

  const nights = useMemo(() => nextSaturdays(4), []);

  const handleStamp = () => {
    if (phase !== 'idle') return;
    rustle.ensure();
    rustle.play(1);
    setSlamKey((k) => k + 1);
    // Reveal the imprint + form shortly after the slam lands.
    setTimeout(() => setPhase('stamped'), 480);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rustle.play(0.8);
    setSlamKey((k) => k + 1);
    setTimeout(() => setPhase('sealed'), 400);
  };

  return (
    <section
      id="join"
      className="relative w-full overflow-hidden border-t border-blood/20 bg-[#0a0806] py-20 md:py-28"
    >
      {/* warm lamp glow from above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 -z-0"
        style={{
          background:
            'radial-gradient(80% 100% at 50% 0%, rgba(245,185,66,0.12), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 font-type text-xs uppercase tracking-[0.35em] text-blood">
            Section IV — The Invitation
          </div>
          <h2 className="font-display text-4xl text-paper md:text-5xl">
            Take the Case
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-type text-sm leading-relaxed text-paper/55">
            One stamp. One seat at the table. When the lamp flickers out, the
            game begins — and the killer is already in the room.
          </p>
        </div>

        {/* ===== The paper ===== */}
        <div className="paper-texture paper-edge relative mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-16">
          {/* perforated edge top */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-3 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle, #1a1208 1px, transparent 1.5px)',
              backgroundSize: '12px 6px',
              backgroundPosition: 'center top',
            }}
            aria-hidden
          />

          {/* ===== Giant press-stamp CTA ===== */}
          <div className="relative flex min-h-[220px] flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.button
                  key="stamp"
                  type="button"
                  data-lens-target
                  onClick={handleStamp}
                  className="stamp-slam group relative block select-none"
                  initial={{ opacity: 0, y: -40, scale: 1.15 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -60, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* the slam is driven by a keyed child so it re-runs */}
                  <div
                    key={slamKey}
                    className="stamp-slam relative block"
                    style={{ animationDuration: '0.6s' }}
                  >
                    <div
                      className="stamp-ink relative flex items-center justify-center border-[5px] border-blood px-10 py-7 md:px-16 md:py-9"
                      style={{
                        background:
                          'radial-gradient(circle at 30% 25%, rgba(168,32,26,0.92), rgba(140,24,18,0.96))',
                        transform: 'rotate(-9deg)',
                        boxShadow:
                          '0 14px 28px rgba(0,0,0,0.55), inset 0 0 0 3px rgba(255,255,255,0.06)',
                      }}
                    >
                      {/* inner double border */}
                      <div className="pointer-events-none absolute inset-2 border-2 border-blood/40" />
                      <div className="relative text-center">
                        <div className="font-type text-[10px] font-bold uppercase tracking-[0.5em] text-paper/80">
                          Press here to
                        </div>
                        <div className="font-display text-4xl font-black uppercase leading-none tracking-tight text-paper md:text-6xl">
                          Join
                          <br />
                          the Game
                        </div>
                        <div className="mt-2 font-type text-[9px] uppercase tracking-[0.4em] text-paper/70">
                          — Marlowe Bureau · est. 1947 —
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              )}

              {/* ink imprint left after the stamp lifts away */}
              {phase === 'stamped' && (
                <motion.div
                  key="imprint"
                  initial={{ opacity: 0, scale: 1.6, rotate: -16 }}
                  animate={{ opacity: 0.92, scale: 1, rotate: -9 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="stamp-ink relative block"
                >
                  <div className="border-[4px] border-blood px-10 py-6 text-center md:px-14 md:py-7">
                    <div className="font-display text-3xl font-black uppercase tracking-[0.15em] text-blood md:text-4xl">
                      Confirmed
                    </div>
                    <div className="mt-1 font-type text-[10px] uppercase tracking-[0.3em] text-blood/70">
                      Case No. {caseNo}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* hint */}
            {phase === 'idle' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-2 font-type text-[11px] uppercase tracking-[0.3em] text-ink/45"
              >
                ↑ slam the stamp to begin
              </motion.p>
            )}
          </div>

          {/* ===== Booking form (revealed after stamp) ===== */}
          <AnimatePresence>
            {phase === 'stamped' && (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="border-t-2 border-dashed border-ink/30 pt-8">
                  <h3 className="font-display text-2xl text-ink">
                    Reserve your seat
                  </h3>
                  <p className="mt-1 font-type text-[12px] text-ink/60">
                    The lamp flickers at 8:00 PM sharp. Arrive fifteen minutes
                    early — the doorman does not wait.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-type text-[10px] uppercase tracking-[0.2em] text-ink/60">
                        Detective name
                      </span>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="e.g. Sam Spade"
                        className="mt-1 w-full border-2 border-ink/30 bg-paper/40 px-3 py-2 font-type text-sm text-ink placeholder:text-ink/30 focus:border-blood focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="font-type text-[10px] uppercase tracking-[0.2em] text-ink/60">
                        Wire address
                      </span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="you@precinct.gov"
                        className="mt-1 w-full border-2 border-ink/30 bg-paper/40 px-3 py-2 font-type text-sm text-ink placeholder:text-ink/30 focus:border-blood focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="font-type text-[10px] uppercase tracking-[0.2em] text-ink/60">
                        Night of the affair
                      </span>
                      <select
                        required
                        value={form.night}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, night: e.target.value }))
                        }
                        className="mt-1 w-full border-2 border-ink/30 bg-paper/40 px-3 py-2 font-type text-sm text-ink focus:border-blood focus:outline-none"
                      >
                        <option value="" disabled>
                          Select a Saturday…
                        </option>
                        {nights.map((n) => (
                          <option key={n.toISOString()} value={n.toISOString()}>
                            {fmt(n)} · 8:00 PM
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="font-type text-[10px] uppercase tracking-[0.2em] text-ink/60">
                        Party size
                      </span>
                      <select
                        value={form.party}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, party: e.target.value }))
                        }
                        className="mt-1 w-full border-2 border-ink/30 bg-paper/40 px-3 py-2 font-type text-sm text-ink focus:border-blood focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={String(n)}>
                            {n} {n === 1 ? 'detective' : 'detectives'}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <button
                    type="submit"
                    data-lens-target
                    className="group mt-7 inline-flex w-full items-center justify-center gap-3 border-[3px] border-blood bg-blood px-6 py-4 font-display text-xl font-black uppercase tracking-wide text-paper transition-all hover:bg-[#8a1a16] hover:shadow-[0_0_30px_rgba(168,32,26,0.5)]"
                  >
                    Seal the dossier
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* ===== Sealed confirmation ===== */}
          <AnimatePresence>
            {phase === 'sealed' && (
              <motion.div
                key="sealed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-12 flex flex-col items-center text-center"
              >
                <div
                  className="stamp-slam stamp-ink mb-6 border-[5px] border-blood px-10 py-7"
                  style={{ transform: 'rotate(-7deg)' }}
                >
                  <div className="font-type text-[12px] font-bold uppercase tracking-[0.4em] text-blood">
                    Sealed
                  </div>
                  <div className="font-display text-3xl font-black uppercase text-blood">
                    Case Open
                  </div>
                </div>
                <h3 className="font-display text-3xl text-ink">
                  You&rsquo;re on the list, {form.name || 'Detective'}.
                </h3>
                <p className="mt-3 max-w-md font-type text-sm leading-relaxed text-ink/70">
                  Case No.{' '}
                  <span className="font-bold text-blood">{caseNo}</span> has
                  been filed. A wire with your dossier and table assignment will
                  arrive before the night of the affair. Keep your alibi
                  straight.
                </p>
                <button
                  type="button"
                  data-lens-target
                  onClick={() => {
                    setPhase('idle');
                    setForm({ name: '', email: '', night: '', party: '2' });
                  }}
                  className="mt-7 border-2 border-ink/40 px-5 py-2 font-type text-xs uppercase tracking-[0.25em] text-ink/70 transition-colors hover:border-blood hover:text-blood"
                >
                  File another case
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* perforated edge bottom */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle, #1a1208 1px, transparent 1.5px)',
              backgroundSize: '12px 6px',
              backgroundPosition: 'center bottom',
            }}
            aria-hidden
          />
        </div>

        {/* small print */}
        <p className="mx-auto mt-6 max-w-xl text-center font-type text-[10px] uppercase tracking-[0.2em] text-paper/35">
          The Marlowe Bureau · 11b Fogarty Lane · bookings non-refundable once
          the candle is lit
        </p>
      </div>
    </section>
  );
}
