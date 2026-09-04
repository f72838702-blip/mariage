"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
}

interface GuestbookState {
  messages: GuestMessage[];
  add: (m: GuestMessage) => void;
}

const seedMessages: GuestMessage[] = [
  {
    id: "seed-1",
    name: "Famille Diallo",
    message:
      "Félicitations aux tourtereaux ! Que votre union soit remplie de joie, de baraka et de belles années ensemble.",
    date: "15/09/2026",
  },
  {
    id: "seed-2",
    name: "Aminata & Sékou",
    message:
      "On a dansé jusqu'au bout de la nuit… Merci pour ce moment magique. Longue et heureuse vie à vous deux !",
    date: "15/09/2026",
  },
];

export const useGuestbook = create<GuestbookState>()(
  persist(
    (set) => ({
      messages: seedMessages,
      add: (m) => set((s) => ({ messages: [m, ...s.messages] })),
    }),
    { name: "mariage-guestbook" },
  ),
);
