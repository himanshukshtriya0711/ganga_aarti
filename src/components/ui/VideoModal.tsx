"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";

export function VideoModal({
  open,
  onClose,
  src,
  poster,
  title,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  poster: string;
  title: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-[#0d0907]/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="aspect-video w-full rounded-2xl bg-black object-cover shadow-2xl"
              src={src}
              poster={poster}
              autoPlay
              loop
              muted
              playsInline
              controls
            />
            <p className="mt-4 text-center font-serif text-lg text-white/90 italic">{title}</p>
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-4 -right-2 grid size-11 place-items-center rounded-full bg-white text-ink shadow-lg transition hover:rotate-90 sm:-right-4"
              aria-label="Close video"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
