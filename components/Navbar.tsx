"use client";

import {
  CalendarClock,
  Camera,
  Gift,
  Heart,
  Home,
  MapPin,
} from "lucide-react";

const links = [
  { href: "#programme", label: "Programme" },
  { href: "#lieux", label: "Lieux" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#cagnotte", label: "Cagnotte" },
  { href: "#souvenirs", label: "Souvenirs" },
];

const mobileLinks = [
  { href: "#accueil", label: "Accueil", icon: Home },
  { href: "#programme", label: "Programme", icon: CalendarClock },
  { href: "#rsvp", label: "RSVP", icon: Heart, highlight: true },
  { href: "#lieux", label: "Lieux", icon: MapPin },
  { href: "#souvenirs", label: "Souvenirs", icon: Camera },
];

export default function Navbar() {
  return (
    <>
      {/* ══ Barre supérieure (desktop) ══ */}
      <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-ink/5 bg-ivory/80 backdrop-blur-md md:block">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#accueil" className="font-display text-xl italic text-ink">
            A <span className="text-gold">&</span> M
          </a>
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#rsvp" className="btn-primary px-5 py-2.5 text-xs">
            <Heart size={14} />
            RSVP
          </a>
        </nav>
      </header>

      {/* ══ Barre supérieure (mobile) — minimaliste ══ */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-ink/5 bg-ivory/80 px-5 py-3 backdrop-blur-md md:hidden">
        <a href="#accueil" className="font-display text-lg italic text-ink">
          A <span className="text-gold">&</span> M
        </a>
        <a
          href="#cagnotte"
          className="flex items-center gap-1.5 text-xs font-medium text-gold"
        >
          <Gift size={14} />
          Cagnotte
        </a>
      </header>

      {/* ══ Bottom bar (mobile-first) ══ */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/8 bg-ivory/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:hidden">
        <ul className="mx-auto grid max-w-md grid-cols-5">
          {mobileLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="flex flex-col items-center gap-1 py-2.5 text-ink-soft transition-colors active:text-gold"
              >
                {l.highlight ? (
                  <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white shadow-lg shadow-gold/30 ring-4 ring-ivory">
                    <l.icon size={20} />
                  </span>
                ) : (
                  <l.icon size={20} />
                )}
                <span className="text-[10px] font-medium">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
