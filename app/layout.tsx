import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { wedding } from "@/config/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${wedding.couple.name1} & ${wedding.couple.name2} — ${wedding.dateLabel}`,
  description: `Nous nous marions ! ${wedding.dateLabel} à ${wedding.city}. Confirmez votre présence, découvrez le programme et laissez-nous un message. ${wedding.couple.hashtag}`,
};

export const viewport: Viewport = {
  themeColor: "#faf7f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen">
        <Navbar />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
