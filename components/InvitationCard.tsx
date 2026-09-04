"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { wedding } from "@/config/wedding";

/* ─────────────────────────────────────────────────────────────
   Carte d'invitation haut de gamme — portrait 5:7
   Papyrus #FDFBF7 · Sauge sombre #2C3E35 · Or laiton #D4AF37
   Toutes les tailles sont en cqw (container queries) :
   la carte reste fidèle quelle que soit sa largeur à l'écran,
   et s'imprime à 105 × 147 mm (voir /carte).
   ───────────────────────────────────────────────────────────── */

const PAPYRUS = "#FDFBF7";
const SAGE_DARK = "#2C3E35";
const BRASS = "#D4AF37";

/** Rameau botanique minimaliste (traits fins, feuilles en amande) */
function Sprig({ className = "" }: { className?: string }) {
  const leaf = (x: number, y: number, dir: 1 | -1) =>
    `M${x} ${y} c${dir * 12} -1 ${dir * 18} -8 ${dir * 20} -18 c${dir * -13} 1 ${dir * -18} 8 ${dir * -20} 18 z`;
  return (
    <svg viewBox="0 0 60 120" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 118 C 26 90, 27 55, 34 8" />
        {/* Feuilles alternées le long de la tige */}
        <path d={leaf(29, 102, 1)} />
        <path d={leaf(28.5, 88, -1)} />
        <path d={leaf(30, 72, 1)} />
        <path d={leaf(30.5, 58, -1)} />
        <path d={leaf(32, 42, 1)} />
        <path d={leaf(33, 28, -1)} />
      </g>
      {/* Baies au sommet */}
      <g fill="currentColor">
        <circle cx="34" cy="7" r="1.4" />
        <circle cx="29.5" cy="13" r="1.2" />
        <circle cx="38.5" cy="14" r="1.2" />
      </g>
    </svg>
  );
}

/** Séparateur : filets dorés + losange */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-[2.4cqw]" style={{ color: BRASS }} aria-hidden>
      <span className="block h-px w-[18cqw]" style={{ background: BRASS, opacity: 0.7 }} />
      <span className="block h-[1.4cqw] w-[1.4cqw] rotate-45" style={{ background: BRASS }} />
      <span className="block h-px w-[18cqw]" style={{ background: BRASS, opacity: 0.7 }} />
    </div>
  );
}

/**
 * Équerre ornementale de cadre (dessinée pour le coin haut-gauche,
 * se miroite via -scale-x/-scale-y) : double arrondi + losange + point.
 */
function FrameCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" fill="none" aria-hidden className={`pointer-events-none absolute h-[11cqw] w-[11cqw] ${className}`}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 2 H12 Q2 2 2 12 V50" strokeWidth="1.3" />
        <path d="M50 6.5 H14 Q6.5 6.5 6.5 14 V50" strokeWidth="0.9" opacity="0.55" />
      </g>
      <path d="M19 15.8 L22.2 19 L19 22.2 L15.8 19 Z" fill="currentColor" />
      <circle cx="26.5" cy="26.5" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/** Petit losange posé sur le filet, au milieu d'un bord */
