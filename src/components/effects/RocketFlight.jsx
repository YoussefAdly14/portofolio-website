import { useEffect, useRef, useState } from 'react';

const clamp = value => Math.min(Math.max(value, 0), 1);
const lerp = (start, end, amount) => start + (end - start) * amount;

const desktopPath = [
  { x: 67, y: 13 },
  { x: 84, y: 28 },
  { x: 70, y: 45 },
  { x: 88, y: 62 },
  { x: 78, y: 78 },
];

const mobilePath = [
  { x: 75, y: 17 },
  { x: 84, y: 32 },
  { x: 71, y: 49 },
  { x: 84, y: 66 },
  { x: 77, y: 80 },
];

const initialDesktopRotation = getRotation(desktopPath, 0);

function getPath(isMobile) {
  return isMobile ? mobilePath : desktopPath;
}

function getPathPoint(path, progress) {
  const maxSegment = path.length - 1;
  const scaled = clamp(progress) * maxSegment;
  const index = Math.min(Math.floor(scaled), maxSegment - 1);
  const localProgress = scaled - index;
  const easedProgress = localProgress * localProgress * (3 - 2 * localProgress);
  const start = path[index];
  const end = path[index + 1];

  return {
    x: lerp(start.x, end.x, easedProgress),
    y: lerp(start.y, end.y, easedProgress),
  };
}

function getRotation(path, progress) {
  const before = getPathPoint(path, clamp(progress - 0.01));
  const after = getPathPoint(path, clamp(progress + 0.01));
  const angleFromRight = Math.atan2(after.y - before.y, after.x - before.x) * (180 / Math.PI);

  // The SVG rocket nose points upward by default, so add 90deg to align it with
  // the tangent direction of travel.
  return angleFromRight + 90;
}

function getScrollProgress() {
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  return clamp(window.scrollY / scrollable);
}

function RocketSvg({ flameOpacity = 1 }) {
  return (
    <svg viewBox="0 0 96 150" className="relative z-10 h-full w-full drop-shadow-[0_18px_40px_rgba(103,232,249,0.28)]" aria-hidden="true">
      <defs>
        <linearGradient id="rocketBody" x1="22" x2="72" y1="16" y2="124" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="0.5" stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id="rocketWindow" x1="34" x2="62" y1="34" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path d="M48 4C31 19 22 43 22 80v32c0 7 6 13 13 13h26c7 0 13-6 13-13V80C74 43 65 19 48 4Z" fill="url(#rocketBody)" />
      <path d="M22 88 6 112v25l25-17-3-28-6-4Z" fill="#38BDF8" opacity="0.84" />
      <path d="M74 88 90 112v25l-25-17 3-28 6-4Z" fill="#38BDF8" opacity="0.84" />
      <circle cx="48" cy="54" r="14" fill="#0F172A" opacity="0.92" />
      <circle cx="48" cy="54" r="10" fill="url(#rocketWindow)" />
      <path d="M33 126h30l-7 12H40l-7-12Z" fill="#475569" />
      <path d="M48 4C43 20 43 121 48 138" fill="none" stroke="white" strokeOpacity="0.32" strokeWidth="3" />
      <path d="M48 145c-9-11-11-21-3-31 1-2 5-2 7 0 7 10 5 20-4 31Z" fill="#F8FAFC" opacity={flameOpacity * 0.86} />
    </svg>
  );
}

function Flame({ intensity }) {
  return (
    <div className="absolute left-1/2 top-[78%] z-0 -translate-x-1/2" style={{ opacity: intensity }}>
      <span className="absolute left-1/2 top-0 h-28 w-12 -translate-x-1/2 origin-top animate-[rocket-flame_420ms_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.95),rgba(245,184,75,0.82)_26%,rgba(249,115,22,0.38)_54%,transparent_78%)] blur-[1px] sm:h-32 sm:w-14" />
      <span className="absolute left-1/2 top-1 h-24 w-8 -translate-x-1/2 origin-top animate-[rocket-flame_360ms_ease-in-out_infinite_alternate-reverse] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(103,232,249,0.56),rgba(245,184,75,0.62)_34%,transparent_74%)] blur-md sm:h-28 sm:w-10" />
      <span className="absolute left-1/2 top-1 h-36 w-14 -translate-x-1/2 origin-top animate-[rocket-plume_680ms_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(103,232,249,0.16),rgba(103,232,249,0.08)_34%,transparent_72%)] blur-xl sm:h-44 sm:w-16" />
    </div>
  );
}

