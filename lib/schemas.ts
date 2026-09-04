import { z } from "zod";

export const DIET_OPTIONS = [
  "Végétarien",
  "Vegan",
  "Halal",
  "Sans gluten",
  "Sans lactose",
] as const;

export const rsvpSchema = z.object({
  firstName: z.string().min(2, "Prénom requis (2 caractères min.)"),
  lastName: z.string().min(2, "Nom requis (2 caractères min.)"),
  attending: z.enum(["yes", "no"], { message: "Merci de choisir une réponse" }),
  adults: z
    .number({ message: "Nombre invalide" })
    .int()
    .min(0, "0 minimum")
    .max(10, "10 maximum"),
  children: z
    .number({ message: "Nombre invalide" })
    .int()
    .min(0)
    .max(10, "10 maximum"),
  diets: z.array(z.string()),
  allergies: z.string().max(300).optional(),
  song: z.string().max(120).optional(),
});

export type RsvpValues = z.infer<typeof rsvpSchema>;

export const guestbookSchema = z.object({
  name: z.string().min(2, "Votre nom (2 caractères min.)").max(60),
  message: z
    .string()
    .min(4, "Quelques mots au moins…")
    .max(500, "500 caractères maximum"),
});

export type GuestbookValues = z.infer<typeof guestbookSchema>;
