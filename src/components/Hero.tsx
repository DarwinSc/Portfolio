"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { CodeCard } from "./CodeCard";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [first, last] = profile.name.split(" ");

  return (
    <section
      id="inicio"
      className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pb-28 pt-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:pt-20"
    >
      <div className="min-w-0">
        <h1 className="font-display text-[clamp(3.25rem,10vw,7rem)] leading-[0.95]">
          {[first, last].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease }}
        >
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            <strong className="font-semibold text-text">{profile.role}.</strong> {profile.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group relative overflow-hidden rounded-full bg-champagne px-7 py-3.5 font-semibold text-black transition-transform active:scale-95"
            >
              <span className="relative z-10">Contactame</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-white/35 transition-transform duration-700 group-hover:translate-x-full"
              />
            </a>
            <a
              href="#proyectos"
              className="rounded-full border border-line px-7 py-3.5 font-semibold transition-colors hover:border-text"
            >
              Ver proyectos
            </a>
          </div>

          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-champagne" />
            </span>
            Disponible para nuevas oportunidades, {profile.location}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="flex min-w-0 justify-center lg:justify-end"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease }}
      >
        <CodeCard />
      </motion.div>
    </section>
  );
}
