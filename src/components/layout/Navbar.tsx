"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Every page opens on a dark full-bleed hero: dark glass there, light glass after it.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setOnHero(y < window.innerHeight * 0.62);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href.includes("#") ? false : href === "/" ? pathname === "/" : pathname.startsWith(href));
  const dark = onHero;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.45, ease }}
      >
        <div
          className={`relative mx-auto max-w-7xl overflow-hidden rounded-full border backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-500 ${
            dark
              ? "border-white/15 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_50px_-24px_rgba(0,0,0,0.6)]"
              : "border-white/70 bg-paper/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_40px_-22px_rgba(27,46,56,0.35)]"
          }`}
        >
          {/* glass sheen */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          <nav
            className={`relative flex items-center justify-between pr-2.5 pl-5 transition-all duration-500 sm:pr-3 sm:pl-7 ${
              scrolled ? "h-[62px]" : "h-[72px]"
            }`}
            aria-label="Main"
          >
            <Logo light={dark} />

            <ul className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative py-2 text-[13.5px] font-medium transition-colors ${
                      dark
                        ? isActive(item.href)
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : isActive(item.href)
                          ? "text-ink"
                          : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-saffron transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href="/contact#enquiry"
                className="hidden rounded-full bg-saffron px-6 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(226,88,43,0.8)] transition hover:-translate-y-0.5 hover:bg-saffron-600 sm:inline-flex"
              >
                Book Now
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={`grid size-11 place-items-center rounded-full border transition lg:hidden ${
                  dark ? "border-white/25 bg-white/10 text-white" : "border-line bg-white text-ink"
                }`}
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Menu className="size-5" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-cream lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex h-[84px] items-center justify-between px-5">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full bg-navy text-white"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-1 px-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-4 border-b border-line py-4 font-serif text-3xl ${
                      isActive(item.href) ? "text-saffron" : "text-ink"
                    }`}
                  >
                    <span className="font-sans text-xs text-stone">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="space-y-3 px-6 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/contact#enquiry"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-saffron py-4 text-center font-semibold text-white"
              >
                Book Your Experience
              </Link>
              <a href={site.phoneHref} className="flex items-center justify-center gap-2 text-sm text-muted">
                <Phone className="size-4" /> {site.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
