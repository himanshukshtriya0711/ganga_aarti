"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  max: number;
  sway: number;
  phase: number;
  big: boolean;
};

const MAX_PARTICLES = 140;
const MAX_PARTICLES_TOUCH = 50;

function makeSprite(core: string, mid: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "#fff6dc");
  grad.addColorStop(0.18, core);
  grad.addColorStop(0.45, mid);
  grad.addColorStop(1, "rgba(226,88,43,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

/**
 * Glowing embers / diya lights that drift upward across the whole site.
 * Scrolling releases more of them; moving the cursor leaves a trail of sparks.
 */
export function EmberField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const gx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const gy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });
  const glowOpacity = useMotionValue(1);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = matchMedia("(pointer: fine)").matches;
    const maxParticles = fine ? MAX_PARTICLES : MAX_PARTICLES_TOUCH;
    const spawnRate = fine ? 0.05 : 0.025;

    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const ember = makeSprite("rgba(255,190,90,0.95)", "rgba(242,140,60,0.35)");
    const diya = makeSprite("rgba(255,170,70,0.9)", "rgba(226,88,43,0.25)");
    const particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let lastScroll = window.scrollY;
    let scrollEnergy = 0;
    let lastMouse = { x: -1, y: -1 };

    const resize = () => {
      dpr = fine ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number, opts: Partial<Particle> = {}) => {
      if (particles.length >= maxParticles) return;
      const big = opts.big ?? Math.random() < 0.12;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.35 + Math.random() * 0.7),
        size: big ? 14 + Math.random() * 12 : 4 + Math.random() * 7,
        life: 0,
        max: 260 + Math.random() * 260,
        sway: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        big,
        ...opts,
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      scrollEnergy = Math.min(scrollEnergy + Math.abs(y - lastScroll) * 0.04, 6);
      lastScroll = y;
    };

    const onMove = (e: PointerEvent) => {
      // No cursor glow or spark trail over the footer.
      if ((e.target as Element | null)?.closest?.("footer")) {
        glowOpacity.set(0);
        return;
      }
      glowOpacity.set(1);
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!fine) return;
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      if (dx * dx + dy * dy > 220) {
        lastMouse = { x: e.clientX, y: e.clientY };
        spawn(e.clientX + (Math.random() - 0.5) * 8, e.clientY + (Math.random() - 0.5) * 8, {
          size: 3 + Math.random() * 5,
          max: 50 + Math.random() * 50,
          vy: -(0.6 + Math.random() * 0.8),
          vx: (Math.random() - 0.5) * 0.8,
          big: false,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Ambient drift from the bottom, boosted by scroll velocity.
      if (Math.random() < spawnRate) spawn(Math.random() * w, h + 20);
      if (scrollEnergy > 0.2) {
        const n = Math.floor(scrollEnergy);
        for (let i = 0; i < n; i++) spawn(Math.random() * w, h * (0.55 + Math.random() * 0.5));
        scrollEnergy *= 0.82;
      }

      ctx.globalCompositeOperation = "source-over";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.phase += 0.03;
        p.x += p.vx + Math.sin(p.phase) * p.sway * 0.35;
        p.y += p.vy;
        const t = p.life / p.max;
        if (t >= 1 || p.y < -40) {
          particles.splice(i, 1);
          continue;
        }
        const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        const flicker = 0.75 + Math.sin(p.phase * 4) * 0.25;
        ctx.globalAlpha = Math.max(0, fade * flicker * (p.big ? 0.55 : 0.9));
        const s = p.size * (p.big ? 1 : 0.8 + flicker * 0.2);
        ctx.drawImage(p.big ? diya : ember, p.x - s / 2, p.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    resize();
    // Wait until the page has hydrated and gone idle before starting the loop.
    const start = () => {
      for (let i = 0; i < (fine ? 18 : 8); i++) spawn(Math.random() * w, h * (0.3 + Math.random() * 0.7));
      raf = requestAnimationFrame(tick);
    };
    const idle = "requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1500);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(idle as number);
      clearTimeout(idle as ReturnType<typeof setTimeout>);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mx, my, glowOpacity]);

  return (
    <>
      <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-30" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden size-[340px] transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,165,65,0.16),rgba(226,88,43,0.05)_45%,transparent_70%)] pointer-fine:block motion-reduce:hidden"
        style={{ x: gx, y: gy, opacity: glowOpacity }}
      />
    </>
  );
}
