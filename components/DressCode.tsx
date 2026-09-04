import { Shirt } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { wedding } from "@/config/wedding";

export default function DressCode() {
  const dc = wedding.dressCode;

  return (
    <section id="dresscode" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          eyebrow="Dress code"
          title={dc.title}
          description={dc.description}
        />

        <Reveal className="flex flex-wrap items-center justify-center gap-6">
          {dc.palette.map((c) => (
            <div key={c.hex} className="flex flex-col items-center gap-2">
              <span
                className="h-16 w-16 rounded-full border-4 border-white shadow-md ring-1 ring-ink/5 sm:h-20 sm:w-20"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-xs font-medium text-ink-soft">{c.name}</span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <Shirt size={16} className="text-gold" />
          <span>
            Messieurs : costume clair bienvenu. Mesdames : escarpins ou
            sandales — la soirée se termine sur la piste de danse !
          </span>
        </Reveal>
      </div>
    </section>
  );
}
