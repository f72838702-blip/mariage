import type { Metadata } from "next";
import { Suspense } from "react";
import CardWorkshop from "@/components/CardWorkshop";

export const metadata: Metadata = {
  title: "Carte d'invitation — Mariame & Bobacar",
  description:
    "Carte d'invitation de mariage haut de gamme, personnalisable par invité et imprimable en 105 × 147 mm.",
  robots: { index: false },
};

export default function CartePage() {
  return (
    <Suspense fallback={null}>
      <CardWorkshop />
    </Suspense>
  );
}