function RocketFlight() {
  const rocketRef = useRef(null);
  const progressRef = useRef(0);
  const displayedProgressRef = useRef(0);
  const previousProgressRef = useRef(0);
  const movementIntensityRef = useRef(0);
  const frameRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const render = () => {
      const rocket = rocketRef.current;

      if (rocket) {
        displayedProgressRef.current = lerp(displayedProgressRef.current, progressRef.current, 0.14);

        if (Math.abs(displayedProgressRef.current - progressRef.current) < 0.001) {
          displayedProgressRef.current = progressRef.current;
        }

        const smoothedProgress = displayedProgressRef.current;
        const path = getPath(mobileQuery.matches);
        const point = getPathPoint(path, smoothedProgress);
        const rotation = getRotation(path, smoothedProgress);
        const landingProgress = clamp((smoothedProgress - 0.86) / 0.14);
        const progressDelta = Math.abs(smoothedProgress - previousProgressRef.current);
        const isMoving = progressDelta > 0.00005 && landingProgress < 0.98;

        movementIntensityRef.current = lerp(movementIntensityRef.current, isMoving ? 1 : 0, isMoving ? 0.32 : 0.08);
        previousProgressRef.current = smoothedProgress;

        rocket.style.transform = `translate3d(calc(${point.x}vw - 50%), calc(${point.y}vh - 50%), 0) rotate(${rotation}deg)`;
        rocket.style.setProperty('--rocket-flame-opacity', `${movementIntensityRef.current * lerp(1, 0.22, landingProgress)}`);
      }

      frameRef.current = window.requestAnimationFrame(render);
    };

    const updateProgress = () => {
      progressRef.current = getScrollProgress();
    };

    const updateMotionPreference = () => {
      const shouldReduceMotion = mediaQuery.matches;
      setPrefersReducedMotion(shouldReduceMotion);
      if (!shouldReduceMotion) {
        updateProgress();
      }
    };

    updateMotionPreference();
    displayedProgressRef.current = progressRef.current;
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    mediaQuery.addEventListener?.('change', updateMotionPreference);
    mobileQuery.addEventListener?.('change', updateProgress);

    if (!mediaQuery.matches) {
      frameRef.current = window.requestAnimationFrame(render);
    }

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      mediaQuery.removeEventListener?.('change', updateMotionPreference);
      mobileQuery.removeEventListener?.('change', updateProgress);
    };
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden opacity-65 sm:opacity-75 md:opacity-85" aria-hidden="true">
      <style>
        {`
          @keyframes rocket-flame {
            from { transform: translateX(-50%) scaleY(0.84) scaleX(0.9); opacity: 0.72; }
            to { transform: translateX(-50%) scaleY(1.18) scaleX(1.08); opacity: 1; }
          }

          @keyframes rocket-plume {
            from { transform: translateX(-50%) scaleY(0.78) scaleX(0.86); opacity: 0.42; }
            to { transform: translateX(-50%) scaleY(1.15) scaleX(1.12); opacity: 0.68; }
          }
        `}
      </style>

      <div className="absolute inset-0 opacity-70 mix-blend-screen">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M965 115 C 1180 215, 925 370, 1170 555 S 1020 735, 1125 785"
            fill="none"
            stroke="url(#flightTrail)"
            strokeWidth="2"
            strokeDasharray="12 18"
            opacity="0.42"
          />
          <defs>
            <linearGradient id="flightTrail" x1="950" x2="1180" y1="110" y2="790" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67E8F9" stopOpacity="0.08" />
              <stop offset="0.52" stopColor="#F8FAFC" stopOpacity="0.44" />
              <stop offset="1" stopColor="#F5B84B" stopOpacity="0.12" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div
        ref={rocketRef}
        className="absolute left-0 top-0 h-[clamp(64px,7.8vw,124px)] w-[clamp(41px,5vw,79px)] origin-center will-change-transform"
        style={{
          transform: `translate3d(calc(${desktopPath[0].x}vw - 50%), calc(${desktopPath[0].y}vh - 50%), 0) rotate(${initialDesktopRotation}deg)`,
          '--rocket-flame-opacity': 0,
        }}
      >
        <Flame intensity="var(--rocket-flame-opacity, 1)" />
        <RocketSvg flameOpacity={0.9} />
      </div>
    </div>
  );
}

export default RocketFlight;
