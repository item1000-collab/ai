---
Task ID: 1
Agent: main (Z.ai Code)
Task: Build a murder-mystery booking site with a flickering desk-lamp hero, paper-flip dossier reveal, red-string suspect connections, giant press-stamp "Join the Game" CTA with paper-rustle audio, and a magnifying-glass cursor.

Work Log:
- Explored the existing Next.js 16 scaffold (shadcn/ui, framer-motion, Tailwind v4 all present).
- Invoked the image-generation skill and generated 6 noir assets into /public/noir/ via a sequential, retrying bun script (scripts/gen-noir-images.ts): hero-desk.png (1344x768) + 5 mugshot portraits (864x1152). Hit and resolved a 429 rate-limit and a size-multiple-of-32 validation error.
- Rewrote src/app/globals.css with a noir theme: warm-black background with SVG film-grain, amber lamp / blood-red / sepia-paper tokens, paper + corkboard textures, flicker/pulse/stamp-slam/string-pulse keyframes, custom-scrollbar, torn-paper clip-path, and a `.noir-cursor-active` rule that hides the native cursor on fine pointers.
- Swapped layout.tsx fonts to Special Elite (typewriter) + Playfair Display (serif) and updated metadata to "The Marlowe Affair".
- Built src/components/noir/MagnifyingCursor.tsx: a detective's loupe (SVG) that follows the pointer via rAF + lerp, with a trailing amber spotlight; brightens over interactive elements; disabled on coarse/touch pointers.
- Built src/components/noir/usePaperRustle.ts: synthesises a realistic paper-rustle/flip sound with the Web Audio API (filtered noise bursts + envelopes) — no external audio files. Lazily created AudioContext on first user gesture.
- Built DeskLampHero.tsx: a brass gooseneck desk-lamp SVG casting a flickering volumetric light cone + pulsing bulb glow, 18 drifting dust motes, vignette, film grain, hero title and case-file tag. (Motes use a deterministic sine-PRNG rounded to 2dp to avoid SSR/CSR hydration mismatch.)
- Built DossierReveal.tsx: 4 paper-textured folders that flip on a 3D Y-axis (CSS preserve-3d) to reveal case contents; "Open all folders" toggles all; paper-rustle plays on each flip.
- Built SuspectBoard.tsx: corkboard with 5 mugshot cards + a victim note, connected by 8 sagging red-string SVG paths (quadratic bezier + non-scaling-stroke); hover/focus highlights a suspect's connections and dims the rest, side profile panel shows alibi + motive; click-to-mark stamps a "PERSON OF INTEREST" overlay. Two-step select-then-mark interaction for touch.
- Built PressStampCTA.tsx: a giant rotated red press-stamp "JOIN THE GAME" that slams down (CSS keyframe) + plays paper rustle, lifts away to leave a "CONFIRMED · Case No." ink imprint, then reveals a booking form (name/email/night/party) with real upcoming Saturdays; submitting slams a "SEALED · CASE OPEN" confirmation. "File another case" resets.
- Assembled src/app/page.tsx: sticky case-file header with nav anchors, the four sections, and a sticky footer (min-h-screen flex flex-col + mt-auto).
- Fixed a hydration mismatch (Math.random in mote inline styles) by switching to a deterministic, rounded PRNG.
- Refined the stamp CTA so the stamp lifts away leaving a clean imprint (instead of stamp + imprint overlapping).
- Made the suspect board responsive (taller aspect ratio on mobile) and changed copy from "Hover/Click" to device-neutral "Select/Tap".

Stage Summary:
- All 6 requested features implemented and browser-verified: flickering desk-lamp hero, paper-flip dossier, red-string suspect connections, giant press-stamp CTA with paper-rustle audio, magnifying-glass cursor.
- `bun run lint` passes clean; dev server runs on port 3000 with no errors/warnings/hydration-mismatches.
- Agent Browser verified end-to-end: hero renders, dossier cards flip (individual + open-all), suspect hover highlights strings + updates profile panel + marks on click, stamp CTA slams → imprint → booking form → "Sealed" confirmation, footer flush at bottom, mobile (390px) and desktop (1440px) both render cleanly.
- Artifacts: src/components/noir/{MagnifyingCursor,DeskLampHero,DossierReveal,SuspectBoard,PressStampCTA,usePaperRustle}.tsx, scripts/gen-noir-images.ts, public/noir/*.png.
