"use client";

import { motion, useReducedMotion } from "motion/react";
import { marquee, profile } from "@/data/profile";
import { Container, GridLines, Magnetic } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const words = profile.name.split(" ");

  return (
    <section id="inicio" className="relative overflow-hidden pb-16">
      <GridLines />

      <Container className="relative">
        <h1 className="display -ml-[0.04em] pt-6 tracking-[-0.035em] text-[clamp(4.5rem,19.5vw,15.75rem)]" aria-label={profile.name}>
          {words.map((word, w) => (
            <span key={word} aria-hidden className="block overflow-hidden pb-[0.07em]">
              {/* Cada letra sube por separado, con un pequeño desfase entre ellas */}
              {word.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.1 + w * 0.18 + i * 0.035, duration: 0.85, ease }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-8 grid gap-8 md:grid-cols-12 md:gap-5"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease }}
        >
          <p className="text-lg leading-relaxed text-muted md:col-span-6 md:text-xl lg:col-span-5">
            <span className="text-fg">{profile.role} en Buenos Aires.</span> Interfaces con React,
            Next.js y TypeScript, pensadas con criterio de diseño y animaciones cuidadas.
          </p>
          <div className="flex flex-wrap items-start gap-3 md:col-span-6 md:justify-end lg:col-start-8 lg:col-span-5">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-block rounded-full bg-fg px-7 py-4 text-lg font-bold text-bg transition-transform active:scale-95"
              >
                Contactame
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#proyectos"
                className="inline-block rounded-full border border-line-strong px-7 py-4 text-lg transition-colors hover:bg-fg hover:text-bg"
              >
                Proyectos
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </Container>

      <motion.div
        className="relative mt-14"
        initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ delay: 1, duration: 1.1, ease }}
      >
        {profile.photo ? <Photo src={profile.photo} /> : <Marquee />}
      </motion.div>
    </section>
  );
}

function Photo({ src }: { src: string }) {
  return (
    <Container>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Retrato de ${profile.name}`}
        className="h-[min(60vh,560px)] w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
      />
    </Container>
  );
}

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee overflow-hidden border-y border-line-strong py-6" aria-label={marquee.join(", ")}>
      <div className="marquee-track flex w-max" aria-hidden>
        {items.map((word, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-[clamp(2.5rem,7vw,6rem)] font-extrabold tracking-[-0.04em]">
            <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--fg)]" : ""}>{word}</span>
            <span className="mx-8 inline-block h-3 w-3 rounded-full bg-fg md:mx-12" />
          </span>
        ))}
      </div>
    </div>
  );
}