function EdgeDiamond({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-[1.8cqw] w-[1.8cqw] rotate-45 border border-[#D4AF37] ${className}`}
      style={{ background: PAPYRUS }}
    />
  );
}

export type InvitationCardProps = {
  /** Nom de l'invité affiché sous « À l'attention de » (carte personnalisée) */
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
      color: { dark: SAGE_DARK, light: "#00000000" },
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
      className={`relative aspect-[5/7] overflow-hidden text-center [container-type:inline-size] ${className}`}
      style={{ background: PAPYRUS, color: SAGE_DARK }}
    >
      {/* ── Cadre ornemental ── */}
      {/* Filet doré extérieur */}
      <div className="pointer-events-none absolute inset-[2.4cqw] border border-[#D4AF37]/70" />
      {/* Équerres doubles aux quatre coins */}
      <div className="absolute inset-0" style={{ color: BRASS }} aria-hidden>
        <FrameCorner className="left-[2.4cqw] top-[2.4cqw]" />
        <FrameCorner className="right-[2.4cqw] top-[2.4cqw] -scale-x-100" />
        <FrameCorner className="bottom-[2.4cqw] left-[2.4cqw] -scale-y-100" />
        <FrameCorner className="bottom-[2.4cqw] right-[2.4cqw] -scale-x-100 -scale-y-100" />
      </div>
      {/* Losange posé sur le filet, au milieu de chaque bord */}
      <EdgeDiamond className="left-1/2 top-[2.4cqw] -translate-x-1/2 -translate-y-1/2" />
      <EdgeDiamond className="bottom-[2.4cqw] left-1/2 -translate-x-1/2 translate-y-1/2" />
      <EdgeDiamond className="left-[2.4cqw] top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <EdgeDiamond className="right-[2.4cqw] top-1/2 translate-x-1/2 -translate-y-1/2" />

      {/* Halo papyrus très doux au centre */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 30%, rgba(212,175,55,0.06), transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col items-center px-[8cqw] pb-[5cqw] pt-[6cqw]">
        {/* ── Monogramme entouré de rameaux ── */}
        <div className="flex items-center gap-[3.5cqw]" style={{ color: BRASS }}>
          <Sprig className="h-auto w-[7.5cqw]" />
          <div className="flex h-[12.5cqw] w-[12.5cqw] items-center justify-center rounded-full border border-[#D4AF37]/60">
            <span className="font-display text-[5cqw] leading-none tracking-[0.06em]">
              M<span className="mx-[0.8cqw] font-normal italic" style={{ color: BRASS }}>&amp;</span>B
            </span>
          </div>
          <Sprig className="h-auto w-[7.5cqw] -scale-x-100" />
        </div>

        {/* ── Phrase d'invitation ── */}
        <p className="mt-[3.6cqw] font-display text-[3.3cqw] italic leading-snug" style={{ color: "#5d6b60" }}>
          Les familles <span className="font-semibold not-italic">Sylla</span> &amp;{" "}
          <span className="font-semibold not-italic">Bah</span>
        </p>
        <p className="mt-[1.8cqw] font-body text-[2.4cqw] uppercase tracking-[0.28em]" style={{ color: "#5d6b60" }}>
          ont l&apos;honneur de vous inviter
          <br />
          au mariage de leurs enfants
        </p>

        {/* ── Ligne invité (carte personnalisée) ── */}
        {guestName ? (
          <div className="mt-[2.4cqw]">
            <p className="font-body text-[1.9cqw] uppercase tracking-[0.32em]" style={{ color: BRASS }}>
              À l&apos;attention de
            </p>
            <p className="mt-[1cqw] font-display text-[5.2cqw] italic leading-tight">
              {guestName}
            </p>
          </div>
        ) : null}

        {/* ── Prénoms des mariés ── */}
        <div className={guestName ? "mt-[1.5cqw]" : "mt-[3.6cqw]"}>
          <p className="font-display text-[11.2cqw] font-medium leading-[1.04] tracking-[0.02em]">
            {wedding.couple.name1}
          </p>
          <p
            className="font-display text-[6cqw] italic leading-[1.05]"
            style={{ color: BRASS }}
          >
            &amp;
          </p>
          <p className="font-display text-[11.2cqw] font-medium leading-[1.04] tracking-[0.02em]">
            {wedding.couple.name2}
          </p>
        </div>

        {/* ── Séparateur ── */}
        <div className={guestName ? "mt-[2.2cqw]" : "mt-[3.4cqw]"}>
          <Divider />
        </div>

        {/* ── Date, heure, lieu ── */}
        <div className={guestName ? "mt-[2.2cqw]" : "mt-[3.4cqw]"}>
          <p className="font-body text-[3cqw] font-medium uppercase tracking-[0.3em]">
            {wedding.dateLabel}
          </p>
          <p className="mt-[1.2cqw] font-body text-[2.5cqw] uppercase tracking-[0.32em]" style={{ color: "#5d6b60" }}>
            à {time}
          </p>
          <p className="mt-[1.5cqw] font-display text-[4.4cqw] font-medium leading-tight">
            {venue?.name ?? "Bluezone de Dixinn"}
          </p>
          <p className="mt-[0.8cqw] font-body text-[2.3cqw] uppercase tracking-[0.26em]" style={{ color: "#5d6b60" }}>
            {wedding.city}
          </p>
        </div>

        {/* ── QR code RSVP ── */}
        <div className="mt-auto flex flex-col items-center">
          <div className="border border-[#D4AF37]/60 p-[1.4cqw]">
            <div className="bg-white p-[1.2cqw]">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrDataUrl} alt="QR code RSVP" className="block h-[13.5cqw] w-[13.5cqw]" />
              ) : (
                <div className="h-[13.5cqw] w-[13.5cqw] animate-pulse bg-[#eef1ec]" />
              )}
            </div>
          </div>
          <p className="mt-[1.4cqw] font-body text-[1.9cqw] uppercase tracking-[0.24em]" style={{ color: "#5d6b60" }}>
            Scannez pour confirmer votre présence{" "}
            <span style={{ color: BRASS }}>(RSVP)</span>
          </p>
        </div>
      </div>
    </article>
  );
}