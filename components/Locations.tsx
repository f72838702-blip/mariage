import { MapPin, Navigation } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { wedding } from "@/config/wedding";

function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default function Locations() {
  return (
    <section id="lieux" className="bg-cream/60 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="S'y rendre"
          title="Lieux de réception"
          description="Deux adresses, une seule journée. Ouvrez l'itinéraire en un clic."
        />

        <div className="mx-auto grid max-w-2xl gap-6">
          {wedding.venues.map((venue, i) => (
            <Reveal key={venue.name} delay={i * 0.1}>
              <article className="card flex h-full flex-col">
                <span className="mb-3 w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
                  {venue.label}
                </span>
                <h3 className="font-display text-2xl font-medium text-ink">
                  {venue.name}
                </h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-sage-dark" />
                  {venue.address}
                </p>
                <p className="mt-3 text-sm italic text-ink-soft/80">{venue.note}</p>

                <div className="mt-6 pt-2">
                  <a
                    href={mapsUrl(venue.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full px-4 py-2.5 text-xs"
                  >
                    <Navigation size={14} />
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
