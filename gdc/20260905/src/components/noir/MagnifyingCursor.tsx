'use client';

import { useEffect, useRef } from 'react';

/**
 * MagnifyingCursor
 * Renders a custom detective's loupe (magnifying glass) that follows the
 * pointer with a slight spring-lag for an "examining the evidence" feel.
 * The native cursor is hidden on fine-pointer devices; on touch devices the
 * component renders nothing and the native cursor is preserved.
 *
 * The lens brightens when hovering interactive elements ([data-lens-target] or
 * a/button) to signal "you can examine this".
 */
export default function MagnifyingCursor() {
  const lensRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on coarse pointers (touch).
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lens = lensRef.current;
    const glow = glowRef.current;
    if (!lens || !glow) return;

    // Target position (where the mouse is) and rendered position (lerped).
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      // Detect interactive targets for the "examining" highlight.
      const el = e.target as HTMLElement | null;
      const isInteractive = !!el?.closest(
        'a, button, [role="button"], [data-lens-target], input, textarea, select, label',
      );
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        lens.dataset.hover = isInteractive ? 'true' : 'false';
        glow.dataset.hover = isInteractive ? 'true' : 'false';
      }
    };

    const onDown = () => {
      lens.dataset.down = 'true';
    };
    const onUp = () => {
      lens.dataset.down = 'false';
    };
    const onLeave = () => {
      lens.style.opacity = '0';
      glow.style.opacity = '0';
    };
    const onEnter = () => {
      lens.style.opacity = '1';
      glow.style.opacity = '1';
    };

    const tick = () => {
      // Lerp toward target for a subtle trailing effect.
      rx += (tx - rx) * 0.32;
      ry += (ty - ry) * 0.32;
      lens.style.transform = `translate3d(${rx - 26}px, ${ry - 26}px, 0)`;
      // Glow lags a touch more for a "spotlight following the detective" feel.
      glow.style.transform = `translate3d(${rx - 120}px, ${ry - 120}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add('noir-cursor-active');
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('noir-cursor-active');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Soft amber spotlight that follows the lens */}
      <div
        ref={glowRef}
        aria-hidden
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[240px] w-[240px] rounded-full opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(245,185,66,0.16) 0%, rgba(245,185,66,0.06) 35%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* The loupe itself */}
      <div
        ref={lensRef}
        aria-hidden
        data-hover="false"
        data-down="false"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[52px] w-[52px] opacity-100"
        style={{ willChange: 'transform' }}
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block transition-transform duration-150"
        >
          {/* handle */}
          <line
            x1="33"
            y1="33"
            x2="48"
            y2="48"
            stroke="#1a1208"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="33"
            y1="33"
            x2="48"
            y2="48"
            stroke="#8a6a2a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* lens ring (outer) */}
          <circle
            cx="21"
            cy="21"
            r="15"
            fill="rgba(245,185,66,0.10)"
            stroke="#1a1208"
            strokeWidth="3"
          />
          {/* lens ring (amber inner) */}
          <circle
            cx="21"
            cy="21"
            r="13"
            fill="none"
            stroke="rgba(245,185,66,0.85)"
            strokeWidth="1.2"
          />
          {/* glass glare */}
          <path
            d="M14 15.5c1.8-2 4.2-3 6.8-3"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* crosshair tick (examining) */}
          <line x1="21" y1="18" x2="21" y2="24" stroke="rgba(168,32,26,0.6)" strokeWidth="1" />
          <line x1="18" y1="21" x2="24" y2="21" stroke="rgba(168,32,26,0.6)" strokeWidth="1" />
        </svg>
        {/* hover ring */}
        <div className="pointer-events-none absolute left-[6px] top-[6px] h-[30px] w-[30px] rounded-full border border-lamp/0 transition-all duration-200" />
      </div>
    </>
  );
}
