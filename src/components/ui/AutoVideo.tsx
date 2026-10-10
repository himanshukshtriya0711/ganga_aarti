"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** "view" plays while on screen; "manual" leaves playback to the parent. */
  mode?: "view" | "manual";
  label?: string;
  /** Stay transparent until playback starts — lets an <Image> underneath be the fast first paint. */
  fadeIn?: boolean;
  /** Skip the video entirely on phones (saves data and keeps LCP on the still underneath). */
  desktopOnly?: boolean;
};

const PHONE = "(max-width: 767px)";

/** Muted, looping background video that only plays while visible. */
export const AutoVideo = forwardRef<HTMLVideoElement, Props>(function AutoVideo(
  { src, poster, className, mode = "view", label, fadeIn = false, desktopOnly = false },
  ref,
) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Server snapshot "true" means no <video> in the HTML, so phones never request it.
  const isPhone = useMediaQuery(PHONE, true);
  const skip = desktopOnly && isPhone;
  useImperativeHandle(ref, () => video.current!);

  useEffect(() => {
    const v = video.current;
    if (!v || mode !== "view" || skip) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [mode, skip]);

  if (skip) return null;

  return (
    <video
      ref={video}
      className={fadeIn ? `${className ?? ""} transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}` : className}
      onPlaying={fadeIn ? () => setPlaying(true) : undefined}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      // Nothing downloads until the video is on screen (play() starts the fetch).
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
});
