"use client";

import { useState } from "react";
import { Check, Copy, CreditCard, Gift, Smartphone } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { wedding } from "@/config/wedding";

export default function GiftRegistry() {
  const [copied, setCopied] = useState(false);
  const gifts = wedding.gifts;

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(gifts.iban);
    } catch {
      // Fallback navigateurs anciens
      const ta = document.createElement("textarea");
      ta.value = gifts.iban;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="cagnotte" className="bg-cream/60 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Liste de mariage"
          title="Cagnotte des mariés"
          description={gifts.intro}
        />

        <div className="space-y-6">
          {/* IBAN */}
          <Reveal>
            <div className="card">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <CreditCard size={18} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-ink">
                    Virement bancaire
                  </h3>
                  <p className="text-xs text-ink-soft">{gifts.ibanOwner}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-dashed border-gold/40 bg-ivory px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <code className="font-mono text-sm tracking-wider text-ink">
                  {gifts.iban}
                </code>
                <button
                  onClick={copyIban}
                  className={`btn-outline shrink-0 px-4 py-2 text-xs ${copied ? "border-sage-dark text-sage-dark" : ""}`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copié !" : "Copier l'IBAN"}
                </button>
              </div>
            </div>
          </Reveal>

          {/* Paiements directs */}
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={gifts.paypal}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003087]/10 text-[#003087]">
                  <Gift size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">PayPal</p>
                  <p className="text-xs text-ink-soft">Contribution en un clic</p>
                </div>
              </a>

              {gifts.mobileMoney.map((mm) => (
                <div key={mm.name} className="card flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                    <Smartphone size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{mm.name}</p>
                    <p className="font-mono text-xs text-ink-soft">{mm.number}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
