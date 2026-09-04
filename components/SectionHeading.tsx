import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
      <div className="mx-auto mt-6 h-px w-16 bg-gold/60" />
    </Reveal>
  );
}
