import { BedDouble, ExternalLink, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { wedding } from "@/config/wedding";

export default function Accommodation() {
  return (
    <section id="hebergement" className="bg-cream/60 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Dormir sur place"
          title="Où séjourner ?"
          description="Nos recommandations d'hébergements à proximité des festivités."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wedding.hotels.map((hotel, i) => (
            <Reveal key={hotel.name} delay={i * 0.08}>
              <article className="card flex h-full flex-col">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                  <BedDouble size={18} />
                </span>
                <h3 className="font-display text-xl font-medium text-ink">
                  {hotel.name}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                  <MapPin size={14} className="text-gold" />
                  {hotel.distance}
                </p>
                <p className="mt-1 text-sm font-medium text-ink">{hotel.price}</p>
                <a
                  href={hotel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-sage-dark transition-colors hover:text-gold"
                >
                  Réserver
                  <ExternalLink size={14} />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
