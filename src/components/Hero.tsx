"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { profile } from "@/data/profile";
import { playEngineStart } from "@/lib/engine";
import { Tachometer } from "./Tachometer";

const IDLE = 0.9;

// Lo que va mostrando la pantallita debajo del tacómetro, como el display
// de un estéreo de auto.
const displayLines = [
  "Ahora: DsCash",
  "React / Next.js / TypeScript",
  "Interfaces con transiciones",
  "Buenos Aires, Argentina",
];

const lineVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { delay: 0.25 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const rpm = useMotionValue(reduce ? IDLE : 0);
  const [line, setLine] = useState(0);
  const [revving, setRevving] = useState(false);
  const [first, last] = profile.name.split(" ");

  // Al cargar, la aguja hace el "chequeo" que hacen muchos autos al encender:
  // sube hasta el final y vuelve al ralentí.
  useEffect(() => {
    if (reduce) {
      rpm.set(IDLE);
      return;
    }
    const controls = animate(rpm, [0, 7.6, IDLE], {
      duration: 2.2,
      delay: 0.6,
      times: [0, 0.45, 1],
      ease: ["easeOut", "easeInOut"],
    });
    return () => controls.stop();
  }, [reduce, rpm]);

  useEffect(() => {
    const id = setInterval(() => setLine((l) => (l + 1) % displayLines.length), 2600);
    return () => clearInterval(id);
  }, []);

  function startEngine() {
    playEngineStart();
    setRevving(true);
    if (reduce) {
      setTimeout(() => setRevving(false), 2600);
      return;
    }
    animate(rpm, [rpm.get(), 6.9, 3.2, 7.4, IDLE], {
      duration: 2.6,
      times: [0, 0.25, 0.45, 0.65, 1],
      ease: "easeInOut",
    }).then(() => setRevving(false));
  }

  return (
    <section
      id="inicio"
      className="relative mx-auto grid w-full max-w-6xl items-center gap-12 overflow-hidden px-4 pb-24 pt-10 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:pt-16"
    >
      <div>
        <h1 className="font-wide text-[clamp(3rem,10.5vw,7.25rem)] leading-[0.92]">
          {[first, last].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                variants={lineVariants}
                initial={reduce ? false : "hidden"}
                animate="show"
                custom={i}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            <strong className="font-bold text-text">{profile.role}.</strong> {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={startEngine}
              disabled={revving}
              className="group relative overflow-hidden rounded-full bg-champagne px-7 py-3.5 font-bold text-black transition-transform active:scale-95 disabled:cursor-wait"
            >
              <span className="relative z-10">{revving ? "En marcha" : "Arrancar motor"}</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full"
              />
            </button>
            <a
              href="#proyectos"
              className="rounded-full border border-line px-7 py-3.5 font-bold transition-colors hover:border-text"
            >
              Ver proyectos
            </a>
          </div>
          <p className="mt-3 text-sm text-muted">El botón de arranque tiene sonido.</p>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col items-center"
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tachometer rpm={rpm} />

        <div
          className="mt-6 h-11 w-full max-w-[300px] overflow-hidden rounded-md border border-line bg-graphite px-4"
          aria-live="off"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={line}
              className="font-narrow flex h-11 items-center justify-center text-lg font-semibold text-champagne"
              initial={reduce ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -24, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {displayLines[line]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
