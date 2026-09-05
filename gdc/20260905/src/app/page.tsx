import MagnifyingCursor from '@/components/noir/MagnifyingCursor';
import DeskLampHero from '@/components/noir/DeskLampHero';
import DossierReveal from '@/components/noir/DossierReveal';
import SuspectBoard from '@/components/noir/SuspectBoard';
import PressStampCTA from '@/components/noir/PressStampCTA';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <MagnifyingCursor />

      {/* ===== Sticky top case bar ===== */}
      <header className="sticky top-0 z-50 border-b border-blood/25 bg-[#0c0a08]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a
            href="#top"
            data-lens-target
            className="group flex items-center gap-3"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blood" />
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-paper">
              The Marlowe Affair
            </span>
            <span className="hidden font-type text-[10px] uppercase tracking-[0.25em] text-paper/40 sm:inline">
              · Case No. 1947-M
            </span>
          </a>

          <nav className="flex items-center gap-1 sm:gap-2">
            {[
              { href: '#dossier', label: 'Dossier' },
              { href: '#suspects', label: 'Suspects' },
              { href: '#join', label: 'Join' },
            ].map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-lens-target
                className="px-2 py-1.5 font-type text-[11px] uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-lamp sm:px-3"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <main id="top" className="flex-1">
        <DeskLampHero />
        <DossierReveal />
        <SuspectBoard />
        <PressStampCTA />
      </main>

      {/* ===== Sticky footer ===== */}
      <footer className="mt-auto border-t border-blood/25 bg-[#060504]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="font-display text-xl font-bold uppercase tracking-[0.15em] text-paper">
                The Marlowe Bureau
              </div>
              <p className="mt-2 max-w-sm font-type text-[11px] leading-relaxed text-paper/45">
                Purveyors of confounding evenings since 1947. Every killer is
                cast. Every clue is planted. The only variable is you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-2 font-type text-[11px] uppercase tracking-[0.2em] text-paper/50 sm:grid-cols-3">
              <a href="#dossier" data-lens-target className="transition-colors hover:text-lamp">
                The Files
              </a>
              <a href="#suspects" data-lens-target className="transition-colors hover:text-lamp">
                Persons of Interest
              </a>
              <a href="#join" data-lens-target className="transition-colors hover:text-lamp">
                Book a Seat
              </a>
              <span className="text-paper/35">Press Inquiries</span>
              <span className="text-paper/35">Refunds Policy</span>
              <span className="text-paper/35">Confidential Line</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-paper/10 pt-5 font-type text-[10px] uppercase tracking-[0.2em] text-paper/30 sm:flex-row sm:items-center">
            <span>© 1947 — The Marlowe Bureau · all confessions reserved</span>
            <span className="text-paper/40">
              11b Fogarty Lane · bookings@marlowe.bureau
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
