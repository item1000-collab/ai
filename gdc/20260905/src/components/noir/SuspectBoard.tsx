'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Suspect = {
  id: string;
  name: string;
  role: string;
  img: string;
  x: number; // % position (center)
  y: number;
  alibi: string;
  motive: string;
};

const SUSPECTS: Suspect[] = [
  {
    id: 'victim',
    name: 'Sir Edmund Marlowe',
    role: 'The Victim',
    img: '',
    x: 50,
    y: 50,
    alibi: 'Found dead in the wingback chair at 11:47 PM. He will not be answering questions.',
    motive: '—',
  },
  {
    id: 'heiress',
    name: 'Vivienne Marlowe',
    role: 'The Heiress · Daughter',
    img: '/noir/suspect-heiress.png',
    x: 16,
    y: 24,
    alibi: 'Claims she was upstairs bathing. The maid heard a phonograph, not running water.',
    motive: 'Revised will cut her share in half — the morning of the murder.',
  },
  {
    id: 'butler',
    name: 'Mr. Hollis',
    role: 'The Butler · 30 years’ service',
    img: '/noir/suspect-butler.png',
    x: 84,
    y: 22,
    alibi: 'Locking the silver in the pantry. The logbook is in his hand — but the ink is dry.',
    motive: 'Dismissed, effective New Year’s Eve. No reference, no pension.',
  },
  {
    id: 'singer',
    name: 'Delphine Vance',
    role: 'The Jazz Singer',
    img: '/noir/suspect-singer.png',
    x: 12,
    y: 72,
    alibi: '“Getting air” in the rose garden. The gate, she swears, was open.',
    motive: 'Sir Edmund threatened to ruin her after she ended their affair.',
  },
  {
    id: 'doctor',
    name: 'Dr. Alistair Crane',
    role: 'The Family Physician',
    img: '/noir/suspect-doctor.png',
    x: 88,
    y: 72,
    alibi: 'Tending his bag in the study. A half-written prescription is dated for the next morning.',
    motive: 'Forged prescriptions. Sir Edmund knew; the blackmail note is unsigned.',
  },
  {
    id: 'chauffeur',
    name: 'Tommy Briggs',
    role: 'The Chauffeur',
    img: '/noir/suspect-chauffeur.png',
    x: 50,
    y: 92,
    alibi: 'Polishing the Daimler in the garage. The rag is clean; the chrome is not.',
    motive: 'In love with Delphine. Owes Hollis money neither of them will discuss.',
  },
];

type Edge = {
  a: string;
  b: string;
  label: string;
  sag: number; // catenary sag
};

const EDGES: Edge[] = [
  { a: 'victim', b: 'heiress', label: 'daughter', sag: 6 },
  { a: 'victim', b: 'butler', label: 'employee', sag: 5 },
  { a: 'victim', b: 'singer', label: 'patron', sag: 8 },
  { a: 'victim', b: 'doctor', label: 'physician', sag: 7 },
  { a: 'victim', b: 'chauffeur', label: 'driver', sag: 9 },
  { a: 'heiress', b: 'doctor', label: 'patient', sag: 10 },
  { a: 'singer', b: 'chauffeur', label: 'affair', sag: 6 },
  { a: 'butler', b: 'chauffeur', label: 'debt', sag: 8 },
];

