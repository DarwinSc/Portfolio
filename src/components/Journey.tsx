"use client";

import { motion } from "motion/react";
import { journey, techColors } from "@/data/profile";
import { Container, SectionTitle } from "./ui";

// Colores de la paleta de tecnologías para el resplandor del borde
// (se descartan los blancos de Next.js, Vercel y GitHub).
const rowColors = [...new Set(Object.values(techColors))].filter((c) => c !== "#ffffff");

// Cada vez que el mouse entra en una fila, elige un color al azar distinto del anterior.
function paintRow(e: React.PointerEvent<HTMLLIElement>) {
  const el = e.currentTarget;
  const prev = el.style.getPropertyValue("--row");
  let next = prev;
  while (next === prev) next = rowColors[Math.floor(Math.random() * rowColors.length)];
  el.style.setProperty("--row", next);
}

// El recorrido como un índice: una fila por etapa. Al pasar el mouse,
// los bordes de la fila resplandecen con un color de la paleta de tecnologías.
export function Journey() {
  return (
    <section id="recorrido" className="scroll-mt-24 py-28">
      <Container>
        <SectionTitle>Recorrido</SectionTitle>

        <ol className="mt-16 border-b border-line-strong">
          {journey.map((stop, i) => (
            <motion.li
              key={stop.period + stop.place}
              onPointerEnter={paintRow}
              style={{ "--row": rowColors[i % rowColors.length] } as React.CSSProperties}
              className="group relative grid gap-2 border-t border-line-strong px-4 py-7 transition-[box-shadow] duration-300 hover:z-10 hover:shadow-[0_0_0_1px_var(--row),0_0_32px_-2px_var(--row),inset_0_0_24px_-8px_var(--row)] md:grid-cols-12 md:gap-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-muted md:col-span-3">{stop.period}</p>
              <div className="md:col-span-5">
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{stop.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  {stop.detail}
                </p>
              </div>
              <p className="text-xl font-semibold md:col-span-4 md:text-right">{stop.place}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
