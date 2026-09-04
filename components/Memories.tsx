import { Camera, Mic, Upload } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Guestbook from "@/components/Guestbook";
import QRCode from "@/components/QRCode";
import { wedding } from "@/config/wedding";

export default function Memories() {
  const photos = wedding.photos;

  return (
    <section id="souvenirs" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Souvenirs"
          title="Photos & livre d'or"
          description="Partagez vos photos du jour J et laissez une trace écrite… ou vocale !"
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* ── Espace photos ── */}
          <Reveal>
            <div className="card flex h-full flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                <Camera size={22} />
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium text-ink">
                Partagez vos photos
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {photos.note}
              </p>

              <div className="mt-6 rounded-2xl border border-ink/8 bg-white p-3 shadow-sm">
                <QRCode value={photos.uploadUrl} size={160} />
              </div>

              <a
                href={photos.uploadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 w-full"
              >
                <Upload size={16} />
                Uploader mes photos
              </a>

              <p className="mt-6 flex items-start gap-2 rounded-2xl bg-gold/10 p-4 text-left text-xs leading-relaxed text-ink-soft">
                <Mic size={16} className="mt-0.5 shrink-0 text-gold" />
                {photos.audioNote}
              </p>
            </div>
          </Reveal>

          {/* ── Livre d'or ── */}
          <Reveal delay={0.12}>
            <Guestbook />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
