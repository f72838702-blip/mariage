"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Music, Send, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { wedding } from "@/config/wedding";
import { DIET_OPTIONS, rsvpSchema, type RsvpValues } from "@/lib/schemas";

export default function RsvpForm() {
  const [submitted, setSubmitted] = useState<RsvpValues | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RsvpValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { attending: "yes", adults: 0, children: 0, diets: [] },
  });

  const attending = watch("attending");

  function onSubmit(values: RsvpValues) {
    // 1) Sauvegarde locale (historique côté invité)
    try {
      const history = JSON.parse(localStorage.getItem("mariage-rsvp") ?? "[]");
      history.push({ ...values, date: new Date().toISOString() });
      localStorage.setItem("mariage-rsvp", JSON.stringify(history));
    } catch {
      /* stockage indisponible : on continue */
    }

    // 2) Ouverture WhatsApp avec le récapitulatif pré-rempli vers les mariés
    const lines = [
      `RSVP — Mariage ${wedding.couple.name1} & ${wedding.couple.name2}`,
      `Nom : ${values.firstName} ${values.lastName}`,
      `Présence : ${values.attending === "yes" ? "Sera présent(e) ✅" : "Ne pourra pas venir ❌"}`,
      `Accompagnants : ${values.adults} adulte(s), ${values.children} enfant(s)`,
      values.diets.length ? `Régimes : ${values.diets.join(", ")}` : "",
      values.allergies ? `Allergies : ${values.allergies}` : "",
      values.song ? `Chanson : ${values.song}` : "",
    ].filter(Boolean);

    window.open(
      `https://wa.me/${wedding.rsvp.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
    );

    // 3) Écran de confirmation
    // TODO prod : remplacer par un POST vers Supabase / Google Forms / API route
    setSubmitted(values);
  }

  return (
    <section id="rsvp" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Répondez s'il vous plaît"
          title="Confirmez votre présence"
          description={`Merci de répondre avant le ${wedding.rsvp.deadline}. Un message WhatsApp pré-rempli sera envoyé aux mariés.`}
        />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center"
          >
            <CheckCircle2 size={48} className="mx-auto text-sage-dark" />
            <h3 className="mt-4 font-display text-3xl font-medium text-ink">
              Merci {submitted.firstName} !
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {submitted.attending === "yes"
                ? "Votre réponse est enregistrée. Vérifiez que le message WhatsApp a bien été envoyé aux mariés — on a hâte de vous voir !"
                : "Votre réponse est enregistrée. Vous nous manquerez, mais merci d'avoir pris le temps de répondre."}
            </p>
            <button
              onClick={() => setSubmitted(null)}
              className="btn-outline mt-6 px-5 py-2.5 text-xs"
            >
              Modifier ma réponse
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card space-y-6"
            noValidate
          >
            {/* Identité */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="label-field">
                  Prénom *
                </label>
                <input
                  id="firstName"
                  className="input-field"
                  placeholder="Aminata"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="label-field">
                  Nom *
                </label>
                <input
                  id="lastName"
                  className="input-field"
                  placeholder="Diallo"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Présence */}
            <fieldset>
              <legend className="label-field">Serez-vous des nôtres ? *</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    { value: "yes", label: "Sera présent(e) 🎉", active: "border-gold bg-gold/10 text-ink" },
                    { value: "no", label: "Ne pourra pas venir 😢", active: "border-ink/40 bg-ink/5 text-ink" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3.5 text-sm font-medium transition-all ${
                      attending === opt.value
                        ? opt.active
                        : "border-ink/12 bg-white text-ink-soft hover:border-ink/25"
                    }`}
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      className="sr-only"
                      {...register("attending")}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {errors.attending && (
                <p className="mt-1 text-xs text-red-600">{errors.attending.message}</p>
              )}
            </fieldset>

            {/* Accompagnants */}
            {attending === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-6 overflow-hidden"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="adults" className="label-field flex items-center gap-1.5">
                      <Users size={12} /> Accompagnants adultes
                    </label>
                    <input
                      id="adults"
                      type="number"
                      min={0}
                      max={10}
                      className="input-field"
                      {...register("adults", { valueAsNumber: true })}
                    />
                    {errors.adults && (
                      <p className="mt-1 text-xs text-red-600">{errors.adults.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="children" className="label-field">
                      Enfants
                    </label>
                    <input
                      id="children"
                      type="number"
                      min={0}
                      max={10}
                      className="input-field"
                      {...register("children", { valueAsNumber: true })}
                    />
                    {errors.children && (
                      <p className="mt-1 text-xs text-red-600">{errors.children.message}</p>
                    )}
                  </div>
                </div>

                {/* Régimes */}
                <fieldset>
                  <legend className="label-field">Régimes alimentaires</legend>
                  <div className="flex flex-wrap gap-2">
                    {DIET_OPTIONS.map((diet) => (
                      <label key={diet} className="cursor-pointer">
                        <input
                          type="checkbox"
                          value={diet}
                          className="peer sr-only"
                          {...register("diets")}
                        />
                        <span className="inline-block rounded-full border border-ink/12 bg-white px-4 py-2 text-xs font-medium text-ink-soft transition-all peer-checked:border-sage-dark peer-checked:bg-sage/15 peer-checked:text-sage-dark">
                          {diet}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="allergies" className="label-field">
                    Allergies / précisions (facultatif)
                  </label>
                  <textarea
                    id="allergies"
                    rows={2}
                    className="input-field resize-none"
                    placeholder="Arachides, fruits de mer, menu enfant…"
                    {...register("allergies")}
                  />
                </div>

                <div>
                  <label htmlFor="song" className="label-field flex items-center gap-1.5">
                    <Music size={12} /> Une chanson qui vous fera danser ? (facultatif)
                  </label>
                  <input
                    id="song"
                    className="input-field"
                    placeholder="Titre — Artiste"
                    {...register("song")}
                  />
                </div>
              </motion.div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              <Send size={16} />
              Envoyer ma réponse
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
