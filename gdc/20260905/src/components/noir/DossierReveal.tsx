'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePaperRustle } from './usePaperRustle';

type Dossier = {
  id: string;
  code: string;
  title: string;
  stamp: string;
  cover: string;
  body: { label: string; value: string }[];
  footnote: string;
};

const DOSSIERS: Dossier[] = [
  {
    id: 'scene',
    code: 'DOSSIER 01',
    title: 'The Crime Scene',
    stamp: 'EVIDENCE',
    cover: 'Library, Marlowe Estate',
    body: [
      { label: 'Location', value: 'Private library, east wing' },
      { label: 'Temperature', value: 'Brandy still warm on the sideboard' },
      { label: 'Doors', value: 'One locked from inside. One ajar.' },
      { label: 'Hearth', value: 'Embers. A singed playing card.' },
    ],
    footnote:
      'The body was found in the wingback chair, as though Sir Edmund had simply fallen asleep reading. He had not.',
  },
  {
    id: 'weapon',
    code: 'DOSSIER 02',
    title: 'The Weapon',
    stamp: 'MISSING',
    cover: 'A candlestick. Heavy. Brass.',
    body: [
      { label: 'Object', value: 'Brass candlestick (pair, one missing)' },
      { label: 'Weight', value: 'Approx. 4 lbs' },
      { label: 'Recovered', value: 'Wiped clean. No prints.' },
      { label: 'Last seen', value: 'Dining-room mantel, 9:00 PM' },
    ],
    footnote:
      'The second candlestick was found in the rose garden, half-buried. The gardener swears he locked the gate.',
  },
  {
    id: 'motive',
    code: 'DOSSIER 03',
    title: 'The Motive',
    stamp: 'SEALED',
    cover: 'A revised will, dated that morning',
    body: [
      { label: 'Document', value: 'Last will & testament, rev. 11/03' },
      { label: 'Change', value: 'Estate split five ways — not six' },
      { label: 'Witness', value: 'Solicitor; departed at 10:15 PM' },
      { label: 'Disinherited', value: 'One name. Struck through in red.' },
    ],
    footnote:
      'Whoever was struck from the will had less than ninety minutes to learn of it — and to act.',
  },
  {
    id: 'timeline',
    code: 'DOSSIER 04',
    title: 'The Timeline',
    stamp: 'CHRONOLOGY',
    cover: 'From dinner to midnight',
    body: [
      { label: '9:00 PM', value: 'Dinner ends. Guests disperse.' },
      { label: '10:15 PM', value: 'Solicitor leaves the estate.' },
      { label: '11:30 PM', value: 'Lights flicker. A scream.' },
      { label: '11:47 PM', value: 'Candle extinguished. Silence.' },
    ],
    footnote:
      'Every guest accounted for at 11:30 — except one, who was "in the garden, getting air."',
  },
];

export default function DossierReveal() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const rustle = usePaperRustle();

  const toggle = (id: string) => {
    setFlipped((p) => ({ ...p, [id]: !p[id] }));
    rustle.play(0.8);
  };

  const flipAll = () => {
    rustle.play(1);
    setFlipped((p) => {
      const allOpen = DOSSIERS.every((d) => p[d.id]);
      const next: Record<string, boolean> = {};
      DOSSIERS.forEach((d) => {
        next[d.id] = !allOpen;
      });
      return next;
    });
  };

  return (
    <section
      id="dossier"
      className="relative w-full border-t border-blood/20 bg-[#0a0806] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 font-type text-xs uppercase tracking-[0.35em] text-blood">
              Section II — The Files
            </div>
            <h2 className="font-display text-4xl text-paper md:text-5xl">
              The Case Dossier
            </h2>
            <p className="mt-3 max-w-xl font-type text-sm leading-relaxed text-paper/55">
              Four folders sat on the Inspector&rsquo;s desk at dawn. Open them.
              Listen for the rustle of paper — every page has a secret on the
              other side.
            </p>
          </div>
          <button
            onClick={flipAll}
            data-lens-target
            className="group inline-flex items-center gap-2 border border-lamp/50 px-4 py-2 font-type text-xs uppercase tracking-[0.25em] text-lamp transition-colors hover:bg-lamp hover:text-ink"
          >
            <span className="inline-block h-2 w-2 bg-lamp transition-transform group-hover:rotate-90" />
            Open all folders
          </button>
        </div>

        {/* dossier grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DOSSIERS.map((d, i) => {
            const isOpen = !!flipped[d.id];
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`flip-3d relative h-[360px] cursor-pointer ${isOpen ? 'is-flipped' : ''}`}
                onClick={() => toggle(d.id)}
                data-lens-target
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(d.id);
                  }
                }}
                aria-label={`${d.title} dossier — click to flip`}
              >
                <div className="flip-inner relative h-full w-full">
                  {/* ===== COVER (front) ===== */}
                  <div className="flip-face paper-texture paper-edge absolute inset-0 flex flex-col p-5">
                    <div className="flex items-start justify-between">
                      <span className="font-type text-[10px] uppercase tracking-[0.3em] text-ink/60">
                        {d.code}
                      </span>
                      <span className="font-type text-[10px] uppercase tracking-[0.25em] text-blood">
                        CONFIDENTIAL
                      </span>
                    </div>

                    {/* center stamp */}
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <div
                        className="mb-4 flex h-24 w-24 rotate-[-9deg] items-center justify-center rounded-full border-[3px] border-blood text-blood"
                        style={{
                          opacity: 0.85,
                        }}
                      >
                        <span className="text-center font-type text-[9px] font-bold uppercase leading-tight tracking-[0.15em]">
                          {d.stamp}
                        </span>
                      </div>
                      <h3 className="text-center font-display text-2xl leading-tight text-ink">
                        {d.title}
                      </h3>
                      <p className="mt-2 text-center font-type text-[11px] italic text-ink/55">
                        {d.cover}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-ink/15 pt-3">
                      <span className="font-type text-[10px] uppercase tracking-[0.2em] text-ink/45">
                        Sealed · 1947
                      </span>
                      <span className="font-type text-[10px] uppercase tracking-[0.2em] text-ink/60">
                        Flip →
                      </span>
                    </div>
                  </div>

                  {/* ===== INSIDE (back) ===== */}
                  <div className="flip-face flip-back paper-texture paper-edge absolute inset-0 flex flex-col p-5">
                    <div className="flex items-start justify-between">
                      <span className="font-type text-[10px] uppercase tracking-[0.3em] text-ink/60">
                        {d.code}
                      </span>
                      <span className="font-type text-[10px] uppercase tracking-[0.25em] text-ink/45">
                        Contents
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-xl text-ink">
                      {d.title}
                    </h3>

                    <ul className="mt-3 flex-1 space-y-2.5 overflow-y-auto pr-1 custom-scroll">
                      {d.body.map((row) => (
                        <li
                          key={row.label}
                          className="border-b border-dashed border-ink/20 pb-2"
                        >
                          <div className="font-type text-[9px] uppercase tracking-[0.2em] text-ink/50">
                            {row.label}
                          </div>
                          <div className="font-type text-[12px] leading-snug text-ink">
                            {row.value}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-3 border-t border-ink/15 pt-3 font-type text-[10px] italic leading-snug text-ink/60">
                      {d.footnote}
                    </p>

                    <div className="mt-2 text-right">
                      <span className="font-type text-[10px] uppercase tracking-[0.2em] text-ink/45">
                        ← Flip back
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
