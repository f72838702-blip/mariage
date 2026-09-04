"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Great_Vibes } from "next/font/google";
import { Facebook, Heart, Instagram, Twitter, Youtube } from "lucide-react";
import { wedding } from "@/config/wedding";

/* ─────────────────────────────────────────────────────────────
   Carte d'invitation haut de gamme — vue "Flat Lay"
   · Papeterie ivoire texturée, bords frangés (deckled edges)
   · Photo du couple dans un masque organique à filet doré
   · Pivoines & eucalyptus feuille d'or aux quatre coins
   · Pied de page : QR RSVP + réseaux sociaux
   Toutes les tailles sont en cqw (container queries) :
   responsive et fidèle à l'impression 105 × 147 mm (voir /carte).
   ───────────────────────────────────────────────────────────── */

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const IVORY = "#FDFBF7";
const GOLD = "#D4AF37";
const GOLD_LEAF = "#C5A059";
const BRONZE = "#8C7453";
const BROWN_GOLD = "#6B5344";
const TAUPE = "#7A685A";

/* ── E. Botaniques de coin : pivoine 5 pétales + rameau d'eucalyptus ──
   Dessinée pour le coin haut-gauche (0,0), miroitée via -scale-x/-scale-y. */
function CornerFlora({ className = "" }: { className?: string }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={`pointer-events-none absolute opacity-90 ${className}`}>
      <defs>
        <linearGradient id="gold-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD_LEAF} />
          <stop offset="100%" stopColor={BRONZE} />
        </linearGradient>
      </defs>

      {/* Tige principale en courbe douce depuis le coin */}
      <g stroke="url(#gold-leaf)" strokeWidth="1" strokeLinecap="round">
        <path d="M3 3 C 20 12, 38 28, 50 50" />
      </g>

      {/* Feuilles rondes d'eucalyptus, posées sur la tige */}
      {[
        [13, 8, 32, 4.2],
        [21, 13, 36, 3.6],
        [28, 19, 40, 4.6],
        [36, 27, 46, 3.8],
        [43, 37, 52, 4.2],
        [48, 45, 58, 3.4],
      ].map(([x, y, r, s], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={s}
          ry={s * 0.72}
          transform={`rotate(${r} ${x} ${y})`}
          fill="url(#gold-leaf)"
          fillOpacity={i % 2 ? 0.5 : 0.32}
          stroke="url(#gold-leaf)"
          strokeWidth="0.5"
        />
      ))}

      {/* Pivoine stylisée au bout de la tige */}
      <g transform="translate(58 58)">
        {petals.map((a) => (
          <ellipse key={a} rx="4.8" ry="9" transform={`rotate(${a}) translate(0 -9.5)`} fill="url(#gold-leaf)" fillOpacity="0.38" stroke="url(#gold-leaf)" strokeWidth="0.7" />
        ))}
        {petals.map((a) => (
          <ellipse key={`i-${a}`} rx="3" ry="5.4" transform={`rotate(${a + 36}) translate(0 -5)`} fill="url(#gold-leaf)" fillOpacity="0.55" stroke="none" />
        ))}
        <circle r="2.4" fill={BRONZE} />
      </g>

      {/* Baies en prolongement */}
      <g fill="url(#gold-leaf)" stroke="none">
        <circle cx="72" cy="74" r="1.8" />
        <circle cx="79" cy="81" r="1.3" />
        <circle cx="85" cy="87" r="1" />
      </g>
    </svg>
  );
}

/* ── B. Photo dans un masque organique à filet doré ── */
function OrganicPhoto({ src, alt }: { src: string; alt: string }) {
  const blob =
    "M150 6 C 208 0 258 30 276 84 C 292 132 278 162 282 208 C 286 264 246 322 184 332 C 128 341 92 314 58 286 C 26 258 10 224 26 176 C 42 130 32 96 62 58 C 92 22 108 10 150 6 Z";
  return (
    <svg viewBox="0 0 300 344" className="block h-auto w-[46cqw]" role="img" aria-label={alt}>
      <defs>
        <clipPath id="organic-blob">
          <path d={blob} />
        </clipPath>
      </defs>
      <image href={src} width="300" height="344" preserveAspectRatio="xMidYMid slice" clipPath="url(#organic-blob)" />
      <path d={blob} fill="none" stroke={GOLD} strokeWidth="1.6" />
    </svg>
  );
}

/* ── Grain papier artisanal (feTurbulence) ── */
function PaperGrain() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]">
      <filter id="paper-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
    </svg>
  );
}

export type InvitationCardProps = {
  /** Nom de l'invité affiché sur la carte (carte personnalisée) */
  guestName?: string;
  /** Lien encodé dans le QR code (défaut : URL du site) */
  qrUrl?: string;
  className?: string;
};

