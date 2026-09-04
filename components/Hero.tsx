"use client";

import { motion } from "framer-motion";
import { CalendarPlus, ChevronDown, Heart, MapPin } from "lucide-react";
import Countdown from "@/components/Countdown";
import { wedding } from "@/config/wedding";
import {
  buildWeddingEvent,
  downloadIcs,
  googleCalendarUrl,
} from "@/lib/ics";

export default function Hero() {
  const event = buildWeddingEvent();

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-28 text-center"
    >
      {/* ── Fond : dégradés doux ivoire / sauge / doré ──
           Pour utiliser votre photo, déposez /public/images/hero.jpg
           et décommentez le bloc <div> image ci-dessous. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(152,164,135,0.25),transparent),radial-gradient(50%_40%_at_85%_20%,rgba(194,160,92,0.18),transparent),radial-gradient(70%_60%_at_50%_100%,rgba(230,220,201,0.6),transparent)]" />
      {/* <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${wedding.heroImage})` }}
      >
        <div className="absolute inset-0 bg-ivory/70 backdrop-blur-[2px]" />
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-3xl flex-col items-center"
      >
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-gold">
          Nous nous marions
        </p>

        <h1 className="font-display text-6xl font-medium leading-tight text-ink sm:text-7xl md:text-8xl">
          {wedding.couple.name1}
          <span className="mx-3 inline-block font-light italic text-gold sm:mx-5">
            &
          </span>
          {wedding.couple.name2}
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-medium uppercase tracking-[0.2em] text-ink-soft">
          <span>{wedding.dateLabel}</span>
          <span className="hidden h-1 w-1 rounded-full bg-gold sm:inline-block" />
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gold" />
            {wedding.city}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-12"
        >
          <Countdown targetISO={wedding.weddingDate} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a href="#rsvp" className="btn-primary">
            <Heart size={16} />
            Confirmer ma présence (RSVP)
          </a>
          <div className="flex gap-3">
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <CalendarPlus size={16} />
              Google Agenda
            </a>
            <button
              onClick={() => downloadIcs(event)}
              className="btn-outline"
              aria-label="Télécharger le fichier .ics pour Apple Calendar / Outlook"
            >
              <CalendarPlus size={16} />
              .ics
            </button>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#programme"
        aria-label="Défiler vers le programme"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
        className="absolute bottom-24 text-ink-soft md:bottom-8"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
