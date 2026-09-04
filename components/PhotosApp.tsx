"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  Download,
  Hourglass,
  ImageOff,
  Loader2,
  Lock,
  RefreshCw,
  Upload,
  X,
} from "lucide-react";
import { wedding } from "@/config/wedding";
import { getSupabase, PHOTOS_BUCKET, PHOTOS_TABLE } from "@/lib/supabase";

interface PhotoRow {
  id: string;
  storage_path: string;
  author: string;
  created_at: string;
  url: string;
}

const MAX_FILE_MB = 10;

export default function PhotosApp() {
  const supabase = getSupabase();
  const fileInput = useRef<HTMLInputElement>(null);

  const [author, setAuthor] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [notice, setNotice] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<PhotoRow | null>(null);

  /** La galerie s'ouvre après la fin de l'événement (les uploads restent ouverts) */
  const galleryOpen = Date.now() >= new Date(wedding.weddingEndDate).getTime();

  const loadPhotos = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from(PHOTOS_TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setPhotos(
        data.map((row) => ({
          ...row,
          url: supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(row.storage_path)
            .data.publicUrl,
        })),
      );
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (galleryOpen) loadPhotos();
    else setLoading(false);
  }, [galleryOpen, loadPhotos]);

  async function handleUpload(files: FileList | null) {
    if (!supabase || !files?.length || uploading) return;
    const valid = Array.from(files).filter((f) => {
      if (!f.type.startsWith("image/")) return false;
      if (f.size > MAX_FILE_MB * 1024 * 1024) return false;
      return true;
    });
    if (valid.length === 0) {
      setNotice(`Seules les images de moins de ${MAX_FILE_MB} Mo sont acceptées.`);
      return;
    }

    setUploading(true);
    setProgress({ done: 0, total: valid.length });
    let ok = 0;

    for (const file of valid) {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from(PHOTOS_BUCKET)
        .upload(path, file, { cacheControl: "31536000", upsert: false });
      if (!error) {
        await supabase.from(PHOTOS_TABLE).insert({
          storage_path: path,
          author: author.trim() || "Invité",
        });
        ok++;
      }
      setProgress((p) => ({ ...p, done: p.done + 1 }));
    }

    setUploading(false);
    setNotice(
      ok > 0
        ? `${ok} photo${ok > 1 ? "s" : ""} partagée${ok > 1 ? "s" : ""} — merci ! 🤍`
        : "Échec de l'envoi, réessaie dans un instant.",
    );
    if (galleryOpen) await loadPhotos();
  }

  async function download(photo: PhotoRow) {
    try {
      const res = await fetch(photo.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mariage-${photo.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(photo.url, "_blank", "noopener");
    }
  }

  /* ── Supabase non configuré ── */
  if (!supabase) {
    return (
      <div className="card mx-auto max-w-xl text-center">
        <Lock size={40} className="mx-auto text-gold" />
        <h2 className="mt-4 font-display text-3xl font-medium text-ink">
          L&apos;espace arrive bientôt
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          L&apos;espace photos est en cours d&apos;activation par les mariés.
          En attendant, reviens le jour J ou partage tes photos avec le hashtag{" "}
          <span className="font-semibold text-gold">{wedding.couple.hashtag}</span> !
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* ── Zone d'upload ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="mb-4">
          <label htmlFor="author" className="label-field">
            Ton prénom (facultatif)
          </label>
          <input
            id="author"
            className="input-field"
            placeholder="Ex : Fatoumata"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={40}
          />
        </div>

        <button
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-gold/40 bg-gold/5 px-6 py-10 transition-colors hover:border-gold hover:bg-gold/10 disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 size={32} className="animate-spin text-gold" />
              <span className="text-sm font-medium text-ink">
                Envoi {progress.done}/{progress.total}…
              </span>
            </>
          ) : (
            <>
              <Upload size={32} className="text-gold" />
              <span className="font-display text-xl text-ink">
                Touche pour partager tes photos
              </span>
              <span className="text-xs text-ink-soft">
                Plusieurs photos possibles · max {MAX_FILE_MB} Mo chacune
              </span>
            </>
          )}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleUpload(e.target.files);
            e.target.value = "";
          }}
        />

        <AnimatePresence>
          {notice && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-medium text-sage-dark"
            >
              <CheckCircle2 size={16} />
              {notice}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Galerie ── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-2xl font-medium text-ink">
            <Camera size={20} className="text-gold" />
            Les photos des invités
          </h2>
          {galleryOpen && photos.length > 0 && (
            <button
              onClick={loadPhotos}
              className="flex items-center gap-1.5 text-xs font-medium text-sage-dark"
            >
              <RefreshCw size={13} />
              Actualiser
            </button>
          )}
        </div>

        {!galleryOpen ? (
          <div className="card text-center">
            <Hourglass size={36} className="mx-auto text-sage-dark" />
            <p className="mt-3 font-display text-xl text-ink">
              La galerie s&apos;ouvrira après le mariage
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Partage tes photos dès le jour J — tu pourras voir et télécharger
              celles de tout le monde dès la fin de la soirée.
            </p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-2xl bg-sand/50" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="card text-center">
            <ImageOff size={36} className="mx-auto text-ink-soft/50" />
            <p className="mt-3 text-sm text-ink-soft">
              Aucune photo pour le moment — sois le premier à partager ! 📸
            </p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((photo) => (
              <motion.button
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setLightbox(photo)}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-sand/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={`Photo partagée par ${photo.author}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-2 pt-6 text-left text-[10px] font-medium uppercase tracking-widest text-white/90">
                  {photo.author}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.url}
                alt={`Photo de ${lightbox.author}`}
                className="max-h-[75vh] w-auto rounded-2xl"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-widest text-white/70">
                  Par {lightbox.author}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => download(lightbox)}
                    className="btn-primary px-4 py-2 text-xs"
                  >
                    <Download size={14} />
                    Télécharger
                  </button>
                  <button
                    onClick={() => setLightbox(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
                    aria-label="Fermer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