export default function InvitationCard({
  guestName,
  qrUrl,
  className = "",
}: InvitationCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const target = qrUrl ?? wedding.siteUrl;
    let alive = true;
    QRCode.toDataURL(target, {
      margin: 0,
      width: 512,
      errorCorrectionLevel: "M",
      color: { dark: BROWN_GOLD, light: "#00000000" },
    })
      .then((url) => {
        if (alive) setQrDataUrl(url);
      })
      .catch(() => {
        if (alive) setQrDataUrl(null);
      });
    return () => {
      alive = false;
    };
  }, [qrUrl]);

  const time = wedding.program[0]?.time ?? "15h00";
  const venue = wedding.venues[0];

  return (
    <article
      className={`relative aspect-[5/7] overflow-hidden text-center [container-type:inline-size] ${scriptFont.variable} ${className}`}
      style={{ background: IVORY, color: BROWN_GOLD }}
    >
      {/* Bords frangés : ombre interne irrégulière façon papier artisanal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(198,181,158,0.35), inset 2px 2px 6px rgba(140,116,83,0.10), inset -2px -3px 8px rgba(140,116,83,0.12)",
        }}
      />
      {/* Grain papier */}
      <PaperGrain />

      {/* ── E. Botaniques feuille d'or aux quatre coins ── */}
      <CornerFlora className="left-0 top-0 w-[26cqw]" />
      <CornerFlora className="right-0 top-0 w-[26cqw] -scale-x-100" />
      <CornerFlora className="bottom-0 left-0 w-[26cqw]" />
      <CornerFlora className="bottom-0 right-0 w-[26cqw] -scale-y-100" />

      <div className="relative flex h-full flex-col items-center px-[7cqw] pb-[4.5cqw] pt-[5cqw]">
        {/* ── A. En-tête : anneau/cœur + script + site ── */}
        <span className="flex h-[6cqw] w-[6cqw] items-center justify-center rounded-full border" style={{ borderColor: "rgba(197,160,89,0.6)", color: GOLD_LEAF }}>
          <Heart className="h-[2.8cqw] w-[2.8cqw]" fill="currentColor" strokeWidth={0} />
        </span>
        <p
          className="mt-[0.8cqw] leading-none"
          style={{ fontFamily: "var(--font-script)", fontSize: "7.5cqw", color: BROWN_GOLD }}
        >
          Wed-Day
        </p>
        <p className="mt-[1cqw] text-[1.9cqw] tracking-[0.3em]" style={{ color: "#7C6354" }}>
          {new URL(wedding.siteUrl).hostname}
        </p>

        {/* ── B. Photo organique ── */}
        <div className="mt-[2.4cqw]">
          <OrganicPhoto src={wedding.heroImage} alt={`${wedding.couple.name1} & ${wedding.couple.name2}`} />
        </div>

        {/* ── C. Textes ── */}
        <p className="mt-[2.2cqw] text-[2cqw] uppercase tracking-[0.42em]" style={{ color: "#8C7A6B" }}>
          — Nous nous marions —
        </p>

        <p
          className="mt-[0.4cqw] leading-[1.1]"
          style={{ fontFamily: "var(--font-script)", fontSize: "10cqw", color: BROWN_GOLD }}
        >
          {wedding.couple.name1} <span style={{ color: GOLD_LEAF }}>&amp;</span> {wedding.couple.name2}
        </p>

        {/* Ligne invité (carte personnalisée) */}
        {guestName ? (
          <p className="mt-[0.8cqw] text-[2cqw] uppercase tracking-[0.3em]" style={{ color: BRONZE }}>
            En compagnie de <span className="font-medium" style={{ color: BROWN_GOLD }}>{guestName}</span>
          </p>
        ) : null}

        <p className="mx-auto mt-[1.4cqw] max-w-[80cqw] text-[2.3cqw] leading-snug" style={{ color: TAUPE }}>
          Nous serions honorés de célébrer notre amour à vos côtés — venez partager
          ce jour de joie et de bénédictions avec nos familles.
        </p>

        {/* ── Détails de l'événement ── */}
        <div className="mt-[1.4cqw] text-[2.5cqw] leading-relaxed" style={{ color: TAUPE }}>
          <p className="font-medium uppercase tracking-[0.24em]" style={{ color: BROWN_GOLD }}>
            {wedding.dateLabel}
          </p>
          <p>à {time}, en après-midi</p>
          <p>{venue?.name ?? "Bluezone de Dixinn"} — {wedding.city}</p>
        </div>

        {/* ── D. Pied de page : QR RSVP + réseaux ── */}
        <div className="mt-auto flex flex-col items-center">
          <div className="flex items-center gap-[2.4cqw]">
            <div className="border p-[0.8cqw]" style={{ borderColor: "rgba(197,160,89,0.55)" }}>
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrDataUrl} alt="QR code RSVP" className="block h-[10cqw] w-[10cqw]" />
              ) : (
                <div className="h-[10cqw] w-[10cqw] animate-pulse bg-[#efe9de]" />
              )}
            </div>
            <p className="max-w-[40cqw] text-left text-[1.9cqw] uppercase leading-relaxed tracking-[0.18em]" style={{ color: "#7C6354" }}>
              Scannez pour confirmer votre présence{" "}
              <span style={{ color: GOLD_LEAF }}>(RSVP)</span>
            </p>
          </div>

          <div className="mt-[1.6cqw] flex items-center gap-[4.5cqw]" style={{ color: GOLD_LEAF }}>
            <Instagram className="h-[3.2cqw] w-[3.2cqw]" strokeWidth={1.4} aria-label="Instagram" />
            <Facebook className="h-[3.2cqw] w-[3.2cqw]" strokeWidth={1.4} aria-label="Facebook" />
            <Youtube className="h-[3.2cqw] w-[3.2cqw]" strokeWidth={1.4} aria-label="YouTube" />
            <Twitter className="h-[3.2cqw] w-[3.2cqw]" strokeWidth={1.4} aria-label="Twitter" />
          </div>
          <p className="mt-[0.8cqw] text-[2cqw] tracking-[0.26em]" style={{ color: BRONZE }}>
            {wedding.couple.hashtag}
          </p>
        </div>
      </div>
    </article>
  );
}