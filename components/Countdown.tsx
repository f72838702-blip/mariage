"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetISO: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function compute(target: number): TimeLeft | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export default function Countdown({ targetISO }: CountdownProps) {
  const target = new Date(targetISO).getTime();
  const [time, setTime] = useState<TimeLeft | null | undefined>(undefined);

  useEffect(() => {
    setTime(compute(target));
    const id = setInterval(() => setTime(compute(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (time === undefined) {
    // SSR / premier rendu : placeholder pour éviter le mismatch d'hydratation
    return <div className="h-24" aria-hidden />;
  }

  if (time === null) {
    return (
      <p className="font-display text-2xl italic text-ink">
        C&apos;est aujourd&apos;hui, le grand jour ! 🎉
      </p>
    );
  }

  const items: { value: number; label: string }[] = [
    { value: time.days, label: "Jours" },
    { value: time.hours, label: "Heures" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Secondes" },
  ];

  return (
    <div className="flex items-stretch gap-3 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex w-18 flex-col items-center rounded-2xl border border-white/50 bg-white/60 px-2 py-4 shadow-sm backdrop-blur-md sm:w-24"
        >
          <span className="font-display text-3xl font-semibold tabular-nums text-ink sm:text-4xl">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink-soft sm:text-xs">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
