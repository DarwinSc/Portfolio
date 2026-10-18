"use client";

import { useEffect, useRef } from "react";
import { techColors } from "@/data/profile";

// Recorrido de colores de la estela, tomados de la paleta de tecnologías
// y ordenados para que pasen de uno a otro como un arcoíris suave.
const palette = [
  techColors.React,
  techColors.Supabase,
  techColors.JavaScript,
  techColors.AWS,
  techColors.HTML5,
  techColors.Sass,
  techColors.Redux,
  techColors.TypeScript,
].map(hexToRgb);

const LIFE = 650; // ms que tarda cada punto en apagarse
const STEP = 6; // px entre puntos interpolados
const PX_PER_COLOR = 220; // px de recorrido para pasar de un color al siguiente

type Point = { x: number; y: number; t: number; c: [number, number, number] };

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function colorAt(distance: number): [number, number, number] {
  const f = distance / PX_PER_COLOR;
  const i = Math.floor(f) % palette.length;
  const a = palette[i];
  const b = palette[(i + 1) % palette.length];
  const k = f - Math.floor(f);
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

// Estela de luz que sigue al mouse y se desvanece. Solo con mouse
// (no en pantallas táctiles) y nunca con "reducir movimiento" activado.
export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!fine || reduce || !canvas || !ctx) return;

    const points: Point[] = [];
    let last: { x: number; y: number } | null = null;
    let travelled = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";
      while (points.length && now - points[0].t > LIFE) points.shift();
      for (const p of points) {
        const life = 1 - (now - p.t) / LIFE;
        const r = 10 + 34 * life;
        const [cr, cg, cb] = p.c;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(${cr | 0},${cg | 0},${cb | 0},${0.22 * life})`);
        g.addColorStop(1, `rgba(${cr | 0},${cg | 0},${cb | 0},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = points.length ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      const from = last ?? { x: e.clientX, y: e.clientY };
      const dx = e.clientX - from.x;
      const dy = e.clientY - from.y;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / STEP));
      // Se interpolan puntos intermedios para que la estela sea continua
      // aunque el mouse se mueva rápido.
      for (let i = 1; i <= steps; i++) {
        const k = i / steps;
        travelled += dist / steps;
        points.push({ x: from.x + dx * k, y: from.y + dy * k, t: now, c: colorAt(travelled) });
      }
      if (points.length > 160) points.splice(0, points.length - 160);
      last = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onLeave = () => (last = null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Encima del contenido pero en modo "screen": sobre el fondo negro suma luz
  // y no tapa textos ni bloquea clics.
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full mix-blend-screen"
    />
  );
}
