"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

// Contenedor común: mismo ancho y márgenes que la grilla de fondo.
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-12 ${className}`}>{children}</div>;
}

// Grilla de 12 columnas visible de fondo, como en una mesa de diseño.
export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Container className="grid h-full grid-cols-4 gap-5 md:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} className={`border-x border-line ${i >= 4 ? "hidden md:block" : ""}`} />
        ))}
      </Container>
    </div>
  );
}

// Botón "magnético": se desplaza levemente hacia el puntero cuando pasás cerca.
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 15 });
  const y = useSpring(0, { stiffness: 220, damping: 15 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((e.clientX - (box.left + box.width / 2)) * 0.3);
    y.set((e.clientY - (box.top + box.height / 2)) * 0.3);
  }

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

// Título de sección: entra deslizándose desde abajo, recortado por su caja.
export function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="display overflow-hidden pb-[0.06em] text-[clamp(3.25rem,10vw,8.5rem)]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </h2>
  );
}
