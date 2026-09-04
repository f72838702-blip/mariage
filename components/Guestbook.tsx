"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, Send } from "lucide-react";
import { guestbookSchema, type GuestbookValues } from "@/lib/schemas";
import { useGuestbook } from "@/lib/store";

export default function Guestbook() {
  const { messages, add } = useGuestbook();
  const [mounted, setMounted] = useState(false);

  // Le store est persisté en localStorage : on attend le montage
  // pour éviter tout mismatch d'hydratation SSR.
  useEffect(() => setMounted(true), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<GuestbookValues>({ resolver: zodResolver(guestbookSchema) });

  function onSubmit(values: GuestbookValues) {
    add({
      id: crypto.randomUUID(),
      name: values.name,
      message: values.message,
      date: new Date().toLocaleDateString("fr-FR"),
    });
    reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4" noValidate>
        <h3 className="flex items-center gap-2 font-display text-2xl font-medium text-ink">
          <MessageCircleHeart size={22} className="text-gold" />
          Laissez-nous un mot
        </h3>
        <div>
          <label htmlFor="gb-name" className="label-field">
            Votre nom *
          </label>
          <input
            id="gb-name"
            className="input-field"
            placeholder="Famille Camara"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="gb-message" className="label-field">
            Votre message *
          </label>
          <textarea
            id="gb-message"
            rows={3}
            className="input-field resize-none"
            placeholder="Un souvenir, un conseil, vos vœux…"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
          )}
        </div>
        <button type="submit" className="btn-primary w-full">
          <Send size={15} />
          Déposer mon message
        </button>
        {isSubmitSuccessful && (
          <p className="text-center text-xs font-medium text-sage-dark">
            Merci ! Votre message est ajouté au livre d&apos;or 🤍
          </p>
        )}
      </form>

      {mounted && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.blockquote
                key={m.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-3xl border border-gold/20 bg-gradient-to-br from-white to-gold-light/15 p-5 shadow-sm"
              >
                <p className="font-display text-lg italic leading-relaxed text-ink">
                  « {m.message} »
                </p>
                <footer className="mt-3 flex items-center justify-between text-xs text-ink-soft">
                  <span className="font-semibold uppercase tracking-widest">
                    — {m.name}
                  </span>
                  <span>{m.date}</span>
                </footer>
              </motion.blockquote>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