export default function SuspectBoard() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [marked, setMarked] = useState<Record<string, boolean>>({});

  const active = useMemo(() => {
    const s = SUSPECTS.find((x) => x.id === hovered);
    return s ?? null;
  }, [hovered]);

  const pos = (id: string) => {
    const s = SUSPECTS.find((x) => x.id === id)!;
    return { x: s.x, y: s.y };
  };

  const isEdgeActive = (e: Edge) =>
    hovered === null ? true : e.a === hovered || e.b === hovered;

  const isSuspectDimmed = (id: string) =>
    hovered !== null && hovered !== id && !EDGES.some((e) => (e.a === hovered && e.b === id) || (e.b === hovered && e.a === id));

  return (
    <section
      id="suspects"
      className="relative w-full border-t border-blood/20 bg-[#0a0806] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="mb-10">
          <div className="mb-3 font-type text-xs uppercase tracking-[0.35em] text-blood">
            Section III — Persons of Interest
          </div>
          <h2 className="font-display text-4xl text-paper md:text-5xl">
            The Suspect Board
          </h2>
          <p className="mt-3 max-w-2xl font-type text-sm leading-relaxed text-paper/55">
            Six names. Eight threads. Select a photograph to follow the red
            string to everyone they knew — and everyone they had reason to
            silence. Tap again to mark a person of interest.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* ===== The board ===== */}
          <div
            className="cork-texture relative aspect-[3/4] overflow-hidden border-4 border-[#3a2a14] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] sm:aspect-[4/3] lg:aspect-[16/11]"
            onMouseLeave={() => setHovered(null)}
          >
            {/* wooden frame inner shadow */}
            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.55)' }}
            />

            {/* ===== Red-string SVG layer ===== */}
            <svg
              className="pointer-events-none absolute inset-0 z-10 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {EDGES.map((e, i) => {
                const p1 = pos(e.a);
                const p2 = pos(e.b);
                const mx = (p1.x + p2.x) / 2;
                const my = (p1.y + p2.y) / 2 + e.sag;
                const activeE = isEdgeActive(e);
                return (
                  <g key={i}>
                    {/* string shadow */}
                    <path
                      d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
                      fill="none"
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{
                        opacity: activeE ? 0.5 : 0.12,
                        transform: 'translateY(1.5px)',
                      }}
                    />
                    {/* the string itself */}
                    <path
                      d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
                      fill="none"
                      stroke={activeE ? '#c8311f' : '#7a1f15'}
                      strokeWidth={activeE ? 2.2 : 1.6}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      className={activeE ? 'string-pulse' : ''}
                      style={{ opacity: activeE ? 1 : 0.28 }}
                    />
                    {/* pushpin dots at endpoints */}
                    <circle cx={p1.x} cy={p1.y} r={1.1} fill="#1a1208" vectorEffect="non-scaling-stroke" />
                    <circle cx={p2.x} cy={p2.y} r={1.1} fill="#1a1208" vectorEffect="non-scaling-stroke" />
                  </g>
                );
              })}
            </svg>

            {/* ===== Suspect cards ===== */}
            {SUSPECTS.map((s) => {
              const isVictim = s.id === 'victim';
              const dim = isSuspectDimmed(s.id);
              const isMarked = !!marked[s.id];
              return (
                <button
                  key={s.id}
                  type="button"
                  data-lens-target
                  onMouseEnter={() => setHovered(s.id)}
                  onFocus={() => setHovered(s.id)}
                  onClick={() => {
                    // Two-step interaction (works for mouse & touch):
                    // first select the suspect to reveal their profile, then a
                    // second interaction marks them as a person of interest.
                    setHovered((cur) => {
                      if (cur !== s.id) return s.id;
                      setMarked((p) => ({ ...p, [s.id]: !p[s.id] }));
                      return cur;
                    });
                  }}
                  className="group absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  aria-label={`${s.name}, ${s.role}. Click to mark as person of interest.`}
                >
                  <div
                    className="relative transition-all duration-300"
                    style={{
                      transform: hovered === s.id ? 'scale(1.08)' : 'scale(1)',
                      opacity: dim ? 0.4 : 1,
                    }}
                  >
                    {/* pushpin */}
                    <span
                      className="absolute left-1/2 top-[-6px] z-10 h-3 w-3 -translate-x-1/2 rounded-full border border-black/40 shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
                      style={{ background: isVictim ? '#222' : 'radial-gradient(circle at 35% 30%, #f5b942, #8a5a1a)' }}
                    />

                    {isVictim ? (
                      // Victim = torn note card
                      <div className="paper-texture paper-edge w-[120px] rotate-[-3deg] p-2 text-center sm:w-[140px]">
                        <div className="font-type text-[8px] uppercase tracking-[0.2em] text-blood">
                          The Victim
                        </div>
                        <div className="font-display text-sm leading-tight text-ink">
                          Sir Edmund
                          <br />
                          Marlowe
                        </div>
                        <div className="mt-1 font-type text-[7px] uppercase tracking-[0.15em] text-ink/50">
                          d. 11:47 PM
                        </div>
                      </div>
                    ) : (
                      // Suspect = mugshot photo
                      <div className="relative w-[110px] sm:w-[128px]">
                        <div className="relative rotate-[var(--rot,0deg)] border-[6px] border-paper bg-[#1a1208] shadow-[0_8px_16px_rgba(0,0,0,0.7)]">
                          <img
                            src={s.img}
                            alt={`Mugshot of ${s.name}`}
                            className="block aspect-[3/4] w-full object-cover"
                            style={{ filter: 'sepia(0.35) contrast(1.1) brightness(0.92)' }}
                            loading="eager"
                          />
                          {/* caption strip */}
                          <div className="paper-texture px-1.5 py-1 text-center">
                            <div className="font-type text-[8px] font-bold uppercase leading-tight tracking-[0.1em] text-ink">
                              {s.name}
                            </div>
                            <div className="font-type text-[7px] uppercase tracking-[0.12em] text-ink/55">
                              {s.role.split('·')[0].trim()}
                            </div>
                          </div>
                          {/* "PERSON OF INTEREST" stamp when marked */}
                          <AnimatePresence>
                            {isMarked && (
                              <motion.div
                                initial={{ scale: 2.4, opacity: 0, rotate: -18 }}
                                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                                exit={{ scale: 2.4, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="stamp-ink pointer-events-none absolute inset-0 flex items-center justify-center"
                              >
                                <span className="border-2 border-blood px-2 py-0.5 text-center font-type text-[8px] font-bold uppercase tracking-[0.15em] text-blood">
                                  Person
                                  <br />
                                  of Interest
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            {/* "EVIDENCE" header tag pinned to board */}
            <div className="pointer-events-none absolute right-3 top-3 z-30 rotate-[6deg]">
              <div className="paper-texture paper-edge px-3 py-1 text-center">
                <div className="font-type text-[8px] uppercase tracking-[0.2em] text-blood">
                  Evidence Locker
                </div>
                <div className="font-type text-[7px] uppercase tracking-[0.15em] text-ink/50">
                  Precinct 14 · 1947
                </div>
              </div>
            </div>
          </div>

          {/* ===== Side dossier panel ===== */}
          <div className="relative">
            <div className="paper-texture paper-edge sticky top-6 h-full min-h-[360px] p-5">
              <div className="mb-3 flex items-center justify-between border-b border-ink/20 pb-2">
                <span className="font-type text-[10px] uppercase tracking-[0.25em] text-ink/60">
                  Subject Profile
                </span>
                <span className="font-type text-[10px] uppercase tracking-[0.2em] text-blood">
                  {active ? 'On the stand' : 'Awaiting'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {active.name}
                    </h3>
                    <div className="font-type text-[11px] uppercase tracking-[0.18em] text-ink/55">
                      {active.role}
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="font-type text-[9px] uppercase tracking-[0.2em] text-blood">
                          Alibi
                        </div>
                        <p className="font-type text-[12px] leading-snug text-ink">
                          {active.alibi}
                        </p>
                      </div>
                      <div>
                        <div className="font-type text-[9px] uppercase tracking-[0.2em] text-blood">
                          Motive
                        </div>
                        <p className="font-type text-[12px] leading-snug text-ink">
                          {active.motive}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-ink/20 pt-3 font-type text-[10px] uppercase tracking-[0.15em] text-ink/45">
                      {marked[active.id]
                        ? '✗ Marked — person of interest'
                        : 'Tap photo to mark as person of interest'}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-[260px] flex-col items-center justify-center text-center"
                  >
                    <div className="mb-3 text-4xl text-ink/30">🔍</div>
                    <p className="max-w-[220px] font-type text-[12px] italic leading-snug text-ink/50">
                      Select a photograph on the board. The red string will show
                      you who they were to the dead man — and to each other.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
