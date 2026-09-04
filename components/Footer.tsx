import { Heart, MessageCircle, Send } from "lucide-react";
import { wedding } from "@/config/wedding";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-ink/8 bg-cream/60 px-6 pt-16 pb-28 md:pb-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Restons connectés
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium text-ink md:text-4xl">
          Le canal des invités
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
          Rejoignez le groupe pour recevoir toutes les infos pratiques à
          jour : navettes, changements de dernière minute, photos…
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={wedding.social.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={16} />
            Rejoindre le groupe WhatsApp
          </a>
          <a
            href={wedding.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Send size={16} />
            Canal Telegram
          </a>
        </div>

        <div className="mt-14 border-t border-ink/8 pt-8">
          <p className="font-display text-2xl italic text-ink">
            {wedding.couple.name1} & {wedding.couple.name2}
          </p>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-ink-soft">
            Merci d&apos;être à nos côtés
            <Heart size={13} className="fill-gold text-gold" />
          </p>
          <p className="mt-4 text-xs font-medium tracking-[0.2em] text-gold">
            {wedding.couple.hashtag}
          </p>
        </div>
      </div>
    </footer>
  );
}
