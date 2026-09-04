# 💍 Site de mariage — Aïssata & Mamadou

Plateforme de mariage élégante, mobile-first, construite avec **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + React Hook Form + Zod + Zustand**.

## 🚀 Démarrage

```bash
npm install
npm run dev
# → http://localhost:3000
```

## ✏️ Personnalisation (2 minutes)

**Tout se passe dans `config/wedding.ts`** : prénoms, date, lieux, programme, dress code, hôtels, IBAN, PayPal, Mobile Money, liens Drive/WhatsApp/Telegram.

| À personnaliser | Où |
|---|---|
| Prénoms, date, ville | `config/wedding.ts` → `couple`, `weddingDate`, `city` |
| Photo de couverture | Déposer `public/images/hero.jpg` puis décommenter le `<div>` image dans `components/Hero.tsx` |
| Programme du jour J | `wedding.program` |
| Lieux & adresses | `wedding.venues` |
| Palette dress code | `wedding.dressCode.palette` |
| Hôtels | `wedding.hotels` |
| IBAN / PayPal / Mobile Money | `wedding.gifts` |
| Lien Drive photos | `wedding.photos.uploadUrl` (le QR code se régénère automatiquement) |
| Groupes WhatsApp / Telegram | `wedding.social` |

## 🧩 Fonctionnalités

- **Compte à rebours** dynamique (jours/heures/min/sec)
- **Agenda** : lien Google Calendar + téléchargement `.ics`
- **RSVP** validé par Zod → envoi d'un **message WhatsApp pré-rempli** aux mariés (aucun backend requis). Pour une persistance serveur, remplacer le `TODO` dans `components/RsvpForm.tsx` par un POST vers Supabase/Google Forms.
- **Cagnotte** : IBAN avec copie presse-papier, PayPal, Mobile Money
- **QR code photos** généré à la volée vers le dossier partagé
- **Livre d'or** : messages persistés en `localStorage` (Zustand) — brancher Supabase pour un vrai partage multi-invités
- **Bottom bar mobile** avec bouton RSVP central

## 📦 Déploiement

Repo GitHub → import Vercel → deploy. Aucune variable d'environnement requise.

## Structure

```
app/            layout.tsx, page.tsx, globals.css
components/     Navbar, Hero, Countdown, Program, Locations, DressCode,
                Accommodation, RsvpForm, GiftRegistry, Memories, Guestbook,
                QRCode, Footer, Reveal, SectionHeading
config/         wedding.ts   ← SEUL fichier à éditer
lib/            ics.ts, schemas.ts (Zod), store.ts (Zustand)
```
