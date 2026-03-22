"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useId } from "react";
import { useTheme } from "../context/theme-context";

const TRACK_W = 72;
const PADDING = 4;
const THUMB = 32;
const TRAVEL = TRACK_W - PADDING * 2 - THUMB;

function SunIcon({
  className,
  clipPathId,
}: {
  className?: string;
  clipPathId: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <clipPath id={clipPathId}>
        <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
      </clipPath>
      <g clipPath={`url(#${clipPathId})`}>
        <circle cx="16" cy="16" r="9.34" />
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 5.5v-4" />
          <path d="M16 30.5v-4" />
          <path d="M1.5 16h4" />
          <path d="M26.5 16h4" />
          <path d="m23.4 8.6 2.8-2.8" />
          <path d="m5.7 26.3 2.9-2.9" />
          <path d="m5.8 5.8 2.8 2.8" />
          <path d="m23.4 23.4 2.9 2.9" />
        </g>
      </g>
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M21.64 13a9 9 0 1 1-10.73-10.73 1 1 0 0 1 1.23 1.23 6 6 0 0 0 7.27 7.27 1 1 0 0 1 1.23 1.23Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const base = useId().replace(/:/g, "");
  const sunClipA = `${base}-sun-a`;
  const sunClipB = `${base}-sun-b`;
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const x = useMotionValue(isDark ? TRAVEL : 0);
  const xSpring = useSpring(x, { stiffness: 420, damping: 32, mass: 0.7 });
  const sunOpacity = useTransform(xSpring, [0, TRAVEL * 0.45], [1, 0.28]);
  const moonOpacity = useTransform(xSpring, [TRAVEL * 0.55, TRAVEL], [0.28, 1]);

  useEffect(() => {
    x.set(isDark ? TRAVEL : 0);
  }, [isDark, x]);

  const reducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      title="Toggle theme"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="group relative h-11 w-[4.5rem] shrink-0 cursor-pointer rounded-xl border border-border bg-gradient-to-b from-surface-raised to-surface p-1 shadow-inner outline-none ring-border-bright/50 transition-shadow hover:shadow-md focus-visible:ring-2"
    >
      <span className="sr-only">Toggle theme</span>

      <div
        className="pointer-events-none absolute inset-1 flex items-center justify-between px-0.5"
        aria-hidden
      >
        <motion.span
          style={{ opacity: sunOpacity }}
          className="flex h-7 w-7 items-center justify-center text-accent"
        >
          <SunIcon clipPathId={sunClipA} className="h-[1.1rem] w-[1.1rem]" />
        </motion.span>
        <motion.span
          style={{ opacity: moonOpacity }}
          className="flex h-7 w-7 items-center justify-center text-accent-secondary"
        >
          <MoonIcon className="h-4 w-4" />
        </motion.span>
      </div>

      <motion.span
        style={{ x: xSpring }}
        className="absolute left-1 top-1 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-surface shadow-md ring-1 ring-border"
        whileTap={{ scale: reducedMotion ? 1 : 0.92 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ scale: 0.65, opacity: 0, rotate: -25 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className={isDark ? "text-accent-secondary" : "text-accent"}
        >
          {isDark ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon clipPathId={sunClipB} className="h-[0.95rem] w-[0.95rem]" />
          )}
        </motion.span>
      </motion.span>
    </button>
  );
}
