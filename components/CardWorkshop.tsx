"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy, Printer } from "lucide-react";
import InvitationCard from "@/components/InvitationCard";
import { wedding } from "@/config/wedding";

/* ─────────────────────────────────────────────────────────────
   Atelier de la carte d'invitation (page /carte)
   · Aperçu flottant, ombre très douce
   · Personnalisation par invité : ?a=Nom+de+l'invité ou le champ
   · Impression : une carte 105 × 147 mm par page (@page 5:7)
   ───────────────────────────────────────────────────────────── */

export default function CardWorkshop() {
  const searchParams = useSearchParams();
  const urlGuest = searchParams.get("a") ?? "";
  const [guest, setGuest] = useState(urlGuest);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (urlGuest) setGuest(urlGuest);
  }, [urlGuest]);

  const shareUrl = useMemo(() => {
    const base = `${wedding.siteUrl}/carte`;
    const trimmed = guest.trim();
    return trimmed ? `${base}?a=${encodeURIComponent(trimmed)}` : base;
  }, [guest]);

  const trimmed = guest.trim().slice(0, 80);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center bg-[#7A8475] px-4 pb-20 pt-28">
      <style>{`
        @media print {
          @page { size: 105mm 147mm; margin: 0; }
          header, footer, .no-print { display: none !important; }
          main { padding: 0 !important; }
          .card-stage { padding: 0 !important; background: none !important; }
          .invitation-card {
            width: 105mm !important;
            height: 147mm !important;
            max-width: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
        }
      `}</style>

      {/* ── Atelier (masqué à l'impression) ── */}
      <div className="no-print w-full max-w-xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold-light">
          Carte d&apos;invitation
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium text-white sm:text-4xl">
          Personnalisez, partagez, imprimez
        </h1>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <input
            type="text"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            placeholder="Nom de l'invité (ex. Aboubacar Soumah)"
            maxLength={80}
            className="h-11 w-full flex-1 rounded-full border border-white/30 bg-white/95 px-5 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-gold-light"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyLink}
              className="h-11 whitespace-nowrap rounded-full border border-white/40 px-4 text-sm font-medium text-white transition hover:bg-white/10"
              title="Copier le lien personnalisé de cette carte"
            >
              {copied ? <Check size={16} className="inline text-gold-light" /> : <Copy size={16} className="inline" />}
              <span className="ml-2">{copied ? "Copié !" : "Copier le lien"}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="h-11 whitespace-nowrap rounded-full bg-gold px-5 text-sm font-medium text-ivory transition hover:brightness-110"
            >
              <Printer size={16} className="mr-2 inline" />
              Imprimer
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/80">
          À l&apos;impression : format <strong>105 × 147 mm</strong> (ratio 5:7), une carte par page,
          marges à zéro. Le lien personnalisé de cette carte :{" "}
          <span className="break-all font-medium text-white">{shareUrl}</span>
        </p>
      </div>

      {/* ── Flat lay : la carte flottante sur le fond sauge ── */}
      <div className="card-stage mt-12 flex w-full justify-center px-2 py-10">
        <InvitationCard
          guestName={trimmed || undefined}
          className="invitation-card w-[min(92vw,540px)] rounded-[3px] shadow-[0_50px_100px_-30px_rgba(26,32,24,0.55),0_18px_40px_-18px_rgba(26,32,24,0.4),0_0_0_1px_rgba(255,255,255,0.08)]"
        />
      </div>

      <p className="no-print mt-6 max-w-md text-center text-xs leading-relaxed text-white/70">
        Astuce : ajoutez <code className="rounded bg-white/15 px-1.5 py-0.5 text-white">?a=Nom+de+l&apos;invité</code> à
        l&apos;URL pour pré-remplir le nom — un lien unique par invité, prêt à envoyer sur WhatsApp.
      </p>
    </section>
  );
}