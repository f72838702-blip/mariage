import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhotosApp from "@/components/PhotosApp";
import { wedding } from "@/config/wedding";

export const metadata: Metadata = {
  title: `Photos partagées — ${wedding.couple.name1} & ${wedding.couple.name2}`,
  description:
    "Partagez vos photos du mariage et téléchargez celles des autres invités après la soirée.",
};

export default function PhotosPage() {
  return (
    <div className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#souvenirs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-gold"
        >
          <ArrowLeft size={15} />
          Retour au site
        </Link>

        <header className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {wedding.dateLabel}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium text-ink md:text-5xl">
            L&apos;album des invités
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
            Partage tes plus belles photos du jour J. Après la soirée, la
            galerie s&apos;ouvrira : tu pourras voir et télécharger les photos
            de tout le monde. {wedding.couple.hashtag}
          </p>
        </header>

        <PhotosApp />
      </div>
    </div>
  );
}
