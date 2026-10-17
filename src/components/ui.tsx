"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

// Contenedor común: mismo ancho y márgenes que la grilla de fondo.
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-12 ${className}`}>{children}</div>;
}

// Destellos que recorren algunas líneas de la grilla. Valores fijos (no
// aleatorios) para que el servidor y el navegador rendericen lo mismo.
// col: columna, side: borde izquierdo o derecho, dur y delay en segundos.
const glints = [
  { col: 0, side: "left", color: "#61dafb", dur: 9, delay: 0 },
  { col: 2, side: "right", color: "#f7df1e", dur: 11, delay: 3.5 },
  { col: 3, side: "left", color: "#3ecf8e", dur: 10, delay: 6 },
  { col: 5, side: "right", color: "#cc6699", dur: 12, delay: 1.5 },
  { col: 7, side: "left", color: "#9a6fe0", dur: 9.5, delay: 7.5 },
  { col: 8, side: "right", color: "#ff9900", dur: 11.5, delay: 4.5 },
  { col: 10, side: "left", color: "#2f8fff", dur: 10.5, delay: 9 },
  { col: 11, side: "right", color: "#f24e1e", dur: 12.5, delay: 2.5 },
] as const;

// Grilla de 12 columnas fija detrás de toda la página, como en una mesa de diseño.
// Queda quieta mientras el contenido se desplaza por encima.
export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Container className="grid h-full grid-cols-4 gap-5 md:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} className={`relative border-x border-line ${i >= 4 ? "hidden md:block" : ""}`}>
            {glints
              .filter((g) => g.col === i)
              .map((g) => (
                <span
                  key={g.side}
                  className="glint"
                  style={
                    {
                      "--glint": g.color,
                      [g.side]: "-1px",
                      animationDuration: `${g.dur}s`,
                      animationDelay: `${g.delay}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
          </i>
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
