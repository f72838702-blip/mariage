import {
  GlassWater,
  Landmark,
  Music,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { wedding } from "@/config/wedding";

const iconMap: Record<(typeof wedding.program)[number]["icon"], LucideIcon> = {
  landmark: Landmark,
  glass: GlassWater,
  utensils: UtensilsCrossed,
  music: Music,
};

export default function Program() {
  return (
    <section id="programme" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Le jour J"
          title="Programme"
          description={`${wedding.dateLabel} — déroulé de la journée, étape par étape.`}
        />

        <ol className="relative ml-3 border-l border-sand sm:ml-6">
          {wedding.program.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <Reveal key={step.title} delay={i * 0.08} className="relative pb-10 pl-10 last:pb-0 sm:pl-14">
                <span className="absolute -left-[22px] top-0 flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-white text-sage-dark shadow-sm">
                  <Icon size={18} />
                </span>
                <span className="inline-block rounded-full bg-sage/15 px-3 py-1 text-xs font-semibold tracking-widest text-sage-dark">
                  {step.time}
                </span>
                <h3 className="mt-2 font-display text-2xl font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
