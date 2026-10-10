import Image from "next/image";
import Link from "next/link";

/** Brand emblem (gold diya over the Ganga) — transparent PNG cut from the official logo. */
export function LogoMark({ className = "size-11" }: { className?: string }) {
  return (
    <span className={`relative block shrink-0 ${className}`}>
      <Image src="/media/logo/logo-mark.png" alt="" fill sizes="64px" className="object-contain" />
    </span>
  );
}

/**
 * `compact` (navbar): emblem + wordmark in one row.
 * `full` (footer): the complete official lockup with the tagline.
 */
export function Logo({ light = false, variant = "compact" }: { light?: boolean; variant?: "compact" | "full" }) {
  if (variant === "full") {
    return (
      <Link href="/" aria-label="Ganga Aarti Events — home" className="inline-block">
        <Image src="/media/logo/logo-full.png" alt="Ganga Aarti Events — World famous Ganga Aarti organizer" width={701} height={569} className="h-auto w-44" />
      </Link>
    );
  }
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Ganga Aarti Events — home">
      <LogoMark className="size-11 transition-transform duration-500 group-hover:scale-110" />
      <span className="leading-none">
        <span className={`block text-[16px] font-semibold tracking-[0.06em] ${light ? "text-white" : "text-ink"}`}>GANGA AARTI</span>
        <span className="mt-1 block text-[10px] font-semibold tracking-[0.32em] text-gold">EVENTS</span>
      </span>
    </Link>
  );
}
