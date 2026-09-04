"use client";

import { useEffect, useState } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
}

/** QR code généré côté client (aucune dépendance externe d'image) */
export default function QRCode({ value, size = 160 }: QRCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCodeLib) => {
      QRCodeLib.toDataURL(value, {
        width: size * 2,
        margin: 1,
        color: { dark: "#33302a", light: "#ffffff" },
      }).then((url) => {
        if (!cancelled) setDataUrl(url);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        className="animate-pulse rounded-xl bg-sand/50"
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dataUrl}
      alt="QR code vers l'espace de partage de photos"
      width={size}
      height={size}
      className="rounded-xl"
    />
  );
}
