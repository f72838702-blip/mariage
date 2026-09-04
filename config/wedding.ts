/**
 * ═══════════════════════════════════════════════════════════════
 *  CONFIGURATION CENTRALE DU MARIAGE
 *  Tout le contenu du site se personnalise ici :
 *  prénoms, date, lieux, programme, IBAN, liens, hôtels…
 * ═══════════════════════════════════════════════════════════════
 */

export const wedding = {
  /* ── A. IDENTITÉ ─────────────────────────────────────────── */
  couple: {
    name1: "Aïssata",
    name2: "Mamadou",
    hashtag: "#AissataMamadou2027",
  },

  /** Date ISO du début de la cérémonie (compte à rebours, agenda) */
  weddingDate: "2027-06-12T15:00:00Z",
  /** Date ISO de fin estimée de l'événement (fichier .ics) */
  weddingEndDate: "2027-06-13T04:00:00Z",
  dateLabel: "Samedi 12 Juin 2027",
  city: "Conakry, Guinée",

  /** Photo du hero : déposez votre image dans /public/images/hero.jpg */
  heroImage: "/images/hero.jpg",

  rsvp: {
    deadline: "1er mai 2027",
    /** Numéro WhatsApp des mariés (format international sans +) recevant les RSVP */
    whatsappNumber: "224620000000",
  },

  /* ── B. PROGRAMME DU JOUR J ──────────────────────────────── */
  program: [
    {
      time: "15h00",
      title: "Cérémonie civile",
      description:
        "Mairie de Kaloum. Merci d'arriver 30 minutes en avance pour le placement des invités.",
      icon: "landmark" as const,
    },
    {
      time: "17h30",
      title: "Vin d'honneur",
      description:
        "Cocktail et photos dans les jardins, sous les flamants et la lumière dorée.",
      icon: "glass" as const,
    },
    {
      time: "20h00",
      title: "Dîner",
      description:
        "Grand dîner sous le chapiteau. Menu à trois services, vins et jus de fruits frais.",
      icon: "utensils" as const,
    },
    {
      time: "22h00",
      title: "Soirée dansante",
      description:
        "Ouverture de bal des mariés, puis DJ et orchestre live jusqu'au bout de la nuit.",
      icon: "music" as const,
    },
  ],

  /* ── B. LIEUX ────────────────────────────────────────────── */
  venues: [
    {
      name: "Mairie de Kaloum",
      label: "Cérémonie civile",
      address: "Avenue de la République, Kaloum, Conakry",
      note: "Parking disponible sur place. Cérémonie à 15h00 précises.",
    },
    {
      name: "Salle des Jardins d'Eden",
      label: "Vin d'honneur, dîner & soirée",
      address: "Route de Donka, Ratoma, Conakry",
      note: "Navette gratuite depuis la mairie à 17h00.",
    },
  ],

  /* ── B. DRESS CODE ───────────────────────────────────────── */
  dressCode: {
    title: "Élégance champêtre",
    description:
      "Tenues de cérémonie dans les tons doux de notre palette. Évitez le blanc (réservé à la mariée) et le noir total.",
    palette: [
      { name: "Sauge", hex: "#98a487" },
      { name: "Sable", hex: "#e6dcc9" },
      { name: "Doré doux", hex: "#c2a05c" },
      { name: "Terracotta", hex: "#c08552" },
      { name: "Bleu poudré", hex: "#9db4c0" },
    ],
  },

  /* ── B. HÉBERGEMENTS ─────────────────────────────────────── */
  hotels: [
    {
      name: "Hôtel Riviera Royal",
      distance: "10 min du lieu de réception",
      price: "À partir de 80 € / nuit",
      link: "https://www.booking.com",
    },
    {
      name: "Noom Hotel Conakry",
      distance: "15 min du lieu de réception",
      price: "À partir de 120 € / nuit",
      link: "https://www.booking.com",
    },
    {
      name: "Maison d'hôtes Chez Fatou",
      distance: "5 min — chambres familiales",
      price: "Sur demande (tarif préférentiel mariage)",
      link: "https://wa.me/224620000000",
    },
  ],

  /* ── D. CAGNOTTE & LISTE DE MARIAGE ──────────────────────── */
  gifts: {
    intro:
      "Votre présence est le plus beau des cadeaux. Si vous souhaitez nous gâter davantage, une cagnotte nous aidera à concrétiser notre voyage de noces et nos premiers projets à deux.",
    iban: "FR76 3000 4000 5000 0000 0000 000",
    ibanOwner: "M. & Mme CAMARA",
    paypal: "https://paypal.me/votre-lien",
    mobileMoney: [
      { name: "Orange Money", number: "+224 620 00 00 00" },
      { name: "MTN MoMo", number: "+224 660 00 00 00" },
    ],
  },

  /* ── E. PHOTOS & LIVRE D'OR ──────────────────────────────── */
  photos: {
    /** Lien du dossier partagé (Google Drive / Dropbox / WedShoots) */
    uploadUrl: "https://drive.google.com/drive/folders/votre-dossier",
    note: "Flashez le QR code ou cliquez sur le bouton pour déposer vos plus belles photos du jour J.",
    audioNote:
      "Un livre d'or audio vous attendra à l'entrée de la salle : laissez-nous un message vocal, on écoutera tout en rentrant de voyage de noces !",
  },

  /* ── F. COMMUNICATION ────────────────────────────────────── */
  social: {
    whatsappGroup: "https://chat.whatsapp.com/votre-lien-groupe",
    telegram: "https://t.me/votre-canal",
  },
} as const;

export type WeddingConfig = typeof wedding;
