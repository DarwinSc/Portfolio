"use client";

import { motion } from "motion/react";
import { journey } from "@/data/profile";
import { Container, SectionTitle } from "./ui";

// El recorrido como un índice: una fila por etapa. Al pasar el mouse,
// la fila se invierte a blanco sobre negro.
export function Journey() {
  return (
    <section id="recorrido" className="scroll-mt-24 py-28">
      <Container>
        <SectionTitle>Recorrido</SectionTitle>

        <ol className="mt-16 border-b border-line-strong">
          {journey.map((stop, i) => (
            <motion.li
              key={stop.period + stop.place}
              className="group grid gap-2 border-t border-line-strong px-0 py-7 transition-colors duration-300 hover:bg-accent hover:text-accent-fg md:grid-cols-12 md:gap-5 md:px-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-muted transition-colors group-hover:text-accent-fg/70 md:col-span-3">{stop.period}</p>
              <div className="md:col-span-5">
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{stop.title}</h3>
                <p className="mt-2 leading-relaxed text-muted transition-colors group-hover:text-accent-fg/80">
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
