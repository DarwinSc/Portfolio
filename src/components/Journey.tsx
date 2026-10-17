"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { journey, type Stop } from "@/data/profile";
import { Reveal } from "./Reveal";

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  // La línea de la pista se va "encendiendo" a medida que bajás.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="recorrido" className="scroll-mt-20 border-y border-line bg-graphite py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-wide text-4xl sm:text-6xl">Recorrido</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">De lo más reciente a mis comienzos.</p>
        </Reveal>

        <ol ref={ref} className="relative mt-16">
          <div aria-hidden className="absolute bottom-0 left-[15px] top-0 w-[2px] bg-line md:left-[calc(11rem+15px)]" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-[15px] top-0 w-[2px] origin-top bg-champagne md:left-[calc(11rem+15px)]"
            style={{ scaleY: progress }}
          />

          {journey.map((stop) => (
            <JourneyStop key={stop.period + stop.place} stop={stop} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function JourneyStop({ stop }: { stop: Stop }) {
  const isBreak = stop.kind === "break";

  return (
    <motion.li
      className="relative grid gap-1 pb-14 pl-14 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0"
      initial="off"
      whileInView="on"
      viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
    >
      <p className="whitespace-nowrap pt-1 text-sm font-semibold text-muted md:pr-8 md:text-right">
        {stop.period}
      </p>

      {/* Testigo del tablero: se prende cuando la parada llega al centro */}
      <motion.span
        aria-hidden
        className={`absolute left-0 top-0.5 h-8 w-8 rounded-full border-2 md:left-[11rem] ${
          isBreak ? "border-dashed" : ""
        }`}
        variants={{
          off: { backgroundColor: "#000000", borderColor: "#2a2c31", boxShadow: "0 0 0 rgba(212,178,106,0)" },
          on: {
            backgroundColor: isBreak ? "#000000" : "#d4b26a",
            borderColor: isBreak ? "#9a9da4" : "#d4b26a",
            boxShadow: isBreak ? "0 0 0 rgba(212,178,106,0)" : "0 0 24px rgba(212,178,106,0.55)",
          },
        }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="md:pl-20"
        variants={{ off: { opacity: 0.35, x: 16 }, on: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="font-wide text-2xl sm:text-3xl">{stop.title}</h3>
        <p className="mt-1 font-semibold text-champagne">{stop.place}</p>
        <p className="mt-3 max-w-xl leading-relaxed text-muted">{stop.detail}</p>
      </motion.div>
    </motion.li>
  );
}
